const  express = require("express")
const app = express()

const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const User = require("./user.models")
const Cookie = require("./cookies.models")
const VMs = require("./VM.models")

// ########### API SETUP ###########
app.listen(8001, () => {
    console.log("Server running on port 8001")
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json())
// ########### API SETUP ###########



// ########### DATABASE SETUP ###########
let db = "mongodb://localhost:27017/aZZure_DB";

mongoose.connect(db, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log("connected to MongoDB server")
    } else {
        console.log("error")
    }
})

const conSuccess = mongoose.connection
conSuccess.once('open', _ => {
  console.log('Database connected:', db)
})
// ########### DATABASE SETUP ###########


// ########### JWT SETUP ###########

// Generate new cookie object and save it in database
function generateNewCookie(userIdentifier) {
    // generate new jwt token
    const token = jwt.sign({ userIdentifier
    }, 'RANDOM TOKEN SECRET KEY', {
        expiresIn: '24h'
    });

    // create cookie object
    const cookie = new Cookie({
        value: token,
        linkedUser: userIdentifier
    })

    // save cookie in database
    cookie.save()

    return cookie;
}


// decipher the token and return the decoded token
function decipherToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'RANDOM TOKEN SECRET KEY', (err, decoded) => {
            if (err) {
                reject(err)
            } else {
                resolve(decoded)
            }
        })
    }).catch((err)  => {console.log("invalid token")})
}


// Verify token and return user id
async function verifyToken(token) {
    let tokenData = null
    try {
        tokenData = await decipherToken(token)
    }
    catch (err) {
        // console.log(err)
        return null
    }

    return tokenData.userIdentifier
}



// Get user from ciphered token
async function getUserFromToken(token) {
    let tokenData = await decipherToken(token)
    if (!tokenData) return null;
    return new Promise((resolve, reject) => {
        Cookie.findOne({ value: token }, (err, cookie) => {
            if (err) {
                reject(err)
            } else {
                if (!cookie) {
                    reject('Cookie not found')
                }
                else {
                    const userId = tokenData.userIdentifier
                    User.findOne({ _id: userId }, (err, user) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(user)
                        }
                    })                    
                }
            }
        })
    })
}

// ########### JWT SETUP ###########


// ########### API ROUTES ###########

// Verify authentification and call next() if authentification is successful
async function verifyAuth(req, res, next) {
    const authHeader = req.headers["authorization"]
    if (!authHeader) {
        return res.status(401).json({ error: 'Not authorized' })
    }
    const token = authHeader.split(' ')[2]
    if (!token) {
        return res.status(401).json({ error: 'Not authorized' })
    }
    let userID = await verifyToken(token)
    console.log(userID)
    if (userID != null) {
        next(userID)
    }
    else {
        return res.status(401).json({ error: 'Not authorized' })
    }
}


// GET all users
app.get('/api/users', (req, res) => {
    verifyAuth(req, res, (userID) => {
        User.find()
            .then(users => res.status(200).json(users))
            .catch(error => res.status(400).json({ error }))
    })
})


// GET user by ID
app.get('/api/users/:id', (req, res) => {
    verifyAuth(req, res, (userID) => {
        if (userID != req.params.id) {
            return res.status(401).json({ error: 'Not authorized' })
        }
        User.findOne({_id: req.params.id})
            .then(user => res.status(200).json(user))
            .catch(error => res.status(404).json({ error }))
    })
})



// create user
app.post('/api/users', (req, res) => {   
    const user = new User({
        ...req.body
    })

    user.save()
        .then(() => res.status(201).json({ message: 'A new user has arrived !' }))
        .catch(error => res.status(400).json({ error }))
        
    console.log("Succesfully added user to database");
})


// UPDATE the user's data
app.put('/api/users/:id', (req, res) => {
    User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'The data of the user has been modified !' }))
        .catch(error => res.status(400).json({ error }))
})

// DELETE user by ID
app.delete('/api/users/:id', (req, res) => {
    User.deleteOne({_id: req.params.id})
        .then(user => res.status(200).json({ message: 'The user has been deleted !' }))
        .catch(error => res.status(400).json({ error }))
})


// reset user database
app.delete('/api/users', (req, res) => {
    User.deleteMany({}, function(err) {
        if (err) console.log(err);
        console.log("Successful deletion");
    });
    res.status(200).json({ message: 'The user database has been deleted !' })
})



// Login user
app.post('/api/users/login', (req, res) => {
    console.log(req.body)
    User.findOne({username: req.body.username, passwd: req.body.passwd})
        .then(user => {
            if (user) {
                const cookie = generateNewCookie(user._id)
                res.status(200).json({ message: 'The user has been logged in !', cookie: cookie })
                console.log("The user has been logged in !");            
            } else {
                res.status(404).json({ message: 'The user has not been found !' })
                console.log("The user has not been found !");
            }
        })
        .catch(error => res.status(404).json({ error }))
})


// Verify token
app.get('/api/users/token/:token', async (req, res) => {
    const token = req.params.token
    const user = await getUserFromToken(token).catch(err => console.log(err))
    if (user) {
        res.status(200).json(user.username)
    } else {
        console.log("user:", user)
        res.status(404).json({ message: 'The user has not been found !' })
    }
})


// create new vm
// app.post('api/user/vm', async (req, res) => {


// ########### API ROUTES ###########


module.exports = app