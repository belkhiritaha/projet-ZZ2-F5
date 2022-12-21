const  express = require("express")
const app = express()

const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const User = require("./user.models")
const Cookie = require("./cookies.models")
const VM = require("./VM.models")

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
async function decipherToken(token) {
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
        console.log("No auth header")
        return res.status(401).json({ error: 'Not authorized' })
    }
    console.log(authHeader.split(' '))
    const token = authHeader.split(' ')[1]
    if (!token) {
        console.log("No token")
        return res.status(401).json({ error: 'Not authorized' })
    }
    console.log("----> Incoming request with token: " + token)
    let userID = await verifyToken(token)
    console.log("Matches this user id: ", userID)
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
        res.status(200).json({ username : user.username , id: user._id})
    } else {
        res.status(404).json({ message: 'The user has not been found !' })
    }
})


// Get all user's vms
app.get('/api/users/:id/vms', (req, res) => {
    verifyAuth(req, res, (userID) => {
        if (userID != req.params.id) {
            console.log("Not authorized")
            return res.status(401).json({ error: 'Not authorized' })
        }
        User.findOne({_id: req.params.id})
            .then(user => {console.log("found: ", user); res.status(200).json(user.listVMs)})
            .catch(error => res.status(404).json({ error }))
    })
})


// Get user's vm by ID
app.get('/api/users/:id/vms/:vmid', (req, res) => {
    console.log("get vm by id")
    verifyAuth(req, res, (userID) => {
        if (userID != req.params.id) {
            console.log("Not authorized")
            return res.status(401).json({ error: 'Not authorized' })
        }
        User.findOne({_id: req.params.id})
            .then(user => {
                const vm = user.listVMs.find(vm => vm.id == req.params.vmid)
                if (vm) {
                    res.status(200).json(vm)
                } else {
                    res.status(404).json({ message: 'The vm has not been found !' })
                }
            })
            .catch(error => res.status(404).json({ error }))
    })
})


// create new vm
app.post('/api/users/:id/vms', (req, res) => {
    console.log("-----------------------------")
    console.log("create new vm")
    console.log(req.body)
    verifyAuth(req, res, (userID) => {
        if (userID != req.params.id) {
            console.log("Not authorized")
            return res.status(401).json({ error: 'Not authorized' })
        }
        User.findOne({_id: req.params.id})
            .then(user => {
                // create new VM db entry
                const vm = new VM({
                    ...req.body
                })
                vm.save()
                    .then(() => console.log("Succesfully added vm to database"))
                    .catch(error => console.log(error))
                // add vm to user's list
                user.listVMs.push(vm)
                user.save()
                    .then(() => res.status(201).json({ message: 'A new vm has arrived !' }))
                    .catch(error => res.status(400).json({ error }))
            })
            .catch(error => res.status(404).json({ error }))
    })
})


// update vm
app.put('/api/users/:id/vms/:vmid', (req, res) => {
    // TO DO
    console.log("-----------------------------")
    console.log("update an existing vm")
    console.log(req.body)
    verifyAuth(req, res, (userID) => {
        if (userID != req.params.id) {
            console.log("Not authorized")
            return res.status(401).json({ error: 'Not authorized' })
        }
        User.findOne({_id: req.params.id})
            .then(user => {
                // check the existence of the VM
                const vm = user.listVMs.find(vm => vm._id == req.params.vmid)
                if (vm) {
                    // update the vm
                    vm.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'The info of the vm has been modified !' }))
                        .catch(error => res.status(400).json({ error }))
                    
                } else {
                    res.status(404).json({ message: 'The vm has not been found !' })
                }
            })
            .catch(error => res.status(404).json({ error }))
    })

})


// delete vm
app.delete('/api/users/:id/vms/:vmid', (req, res) => {
    console.log("-----------------------------")
    console.log("delete an existing vm")
    console.log(req.body)
    verifyAuth(req, res, (userID) => {
        if (userID != req.params.id) {
            console.log("Not authorized")
            return res.status(401).json({ error: 'Not authorized' })
        }
        User.findOne({_id: req.params.id})
            .then(user => {
                // check the existence of the VM
                const vm = user.listVMs.find(vm => vm._id == req.params.vmid)
                if (vm) {
                    // remove vm from user's list
                    user.listVMs.splice( user.listVMs.indexOf(vm.id), 1 );
                    user.save()
                        .then(() => res.status(201).json({ message: 'VM deleted' }))
                        .catch(error => res.status(400).json({ error }))
                } else {
                    res.status(404).json({ message: 'The vm has not been found !' })
                }
            })
            .catch(error => res.status(404).json({ error }))
    })
})


// reset vm database
app.delete('/api/users/:id/vms', (req, res) => {
    console.log("-----------------------------")
    console.log("delete the vm's database")
    console.log(req.body)
    verifyAuth(req, res, (userID) => {
        if (userID != req.params.id) {
            console.log("Not authorized")
            return res.status(401).json({ error: 'Not authorized' })
        }
        User.findOne({_id: req.params.id})
            .then(user => {
                // reset the vm database
                user.listVMs.deleteMany({}, function(err) {
                    if (err) console.log(err);
                    console.log("Successful deletion");
                });
                res.status(200).json({ message: 'The vm database has been deleted !' })
            })
            .catch(error => res.status(404).json({ error }))
    })
})

// ########### API ROUTES ###########


module.exports = app