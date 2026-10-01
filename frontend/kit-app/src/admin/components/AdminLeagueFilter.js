import React from 'react';

const AdminLeagueFilter = ({ leagues, value, onChange, counts }) => (
  <div className="ku-admin-filters" role="group" aria-label="Filter by league">
    <button
      type="button"
      className={value === 'all' ? 'is-active' : ''}
      onClick={() => onChange('all')}
    >
      All leagues
      {counts?.all != null && <span>{counts.all}</span>}
    </button>
    {leagues.map((league) => (
      <button
        key={league.id}
        type="button"
        className={value === league.id ? 'is-active' : ''}
        onClick={() => onChange(league.id)}
      >
        {league.name}
        {counts?.[league.id] != null && <span>{counts[league.id]}</span>}
      </button>
    ))}
  </div>
);

export default AdminLeagueFilter;
