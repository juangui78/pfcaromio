import React, { useState } from 'react';

import {
    Header,
    ButtonsSection,
    Container,
    DashboardContainer,

} from './DashboardSellerStyles';

import { DataTable } from './DataTable';
import CreateProduct from '../CreateProduct/CreateProduct';

import { ProductsData } from './data';

const DashboardSeller = (props) => {

    const { userData } = props;
    const [activeTab, setActiveTab] = useState('dataTable');

    return (
        <>
            <Container>
                <Header>
                    <b>Mi Dashboard</b>
                    <span>{userData[0].username}</span>
                    <ButtonsSection>
                        <button onClick={() => setActiveTab("dataTable")}>Mis Productos</button>
                        <button onClick={() => setActiveTab("misDatos")}>Mis Datos</button>
                        <button onClick={() => setActiveTab("createProduct")}>Crear Pizza</button>
                        {/* <LinkA to='/createProduct'>Crear Pizza</LinkA> */}

                    </ButtonsSection>
                </Header>

                <DashboardContainer>
                    <DataTable visible={activeTab} ProductsData={ProductsData} />
                    <CreateProduct visible={activeTab} userData={userData} />
                </DashboardContainer>

            </Container >
        </>
    )
}

export default DashboardSeller