import express from 'express';
import { searchClub } from '../Controllers/searchController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const clubRouter = express.Router();

clubRouter.get('/search', asyncHandler(searchClub));

export default clubRouter;
