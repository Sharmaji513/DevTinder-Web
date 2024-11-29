const validator = require("validator");

// Middleware for validating sign-up data
const validateSignUpData = (req, res, next) => {
  const { firstName, lastName, emailId, password, age, gender } = req.body;

  if (!firstName || !lastName) {
    console.log("Validation Error: Name is invalid.");
    return res.status(400).json({ message: "Name is not valid!" });
  }

  if (!validator.isEmail(emailId)) {
    console.log("Validation Error: Email is invalid.");
    return res.status(400).json({ message: "Email is not valid!" });
  }

  if (!validator.isStrongPassword(password)) {
    console.log("Validation Error: Password is weak.");
    return res.status(400).json({ message: "Please enter a strong password!" });
  }

  if (!age || isNaN(age) || age < 18 || age > 100) {
    console.log("Validation Error: Age is invalid.");
    return res.status(400).json({ message: "Age must be a number between 18 and 100!" });
  }

  const validGenders = ["male", "female", "other"];
  if (!gender || !validGenders.includes(gender.toLowerCase())) {
    console.log("Validation Error: Gender is invalid.");
    return res.status(400).json({ message: `Gender must be one of ${validGenders.join(", ")}!` });
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

// Export the functions
module.exports = {
  validateSignUpData,
  vailidateEditProfileData,
};
