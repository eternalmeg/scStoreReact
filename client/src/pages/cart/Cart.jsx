
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import {
    getCart,
    updateQuantity as apiUpdateQuantity,
    removeFromCart,
    checkout as apiCheckout,
} from "../../services/cartService";
import { toast } from "react-toastify";

export default function Cart() {
    const { user, updateCart } = useContext(UserContext);
    const cart = user?.cart || [];


    useEffect(() => {
        if (!user) return;

        getCart()
            .then(updateCart)
            .catch((err) => toast.error(err.message));
    }, [user?._id]);


    const changeQuantity = async (deviceId, delta) => {
        const item = cart.find((i) => i.device === deviceId);
        if (!item) return;

        const newQty = Math.max(1, item.quantity + delta);

        try {
            const serverCart = await apiUpdateQuantity(deviceId, newQty);
            updateCart(serverCart);
        } catch (err) {
            toast.error(err.message);
        }
    };


    const handleRemove = async (deviceId) => {
        try {
            const serverCart = await removeFromCart(deviceId);
            updateCart(serverCart);
            toast.success("Successfully removed product ");
        } catch (err) {
            toast.error(err.message);
        }
    };


    const handleCheckout = async () => {
        try {
            await apiCheckout();
            updateCart([]); // изпразваме локалната количка
            toast.success("Order created!");
        } catch (err) {
            toast.error(err.message);
        }
    };


    const subtotal = cart.reduce(
        (sum, item) => sum + (item.price || 0) * item.quantity,
        0
    );

    return (
        <div>

            <div className="fz-inner-page-breadcrumb">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-12">
                            <div className="breadcrumb-txt">
                                <h1>Cart</h1>
                                <ul className="fz-inner-page-breadcrumb-nav">
                                    <li>
                                        <Link to="/">Home</Link>
                                    </li>
                                    <li className="current-page">Cart</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container">
                <div className="cart-section">
                    <div className="cart-left inner-cart">
                        <div className="cart-area">
                            <div className="cart__body">
                                <div className="table-responsive">
                                    <table className="cart-page-table">
                                        <tbody>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Remove</th>
                                        </tr>

                                        {cart.length === 0 && (
                                            <tr>
                                                <td colSpan="5">Your cart is empty.</td>
                                            </tr>
                                        )}

                                        {cart.map((item) => (
                                            <tr key={item.device}>
                                                <td>
                                                    <div className="cart-product">
                                                        <div className="cart-product__img">
                                                            {item.image && (
                                                                <img src={item.image} alt={item.model} />
                                                            )}
                                                        </div>
                                                        <div className="cart-product__txt">
                                                            <h6>
                                                                <Link to={`/product/${item.device}`}>
                                                                    {item.brand} {item.model}
                                                                </Link>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td>${item.price}</td>

                                                <td>
                                                    <div className="cart-product__quantity">
                                                        <div className="cart-product__quantity-btns">
                                                            <button
                                                                className="cart-product__minus"
                                                                onClick={() =>
                                                                    changeQuantity(item.device, -1)
                                                                }
                                                            >
                                                                <i className="fa-light fa-minus"></i>
                                                            </button>

                                                            <button
                                                                className="cart-product__plus"
                                                                onClick={() =>
                                                                    changeQuantity(item.device, +1)
                                                                }
                                                            >
                                                                <i className="fa-light fa-plus"></i>
                                                            </button>
                                                        </div>

                                                        <input
                                                            type="number"
                                                            className="cart-product-quantity-input"
                                                            min="1"
                                                            value={item.quantity}
                                                            readOnly
                                                        />
                                                    </div>
                                                </td>

                                                <td>${(item.price || 0) * item.quantity}</td>

                                                <td>
                                                    <button
                                                        className="item-remove-btn"
                                                        onClick={() => handleRemove(item.device)}
                                                    >
                                                        <i className="fa-light fa-xmark"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="cart-checkout-area">
                        <h4 className="cart-checkout-area__title">Billing Summary</h4>

                        <ul className="checkout-summary">
                            <li>
                                <span className="checkout-summary__key">Subtotal</span>
                                <span className="checkout-summary__value">
                  <span>$</span>
                                    {subtotal}
                </span>
                            </li>

                            <li>
                                <span className="checkout-summary__key">Shipping</span>
                                <span className="checkout-summary__value">Free</span>
                            </li>

                            <li className="cart-checkout-total">
                                <span className="checkout-summary__key">Total</span>
                                <span className="checkout-summary__value">
                  <span>$</span>
                                    {subtotal}
                </span>
                            </li>
                        </ul>

                        <button
                            onClick={handleCheckout}
                            className="fz-1-banner-btn cart-checkout-btn"
                            disabled={cart.length === 0}
                        >
                            Proceed To
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
