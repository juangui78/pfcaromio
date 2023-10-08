//import axios from "axios";
import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

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
    Dialog,
    DialogIcon,
    DialogMessage,
    AceptButtonDialog
} from './RestaurantsStyles'

export default function Restaurants() {

    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();
    const restaurants = useSelector((state) => state.restaurants);
    const [message, setMessage] = useState("");
    const [modalType, setModalType] = useState();
    const dialogRef = useRef(null);

    const closeDialog = () => {
        setMessage(null);
        dialogRef.current.close();
    }

    useEffect(() => {

        const currentParams = Object.fromEntries([...searchParams]);

        if (currentParams.success) {
            dialogRef.current.showModal()
            setSearchParams();
            setMessage("El pago de su pedido fue exitoso!.");
            setModalType("success");
        }

        if (currentParams.cancel) {
            dialogRef.current.showModal()
            setSearchParams();
            setMessage("Pedido cancelado, continúe comparando precios y pagando cuando esté listo.");
            setModalType("cancel");
        }

        dispatch(getRestaurants());
    }, [dispatch, searchParams])

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

            <Dialog ref={dialogRef} className='success' >
                <header style={{ textAlign: 'center' }}>
                    <DialogIcon modalType={modalType}>
                        {
                            modalType === 'success'
                                ? (<FaCheckCircle />)
                                : (<FaTimesCircle />)

                        }
                    </DialogIcon>
                </header>
                <DialogMessage >
                    {message}
                </DialogMessage>
                <menu>
                    <AceptButtonDialog id="cancel" modalType={modalType} onClick={closeDialog}>Aceptar</AceptButtonDialog>
                </menu>
            </Dialog>

        </>
    )
}
