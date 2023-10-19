import React from 'react';
import './CardDescuento.css'
import LoginForm from '../Login/Login';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
const CardDescuento = () => {
  const navigate = useNavigate()
  const { isSignedIn } = useAuth()

  const toSignIn = () => {
    navigate('/register')
  }

  return (
      isSignedIn ? null :
      <div className="card-descuento">
      <h2>¿Todavía no te has registrado?</h2>
      <p>Regístrate y disfruta un 15% de descuento en tu primera compra.</p>
      <button onClick={() => toSignIn()}>¡Registrarme!</button>
      {/* <LoginForm></LoginForm> */}
    </div>
   
  );
};

export default CardDescuento;
