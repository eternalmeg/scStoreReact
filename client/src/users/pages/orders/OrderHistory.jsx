import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getMyOrders } from "../../../services/orderService.js";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getMyOrders()
            .then(setOrders)
            .catch(err => toast.error(err.message));
    }, []);

    if (!orders.length)
        return <h3 className="no-orders">You have no orders yet.</h3>;

    return (
        <div className="orders-container">
            <h2 className="orders-title">My Orders</h2>

            <div className="orders-list">
                {orders.map(order => {
                    const firstItem = order.items[0].device;

                    return (
                        <div key={order._id} className="order-card">
                            <div className="order-card__img">
                                <img
                                    src={firstItem.images?.[0] ?? ""}
                                    alt={firstItem.model}
                                />
                            </div>

                            <div className="order-card-info">
                                <h4 className="order-id">
                                    Order #{order._id.slice(-5)}
                                </h4>

                                <p className={`order-status ${order.status}`}>
                                    {order.status}
                                </p>

                                <p className="order-date">
                                    Placed on: {new Date(order.createdAt).toLocaleDateString()}
                                </p>

                                <p className="order-total">
                                    Total: <strong>${order.totalPrice}</strong>
                                </p>

                                <button
                                    className="order-btn"
                                    onClick={() => navigate(`/user/orders/${order._id}`)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderHistory;
