import React, { useState } from 'react';
import './SearchBar.css'

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  

  const handleSearch = () => {
    
  };

  return (
    <div className='search-bar'>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar pizzas, restaurantes..."
      />
    <button onClick={handleSearch}>
        <img src="Lupa.png" alt="Buscar" className="lupa" />
    </button>

      {/* <ul>
        {searchResults.map((pizza) => (
          <li key={pizza.id}>{pizza.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default SearchBar;
