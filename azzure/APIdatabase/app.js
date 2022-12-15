const  express = require("express")
const User = require("./models")
const Cookie = require("./cookies.models")
const users = require("./models")
const app = express()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

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

// verify cookie
function verifyCookie(cookie) {
    return new Promise((resolve, reject) => {
        Cookie
            .findOne({ value: cookie })
            .then(cookie => {
                if (cookie) {
                    jwt.verify(cookie.value, 'RANDOM TOKEN SECRET KEY', (err, decoded) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(decoded)
                        }
                    })
                } else {
                    reject('Cookie not found')
                }
            })
            .catch(err => reject(err))
    })
}


async function getUserFromCookie(cookie) {
    return new Promise((resolve, reject) => {
        Cookie.findOne({ value: cookie }, (err, cookie) => {
            if (err) {
                reject(err)
            } else {
                if (!cookie) {
                    reject('Cookie not found')
                }
                else {
                    const userId = cookie.linkedUser
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

// POST user
app.post('/api/user', (req, res) => {   
    const user = new User({
        ...req.body
    })

    user.save()
        .then(() => res.status(201).json({ message: 'A new user has arrived !' }))
        .catch(error => res.status(400).json({ error }))
        
    console.log("Succesfully added user to database");
})

// GET user by ID
app.get('/api/user/:id', (req, res) => {
    User.findOne({_id: req.params.id})
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }))
})

// GET all users
app.get('/api/user', (req, res) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }))
})

// UPDATE the user's data
app.put('/api/user/:id', (req, res) => {
    User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'The data of the user has been modified !' }))
        .catch(error => res.status(400).json({ error }))
})

// DELETE user by ID
app.delete('/api/user/:id', (req, res) => {
    User.deleteOne({_id: req.params.id})
        .then(user => res.status(200).json({ message: 'The user has been deleted !' }))
        .catch(error => res.status(400).json({ error }))
})


// reset user database
app.delete('/api/user', (req, res) => {
    User.deleteMany({}, function(err) {
        if (err) console.log(err);
        console.log("Successful deletion");
    });
    res.status(200).json({ message: 'The user database has been deleted !' })
})



// Login user
app.post('/api/user/login', (req, res) => {
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

app.get('/api/user/cookie/:cookie', async (req, res) => {
    const cookie = req.params.cookie
    // console.log(cookie)
    const user = await getUserFromCookie(cookie).catch(err => console.log(err))
    console.log(user)
    if (user) {
        res.status(200).json(user.username)
    } else {
        res.status(404).json({ message: 'The user has not been found !' })
    }
})

// ########### API ROUTES ###########


module.exports = app