
const validator = require("validator");

const validateSignUpData = (req, res, next) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).json({ message: "Name is not valid!" });
  } else if (!validator.isEmail(emailId)) {
    return res.status(400).json({ message: "Email is not valid!" });
  } else if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ message: "Please enter a strong password!" });
  }
  
  // Proceed to the next middleware or route handler if validation is successful
  next();
};

module.exports = {
  validateSignUpData,
}; 
