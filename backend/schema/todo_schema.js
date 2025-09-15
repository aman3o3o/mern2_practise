const mongoose = require("mongoose");

const todo_schema = mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true,
        unique: true
    },
    "number": {
        type: String,
        required: true,
        unique: true
    },
    "dob": {
        type: String,
        required: true,
    },
    "age": {
        type: String,
        required: true
    },
    "income": String
})

module.exports = todo_schema;