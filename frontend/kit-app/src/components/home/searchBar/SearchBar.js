import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <label className="ku-search">
    <FontAwesomeIcon icon={faMagnifyingGlass} className="ku-search-icon" />
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search clubs..."
      className="ku-search-input"
      aria-label="Search clubs"
    />
    {searchTerm && (
      <button
        type="button"
        className="ku-search-clear"
        onClick={() => setSearchTerm('')}
        aria-label="Clear search"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    )}
  </label>
);

export default SearchBar;
