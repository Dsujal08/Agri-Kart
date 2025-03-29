const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  totalAmount: Number,
  paymentMethod: String,
  status: String,
  transactionId: String,
  deliveryDate: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
