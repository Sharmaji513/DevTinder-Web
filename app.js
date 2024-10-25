const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const authRouter = require('./routes/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;




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


//Routes
app.use('/api/v1' , authRouter)


app.get("/", (req, res) => {
  res.send("Hello Dev");
});

