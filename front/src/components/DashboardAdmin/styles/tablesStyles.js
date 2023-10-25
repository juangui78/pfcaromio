import styled from 'styled-components';

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Table = styled.table`
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

export const Thead = styled.thead`
  background-color: orange;
  color:white;
`;
export const Tbody = styled.tbody`

`;

export const Hrow = styled.tr` 
  th.name{
    width: 25%;
  }
  th.address{
    width: 25%;
  }
  th.rating{
    width: 10%;
  }
  th.state{
    width: 10%;
  }
  th.products{
    width: 20%;
  }
  th.toogle{
    width: 10%;
  }
  th.text-center{
    text-align: center;
  }
`;

export const Row = styled.tr` 
  &:hover{
    background-color: #EEE ;
  }
  td.logo-name{
    display: flex;
    align-items: center;
    gap:1rem;
  }
  td.text-center{
    text-align: center;
  }
`;

export const Th = styled.th`
  padding: 0.7rem 1rem;
`;

export const Td = styled.td`
  padding: 0.25rem 1rem;
`;
export const ButtonToggle = styled.button`
  background-color: transparent;
  color: gray;
  font-weight: normal;
  display: flex;
  padding: 0.5rem 0rem;
`;

export const Logo = styled.div`
  border: 1px solid orange;
  border-radius:50%;
  width: 3rem;
  height: 3rem;
  img{
    max-width: 100%;
    max-height: 100%;
    box-sizing: border-box;
    border-radius:50%;
  }
`;
export const Name = styled.span``;
