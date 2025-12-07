import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';

const ProductDetailSlider = () => {
    const mainImageRef = useRef(null);
    useEffect(() => {

        const imgNavSettings = {
            slidesToShow: 4,
            slidesToScroll: 1,
            focusOnSelect: true,
            asNavFor: mainImageRef.current,
            dots: false,
        };

        setImgNavSettings(imgNavSettings);
    }, []);

    const [imgNavSettings, setImgNavSettings] = useState({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: null, // Initialize with null
        dots: false,
        focusOnSelect: true,
    });

    const imgSliderSettings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
    };

    return (
        <>
            <Slider className="fz-product-details__img-slider" {...imgSliderSettings} ref={mainImageRef}>
                <img src="/assets/images/test3.webp" alt="Product Image" />
                <img src="/assets/images/test2.webp" alt="Product Image" />
                <img src="/assets/images/test1.webp" alt="Product Image" />
                <img src="/assets/images/test3.webp" alt="Product Image" />
            </Slider>

            <Slider className="fz-product-details__img-nav" {...imgNavSettings}>
                <img src="/assets/images/test3.webp" alt="Product Image"/>
                <img src="/assets/images/test2.webp" alt="Product Image"/>
                <img src="/assets/images/test1.webp" alt="Product Image"/>
                <img src="/assets/images/test3.webp" alt="Product Image"/>
            </Slider>
        </>
    );
};

export default ProductDetailSlider;
