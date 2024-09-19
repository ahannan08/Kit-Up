import express from 'express';
import { searchClub } from '../Controllers/searchController.js';

// Search route
const clubRouter = express.Router()
clubRouter.get('/search', searchClub);


// Payment route

export default clubRouter;
