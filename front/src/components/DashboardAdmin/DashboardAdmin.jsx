import React, { useState, useEffect, useRef } from 'react';
import { getRestaurants, toggleStore } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth, UserButton } from '@clerk/clerk-react';

import {
    FaSearch,
} from 'react-icons/fa';

import {
    Header,
    ButtonsSection,
    Container,
    DashboardContainer,
    Search

} from './styles/adminStyles';

import {
    Nav
} from './styles/navBarStyles';

import ProductsTable from './ProductsTable';
import StoresTable from './StoresTable';
import FormProduct from '../FormProduct/FormProduct';

const DashboardSeller = ({ userData, setUserData }) => {

    const dispatch = useDispatch();
    
    const restaurants = useSelector((state) => state.restaurants);

    const [product, setProduct] = useState({});
    const [productsList, setProductsList] = useState([]);
    const [store, setStore] = useState({});
    const [storesList, setStoresList] = useState([]);
    const [searchStore, setSearchStore] = useState('');
    const [searchProduct, setSearchProduct] = useState('');
    const [searchBy, setSearchBy] = useState('restaurante');

    const searchInputRef = useRef(null);

    const setProductData = (item) => {
        setProduct({ ...item });
    }

    const handleChange = (e) => {

    }

    const handleSearch = (event) => {
        searchBy === 'restaurante' && setSearchStore(event.target.value.toLowerCase())
        //const found = productsList.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()));
       // setProductsList(found);
    }

    const [activeTab, setActiveTab] = useState('storesList');

    useEffect(() => {
        dispatch(getRestaurants())
    }, [dispatch])

    return (
        <>
        
            <Nav>
                <div className='nav'>
                    <div className='nav-logo'>
                        <img className="img-logo" src="/LogoPizzeria.png" alt="Logo" />
                        <div>Dashboard de administador</div>
                    </div>

                    <Search className='search'>
                        <span className='label-search'>Buscar {searchBy}:</span>
                        <input type="search" id="searchInput" onChange={handleSearch} />
                        <div><FaSearch /></div>
                    </Search>

                    <ButtonsSection>
                        <button onClick={() => { setActiveTab("storesList"); setSearchBy("restaurante") }}>Lista de restaurantes</button>
                        <button onClick={() => { setActiveTab("productsList"); setSearchBy("producto") }}>Lista Productos</button>
                        <UserButton title='userBtn' type='button' className="userBtn" />
                    </ButtonsSection>
                </div>
            </Nav>
           <Container>
            <DashboardContainer>
                {
                    searchBy === 'restaurante' && <StoresTable storesList={restaurants} searchStore ={searchStore} toggleStore={toggleStore} /> 
                    || 
                    searchBy === 'producto' && <ProductsTable  productsList={productsList} />
                }
            </DashboardContainer>
           </Container>

        </>
    )
}

export default DashboardSeller