const  express = require("express")
const mongoose = require("mongoose")
const model = require("./models")
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

/*
app.post("/", async (req, res) => {    
    const user = new model(req.body)

    try {
        await user.save()
        res.send(user)
    }
    catch(error) {
        response.status(500).send(error)
    }
})

app.get("/users", async (req, res) => {
    const users = await model.find({})

    try {
        res.send(users)
    }
    catch(error) {
        response.status(500).send(error)
    }
})
*/

module.exports = app
