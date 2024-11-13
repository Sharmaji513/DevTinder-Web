
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


const vailidateEditProfileData = (req) => {
  const allowedEditFields = [  
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ]

  const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

  return isEditAllowed;

}
module.exports = {
  validateSignUpData,
  vailidateEditProfileData
}; 
