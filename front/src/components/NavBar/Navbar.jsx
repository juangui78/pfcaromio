import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './Navbar.css';
import { useAuth, UserButton } from '@clerk/clerk-react'; 
import { Link, useLocation} from 'react-router-dom';
import CartBtn from '../CartBtn/CartBtn';
import SearchBar from '../SearchBar/SearchBar';
import { orderByName, sortedByRating, filterByRating} from '../../redux/actions';

const Navbar = () => {
  const dispatch = useDispatch()
  const { isSignedIn, userId } = useAuth()
  const [filtersDropdownOpen, setFiltersDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [ratingFilter, setRatingFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  
  const showFiltersAndSearch = !location.pathname.startsWith('/products');

  
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

  const applyRatingFilterButton = () => {
    dispatch(filterByRating(sliderValue));
  };  
  
  const handleRatingInputChange = (event) => {
    const value = parseFloat(event.target.value);
    setSliderValue(value);
  };

  const handleSortByNameClick = (order) => {
    dispatch(orderByName(order)); // Donde order es 'asc' o 'desc'
  };

  const handleSortByRatingClick = (order) => {
    dispatch(sortedByRating(order)); // Donde order es 'low' o 'high'
  };  
  
  const handlePriceInputChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const applyRatingFilter = () => {
    console.log('Aplicar filtro con valor:', ratingFilter);
    handleSortByRatingClick(ratingFilter);
    setRatingFilter(''); // Limpiar el filtro después de aplicarlo
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
  
  const openFiltersDropdown = () => {
    setFiltersDropdownOpen(true);
  };
  const handleLoginButton = () => {
    navigate('/login')
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
                    <a href="#" onClick={() => handleSortByRatingClick('low')}>Peor Rating</a>
                    <a href='#' onClick={() => handleSortByRatingClick('high')}>Mejor Rating</a>                  
                    </div>
                </div>
                <div className="filter-button">
                  <button>Ordenar por Nombre</button>
                  <div className="dropdown-content-inner show-scroll">
                  <a href='#' onClick={() => handleSortByNameClick('desc')}>Z-A</a>
                    <a href='#' onClick={() => handleSortByNameClick('asc')}>A-Z</a>
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
                          value={sliderValue}
                          onChange={handleRatingInputChange} // Usamos handleRatingInputChange aquí
                          onKeyPress={handleKeyPress}
                        />
                        <div className="slider-value">{sliderValue}</div>
                        <button onClick={applyRatingFilterButton}>Aplicar</button>
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
          ) : <UserButton />}
        </div>
        <div className="buttonCreate">
          {isSignedIn && typeUser === 'Seller' ? <div>
            <Link to='/myRestaurant' className='link'>Mi Restaurante</Link>
          </div> : null  }
        </div>
            <CartBtn/>
      </div>
    </nav>
  );
};

export default Navbar;

