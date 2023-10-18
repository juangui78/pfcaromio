import React from 'react';
import './Home.css';
import Navbar from '../NavBar/Navbar';

import CardDescuento from '../CardDescuento/CardDescuento';
import ShoppingCard from '../ShoppingCard/ShoppingCard';
import Slide from '../Slide/Slide'

const Home = () => {
  return (           
    <div className="home-container">
      <Navbar />


      <div className='card-descuento-container'>
        <CardDescuento />
      </div>        
      <div className='slide'>
        <Slide />
      </div>
      <div className="card-container">
        {cardData.map((data, index) => (
          <Card
            key={index}
            imageSrc={data.imageSrc}
            name={data.name}
            address={data.address}
            rating={data.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
