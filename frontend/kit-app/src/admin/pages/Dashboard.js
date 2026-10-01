import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAdminCatalog } from '../hooks/useAdminCatalog.js';
import { useAdminEvents } from '../hooks/useAdminEvents.js';
import { computeDashboardMetrics, formatMoney } from '../utils/analytics.js';
import BarChart from '../components/BarChart.js';
import RevenueChart from '../components/RevenueChart.js';

const Dashboard = () => {
  const catalog = useAdminCatalog();
  const events = useAdminEvents();

  const metrics = useMemo(
    () => computeDashboardMetrics(events, catalog),
    [events, catalog]
  );

  const { kpis } = metrics;

  const primaryKpis = [
    {
      label: 'Total orders',
      value: kpis.totalOrders,
      hint: 'Completed purchases',
      link: '/admin/purchases',
    },
    {
      label: 'Payments received',
      value: formatMoney(kpis.paymentsReceived),
      hint: 'Gross revenue',
      accent: true,
    },
    {
      label: 'Payments failed',
      value: kpis.paymentsFailed,
      hint: 'Failed checkout attempts',
      link: '/admin/attempts',
      danger: true,
    },
    {
      label: 'Avg order value',
      value: formatMoney(kpis.avgOrderValue),
      hint: 'Per completed order',
    },
    {
      label: 'Checkout started',
      value: kpis.checkoutStarted,
      hint: 'Opened payment page',
    },
    {
      label: 'Added to cart',
      value: kpis.cartAdds,
      hint: 'Units added (all time)',
    },
    {
      label: 'Conversion',
      value: `${kpis.conversionRate}%`,
      hint: 'Orders vs checkouts started',
    },
    {
      label: 'Product views',
      value: kpis.productViewCount,
      hint: 'Jersey detail views',
    },
  ];

  const catalogKpis = [
    { label: 'Leagues', value: kpis.leagues },
    { label: 'Clubs', value: kpis.clubs },
    { label: 'Jerseys', value: kpis.jerseys },
    { label: 'Abandoned checkout', value: kpis.checkoutAbandoned },
  ];

  return (
    <div className="ku-admin-dashboard">
      <header className="ku-admin-page-head">
        <div>
          <span className="ku-eyebrow">Dashboard</span>
          <h1>Overview</h1>
          <p className="ku-admin-lead">
            Sales and engagement from local tracking (cart, checkout, purchases).{' '}
            <Link to="/home">View storefront</Link>
          </p>
        </div>
      </header>

      <section className="ku-admin-section">
        <h2 className="ku-admin-section-title">Sales</h2>
        <div className="ku-admin-stats ku-admin-stats--primary">
          {primaryKpis.map((s) => {
            const inner = (
              <>
                <span>{s.label}</span>
                <strong>{s.value}</strong>
                <small>{s.hint}</small>
              </>
            );
            const className = [
              'ku-admin-stat',
              s.accent && 'ku-admin-stat--accent',
              s.danger && 'ku-admin-stat--danger',
            ]
              .filter(Boolean)
              .join(' ');

            return s.link ? (
              <Link key={s.label} to={s.link} className={`${className} ku-admin-stat-link`}>
                {inner}
              </Link>
            ) : (
              <div key={s.label} className={className}>
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      <section className="ku-admin-section">
        <h2 className="ku-admin-section-title">Catalog & checkout</h2>
        <div className="ku-admin-stats">
          {catalogKpis.map((s) => (
            <div key={s.label} className="ku-admin-stat">
              <span>{s.label}</span>
              <strong>{s.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="ku-admin-charts-grid">
        <BarChart
          title="Top purchased kits"
          subtitle="Units sold (completed orders)"
          data={metrics.topPurchased}
        />
        <BarChart
          title="Most added to cart"
          subtitle="Units added from product pages"
          data={metrics.topCartAdds}
        />
        <BarChart
          title="Most viewed kits"
          subtitle="Jersey detail page views"
          data={metrics.topViews}
          emptyMessage="No product views recorded yet."
        />
        <div className="ku-admin-chart">
          <div className="ku-admin-chart-head">
            <h3>Checkout funnel</h3>
            <p>Where shoppers drop off</p>
          </div>
          <ul className="ku-admin-funnel">
            {metrics.funnel.map((step) => {
              const max = Math.max(...metrics.funnel.map((f) => f.value), 1);
              return (
                <li key={step.label} className={`ku-admin-funnel-step ku-admin-funnel--${step.tone}`}>
                  <span>{step.label}</span>
                  <div className="ku-admin-bar-track">
                    <div
                      className="ku-admin-bar-fill"
                      style={{ width: `${(step.value / max) * 100}%` }}
                    />
                  </div>
                  <strong>{step.value}</strong>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="ku-admin-section">
        <RevenueChart data={metrics.revenueByDay} />
      </section>
    </div>
  );
};

export default Dashboard;
