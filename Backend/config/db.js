// config/db.js
const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4, // Use IPv4
    });
    console.log("MongoDB connected");
  
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};


module.exports = connectDB;
