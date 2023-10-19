import React from 'react'
import { IconContext } from "react-icons";

import {
    FaPen,
    FaTrash,
    FaStar,
    FaStarHalfAlt
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

export const DataTable = ({visible, ProductsData}) => {
    return (
        <>
            <Table style={{ display: visible === 'dataTable' ? '' : 'none'}}>
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

                            < Row >
                                <FirstCell style={{ height: '50px' }}>
                                    <img src={item.image} alt="product" width={80} />
                                </FirstCell>
                                <FirstCell>
                                    {item.name}
                                </FirstCell>
                                <Cell style={{ maxWidth: '400px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{item.description}</Cell>
                                <Cell>{item.price}</Cell>

                                <Cell key={index}>

                                    {item.rating}

                                    {function () {
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
                                    4
                                </Cell>
                                <LastCell>
                                    <ActionButtonCell>
                                        <button>
                                            <IconContext.Provider value={{ style: { color: 'gray', width: '20px', height: '20px' } }} >
                                                <FaPen />
                                            </IconContext.Provider>
                                        </button>
                                        <button>
                                            <IconContext.Provider value={{ style: { color: 'red', width: '20px', height: '20px' } }} >
                                                <FaTrash />
                                            </IconContext.Provider>
                                        </button>

                                    </ActionButtonCell>
                                </LastCell>
                            </Row>
                        ))}

                </Tbody>
            </Table>
        </>
    )
}
