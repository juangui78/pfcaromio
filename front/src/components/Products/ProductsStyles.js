
import styled from 'styled-components';

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 40px;

  input {
    padding: 8px;
    color: black;
    border: 1px solid #ccc;
    border-radius: 0px;
    margin-left: 90px;
    font-size: 16px;
    outline: none;
    background-color: #EEE;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #aaa;
    }
  }

  button {
    margin-top: 0px;
    position: absolute;
    padding: 7px 21px;
    background-color: #ccc;
    border: none;
    border-radius: 0px;
    color: black;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #999;
    }
  }
  input[type='text'] {
    width: 300px;
    padding: 10px;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  button {
    padding: 7px 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #EEE;
    color: black;
  }
  
`;


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
   background-color: black;
    color: white;
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

export const SuggestionsContainer = styled.div`
  position: absolute;
  top: 275px;
  left: 90px;
  width: 27%;
  background: #fff;
  border: 1px solid #000;
  border-top: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin: 1px;
  padding: 3px;
  font-size: 16px;
  color: #333;
  text-align: left;
  transition: max-height 0.3s ease-in-out;
`;

export const SuggestionItem = styled.li`
  list-style-type: none;
  padding: 8px;
  margin-left: -30px;
  margin-right: 10px;
  margin-top: 10px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  display: flex; /* Usamos flexbox para que el elemento abarque todo el ancho */
  align-items: center; /* Centramos verticalmente el contenido */

  &:hover {
    background: #f0f0f0;
  }
`;

