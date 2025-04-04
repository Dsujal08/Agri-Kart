import express from "express";
import Razorpay from "razorpay";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create Razorpay Order
router.post("/create-razorpay-order", async (req, res) => {
  console.log("🔹 Received request for Razorpay order");
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ error: "Amount is required" });

    const options = { amount, currency: "INR", receipt: `order_${Date.now()}` };
    const order = await razorpay.orders.create(options);

    console.log("✅ Razorpay Order Created:", order);
    res.json(order);
  } catch (error) {
    console.error("❌ Razorpay Order Error:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});




// ✅ Create Order (COD & Online)
router.post("/", async (req, res) => {
  try {
    console.log("Incoming Order Request:", req.body);

    const { userId, items, totalAmount, paymentMethod, razorpayPaymentId, razorpayOrderId } = req.body;

    // ✅ Validate required fields
    if (!userId || !items.length || !totalAmount || !paymentMethod) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      paymentMethod,
      status: paymentMethod === "COD" ? "Pending" : "Paid",
      razorpayPaymentId,
      razorpayOrderId,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", orderId: newOrder._id });
  } catch (error) {
    console.error("Order Creation Error:", error);
    res.status(500).json({ error: "Failed to save order" });
  }
});

// ✅ Get Orders by User ID
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("🔍 Fetching orders for user:", userId);

    if (!userId || userId === "guest") {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!orders.length) return res.status(404).json({ message: "No orders found" });

    res.json(orders);
  } catch (error) {
    console.error("⚠️ Error fetching orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export default router;