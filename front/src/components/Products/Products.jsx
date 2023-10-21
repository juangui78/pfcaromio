import React, { useEffect, useState } from 'react';
import './Products.css'
import ProductCard from '../ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ReviewsStore from '../ReviewsStore/ReviewsStore';
import {
  setProductsList
} from '../../redux/actions';

import { useParams } from 'react-router-dom';
import {
  Container,
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
 

/*   useEffect(() => {
    // Limpiar los productos al cambiar de pizzería
    setProducts([]);
  
      // Fetch de los nuevos productos
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
    
  }, [dispatch, storeId, productsFromState]);
 */
  return (
    <div>
      <Container>
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
      </Container>
      <ReviewsStore />
    </div>
  );
};

export default Products;
