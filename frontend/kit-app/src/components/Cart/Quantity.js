import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const Quantity = ({ quantity, onQuantityChange }) => (
  <div className="ku-qty ku-qty--cart" aria-label="Quantity">
    <button type="button" onClick={() => onQuantityChange(-1)} disabled={quantity <= 0} aria-label="Decrease">
      <FontAwesomeIcon icon={faMinus} />
    </button>
    <span>{quantity}</span>
    <button type="button" onClick={() => onQuantityChange(1)} aria-label="Increase">
      <FontAwesomeIcon icon={faPlus} />
    </button>
  </div>
);

export default Quantity;
