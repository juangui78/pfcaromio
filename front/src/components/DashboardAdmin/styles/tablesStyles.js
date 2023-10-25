import styled from 'styled-components';

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Table = styled.table`
  box-sizing: border-box;
  width:  ${(props) => props.width};
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
export const Tbody = styled.tbody``;

export const Hrow = styled.tr` 
  th.name{
    width: 20%;
  }
  th.address{
    width: ${(props) => props.width === '75%' ? '25%' : '40%' };
  }
  th.rating-th{
    width: ${(props) => props.width === '75%' ? '10%' : '5%' };
  }
  th.state{
    width: ${(props) => props.width === '75%' ? '10%' : '5%' };
  }
  th.products{
    width: ${(props) => props.width === '75%' ? '20%' : '10%' };
  }
  th.toogle{
    width: ${(props) => props.width === '75%' ? '10%' : '5%' };
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

  td {
    div.description{
      max-width: 550px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:after {
        content: "...";
      }
    }
    }
`;

export const Th = styled.th`
  padding: 0.7rem 1rem;
`;

export const Td = styled.td`
  padding: 1rem;
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
  width: 4rem;
  height: 4rem;
  min-width: 4rem;
  min-height: 4rem;
  img{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius:50%;
    object-fit: cover;
  }
`;
export const Name = styled.span``;
