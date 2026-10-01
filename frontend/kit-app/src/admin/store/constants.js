/** Mock admin password (frontend only until backend roles exist). */
export const ADMIN_PASSWORD = 'admin123';

export const STORAGE_KEYS = {
  catalog: 'kitup_admin_catalog',
  events: 'kitup_admin_events',
  session: 'kitup_admin_session',
  catalogSeeded: 'kitup_admin_catalog_seeded',
  eventsSeeded: 'kitup_admin_events_seeded',
};

export const CATALOG_UPDATED_EVENT = 'kitup-catalog-updated';
export const EVENTS_UPDATED_EVENT = 'kitup-events-updated';

export const newId = () =>
  `id_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;

export const toUrl = (value) => (typeof value === 'string' ? value : '');
