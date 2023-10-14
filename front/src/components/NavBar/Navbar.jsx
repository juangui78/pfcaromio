import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth, UserButton } from '@clerk/clerk-react';
import { Link, useLocation } from 'react-router-dom';

import CartBtn from '../CartBtn/CartBtn';
import SearchBar from '../SearchBar/SearchBar';
import { orderByName, sortedByRating, filterByRating } from '../../redux/actions';

import { IconContext } from "react-icons";
import {
  FaSearch,
  FaUser,
  FaSlidersH,
  FaList,
  FaThumbsUp,
  FaThumbsDown,
  FaSortAlphaUp,
  FaSortAlphaDown,
  FaSortDown,

} from 'react-icons/fa';

import { NavBar, FilterByBtn, OrderByBtn } from './NavBarStyles';
//import './Navbar.css';


const Navbar = () => {
  const dispatch = useDispatch()
  const { isSignedIn, userId } = useAuth()
  const [filtersDropdownOpen, setFiltersDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [ratingFilter, setRatingFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sliderValue, setSliderValue] = useState(0);

  const filtersRef = useRef(null);

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

  const showFilters = () => {
    filtersRef.current.showModal()
  }


  return (
    <NavBar>
      <div className='nav'>
        <div className='nav-logo'>
          <Link to='/home' >
            <img className="img-logo" src="LogoPizzeria.png" alt="Logo" />
          </Link>
        </div>
           
        <div className='nav-input-search'>
          <search className='search'>
            <input type="search" id="searchInput" placeholder='Buscar restaurante o pizza' />
            <button type="submit"><FaSearch /></button>
          </search>
          <div className='filters'>
            <FilterByBtn onClick={showFilters}>
              <span>Filtrar por: </span>
              <IconContext.Provider value={{ style: { color: 'black', width: '20px', height: '20px' } }} >
                <FaSlidersH />
              </IconContext.Provider>
            </FilterByBtn>

            <OrderByBtn>
              <div className="sec-center">
                <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" />
                <label className="for-dropdown" htmlFor="dropdown">Ordenar por:
                  <IconContext.Provider value={{ style: { paddingLeft: '1rem', color: 'black', width: '20px', height: '20px' } }} >
                    <FaList />
                  </IconContext.Provider>
                </label>

                <div className="section-dropdown">
                  <a href="#" onClick={() => handleSortByRatingClick('low')}>Peor Rating <FaThumbsDown /></a>
                  <a href="#" onClick={() => handleSortByRatingClick('high')}>Mejor Rating <FaThumbsUp /></a>

                  <input className="dropdown-sub" type="checkbox" id="dropdown-sub" name="dropdown-sub" />
                  <label className="for-dropdown-sub" for="dropdown-sub">Orden Alfabético <FaSortDown /></label>
                  <div className="section-dropdown-sub">
                    <a href='#' onClick={() => handleSortByNameClick('asc')}>Ascendente
                      <IconContext.Provider value={{ style: { width: '20px', height: '20px' } }} >
                        <FaSortAlphaUp />
                      </IconContext.Provider>
                    </a>
                    <a href='#' onClick={() => handleSortByNameClick('desc')}>Descendente
                      <IconContext.Provider value={{ style: { width: '20px', height: '20px' } }} >
                        <FaSortAlphaDown />
                      </IconContext.Provider>
                    </a>
                  </div>
                </div>

              </div>
            </OrderByBtn>

          </div>
        </div>

        <div className='nav-btns'>
          <div className='nav-btn-user-container'>
            {
              !isSignedIn ? (
                <button className='nav-btn-user' onClick={() => handleLoginButton()}>
                  <FaUser /><span>Ingresar</span>
                </button>
              ) : <UserButton className="userBtn" />
            }
          </div>
          {
            isSignedIn && typeUser === 'Seller'
              ? <div className='line-div'></div>
              : null
          }

          <div className="buttonCreate">
            {
              isSignedIn && typeUser === 'Seller'
                ? <Link to='/myRestaurant' className='link'>Mi Restaurante</Link> : null
            }
          </div>

          <div className='line-div'></div>
          <div><CartBtn /></div>
        </div>

      </div>

      <dialog ref={filtersRef} className="filterCard" id="favDialog">
        <form method="dialog">
          <section>
            <p>
              <span for="favAnimal">Filtros:</span>
            </p>
            Aqui se van a aplicar los filtros del producto
          </section>
          <menu>
            <button id="cancel" type="reset">Cancelar</button>
            <button type="submit">Filtrar</button>
          </menu>
        </form>
      </dialog>

    </NavBar>
    /*   <nav className="navbar">
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
                  <button style={{ backgroundColor: 'black', color: 'white' }}>Ordenar por Rating</button>
                    <div className="dropdown-content-inner show-scroll">
                      <a href="#" onClick={() => handleSortByRatingClick('low')}>Peor Rating</a>
                      <a href='#' onClick={() => handleSortByRatingClick('high')}>Mejor Rating</a>                  
                      </div>
                  </div>
                  <div className="filter-button">
                  <button style={{ backgroundColor: 'black', color: 'white' }}>Ordenar por Nombre</button>
                    <div className="dropdown-content-inner show-scroll">
                    <a href='#' onClick={() => handleSortByNameClick('desc')}>Z-A</a>
                      <a href='#' onClick={() => handleSortByNameClick('asc')}>A-Z</a>
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
      </nav> */
  );
};

export default Navbar;

