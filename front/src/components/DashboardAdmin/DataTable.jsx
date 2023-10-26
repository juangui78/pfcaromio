import React, { useEffect } from 'react'
import { IconContext } from "react-icons";
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { deleteProduct } from '../../redux/actions';

import {
    FaPen,
    FaTrash,
    FaStar,
    FaStarHalfAlt,
} from 'react-icons/fa';

import {

    Table,
    Head,
    Tbody,
    Row,
    Cell,
    FirstCell,
    LastCell,
    ActionButtonCell,
    RowHead,
    TableHead,
    LastHead,
    HeadImg,

} from './styles/adminStyles';

export const DataTable = ({ visible, productsData, setProductData, setActiveTab, setProductsList }) => {

    const dispatch = useDispatch();

    const setProduct = (item) => {
        setProductData(item);
        setActiveTab("editProduct");
    }

    const updateList = async  (store) => {
        await axios.get(`http://localhost:3004/stores/getstore-id/${store}`)
            .then(({data} ) => { 
                if (data) {
                    setProductsList(data.products)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const deleteItem = (id, name, store) => {
        
        Swal.fire({
            title: 'Está seguro?',
            text: `Se eliminará de la base de datos el producto ${name}!`,

            showCancelButton: true,
            confirmButtonColor: '#808080',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar!',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp animate__faster'
            },
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProduct(id))
                    .then(() => {
                        updateList(store)
                        Swal.fire(
                            'Eliminado!',
                            'El producto fue eliminado con éxito.',
                            'success'
                        )
                    }
                    ).catch((error) => {
                        console.log(error)
                    })
            }
        })
    }

    const getRandomInt = () => {
        return Math.floor(Math.random() * 10000);
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
                        productsData.map((item, index) => (

                            <Row key={getRandomInt()} >
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
                                                stars.push(<i style={{ color: 'orange' }} key={getRandomInt()} ><FaStar /></i>)
                                            }

                                            for (let i = 0; i < res; i++) {
                                                stars.push(<i style={{ color: 'orange' }} key={getRandomInt()} ><FaStarHalfAlt /></i>)
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
                                        <button onClick={() => deleteItem(item._id, item.name, item.store)}>
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
