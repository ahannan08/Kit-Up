export default function errorHandler(err, req, res, next) {
  console.error(err && err.message ? err.message : err);
  const status = err.status || 500;
  const msg = err.message || 'Server error';
  res.status(status).json({ ok: false, error: msg });
}
