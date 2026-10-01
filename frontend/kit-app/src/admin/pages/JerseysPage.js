import React, { useMemo, useState } from 'react';
import { useAdminCatalog } from '../hooks/useAdminCatalog.js';
import { deleteJersey, upsertJersey } from '../store/catalogStore.js';
import EntityModal from '../components/EntityModal.js';
import AdminLeagueFilter from '../components/AdminLeagueFilter.js';

const JerseysPage = () => {
  const catalog = useAdminCatalog();
  const [modal, setModal] = useState(null);
  const [leagueFilter, setLeagueFilter] = useState('all');

  const clubMeta = useMemo(() => {
    const byName = new Map();
    catalog.clubs.forEach((club) => {
      const league = catalog.leagues.find((l) => l.id === club.leagueId);
      byName.set(club.name, {
        leagueId: club.leagueId,
        leagueName: league?.name || '—',
      });
    });
    return byName;
  }, [catalog.clubs, catalog.leagues]);

  const clubOptions = useMemo(() => {
    const clubs =
      leagueFilter === 'all'
        ? catalog.clubs
        : catalog.clubs.filter((c) => c.leagueId === leagueFilter);
    return clubs
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((c) => ({ value: c.name, label: c.name }));
  }, [catalog.clubs, leagueFilter]);

  const sortedJerseys = useMemo(() => {
    const list = catalog.jerseys.map((j) => {
      const meta = clubMeta.get(j.clubName);
      return {
        ...j,
        leagueId: meta?.leagueId || '',
        leagueName: meta?.leagueName || '—',
      };
    });
    list.sort((a, b) => {
      if (a.leagueName !== b.leagueName) return a.leagueName.localeCompare(b.leagueName);
      if (a.clubName !== b.clubName) return a.clubName.localeCompare(b.clubName);
      return a.type.localeCompare(b.type);
    });
    return list;
  }, [catalog.jerseys, clubMeta]);

  const filteredJerseys = useMemo(() => {
    if (leagueFilter === 'all') return sortedJerseys;
    return sortedJerseys.filter((j) => j.leagueId === leagueFilter);
  }, [sortedJerseys, leagueFilter]);

  const filterCounts = useMemo(() => {
    const counts = { all: catalog.jerseys.length };
    catalog.leagues.forEach((l) => {
      counts[l.id] = sortedJerseys.filter((j) => j.leagueId === l.id).length;
    });
    return counts;
  }, [catalog.jerseys.length, catalog.leagues, sortedJerseys]);

  const jerseyFields = useMemo(
    () => [
      {
        name: 'clubName',
        label: 'Club',
        type: 'select',
        required: true,
        selectPlaceholder: 'Select club',
        options: clubOptions,
      },
      {
        name: 'type',
        label: 'Kit type',
        type: 'select',
        required: true,
        selectPlaceholder: 'Select kit type',
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

  const openAdd = () => setModal({});

  return (
    <div>
      <header className="ku-admin-page-head">
        <div>
          <span className="ku-eyebrow">Catalog</span>
          <h1>Jerseys</h1>
          <p className="ku-admin-lead">
            Sorted by league, club, then kit type · showing {filteredJerseys.length} of{' '}
            {catalog.jerseys.length}
          </p>
        </div>
        <button type="button" className="ku-btn ku-btn--primary" onClick={openAdd}>
          Add jersey
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
              <th>Image</th>
              <th>League</th>
              <th>Club</th>
              <th>Type</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJerseys.length === 0 ? (
              <tr>
                <td colSpan={7}>No jerseys in this league.</td>
              </tr>
            ) : (
              filteredJerseys.map((jersey) => (
                <tr key={jersey.id}>
                  <td>
                    {jersey.imageUrl ? (
                      <img src={jersey.imageUrl} alt="" className="ku-admin-thumb" />
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>{jersey.leagueName}</td>
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
              ))
            )}
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
