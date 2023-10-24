import React, { useState, useEffect, useRef } from 'react';
import { getStoreByUser } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

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
import UsersTable from './UsersTable';
import FormProduct from '../FormProduct/FormProduct';

const DashboardSeller = ({ userData, setUserData }) => {

    const dispatch = useDispatch();

    const [product, setProduct] = useState({});
    const [productsList, setProductsList] = useState([]);
    const [search, setSearch] = useState('');
    const [searchBy, setSearchBy] = useState('usuario');

    const searchInputRef = useRef(null);

    const setProductData = (item) => {
        setProduct({ ...item });
    }

    const handleChange = (e) => {

    }

    const handleSearch = (event) => {
        const found = currentStore.products.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()));
        setProductsList(found);
    }

    const [activeTab, setActiveTab] = useState('userstList');

    useEffect(() => {

    }, [])

    return (
        <>
        
            <Nav>
                <div className='nav'>
                    <div className='nav-logo'>
                        <img className="img-logo" src="/LogoPizzeria.png" alt="Logo" />
                        <div>Dassboard de administador</div>
                    </div>

                    <Search className='search'>
                        <span className='label-search'>Buscar {searchBy}:</span>
                        <input type="search" id="searchInput" onChange={handleSearch} />
                        <div><FaSearch /></div>
                    </Search>

                    <ButtonsSection>
                        <button onClick={() => { setActiveTab("userstList"); setSearchBy("usuario") }}>Lista de usuarios</button>
                        <button onClick={() => { setActiveTab("productsList"); setSearchBy("producto") }}>Lista Productos</button>
                        <button >user</button>
                    </ButtonsSection>
                </div>
            </Nav>
           <Container>
            <DashboardContainer>
                {
                    searchBy === 'usuario' && <UsersTable usersList={[]} /> 
                    || 
                    searchBy === 'producto' && <ProductsTable  productsList={[]} />
                }
            </DashboardContainer>
           </Container>

        </>
    )
}

export default DashboardSeller