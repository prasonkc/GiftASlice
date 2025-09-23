const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Userbase = require("./userbase");
const bcrypt = require("bcrypt")

const app = express();
const PORT = 4000;

// Middleware declaration
app.use(cors());
app.use(express.json());

// Connect to database
const dbURI = "mongodb://localhost:27017/DonationSite";
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to Mongoose Database");

    // Listen for requests
    app.listen(PORT);
  })
  .catch((e) => {
    console.log(e);
  });

// Backend Routes
app.get("/", (req, res) => {
  res.json({ Message: "Backend Reachable" });
});

// Signup route
app.post("/signup", async (req, res) => {
  try {
    console.log("Post Request initiated");
    const { name, dob, email, password } = req.body;

    // Hash the password and save
    const hashedPassword = await bcrypt.hash(password, 11)
    const databaseObject = new Userbase({ name, dob, email, password: hashedPassword });
    await databaseObject.save();

    res.json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email address
  const user = await Userbase.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // Check password by matching user password to hashed password
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  // Redirect the login
  try {
    res.json({ message: "Login successful" });
  } catch (e) {
    console.log(e);
  }
});
