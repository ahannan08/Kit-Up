// FilterComponent.js
import React from 'react';

const FilterComponent = ({ filters, setFilters, applyFilters, closePanel }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="filter-panel">
      <button onClick={closePanel} className="close-button">X</button>
      <h2>Filter Results</h2>
      <div>
        <label>
          Type:
          <select name="type" value={filters.type} onChange={handleFilterChange}>
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
            name="rating"
            value={filters.rating}
            min="0"
            onChange={handleFilterChange}
          />
        </label>
      </div>
      <div>
        <label>
          Min Price:
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
        </label>
      </div>
      <div>
        <label>
          Max Price:
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </label>
      </div>
      <button onClick={applyFilters}>Search</button>
    </div>
  );
};

export default FilterComponent;
