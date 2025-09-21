const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Userbase = require("./userbase")

const app = express()

// Middleware declaration
app.use((cors()))

// Connect to database
const dbURI = "mongodb://localhost:27017/DonationSite";
mongoose.connect(dbURI).then((result) => {
    console.log("Connected to Mongoose Database");

    // Listen for requests
    app.listen(3000);
}).catch((e) => {
    console.log(e)
})

// Backend Routes
app.get("/", (req, res) => {
    res.json({"Message": "Backend Reachable"})
})