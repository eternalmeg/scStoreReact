import React from 'react'
import {Link} from "react-router-dom";


const Wishlist = ({ wishlist, remove, quantity }) => {




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
                                    <li className="current-page">Wishlist</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container">
                <div className="cart-section wishlist-section">
                    <div className="cart-left wishlist-inner-section">
                        <div className="cart-area">
                            <div className="cart__body">
                                <div className="table-responsive">
                                    <div className='wishlist-table'>
                                        <table>
                                            <tbody>
                                            <tr>
                                                <th>Product</th>
                                                <th>price</th>
                                                <th>action</th>
                                                <th>remove</th>
                                            </tr>


                                                    <tr>
                                                        <td>
                                                            <div className="cart-product">
                                                                <div className="cart-product__img">
                                                                    <img src="" alt="Product Image"/>
                                                                </div>
                                                                <div className="cart-product__txt">
                                                                    <h6><Link to="/shopDetails">product name</Link></h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>$120</td>
                                                        <td>
                                                            <div className="fz-wishlist-action">
                                                                <button
                                                                    className="fz-add-to-cart-btn fz-1-banner-btn fz-wishlist-action-btn"

                                                                >Add to cart
                                                                </button>
                                                            </div>
                                                        </td>
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
                                <div className="cart-left-actions d-flex justify-content-end">

                                    <button type="submit" className="fz-1-banner-btn update-cart-btn"
                                    >Add all product to cart
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Wishlist;