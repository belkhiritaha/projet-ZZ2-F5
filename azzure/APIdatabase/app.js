const  express = require("express")
const app = express()

const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')

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
    }).catch((err)  => {
        console.log("invalid token")
    })
}

// Verify token and return user id
async function verifyToken(token) {
    await new Promise(r => setTimeout(r, 1000));
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

// Verify authentication and call next() if authentification is successful
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

const registerValidate = [
    check('username', 'Username must be unique')
        .notEmpty(),
    check('email', 'Email Must Be an Email Address')
        .isEmail().trim().escape().normalizeEmail(),
    check('passwd')
        .notEmpty()
        .isLength({ min: 8 })
        .withMessage('Password Must Be at Least 8 Characters')
        .matches('[0-9]').withMessage('Password Must Contain a Number')
        .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')
        .trim().escape()
]

// Create user : Register
app.post('/api/users', registerValidate, (req, res) => {   
    // Check the data entry (valid username and 8-length password)
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    // Retrieve data
    const { username, email, password } = req.body

    const user = new User({
        username: username,
        email: email,
        passwd: password
    })

    console.log(req.body)

    user.save()
        .then(() => res.status(201).json({ message: 'A new user has arrived !' }))
        .catch(error => res.status(400).json({ error }))
            
    console.log("Succesfully added user to database");
})


// UPDATE the user's data
app.put('/api/users/:id', (req, res) => {
    // *
    User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'The data of the user has been modified !' }))
        .catch(error => res.status(400).json({ error }))
})

// DELETE user by ID
app.delete('/api/users/:id', (req, res) => {
    // The problem with this functiobn is that any user in the app who has another user's ID can delete his info
    // Should verify that a user canb only delete his own data + (Add a super user; admin ??)
    User.deleteOne({_id: req.params.id})
        .then(user => res.status(200).json({ message: 'The user has been deleted !' }))
        .catch(error => res.status(400).json({ error }))
})


// reset user database
app.delete('/api/users', (req, res) => {
    // Anyone can delete everything
    User.deleteMany({}, function(err) {
        if (err) {
            console.log(err);
            res.status(400).json({ error })

        }
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
        .catch(error => res.status(400).json({ error }))
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
            .then(user => {
                const vmIds = user.listVMs
                VM.find({ _id: { $in: vmIds } })
                    .then(vms => res.status(200).json(vms))
                    .catch(error => res.status(404).json({ error }))
            })
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
        VM.findOne({_id: req.params.vmid})
            .then(vm => res.status(200).json(vm))
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
                    // Should filter this entry
                    // Verify that all the technologies that the user choosed are available and working
                    ...req.body,
                    owner: user._id,
                    status: 0
                })
                vm.save()
                    .then(() => console.log("Succesfully added vm to database"))
                    .catch(error => console.log(error))
                // add vm to user's list
                user.listVMs.push(vm._id)
                user.save()
                    .then(() => res.status(201).json({ message: 'A new vm has arrived !' }))
                    .catch(error => res.status(400).json({ error }))
            })
            .catch(error => res.status(404).json({ error }))
    })
})


// update vm
app.put('/api/users/:id/vms/:vmid', (req, res) => {
    console.log("-----------------------------")
    console.log("update an existing vm")
    console.log(req.body)
    verifyAuth(req, res, (userID) => {
        if (userID != req.params.id) {
            console.log("Not authorized")
            return res.status(401).json({ error: 'Not authorized' })
        }

        VM.findOne({_id: req.params.vmid})
            .then(vm => {
                // loop through body params
                for (const key in req.body) {
                    if (["name", "description", "services"].includes(key)) {
                        vm[key] = req.body[key]
                    }
                }

                vm.save()
                    .then(() => {console.log(vm.name); res.status(200).json({ message: 'The vm has been updated !' })})
                    .catch(err => res.status(400).json({ error: err }))
            }
            )
            .catch(err => res.status(404).json({ error: err }))
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
                // remove vm from user's list
                user.listVMs.pull(req.params.vmid)
                user.save()
                    .then(() => console.log("Succesfully removed vm from user's list"))
                    .catch(error => console.log(error))
                // remove vm from database
                VM.deleteOne({_id: req.params.vmid})
                    .then(() => res.status(200).json({ message: 'The vm has been deleted !' }))
                    .catch(error => res.status(404).json({ error }))
            })
    })
})


// start vm
app.post('/api/users/:id/vms/:vmid/start', (req, res) => {
    console.log("-----------------------------")
    console.log("start an existing vm")
    console.log(req.body)
    verifyAuth(req, res, (userID) => {
        if (userID != req.params.id) {
            console.log("Not authorized")
            return res.status(401).json({ error: 'Not authorized' })
        }
        VM.findOne({_id: req.params.vmid})
            .then(vm => {
                // start vm
                vm.status = 1
                vm.save()
                    .then(() => res.status(200).json({ message: 'The vm has been started !' }))
                    .catch(error => res.status(400).json({ error }))
            })
            .catch(error => res.status(404).json({ error }))
    })
})


// stop vm
app.post('/api/users/:id/vms/:vmid/stop', (req, res) => {
    console.log("-----------------------------")
    console.log("stop an existing vm")
    console.log(req.body)
    verifyAuth(req, res, (userID) => {
        if (userID != req.params.id) {
            console.log("Not authorized")
            return res.status(401).json({ error: 'Not authorized' })
        }
        VM.findOne({_id: req.params.vmid})
            .then(vm => {
                // stop vm
                vm.status = 0
                vm.save()
                    .then(() => res.status(200).json({ message: 'The vm has been stopped !' }))
                    .catch(error => res.status(400).json({ error }))
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
                user.listVMs = []
                user.save()
                    .then(() => console.log("Succesfully reset the vm database"))
                    .catch(error => console.log(error))
            })
            .catch(error => res.status(404).json({ error }))

        VM.deleteMany({owner: userID})
            .then(() => res.status(200).json({ message: 'The vm database has been reset !' }))
            .catch(error => res.status(400).json({ error }))
        })
})

// ########### API ROUTES ###########


module.exports = app