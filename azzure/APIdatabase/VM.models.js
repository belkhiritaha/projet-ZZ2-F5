const mongoose = require("mongoose")

const vmSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    description: { type: String, required: true },
    ram: { type: Number },
    cpu: { type: Number },
    disk: { type: Number },
    network: { type: String },
    status: { type: Number, required: true },
    os: { type: String },
    services: { type: Array, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    docker_id:{ type: String}
})

const vms = mongoose.model("vm", vmSchema)

module.exports = vms