import React from "react";
import { deleteOrder, getAllOrders, updateOrderStatus } from "../../../services/adminOrderService";
import { toast } from "react-toastify";
import useFetch from "../../../hooks/useFetch";
import useConfirm from "../../../hooks/useConfirm";
import { useError } from "../../../context/ErrorContext.jsx";

export default function AdminOrderList() {
    const { throwError } = useError();
    const { confirm, ConfirmUI } = useConfirm();

    const {
        data: orders,
        setData: setOrders,
        loading,
        error
    } = useFetch(() => getAllOrders(), []);

    const handleDelete = async (orderId) => {
        const ok = await confirm("Are you sure you want to delete this order?");
        if (!ok) return;

        try {
            await deleteOrder(orderId);
            toast.success("Order deleted!");

            setOrders(prev => prev.filter(o => o._id !== orderId));

        } catch (err) {

            if (err.type === "validation" || err.type === "auth") {
                return toast.error(err.message);
            }

            if (["server", "forbidden", "notfound"].includes(err.type)) {
                return throwError(err.message);
            }

            toast.error("Unexpected error while deleting order.");
        }
    };

    const changeStatus = async (orderId, status) => {
        try {
            await updateOrderStatus(orderId, status);
            toast.success("Status updated!");

            setOrders(prev =>
                prev.map(o =>
                    o._id === orderId ? { ...o, status } : o
                )
            );

        } catch (err) {

            if (err.type === "validation" || err.type === "auth") {
                return toast.error(err.message);
            }

            if (["server", "forbidden", "notfound"].includes(err.type)) {
                return throwError(err.message);
            }

            toast.error("Unexpected error while updating status.");
        }
    };

    if (loading) return <h3>Loading orders...</h3>;
    if (error) return <p>Error loading orders</p>;

    return (
        <div className="container">

            {/* GLOBAL CONFIRM COMPONENT */}
            <ConfirmUI />

            <h2>Orders</h2>

            <table className="table table-striped mt-4">
                <thead>
                <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Products</th>
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

                        <td>
                            {order.user?.firstName} {order.user?.lastName}
                            <br />
                            <small>{order.user?.email}</small>
                        </td>

                        <td>
                            {order.items.map(item => {
                                const dev = item.device;

                                return (
                                    <div key={dev?._id || item._id} style={{ marginBottom: "6px" }}>
                                        {dev ? (
                                            <>
                                                <strong>{dev.brand} {dev.model}</strong>
                                                <br />
                                                Qty: {item.quantity} × ${dev.price}
                                                <br />
                                                <small>
                                                    Subtotal: <strong>${item.quantity * dev.price}</strong>
                                                </small>
                                            </>
                                        ) : (
                                            <>
                                                <strong className="text-muted">(Deleted product)</strong>
                                                <br />
                                                Qty: {item.quantity}
                                                <br />
                                                <small>Subtotal: <strong>—</strong></small>
                                            </>
                                        )}
                                        <hr />
                                    </div>
                                );
                            })}
                        </td>

                        <td>${order.totalPrice}</td>

                        <td>
                                <span className={`status-badge status-${order.status}`}>
                                    {order.status.toUpperCase()}
                                </span>
                        </td>

                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>

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

                            <button
                                className="btn btn-dark btn-sm"
                                onClick={() => handleDelete(order._id)}
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
