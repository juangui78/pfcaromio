//import axios from "axios";
import React, { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions';

import {
    Container,
    Title,
    Cards,
} from './ProductsStyles'

export default function Products() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    return (
        <>
            <Container>
                <Title>
                    Lista de productos
                </Title>
                <Cards id="cards">
                    {
                        products?.map((product) => (
                            <ProductCard
                                name={product.name}
                                price={product.price}
                                rating={product.rating}
                                image={product.image}
                                key={product.id}
                                id={product.id}>
                            </ProductCard>
                        ))
                    }
                </Cards>
            </Container>
        </>
    )
}


