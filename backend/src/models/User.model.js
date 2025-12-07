import mongoose from 'mongoose';

const RefreshTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  ip: String,
  userAgent: String,
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  name: { type: String },
  roles: { type: [String], default: ['user'] },
  isVerified: { type: Boolean, default: true },
  verifyToken: {
    token: String,
    expiresAt: Date
  },
  resetPasswordToken: {
    token: String,
    expiresAt: Date
  },
  refreshTokens: [RefreshTokenSchema],
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
