const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Userbase = require("./userbase");
const bcrypt = require("bcrypt");
const session = require("express-session");

const app = express();
const PORT = 4000;

// Middleware declaration
app.use(
  cors({
    // Send and recieve cookies from frontend at port 5173
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Session Middleware
app.use(
  session({
    secret: "thisisasupersecretkey", //Change to env in production
    resave: false, // do not make unnecessary writes to session store by setting to false
    saveUninitialized: false, //Only save session if it is modified
    cookie: {
      secure: false, // False for http request and true for https request
      sameSite: "lax", // Lax for frontend and backend on localhost on different ports
      httpOnly: true,
    },
  })
);

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
  if (req.session.userId) {
    res.json({
      Message: "Backend Reachable",
      loggedIn: true,
      userId: req.session.userId,
    });
  } else {
    res.json({ Message: "Backend Reachable", loggedIn: false });
  }
});
// test
// Signup route
app.post("/signup", async (req, res) => {
  try {
    console.log("Post Request initiated");
    const { name, dob, email, password } = req.body;

    // Hash the password and save
    const hashedPassword = await bcrypt.hash(password, 11);
    const databaseObject = new Userbase({
      name,
      dob,
      email,
      password: hashedPassword,
    });
    await databaseObject.save();

    // Store id in session
    req.session.userId = databaseObject._id;

    res.json({
      message: "Registration successful",
      userId: req.session.userId,
    });
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
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  // Store id in session
  req.session.userId = user._id;
  req.session.userName = user.name;

  // Redirect the login
  try {
    res.json({
      message: "Login successful",
      userId: req.session.userId,
      userName: req.session.userName,
    });
  } catch (e) {
    console.log(e);
  }
});

// Send whether session is established or not
app.get("/session", (req, res) => {
  if (req.session.userId) {
    res.json({
      loggedIn: true,
      userId: req.session.userId,
      userName: req.session.userName,
    });
  } else {
    res.json({ loggedIn: false });
  }
});

// Logout the user
app.post("/logout", (req, res) => {
  // Destroy the session if session exists
  if (req.session) {
    req.session.destroy((err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ success: false, error: "Session destruction failed" });
        }
        // Clear cookie on logout
        res.clearCookie("connect.sid");
        res.status(200).json({ success: true });
      })
  } else {
    res.status(400).send({ success: false });
  }
});
