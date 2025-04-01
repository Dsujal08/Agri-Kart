import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { XCircle, Loader2, ArrowLeft } from "lucide-react";

const backendUrl = "http://localhost:4000";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

 

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 relative">
        <button className="absolute top-4 left-4 text-gray-700 hover:text-gray-900" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-3xl font-bold text-center mb-6">📦 My Orders</h2>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="border rounded-lg p-4 shadow-md bg-gray-50">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Order #{order._id.slice(-6)}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      order.status === "Cancelled"
                        ? "bg-red-200 text-red-800"
                        : order.status === "Delivered"
                        ? "bg-blue-200 text-blue-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">Total: ₹{order.totalAmount.toFixed(2)}</p>
                <p className="text-gray-600">Payment: {order.paymentMethod} ({order.paymentStatus})</p>
                <p className="text-gray-600">Delivery Date: <strong>{formatDate(order.deliveryDate)}</strong></p>

                <div className="mt-4 flex justify-between">
                  {order.status === "Cancelled" ? (
                    <p className="text-red-500 font-semibold">Order Cancelled</p>
                  ) : order.status === "Delivered" ? (
                    <p className="text-blue-500 font-semibold">Order Delivered</p>
                  ) : (
                    <button
                      className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                      onClick={() => cancelOrder(order._id)}
                      disabled={cancelling === order._id}
                    >
                      {cancelling === order._id ? (
                        <Loader2 className="animate-spin w-5 h-5 text-red-600" />
                      ) : (
                        <XCircle size={20} />
                      )}
                      <span>{cancelling === order._id ? "Cancelling..." : "Cancel Order"}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">You have no orders.</p>
        )}
      </div>
    </div>
  );
};

export default ViewOrders;
