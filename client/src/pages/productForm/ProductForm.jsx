import React from 'react'
import {Link} from "react-router-dom";
import { Form } from 'react-bootstrap'

const ProductForm = () => {
    return (
        <div>
            <div className="fz-inner-page-breadcrumb">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-12">
                            <div className="breadcrumb-txt">
                                <h1>Admin</h1>
                                <ul className="fz-inner-page-breadcrumb-nav">
                                    <li><Link to="/">Home</Link></li>
                                    <li className="current-page">Create</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="fz-inner-contact-details">
                    <div className="fz-inner-contact-details__left">
                        <div className="fz-blog-details__comment-form">
                            <h4 className="fz-comment-form__title fz-inner-contact-details__title">Leave a Message</h4>
                            <form action="#">
                                <div className="row g-xl-4 g-3">
                                    <div className="col-6 col-xxs-12">
                                        <input
                                            type="text"
                                            name="brand"
                                            id="brand"
                                            placeholder="Brand"

                                        />
                                    </div>
                                    <div className="col-6 col-xxs-12">
                                        <input
                                            type="text"
                                            name="model"
                                            id="model"
                                            placeholder="Model"

                                        />
                                    </div>
                                    <div className="col-6 col-xxs-12">
                                        <input
                                            type="text"
                                            name="sku"
                                            id="sku"
                                            placeholder="SKU"

                                        />
                                    </div>
                                    <div className="col-6 col-xxs-12">
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            placeholder="Price"

                                        />
                                    </div>
                                    <div className="col-6 col-xxs-12">
                                        <Form.Select className='state-select' name="category" id="category">
                                            <option value="Laptop">Laptop</option>
                                            <option value="Desktop">Desktop</option>
                                            <option value="Server">Server</option>
                                            <option value="Tablet">Tablet</option>
                                            <option value="Phone">Phone</option>
                                        </Form.Select>
                                    </div>

                                    <div className="col-6 col-xxs-12">
                                        <input
                                            type="number"
                                            name="quantity"
                                            id="quantity"
                                            placeholder="Quantity"

                                        />
                                    </div>


                                    <div className="col-12">
          <textarea
              name="shortDescription"
              id="shortDescription"
              placeholder="Short description"

          ></textarea>
                                    </div>


                                    <div className="col-12">
          <textarea
              name="description"
              id="description"
              placeholder="Description"

          ></textarea>
                                    </div>

                                    <div className="col-6 col-xxs-12">
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            placeholder="Image"

                                        />
                                    </div>
                                    <div className="col-6 col-xxs-12">
                                        <input
                                            type="file"
                                            name="image"
                                            id="image1"
                                            placeholder="Image"

                                        />
                                    </div>
                                    <div className="col-6 col-xxs-12">
                                        <input
                                            type="file"
                                            name="image"
                                            id="image2"
                                            placeholder="Image"

                                        />
                                    </div>
                                    <div className="col-6 col-xxs-12">
                                        <input
                                            type="file"
                                            name="image"
                                            id="image3"
                                            placeholder="Image"

                                        />
                                    </div>
                                    <div className="col-6 col-xxs-12">
                                        <input
                                            type="file"
                                            name="image"
                                            id="image4"
                                            placeholder="Image"

                                        />
                                    </div>


                                </div>

                                <button type="submit" className="fz-1-banner-btn fz-comment-form__btn">
                                   Create Product
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ProductForm