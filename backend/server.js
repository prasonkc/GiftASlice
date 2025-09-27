const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authroutes");
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

// Auth Routes
app.use(authRoutes);

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

