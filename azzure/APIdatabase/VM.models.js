const mongoose = require("mongoose")

const vmSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    description: { type: String, required: true },
    ram: { type: Number, required: true },
    cpu: { type: Number, required: true },
    disk: { type: Number, required: true },
    network: { type: String, required: true },
    status: { type: Number, required: true },
    os: { type: String, required: true },
    services: { type: Array, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

const vms = mongoose.model("vm", vmSchema)

module.exports = vms