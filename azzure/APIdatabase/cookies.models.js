const mongoose = require("mongoose")

const cookieSchema = new mongoose.Schema ({
    value: { type: String, required: true },
    linkedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

const cookies = mongoose.model("cookie", cookieSchema)

module.exports = cookies
