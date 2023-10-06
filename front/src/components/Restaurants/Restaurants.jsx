//import axios from "axios";
import React, { useEffect } from 'react';
import { RestaurantCard } from '../RestaurantCard/RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurants } from '../../redux/actions';
import CardDescuento from '../CardDescuento/CardDescuento';
import ShoppingCard from '../ShoppingCard/ShoppingCard';

import {
    Container,
    Title,
    Cards,
    Descuentos,
} from './RestaurantsStyles'

export default function Restaurants() {
    const dispatch = useDispatch();
    const restaurants = useSelector((state) => state.restaurants);

    useEffect(() => {
        dispatch(getRestaurants());
    }, [dispatch])

    return (
        <>
            <Container>
                <ShoppingCard />
                
                <Descuentos>
                    <CardDescuento />
                </Descuentos>

                <Title>
                    Restaurantes
                </Title>
                <Cards id="cards">
                    {
                        restaurants?.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant._id}
                                id={restaurant._id}
                                image={restaurant.imageSrc}
                                name={restaurant.name}
                                address={restaurant.address}
                                rating={restaurant.rating}>
                            </RestaurantCard>
                        ))
                    }
                </Cards>
            </Container>
        </>
    )
}
