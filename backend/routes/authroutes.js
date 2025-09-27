const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontrollers");

router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.get("/session", authController.session)
router.post("/logout", authController.logout)

module.exports = router;