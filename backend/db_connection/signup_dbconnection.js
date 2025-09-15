const mongoose = require("mongoose");

const start_signup = () => {
    const signup_connection = mongoose.createConnection(process.env.SIGNUP_URL);
    signup_connection.on("connected", () => {
        console.log("signup database connected to server");
    })
    signup_connection.on("error", (err) => {
        console.log("signup database connection error -");
        console.log(err);
    })


    return signup_connection;
}

module.exports = start_signup ;