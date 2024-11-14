require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const requestRouter = require("./routes/requestRouter");
const userRouter = require("./routes/userRouter");


// Connect to the database
connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(PORT, () => {
      console.log(`Server is successfully listening on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });

// Middleware
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/v1", authRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", requestRouter);
app.use("/api/v1", userRouter);

app.get("/", (req, res) => {
  res.send("Coming Soon Home");
});