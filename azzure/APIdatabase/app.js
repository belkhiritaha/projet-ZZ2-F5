const express = require("express")
const app = express()

const jwt = require('jsonwebtoken')
const { check, validationResult, body } = require('express-validator')

const bcrypt = require('bcrypt')
const saltRounds = 10

const util = require('util');
const { exec } = require('child_process');
const execPromise = util.promisify(exec);
const fs = require('fs');

const mongoose = require('mongoose')
const User = require("./user.models")
const Cookie = require("./cookies.models")
const VM = require("./VM.models")
const { TIMEOUT } = require("dns")

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
let db = "mongodb://localhost:27017/aZZure";

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
    const token = jwt.sign({
        userIdentifier
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
    }).catch((err) => {
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
        User.findOne({ _id: req.params.id })
            .then(user => res.status(200).json(user))
            .catch(error => res.status(404).json({ error }))
    })
})


// Create user : Register
const registerValidate = [
    check('username', 'Username must not be empty')
        .notEmpty()
        .custom(async (value) => {
            const user = await User.findOne({ username: value });
            if (user) {
                throw new Error('Username already in use');
            }
        }),
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

async function createUser(userID) {
    console.log("Create the user file");
    try {
        const { stdout } = await execPromise("python3 ../kube_management/create_user.py " + userID);
    } catch (error) {
        console.log(`error: ${error.message}`);
        throw error;
    }
};

app.post('/api/users', registerValidate, (req, res) => {
    // Check the data entry (valid username and 8-length password)
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    // Retrieve data
    const { username, email, passwd } = req.body

    bcrypt.hash(passwd, saltRounds)
        .then(async hash => {
            const user = new User({
                username: username,
                email: email,
                passwd: hash
            })
            user.save()
                .then(async () => {
                    console.log(user._id.toString())
                    try {
                        await createUser(user._id.toString()).then(() => {
                            res.status(201).json({ message: 'A new user has arrived !' })
                        })
                    } catch (error) {
                        User.deleteOne({ _id: user._id })
                        console.log(error)
                        throw error;
                    }
                })
                .catch(error =>
                    res.status(400).json({ error }))
            console.log("Succesfully added user to database");
        })
        .catch(error => res.status(400).json({ error }))
})


// UPDATE the user's data : In this case, the infos are optional
const updateValidate = [
    check('username', 'Username must be unique')
        .optional()
        .custom(async (value) => {
            const user = await User.findOne({ username: value });
            if (user) {
                throw new Error('Username already in use');
            }
        }),
    check('email', 'Email Must Be an Email Address')
        .optional().isEmail().trim().escape().normalizeEmail(),
    check('passwd')
        .optional()
        .isLength({ min: 8 })
        .withMessage('Password Must Be at Least 8 Characters')
        .matches('[0-9]').withMessage('Password Must Contain a Number')
        .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')
        .trim().escape()
]

app.put('/api/users/:id', updateValidate, async (req, res) => {
    // Check the data entry (valid username, email and 8-length password -- if given)
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    verifyAuth(req, res, async (userID) => {
        if (userID != req.params.id) {
            return res.status(401).json({ error: 'Not authorized' })
        }

        const user = await User.findOne({ _id: req.params.id })

        const actualUsername = user.username
        const actualEmail = user.email
        const actualPasswd = user.passwd

        let NewUsername = req.body.username
        let NewEmail = req.body.email
        let NewPasswd = req.body.passwd

        if (NewUsername === undefined) {
            NewUsername = actualUsername
        }

        if (NewEmail === undefined) {
            NewEmail = actualEmail
        }

        if (NewPasswd === undefined) {
            NewPasswd = actualPasswd
        } else {
            const hashedPassword = await bcrypt.hash(NewPasswd, saltRounds)
            NewPasswd = hashedPassword
        }

        User.updateOne({ _id: req.params.id }, {
            _id: req.params.id,
            username: NewUsername,
            email: NewEmail,
            passwd: NewPasswd
        }).then(() => res.status(200).json({ message: 'The data of the user has been modified !' }))
            .catch(error => res.status(400).json({ error }))
    })
})


// DELETE user by ID
app.delete('/api/users/:id', async (req, res) => {
    verifyAuth(req, res, async (userID) => {
        if (userID != req.params.id) {
            return res.status(401).json({ error: 'Not authorized' })
        }
        try {
            await deleteUser(userID).then(User.deleteOne({ _id: userID })
                .then(user => res.status(200).json({ message: 'The user has been deleted !' }))
                .catch(error => res.status(400).json({ error })));
        } catch (error) {
            throw error;
        }
    })
})


async function deleteUser(userID) {
    console.log("Delete the user file");
    try {
        await execPromise("python3 ../kube_management/delete_user.py " + userID);
    } catch (error) {
        console.log(`error: ${error.message}`);
        throw error;
    }
};

// reset user database
app.delete('/api/users', async (req, res) => {
    //condition d'authentification!!
    try {
        const users = await User.find();
        await users.map(async user => {
            try {
                await deleteUser(user._id);
                await users.deleteOne({ _id: user._id });
            }
            catch (error) {
                throw error;
            }
        })
        console.log("Successful deletion");
        res.status(200).json({ message: 'The user database has been deleted !' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error });
    }
})


// Login user
app.post('/api/users/login', (req, res) => {
    User.findOne({ username: req.body.username })
        .then(async (user) => {
            if (user) {
                const match = await bcrypt.compare(req.body.passwd, user.passwd)
                if (match) {
                    const cookie = generateNewCookie(user._id)
                    res.status(200).json({ message: 'The user has been logged in !', cookie: cookie })
                    console.log("The user has been logged in !");
                } else {
                    res.status(400).json({ message: 'The password is incorrect !' })
                    console.log("The password is incorrect !");
                }
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
        res.status(200).json({ username: user.username, id: user._id })
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
        User.findOne({ _id: req.params.id })
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
        VM.findOne({ _id: req.params.vmid })
            .then(vm => res.status(200).json(vm))
            .catch(error => res.status(404).json({ error }))
    })
})


// create new vm

async function writeInFile(body) {
    try {
        await fs.writeFile('../tmp.json', JSON.stringify(body), err => {
            if (err) {
                console.error(err);
                throw err;
            }
            console.log('Data written to file');
        });
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function createVm(body) {
    console.log("ok2");
    try {
        await writeInFile(body);
        const { stdout } = await execPromise("python3 ../main.py ../tmp.json", timeout = 10);
        console.log(stdout);
        return;
    } catch (error) {
        console.log(`error: ${error.message}`);
        throw error;
    }
};

app.post('/api/users/:id/vms', async (req, res) => {
    // const errors = validationResult(req)

    // if (!errors.isEmpty()) {
    //     console.log(errors); 
    //     return res.status(422).json({ errors: errors.array() })
    // }

    console.log("-----------------------------")
    console.log("create new vm")
    console.log(req.body)
    verifyAuth(req, res, (userID) => {
        if (userID != req.params.id) {
            console.log("Not authorized")
            return res.status(401).json({ error: 'Not authorized' })
        }
        User.findOne({ _id: req.params.id })
            .then(user => {
                const vm = new VM({
                    owner: user._id,
                    ...req.body,
                    status: 0
                })

                vm.save()
                    .then(() => {
                        console.log("Succesfully added vm to database");
                        VM.findOne({ _id: vm._id }).then(async vmm => {
                            let bodycreate = { owner: vmm.owner.toString(), VMid: vmm._id.toString(), VMname: vmm.VMname, VMservices: req.body.VMservices };
                            console.log(bodycreate)
                            try {
                                vmm.status = 1
                                vmm.save()
                                user.listVMs.push(vm._id)
                                user.save()
                                    .then()
                                createVm(bodycreate)
                                    .then(() => res.status(201).json({ message: 'A new vm has arrived !' }))
                                    .catch(error => res.status(400).json({ error }))



                            }
                            catch (error) {
                                VM.deleteOne({ _id: vmm._id }).then(console.log(error))
                                throw error;
                            }
                        });

                    })
            })
            .catch(error => res.status(404).json({ error }))
    })
})


// update vm

app.put('/api/users/:id/vms/:vmid', (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    console.log("-----------------------------")
    console.log("update an existing vm")
    console.log(req.body)
    verifyAuth(req, res, (userID) => {
        if (userID != req.params.id) {
            console.log("Not authorized")
            return res.status(401).json({ error: 'Not authorized' })
        }

        VM.findOne({ _id: req.params.vmid })
            .then(vm => {
                // loop through body params
                for (const key in req.body) {
                    if (["name", "description", "services"].includes(key)) {
                        vm[key] = req.body[key]
                    }
                }

                vm.save()
                    .then(() => { console.log(vm.name); res.status(200).json({ message: 'The vm has been updated !' }) })
                    .catch(err => res.status(400).json({ error: err }))
            }
            )
            .catch(err => res.status(404).json({ error: err }))
    })

})

app.get('/api/users/:id/vms/:vmid/status', async (req, res) => {
    verifyAuth(req, res, async (userID) => {
        if (userID != req.params.id) {
            console.log("Not authorized")
            return res.status(401).json({ error: 'Not authorized' })
        }
        VM.findOne({ _id: req.params.vmid })
            .then(async vm => {
                const vmName = vm.VMname
                console.log("ok")
                try {
                    const { stdout } = await execPromise("python3 ../kube_management/check_status_app.py " + req.params.id + " " + req.params.vmid + vmName, timeout = 10);
                    console.log("python3 ../kube_management/check_status_app.py " + req.params.id + " " + req.params.vmid + vmName);
                    console.log(stdout);
                    return;
                } catch (error) {
                    console.log(`error: ${error.message}`);
                    throw error;
                }
            })
    }
    )   
    })

app.delete('/api/users/:id/vms/:vmid', async (req, res) => {
    console.log("-----------------------------")
    console.log("delete an existing vm")
    console.log(req.body)
    verifyAuth(req, res, (userID) => {
        if (userID != req.params.id) {
            console.log("Not authorized")
            return res.status(401).json({ error: 'Not authorized' })
        }
        User.findOne({ _id: req.params.id })
            .then(async user => {
                try {
                    VM.findOne({ _id: req.params.vmid }).then (async(vm)=>{
                        console.log(userID , "                    ",  req.params.vmid+vm.VMname)
                    await deleteVm(userID, vm._id.toString() + vm.VMname).then(() => {
                        // remove vm from user's list
                        user.listVMs.pull(req.params.vmid)
                        user.save()
                            .then(() => console.log("Succesfully removed vm from user's list"))
                        // remove vm from database
                        VM.deleteOne({ _id: req.params.vmid })
                            .then(() => res.status(200).json({ message: 'The vm has been deleted !' }))
                        })
                    })
                } catch (error) {
                    console.log(error);
                    throw (error)
                }
            }).catch(error => res.status(404).json({ error }))
    })
})

async function startVm(userID, vmID) {
    console.log("ok2");
    const data = require('../users/' + userID + '/backup/' + vmID + '.json')
    try {
        const { stdout } = await execPromise("python3 ../main.py " + data, timeout = 10);
        console.log(stdout);
        return;
    } catch (error) {
        console.log(`error: ${error.message}`);
        throw error;
    };
}

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
        VM.findOne({ _id: req.params.vmid })
            .then(async vm => {
                try {
                    await startVm(userID, vm._id.toString() + vm.VMname).then(() => {
                        vm.status = 1
                        vm.save()
                            .then(() => res.status(200).json({ message: 'The vm has been started !' }))
                            .catch(error => res.status(400).json({ error }))
                    })
                } catch (error) { throw error; }
            })
            .catch(error => res.status(404).json({ error }))
    })
})


async function deleteVm(userID, vmID) {
    console.log("ok2");
    try {
        console.log(userID, vmID)
        await execPromise("python3 ../kube_management/delete_app_api.py " + userID + " " + vmID);
    } catch (error) {
        console.log(`error: ${error.message}`);
        throw error;
    }
};


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
        VM.findOne({ _id: req.params.vmid })
            .then(async vm => {
                try {

                    await deleteVm(userID, vm._id.toString() + vm.VMname).then(() => {
                        vm.status = 0
                        vm.save()
                            .then(() => res.status(200).json({ message: 'The vm has been stopped !' }))
                            .catch(error => res.status(400).json({ error }))
                    })
                } catch (error) { throw error; }

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
        User.findOne({ _id: req.params.id })
            .then(user => {
                // reset the vm database
                user.listVMs = []
                user.save()
                    .then(() => console.log("Succesfully reset the vm database"))
                    .catch(error => console.log(error))
            })
            .catch(error => res.status(404).json({ error }))

        VM.deleteMany({ owner: userID })
            .then(() => res.status(200).json({ message: 'The vm database has been reset !' }))
            .catch(error => res.status(400).json({ error }))
    })
})

// ########### API ROUTES ###########


module.exports = app, generateNewCookie