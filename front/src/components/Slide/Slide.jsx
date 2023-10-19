import React, { useState, useEffect } from 'react';
import './Slide.css'

const promotions = [
  { id: 1, imageUrl: 'https://fiorellapizza.com/wp-content/uploads/2022/03/banners-FIORELLA-4-pizzas.jpg' },
  { id: 2, imageUrl:  '../../public/promo2.jpg'},
  { id: 3, imageUrl: '../../public/promo3.png' },
  { id: 4, imageUrl: '../../public/promo4.jpg' },
  { id: 5, imageUrl: 'https://genovesapizza.cl/wp-content/uploads/2020/06/banner3.jpg' }
];

const Slide = () => {
    const [currentImage, setCurrentImage] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % promotions.length);
      }, 10000); 
  
      return () => clearInterval(interval);
    }, []);
  
    const goToPrevImage = () => {
      setCurrentImage((prevImage) => (prevImage - 1 + promotions.length) % promotions.length);
    };
  
    const goToNextImage = () => {
      setCurrentImage((prevImage) => (prevImage + 1) % promotions.length);
    };
  
    return (
      <div className="SliderContainer">
      <div className="ArrowsContainer">
        <div className="ArrowLeft" onClick={goToPrevImage}>&#10094;</div>
        <div className="ArrowRight" onClick={goToNextImage}>&#10095;</div>
      </div>
      <div className="ImageContainer">
        <img className="SliderImage" src={promotions[currentImage].imageUrl} alt={`Promotion ${promotions[currentImage].id}`} />
      </div>
    </div>
    );
  };
  
export default Slide;