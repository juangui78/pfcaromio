import React, { useState } from 'react';
import './Navbar.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [filtersDropdownOpen, setFiltersDropdownOpen] = useState(false);

  const toggleFiltersDropdown = () => {
    setFiltersDropdownOpen(!filtersDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src="LogoPizzeria.png" alt="Logo" />
        </div>

        <div className="filters">
          <div className="dropdown">
            <button className="filter-button filter-buttonns" onClick={toggleFiltersDropdown}>
              Agregar filtros
            </button>
            {filtersDropdownOpen && (
              <div className="dropdown-content">
                <div className="filter-button">
                  <button>Filtrar por Rating</button>
                  <div className="dropdown-content-inner show-scroll">
                    <a href="#">Peor Rating</a>
                    <a href="#">Mejor Rating</a>
                  </div>
                </div>

                <div className="filter-button">
                  <button>Filtrar por Precio</button>
                  <div className="dropdown-content-inner show-scroll">
                    <a href="#">Menor Precio</a>
                    <a href="#">Mayor Precio</a>
  
                  </div>
                </div>

                <div className="filter-button">
                  <button>Filtrar por Nombre</button>
                  <div className="dropdown-content-inner show-scroll">
                    <a href="#">Z-A</a>
                   <a href="#">A-Z</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Buscar comidas, restaurantes..." />
          <button>
            <img src="Lupa.png" alt="Buscar" className="lupa" />
          </button>
        </div>
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
            <img src="Carrito.png" alt="Carro" className="carrito" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
