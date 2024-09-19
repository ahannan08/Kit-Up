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

const Club = ({ searchTerm }) => {
  const navigate = useNavigate();

  const handleLogoClick = (club) => {
    navigate(`/display/${club}`);
  };

  const filterClubs = (clubs) => {
    return clubs.filter(logo => logo.club.toLowerCase().includes(searchTerm.toLowerCase()));
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
          <div className="league-section" key={league.name}>
            <div className="title">
              <img src={league.logo} alt={league.name} className="league-logo small" />
              {league.name}
            </div>
            <div className="clubs-row">
              {filteredClubs.map((logo) => (
                <div className="info" key={logo.club} onClick={() => handleLogoClick(logo.club)}>
                  <div className="logo-img">
                    <img src={logo.Image} alt={logo.club} />
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
