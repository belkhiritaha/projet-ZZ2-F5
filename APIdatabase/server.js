const  express = require("express")
const mongoose = require("mongoose")
const router = require("./routes")

const app = express()

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/subscription", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (!err) {
        console.log("connected to db")
    } else {
        console.log("error")
    }
})

app.use(router)

app.listen(3000, () => {
    console.log("listening on port 3000")
})
