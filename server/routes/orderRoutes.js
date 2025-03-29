const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Save Order
router.post("/orders", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving order" });
  }
});

module.exports = router;
