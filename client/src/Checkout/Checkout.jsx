import React, { useState } from "react";
import { useCart } from "../Seeds/Cart";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Checkout = () => {
  const { items, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");

  const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DFFFD8] to-[#9DC08B] flex flex-col items-center p-6">
      <div className="w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-lg shadow-2xl rounded-xl p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">🛍 Order Summary</h2>

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
                  <button
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}

            {/* Total Amount */}
            <div className="flex justify-between text-2xl font-bold mt-6 border-t pt-4">
              <span>Total:</span>
              <span className="text-green-800">₹{totalAmount.toFixed(2)}</span>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">💳 Select Payment Method</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  className={`py-3 rounded-lg text-lg font-semibold transition border-2 ${
                    paymentMethod === "card"
                      ? "bg-green-600 text-white border-green-700"
                      : "bg-gray-100 text-gray-800 border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  Credit / Debit Card
                </button>
                <button
                  className={`py-3 rounded-lg text-lg font-semibold transition border-2 ${
                    paymentMethod === "upi"
                      ? "bg-green-600 text-white border-green-700"
                      : "bg-gray-100 text-gray-800 border-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("upi")}
                >
                  UPI / Net Banking
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                className="w-full bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold text-lg hover:bg-gray-400 transition"
                onClick={() => navigate(-1)}
              >
                ← Back to Cart
              </button>
              <button
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 shadow-md transition-transform transform hover:scale-105"
                onClick={() => navigate("/payment")}
              >
                Proceed to Payment →
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              className="w-32 h-32 opacity-50"
            />
            <p className="text-lg mt-4">Your cart is empty. Add items before checkout.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
