const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentcontroller");

router.post("/create-payment-intent", paymentController.paymentProcessor)