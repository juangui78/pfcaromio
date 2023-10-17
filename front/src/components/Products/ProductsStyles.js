import styled from 'styled-components';

export const Container = styled.div`
    
    flex-wrap: nowrap;
    flex-direction: column;
    
    width: 100%;
    @media (max-width: 800px) {
        padding: 4rem 0rem 0rem 0rem;
    } 
`;

export const Title = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 100%;
    color:var(--red);
    margin-bottom: 50px;
    height: 200px;
    align-items: flex-end;
    h1{
      font-size: 24pt;
    }
    
`;

export const Cards = styled.div`
    padding: 1rem 4rem 0rem 4rem;
    display: grid;
    grid-template-columns: 
        repeat(
            auto-fit,
            minmax(260px, 260px)
        );
    gap:2rem;
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





