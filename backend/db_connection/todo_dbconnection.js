const mongoose = require("mongoose");

const start_todo = async () => {
    await mongoose.connect(process.env.TODO_URL);
    console.log("server is connected to todo database using mongoose");
}

module.exports = start_todo;