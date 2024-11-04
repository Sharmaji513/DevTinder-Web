const express = require("express");
const User = require("../models/User");

const authRouter = express.Router();
const { validateSignUpData } = require("../middlewares/validation");
const bcrypt = require("bcrypt");


//Signup Route
authRouter.post("/user/signup", validateSignUpData, async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();

    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


//login Route
authRouter.post("/user/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).send({ message: "Invalid credentials" });
    res.status(201).send({ message:`${user.firstName} login successful` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = authRouter;
