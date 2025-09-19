const jwt = require("jsonwebtoken");
const util = require("util");

const token_verify = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        let jwt_verify_promise = util.promisify(jwt.verify)
        await jwt_verify_promise(token, process.env.SECRET_KEY);
        next();
    }
    catch (err) {
        return res.status(401).json({
            err: err,
            message: err.message,
            name: err.name
        })
    }
}

module.exports = token_verify;
