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
    },
    password:{
        type:String,
        required:true
    },
    resetpasswordtoken : {
        type:String
    },
    resetpasswordexpire : {
        type:Date
    }
})

module.exports = signup_schema ;