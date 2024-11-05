const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateSignUpData } = require("../middlewares/validation");

const authRouter = express.Router();

const SECRET_KEY = process.env.SECRET_KEY || "asdsdfgfgrtr";
module.exports.SECRET_KEY = SECRET_KEY; 

// Signup Route
authRouter.post("/user/signup", validateSignUpData, async (req, res) => {
  try {
    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();
    const token = await jwt.sign({ _id: savedUser._id }, SECRET_KEY, { expiresIn: "7d" });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// Login Route
authRouter.post("/user/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Create a JWT Token
      const token = await jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: "7d" });

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });

      res.status(201).send({ message: `${user.firstName} login successful` });
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Logout Route
authRouter.post("/user/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now())});
  res.send("Logout Successful!!");
});

 

module.exports = authRouter;
