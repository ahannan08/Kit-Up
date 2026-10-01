import { STORAGE_KEYS, CATALOG_UPDATED_EVENT, newId } from './constants.js';
import { buildSeedCatalog } from './seedCatalog.js';

const readRaw = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.catalog);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeRaw = (catalog) => {
  localStorage.setItem(STORAGE_KEYS.catalog, JSON.stringify(catalog));
  window.dispatchEvent(new Event(CATALOG_UPDATED_EVENT));
};

export const ensureCatalogSeeded = () => {
  if (localStorage.getItem(STORAGE_KEYS.catalogSeeded)) {
    return readRaw() || buildSeedCatalog();
  }
  const seed = buildSeedCatalog();
  writeRaw(seed);
  localStorage.setItem(STORAGE_KEYS.catalogSeeded, '1');
  return seed;
};

export const getCatalog = () => readRaw() || ensureCatalogSeeded();

export const saveCatalog = (catalog) => writeRaw(catalog);

/** Shape for storefront components (leagues with nested clubs). */
export const toStorefrontLeagues = (catalog = getCatalog()) => {
  const { leagues, clubs } = catalog;
  return leagues.map((league) => ({
    name: league.name,
    country: league.country,
    logo: league.logoUrl,
    clubs: clubs
      .filter((c) => c.leagueId === league.id)
      .map((c) => ({ club: c.name, Image: c.crestUrl })),
  }));
};

export const toStorefrontJerseys = (catalog = getCatalog()) =>
  catalog.jerseys.map((j) => ({
    _id: j._id,
    club: j.clubName,
    Image: j.imageUrl,
    rating: j.rating,
    type: j.type,
    price: j.price,
    description: j.description,
  }));

export const getStorefrontCatalog = () => {
  const catalog = getCatalog();
  const leagues = toStorefrontLeagues(catalog);
  const allJerseys = toStorefrontJerseys(catalog);
  return { leagues, allJerseys, raw: catalog };
};

// --- League CRUD ---
export const upsertLeague = (league) => {
  const catalog = getCatalog();
  if (league.id) {
    catalog.leagues = catalog.leagues.map((l) => (l.id === league.id ? { ...l, ...league } : l));
  } else {
    catalog.leagues.push({ id: newId(), country: '', logoUrl: '', ...league });
  }
  saveCatalog(catalog);
  return catalog;
};

export const deleteLeague = (id) => {
  const catalog = getCatalog();
  const clubNames = catalog.clubs.filter((c) => c.leagueId === id).map((c) => c.name);
  catalog.leagues = catalog.leagues.filter((l) => l.id !== id);
  catalog.clubs = catalog.clubs.filter((c) => c.leagueId !== id);
  catalog.jerseys = catalog.jerseys.filter((j) => !clubNames.includes(j.clubName));
  saveCatalog(catalog);
};

// --- Club CRUD ---
export const upsertClub = (club) => {
  const catalog = getCatalog();
  if (club.id) {
    const prev = catalog.clubs.find((c) => c.id === club.id);
    catalog.clubs = catalog.clubs.map((c) => (c.id === club.id ? { ...c, ...club } : c));
    if (prev && prev.name !== club.name) {
      catalog.jerseys = catalog.jerseys.map((j) =>
        j.clubName === prev.name ? { ...j, clubName: club.name } : j
      );
    }
  } else {
    catalog.clubs.push({ id: newId(), crestUrl: '', ...club });
  }
  saveCatalog(catalog);
};

export const deleteClub = (id) => {
  const catalog = getCatalog();
  const club = catalog.clubs.find((c) => c.id === id);
  catalog.clubs = catalog.clubs.filter((c) => c.id !== id);
  if (club) {
    catalog.jerseys = catalog.jerseys.filter((j) => j.clubName !== club.name);
  }
  saveCatalog(catalog);
};

// --- Jersey CRUD ---
export const upsertJersey = (jersey) => {
  const catalog = getCatalog();
  if (jersey.id) {
    catalog.jerseys = catalog.jerseys.map((j) => (j.id === jersey.id ? { ...j, ...jersey } : j));
  } else {
    const nextNum =
      catalog.jerseys.reduce((max, j) => Math.max(max, Number(j._id) || 0), 0) + 1;
    catalog.jerseys.push({
      id: newId(),
      _id: String(nextNum),
      description: '',
      ...jersey,
    });
  }
  saveCatalog(catalog);
};

export const deleteJersey = (id) => {
  const catalog = getCatalog();
  catalog.jerseys = catalog.jerseys.filter((j) => j.id !== id);
  saveCatalog(catalog);
};
