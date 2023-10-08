import { useDispatch } from 'react-redux';

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

} from "./ProductCardStyles";

import { openProductDetails } from '../../redux/actions';

function ProductCard({ name, price, rating, image, id, storeId }) {

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
                    <LinkCard onClick={() => dispatch(openProductDetails(id))}>Ver mas</LinkCard>
                    <Score>⭐{rating}</Score>
                </Details>
            </ProductItem>
        </CardContainer>
    )
}

export { ProductCard };
