// third party imports
const express = require("express");
const app = express();
require("dotenv").config();

// file imports
const { start_todo } = require("./db_connection/todo_dbconnection.js");
const { todo_model } = require("./model/todo_model.js");

// routes
app.use("/insert-dataOne", async (req, res) => {
    try {
        const user = new todo_model({ "name": "A B", "email": "abcd@gmail.com", "number": "12345", "dob": "30/11/2001", "age": "21" });
        await user.save();
        if (user){
            return res.status(200).json({
                success : true,
                message : "new user added successfully"
            })
        }
        else{
            return res.status(410).json({
                success:false,
                message:"user not added"
            })
        }
    }
    catch(err){
        return res.status(500).send("internal server error (server side insert-dataOne route )");
    }
})
// server start function
async function start_server() {
    await start_todo();
    app.listen(process.env.PORT, () => {
        console.log(`app is listening at port ${process.env.PORT}`);
    })
}

start_server();