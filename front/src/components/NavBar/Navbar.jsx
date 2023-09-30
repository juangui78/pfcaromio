import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
    <div className='navbar-container'>
      <div className="logo">
        <img src="LogoPizzeria.png" alt="Logo" />
      </div>
      <div class="filters">
    <div class="dropdown">
      <button class="filter-button" onclick="toggleDropdown('calificacion-dropdown')">Ordenar por Calificación</button>
      <div id="calificacion-dropdown" class="dropdown-content">
        <a href="#">Mejor Calificación</a>
        <a href="#">Peor Calificación</a>
      </div>
    </div>

    <div class="dropdown">
      <button class="filter-button" onclick="toggleDropdown('precio-dropdown')">Ordenar por Nombre</button>
      <div id="precio-dropdown" class="dropdown-content">
        <a href="#">A-Z</a>
        <a href="#">Z-A</a>
      </div>
    </div>
  </div>
      <div className="search-bar">
        <input type="text" placeholder="Buscar comidas, restaurantes..." />
        <button>
             <img src='Lupa.png' alt='Buscar' className='lupa'/>
        </button>
      </div>
      <div className="user-actions">
        <button>Iniciar Sesión</button>
        <div className="cart-icon">
            <button>
                <img src='Carrito.png' alt='Carro' className='carrito'/>
            </button>
        </div>    
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
