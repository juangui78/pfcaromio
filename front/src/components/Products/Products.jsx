import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import ReviewsStore from '../ReviewsStore/ReviewsStore';

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
  const [products, setProducts] = useState([]);


  useEffect(() => {
    setProducts([]);
    if (JSON.stringify(products) !== JSON.stringify(productsFromState)) {
      setProducts(productsFromState);
    }
    else {

      const rute = storeId
        ? `http://localhost:3004/products/?storeid=${storeId}`
        : `http://localhost:3004/products`;

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
          <h1>Lista de productos</h1>
        </Title>
        <Cards id="cards">
          {products?.map((product) => (
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
      </CardsContainer>
      <ReviewsStore />
    </Container>
  );
};

export default Products;
