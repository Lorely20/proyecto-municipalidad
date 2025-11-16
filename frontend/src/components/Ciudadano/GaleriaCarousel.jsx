import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './GaleriaCarousel.css';

const GaleriaCarousel = ({ imagenes }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    <div className="galeria-carousel-container">
      <Slider {...settings}>
        {imagenes.map((imgUrl, index) => (
          <div key={index} className="slide">
            <img src={imgUrl} alt={`Imagen ${index + 1}`} className="slide-img" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GaleriaCarousel;
