const mongoose = require("mongoose")

const schemaUser = new mongoose.Schema ({
    username: String, 
    _passwd: String, 
    listVMs: [{
        _idVM: Number,
        name: String, 
        OS: String,
    }]
})

const users = mongoose.model("users", schemaUser)

module.exports = users