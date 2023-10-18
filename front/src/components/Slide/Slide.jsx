import React, { useState, useEffect } from 'react';
import './Slide.css'

const promotions = [
  { id: 1, imageUrl: 'https://www.pizzaspiccolo.com.co//wp-content/uploads/2018/05/Promo-Madres-banner-web-1.jpg' },
  { id: 2, imageUrl: 'https://png.pngtree.com/png-clipart/20210711/original/pngtree-creative-fashion-pizza-promotion-banner-template-on-yellow-background-png-image_6510564.jpg' },
  { id: 3, imageUrl: 'https://png.pngtree.com/png-clipart/20210711/original/pngtree-yellow-creative-pizza-promotion-banner-template-png-image_6510566.jpg' },
  { id: 4, imageUrl: 'https://png.pngtree.com/png-clipart/20210711/original/pngtree-creative-gourmet-pizza-promotion-banner-template-png-image_6510562.jpg' },
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