import React from 'react';

const BarChart = ({ title, subtitle, data, emptyMessage = 'No data yet.' }) => {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="ku-admin-chart">
      <div className="ku-admin-chart-head">
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {data.length === 0 ? (
        <p className="ku-admin-chart-empty">{emptyMessage}</p>
      ) : (
        <ul className="ku-admin-bars">
          {data.map((row) => (
            <li key={row.label}>
              <div className="ku-admin-bar-meta">
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </div>
              <div className="ku-admin-bar-track">
                <div
                  className="ku-admin-bar-fill"
                  style={{ width: `${(row.value / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BarChart;
