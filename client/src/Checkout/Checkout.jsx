import React, { useState } from "react";
import { useCart } from "../Seeds/Cart";
import { useNavigate } from "react-router-dom";
import { Trash2, ArrowLeft } from "lucide-react";

const backendUrl = "http://localhost:4000";

const Checkout = () => {
  const { items, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(window.Razorpay);
      } else {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(window.Razorpay);
        script.onerror = () => resolve(null);
        document.body.appendChild(script);
      }
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${backendUrl}/api/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount * 100, currency: "INR" }),
      });

      const order = await response.json();
      if (!order.id) throw new Error("Order creation failed");

      const Razorpay = await loadRazorpay();
      if (!Razorpay) throw new Error("Failed to load Razorpay SDK");

      const options = {
        key: "rzp_test_LVkI1wI2uaJL80",
        amount: order.amount,
        currency: order.currency,
        name: "AgriKart",
        description: "Order Payment",
        order_id: order.id,
        handler: async (response) => {
          const verifyResponse = await fetch(`${backendUrl}/api/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            alert("Payment Successful!");

            // Save Order to Backend
            const saveOrderResponse = await fetch(`${backendUrl}/api/orders`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId: localStorage.getItem("userId"),
                items,
                totalAmount,
                status: "Completed",
                paymentId: response.razorpay_payment_id,
              }),
            });

            const orderData = await saveOrderResponse.json();
            if (!orderData.success) throw new Error("Failed to save order");

            clearCart();
            navigate("/orders");
          } else {
            setError("Payment verification failed");
          }
        },
        modal: {
          ondismiss: () => setError("Payment was cancelled"),
        },
        theme: { color: "#0A74DA" },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-xl p-8 relative">
        <button className="absolute top-4 left-4 flex items-center text-gray-700 hover:text-gray-900" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} className="mr-2" /> Back
        </button>

        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">🛍 Order Summary</h2>
        {items.length > 0 ? (
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow-md" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">Qty: <span className="font-medium">{item.quantity}</span></p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-bold text-green-700">₹{(item.price * item.quantity).toFixed(2)}</p>
                  <button className="text-red-500 hover:text-red-700 transition" onClick={() => removeFromCart(item.productId)}>
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between text-2xl font-bold mt-6 border-t pt-4">
              <span>Total:</span>
              <span className="text-green-800">₹{totalAmount.toFixed(2)}</span>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 shadow-md transition-transform transform hover:scale-105" onClick={handlePayment} disabled={loading}>
              {loading ? "Processing..." : "Proceed to Payment →"}
            </button>

            {error && <p className="text-red-600 text-center font-semibold mt-4">{error}</p>}
          </div>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;
