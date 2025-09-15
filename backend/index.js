// third party imports
const express = require("express");
const app = express();
require("dotenv").config();

//third party middleware
app.use(express.json());

// file imports
const start_todo  = require("./db_connection/todo_dbconnection.js");
const todo_model = require("./model/todo_model.js");
const start_signup  = require("./db_connection/signup_dbconnection.js");
const signup_model = require("./model/signup_model.js");

// todo api
app.post("/todo/insert-dataOne", async (req, res) => {
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
        let details = { name, email, number, dob, age };
        const new_user = new todo_model(details);
        await new_user.save();
        if (new_user) {
            return res.status(200).json({
                success: true,
                message: "new user added successfully"
            })
        }
        // else {
        //     return res.status(410).json({
        //         success: false,
        //         message: "new user not added"
        //     })
        // }
    }
    catch (err) {
        console.log("internal server error (server side read-dataAll)");
        return res.status(500).json({
            err: err,
            message: err.message
        })
    }
})

app.get("/todo/read-dataAll", async (req, res) => {
    try {
        let user_data = await todo_model.find();
        if (user_data.length === 0) {
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
            err: err,
            message: err.message
        })
    }
})

app.delete("/todo/delete-dataOne/:id", async (req, res) => {
    try {
        let { id } = req.params;
        if (!mongoose.Types.ObjectID.isValid(id)) {
            return res.status(400).json({
                message: "id is not valid"
            })
        }
        if (!await todo_model.findOne({ _id: id })) {
            return res.status(404).json({
                message: "id not found"
            })
        }
        let delete_data = await todo_model.deleteOne({ _id: id });
        if (delete_data.deletedCount === 1) {
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
            err: err,
            message: err.message
        })
    }
})

app.put("/todo/update-dataOne/:id", async (req, res) => {
    try {
        let { name, email, number, dob, age } = req.body;

        let details = { name, email, number, dob, age };
        let { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "id is not valid"
            })
        }
        if (!await todo_model.findOne({ _id: id })) {
            return res.status(404).json({
                message: "id not found"
            })
        }
        let update_data = await todo_model.updateOne({ _id: id }, { $set: details })
        if (update_data.modifiedCount === 0) {
            return res.status(200).json({
                success: true,
                message: "data already present"
            })
        }
        else {
            return res.status(200).json({
                success: true,
                message: "data updated successfully"
            })
        }
    }
    catch (err) {
        console.log("internal server error (server side update-dataOne)");
        return res.status(500).json({
            err: err,
            message: err.message
        })
    }
})

// signup api -----------------------------------------------

app.post("/signup/insert-dataOne",async (req,res)=>{
    try{
        let {name,email} = req.body;
        let dup_email = signup_model.find({email});
        if (!dup_email.length===0){
            return res.status(409).json({
                message : "email is already exist, new user not added"
            })
        }
        let details = {name,email};
        let new_user = await new signup_model.insertOne(details);
        new_user.save();
        if (new_user){
            res.status(200).json({
                success:true,
                message : "new user added successfully"
            })
        }
    }
    catch(err){
        console.log("signup/insert-dataOne error - ");
        console.log(err);
        res.status(500).json({
            message : err.message
        })
    }
})

// server start function -----------------------------------------
async function start_server() {
    await start_todo();
    start_signup();
    app.listen(process.env.PORT, () => {
        console.log(`app is listening at port ${process.env.PORT}`);
    })
}

start_server();