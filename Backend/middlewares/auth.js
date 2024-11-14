require("dotenv").config(); 
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET_KEY = process.env.SECRET_KEY; // Access SECRET_KEY from .env

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) throw new Error("Invalid token");

    // Verify the token
    const decodedMessage = jwt.verify(token, SECRET_KEY);

    // Find the user by ID from the decoded token
    const user = await User.findById(decodedMessage._id);
    if (!user) throw new Error("User does not exist");

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
