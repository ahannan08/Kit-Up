import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Stars = ({ rating = 0, max = 5, showValue = false }) => (
  <span className="ku-stars" aria-label={`Rated ${rating} out of ${max}`}>
    {Array.from({ length: max }, (_, i) => (
      <FontAwesomeIcon key={i} icon={faStar} className={i < Math.round(rating) ? 'is-on' : ''} />
    ))}
    {showValue && <span className="ku-stars-value">{Number(rating).toFixed(1)}</span>}
  </span>
);

export default Stars;
