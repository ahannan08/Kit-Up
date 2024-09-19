import React, { useState } from 'react';
import Club from './club/Club';
import SearchBar from './searchBar/SearchBar'; 

import FilterComponent from './filter/FilterComponent'; // Import the FilterComponent

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ type: '', rating: 0, minPrice: 0, maxPrice: 1000 });

  // Function to handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterComponent onFilterChange={handleFilterChange} /> {/* Add the FilterComponent */}
      <Club searchTerm={searchTerm} filters={filters} /> {/* Pass filters to the Club component */}
    </div>
  );
};

export default Home;
