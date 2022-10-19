const mongoose = require("mongoose")

const schemaUser = new mongoose.Schema ({
    username: String, 
    passwd: String, 
    isActive: Boolean, 
    nbrMachinesCreated: Number
})

const users = mongoose.model("users", schemaUser)

module.exports = users