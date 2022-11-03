const mongoose = require("mongoose")

const userSchema = new mongoose.Schema ({
    username: { type: String, required: true }, 
    _passwd: { type: String, required: true }, 
    listVMs: [{
        _idVM: { type: Number, required: true },
        name: { type: String, required: true }, 
        OS: { type: String, required: true }
    }],
})

const users = mongoose.model("user", userSchema)

module.exports = users
