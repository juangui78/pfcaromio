import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from './styles/adminStyles';
import { IconContext } from "react-icons";
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';

const getRandomKey = () => {
  return Math.floor(Math.random());
}
const users = [
  {
    name: 'Will',
    _id: 1,
    role: 'Seller',
    activo:1
  },
  {
    name: 'Juan',
    _id: 2,
    role: 'Seller',
    activo:1
  },
  {
    name: 'Julian',
    _id: 3,
    role: 'Buyer',
    activo:0
  }
]
const UsersTable = () => {
  const [toggled, setToggled] = useState(false);

  const handleToggle = (userId) => {

    setToggled(prevToggled => !prevToggled);
  }

  return (
    <>
      <TableContainer>
        <Table>
          <caption>Usuarios</caption>
          <Thead>
            <Hrow>
              <Th className='name'>Usuario</Th>
              <Th className='role'>Rol</Th>
              <Th className='state'>Estado</Th>
              <Th className='toggle'></Th>
            </Hrow>
          </Thead>
          <Tbody>
            {
              users.map((user) => (
                <Row key={Math.floor(Math.random())}>
                  <Td>{user.name}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    {user.activo ? 'Activo' : 'Inactivo'}
                    {/* {toggled ? 'Activo' : 'Inactivo'} */}
                  </Td>
                  <Td>
                    <ButtonToggle onClick={() => { handleToggle(user._id) }}>
                      {/* toggled ?  */user.activo ?
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

export default UsersTable

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  box-sizing: border-box;
  width: 75%;
  color:gray;
  text-align: left;
  font-size: 0.9rem;
  border-collapse: collapse;
  border: 1px solid orange;
  caption{
    font-size: 1rem;
    font-weight: bold;
    padding: 0.5rem;
  }

`;

const Thead = styled.thead`
  background-color: orange;
  color:white;
`;
const Tbody = styled.tbody`

`;

const Hrow = styled.tr` 
  th.name{
    width: 50%;
  }
  th.role{
    width: 30%;
  }
  th.state{
    width: 10%;
  }
  th.toogle{
    width: 10%;
  }

`;

const Row = styled.tr` 
  &:hover{
    background-color: #EEE ;
  }
`;

const Th = styled.th`
  padding: 0.7rem 1rem;
`;

const Td = styled.td`
  padding: 0.25rem 1rem;
`;
const ButtonToggle = styled.button`
  background-color: transparent;
  color: gray;
  font-weight: normal;
  display: flex;
  padding: 0.5rem 0rem;
`;

