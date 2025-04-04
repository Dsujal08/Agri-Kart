import React, { useEffect, useState } from "react";

const backendUrl = "http://localhost:4000";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await fetch(`${backendUrl}/api/orders`);
    const data = await response.json();
    setOrders(data);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">📊 Admin Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>Order #{order._id} - Status: {order.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrders;
