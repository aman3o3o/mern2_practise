const mongoose = require("mongoose");

const signup_schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = signup_schema ;