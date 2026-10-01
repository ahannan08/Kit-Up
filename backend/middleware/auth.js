import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header required' });
  }
  try {
    const payload = jwt.verify(header.slice(7), env.jwtSecret);
    req.auth = { userId: payload.userId };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
