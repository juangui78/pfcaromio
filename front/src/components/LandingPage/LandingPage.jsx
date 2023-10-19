import React from 'react';
import './LandingPage.css';
import { BackgroundContainer, Button } from './LandingPageStayles';

const LandingPage = () => {

 
  return (

    <>
      <BackgroundContainer >

        <h2>CON HAMBRE DE</h2>
        <div>
          <span className='l-line'>
            <svg >
              <line x1="80" y1="10" x2="150" y2="10" stroke="white" strokeWidth="5" />
              <line x1="0" y1="30" x2="150" y2="30" stroke="white" strokeWidth="5" />
              <line x1="80" y1="50" x2="150" y2="50" stroke="white" strokeWidth="5" />
            </svg>
          </span>
          <h1>PIZZA</h1>
          <span className='r-line'>
            <svg >
              <line x1="0" y1="10" x2="70" y2="10" stroke="white" strokeWidth="5" />
              <line x1="0" y1="30" x2="150" y2="30" stroke="white" strokeWidth="5" />
              <line x1="0" y1="50" x2="70" y2="50" stroke="white" strokeWidth="5" />
            </svg>
          </span>
        </div>
        <span className='text'>Pídela ya del sabor que prefieras en tu restaurante favorito </span>
        <Button className="button" to="/home">HACER PEDIDO</Button>
      </BackgroundContainer>
    </>

  );
};

export default LandingPage;
