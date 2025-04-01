import express from "express";
import Order from "../models/Order.js"; // Import your order model

const router = express.Router();

router.post("/orders", async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, status, transactionId, deliveryDate } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Order items are required" });
    }

    const newOrder = new Order({
      items,
      totalAmount,
      paymentMethod,
      status,
      transactionId,
      deliveryDate,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Order saving error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
