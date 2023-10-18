//import axios from "axios";
import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { SignIn, useAuth } from '@clerk/clerk-react';
import emailjs from '@emailjs/browser';
import axios from 'axios';

import { getRestaurants, getEmailKeys, clearCart } from '../../redux/actions';

import { RestaurantCard } from '../RestaurantCard/RestaurantCard';
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
    const { isSignedIn, userId } = useAuth()


    const cartDetails = JSON.parse(localStorage.getItem('cartDetails'));
    const emailKeys = JSON.parse(localStorage.getItem('emailKeys'));
    const paymentData = JSON.parse(localStorage.getItem('paymentData'));

    const [userData, setUserData] = useState(null);
    const [message, setMessage] = useState("");
    const [modalType, setModalType] = useState();
    const [keys, setKeys] = useState(emailKeys);
    const dialogRef = useRef(null);

    const closeDialog = () => {
        setMessage(null);
        dialogRef.current.close();
    }

    const sendPaymentEmail = (e) => {
       
        const userName = userData ? userData.username : 'Apreciado cliente';
        const emailParams = {
            from_name: "Caro Mio Pizza",
            to_name: userName,
            message: "Te estamos enviando los detalles de la compra que realizaste.",
            datails: cartDetails,

        }
        emailjs.send(emailKeys.EMAILJS_SERVICE_ID, emailKeys.EMAILJS_TEMPLATE_ID, emailParams, emailKeys.EMAILJS_PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    useEffect(() => {

        const currentParams = Object.fromEntries([...searchParams]);

        axios.get(`http://localhost:3004/users/${userId}`)
            .then((data) => {
                data && setUserData(data.data)
            })
            .catch((error) => {
                console.log(error)
            });

        if (currentParams.success) {
            dialogRef.current.showModal()
            setSearchParams();
            setMessage("El pago de su pedido fue exitoso!.");
            setModalType("success");
            sendPaymentEmail(true)
            dispatch(clearCart())
        }

        if (currentParams.cancel) {
            dialogRef.current.showModal()
            setSearchParams();
            setMessage("Pedido cancelado, continúe comparando precios y pagando cuando esté listo.");
            setModalType("cancel");
        }

        dispatch(getRestaurants());
        dispatch(getEmailKeys());
    
    }, [dispatch, searchParams])

    return (
        <>
            <Container>|
          
                <ShoppingCard />

               {/*  <Descuentos $isSignedIn={isSignedIn} >
                    <CardDescuento />
                </Descuentos> */}

                <Title>
                    Restaurantes
                </Title>
                <Cards id="cards">
                    {
                        restaurants?.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant._id}
                                id={restaurant._id}
                                image={restaurant.image}
                                name={restaurant.name}
                                address={restaurant.address}
                                rating={restaurant.rating}
                                storeId={restaurant.userIdentifier}>
                            </RestaurantCard>
                        ))
                    }
                </Cards>

            </Container>

            <Dialog ref={dialogRef} className='success' >
                <header style={{ textAlign: 'center' }}>
                    <DialogIcon $modaltype={modalType}>
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
                    <AceptButtonDialog id="cancel" $modaltype={modalType} onClick={closeDialog}>Aceptar</AceptButtonDialog>
                </menu>
            </Dialog>

        </>
    )
}
