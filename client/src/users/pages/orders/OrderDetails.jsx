import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getOrderById, cancelOrder } from "../../../services/orderService.js";
import useConfirm from "../../../hooks/useConfirm";
import { useError } from "../../../context/ErrorContext.jsx";

const OrderDetails = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const { confirm, ConfirmUI } = useConfirm();
    const { throwError } = useError();

    const [order, setOrder] = useState(null);

    useEffect(() => {
        getOrderById(orderId)
            .then(setOrder)
            .catch(err => {
                // ✔ правилен error-handling
                if (["server", "notfound", "forbidden"].includes(err.type)) {
                    return throwError(err.message);
                }

                toast.error(err.message || "Failed to load order.");
            });
    }, [orderId]);

    if (!order) return <p>Loading order details...</p>;

    return (
        <div className="container mt-4">


            <ConfirmUI />

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
                {order.items.map(item => {
                    const dev = item.device;

                    return (
                        <div key={dev?._id || "deleted"} className="order-item">


                            <img
                                src={dev?.images?.[0] || "/assets/images/noImage.png"}
                                alt={dev?.model || "Deleted product"}
                                className="order-item-img"
                            />

                            <div className="order-item-info">
                                <h4>
                                    {dev
                                        ? `${dev.brand} ${dev.model}`
                                        : <span className="text-muted">(Deleted product)</span>}
                                </h4>

                                <p>Price: ${dev?.price ?? "—"}</p>
                                <p>Quantity: {item.quantity}</p>

                                <p>
                                    Subtotal:{" "}
                                    <strong>
                                        {dev ? `$${item.quantity * dev.price}` : "—"}
                                    </strong>
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <h3 className="mt-4">
                Total Price: <strong>${order.totalPrice}</strong>
            </h3>


            {order.status === "pending" && (
                <button
                    className="btn btn-danger mt-3 me-3"
                    onClick={async () => {
                        const ok = await confirm("Are you sure you want to cancel this order?");
                        if (!ok) return;

                        try {
                            await cancelOrder(order._id);
                            toast.success("Order cancelled!");
                            navigate("/user/orders");
                        } catch (err) {

                            if (["validation", "auth"].includes(err.type)) {
                                return toast.error(err.message);
                            }

                            if (["server", "forbidden", "notfound"].includes(err.type)) {
                                return throwError(err.message);
                            }

                            toast.error("Unexpected error while cancelling order.");
                        }
                    }}
                >
                    Cancel Order
                </button>
            )}

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
