// config/db.js
const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL , {
      useUnifiedTopology: true,
    });

    await mongoose.connect(process.env.MONGO_URL , { useUnifiedTopology: true,});

    console.log("MongoDB connected");
  
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};


module.exports = connectDB;
