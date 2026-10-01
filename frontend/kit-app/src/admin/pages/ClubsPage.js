import React, { useMemo, useState } from 'react';
import { useAdminCatalog } from '../hooks/useAdminCatalog.js';
import { deleteClub, upsertClub } from '../store/catalogStore.js';
import EntityModal from '../components/EntityModal.js';
import AdminLeagueFilter from '../components/AdminLeagueFilter.js';

const ClubsPage = () => {
  const catalog = useAdminCatalog();
  const [modal, setModal] = useState(null);
  const [leagueFilter, setLeagueFilter] = useState('all');

  const leagueOptions = useMemo(
    () => catalog.leagues.map((l) => ({ value: l.id, label: l.name })),
    [catalog.leagues]
  );

  const leagueName = (id) => catalog.leagues.find((l) => l.id === id)?.name || '—';

  const sortedClubs = useMemo(() => {
    const leagueById = new Map(catalog.leagues.map((l) => [l.id, l.name]));
    return [...catalog.clubs].sort((a, b) => {
      const leagueA = leagueById.get(a.leagueId) || '';
      const leagueB = leagueById.get(b.leagueId) || '';
      if (leagueA !== leagueB) return leagueA.localeCompare(leagueB);
      return a.name.localeCompare(b.name);
    });
  }, [catalog.clubs, catalog.leagues]);

  const filteredClubs = useMemo(() => {
    if (leagueFilter === 'all') return sortedClubs;
    return sortedClubs.filter((c) => c.leagueId === leagueFilter);
  }, [sortedClubs, leagueFilter]);

  const filterCounts = useMemo(() => {
    const counts = { all: catalog.clubs.length };
    catalog.leagues.forEach((l) => {
      counts[l.id] = catalog.clubs.filter((c) => c.leagueId === l.id).length;
    });
    return counts;
  }, [catalog.clubs, catalog.leagues]);

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

  const save = (data) => {
    upsertClub(data);
    setModal(null);
  };

  const openAdd = () => {
    setModal(leagueFilter !== 'all' ? { leagueId: leagueFilter } : {});
  };

  return (
    <div>
      <header className="ku-admin-page-head">
        <div>
          <span className="ku-eyebrow">Catalog</span>
          <h1>Clubs</h1>
          <p className="ku-admin-lead">
            Sorted by league, then name · showing {filteredClubs.length} of {catalog.clubs.length}
          </p>
        </div>
        <button type="button" className="ku-btn ku-btn--primary" onClick={openAdd}>
          Add club
        </button>
      </header>

      <AdminLeagueFilter
        leagues={catalog.leagues}
        value={leagueFilter}
        onChange={setLeagueFilter}
        counts={filterCounts}
      />

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
            {filteredClubs.length === 0 ? (
              <tr>
                <td colSpan={4}>No clubs in this league.</td>
              </tr>
            ) : (
              filteredClubs.map((club) => (
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
              ))
            )}
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
