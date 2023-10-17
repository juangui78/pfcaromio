import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ReviewsStore from '../ReviewsStore/ReviewsStore';
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
    if(productsFromState.length > 0)
    {
      setProducts(productsFromState)
    }
    else{
    axios
      .get(`http://localhost:3004/products/?storeid=${storeId}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
    }
    


   
  }, [dispatch, storeId, productsFromState]);

  const handleRatingFilterChange = (event) => {
    setRatingFilter(event.target.value);
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const applyFilters = async () => {
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
       {/*  <NavbarProducts
          ratingFilter={ratingFilter}
          onRatingFilterChange={handleRatingFilterChange}
          onPriceFilterChange={handlePriceFilterChange}
          onApplyFilters={applyFilters}
          onSortByRating={handleSortByRating}
        /> */}
        <Title>
          <h1>Lista de productos</h1></Title>
        
        
      {/*   <FilterContainer>
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
            Ordenar por Rating ({sortOrder === 'asc' ? 'menor calificación' : 'mayor calificación'})
          </FilterButton>
          <FilterButton onClick={handlePriceSort}>
            Ordenar por Precio ({priceSortOrder === 'asc' ? 'menor precio' : 'mayor precio'})
          </FilterButton>
        </FilterContainer> */}

    
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
      <ReviewsStore/>
    </div>
  );
};

export default Products;