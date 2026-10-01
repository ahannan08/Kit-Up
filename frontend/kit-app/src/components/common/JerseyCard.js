import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Stars from './Stars';
import './common.css';

const JerseyCard = ({ jersey, showClub = true }) => {
  const navigate = useNavigate();

  const openDetails = () => navigate('/jersey-details', { state: { jersey } });

  return (
    <article
      className="ku-jersey-card"
      onClick={openDetails}
      onKeyDown={(e) => e.key === 'Enter' && openDetails()}
      role="button"
      tabIndex={0}
    >
      <div className="ku-jersey-media">
        <span className={`ku-jersey-badge ku-jersey-badge--${jersey.type.toLowerCase()}`}>
          {jersey.type}
        </span>
        <img src={jersey.Image} alt={`${jersey.club} ${jersey.type} jersey`} loading="lazy" />
        <span className="ku-jersey-cta">
          View kit <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </div>
      <div className="ku-jersey-body">
        {showClub && <h3 className="ku-jersey-club">{jersey.club}</h3>}
        <p className="ku-jersey-type">{jersey.type} Jersey</p>
        <div className="ku-jersey-meta">
          <Stars rating={jersey.rating} />
          <span className="ku-jersey-price">${jersey.price}</span>
        </div>
      </div>
    </article>
  );
};

export default JerseyCard;
