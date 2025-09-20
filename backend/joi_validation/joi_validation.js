const basejoi = require("joi");
const joi_date = require("@joi/date");
const joi = basejoi.extend(joi_date);

const joi_todo_schema = joi.object({
    name : joi.string().pattern(/[A-Za-z ]+/).required().min(8),
    email : joi.string().email().required(),
    number : joi.string().pattern(/[0-9]+/).min(10).max(10).required(),
    dob : joi.date().min("2000-01-01").max("2024-12-31").required(),
    state : joi.string().pattern(/[A-Za-z ]+/).min(2)
})

const joi_signup_schema = joi.object({
    name : joi.string().pattern(/[A-Za-z ]+/).required().min(8),
    email : joi.string().email().required(),
    password : joi.string().pattern(/[0-9]+/).min(5)
})

module.exports = {joi_todo_schema,joi_signup_schema};