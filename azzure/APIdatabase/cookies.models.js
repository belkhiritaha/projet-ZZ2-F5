const mongoose = require("mongoose")

const cookieSchema = new mongoose.Schema ({
    value: { type: String, required: true },
})

const cookies = mongoose.model("cookie", cookieSchema)

module.exports = cookies
