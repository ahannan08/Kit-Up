// controllers/clubController.js
import { pl, laliga, ligue1, bundesliga, seria } from "../shared/clubs.js"; // Import club data

// Combine all leagues into one array
const allClubs = [...pl, ...laliga, ...ligue1, ...bundesliga, ...seria];

 const searchClub = (req, res) => {
  const searchTerm = req.query.q?.toLowerCase(); // Get query string
  if (!searchTerm) {
    return res.status(400).json({ message: "Please provide a search term." });
  }

  // Search for the club by name (case insensitive)
  const foundClubs = allClubs.filter((club) => 
    club.club.toLowerCase().includes(searchTerm) // Use includes for substring search
  );

  if (foundClubs.length > 0) {
    return res.json(foundClubs); // Return all matching clubs
  } else {
    return res.status(404).json({ message: "No clubs found" });
  }
};

export {searchClub}