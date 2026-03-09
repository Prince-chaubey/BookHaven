const express=require("express");
const userRouter=express.Router();
const {registerUser, loginUser,getDetails}=require("../controllers/userController");
const { authMiddleware } = require("../auth/authMiddleware");


userRouter.post('/register',registerUser);

userRouter.post('/login',loginUser);

userRouter.get("/profile", authMiddleware, getDetails);

module.exports=userRouter;

