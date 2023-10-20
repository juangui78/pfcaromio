import React from 'react'
import { IconContext } from "react-icons";
import Swal from 'sweetalert2';

import {
    FaPen,
    FaTrash,
    FaStar,
    FaStarHalfAlt,
} from 'react-icons/fa';

import {
    Header,
    ButtonsSection,
    Container,
    ProductsTable,
    Table,
    Head,
    Tbody,
    Row,
    Cell,
    FirstCell,
    LastCell,
    ActionButton, ActionButtonCell, RowGroup,
    RowHead,
    TableHead,
    FirstHead,
    LastHead,
    HeadImg,
    LinkA

} from './DashboardSellerStyles';

export const DataTable = ({ visible, ProductsData, setProductData, setActiveTab }) => {

    const setProduct = (item) => {
        setProductData(item);
        setActiveTab("editProduct");
    }

    const deleteItem = (id, name) => {
        Swal.fire({
            title: 'Está seguro?',
            text: `Se eliminará de la base de datos el producto ${name}!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#808080',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar!',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    'El producto fue eliminado con éxito.',
                    'success'
                )
            }
        })
    }
    return (
        <>

            <Table style={{ display: visible === 'dataTable' ? '' : 'none' }}>
                <TableHead>
                    <RowHead>
                        <HeadImg></HeadImg>
                        <Head>Producto</Head>
                        <Head >Descripción</Head>
                        <Head>Precio</Head>
                        <Head>Rating</Head>
                        <Head>Stock</Head>
                        <LastHead></LastHead>
                    </RowHead>
                </TableHead>

                <Tbody>
                    {
                        ProductsData.map((item, index) => (

                            <Row key={index + item.id} >
                                <FirstCell style={{ height: '50px' }}>
                                    <img src={item.image} alt="product" width={80} />
                                </FirstCell>
                                <FirstCell>
                                    {item.name}
                                </FirstCell>
                                <Cell style={{ maxWidth: '400px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{item.description}</Cell>
                                <Cell>{item.price}</Cell>

                                <Cell>

                                    {item.rating}

                                    {
                                        function () {
                                            let oper = Number.parseInt(item.rating)
                                            let res = item.rating % oper;
                                            let stars = [];
                                            for (let i = 0; i < oper; i++) {
                                                stars.push(<i style={{ color: 'orange' }}><FaStar /></i>)
                                            }

                                            for (let i = 0; i < res; i++) {
                                                stars.push(<i style={{ color: 'orange' }}><FaStarHalfAlt /></i>)
                                            }
                                            return stars
                                        }()
                                    }

                                </Cell>
                                <Cell>
                                    {item.stock}
                                </Cell>
                                <LastCell>
                                    <ActionButtonCell>
                                        <button onClick={() => setProduct(item)}>
                                            <IconContext.Provider value={{ style: { color: 'gray', width: '20px', height: '20px' } }} >
                                                <FaPen />
                                            </IconContext.Provider>
                                        </button>
                                        <button onClick={() => deleteItem(item.id, item.name)}>
                                            <IconContext.Provider value={{ style: { color: 'red', width: '20px', height: '20px' } }} >
                                                <FaTrash />
                                            </IconContext.Provider>
                                        </button>

                                    </ActionButtonCell>
                                </LastCell>
                            </Row>
                        ))
                    }

                </Tbody>
            </Table>
        </>
    )
}
