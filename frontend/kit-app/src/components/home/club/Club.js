import React from 'react';
import { useNavigate } from 'react-router-dom';
import './clubs.css';
import { bundesliga, laliga, ligue1, pl, seria } from '../../../data/clubs.js';

// Import league logos
import plLogo from '../../../assets/leagueLogos/pl.jpg';
import seriaLogo from '../../../assets/leagueLogos/SERIA.png';
import ligue1Logo from '../../../assets/leagueLogos/ligue1.jpg';
import laligaLogo from '../../../assets/leagueLogos/laliga.png';
import bundesligaLogo from '../../../assets/leagueLogos/bundus.jpg';

const Club = ({ searchTerm = '' }) => { // Set a default empty string for searchTerm
  const navigate = useNavigate();

  const handleLogoClick = (club) => {
    navigate(`/display/${club}`);
  };

  // Add safety checks in filterClubs function
  const filterClubs = (clubs) => {
    return clubs.filter(logo => 
      logo.club && // Ensure logo.club is defined
      logo.club.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const leagues = [
    { name: "Premier League", logo: plLogo, clubs: pl },
    { name: "Seria A", logo: seriaLogo, clubs: seria },
    { name: "Ligue 1", logo: ligue1Logo, clubs: ligue1 },
    { name: "La Liga", logo: laligaLogo, clubs: laliga },
    { name: "Bundesliga", logo: bundesligaLogo, clubs: bundesliga },
  ];

  return (
    <div className="logos">
      {leagues.map((league) => {
        const filteredClubs = filterClubs(league.clubs);
        if (filteredClubs.length === 0) return null; // Do not render the league if there are no matching clubs

        return (
          <div
            key={league.name} // Add a key to each league section for efficient React rendering
            className={`league-section ${league.name.toLowerCase().replace(" ", "-")}`}
          >
            <div className="title">
              <img src={league.logo} alt={`${league.name} logo`} className="league-logo" />
              <span className="title-text">{league.name.toUpperCase()}</span>
            </div>
            <div className="clubs-row">
              {filteredClubs.map((logo) => (
                <div
                  className="info"
                  key={logo.club} // Use logo.club as the key for each club
                  onClick={() => handleLogoClick(logo.club)}
                >
                  <div className="logo-img">
                    <img src={logo.Image} alt={`${logo.club} logo`} />
                  </div>
                  <div className="club-name">{logo.club}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Club;
