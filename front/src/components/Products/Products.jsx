import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
//axios.defaults.baseURL = "https://pfcaromio-production.up.railway.app/"
import ReviewsStore from '../ReviewsStore/ReviewsStore';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { setProductsList } from '../../redux/actions';

import './Products.css'
import { useParams } from 'react-router-dom';
import {
  Container,
  CardsContainer,
  Title,
  Cards,
} from './ProductsStyles';

const Products = () => {
  const dispatch = useDispatch();
  const { storeId } = useParams();
  const productsFromState = useSelector((state) => state.products);
  const store = useSelector((state) => state.restaurantSelected);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([]);
    if (JSON.stringify(products) !== JSON.stringify(productsFromState)) {
      setProducts(productsFromState);
    }
    else {

      const rute = storeId
        ? `${BACKEND_URL}products/enabled/?storeid=${storeId}`
        : `${BACKEND_URL}products/enabled`

      axios
        .get(rute)
        .then((response) => {
          setProducts(response.data);
          dispatch(setProductsList(response.data));
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  }, [dispatch, storeId, productsFromState]);

  return (
    <Container>
      <CardsContainer>
        <Title>
          <h1>Lista de productos {store.name ? `de ${store.name}` : ''}</h1>
        </Title>
        <Cards id="cards">
          {products?.map((product) => {
            if (product.enabled) return (
              <ProductCard
                name={product.name}
                price={product.price}
                rating={product.rating}
                image={product.image}
                key={product._id}
                id={product._id}
              />)
          })}
        </Cards>
      </CardsContainer>
      <ReviewsStore />
    </Container>
  );

};

export default Products;
