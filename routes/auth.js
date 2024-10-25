const express = require("express");
const User = require("../models/User");

const authRouter = express.Router();

//Signup Route
authRouter.post("/user/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;
    const user = new User({ firstName, lastName, emailId, password });
    await user.save();

    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

//login Route
authRouter.post("/user/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId, password: password });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    res.status(201).send({ message: "User login successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});




module.exports = authRouter;
