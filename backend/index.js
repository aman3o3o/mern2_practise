// third party imports
const express = require("express");
const app = express();
require("dotenv").config();

//third party middleware
app.use(express.json());

// file imports
const { start_todo } = require("./db_connection/todo_dbconnection.js");
const { todo_model } = require("./model/todo_model.js");

// routes
app.post("/insert-dataOne", async (req, res) => {
    try {
        let { name, email, number, dob, age } = req.body;

        let duplicate_email = await todo_model.findOne({ email });
        if (duplicate_email) {
            return res.status(409).json({
                message: "email id already exist"
            })
        }
        let duplicate_number = await todo_model.findOne({ number });
        if (duplicate_number) {
            return res.status(409).json({
                message: "number already exist"
            })
        }
        let insert_data = { name, email, number, dob, age };
        const new_user = new todo_model(insert_data);
        await new_user.save();
        if (new_user) {
            return res.status(200).json({
                success: true,
                message: "new user added successfully"
            })
        }
        else {
            return res.status(410).json({
                success: false,
                message: "user not added"
            })
        }
    }
    catch (err) {
        console.log("internal server error (server side read-dataAll)");
        return res.status(500).json({
            err: err
        })
    }
})

app.get("/read-dataAll", async (req, res) => {
    try {
        let user_data = await todo_model.find();
        if (user_data.length <= 0) {
            return res.status(404).json({
                message: "user not found"
            })
        }
        else {
            return res.status(200).json({
                success: true,
                user_data: user_data
            })
        }
    }
    catch (err) {
        console.log("internal server error (server side read-dataAll)");
        return res.status(500).json({
            err: err
        })
    }
})

app.delete("/delete-dataOne/:id", async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.Types.ObjectID.isvalid("id")) {
            return res.status(404).json({
                message: "id is not valid"
            })
        }
        else {
            return res.status(400).json({
                message: "id not found"
            })
        }
        let delete_id = { _id: ObjectID('id') }
        let delete_data = await todo_model.deleteOne(delete_id);
        if (delete_data.deletedCount) {
            return res.status(200).json({
                success: true,
                message: "data deleted successfully"
            })
        }
        else {
            return res.status(500).json({
                message: "data not deleted"
            })
        }
    }
    catch (err) {
        console.log("internal server error (server side delete-dataOne)");
        res.status(500).json({
            err:err
        })
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