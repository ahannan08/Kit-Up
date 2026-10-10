import express from 'express';
import {
  getCatalogStatus,
  getStorefrontCatalog,
  postCatalogImport,
} from '../Controllers/catalogController.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const catalogRouter = express.Router();

catalogRouter.get('/status', asyncHandler(getCatalogStatus));
catalogRouter.get('/storefront', asyncHandler(getStorefrontCatalog));
catalogRouter.post('/import', asyncHandler(postCatalogImport));

export default catalogRouter;
