import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/clubs.css';

// Import club data
import { bundesliga, laliga, ligue1, pl, seria } from '../data/clubs.js';

// Import league logos
import plLogo from '../assets/leagueLogos/pl.jpg';
import seriaLogo from '../assets/leagueLogos/SERIA.png';
import ligue1Logo from '../assets/leagueLogos/ligue1.jpg';
import laligaLogo from '../assets/leagueLogos/laliga.png';
import bundesligaLogo from '../assets/leagueLogos/bundus.jpg';

const Club = () => {
  const navigate = useNavigate();

  const handleLogoClick = (club) => {
    navigate(`/display/${club}`);
  };

  return (
    <div className="logos">
      <div className="league-section">
        <div className="title">
          <img src={plLogo} alt="Premier League" className="league-logo small" />
          Premier League
        </div>
        <div className="clubs-row">
          {pl.map((logo) => (
            <div className="info" key={logo.club} onClick={() => handleLogoClick(logo.club)}>
              <div className="logo-img">
                <img src={logo.Image} alt={logo.club} />
              </div>
              <div className="club-name">{logo.club}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="league-section">
        <div className="title">
          <img src={seriaLogo} alt="Seria A" className="league-logo small" />
          Seria A
        </div>
        <div className="clubs-row">
          {seria.map((logo) => (
            <div className="info" key={logo.club} onClick={() => handleLogoClick(logo.club)}>
              <div className="logo-img">
                <img src={logo.Image} alt={logo.club} />
              </div>
              <div className="club-name">{logo.club}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="league-section">
        <div className="title">
          <img src={ligue1Logo} alt="Ligue 1" className="league-logo small" />
          Ligue 1
        </div>
        <div className="clubs-row">
          {ligue1.map((logo) => (
            <div className="info" key={logo.club} onClick={() => handleLogoClick(logo.club)}>
              <div className="logo-img">
                <img src={logo.Image} alt={logo.club} />
              </div>
              <div className="club-name">{logo.club}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="league-section">
        <div className="title">
          <img src={laligaLogo} alt="La Liga" className="league-logo small" />
          La Liga
        </div>
        <div className="clubs-row">
          {laliga.map((logo) => (
            <div className="info" key={logo.club} onClick={() => handleLogoClick(logo.club)}>
              <div className="logo-img">
                <img src={logo.Image} alt={logo.club} />
              </div>
              <div className="club-name">{logo.club}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="league-section">
        <div className="title">
          <img src={bundesligaLogo} alt="Bundesliga" className="league-logo small" />
          Bundesliga
        </div>
        <div className="clubs-row">
          {bundesliga.map((logo) => (
            <div className="info" key={logo.club} onClick={() => handleLogoClick(logo.club)}>
              <div className="logo-img">
                <img src={logo.Image} alt={logo.club} />
              </div>
              <div className="club-name">{logo.club}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Club;
