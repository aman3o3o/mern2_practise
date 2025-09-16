const jwt = require("jsonwebtoken");
const util = require("util");

const token_verify = (req,res,next) => {
    try{
        let token = req.headers.Authorization;
        let decoded = jwt.promisify(token,process.env_SECRET_KEY);
            next();
        }
    catch(err){
        return res.status(401).json({
            err:err,
            message:err.message,
            name:err.name
        })
    }
}

module.exports = token_verify;
