// FilterComponent.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const FilterComponent = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('');
  const [rating, setRating] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const applyFilters = () => {
    const filters = { type, rating, minPrice, maxPrice };
    navigate('/results', { state: { filters } }); // Navigate to ResultsPage
    setIsOpen(false); // Close the filter modal after applying
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Filters</button>

      {isOpen && (
        <div className="filter-modal">
          <h2>Filter Results</h2>
          <div>
            <label>
              Type:
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">All</option>
                <option value="Home">Home</option>
                <option value="Away">Away</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Rating:
              <input
                type="number"
                value={rating}
                min="0"
                onChange={(e) => setRating(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Min Price:
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Max Price:
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </label>
          </div>
          <button onClick={applyFilters}>Search</button>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
