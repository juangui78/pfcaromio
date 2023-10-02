import {
    CardContainer,
    Img,
    Score,
    Name,
    Details,
    RestaurantItem,
    ImgContainer,
    LinkCard,
    Address,

} from "./RestaurantCardStyles";

function RestaurantCard({ name, address, rating, image, id }) {

    return (

        <CardContainer >
            <RestaurantItem>
                <ImgContainer>
                    <Img src={image} alt="" />
                </ImgContainer>
                <Details>
                    <Name>{name}</Name>
                    <Address>{address}</Address>
                    <LinkCard to= "/products">Productos</LinkCard>
                    <Score>⭐{rating}</Score>
                </Details>
            </RestaurantItem>
        </CardContainer>
    )
}

export { RestaurantCard };
