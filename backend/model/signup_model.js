const start_signup = require("../db_connection/signup_dbconnection");
const signup_schema = require("../schema/signup_schema");

const signup_connection = start_signup();
const signup_model = signup_connection.model("signup",signup_schema);

module.exports = signup_model;