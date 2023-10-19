import { setRestaurant } from "../../redux/actions";
import { useDispatch } from "react-redux";
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

function RestaurantCard(props) {
    const restaurant = props;
    const dispatch = useDispatch();
    
    const selectStore = () => {
        dispatch(setRestaurant(restaurant));
    }

    return (

        <CardContainer >
            <RestaurantItem>
                <ImgContainer>
                    <Img src={restaurant.image} alt="" />
                </ImgContainer>
                <Details>
                    <Name>{restaurant.name}</Name>
                    <Address>{restaurant.address}</Address>
                    <LinkCard to= {`/products/${restaurant.id}`} onClick={selectStore}> Productos</LinkCard>
                    <Score>⭐{restaurant.rating}</Score>
                </Details>
            </RestaurantItem>
        </CardContainer>
    )
}

export { RestaurantCard };
