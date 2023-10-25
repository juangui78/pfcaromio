import React, { useEffect, useState, useRef } from 'react';
import { IconContext } from "react-icons";
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

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

let prevProducts = null;


const ProductsTable = ({ toggleProduct, searchProduct }) => {

  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.products);
  const restaurants = useSelector((state) => state.restaurants);
  const [products, setProducts] = useState([])
  const [productsCopy, setProductsCopy] = useState([])
  let stores = [];

  const handleToggle = (productId) => {
    dispatch(toggleProduct(productId));
    const updatedProducts = products.map(product => {
      if (product._id === productId) {
        return {
          ...product,
          enabled: !product.enabled
        }
      }
      return product;
    });
    const updatedCopy = productsCopy.map(product => {
      if (product._id === productId) {
        return {
          ...product,
          enabled: !product.enabled
        }
      }
      return product;
    });

    setProducts(updatedProducts);
    setProductsCopy(updatedCopy);
  }

  useEffect(() => {

    if (searchProduct && (searchProduct !== prevProducts)) {
      prevProducts = searchProduct;
      const found = productsCopy.filter(item => item.name.toLowerCase().includes(searchProduct.toLowerCase()));
      setProducts(found);
    }
    else if (!searchProduct && prevProducts) {
      setProducts(productsCopy)
    }
    else {
      setProducts(productsList)
      setProductsCopy(productsList)

      productsList.map((p) => {
        let storeFound = restaurants.find(({ _id }) => _id === p.store)
        let storeIndex = stores.findIndex(s => s.storeId === p.store)
        p.storeName = storeFound?.name;

        if (storeIndex === -1) {
          stores.push({
            storeId: p.store, name: storeFound?.name
          })
        }

      })
    }
    console.log(stores);
  }, [productsList, searchProduct])


  return (
    <TableContainer>
      <Table width={'90%'}>
        <caption>Productos {searchProduct}</caption>
        <Thead>
          <Hrow>
            <Th className='name'>Producto</Th>
            <Th className='store'>Restuarante</Th>
            <Th className='address'>Descripción</Th>
            <Th className='rating-th'>Rating</Th>
            <Th className='products text-center'>Precio</Th>
            <Th className='state'>Estado</Th>
            <Th className='toggle'></Th>
          </Hrow>
        </Thead>
        <Tbody>

          {
            products.map((product) => (
              <Row key={Math.random()}>
                <Td className='logo-name'>
                  <Logo>
                    <img src={product.image} alt={product.image} />
                  </Logo>
                  <Name>{product.name}</Name>
                </Td>
                <Td>{ product.storeName }</Td>
                <Td><div className='description'>{ product.description }</div></Td>
                <Td>{product.rating}</Td>
                <Td className='text-center'>USD {product.price}</Td>
                <Td>
                  {product.enabled ? 'Activo' : 'Inactivo'}
                </Td>
                <Td>
                  <ButtonToggle onClick={() => { handleToggle(product._id) }}>
                    {product.enabled ?
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
  )
}

export default ProductsTable