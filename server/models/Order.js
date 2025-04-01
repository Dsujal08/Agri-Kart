import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Added user reference
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 },
      image: { type: String, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["Online Payment", "Cash on Delivery"], required: true },
  status: { type: String, enum: ["Pending", "Completed", "Cancelled"], default: "Pending", index: true },
  transactionId: { type: String, unique: true, sparse: true }, // Unique only if exists
  deliveryDate: { type: Date, default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }, // Default: 7 days later
  createdAt: { type: Date, default: Date.now, index: true },
});

export default mongoose.model("Order", orderSchema);
