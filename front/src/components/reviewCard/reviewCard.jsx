import React from 'react';
import style from "./rCard.module.css";


const ReviewCard = (nombre, calificacion, comentario) => {
    
    // Se muestra nombre,calificacion y comentario
    return (

        <CardContainer >
            <ReviewItem>
                <Details>
                    <Name>{nombre}</Name>
                    <Rating>⭐{calificacion}</Rating>
                    <Comment>{comentario}</Comment>
                </Details>
            </ReviewItem>
        </CardContainer>


    )



}

export default ReviewCard;
