const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const authRouter = express.Router();

authRouter.post("/auth/register", async (req, res) => {
  try {
    // validate request
    const { username, email, password } = req.body;
    if(!username || !email || !password) {
      return res.status(400).send({ message: "Please provide all the details!" });
    }

    // check if user already exists
    let checkEmail = await User.findOne({ email });
    let checkUser = await User.findOne({ username });
    if(checkEmail) {
      return res.status(400).send({ message: "Email already exists!" });
    }
    if(checkUser) {
      return res.status(400).send({ message: "Username already exists!" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // create user
    let user = new User({
        username,
        email,
        password: hashedPassword
    })

    // save user
    user = await user.save();

    // send response
    res.send({
        message : "User registered successfully!",
        user
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send({ message: error.message });
  }
});

authRouter.post("/auth/login", async (req, res) => {
  try {
    // validate request
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).send({ message: "Please provide email and password!" });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).send({ message: "Invalid Email" });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(400).send({ message: "Invalid Password!" });
    }


    // send response
    res.send({
        message : "User logged in successfully!",
        user
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).send({ message: error.message });
  }
});


module.exports = authRouter;