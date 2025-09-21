const express = require("express")
const cors = require("cors")

const app = express()

// Middleware declaration
app.use((cors()))

// Listening to request
app.listen(4000, (() => {
    console.log("Listening on port 4000")
}))

// Backend Routes
app.get("/", (req, res) => {
    res.json({"Message": "Backend Reachable"})
})