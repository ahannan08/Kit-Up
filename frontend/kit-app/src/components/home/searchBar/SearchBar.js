import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {

  const handleSearchClick = () => {
    console.log("Searching for:", searchTerm); // Add your search logic here if needed
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for clubs..."
        className="search-input"
      />
      
    </div>
  );
};

export default SearchBar;
