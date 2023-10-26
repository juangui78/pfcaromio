import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
//axios.defaults.baseURL = "https://pfcaromio-production.up.railway.app/"
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth, UserButton } from '@clerk/clerk-react';
import { Link, useLocation } from 'react-router-dom';
// import 'animate.css';

import './Navbar.css'
import CartBtn from '../CartBtn/CartBtn';
//import SearchBar from '../SearchBar/SearchBar';
import { orderByName, sortedByRating, filterByRating, setProductsList, onSearchData, getSuggestions } from '../../redux/actions';

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
  FaHome,

} from 'react-icons/fa';

import {
  NavBar,
  SuggestionItem,
  SuggestionsContainer,
  AlertContainer,
  FilterByBtn,
  FilterItem,
  OrderByBtn,
  FilterSection,
  FilterModal,
} from './NavBarStyles';

//import './Navbar.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Navbar = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();

  const { isSignedIn, userId } = useAuth()
  const [ratingFilter, setRatingFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const suggestions = useSelector((state) => state.suggestions);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const [currentStore, setCurrentStore] = useState({});
  const [products, setProducts] = useState([])

  const filtersRef = useRef(null);
  const filterRatingInput = useRef(null);
  const filterPriceInput = useRef(null);
  const searchInputRef = useRef(null);
  const searchSelectRef = useRef(null);

  const disableFilterBtn = location.pathname.startsWith('/products') || location.pathname.startsWith('/myRestaurant');

  const { userData } = props;

  const [sortOrder, setSortOrder] = useState('desc');
  const [priceSortOrder, setPriceSortOrder] = useState('asc');
  const [searchBy, setSearchBy] = useState('restaurante');
  const [search, setSearch] = useState('');

  const store = useSelector(state => state.restaurantSelected);

  useEffect(() => {
    if (store.id) {
      setCurrentStore(store)
    }
    else {
      setCurrentStore(JSON.parse(localStorage.getItem('restaurantSelected')));
    }

    axios.get(`${BACKEND_URL}products/?storeid=${currentStore?.id}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });

  }, [userId, store])

  const typeUser = userData?.[0]?.role
  
  const handleSortByNameClick = (order) => {
    dispatch(orderByName(order)); // Donde order es 'asc' o 'desc'
  };

  const handleSortByRatingClick = (order) => {
    dispatch(sortedByRating(order)); // Donde order es 'low' o 'high'
  };

  const handleLoginButton = () => {
    navigate('/login')
  }

  const handleRatingFilterChange = (event) => {
    const value = event.target.value;
    if (value === '' || value === null) {
      setRatingFilter('');
    } else {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Por favor, introduce un número válido.',
          position: 'top',
          toast: true,
          showConfirmButton: false,
          timer: 3000
        });
      } else if (parsedValue < 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El número no puede ser negativo.',
          position: 'top',
          toast: true,
          showConfirmButton: false,
          timer: 3000,
          customClass: {
            container: 'swal-overlay',
          },
        });
      } else if (parsedValue > 5) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El número no puede ser mayor a 5.',
          position: 'top',
          toast: true,
          showConfirmButton: false,
          timer: 3000,
          customClass: {
            container: 'swal-overlay',
          },
        });
      } else {
        setRatingFilter(parsedValue);
      }
    }
  };

  const handlePriceFilterChange = (event) => {
    const value = event.target.value;

    if (value === '' || value === null) {
      setPriceFilter('');
    } else {
      const parsedValue = parseFloat(value);

      if (isNaN(parsedValue) || parsedValue < 0) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El número no puede ser negativo.',
          position: 'top',
          toast: true,
          showConfirmButton: false,
          timer: 3000,
          customClass: {
            container: 'swal-overlay',
          },
        });
      } else {
        setPriceFilter(parsedValue);
      }
    }
  };

  const applyFilters = () => {
    //const { storeId } = useParams();
    const storeId = currentStore.id;
    let filteredProducts = axios
      .get(`${BACKEND_URL}products/filtered/?maxPrice=${priceFilter}&minRating=${ratingFilter}&storeid=${storeId}`)
      .then((response) => {
        setProducts(response.data);
        dispatch(setProductsList(response.data));
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });

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
    filtersRef.current.close();

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
    filtersRef.current.close();

  };

  const showFilters = () => {
    filtersRef.current.showModal()
  }
  const reset = () => {
    dispatch(onSearchData(false, null, null));
  }

  const closeFilters = () => {

    filterRatingInput.current = '';
    filterPriceInput.current = '';
    filtersRef.current.close();
  }

  const handleChange = (e) => {
    e.target.name === 'searchInput' && setSearch(e.target.value)
    e.target.name === 'searchBy' && setSearchBy(e.target.value)

  }
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(onSearchData(true, searchBy, search));
      setSearchBy('restaurante');
      setSearch('');
      setSearchPerformed(true);
    } else {
      Swal.fire({
        text: 'No hay parámetros de búsqueda, por favor escriba una palabra clave para buscar',
        confirmButtonColor: 'orange',
        showClass: {
          popup: 'animate__animated animate__fadeInDown animate__faster',
          backdrop: 'swal2-backdrop-show',
          icon: 'swal2-icon-show'
        }
      });
    }
  };
  
  
  const handleSearchInputChange = (e) => {
    const term = e.target.value;
    setSearch(term);
    dispatch(getSuggestions(term));
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.name);
    dispatch(onSearchData(true, searchBy, suggestion.name));
    setSearchBy('restaurante');
    setSearch('');
    setSearchPerformed(true);
  }
  return (
    <NavBar>
      <div className='nav'>
        <div className='nav-logo'>
          <Link to='/home' onClick={reset} >
            <img className="img-logo" src="/LogoPizzeria.png" alt="Logo" />
          </Link>
        </div>
        <Link to='/home' onClick={reset} className='homeBtn'>
          <IconContext.Provider value={{ style: { color:'gray', width: '20px', height: '20px' } }} >
            <FaHome />
          </IconContext.Provider>
        </Link>

        <div className='nav-input-search'>
        <form onSubmit={handleSearch}>
        <div className="search">
          <select
            ref={searchSelectRef}
            value={searchBy}
            name="searchBy"
            id="searchBy"
            onChange={handleChange}
          >
            <option value="restaurante">Buscar restaurante</option>
            <option value="pizza">Buscar pizza</option>
          </select>
          <input
            ref={searchInputRef}
            value={search}
            type="search"
            name="searchInput"
            id="searchInput"
            placeholder=""
            onChange={handleSearchInputChange}
          />
          <button type="submit" id="submitSearch" title="buscar">
            <FaSearch />
          </button>
        </div>
        {!searchPerformed && suggestions.length > 0 && (
            <SuggestionsContainer>
              <ul>
                {suggestions.map((suggestion) => (
                  <SuggestionItem
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                  </SuggestionItem>
                ))}
              </ul>
            </SuggestionsContainer>
          )}
      </form>
            

          <div className='filters'>
            <FilterByBtn onClick={showFilters} disabled={!disableFilterBtn}>
              <span>Filtrar por: </span>
              <IconContext.Provider value={{ style: { color: !disableFilterBtn ? '#DDD' : 'black', width: '20px', height: '20px' } }} >
                <FaSlidersH />
              </IconContext.Provider>
            </FilterByBtn>
            {
              typeUser !== "Seller"
                ? <div className='last' $typeuser={typeUser} >Último restaurante visto: {currentStore?.name}</div>
                : ''
            }
            <OrderByBtn disabled={!disableFilterBtn}>
              <div className="sec-center">
                <input className="dropdown" type="checkbox" id="dropdown" name="dropdown" disabled={disableFilterBtn} />
                <label className="for-dropdown" htmlFor="dropdown">Ordenar por:
                  <IconContext.Provider value={{ style: { paddingLeft: '1rem', color: !disableFilterBtn ? 'black' : '#DDD', width: '20px', height: '20px' } }} >
                    <FaList />
                  </IconContext.Provider>
                </label>

                <div className="section-dropdown">
                  <a href="#" onClick={() => handleSortByRatingClick('low')}>Mayor Rating <FaThumbsDown /></a>
                  <a href="#" onClick={() => handleSortByRatingClick('high')}>Menor Rating <FaThumbsUp /></a>

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
                <button title='Ingresar' type='button' className='nav-btn-user' onClick={() => handleLoginButton()}>
                  <FaUser /><span>Ingresar</span>
                </button>
              ) : <UserButton title='userBtn' type='button' className="userBtn" />
            }
          </div>
          {
            !isSignedIn
              ? <div className='line-div'></div>
              : null
          }

          <div className="buttonCreate">
            {
              !isSignedIn
                ? <Link to='/register' className='link'>Registrarme</Link> : null
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
                <input type="number" title='priceFilter' name="priceFilter" id="priceFilter" value={priceFilter} onChange={handlePriceFilterChange} />
              </FilterItem>

              <AlertContainer>
                <FilterItem>
                  <label htmlFor="ratingFilter">Rating mayor a:</label>
                  <input type="number" title='ratingFilter' value={ratingFilter} ref={filterRatingInput} name="ratingFilter" id="ratingFilter" onChange={handleRatingFilterChange} />
                </FilterItem>
              </AlertContainer>
              <FilterItem>
                <button  title='orderRatingBtn' type='button' className='orderBtn' onClick={handleSortByRating}>  Ordenar por Rating ({sortOrder === 'asc' ? 'menor calificación' : 'mayor calificación'})</button>
              </FilterItem>
              <FilterItem>
                <button  title='orderPriceBtn' type='button' className='orderBtn' onClick={handlePriceSort}> Ordenar por Precio ({priceSortOrder === 'asc' ? 'menor precio' : 'mayor precio'})</button>
              </FilterItem>

            </FilterSection>

          </section>
          <menu>
            <button  title='filterBtn' type="button" onClick={applyFilters} className='filterBtn'>Filtrar</button>
            <button  title='dialogBtn' id="cancel" type="reset" className="dialogBtn" onClick={closeFilters}>Cancelar</button>
          </menu>
        </form>
      </FilterModal>

    </NavBar>

  );
};

export default Navbar;

