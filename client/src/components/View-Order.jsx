import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const backendUrl = "http://localhost:4000";

const ViewOrders = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) fetchOrders();
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/orders/user/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const response = await fetch(`${backendUrl}/api/orders/${orderId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to cancel order");
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">📜 Your Orders</h2>

      {loading ? (
        <p className="text-gray-600">⏳ Loading orders...</p>
      ) : error ? (
        <p className="text-red-600 font-semibold">❌ {error}</p>
      ) : orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-3">{order._id}</td>
                    <td className="p-3 font-bold text-green-700">₹{order.totalAmount.toFixed(2)}</td>
                    <td className={`p-3 font-semibold ${order.status === "Paid" ? "text-green-600" : "text-yellow-600"}`}>
                      {order.status}
                    </td>
                    <td className="p-3 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-3">
                      {order.status === "Pending" && (
                        <button
                          onClick={() => cancelOrder(order._id)}
                          className="text-red-600 hover:underline font-medium"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td colSpan="5" className="px-6 py-4 text-sm text-gray-700">
                      <strong>Delivery Date:</strong>{" "}
                      {new Date(order.deliveryDate).toLocaleDateString("en-IN")}
                      <br />
                      <strong>Items:</strong>{" "}
                      {order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">
          📭 No orders found.{" "}
          <a href="/products" className="text-blue-600 underline">
            Shop now
          </a>
          .
        </p>
      )}
    </div>
  );
};

export default ViewOrders;
