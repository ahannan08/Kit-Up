import express from 'express';
import {
  signup,
  confirmEmail,
  login,
  refresh,
  logout,
  passwordResetRequest,
  passwordReset
} from '../controllers/auth.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.get('/verify', confirmEmail);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);

router.post('/password-reset', passwordResetRequest);
router.post('/password-reset/confirm', passwordReset);

// example protected route
router.get('/me', authMiddleware(), (req, res) => {
  res.json({ ok: true, userId: req.user.sub, roles: req.user.roles });
});

export default router;
