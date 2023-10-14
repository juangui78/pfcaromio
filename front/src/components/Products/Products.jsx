import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getProducts, getProductsByStore, orderByRatingProducts, orderByPrice } from '../../redux/actions';
import { useParams } from 'react-router-dom';
import NavbarProducts from '../NavBar/NavbarProducts';
import {
  Container,
  Title,
  Cards,
  FilterContainer,
  FilterLabel,
  FilterInput,
  FilterButton,
} from './ProductsStyles';

const Products = () => {
  const dispatch = useDispatch();
  const { storeId } = useParams();
  const productsFromState = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);
  const [ratingFilter, setRatingFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [priceSortOrder, setPriceSortOrder] = useState('asc');

  useEffect(() => {
    axios
      .get(`http://localhost:3004/products/?storeid=${storeId}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
    dispatch(getProducts());
  }, [dispatch, storeId]);

  const handleRatingFilterChange = (event) => {
    setRatingFilter(event.target.value);
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const applyFilters = () => {
    
   let filteredProducts = axios
      .get(`http://localhost:3004/products/filtered/?maxPrice=${priceFilter}&minRating=${ratingFilter}&storeid=${storeId}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      }); ;
      // filteredProducts = filteredProducts.filter((product) => product.rating >= ratingFilter);
    // }
    // if (priceFilter) {
    //   filteredProducts = filteredProducts.filter((product) => product.price <= priceFilter);
    // };
  };

  const handlePriceSort = () => {
    const sortedProducts = [...products].sort((a, b) => {
      if (priceSortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
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
    setProducts(sortedProducts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      <Container>
        <NavbarProducts
          ratingFilter={ratingFilter}
          onRatingFilterChange={handleRatingFilterChange}
          onPriceFilterChange={handlePriceFilterChange}
          onApplyFilters={applyFilters}
          onSortByRating={handleSortByRating}
        />
        <Title>Lista de productos</Title>
        <FilterContainer>
          <div>
            <FilterLabel>Filtrar por Rating:</FilterLabel>
            <FilterInput type="number" value={ratingFilter} onChange={handleRatingFilterChange} placeholder='Mayor que...' />
          </div>
          <div>
            <FilterLabel>Filtrar por Precio:</FilterLabel>
            <FilterInput type="number" value={priceFilter} onChange={handlePriceFilterChange} placeholder='Menor que...'/>
          </div>
          <FilterButton onClick={applyFilters}>Aplicar filtros</FilterButton>
        </FilterContainer>
        <FilterContainer>
          <FilterButton onClick={handleSortByRating}>
            Ordenar por Rating ({sortOrder === 'asc' ? 'menor a mayor' : 'mayor a menor'})
          </FilterButton>
          <FilterButton onClick={handlePriceSort}>
            Ordenar por Precio ({priceSortOrder === 'asc' ? 'menor a mayor' : 'mayor a menor'})
          </FilterButton>
        </FilterContainer>
        <Cards id="cards">
          {products.map((product) => (
            <ProductCard
              name={product.name}
              price={product.price}
              rating={product.rating}
              image={product.image}
              key={product._id}
              id={product._id}
            />
          ))}
        </Cards>
      </Container>
    </div>
  );
};

export default Products;