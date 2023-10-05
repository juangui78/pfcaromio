import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';
import { useAuth0 } from '@auth0/auth0-react';

const LandingPage = () => {
  const {isAuthenticated, isLoading, user} = useAuth0()
  
  const navigate = useNavigate()
  const redirectToHome = () => {
    if (isAuthenticated) {
      navigate('/creatingAccount')
      return null
    }
  }
  console.log(user)
  return (
    isAuthenticated ? redirectToHome() :
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
