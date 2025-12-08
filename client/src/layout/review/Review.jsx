
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Review = () => {

    return (
        <div className="container">
            <div className="fz-inner-contact-details">
                <div className="fz-inner-contact-details__left">
                    <div className="fz-blog-details__comment-form">
                        <h4 className="fz-comment-form__title fz-inner-contact-details__title">Leave a Review</h4>
                        <form action="#" >
                            <div className="row g-xl-4 g-3">
                                <div className="col-6 col-xxs-12">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        placeholder="First Name"

                                    />
                                </div>
                                <div className="col-6 col-xxs-12">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        placeholder="Last Name"

                                    />
                                </div>

                                <div className="col-12">
          <textarea
              name="review"
              id="review"
              placeholder="Your Review"

          ></textarea>
                                </div>
                            </div>

                            <button type="submit" className="fz-1-banner-btn fz-comment-form__btn">
                                Send your review
                            </button>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Review;