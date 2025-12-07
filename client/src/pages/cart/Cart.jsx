import React from 'react'
import {Link} from "react-router-dom";


const CartMain = ({ cartArray, remove, quantity }) => {




    return (
        <div>
            <div className="fz-inner-page-breadcrumb">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-12">
                            <div className="breadcrumb-txt">
                                <h1>Catalog</h1>
                                <ul className="fz-inner-page-breadcrumb-nav">
                                    <li><Link to="/">Home</Link></li>
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

                                                <tr>
                                                    <td>
                                                        <div className="cart-product">
                                                            <div className="cart-product__img">
                                                                <img src="" alt="Product Image"/>
                                                            </div>
                                                            <div className="cart-product__txt">
                                                                <h6>
                                                                    <Link to="/shopDetails">name</Link>
                                                                </h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>$120</td>
                                                    <td>
                                                        <div className="cart-product__quantity">
                                                            <div className="cart-product__quantity-btns">
                                                                <button
                                                                    className="cart-product__minus"

                                                                >
                                                                    <i className="fa-light fa-minus"></i>
                                                                </button>
                                                                <button
                                                                    className="cart-product__plus"

                                                                >
                                                                    <i className="fa-light fa-plus"></i>
                                                                </button>
                                                            </div>
                                                            <input
                                                                type="number"
                                                                name="product-quantity-input"
                                                                className="cart-product-quantity-input"
                                                                min="0"

                                                            />
                                                        </div>
                                                    </td>
                                                    <td>$120</td>
                                                    <td>
                                                        <button
                                                            className="item-remove-btn"

                                                        >
                                                            <i className="fa-light fa-xmark"></i>
                                                        </button>
                                                    </td>
                                                </tr>


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
                                <span className="checkout-summary__value"><span>$</span>120</span>
                            </li>

                            <li>
                                <span className="checkout-summary__key">Shipping</span>
                                <span className="checkout-summary__value"><span>$</span>test</span>
                            </li>



                            <li className="cart-checkout-total">
                                <span className="checkout-summary__key">Total</span>
                                <span className="checkout-summary__value"><span>$</span>120</span>
                            </li>
                        </ul>


                        <Link to="/checkout" className="fz-1-banner-btn cart-checkout-btn">Proceed to checkout</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CartMain