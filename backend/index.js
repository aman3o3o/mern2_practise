// third party imports
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");

//third party middleware
app.use(express.json());
app.use(cors());

// file imports
const start_todo = require("./db_connection/todo_dbconnection.js");
const todo_model = require("./model/todo_model.js");
const start_signup = require("./db_connection/signup_dbconnection.js");
const signup_model = require("./model/signup_model.js");
const { joi_signup_schema } = require("./joi_validation/joi_validation.js");
const TokenVerify = require("./middleware/TokenVerify.js");

// todo api
app.post("/todo/insert-dataOne", async (req, res) => {
    try {
        let { name, email, number, dob, age } = req.body;

        let duplicate_email = await todo_model.findOne({ email });
        if (duplicate_email) {
            return res.status(409).json({
                message: "email id already exist, data not inserted"
            })
        }
        let duplicate_number = await todo_model.findOne({ number });
        if (duplicate_number) {
            return res.status(409).json({
                message: "number already exist, data not inserted"
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
                message: "user not found, data not fetched"
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
        // if (!mongoose.Types.ObjectID.isValid(id)) {
        //     return res.status(400).json({
        //         message: "id is not valid, data not deleted"
        //     })
        // }
        // if (!await todo_model.findOne({ _id: id })) {
        //     return res.status(404).json({
        //         message: "id not found, data not deleted"
        //     })
        // }
        let delete_data = await todo_model.deleteOne({ _id: id });
        if (delete_data.deletedCount === 1) {
            return res.status(200).json({
                success: true,
                message: "data deleted successfully"
            })
        }
        // else {
        //     return res.status(500).json({
        //         message: "data not deleted"
        //     })
        // }
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
        // if (!mongoose.Types.ObjectId.isValid(id)) {
        //     return res.status(400).json({
        //         message: "id is not valid, data not updated"
        //     })
        // }
        // if (!await todo_model.findOne({ _id: id })) {
        //     return res.status(404).json({
        //         message: "id not found, data not updated"
        //     })
        // }
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
app.post("/signup/insert-dataOne", async (req, res) => {
    try {
        await joi_signup_schema.validateAsync(req.body, { abortEarly: false });
        console.log(".................");
        let { name, email, password } = req.body;

        password = await bcrypt.hash(password, 10);

        let details = { name, email, password };
        let new_user = await new signup_model(details);
        await new_user.save();
        if (new_user) {
            res.status(200).json({
                success: true,
                message: "new user added successfully"
            })
        }
    }
    catch (err) {
        console.log("server side - signup/insert-dataOne error - ");
        console.log(err);
        res.status(500).json({
            err: err,
            name: err.name,
            message: err.message
        })
    }
})

// login_api ----------------------------------------
app.post("/login/read-dataOne", async (req, res) => {
    try {

        let { email, password } = req.body;
        let dup = await signup_model.find({ email });
        if (dup.length === 0) {
            return res.status(404).json({
                message: "email id or password is wrong"
            })
        }
        let pass_check = await bcrypt.compare(password, dup[0].password);
        if (!pass_check) {
            return res.status(404).json({
                message: "email id or password is wrong"
            })
        }
        let jwt_promise = util.promisify(jwt.sign);
        let payload = {name:dup[0].name , email:dup[0].email};
        let token = jwt_promise(payload,process.env.SECRET_KEY,{expiresIn:'1h'});
        if (token){
            return res.status(200).json({
            success: true,
            message: "congrats, you are logged in",
            token:token
        })
        }
    }
    catch (err) {
        console.log("server side (/login/read-dataOne) error - ");
        console.log(err);
        return res.status(500).json({
            message: err.message,
            name : err.name
        })
    }
})

// private_route ------------------------------------------------
app.get("/privateRoute",TokenVerify,(req,res)=>{
    return res.status(200).json({
        success : true
    })
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