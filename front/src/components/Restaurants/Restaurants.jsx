//import axios from "axios";
import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { SignIn, useAuth } from '@clerk/clerk-react';
import emailjs from '@emailjs/browser';
import axios from 'axios';
//axios.defaults.baseURL = "https://pfcaromio-production.up.railway.app/"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
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
    AceptButtonDialog,
    NoFound,
    ButtonBack
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

        let table = '<table style="border:1px solid #EEE; border-collapse:collapse; text-align:left; width:500px"><tr><thead>';
        table += '<th style="background-color:#EEE; border:0px solid black; padding-left:10px; padding-right:10px; width:50%">Item</th>'
        table += '<th style="background-color:#EEE; border:0px solid black; padding-left:10px; padding-right:10px">Cantidad</th>'
        table += '<th style="background-color:#EEE; border:0px solid black; padding-left:10px; padding-right:10px">Precio</th>';
        table += '<th style="background-color:#EEE; border:0px solid black; padding-left:10px; padding-right:10px">Subtotal</th></tr></thead><tbody>';
        cartDetails.items.forEach(item => {
            table += `
            <tr>
              <td style="border:0px solid black; padding-left:10px; padding-right:10px">${item.name}</td> 
              <td style="border:0px solid black; padding-left:10px; padding-right:10px">${item.quantity}</td> 
              <td style="border:0px solid black; padding-left:10px; padding-right:10px">${item.price}</td>
              <td style="border:0px solid black; padding-left:10px; padding-right:10px">${item.price * item.quantity}</td>
            </tr>
          `;
        });
        table += `<tr> 
                <th style="background-color:#EEE; border:0px solid black; padding-left:10px; padding-right:10px"" colspan=3>Total:</th>
                <td style="background-color:#EEE; border:0px solid black; padding-left:10px; padding-right:10px""> ${cartDetails.total}</td>
            </tr><tbody>`;
        table += '</table>';

        const userName = userData ? userData.username : 'Apreciado cliente';
        const emailParams = {
            from_name: "Caro Mio Pizza",
            to_name: userName,
            message: "Te estamos enviando los detalles de la compra que realizaste.",

            message_html: table

        }
        console.log(emailParams);
        emailjs.send(emailKeys.EMAILJS_SERVICE_ID, emailKeys.EMAILJS_TEMPLATE_ID, emailParams, emailKeys.EMAILJS_PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }

    const handleLoadAll = () => {
        dispatch(getRestaurants())
    }
    useEffect(() => {

        const currentParams = Object.fromEntries([...searchParams]);

        axios.get(`${BACKEND_URL}users/${userId}`)
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
            <Container>

                <ShoppingCard />

                <Title>
                    Restaurantes
                </Title>
                {
                    restaurants.length === 0 &&
                    <NoFound>
                        <p>
                            No se encontraron restuarantes con la palabra clave.
                        </p>
                        <p>
                            <ButtonBack onClick={handleLoadAll}>Volver</ButtonBack>
                        </p>
                    </NoFound>
                }
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
