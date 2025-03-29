import React, { useEffect, useState } from "react";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">📦 Your Orders</h2>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 mb-4">
            <h3 className="text-xl font-semibold">Order #{index + 1}</h3>
            <p className="text-gray-600">Payment: {order.paymentMethod} | Status: {order.status}</p>
            <ul className="mt-4">
              {order.items.map((item, i) => (
                <li key={i} className="flex justify-between border-b py-2">
                  <span>{item.name} (x{item.quantity})</span>
                  <span className="font-bold">₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-green-700 font-bold">Total: ₹{order.totalAmount}</p>
            <p className="text-gray-500">Estimated Delivery: {order.deliveryDate}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default ViewOrders;
