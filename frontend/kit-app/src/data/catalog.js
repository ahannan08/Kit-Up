import { bundesliga, laliga, ligue1, pl, seria } from './clubs.js';
import { home_jer, away_jer } from './jerseys.js';

import plLogo from '../assets/leagueLogos/pl.jpg';
import seriaLogo from '../assets/leagueLogos/SERIA.png';
import ligue1Logo from '../assets/leagueLogos/ligue1.jpg';
import laligaLogo from '../assets/leagueLogos/laliga.png';
import bundesligaLogo from '../assets/leagueLogos/bundus.jpg';

export const leagues = [
  { name: 'Premier League', country: 'England', logo: plLogo, clubs: pl },
  { name: 'La Liga', country: 'Spain', logo: laligaLogo, clubs: laliga },
  { name: 'Serie A', country: 'Italy', logo: seriaLogo, clubs: seria },
  { name: 'Bundesliga', country: 'Germany', logo: bundesligaLogo, clubs: bundesliga },
  { name: 'Ligue 1', country: 'France', logo: ligue1Logo, clubs: ligue1 },
];

export const allJerseys = [...home_jer, ...away_jer];

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

export const totalClubs = leagues.reduce((sum, league) => sum + league.clubs.length, 0);
