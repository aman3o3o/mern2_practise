const mongoose = require("mongoose");

const todo_schema = require("../schema/todo_schema");

const todo_model = mongoose.model("todo",todo_schema);


module.exports = todo_model;