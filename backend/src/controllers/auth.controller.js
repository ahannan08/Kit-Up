import {
  validateSignup,
  validateLogin
} from '../validators/auth.validator.js';
import {
  registerUser,
  verifyEmail,
  loginUser,
  issueTokens,
  rotateRefreshToken,
  revokeRefreshToken,
  requestPasswordReset,
  resetPassword
} from '../services/auth.service.js';
import { sendEmail } from '../utils/email.js';

const getIp = (req) => req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

export const signup = async (req, res, next) => {
  try {
    const errs = validateSignup(req.body);
    if (errs.length) return res.status(400).json({ errors: errs });

    const user = await registerUser(req.body);
    // const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${user.verifyToken.token}`;
    // send verification email
    // await sendEmail({
    //   to: user.email,
    //   subject: 'Verify your email',
    //   html: `<p>Please verify: <a href="${verifyUrl}">${verifyUrl}</a></p>`,
    //   text: `Verify at ${verifyUrl}`
    // });

    res.status(201).json({ ok: true, msg: 'Account created.' });
  } catch (err) {
    next(err);
  }
};

export const confirmEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ msg: 'Token required' });
    await verifyEmail(token);
    res.json({ ok: true, msg: 'Email verified' });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const errs = validateLogin(req.body);
    if (errs.length) return res.status(400).json({ errors: errs });

    const user = await loginUser(req.body);
    // if (!user.isVerified) return res.status(403).json({ msg: 'Email not verified' });

    const ip = getIp(req);
    const ua = req.get('User-Agent') || '';
    const tokens = await issueTokens(user, ip, ua);

    // return tokens (refresh can be cookie or body; here both returned)
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 3600 * 1000
    });
    res.json({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const token = req.body.refreshToken || req.cookies.refreshToken;
    if (!token) return res.status(400).json({ msg: 'Refresh token required' });
    const ip = getIp(req);
    const ua = req.get('User-Agent') || '';
    const { accessToken, refreshToken } = await rotateRefreshToken(token, ip, ua);
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    const token = req.body.refreshToken || req.cookies.refreshToken;
    if (token) await revokeRefreshToken(token);
    res.clearCookie('refreshToken');
    res.json({ ok: true, msg: 'Logged out' });
  } catch (err) {
    next(err);
  }
};

export const passwordResetRequest = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: 'Email required' });
    const { user, reset } = await requestPasswordReset(email);
    const url = `${process.env.CLIENT_URL}/reset-password?token=${reset.token}`;
    await sendEmail({
      to: user.email,
      subject: 'Password reset',
      html: `<p>Reset: <a href="${url}">${url}</a></p>`,
      text: `Reset at ${url}`
    });
    res.json({ ok: true, msg: 'Reset email sent if account exists' });
  } catch (err) {
    next(err);
  }
};

export const passwordReset = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) return res.status(400).json({ msg: 'Token and password required' });
    await resetPassword(token, password);
    res.json({ ok: true, msg: 'Password reset successful' });
  } catch (err) {
    next(err);
  }
};
