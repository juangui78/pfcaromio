import React, { useState } from 'react';
import './Navbar.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useLocation } from 'react-router-dom';
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
                      <a href="#">Mayor que: </a>
                      <input
                        type="number"
                        min="0"
                        max="5"
                        step="1"
                        className="inputRating"
                        id="ratingFilterInput"
                        value={ratingFilter}
                        onChange={handleRatingInputChange}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                  </div>
                </div>
                <div className="filter-button">
                  <button>Filtrar por Precio</button>
                  <div className="dropdown-content-inner show-scroll">
                    <div className="inputContainer">
                      <a href="#">Menor que: </a>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="10"
                        className="inputRating"
                        id="ratingFilterInput"
                        value={ratingFilter}
                        onChange={handleRatingInputChange}
                        onKeyPress={handleKeyPress}
                      />
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
        <div className="user-actions">
          {!isAuthenticated ? (
            <button className="login-button" onClick={() => loginWithRedirect()}>Iniciar Sesión</button>
          ) : null}
        </div>
        <div className="buttonCreate">
          <Link to="/createProduct" className="link">
            Agregar Producto
          </Link>
        </div>
        <div className="cart-icon">
          <button>
            <img src="../../public/Carrito.png" alt="Carro" className="carrito" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarProducts;

