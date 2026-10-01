import React from 'react';
import { useAdminEvents } from '../hooks/useAdminEvents.js';

const formatDate = (iso) => (iso ? new Date(iso).toLocaleString() : '—');

const stageLabel = {
  started: 'Started checkout',
  payment_failed: 'Payment failed',
  abandoned: 'Abandoned',
};

const AttemptsPage = () => {
  const { attempts } = useAdminEvents();

  return (
    <div>
      <header className="ku-admin-page-head">
        <div>
          <span className="ku-eyebrow">Analytics</span>
          <h1>Checkout attempts</h1>
        </div>
      </header>
      <div className="ku-admin-table-wrap">
        <table className="ku-admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Stage</th>
              <th>Amount</th>
              <th>Cart</th>
              <th>Date</th>
              <th>Error</th>
            </tr>
          </thead>
          <tbody>
            {attempts.length === 0 ? (
              <tr>
                <td colSpan={6}>No attempts recorded yet.</td>
              </tr>
            ) : (
              attempts.map((a) => (
                <tr key={a.id}>
                  <td>{a.userEmail}</td>
                  <td>{stageLabel[a.stage] || a.stage}</td>
                  <td>${a.totalAmount}</td>
                  <td>
                    {a.cartSnapshot?.map((i, idx) => (
                      <span key={idx}>
                        {i.quantity}× {i.type}{' '}
                      </span>
                    ))}
                  </td>
                  <td>{formatDate(a.createdAt)}</td>
                  <td>{a.errorMessage || '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttemptsPage;
