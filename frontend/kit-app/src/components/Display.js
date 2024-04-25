// JerseyDisplay.js

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { home_jer, away_jer } from "../data/jerseys"; // Import jersey data
import "../styles/display.css"


const Display = () => {
  const { club } = useParams();
  const navigate = useNavigate();

  // Filter jerseys based on the selected club
  const filteredHomeJerseys = home_jer.filter(jersey => jersey.club === club);
  const filteredAwayJerseys = away_jer.filter(jersey => jersey.club === club);

  // Function to handle jersey click
  const handleJerseyClick = (jersey) => {
    navigate('/jersey-details', { state: { jersey } });
  };

  return (
    <div className="jerseys">
      <div className="jerseys-section">
        <h2>Home Jerseys</h2>
        {filteredHomeJerseys.map((jersey, index) => (
          <div className="jersey-item" key={index} onClick={() => handleJerseyClick(jersey)}>
            <img src={jersey.Image} alt={jersey.club} />
          </div>
        ))}
      </div>
      <div className="jerseys-section">
        <h2>Away Jerseys</h2>
        {filteredAwayJerseys.map((jersey, index) => (
          <div className="jersey-item" key={index} onClick={() => handleJerseyClick(jersey)}>
            <img src={jersey.Image} alt={jersey.club} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
