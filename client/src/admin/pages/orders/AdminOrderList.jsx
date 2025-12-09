import React, { useEffect, useState } from "react";
import { deleteOrder, getAllOrders, updateOrderStatus } from "../../../services/adminOrderService";
import { toast } from "react-toastify";

export default function AdminOrderList() {
    const [orders, setOrders] = useState([]);

    const loadOrders = () => {
        getAllOrders()
            .then(setOrders)
            .catch(err => toast.error(err.message));
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const changeStatus = async (orderId, status) => {
        try {
            await updateOrderStatus(orderId, status);
            toast.success("Status updated!");
            loadOrders();
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="container">
            <h2>Orders</h2>

            <table className="table table-striped mt-4">
                <thead>
                <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Products</th>   {/* 👈 Новата колона */}
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Placed On</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {orders.map((order, i) => (
                    <tr key={order._id}>
                        <td>{i + 1}</td>

                        {/* USER INFO */}
                        <td>
                            {order.user?.firstName} {order.user?.lastName}
                            <br />
                            <small>{order.user?.email}</small>
                        </td>

                        {/* 👇 PRODUCTS LIST (brand, model, qty, subtotal) */}
                        <td>
                            {order.items.map(item => (
                                <div key={item.device._id} style={{ marginBottom: "6px" }}>
                                    <strong>{item.device.brand} {item.device.model}</strong>
                                    <br />
                                    Qty: {item.quantity} × ${item.device.price}
                                    <br />
                                    <small>
                                        Subtotal: <strong>${item.quantity * item.device.price}</strong>
                                    </small>
                                    <hr />
                                </div>
                            ))}
                        </td>

                        {/* TOTAL */}
                        <td>${order.totalPrice}</td>

                        {/* STATUS */}
                        <td>
                                <span className={`status-badge status-${order.status}`}>
                                    {order.status.toUpperCase()}
                                </span>
                        </td>

                        {/* DATE */}
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                        {/* ACTIONS */}
                        <td>
                            <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() => changeStatus(order._id, "completed")}
                            >
                                Complete
                            </button>

                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => changeStatus(order._id, "pending")}
                            >
                                Pending
                            </button>

                            <button
                                className="btn btn-danger btn-sm me-2"
                                onClick={() => changeStatus(order._id, "cancelled")}
                            >
                                Cancel
                            </button>

                            {/* DELETE ORDER */}
                            <button
                                className="btn btn-dark btn-sm"
                                onClick={async () => {
                                    if (!confirm("Are you sure you want to delete this order?")) return;

                                    try {
                                        await deleteOrder(order._id);
                                        toast.success("Order deleted!");
                                        loadOrders();
                                    } catch (err) {
                                        toast.error(err.message);
                                    }
                                }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
