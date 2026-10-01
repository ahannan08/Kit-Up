import { getStorefrontCatalog, ensureCatalogSeeded } from '../admin/store/catalogStore.js';

/** @deprecated Prefer useCatalog() in React components. */
export const getCatalogSnapshot = () => {
  ensureCatalogSeeded();
  return getStorefrontCatalog();
};

export const leagues = getCatalogSnapshot().leagues;
export const allJerseys = getCatalogSnapshot().allJerseys;
export const totalClubs = leagues.reduce((sum, league) => sum + league.clubs.length, 0);

export const findClub = (clubName) => {
  for (const league of leagues) {
    const club = league.clubs.find((c) => c.club === clubName);
    if (club) return { ...club, league };
  }
  return null;
};

export const jerseysForClub = (clubName) =>
  allJerseys.filter((jersey) => jersey.club === clubName);

export const jerseysForLeague = (league) => {
  const names = new Set(league.clubs.map((c) => c.club));
  return allJerseys.filter((jersey) => names.has(jersey.club));
};
