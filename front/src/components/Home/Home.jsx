import React from 'react';
import './Home.css';
import Navbar from '../NavBar/Navbar';
import CardDescuento from '../CardDescuento/CardDescuento';
import Card from '../Card/Card';
import ShoppingCard from '../ShoppingCard/ShoppingCard';

const Home = () => {
  // Datos de ejemplo para las tarjetas
  const cardData = [
    {
      imageSrc: 'Dominos.png',
      name: 'Dominos Pizza',
      address: 'Dirección 1',
      rating: 4.5
    },
  ];

  return (
    <div className="home-container">
      <Navbar/>
      <div className='card-descuento-container'>
        <CardDescuento />
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
