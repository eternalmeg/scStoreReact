import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';

const ProductDetailSlider = ({ images }) => {
    const mainImageRef = useRef(null);

    const [imgNavSettings, setImgNavSettings] = useState({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: null,
        dots: false,
        focusOnSelect: true,
    });

    const imgSliderSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: mainImageRef.current,
    };

    useEffect(() => {
        setImgNavSettings(prev => ({
            ...prev,
            asNavFor: mainImageRef.current,
        }));
    }, []);

    return (
        <>
            <Slider className="fz-product-details__img-slider" {...imgSliderSettings} ref={mainImageRef}>
                {images.map((img, i) => (
                    <div className="img-main-wrapper" key={i}>
                        <div className="img-main" style={{ backgroundImage: `url(${img})` }} />
                    </div>
                ))}
            </Slider>

            <Slider className="fz-product-details__img-nav" {...imgNavSettings}>
                {images.map((img, i) => (
                    <div className="img-thumb-wrapper" key={i}>
                        <div className="img-thumb" style={{ backgroundImage: `url(${img})` }} />
                    </div>
                ))}
            </Slider>

        </>
    );
};

export default ProductDetailSlider;
