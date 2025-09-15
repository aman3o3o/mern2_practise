const basejoi = require("joi");
const joi_date = require("@joi/date");
const joi = basejoi.extend(joi_date);

const joi_schema = joi.object({
    name : joi.string().pattern(/[A-Za-z ]+/).required(),
    email : joi.string().email().required(),
    number : joi.string().pattern(/[0-9]+/).min(10).max(10).required(),
    dob : joi.date().min("2000-01-01").max("2020-12-31").required(),
    state : joi.string().pattern(/[A-Za-z]+/)
})