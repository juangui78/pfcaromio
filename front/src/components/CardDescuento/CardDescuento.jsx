import React from 'react';
import './CardDescuento.css'
import LoginForm from '../Login/Login';
import { useAuth0 } from '@auth0/auth0-react';
const CardDescuento = () => {

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <div className="card-descuento">
      <h2>¿Todavía no te has registrado?</h2>
      <p>Regístrate y disfruta un 15% de descuento en tu primera compra.</p>
      <button onClick={loginWithRedirect}>¡Registrarme!</button>
    </div>
    )
   
  );
};

export default CardDescuento;
