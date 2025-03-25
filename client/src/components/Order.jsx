import React, { useState, useEffect, useContext } from "react";
import { AppContent } from "../content/AppContent";
import axios from "axios";
import { toast } from "react-toastify";

export default function Orders() {
    const { backendUrl } = useContext(AppContent);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get(`${backendUrl}/api/orders`, { withCredentials: true });
                setOrders(data.orders);
            } catch (error) {
                toast.error("Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [backendUrl]);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Your Orders</h2>
            {loading ? (
                <p>Loading orders...</p>
            ) : orders.length === 0 ? (
                <p>No orders placed yet.</p>
            ) : (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id} className="p-4 mb-2 border rounded-lg">
                            <strong>Order ID:</strong> {order.id} <br />
                            <strong>Status:</strong> {order.status} <br />
                            <strong>Total:</strong> ${order.total}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
