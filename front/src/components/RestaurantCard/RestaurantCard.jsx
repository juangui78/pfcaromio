import { setRestaurant, onSearchData, getProducts } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    let navigate = useNavigate();

    const selectStore = () => {
        dispatch(onSearchData(false, null, null));
        dispatch(setRestaurant(restaurant));
        dispatch(getProducts(restaurant.id));
        navigate  (`/products/${restaurant.id}`)
        console.log(restaurant.id);
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
                    <LinkCard onClick={selectStore}> Productos</LinkCard>
                    <Score>⭐{restaurant.rating}</Score>
                </Details>
            </RestaurantItem>
        </CardContainer>
    )
}

export { RestaurantCard };
