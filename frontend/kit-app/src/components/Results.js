// ResultsPage.js

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCatalog } from '../context/CatalogContext';

import "./results.css"
const ResultsPage = () => {
  const { state } = useLocation();
  const { filters } = state || {};
  const navigate = useNavigate();
  const { allJerseys } = useCatalog();

  // Filter jerseys based on the provided filters
  const filteredJerseys = (allJerseys || []).filter(jersey => {
    if (!filters) return true;
    const matchesType = filters.type ? jersey.type === filters.type : true;
    const matchesRating = jersey.rating >= filters.rating;
    const matchesPrice = jersey.price >= filters.minPrice && jersey.price <= filters.maxPrice;

    return matchesType && matchesRating && matchesPrice;
  });

  // Function to handle jersey click
  const handleJerseyClick = (jersey) => {
    navigate('/jersey-details', { state: { jersey } }); // Pass the jersey object in state
  };

  return (
    <div>
      <h2>Filtered Results</h2>
      <div className="jerseys">
        {filteredJerseys.map((jersey, index) => (
          <div className="jersey-item" key={index} onClick={() => handleJerseyClick(jersey)}>
            <img src={jersey.Image} alt={jersey.club} />
            <h3>{jersey.club}</h3>
            <p>Type: {jersey.type}</p>
            <p>Rating: {jersey.rating}</p>
            <p>Price: ${jersey.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
