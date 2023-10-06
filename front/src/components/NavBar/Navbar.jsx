import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './Navbar.css';

import { useAuth, UserButton } from '@clerk/clerk-react'; 
import { Link, useLocation} from 'react-router-dom';
import CartBtn from '../CartBtn/CartBtn';
import SearchBar from '../SearchBar/SearchBar';
import { SignedOut } from '@clerk/clerk-react';

const Navbar = () => {
  const { isSignedIn } = useAuth()
  const [filtersDropdownOpen, setFiltersDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [ratingFilter, setRatingFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  const showFiltersAndSearch = !location.pathname.startsWith('/products');

  const handleRatingInputChange = (event) => {
    setRatingFilter(event.target.value);
  };
  
  const handlePriceInputChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const applyRatingFilter = () => {
    console.log('Aplicar filtro con valor:', ratingFilter);
    setRatingFilter('');
  };

  const applyPriceFilter = () => {
    console.log('Aplicar filtro de precio con valor:', priceFilter);
    setPriceFilter('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      applyRatingFilter();
    }
  };

  const handlePriceKeyPress = (event) => {
    if (event.key === 'Enter') {
      applyPriceFilter();
    }
  };

  const toggleFiltersDropdown = () => {
    setFiltersDropdownOpen(!filtersDropdownOpen);
  };

  const handleLoginButton = () => {
    navigate('/login')
  }

  const handleSignOutButton = () => {
    SignedOut()
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="logo">
          <Link to='/home'>
            <img src="LogoPizzeria.png" alt="Logo" />
          </Link>
        </div>
        <div className="filters">
          <div className="dropdown">
            <button className="filter-button filter-buttonns" onClick={toggleFiltersDropdown}>
              Agregar filtros
            </button>
            {filtersDropdownOpen && (
              <div className="dropdown-content">
                <div className="filter-button">
                  <button>Ordenar por Rating</button>
                  <div className="dropdown-content-inner show-scroll">
                    <a href="#">Peor Rating</a>
                    <a href="#">Mejor Rating</a>
                  </div>
                </div>
                <div className="filter-button">
                  <button>Ordenar por Nombre</button>
                  <div className="dropdown-content-inner show-scroll">
                    <a href="#">Z-A</a>
                    <a href="#">A-Z</a>
                  </div>
                </div>
                <div className="filter-button">
                  <button>Filtrar por Rating</button>
                  <div className="dropdown-content-inner show-scroll">
                    <div className="inputContainer">
                      <div className="slider-container">
                        <div className="slider-label">Mayor que:</div>
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="1"
                          className="inputRating"
                          id="ratingFilterInput"
                          value={ratingFilter}
                          onChange={handleRatingInputChange}
                          onKeyPress={handleKeyPress}
                        />
                        <div className="slider-value">{ratingFilter}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {!showFiltersAndSearch && (
          <div className="back-to-home-button" style={{ marginRight: '545px', borderBottom: '1px solid black', position: 'relative' }}>
            <Link to="/home" style={{ textDecoration: 'none', color: 'black', fontSize: '16px' }}>
              Volver a Inicio
            </Link>
          </div>
        )}

            <SearchBar />

        <div className="user-actions">
          {!isSignedIn ? (
            <button className="login-button" onClick={() => handleLoginButton()}>Iniciar Sesión</button>
          ) : <UserButton/>}
        </div>
        <div className="buttonCreate">
          <Link to="/createProduct" className="link">
            Agregar Producto
          </Link>
        </div>
            <CartBtn/>
      </div>
    </nav>
  );
};

export default Navbar;

