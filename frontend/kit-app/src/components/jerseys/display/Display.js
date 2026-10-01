import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faChevronRight, faShirt } from '@fortawesome/free-solid-svg-icons';
import JerseyCard from '../../common/JerseyCard';
import Reveal from '../../common/Reveal';
import Footer from '../../common/Footer';
import { findClub, jerseysForClub } from '../../../data/catalog';
import './display.css';

const tabs = ['All', 'Home', 'Away'];

const Display = () => {
  const { club } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => setActiveTab('All'), [club]);

  const clubInfo = findClub(club);
  const jerseys = useMemo(() => jerseysForClub(club), [club]);
  const visible = activeTab === 'All' ? jerseys : jerseys.filter((j) => j.type === activeTab);
  const otherClubs = clubInfo ? clubInfo.league.clubs.filter((c) => c.club !== club) : [];
  const prices = jerseys.map((j) => j.price);

  if (!clubInfo && jerseys.length === 0) {
    return (
      <main className="ku-page">
        <div className="ku-empty">
          <span className="ku-empty-icon">
            <FontAwesomeIcon icon={faShirt} />
          </span>
          <h2>Club not found</h2>
          <p>We couldn't find any kits for “{club}”.</p>
          <Link to="/home" className="ku-btn ku-btn--dark">Browse all clubs</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="ku-page">
      <section className="ku-club-hero">
        <div className="ku-club-hero-bg">
          {clubInfo && <img src={clubInfo.Image} alt="" />}
        </div>
        <div className="ku-container ku-club-hero-inner">
          <nav className="ku-breadcrumb" aria-label="Breadcrumb">
            <Link to="/home">Home</Link>
            <FontAwesomeIcon icon={faChevronRight} />
            {clubInfo && (
              <>
                <Link to="/home" state={{ league: clubInfo.league.name }}>{clubInfo.league.name}</Link>
                <FontAwesomeIcon icon={faChevronRight} />
              </>
            )}
            <span>{club}</span>
          </nav>

          <div className="ku-club-hero-main">
            {clubInfo && (
              <div className="ku-club-hero-crest">
                <img src={clubInfo.Image} alt={`${club} crest`} />
              </div>
            )}
            <div>
              {clubInfo && (
                <span className="ku-chip ku-chip--light">
                  <img src={clubInfo.league.logo} alt="" /> {clubInfo.league.name}
                </span>
              )}
              <h1>{club}</h1>
              <p>
                {jerseys.length} {jerseys.length === 1 ? 'kit' : 'kits'} available
                {prices.length > 0 && <> · from ${Math.min(...prices)}</>}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="ku-container ku-club-kits">
        <div className="ku-club-toolbar">
          <button type="button" className="ku-back-link" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
          <div className="ku-tabs" role="tablist" aria-label="Kit type">
            {tabs.map((tab) => {
              const count = tab === 'All' ? jerseys.length : jerseys.filter((j) => j.type === tab).length;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={activeTab === tab ? 'is-active' : ''}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                  <span>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="ku-empty">
            <span className="ku-empty-icon">
              <FontAwesomeIcon icon={faShirt} />
            </span>
            <h2>No {activeTab.toLowerCase()} kits yet</h2>
            <p>Check back soon, or browse the other kits for this club.</p>
          </div>
        ) : (
          <div className="ku-kit-grid" key={activeTab}>
            {visible.map((jersey, i) => (
              <div
                key={`${jersey._id}-${jersey.type}`}
                className="ku-kit-grid-item"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <JerseyCard jersey={jersey} showClub={false} />
              </div>
            ))}
          </div>
        )}
      </section>

      {otherClubs.length > 0 && (
        <section className="ku-container ku-club-more">
          <Reveal className="ku-section-head">
            <div>
              <span className="ku-eyebrow">{clubInfo.league.name}</span>
              <h2 className="ku-section-title">More from the league</h2>
            </div>
          </Reveal>
          <div className="ku-club-strip">
            {otherClubs.map((other, i) => (
              <Reveal key={other.club} delay={i * 50}>
                <Link to={`/display/${other.club}`} className="ku-club-pill">
                  <img src={other.Image} alt="" />
                  <span>{other.club}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
};

export default Display;
