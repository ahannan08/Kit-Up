import express from 'express';
import { Login, Register, getMe } from '../Controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const authRouter = express.Router();

authRouter.post('/register', asyncHandler(Register));
authRouter.post('/login', asyncHandler(Login));
authRouter.get('/me', requireAuth, asyncHandler(getMe));

export default authRouter;
