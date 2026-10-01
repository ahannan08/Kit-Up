import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faXmark } from '@fortawesome/free-solid-svg-icons';

const types = ['', 'Home', 'Away'];

const FilterComponent = ({ filters, setFilters, applyFilters, resetFilters, closePanel }) => {
  const update = (name, value) => setFilters((prev) => ({ ...prev, [name]: value }));

  return (
    <div className="ku-filter" role="dialog" aria-label="Filter jerseys">
      <div className="ku-filter-head">
        <h3>Filter kits</h3>
        <button type="button" onClick={closePanel} className="ku-filter-close" aria-label="Close filters">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <div className="ku-filter-group">
        <span className="ku-filter-label">Kit type</span>
        <div className="ku-segmented">
          {types.map((type) => (
            <button
              key={type || 'all'}
              type="button"
              className={filters.type === type ? 'is-active' : ''}
              onClick={() => update('type', type)}
            >
              {type || 'All'}
            </button>
          ))}
        </div>
      </div>

      <div className="ku-filter-group">
        <span className="ku-filter-label">Minimum rating</span>
        <div className="ku-rating-pick">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className={Number(filters.rating) >= value ? 'is-on' : ''}
              onClick={() => update('rating', Number(filters.rating) === value ? 0 : value)}
              aria-label={`${value} stars and up`}
            >
              <FontAwesomeIcon icon={faStar} />
            </button>
          ))}
        </div>
      </div>

      <div className="ku-filter-group">
        <span className="ku-filter-label">Price range ($)</span>
        <div className="ku-price-row">
          <input
            type="number"
            min="0"
            value={filters.minPrice}
            onChange={(e) => update('minPrice', Number(e.target.value))}
            aria-label="Minimum price"
          />
          <span>to</span>
          <input
            type="number"
            min="0"
            value={filters.maxPrice}
            onChange={(e) => update('maxPrice', Number(e.target.value))}
            aria-label="Maximum price"
          />
        </div>
      </div>

      <div className="ku-filter-actions">
        <button type="button" className="ku-btn ku-btn--ghost ku-btn--sm" onClick={resetFilters}>
          Reset
        </button>
        <button type="button" className="ku-btn ku-btn--primary ku-btn--sm" onClick={applyFilters}>
          Show results
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
