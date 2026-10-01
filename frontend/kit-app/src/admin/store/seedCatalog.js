import { bundesliga, laliga, ligue1, pl, seria } from '../../data/clubs.js';
import { home_jer, away_jer } from '../../data/jerseys.js';
import plLogo from '../../assets/leagueLogos/pl.jpg';
import seriaLogo from '../../assets/leagueLogos/SERIA.png';
import ligue1Logo from '../../assets/leagueLogos/ligue1.jpg';
import laligaLogo from '../../assets/leagueLogos/laliga.png';
import bundesligaLogo from '../../assets/leagueLogos/bundus.jpg';
import { newId, toUrl } from './constants.js';

const staticLeagues = [
  { name: 'Premier League', country: 'England', logo: plLogo, clubs: pl },
  { name: 'La Liga', country: 'Spain', logo: laligaLogo, clubs: laliga },
  { name: 'Serie A', country: 'Italy', logo: seriaLogo, clubs: seria },
  { name: 'Bundesliga', country: 'Germany', logo: bundesligaLogo, clubs: bundesliga },
  { name: 'Ligue 1', country: 'France', logo: ligue1Logo, clubs: ligue1 },
];

/** Build normalized catalog from current static JS modules (run once). */
export const buildSeedCatalog = () => {
  const leagues = [];
  const clubs = [];
  const jerseys = [];

  staticLeagues.forEach((league) => {
    const leagueId = newId();
    leagues.push({
      id: leagueId,
      name: league.name,
      country: league.country,
      logoUrl: toUrl(league.logo),
    });

    league.clubs.forEach((c) => {
      clubs.push({
        id: newId(),
        leagueId,
        name: c.club,
        crestUrl: toUrl(c.Image),
      });
    });
  });

  [...home_jer, ...away_jer].forEach((j) => {
    jerseys.push({
      id: newId(),
      _id: String(j._id),
      clubName: j.club,
      type: j.type,
      price: j.price,
      rating: j.rating,
      description: j.description || `${j.club} ${j.type} kit — official-style replica.`,
      imageUrl: toUrl(j.Image),
    });
  });

  return { leagues, clubs, jerseys };
};
