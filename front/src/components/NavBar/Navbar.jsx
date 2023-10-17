import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth, UserButton } from '@clerk/clerk-react';
import { Link, useLocation } from 'react-router-dom';

import CartBtn from '../CartBtn/CartBtn';
import SearchBar from '../SearchBar/SearchBar';
import { orderByName, sortedByRating, filterByRating, setProductsList } from '../../redux/actions';

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
  FaTimes,

} from 'react-icons/fa';

import {
  NavBar,
  FilterByBtn,
  FilterItem,
  OrderByBtn,
  FilterSection,
  FilterModal,
} from './NavBarStyles';

//import './Navbar.css';

const Navbar = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();

  const { isSignedIn, userId } = useAuth()
  const [filtersDropdownOpen, setFiltersDropdownOpen] = useState(false);
  const [ratingFilter, setRatingFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sliderValue, setSliderValue] = useState(0);

  const [currentStore, setCurrentStore] = useState({});
  const [products, setProducts] = useState([])

  const filtersRef = useRef(null);
  const filterRatingInput = useRef(null);
  const filterPriceInput = useRef(null);

  const showFiltersAndSearch = !location.pathname.startsWith('/products');
  const disableFilterBtn = location.pathname.startsWith('/products') || location.pathname.startsWith('/myRestaurant');

  const [userData, setUserData] = useState((null))

  const [sortOrder, setSortOrder] = useState('desc');
  const [priceSortOrder, setPriceSortOrder] = useState('asc');

  const store = useSelector(state => state.restaurantSelected);

  useEffect(() => {
    if (store.id) {
      setCurrentStore(store)
    }
    else {
      setCurrentStore(JSON.parse(localStorage.getItem('restaurantSelected')));
    }

    axios.get(`http://localhost:3004/products/?storeid=${currentStore.id}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
      
    axios.get(`http://localhost:3004/users/${userId}`)
      .then((data) => {
        data && setUserData(data.data)
      })
      .catch((error) => {
        console.log(error)
      })

    
  }, [userId, store])

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

  const handleRatingFilterChange = (event) => {
    setRatingFilter(event.target.value);
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  /*  const applyFilters = async () => {
     try {
       const response = await axios.get(`http://localhost:3004/products/?storeid=${storeId}`);
       let filteredProducts = response.data;
   
       if (ratingFilter) {
         filteredProducts = filteredProducts.filter((product) => product.rating >= ratingFilter);
       }
       if (priceFilter) {
         filteredProducts = filteredProducts.filter((product) => product.price <= priceFilter);
       }
       setProducts(filteredProducts);
     } catch (error) {
       console.error('Error al aplicar filtros:', error);
     }
   }; */

  const applyFilters = () => {
    const storeId = currentStore.id;
    let filteredProducts = axios
      .get(`http://localhost:3004/products/filtered/?maxPrice=${priceFilter}&minRating=${ratingFilter}&storeid=${storeId}`)
      .then((response) => {
        setProducts(response.data);
        dispatch(setProductsList(response.data));
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });;

    setRatingFilter('');
    setPriceFilter('');
    filtersRef.current.close();
  }

  const handlePriceSort = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (priceSortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    dispatch(setProductsList(sortedProducts));
    setProducts(sortedProducts);
    setPriceSortOrder(priceSortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortByRating = () => {

    const sortedProducts = [...products].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.rating - b.rating;
      } else {
        return b.rating - a.rating;
      }
    });
    dispatch(setProductsList(sortedProducts));
    setProducts(sortedProducts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const showFilters = () => {
    filtersRef.current.showModal()
  }

  const closeFilters = () => {

    filterRatingInput.current = '';
    filterPriceInput.current = '';
    filtersRef.current.close();
  }

  return (
    <NavBar>
      <div className='nav'>
        <div className='nav-logo'>
          <Link to='/home' >
            <img className="img-logo" src="/LogoPizzeria.png" alt="Logo" />
          </Link>
        </div>

        <div className='nav-input-search'>
          <search className='search'>
            <input type="search" id="searchInput" placeholder='Buscar restaurante o pizza' />
            <button type="submit"><FaSearch /></button>
          </search>

          <div className='filters'>
            <FilterByBtn onClick={showFilters} disabled={!disableFilterBtn}>
              <span>Filtrar por: </span>
              <IconContext.Provider value={{ style: { color: !disableFilterBtn ? '#DDD':'black', width: '20px', height: '20px' } }} >
                <FaSlidersH />
              </IconContext.Provider>
            </FilterByBtn>

            <div className='last'>Último restaurante visto: {currentStore.name}</div>

            <OrderByBtn disabled={!disableFilterBtn}>
              <div className="sec-center">
                <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" disabled={disableFilterBtn} />
                <label className="for-dropdown" htmlFor="dropdown">Ordenar por:
                  <IconContext.Provider value={{ style: { paddingLeft: '1rem', color: !disableFilterBtn ? 'black':'#DDD', width: '20px', height: '20px' } }} >
                    <FaList />
                  </IconContext.Provider>
                </label>

                <div className="section-dropdown">
                  <a href="#" onClick={() => handleSortByRatingClick('low')}>Peor Rating <FaThumbsDown /></a>
                  <a href="#" onClick={() => handleSortByRatingClick('high')}>Mejor Rating <FaThumbsUp /></a>

                  <input className="dropdown-sub" type="checkbox" id="dropdown-sub" name="dropdown-sub" />
                  <label className="for-dropdown-sub" htmlFor="dropdown-sub">Orden Alfabético <FaSortDown /></label>
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

      <FilterModal ref={filtersRef} className="filterCard" id="favDialog">
        <form method="dialog">
          <section>

            <header>
              <span htmlFor="favAnimal">Filtrar por:</span>
              <span className='btnClose' onClick={closeFilters}>
                <FaTimes />
              </span>
            </header>

            <FilterSection className="filterSection" action="">
              <FilterItem>
                <label htmlFor="priceFilter">Precio menor a:</label>
                <input type="number" name="priceFilter" id="priceFilter" value={priceFilter} onChange={handlePriceFilterChange} />
              </FilterItem>

              <FilterItem>
                <label htmlFor="ratingFilter">Rating mayor a:</label>
                <input type="number" value={ratingFilter} ref={filterRatingInput} name="ratingFilter" id="ratingFilter" onChange={handleRatingFilterChange} />
              </FilterItem>
              <FilterItem>
                <button className='orderBtn' onClick={handleSortByRating}>  Ordenar por Rating ({sortOrder === 'asc' ? 'menor calificación' : 'mayor calificación'})</button>
              </FilterItem>
              <FilterItem>
                <button className='orderBtn' onClick={handlePriceSort}> Ordenar por Precio ({priceSortOrder === 'asc' ? 'menor a mayor' : 'mayor a menor'})</button>
              </FilterItem>

            </FilterSection>

          </section>
          <menu>
            <button id="cancel" type="reset" className="dialogBtn" onClick={closeFilters}>Cancelar</button>
            <button type="button" onClick={applyFilters}>Filtrar</button>
          </menu>
        </form>
      </FilterModal>

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

