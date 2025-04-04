import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ✅ Ensure userId is required
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  totalAmount: { type: Number, required: true }, // ✅ Required
  paymentMethod: { type: String, default: "COD" },
  status: { type: String, enum: ["Pending", "Paid", "Delivered"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }, // ✅ Auto timestamp
});

export default mongoose.model("Order", orderSchema);