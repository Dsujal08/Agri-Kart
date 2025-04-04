import { useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 1, customer: "Ravi Kumar", amount: "₹1,500", status: "Pending" },
    { id: 2, customer: "Sita Devi", amount: "₹3,200", status: "Shipped" },
    { id: 3, customer: "Aman Singh", amount: "₹2,750", status: "Delivered" },
    { id: 4, customer: "Neha Sharma", amount: "₹900", status: "Cancelled" },
  ]);

  // Function to change order status
  const updateStatus = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.amount}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-white text-sm ${
                    order.status === "Pending" ? "bg-yellow-500" :
                    order.status === "Shipped" ? "bg-blue-500" :
                    order.status === "Delivered" ? "bg-green-500" :
                    "bg-red-500"
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="p-3 flex justify-center gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600" 
                    onClick={() => updateStatus(order.id, "Shipped")}>
                    Ship
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                    onClick={() => updateStatus(order.id, "Delivered")}>
                    Deliver
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    onClick={() => updateStatus(order.id, "Cancelled")}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
