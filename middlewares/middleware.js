const jwt = require("jsonwebtoken");

const auth = async(req, res, next) => {
    try{
        const token = req.header("auth-x-token");

        if (!token){
            return res
            .status(401)
            .json({message: "No auth token provided, access denied"});
        }

        const isTokenValid = jwt.verify(token, "passwordKey");

        if (!isTokenValid){
            return res
            .status(401)
            .json({message: "Token is not authorized"});
        }

        req.user_id = isTokenValid.id;
        req.token = token;
        next();

    }catch (e){
        res.status(500).json({error: e.message});
    }
};

module.exports = auth;