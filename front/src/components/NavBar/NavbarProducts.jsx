import React, { useState, useEffect } from 'react';
import './Products.css';
import { Link, useLocation } from 'react-router-dom';
import CartBtn from '../CartBtn/CartBtn';
import SearchBar from '../SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserButton } from '@clerk/clerk-react'; 
import axios from 'axios';

const NavbarProducts = () => {
  const [filtersDropdownOpen, setFiltersDropdownOpen] = useState(false);
  const location = useLocation();
  const [ratingFilter, setRatingFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const { isSignedIn, userId } = useAuth()
  const navigate = useNavigate();
  const showFiltersAndSearch = !location.pathname.startsWith('/products');
  const isProductsPage = location.pathname === '/products';

  const [userData, setUserData] = useState((null))

  useEffect(() => {
    axios.get(`http://localhost:3004/users/${userId}`)
      .then((data) => {
        data && setUserData(data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [userId])

  const typeUser = userData?.[0]?.role

  const handleLoginButton = () => {
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <Link to='/home'>
            <img src="../../public/LogoPizzeria.png" alt="Logo" />
          </Link>
        </div>

        {!showFiltersAndSearch && (
          <div className="back-to-home-button" style={{ marginLeft: 'auto', marginRight: '620px' }}>
            <Link to="/home" style={{ textDecoration: 'none', color: 'black', fontSize: '16px' }}>
              Volver a Inicio
            </Link>
          </div>
        )}

        <div className="user-actions">
          {!isSignedIn ? (
            <button className="login-button" onClick={handleLoginButton}>Iniciar Sesión</button>
          ) : <UserButton />}
        </div>
        
        {isSignedIn && !isProductsPage && typeUser === 'Seller' && (
          <div className="buttonCreate">
            <Link to="/createProduct" className="link">
              Agregar Producto
            </Link>
          </div>
        )}

        <CartBtn />
      </div>
    </nav>
  );
};

export default NavbarProducts;
