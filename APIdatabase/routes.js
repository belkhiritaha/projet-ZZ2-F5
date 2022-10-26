const  express = require("express")
const model = require("./models")

const app = express()

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

module.exports = app
