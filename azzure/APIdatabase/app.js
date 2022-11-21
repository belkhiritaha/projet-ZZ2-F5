const  express = require("express")
const mongoose = require("mongoose")
const User = require("./models")
const Cookie = require("./cookies.models")
const app = express()

// listen on port 8001
app.listen(8001, () => {
    console.log("Server running on port 8001")
})


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


function generateNewCookie(){
    let cookie;
    cookie = new Cookie({
        value: Math.floor(Math.random() * 1000000),
    })
    console.log(cookie.value)
    cookie.save()
    return cookie.value
}


const conSuccess = mongoose.connection
conSuccess.once('open', _ => {
  console.log('Database connected:', db)
})


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

data = express.json()
app.use(data)

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

// Login user
app.post('/api/user/login', (req, res) => {
    // clear user database
    // User.deleteMany({}, function(err) {
    //     if (err) console.log(err);
    //     console.log("Successful deletion");
    // });
    console.log(req.body)
    User.findOne({username: req.body.username, passwd: req.body.passwd})
        .then(user => {
            if (user) {
                const cookie = {
                    value: generateNewCookie()
                }
                res.status(200).json({ message: 'The user has been logged in !', cookie: cookie })
                // create cookie
                
                // print all cookies
                // Cookie.find()
                // .then(cookies => console.log(cookies))
                // .catch(error => console.log(error))          
                
                console.log("The user has been logged in !");
            } else {
                res.status(404).json({ message: 'The user has not been found !' })
                console.log("The user has not been found !");
            }
        })
        .catch(error => res.status(404).json({ error }))
})

module.exports = app
