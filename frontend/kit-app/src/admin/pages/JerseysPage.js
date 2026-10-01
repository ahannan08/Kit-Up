import React, { useMemo, useState } from 'react';
import { useAdminCatalog } from '../hooks/useAdminCatalog.js';
import { deleteJersey, upsertJersey } from '../store/catalogStore.js';
import EntityModal from '../components/EntityModal.js';

const JerseysPage = () => {
  const catalog = useAdminCatalog();
  const [modal, setModal] = useState(null);

  const clubOptions = useMemo(
    () => catalog.clubs.map((c) => ({ value: c.name, label: c.name })),
    [catalog.clubs]
  );

  const jerseyFields = useMemo(
    () => [
      {
        name: 'clubName',
        label: 'Club',
        type: 'select',
        required: true,
        options: clubOptions,
      },
      {
        name: 'type',
        label: 'Kit type',
        type: 'select',
        required: true,
        options: [
          { value: 'Home', label: 'Home' },
          { value: 'Away', label: 'Away' },
        ],
      },
      { name: 'price', label: 'Price ($)', type: 'number', required: true },
      { name: 'rating', label: 'Rating (1–5)', type: 'number', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'imageUrl', label: 'Image URL', required: true },
      { name: '_id', label: 'Cart ID', readOnly: true },
    ],
    [clubOptions]
  );

  const save = (data) => {
    upsertJersey({
      ...data,
      rating: Math.min(5, Math.max(1, Number(data.rating) || 3)),
      price: Number(data.price) || 0,
    });
    setModal(null);
  };

  return (
    <div>
      <header className="ku-admin-page-head">
        <div>
          <span className="ku-eyebrow">Catalog</span>
          <h1>Jerseys</h1>
        </div>
        <button
          type="button"
          className="ku-btn ku-btn--primary"
          onClick={() => setModal({ type: 'Home', rating: 4, price: 600 })}
        >
          Add jersey
        </button>
      </header>
      <div className="ku-admin-table-wrap">
        <table className="ku-admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Club</th>
              <th>Type</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {catalog.jerseys.map((jersey) => (
              <tr key={jersey.id}>
                <td>
                  {jersey.imageUrl ? (
                    <img src={jersey.imageUrl} alt="" className="ku-admin-thumb" />
                  ) : (
                    '—'
                  )}
                </td>
                <td>{jersey.clubName}</td>
                <td>{jersey.type}</td>
                <td>${jersey.price}</td>
                <td>{jersey.rating}</td>
                <td>
                  <div className="ku-admin-actions">
                    <button type="button" onClick={() => setModal(jersey)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="ku-admin-danger"
                      onClick={() => {
                        if (window.confirm('Delete this jersey?')) deleteJersey(jersey.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal && (
        <EntityModal
          title={modal.id ? 'Edit jersey' : 'Add jersey'}
          fields={jerseyFields}
          initial={modal}
          onClose={() => setModal(null)}
          onSave={save}
        />
      )}
    </div>
  );
};

export default JerseysPage;
