require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const requestRouter = require("./routes/requestRouter");
const userRouter = require("./routes/userRouter");

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "https://devtinder-web.netlify.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

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

// Routes
app.use("/api/v1", authRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", requestRouter);
app.use("/api/v1", userRouter);

app.get("/", (req, res) => {
  res.send("Coming Soon Home");
});
