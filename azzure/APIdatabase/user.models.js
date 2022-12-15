const mongoose = require("mongoose")

const userSchema = new mongoose.Schema ({
    username: { type: String, required: true }, 
    passwd: { type: String, required: true }, 
    listVMs: [{
        name: { type: String, required: true }, 
        OS: { type: String, required: true }
    }]
})

const users = mongoose.model("user", userSchema)

module.exports = users
