const  express = require("express")
const mongoose = require("mongoose")
const router = require("./routes")

const app = express()

app.use(express.json())

mongoose.connect("mongodb://localhost:27017/logsDB", {
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

app.listen(2000, () => {
    console.log("listening on port 2000")
})
