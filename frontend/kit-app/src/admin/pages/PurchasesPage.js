import React from 'react';
import { useAdminEvents } from '../hooks/useAdminEvents.js';

const formatDate = (iso) => (iso ? new Date(iso).toLocaleString() : '—');

const PurchasesPage = () => {
  const { purchases } = useAdminEvents();

  return (
    <div>
      <header className="ku-admin-page-head">
        <div>
          <span className="ku-eyebrow">Analytics</span>
          <h1>Completed purchases</h1>
        </div>
      </header>
      <div className="ku-admin-table-wrap">
        <table className="ku-admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Items</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.length === 0 ? (
              <tr>
                <td colSpan={5}>No purchases yet.</td>
              </tr>
            ) : (
              purchases.map((p) => (
                <tr key={p.id}>
                  <td>{p.userName}</td>
                  <td>{p.userEmail}</td>
                  <td>
                    {p.items?.map((i, idx) => (
                      <span key={idx}>
                        {i.quantity}× {i.type} (${i.price}){' '}
                      </span>
                    ))}
                  </td>
                  <td>${p.totalPrice}</td>
                  <td>{formatDate(p.completedAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchasesPage;
