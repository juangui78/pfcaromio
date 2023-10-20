import React, { useState } from 'react';

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

import { ProductsData } from './data';

const DashboardSeller = (props) => {

    const [productsList, setProductsList] = useState(ProductsData);
    const [product, setProduct] = useState({});

    const setProductData = (item) => {
        setProduct(item);
        console.log(item);
    }

    const handleSearch = (event) => {
        const found = ProductsData.filter(item => item.name.toLowerCase().includes(event.target.value.toLowerCase()));
        setProductsList(found);
    }

    const { userData } = props;
    const [activeTab, setActiveTab] = useState('dataTable');

    return (
        <>
            <Container>
                <Header>
                    <b>Mi Dashboard</b>
                    <span>{userData[0].username}</span>
                    <ButtonsSection>
                        <Search className='search'>
                            <input type="search" id="searchInput" onChange={handleSearch} />
                            <div><FaSearch /></div>
                        </Search>
                        <button onClick={() => setActiveTab("dataTable")}>Mis Productos</button>
                        <button onClick={() => setActiveTab("misDatos")}>Mis Datos</button>
                        <button onClick={() => setActiveTab("createProduct")}>Crear Pizza</button>
                        {/* <LinkA to='/createProduct'>Crear Pizza</LinkA> */}

                    </ButtonsSection>
                </Header>

                <DashboardContainer>
                    <DataTable visible={activeTab} setActiveTab={setActiveTab} ProductsData={productsList} setProductData={setProductData} />
                    <FormProduct visible={activeTab} userData={userData} product={product} />
                </DashboardContainer>

            </Container >
        </>
    )
}

export default DashboardSeller