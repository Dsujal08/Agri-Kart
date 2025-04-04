import React, { useState } from "react";
import { useCart } from "../Seeds/Cart";
import { useNavigate } from "react-router-dom";
import { Trash2, ArrowLeft, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const backendUrl = import.meta.env.VITE_BACKEND_URL || process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

const Checkout = ({ currentUser }) => {
  const { items, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const saveOrderToBackend = async (orderDetails) => {
    try {
      const response = await fetch(`${backendUrl}/api/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) throw new Error("Failed to save order details.");
      return await response.json();
    } catch (err) {
      throw new Error(err.message || "Something went wrong!");
    }
  };

  const handleOrder = async (method) => {
    if (!items.length) return setError("❌ Your cart is empty.");

    setLoading(true);
    setError(null);

    try {
      const orderDetails = {
        userId: currentUser?.id || "Guest",
        items,
        totalAmount,
        paymentMethod: method,
        status: method === "COD" ? "Pending" : "Paid",
        deliveryDate,
      };

      if (method === "COD") {
        await saveOrderToBackend(orderDetails);
        setOrderSuccess(true);
        clearCart();
        setTimeout(() => navigate(`/view-orders/${currentUser?.id || "guest"}`), 2000);
        return;
      }

      if (!(await loadRazorpayScript())) throw new Error("Failed to load Razorpay. Please try again.");

      const response = await fetch(`${backendUrl}/api/orders/create-razorpay-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount * 100 }),
      });

      const order = await response.json();
      if (!order.id) throw new Error("Failed to create order. Try again.");

      const rzp = new window.Razorpay({
        key: "rzp_test_LVkI1wI2uaJL80",
        amount: order.amount,
        currency: order.currency,
        name: "AgriKart",
        description: "Order Payment",
        order_id: order.id,
        handler: async (paymentResponse) => {
          orderDetails.razorpayPaymentId = paymentResponse.razorpay_payment_id;
          orderDetails.razorpayOrderId = paymentResponse.razorpay_order_id;
          orderDetails.status = "Paid";

          await saveOrderToBackend(orderDetails);
          setOrderSuccess(true);
          clearCart();
          setTimeout(() => navigate(`/view-orders/${currentUser?.id || "guest"}`), 2000);
        },
        theme: { color: "#0A74DA" },
      });

      rzp.open();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <motion.div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button className="absolute top-4 left-4 text-gray-700 hover:text-gray-900" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>

        <h2 className="text-3xl font-bold text-center mb-6">🛍 Order Summary</h2>

        {orderSuccess ? (
          <div className="text-center">
            <CheckCircle size={50} className="text-green-500 mx-auto mb-4" />
            <p className="text-lg font-semibold text-green-600">Order placed successfully! Redirecting...</p>
          </div>
        ) : items.length > 0 ? (
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow-md" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-bold text-green-700">₹{(item.price * item.quantity).toFixed(2)}</p>
                  <button className="text-red-500 hover:text-red-700" onClick={() => removeFromCart(item.productId)}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between text-2xl font-bold mt-6 border-t pt-4">
              <span>Total:</span>
              <span className="text-green-800">₹{totalAmount.toFixed(2)}</span>
            </div>
            <p className="text-center text-lg text-gray-700">
              Delivery Date: <span className="font-bold">{deliveryDate}</span>
            </p>

            <div className="space-y-4">
              <button
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                onClick={() => handleOrder("Online")}
                disabled={loading}
              >
                {loading ? "Processing..." : "Pay Online"}
              </button>
              <button
                className="w-full bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700"
                onClick={() => handleOrder("COD")}
                disabled={loading}
              >
                {loading ? "Processing..." : "Cash on Delivery (COD)"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}

        {error && <motion.div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-400">{error}</motion.div>}
      </motion.div>
    </div>
  );
};

export default Checkout;
