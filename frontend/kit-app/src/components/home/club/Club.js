import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Reveal from '../../common/Reveal';
import { leagues, jerseysForClub } from '../../../data/catalog';
import './clubs.css';

const Club = ({ searchTerm = '', activeLeague = 'All', setActiveLeague, hideTabs = false }) => {
  const navigate = useNavigate();
  const term = searchTerm.trim().toLowerCase();

  const visibleLeagues = leagues
    .filter((league) => activeLeague === 'All' || league.name === activeLeague)
    .map((league) => ({
      ...league,
      clubs: league.clubs.filter((c) => c.club && c.club.toLowerCase().includes(term)),
    }))
    .filter((league) => league.clubs.length > 0);

  return (
    <div className="ku-container">
      {!hideTabs && (
        <div className="ku-league-tabs" role="tablist" aria-label="Leagues">
          {[{ name: 'All' }, ...leagues].map((league) => (
            <button
              key={league.name}
              type="button"
              role="tab"
              aria-selected={activeLeague === league.name}
              className={`ku-league-tab ${activeLeague === league.name ? 'is-active' : ''}`}
              onClick={() => setActiveLeague(league.name)}
            >
              {league.logo && <img src={league.logo} alt="" />}
              {league.name === 'All' ? 'All leagues' : league.name}
            </button>
          ))}
        </div>
      )}

      {visibleLeagues.length === 0 && (
        <div className="ku-empty">
          <span className="ku-empty-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          <h2>No clubs found</h2>
          <p>Try a different name, like “Madrid” or “United”.</p>
        </div>
      )}

      {visibleLeagues.map((league) => (
        <section key={`${activeLeague}-${league.name}`} className="ku-league">
          <Reveal className="ku-league-head">
            <span className="ku-league-logo">
              <img src={league.logo} alt={`${league.name} logo`} />
            </span>
            <div>
              <h3>{league.name}</h3>
              <span>
                {league.country} · {league.clubs.length} clubs
              </span>
            </div>
          </Reveal>

          <div className="ku-club-grid">
            {league.clubs.map((club, i) => {
              const kits = jerseysForClub(club.club).length;
              return (
                <Reveal key={club.club} delay={(i % 6) * 60}>
                  <button
                    type="button"
                    className="ku-club-card"
                    onClick={() => navigate(`/display/${club.club}`)}
                  >
                    <span className="ku-club-crest">
                      <img src={club.Image} alt={`${club.club} crest`} loading="lazy" />
                    </span>
                    <span className="ku-club-text">
                      <span className="ku-club-name">{club.club}</span>
                      <span className="ku-club-meta">
                        {kits} {kits === 1 ? 'kit' : 'kits'}
                        <FontAwesomeIcon icon={faArrowRight} className="ku-club-arrow" />
                      </span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Club;
