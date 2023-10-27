import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import {
    FaSearch,
} from 'react-icons/fa';

import {
    Header,
    ButtonsSection,
    Container,
    DashboardContainer,
    Search

} from './DashboardSellerStyles';

import { DataTable } from './DataTable';
import FormProduct from '../FormProduct/FormProduct';

const DashboardSeller = ({ userData, setUserData }) => {

    const dispatch = useDispatch();

    const [productsList, setProductsList] = useState([]);
    const [currentStore, setCurrentStore] = useState([]);

    const [product, setProduct] = useState({});

    const setProductData = (item) => {
        setProduct({ ...item });
    }
    console.log('productos: ' + BACKEND_URL);
    const handleSearch = (event) => {
        const found = currentStore.products.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()));
        setProductsList(found);
    }

    const [activeTab, setActiveTab] = useState('dataTable');
    console.log(userData.userIdentifier);
    useEffect(() => {

        userData && axios.get(`${BACKEND_URL}stores/getstore/${userData.userIdentifier}`)
            .then(({ data }) => {
                if (data) {
                    setCurrentStore(data)
                    setProductsList(data.products)
                }
            })
            .catch((error) => {
                console.log('falló en traer productos y user:' + error)
            })
    }, [userData])

    return (
        <>
            <Container>
                <Header>
                    <b>Mi Dashboard</b>
                    <span>{userData.username}</span>
                    <ButtonsSection>
                        <Search className='search'>
                            <input type="search" id="searchInput" onChange={handleSearch} />
                            <div><FaSearch /></div>
                        </Search>
                        <button onClick={() => setActiveTab("dataTable")}>Mis Productos</button>
                        <button onClick={() => setActiveTab("createProduct")}>Crear Pizza</button>
                    </ButtonsSection>
                </Header>

                <DashboardContainer>
                    <DataTable visible={activeTab} setActiveTab={setActiveTab} productsData={productsList} setProductData={setProductData} setProductsList={setProductsList} />
                    <FormProduct visible={activeTab} userData={userData} product={product} setActiveTab={setActiveTab} setUserData={setUserData} />
                </DashboardContainer>

            </Container >
        </>
    )
}

export default DashboardSeller