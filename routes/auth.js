// IMPORTS FROM PACKAGES
const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// IMPORTS FROM OTHER FILES
const User = require("../models/user");
const { json } = require("express");
const auth = require("../middlewares/middleware");

// INIT
const authRouter = express.Router();

// API's
// SIGN UP
authRouter.post("/api/signup", async(req, res) => {
    try{
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({email});

   if (existingUser){
    return res
    .status(400)
    .json({message: "User with this email does already exist"});
   }

   const hashedPasword = await bcryptjs.hash(password, 8);

  let user = new User({
    name, 
    email,
    password: hashedPasword,
   });
   const token = jwt.sign({id: user._id}, "passwordKey");

   user.token = token;

   user = await user.save();
   
   res.json(user);
    
}catch (e){
    res
    .status(500)
    .json({error: e.message});
}
},
);

// SIGN IN
authRouter.post("/api/signin", async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if (!user){
            return res
            .statusCode(400)
            .json({message: "User with this credentials doesn't exist"},);
        }

        const paswordMatching = await bcryptjs.compare(password, user.password);

        if (!paswordMatching){
            return res
            .status(400)
            .json({message: "Password mismatch"});
        }
        res.json(user);
// const token = jwt.sign({id: user._id}, "passwordKey");
// res.json({token, ...user._doc});

    }catch(e){
        res
        .status(500)
        .json({error: e.message});
    }
},
);

authRouter.post("/user/isValidToken", async(req, res) => {
    try{
        const token = req.header("auth-x-token");

        if (!token) return res.json(false);

      const isTokenValid = jwt.verify(token, "passwordKey");

      if (!isTokenValid) return res.json(false);

      const user = await User.findById(isTokenValid.id);

      if (!user) return res.json(false);

      res.json(true);

    }catch (e){
        res
        .status(500)
        .json({error: e.message});
    }
},
);

// GET USER DETAILS
authRouter.get("/", auth, async(req, res) => {
    const user = await User.findById(req.user_id);

    res.json({...user._doc, token: req.token});
},
);
module.exports = authRouter;
