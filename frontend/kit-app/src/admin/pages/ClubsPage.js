import React, { useMemo, useState } from 'react';
import { useAdminCatalog } from '../hooks/useAdminCatalog.js';
import { deleteClub, upsertClub } from '../store/catalogStore.js';
import EntityModal from '../components/EntityModal.js';

const ClubsPage = () => {
  const catalog = useAdminCatalog();
  const [modal, setModal] = useState(null);

  const leagueOptions = useMemo(
    () => catalog.leagues.map((l) => ({ value: l.id, label: l.name })),
    [catalog.leagues]
  );

  const clubFields = useMemo(
    () => [
      {
        name: 'leagueId',
        label: 'League',
        type: 'select',
        required: true,
        options: leagueOptions,
      },
      { name: 'name', label: 'Club name', required: true },
      { name: 'crestUrl', label: 'Crest URL', required: true },
    ],
    [leagueOptions]
  );

  const leagueName = (id) => catalog.leagues.find((l) => l.id === id)?.name || '—';

  const save = (data) => {
    upsertClub(data);
    setModal(null);
  };

  return (
    <div>
      <header className="ku-admin-page-head">
        <div>
          <span className="ku-eyebrow">Catalog</span>
          <h1>Clubs</h1>
        </div>
        <button type="button" className="ku-btn ku-btn--primary" onClick={() => setModal({})}>
          Add club
        </button>
      </header>
      <div className="ku-admin-table-wrap">
        <table className="ku-admin-table">
          <thead>
            <tr>
              <th>Crest</th>
              <th>Name</th>
              <th>League</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {catalog.clubs.map((club) => (
              <tr key={club.id}>
                <td>
                  {club.crestUrl ? (
                    <img src={club.crestUrl} alt="" className="ku-admin-thumb" />
                  ) : (
                    '—'
                  )}
                </td>
                <td>{club.name}</td>
                <td>{leagueName(club.leagueId)}</td>
                <td>
                  <div className="ku-admin-actions">
                    <button type="button" onClick={() => setModal(club)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="ku-admin-danger"
                      onClick={() => {
                        if (window.confirm(`Delete ${club.name}?`)) deleteClub(club.id);
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
          title={modal.id ? 'Edit club' : 'Add club'}
          fields={clubFields}
          initial={modal}
          onClose={() => setModal(null)}
          onSave={save}
        />
      )}
    </div>
  );
};

export default ClubsPage;
