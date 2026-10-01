import React, { useState } from 'react';
import { useAdminCatalog } from '../hooks/useAdminCatalog.js';
import { deleteLeague, upsertLeague } from '../store/catalogStore.js';
import EntityModal from '../components/EntityModal.js';

const leagueFields = [
  { name: 'name', label: 'League name', required: true },
  { name: 'country', label: 'Country', required: true },
  { name: 'logoUrl', label: 'Logo URL', required: true },
];

const LeaguesPage = () => {
  const catalog = useAdminCatalog();
  const [modal, setModal] = useState(null);

  const save = (data) => {
    upsertLeague(data);
    setModal(null);
  };

  return (
    <div>
      <header className="ku-admin-page-head">
        <div>
          <span className="ku-eyebrow">Catalog</span>
          <h1>Leagues</h1>
        </div>
        <button type="button" className="ku-btn ku-btn--primary" onClick={() => setModal({})}>
          Add league
        </button>
      </header>
      <div className="ku-admin-table-wrap">
        <table className="ku-admin-table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {catalog.leagues.map((league) => (
              <tr key={league.id}>
                <td>
                  {league.logoUrl ? (
                    <img src={league.logoUrl} alt="" className="ku-admin-thumb" />
                  ) : (
                    '—'
                  )}
                </td>
                <td>{league.name}</td>
                <td>{league.country}</td>
                <td>
                  <div className="ku-admin-actions">
                    <button type="button" onClick={() => setModal(league)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="ku-admin-danger"
                      onClick={() => {
                        if (window.confirm(`Delete ${league.name} and its clubs?`)) {
                          deleteLeague(league.id);
                        }
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
          title={modal.id ? 'Edit league' : 'Add league'}
          fields={leagueFields}
          initial={modal}
          onClose={() => setModal(null)}
          onSave={save}
        />
      )}
    </div>
  );
};

export default LeaguesPage;
