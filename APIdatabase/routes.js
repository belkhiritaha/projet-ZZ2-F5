const  express = require("express")
const model = require("./models")

const app = express()

/*
app.post("/post", async (req, res) => {
    console.log("inside post fucntion")

    const data = new mongomodel({
        username: req.body.username,
        passwd: req.body.passwd,
        isActive: req.body.isActive,
        nbrMachinesCreated: req.body.nbrMachinesCreated
    })

    const value = await data.save()
    res.json(value)
})
*/

app.post("/add_user", async (req, res) => {
    cconsole.log("inside post function")
    
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
    console.log("inside get function")
    
    const users = await model.find({})

    try {
        res.send(users)
    }
    catch(error) {
        response.status(500).send(error)
    }
})

module.exports = app
