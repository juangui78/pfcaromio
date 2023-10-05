//import axios from "axios";
import React, { useEffect, useState } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getProductsByStore } from '../../redux/actions';
import { useParams } from "react-router-dom";

import {
    Container,
    Title,
    Cards,
} from './ProductsStyles'

export default function Products() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const products = useSelector((state) => state.products);

    useEffect(() => {
        if(id) dispatch(getProductsByStore(id));
        else dispatch(getProducts());
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
                                key={product._id}
                                id={product.id}>
                            </ProductCard>
                        ))
                    }
                </Cards>
            </Container>
        </>
    )
}


