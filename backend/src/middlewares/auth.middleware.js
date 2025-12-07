import { verifyAccess } from '../utils/jwt.js';
import User from "../models/User.model.js";

export default function authMiddleware(requiredRoles = []) {
  return async (req, res, next) => {
    const auth = req.get('Authorization');
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ msg: 'Unauthorized' });
    const token = auth.split(' ')[1];
    try {
      const payload = verifyAccess(token);
      // roles check
      if (requiredRoles.length && (!payload.roles || !requiredRoles.some(r => payload.roles.includes(r)))) {
        return res.status(403).json({ msg: 'Forbidden' });
      }
      req.user = payload; // payload should contain { id, email, roles }
      next();
    } catch (err) {
      return res.status(401).json({ msg: 'Invalid or expired token' });
    }
  };
}
