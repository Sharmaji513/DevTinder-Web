const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minLength: [4, "First name must be at least 4 characters"],
      maxLength: [50, "First name cannot exceed 50 characters"],
    },

    lastName: {
      type: String,
      maxLength: [50, "Last name cannot exceed 50 characters"],
      trim: true,
    },

    emailId: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: (props) => `${props.value} is not a valid email address`,
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      validate: {
        validator: validator.isStrongPassword,
        message:
          "Password must be stronger with a mix of letters, numbers, and symbols",
      },
    },

    age: {
      type: Number,
      min: [18, "Age must be at least 18"],
    },

    gender: {
      type: String,
      enum: { values: ["male", "female", "other"] },
    },

    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
    },

    about: {
      type: String,
      default: "This is a default about of the user!",
    },

    skills: {
      type: [String],
    },

  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("User", userSchema);

