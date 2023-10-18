import { useDispatch } from 'react-redux';
import { useAuth } from '@clerk/clerk-react';
import { useParams } from 'react-router-dom';
import { useState, useEffect  } from 'react';
import axios from 'axios';
import {
    CardContainer,
    Img,
    Score,
    Name,
    Details,
    Price,
    ProductItem,
    ImgContainer,
    LinkCard,
    Editar

} from "../ProductCard/ProductCardStyles";

import { openProductDetails } from '../../redux/actions/';

function MyProductCard({ name, price, rating, image, id}) {
    
    const {userId} = useAuth();
    const dispatch = useDispatch();
   
    return (
        
        <CardContainer >
            <ProductItem>
                <Price>${price}</Price>
                <ImgContainer>
                    <Img src={image} alt="" />
                </ImgContainer>
                <Details>
                    <Name>{name}</Name>
                    <LinkCard onClick={() => dispatch(openProductDetails(id))}>Editar Producto</LinkCard>
                    <Score>⭐{rating}</Score>
                </Details>
            </ProductItem>
        </CardContainer>
    )
}

export default MyProductCard;
