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
    resetpasswordtokenexpire : {
        type:Date
    },
    resetpasswordtokenused : {
        type : Boolean,
        default : false
    }
})

module.exports = signup_schema ;