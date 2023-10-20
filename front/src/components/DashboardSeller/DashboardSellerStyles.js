import styled from 'styled-components';
import { Link } from "react-router-dom";

export const Container = styled.div`
    padding: 2rem;
    height: 100vh;

`;

export const LinkA = styled(Link)`
    background-color: #1a1a1a;
    border-radius: 8px;
    color:white;
    border: 1px solid transparent;
    padding: 0.4rem 1rem;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
    &:hover{
            color: orange
        }
`;

export const Header = styled.header`
    position: sticky;
    top: 8rem;
    background-color: var(--orange);
    color: black;
    padding: 1rem;
    padding-left:2rem;
    padding-right:2rem;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    z-index:2;
`;

export const ButtonsSection = styled.section`
    display: flex;
    gap: 1rem;
    button{
        padding: 0.6rem 1rem;
        &:hover{
            color: orange
        }
    }
`;

export const Search = styled.div`
    border: 0px dashed orange;
    border-radius: 8px;
    background-color: #EEE;
    justify-content: center;
    flex-wrap: nowrap;
    display: flex;
    
    input {
        flex-grow: 1;
        background-color: transparent;
        border: 0;
        padding-left: 1rem;
        padding-right: 1rem;
        color:black;
        font-size: 1rem;
        outline: none;
        color: gray;
    }
    div{
        background-color: transparent;
        border: 0px solid black;
        border-radius: 0px 8px 8px 0px; 
        color: #CCC;
        display: flex;
        align-items: center;
        padding-right: 10px;
    }
`;

export const ProductsTable = styled.section`
    position:relative; 
    top:6.5rem; 
    z-index:1;
    background-color: white;
    padding: 1rem;
`;

export const DashboardContainer = styled.section`
    position:relative; 
    top:6.5rem; 
    z-index:1;
    background-color: white;
    padding: 1rem;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse:collapse;
`;

export const RowHead = styled.tr`

`;

export const TableHead = styled.thead`
    background-color: #ffeba7;  
    color: black;
    text-transform: uppercase;
    text-align: left;
    padding: 0.5rem;
`;

export const FirstHead = styled.th`
    padding: 0.5rem;
    padding-left: 1rem;
    width: 50%;
`;

export const LastHead = styled.th`
    padding: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: end;
`;

export const Head = styled.th`
    padding: 1.3rem;
    padding-left: 1rem;
`;

export const RowGroup = styled.tr`

`;

export const Tbody = styled.tbody`

`;

export const Row = styled.tr`
    &:hover{
        background-color: #EEE;
    }
    border-bottom: 4px solid #EEE;
`;
export const Cell = styled.td`
    color:gray;
    padding: 0.5rem;
    padding-left: 1rem;
`;

export const FirstCell = styled.td`
    padding: 0.3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    color: gray;
`;

export const HeadImg = styled.th`
    padding: 0.3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    color: gray;
    width: 5%;
`;

export const LastCell = styled.td`
    padding: 0.3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: end;
    color: gray;
    width: 10%;
`;

export const ActionButtonCell = styled.div`
        display: flex;
        justify-content: end;  
        button{
            background-color: transparent;
            color:black;
            border: none;
        }      
`;

export const ActionButton = styled.button`
    background-color: transparent;
    color:black;
`;
