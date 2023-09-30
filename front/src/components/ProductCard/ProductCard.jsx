
import {
    CardContainer,
    Img,
    Score,
    Name,
    Details,
    Price,
    RowBottom,
    ProductItem,
    ImgContainer,
    LinkCard,

} from "./ProductCardStyles";


function ProductCard({ name, price, rating, image, id }) {
    return (

        <CardContainer >
            <ProductItem>
                <Price>{price}</Price>
                <ImgContainer>
                    <Img src={image} alt="" />
                </ImgContainer>
                <Details>
                    <Name>{name}</Name>
                    <LinkCard>Ver mas</LinkCard>
                    <Score>⭐{rating}</Score>
                </Details>
            </ProductItem>
        </CardContainer>
    )
}

export { ProductCard };
