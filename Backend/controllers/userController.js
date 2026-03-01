const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt=require("jsonwebtoken");
require('dotenv').config();

//function to generate token 
const generateToken=(user)=>{

  const token=jwt.sign({id:user._id,email:user.email},
    process.env.JWT_SECRET_KEY,
    {expiresIn:"1d"}
  )

  return token;
  
};

//To register user
const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Basic validation
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully!",
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

//To login user
const loginUser=async(req,res)=>{

  try{
      const {email,password}=req.body;

  //check whether there is a user or not with this email
  const user=await User.findOne({email});
  if(!user) return res.status(400).json({message:"No registered user with this email !"});

  //now check credentials is correct or not
  const isMatch=await bcrypt.compare(password,user.password);
  if(!isMatch) return res.status(400).json({message:"Invalid credentials !"});

  //generate token
  const token=generateToken(user);

  res.json({message:"LoggedIn Successfull !",token});

  }
  catch(err){
    res.status(500).json({error:err.message});
  }
}

module.exports = { registerUser,loginUser };