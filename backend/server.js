const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Userbase = require("./userbase");

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

app.post("/signup", async (req, res) => {
  try {
    console.log("Post Request initiated");
    const { name, dob, email, password } = req.body;

    const databaseObject = new Userbase({ name, dob, email, password });
    await databaseObject.save();

    res.json({ message: "Registration successful" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email address
  const user = await Userbase.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // Check password
  if (user.password !== password) {
    return res.status(401).json({ message: "Incorrect password" });
  }
  res.json({ message: "Login successful" }).catch((e) => {
    console.log(e);
  });
});
