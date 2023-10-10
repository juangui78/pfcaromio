//import axios from "axios";
import React, { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getProducts, getProductsByStore } from '../../redux/actions';
import { useParams } from "react-router-dom";
import NavbarProducts from '../NavBar/NavbarProducts';
import {
    Container,
    Title,
    Cards,
} from './ProductsStyles'

export default function Products() {
    const dispatch = useDispatch();
    const { storeId } = useParams();
    
    // const products = useSelector((state) => state.products);

    // useEffect(() => {
    //     //if(id) dispatch(getProductsByStore(id));
    //    // else dispatch(getProducts());
    //     dispatch(getProducts());
    // }, [dispatch])

    useEffect(() => {
        
        axios.get(`http://localhost:3004/products/?storeid=${storeId}`)
            .then((products) => {
                setProducts(products.data)
            })

        dispatch(getProducts());
    }, [])  

    const [products, setProducts] = useState([])

    return (
        <div>                
            <Container>      
              <NavbarProducts/>
                <Title>
                    Lista de productos
                </Title>
                <Cards id="cards">
                    {
                        products?.map((product) => (
                            <ProductCard
                                name={product.name}
                                price={product.price}
                                rating={product.rating }
                                image={product.image}
                                key={product._id}
                                id={product._id}>
                            </ProductCard>
                        ))
                    }
                </Cards>
            </Container>
        </div>
    )
}


