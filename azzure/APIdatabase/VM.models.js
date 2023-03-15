const mongoose = require("mongoose")

const vmSchema = new mongoose.Schema ({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    VMname: { type: String, required: true },
    VMservices: { type: Array, required: true },
    services:{ type: Array, required: true },
    status: { type: Number, required: true },
})

const vms = mongoose.model("vm", vmSchema)

module.exports = vms
