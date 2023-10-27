import React, { useState, useEffect, useRef } from 'react';
import { getRestaurants, getProducts, toggleStore, toggleProduct } from '../../redux/actions';
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

const DashboardAdmin = ({ userData, setUserData }) => {

    const dispatch = useDispatch();

    const products = useSelector((state) => state.products);
    const restaurants = useSelector((state) => state.restaurants);

    const [storesList, setStoresList] = useState([]);
    const [searchStore, setSearchStore] = useState('');
    const [searchProduct, setSearchProduct] = useState('');
    const [searchBy, setSearchBy] = useState('restaurante');

    const searchInputRef = useRef(null);

    const handleSearch = (event) => {
        searchBy === 'restaurante' && setSearchStore(event.target.value.toLowerCase())
        searchBy === 'producto' && setSearchProduct(event.target.value.toLowerCase())
    }

    const [activeTab, setActiveTab] = useState('storesList');

    useEffect(() => {
        activeTab === 'storesList' && dispatch(getRestaurants())
        if(activeTab === 'productsList') { 
            dispatch(getProducts()) 
        }
    }, [dispatch, activeTab])

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
                        searchBy === 'restaurante' && <StoresTable searchStore={searchStore} toggleStore={toggleStore} width='75%' />
                        ||
                        searchBy === 'producto' && <ProductsTable searchProduct={searchProduct} toggleProduct={toggleProduct} width='70%' />
                    }
                </DashboardContainer>
            </Container>

        </>
    )
}

export default DashboardAdmin