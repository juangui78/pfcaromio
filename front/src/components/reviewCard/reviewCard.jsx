import React from 'react';
import style from "./rCard.module.css";


const rCard = (nombre, rating, comentario) => {
    
    // Se muestra nombre,calificacion y comentario
    return (

        <CardContainer >
            <ReviewItem>
                <Details>
                    <Name>{nombre}</Name>
                    <Rating>⭐{rating}</Rating>
                    <Comment>{{comentario}}</Comment>
                </Details>
            </ReviewItem>
        </CardContainer>


    )



}

export default rCard;
