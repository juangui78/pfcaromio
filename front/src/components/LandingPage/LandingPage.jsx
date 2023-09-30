import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="left-half">

      </div>
      <div className="right-half">
        <h2>¿Con ganas de una pizza?</h2>
        <h3>¡Pide a domicilio las mejores pizzas de nuestro pais!</h3>
        <Link className="cta-button" to="/home">Ingresar</Link>
      </div>
    </div>
  );
};

export default LandingPage;
