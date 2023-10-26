import React, { useState, useEffect, useRef } from 'react';
import './Slide.css';

const promotions = [
  { id: 1, imageUrl: 'https://fiorellapizza.com/wp-content/uploads/2022/03/banners-FIORELLA-4-pizzas.jpg' },
  { id: 2, imageUrl:  'https://www.pizzaspiccolo.com.co//wp-content/uploads/2019/03/banner-web-5-1-scaled.jpg'},
  { id: 3, imageUrl: 'https://previews.123rf.com/images/goodstudio/goodstudio2104/goodstudio210400177/167562986-dise%C3%B1o-de-banner-publicitario-horizontal-para-pizzer%C3%ADa-con-pizzas-e-ingredientes-sobre-fondo-de.jpg' },
  { id: 4, imageUrl: 'https://www.pizzaspiccolo.com.co//wp-content/uploads/2022/02/Banner-web.jpg' },
  { id: 5, imageUrl: 'https://genovesapizza.cl/wp-content/uploads/2020/06/banner3.jpg' },
  {id: 6, imageUrl: 'https://res.cloudinary.com/dfsjn09oo/image/upload/v1698018850/zr04glqxblxug4m4ev7p.jpg'},
  {id: 7, imageUrl: 'https://res.cloudinary.com/dfsjn09oo/image/upload/v1698018850/lj5glbhlsyp07actmndd.jpg'},
  {id: 8, imageUrl: 'https://res.cloudinary.com/dfsjn09oo/image/upload/v1698018850/ulceceuehs40bq648jri.jpg'}
];

const Slide = () => {
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
    <div className="SliderContainer" >
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