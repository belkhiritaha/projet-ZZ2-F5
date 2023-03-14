const mongoose = require("mongoose")

const vmSchema = new mongoose.Schema ({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    VMname: { type: String, required: true },
    VMdesc: { type: String, required: true },
    ram: { type: Number, min: 0 },
    cpu: { type: Number, min: 0 },
    disk: { type: Number, min: 0 },
    network: { type: String },
    status: { type: Number, required: true },
    os: { type: String },
    services: { type: Array, required: true },
})

const vms = mongoose.model("vm", vmSchema)

module.exports = vms
