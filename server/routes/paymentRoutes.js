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

// ✅ Correct Route Definition
router.post("/create-order", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const options = {
      amount: parseInt(amount), // Already in paisa
      currency: currency || "INR",
      receipt: `order_rcpt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Order creation error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
