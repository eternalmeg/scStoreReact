import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getOrderById, cancelOrder } from "../../../services/orderService.js";

const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        getOrderById(orderId)
            .then(setOrder)
            .catch(err => toast.error(err.message));
    }, [orderId]);

    if (!order) return <p>Loading order details...</p>;

    return (
        <div className="container mt-4">

            <h2>Order #{order._id.slice(-5)}</h2>

            <p className={`order-status status-${order.status}`}>
                Status: {order.status}
            </p>

            <p>
                Placed on:{" "}
                <strong>{new Date(order.createdAt).toLocaleDateString()}</strong>
            </p>

            <h3 className="mt-4">Items:</h3>

            <div className="order-items">
                {order.items.map(item => (
                    <div key={item.device._id} className="order-item">
                        <img
                            src={item.device.images?.[0] ?? ""}
                            alt={item.device.model}
                            className="order-item-img"
                        />

                        <div className="order-item-info">
                            <h4>{item.device.brand} {item.device.model}</h4>
                            <p>Price: ${item.device.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>
                                Subtotal:{" "}
                                <strong>${item.quantity * item.device.price}</strong>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <h3 className="mt-4">
                Total Price: <strong>${order.totalPrice}</strong>
            </h3>

            {/* ✅ BTN: CANCEL ORDER */}
            {order.status === "pending" && (
                <button
                    className="btn btn-danger mt-3 me-3"
                    onClick={async () => {
                        try {
                            await cancelOrder(order._id);
                            toast.success("Order cancelled!");
                            navigate("/user/orders");
                        } catch (err) {
                            toast.error(err.message);
                        }
                    }}
                >
                    Cancel Order
                </button>
            )}

            {/* Back button */}
            <button
                className="btn btn-dark mt-3"
                onClick={() => navigate("/user/orders")}
            >
                Back to Orders
            </button>
        </div>
    );
};

export default OrderDetails;
