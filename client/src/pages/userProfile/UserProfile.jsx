
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Profile = () => {

    return (
        <div className="container">
            <div className="fz-checkout">
                <form action="#" className="checkout-form">
                    <div className="fz-billing-details">
                        <div className="row gy-0 gx-3 gx-md-4">
                            <h3 className="fz-checkout-title">User info</h3>
                            <div className="col-6 col-xxs-12">
                                <input type="text" name="first-name" id="checkout-first-name" placeholder="First Name"/>
                            </div>
                            <div className="col-6 col-xxs-12">
                                <input type="text" name="last-name" id="checkout-last-name" placeholder="Last Name"/>
                            </div>

                            <div className="col-6 col-xxs-12">
                                <input type="number" name="phone" id="checkout-phone-number" placeholder="Phone Number"/>
                            </div>

                            <div className="col-6 col-xxs-12">
                                <input type="email" name="email" id="checkout-email-address" placeholder="Email Address"/>
                            </div>

                        </div>
                    </div>

                    <div className="fz-checkout-sidebar">
                        <div className="billing-summery">

                            <div className="cart-checkout-area">

<img src="/assets/images/test2.webp"/>

                                <Link to="/cart" className="fz-1-banner-btn cart-checkout-btn">Edit Profile</Link>
                            </div>
                        </div>


                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile;