const mongoose = require("mongoose")

const userSchema = new mongoose.Schema ({
    username: { type: String, required: true, unique: true }, 
    email: { type: String, required: true },
    passwd: { type: String, required: true, minlength: 8 },
    // list of VM objects
    listVMs: { type: Array, required: true }
})

const users = mongoose.model("user", userSchema)

module.exports = users
