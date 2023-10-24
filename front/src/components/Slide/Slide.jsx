import React, { useState, useEffect, useRef } from 'react';
import './Slide.css';

const promotions = [
  { id: 1, imageUrl: 'https://fiorellapizza.com/wp-content/uploads/2022/03/banners-FIORELLA-4-pizzas.jpg' },
  { id: 2, imageUrl:  '../../public/promo2.jpg'},
  { id: 3, imageUrl: '../../public/promo3.jpg' },
  { id: 4, imageUrl: '../../public/promo4.jpg' },
  { id: 5, imageUrl: 'https://genovesapizza.cl/wp-content/uploads/2020/06/banner3.jpg' }
];

const Slide = ({visible}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const intervalRef = useRef(null);

  const goToPrevImage = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + promotions.length) % promotions.length);
    restartInterval();
  };

  const goToNextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % promotions.length);
    restartInterval();
  };

  const restartInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % promotions.length);
    }, 10000);
  };

  useEffect(() => {
    restartInterval();

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="SliderContainer" style={{display: visible ? 'flex':'none'}}>
      <div className="ArrowsContainer">
        <div className="ArrowLeft" onClick={goToPrevImage}>&#10094;</div>
        <div className="ArrowRight" onClick={goToNextImage}>&#10095;</div>
      </div>
      <div className="ImageContainer">
        <img className="SliderImage" src={promotions[currentImage].imageUrl} alt={`Promotion ${promotions[currentImage].id}`} />
      </div>
      <div className="IndicatorsContainer">
        {promotions.map((promotion, index) => (
          <div
            key={promotion.id}
            className={`Indicator ${currentImage === index ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slide;