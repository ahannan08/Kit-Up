import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/User.model.js';
import { signAccess, signRefresh, verifyRefresh } from '../utils/jwt.js';

const SALT_ROUNDS = 10;

export const hashPassword = async (plain) => {
  return bcrypt.hash(plain, SALT_ROUNDS);
};

export const comparePassword = async (plain, hash) => {
  return bcrypt.compare(plain, hash);
};

export const createVerificationToken = () => {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return { token, expiresAt };
};

export const createResetToken = () => {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  return { token, expiresAt };
};

export const registerUser = async ({ email, password, name }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error('Email already registered');
  const hashed = await hashPassword(password);
  // const verify = createVerificationToken();
  const user = await User.create({
    email,
    password: hashed,
    name,
    isVerified: true, // auto-verify
    verifyToken: undefined
  });
  return user;
};

export const verifyEmail = async (token) => {
  const user = await User.findOne({ 'verifyToken.token': token });
  if (!user) throw new Error('Invalid token');
  if (user.verifyToken.expiresAt < new Date()) throw new Error('Token expired');
  user.isVerified = true;
  user.verifyToken = undefined;
  await user.save();
  return user;
};

export const issueTokens = async (user, ip, ua) => {
  const payload = { sub: user._id.toString(), roles: user.roles };
  const accessToken = signAccess(payload);
  const refreshToken = signRefresh({ sub: user._id.toString() });

  // store refresh token
  user.refreshTokens.push({ token: refreshToken, ip, userAgent: ua });
  // keep limited list (optional)
  if (user.refreshTokens.length > 10) user.refreshTokens.shift();
  await user.save();

  return { accessToken, refreshToken };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new Error('Invalid credentials');
  const ok = await comparePassword(password, user.password);
  if (!ok) throw new Error('Invalid credentials');
  return user;
};

export const rotateRefreshToken = async (token, ip, ua) => {
  // verify
  const payload = verifyRefresh(token);
  const user = await User.findById(payload.sub);
  if (!user) throw new Error('Invalid refresh token');

  // find token in DB
  const found = user.refreshTokens.find(rt => rt.token === token);
  if (!found) {
    // token misuse or revoked
    user.refreshTokens = []; // revoke all (optional)
    await user.save();
    throw new Error('Refresh token revoked');
  }

  // remove old token, add new
  user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== token);
  const newRefresh = signRefresh({ sub: user._id.toString() });
  user.refreshTokens.push({ token: newRefresh, ip, userAgent: ua });
  await user.save();

  const accessToken = signAccess({ sub: user._id.toString(), roles: user.roles });
  return { accessToken, refreshToken: newRefresh, user };
};

export const revokeRefreshToken = async (token) => {
  try {
    const payload = verifyRefresh(token);
    const user = await User.findById(payload.sub);
    if (!user) return;
    user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== token);
    await user.save();
  } catch (e) {
    // ignore
  }
};

export const requestPasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('No account with that email');
  const reset = createResetToken();
  user.resetPasswordToken = reset;
  await user.save();
  return { user, reset };
};

export const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({ 'resetPasswordToken.token': token }).select('+password');
  if (!user) throw new Error('Invalid token');
  if (user.resetPasswordToken.expiresAt < new Date()) throw new Error('Token expired');
  user.password = await hashPassword(newPassword);
  user.resetPasswordToken = undefined;
  user.refreshTokens = []; // revoke all sessions after reset
  await user.save();
  return user;
};
