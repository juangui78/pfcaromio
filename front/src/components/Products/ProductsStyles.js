import styled from 'styled-components';

export const Container = styled.div`
  
`;
export const CardsContainer = styled.div`

    @media (max-width: 800px) {
        padding: 1rem 0 10rem; /* Ajusta este valor según sea necesario */
    }

`;

export const Title = styled.header`
    display: flex;
    justify-content: center;
   // background-color: black;
    color: #333;
    margin-top: -19px;
    margin-bottom: 20px;
    height: 200px;
    align-items: flex-end;
    h1{
      font-size: 24pt;
    }
    
`;

export const Cards = styled.div`
    padding: 1rem 4rem 0rem 4rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap:1rem;
`;
export const FilterContainer = styled.div`
  margin-left: 30px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const SortButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: auto; /* Mueve estos botones a la derecha */
`;

export const FilterLabel = styled.label`
  font-weight: bold;
  margin-right: 5px;
  color: rgb(0, 0, 0);
  font-family: 'Secular One', sans-serif;
`;

export const FilterInput = styled.input`
  padding: 5px;
  font-family: 'Secular One', sans-serif;
  margin-right: 10px; /* Añade un espacio entre el input y el próximo elemento */
`;

export const FilterButton = styled.button`
  padding: 5px 10px;
  background-color: #ffc000;
  border: none;
  cursor: pointer;
  font-weight: bold;
  border: 2px solid black;

  &:hover {
    background-color: #f4d881;
  }

  margin-right: 20px; /* Añade un espacio entre los botones */
`;

export const SortLabel = styled.label`
  font-weight: bold;
  margin-right: 5px;
  font-family: 'Secular One', sans-serif;
`;

export const SortSelect = styled.select`
  padding: 5px;
  font-family: 'Secular One', sans-serif;
  margin-right: 10px;
`;

export const SortButton = styled.button`
  padding: 5px 10px;
  background-color: #ffc000;
  border: none;
  cursor: pointer;
  font-weight: bold;
  border: 2px solid black;

  &:hover {
    background-color: #b98c02;
  }
`;





