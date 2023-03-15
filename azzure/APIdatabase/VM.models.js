const mongoose = require("mongoose")

const vmSchema = new mongoose.Schema ({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    VMdesc: { type: String, required: false },
    VMname: { type: String, required: true },
    VMservices: { type: Array, required: true },
    services:{ type: Array, required: false },
    status: { type: Number, required: true },
})

const vms = mongoose.model("vm", vmSchema)

module.exports = vms
