import React, { useEffect, useState, useRef } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// axios.defaults.baseURL = "https://pfcaromio-production.up.railway.app/"
import ReviewsStore from '../ReviewsStore/ReviewsStore';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { setProductsList } from '../../redux/actions';
import { BsX } from 'react-icons/bs'; // Importa el ícono "X"
import './Products.css';
import { useParams } from 'react-router-dom';
import {
  Container,
  CardsContainer,
  Title,
  Cards,
  SearchBarContainer,
  SuggestionsContainer,
  SuggestionItem,
} from './ProductsStyles';

const Products = () => {
  const topRef = useRef(null);
  const dispatch = useDispatch();
  const { storeId } = useParams();
  const productsFromState = useSelector((state) => state.products);
  const store = useSelector((state) => state.restaurantSelected);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  useEffect(() => {
    setProducts([]);
    if (JSON.stringify(products) !== JSON.stringify(productsFromState)) {
      setProducts(productsFromState);
    } else {
      const route = storeId
        ? `${BACKEND_URL}products/enabled/?storeid=${storeId}`
        : `${BACKEND_URL}products/enabled`;
      axios
        .get(route)
        .then((response) => {
          setProducts(response.data);
          dispatch(setProductsList(response.data));
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  }, [dispatch, storeId, productsFromState]);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSearchInputChange = (e) => {
    const term = e.target.value;
    setSearch(term);
    setSelectedSuggestion(null);
  
    const filteredSuggestions = productsFromState.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSuggestions(filteredSuggestions.slice(0, 5));
  
    if (!term) {
      setSuggestions([]);
      setProducts(productsFromState);
    }
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };
  
  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion.name);
    setSelectedSuggestion(suggestion);
    setSuggestions([]);
    setProducts([suggestion]);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (search) {
      const filteredProducts = productsFromState.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(filteredProducts);
      setSuggestions([]);
    } else {
      setProducts(productsFromState);
    }
  };
  
  const handleClearSearch = () => {
    setSearch('');
    setSelectedSuggestion(null);
    setProducts(productsFromState);
    setSuggestions([]);
  };
  return (
    <Container ref={topRef}>
      <CardsContainer>
        <Title>
          <h1>Lista de productos {store.name ? `de ${store.name}` : ''}</h1>
        </Title>
        <SearchBarContainer>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={search}
              onChange={handleSearchInputChange}
              onKeyDown={handleSearchInputChange}
            />
            {search && (
              <ClearSearchButton onClick={handleClearSearch}>
                <ClearSearchIcon />
              </ClearSearchButton>
            )}
            <button type="submit">Buscar</button>
          </form>
          {suggestions.length > 0 && search && (
            <SuggestionsContainer>
              <ul>
                {suggestions.map((suggestion) => (
                  <SuggestionItem
                    key={suggestion._id}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                  </SuggestionItem>
                ))}
              </ul>
            </SuggestionsContainer>
          )}
        </SearchBarContainer>
        <Cards id="cards">
          {products?.map((product) => {
            if (product.enabled) {
              return (
                <ProductCard
                  name={product.name}
                  price={product.price}
                  rating={product.rating}
                  image={product.image}
                  key={product._id}
                  id={product._id}
                />
              );
            }
            return null;
          })}
        </Cards>
      </CardsContainer>
      <ReviewsStore />
    </Container>
  );
};
const ClearSearchButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 250px;
  left: 353px;
  transform: translateY(-50%);
`;

const ClearSearchIcon = styled(BsX)`
  color: black;
  font-size: 20px;
  background-color: transparent;
  border: none;

  &:hover {
    color: #333;
  }
`;
export default Products;
