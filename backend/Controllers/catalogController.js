import { League } from '../Schemas/leagueSchema.js';
import { Club } from '../Schemas/clubSchema.js';
import { Jersey } from '../Schemas/jerseySchema.js';
import { ensureCatalogInMongo, importCatalogPayload } from '../seed/ensureCatalogInMongo.js';

const toStorefrontLeagues = (leagues, clubs) =>
  leagues.map((league) => ({
    name: league.name,
    country: league.country,
    logo: league.logoUrl,
    clubs: clubs
      .filter((c) => c.leagueId === league.id)
      .map((c) => ({ club: c.name, Image: c.crestUrl })),
  }));

const toStorefrontJerseys = (jerseys) =>
  jerseys.map((j) => ({
    _id: String(j.legacyId),
    club: j.clubName,
    Image: j.imageUrl,
    rating: j.rating,
    type: j.type,
    price: j.price,
    description: j.description,
  }));

export const getCatalogStatus = async (req, res) => {
  await ensureCatalogInMongo();
  const jerseyCount = await Jersey.countDocuments();
  res.json({ ingested: jerseyCount > 0, jerseyCount });
};

export const getStorefrontCatalog = async (req, res) => {
  await ensureCatalogInMongo();

  const [leagues, clubs, jerseys] = await Promise.all([
    League.find().lean(),
    Club.find().lean(),
    Jersey.find().lean(),
  ]);

  res.json({
    leagues: toStorefrontLeagues(leagues, clubs),
    allJerseys: toStorefrontJerseys(jerseys),
  });
};

export const postCatalogImport = async (req, res) => {
  const result = await importCatalogPayload(req.body);
  if (!result.imported) {
    const status = result.reason === 'already_populated' ? 409 : 400;
    return res.status(status).json({ message: result.reason || 'Import failed', ...result });
  }
  res.status(201).json({ message: 'Catalog imported', ...result });
};
