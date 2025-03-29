import React, { useEffect, useState } from "react";

const backendUrl = "http://localhost:4000";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const userId = localStorage.getItem("userId"); // Fetch user ID dynamically

  useEffect(() => {
    if (!userId) {
      setError("User not found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/orders/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch orders");

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">📦 Your Orders</h2>

      {loading ? (
        <p className="text-gray-500 text-lg">Loading orders...</p>
      ) : error ? (
        <p className="text-red-600 font-semibold">{error}</p>
      ) : orders.length > 0 ? (
        <div className="w-full max-w-3xl space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-lg font-bold">🆔 Order ID: {order._id}</p>
              <p className="text-gray-700">Total: ₹{order.totalAmount.toFixed(2)}</p>
              <p className={`text-sm font-semibold ${order.status === "Completed" ? "text-green-600" : "text-orange-500"}`}>
                Status: {order.status}
              </p>
              <p className="text-sm text-gray-600">📅 Ordered on: {new Date(order.createdAt).toLocaleDateString()}</p>

              <ul className="mt-4 space-y-2">
                {order.items.map((item) => (
                  <li key={item.productId} className="flex justify-between border-b pb-2">
                    <span>{item.name} (x{item.quantity})</span>
                    <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      )}
    </div>
  );
};

export default Orders;
