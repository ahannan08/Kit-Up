import React from 'react';
import { formatMoney } from '../utils/analytics.js';

const RevenueChart = ({ data }) => {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="ku-admin-chart">
      <div className="ku-admin-chart-head">
        <h3>Revenue (last 7 days)</h3>
        <p>Completed order totals per day</p>
      </div>
      <div className="ku-admin-revenue">
        {data.map((day) => (
          <div key={day.dateKey} className="ku-admin-revenue-col">
            <div
              className="ku-admin-revenue-bar"
              style={{ height: `${Math.max(8, (day.value / max) * 100)}%` }}
              title={formatMoney(day.value)}
            />
            <span className="ku-admin-revenue-val">{day.value ? formatMoney(day.value) : '—'}</span>
            <span className="ku-admin-revenue-label">{day.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;
