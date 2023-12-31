import React, { useEffect, useState, useRef } from 'react';
import { IconContext } from "react-icons";
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Hrow,
  Th,
  Td,
  Row,
  Logo,
  Name,
  ButtonToggle
} from './styles/tablesStyles';
import axios from 'axios';

let prevStores = null;

const StoresTable = ({ toggleStore, searchStore }) => {
  const dispatch = useDispatch();

  const restaurants = useSelector((state) => state.restaurants);
  const [stores, setStores] = useState([])
  const [storesCopy, setStoresCopy] = useState([])

  const handleToggle = (storeId) => {
    dispatch(toggleStore(storeId));
    const updatedStores = stores.map(store => {
      if (store._id === storeId) {
        return {
          ...store,
          enabled: !store.enabled
        }
      }
      return store;
    });
    const updatedCopy = storesCopy.map(store => {
      if (store._id === storeId) {
        return {
          ...store,
          enabled: !store.enabled
        }
      }
      return store;
    });

    setStores(updatedStores);
    setStoresCopy(updatedCopy);
  }

  const handleToggleUsers = (userIdentifier) => {
    axios.put(`http://localhost:3004/users/toggle/${userIdentifier}`)
      .then(() => console.log('toggle user realizado'))
      .catch(err => console.log('toggle no realizado' + err))
  }

  useEffect(() => {

    if (searchStore && (searchStore !== prevStores)) {
      prevStores = searchStore;
      const found = storesCopy.filter(item => item.name.toLowerCase().includes(searchStore.toLowerCase()));
      setStores(found);
    }
    else if (!searchStore && prevStores) {
      setStores(storesCopy)
    }
    else {
      setStores(restaurants)
      setStoresCopy(restaurants)
    }
  }, [restaurants, searchStore])

  return (
    <>
      <TableContainer>
        <Table width={'75%'}>
          <caption>Restaurantes </caption>
          <Thead>
            <Hrow>
              <Th className='name'>Restaurante</Th>
              <Th className='address'>Direccion</Th>
              <Th className='rating-th'>Rating</Th>
              <Th className='products text-center'>Productos publicados</Th>
              <Th className='state'>Estado</Th>
              <Th className='toggle'></Th>
            </Hrow>
          </Thead>
          <Tbody>
            {
              stores.map((store) => (
                <Row key={Math.random()}>
                  <Td className='logo-name'>
                    <Logo>
                      <img src={store.image} alt={store.image} />
                    </Logo>
                    <Name>{store.name}</Name>
                  </Td>
                  <Td>{store.address}</Td>
                  <Td>{store.rating}</Td>
                  <Td className='text-center'>{store.products.length}</Td>
                  <Td>
                    {store.enabled ? 'Activo' : 'Inactivo'}
                  </Td>
                  <Td>
                    <ButtonToggle onClick={() => { handleToggle(store._id) 
                      handleToggleUsers(store.userIdentifier)}}>
                      {store.enabled ?
                        <IconContext.Provider value={{ style: { color: 'green', width: '32px', height: '24px', strokeWidth: '1' } }} >
                          <FaToggleOn />
                        </IconContext.Provider>
                        :
                        <IconContext.Provider value={{ style: { color: 'gray', width: '32px', height: '24px', strokeWidth: '1' } }} >
                          <FaToggleOff />
                        </IconContext.Provider>
                      }
                    </ButtonToggle>
                  </Td>
                </Row>
              ))
            }

          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default StoresTable

