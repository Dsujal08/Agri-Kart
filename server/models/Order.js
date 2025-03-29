  import mongoose from "mongoose";

  const orderSchema = new mongoose.Schema({
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
    transactionId: { type: String, default: null },
    deliveryDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
  });

  export default mongoose.model("Order", orderSchema);
