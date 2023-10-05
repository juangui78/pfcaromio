import React, { useState } from 'react';
import './Products.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useLocation } from 'react-router-dom';
import CartBtn from '../CartBtn/CartBtn';
import SearchBar from '../SearchBar/SearchBar';

const NavbarProducts = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [filtersDropdownOpen, setFiltersDropdownOpen] = useState(false);
  const location = useLocation();
  const [ratingFilter, setRatingFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  const showFiltersAndSearch = !location.pathname.startsWith('/products');
  const isProductsPage = location.pathname === '/products';

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

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to='/home'>
            <img src="../../public/LogoPizzeria.png" alt="Logo" />
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
                      <button>Ordenar por Precio</button>
                      <div className="dropdown-content-inner show-scroll">
                        <a href="#">Menor Precio</a>
                        <a href="#">Mayor Precio</a>
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
                <div className="filter-button">
                  <button>Filtrar por Precio</button>
                  <div className="dropdown-content-inner show-scroll">
                    <div className="inputContainer">
                      <div className="slider-container">
                        <div className="slider-label">Menor que:</div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="10"
                          className="inputRating"
                          id="priceFilterInput"
                          value={priceFilter}
                          onChange={handlePriceInputChange} // Cambié el manejador a handlePriceInputChange
                          onKeyPress={handlePriceKeyPress} // Cambié el manejador a handlePriceKeyPress
                          />
                        <div className="slider-value">{priceFilter}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {!showFiltersAndSearch && (
          <div className="back-to-home-button" style={{marginLeft: '10px',marginRight: '359px',marginLeft: '-10px',borderBottom: '1px solid black' }}>
            <Link to="/home" style={{ textDecoration: 'none', color: 'black', fontSize: '16px' }}>
              Volver a Inicio
            </Link>
          </div>
        )}
        
        <div className="user-actions">
          {!isAuthenticated ? (
            <button className="login-button" style= {{marginRigth: '10px', borderBottom: '1px solid black', position: 'relative' }}onClick={() => loginWithRedirect()}>Iniciar Sesión</button>
          ) : null}
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

export default NavbarProducts;

