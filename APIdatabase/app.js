const  express = require("express")
const mongoose = require("mongoose")
const User = require("./models")
const app = express()

mongoose.connect("mongodb+srv://aZZure:admin@cluster0.tm9ghpd.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (!err) {
        console.log("connected to MongoDB server")
    } else {
        console.log("error")
    }
})

app.use(express.json())

// POST user
app.post('/api/user', (req, res) => {
    //delete req.body._id    
    const user = new User({
        ...req.body
    })

    user.save()
        .then(() => res.status(201).json({ message: 'A new user has arrived !' }))
        .catch(error => res.status(400).json({ error }))
})

// GET user by ID
app.get('/api/user/:id', (req, res) => {
    User.findOne({_id: req.params.id})
        .then(user => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }))
})

// GET all users
app.get('/api/user', (req, res) => {
    console.log(req.body)
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

module.exports = app