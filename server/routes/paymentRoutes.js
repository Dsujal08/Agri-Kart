import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Order Creation Route
router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    if (typeof currency !== "string" || currency.length !== 3) {
      return res.status(400).json({ error: "Invalid currency format" });
    }

    const options = {
      amount: parseInt(amount), // Already in paisa
      currency,
      receipt: `order_rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(201).json(order);
  } catch (error) {
    console.error("Order creation error:", error.stack);
    res.status(500).json({ error: "Failed to create order. Please try again." });
  }
});

export default router;
