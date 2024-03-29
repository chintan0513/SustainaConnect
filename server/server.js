const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const moragn = require("morgan");
const connectDB = require("./config/db");

// dotenv
dotenv.config();

// MongoDB connection
connectDB();

// express
const app = express();

// cors
app.use(cors());
app.use(express.json());
app.use(moragn("dev"));

//ROUTES
app.get("", (req, res) => {
  res.status(200).json({ success: true, message: "Hello World :)" });
});

// port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.cyan.bold);
});
