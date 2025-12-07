import jwt from 'jsonwebtoken';

const signAccess = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXP || '15m' });
};

const signRefresh = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXP || '7d' });
};

const verifyAccess = (token) => jwt.verify(token, process.env.JWT_ACCESS_SECRET);
const verifyRefresh = (token) => jwt.verify(token, process.env.JWT_REFRESH_SECRET);

export { signAccess, signRefresh, verifyAccess, verifyRefresh };
