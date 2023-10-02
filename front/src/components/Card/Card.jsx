import React from 'react';
import './Card.css';

const Card = ({ imageSrc, name, address, rating }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={imageSrc} alt="Pizzeria" />
      </div>
      <div className="card-details">
        <h3 className="card-name">{name}</h3>
        <p className="card-address">Dirección: {address}</p>
        <p className="card-rating">Calificación: {rating}</p>
      </div>
    </div>
  );
};

export default Card;
