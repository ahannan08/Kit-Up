# Kit-Up — development guide

How to run the app locally, configure environment variables, smoke-test flows, and use the admin dashboard.

For API endpoint details, see [backend-api-plan.md](./backend-api-plan.md).

---

## Run backend and frontend

**Prerequisites:** Node.js 18+, MongoDB (MongoDB Atlas or local via Docker).

| App | Directory | Install | Run | Default URL |
|-----|-----------|---------|-----|-------------|
| Backend | `backend/` | `npm install` | `npm start` | `http://localhost:3009` |
| Frontend | `frontend/kit-app/` | `npm install` | `npm start` | `http://localhost:3000` |

**Order:** Start the **backend** first (requires `MONGO_URI` in `backend/.env`), then the **frontend**.

### Docker (optional)

From the repo root:

```bash
docker compose up
```

- MongoDB: `mongodb://mongo:27017/kit-db`
- Backend: port `3009`
- Frontend: port `3000`

### Vercel-shaped backend locally (optional)

```bash
cd backend
npm run vercel-dev
```

Use the URL printed by the Vercel CLI for `REACT_APP_API_URL` if the port differs from `3009`.

### Production (brief)

- **Frontend:** Vercel project with root directory `frontend/kit-app`
- **Backend:** Separate Vercel project with root directory `backend`
- Set env vars on each project (see below). Point `REACT_APP_API_URL` at the deployed backend URL and **redeploy** the frontend after changing it.

---

## Environment variables

Copy examples into `.env` files (never commit real secrets).

### Backend (`backend/.env`)

Copy from `backend/.env.example`.

| Variable | Required | Purpose |
|----------|----------|---------|
| `MONGO_URI` | Yes | MongoDB connection string; include DB name in the path (e.g. `/kitup`) |
| `PORT` | No | Listen port; default `3009` |
| `JWT_SECRET` | Strongly recommended in production | Signs login JWTs; dev fallback exists if unset |
| `STRIPE_SECRET_KEY` | For card checkout | Stripe PaymentIntent; payment routes fail if missing |

`NODE_ENV` is optional (defaults to `development`).

### Frontend (`frontend/kit-app/.env`)

Copy from `frontend/kit-app/.env.example`.

| Variable | Required | Purpose |
|----------|----------|---------|
| `REACT_APP_API_URL` | Yes | Backend base URL, no trailing slash (e.g. `http://localhost:3009`) |
| `REACT_APP_STRIPE_PUBLIC_KEY` | For Stripe checkout | Stripe publishable test key |

Create React App embeds `REACT_APP_*` at **build** time. Restart `npm start` or redeploy on Vercel after changes.

**Vercel:** use **Secret** for backend `MONGO_URI`, `JWT_SECRET`, `STRIPE_SECRET_KEY`. Use **Config** (not Secret) for `REACT_APP_*` — those values are visible in the browser bundle.

---

## Testing

### Backend (terminal)

```bash
curl http://localhost:3009/health
```

```bash
curl -X POST http://localhost:3009/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123"}'
```

```bash
curl -X POST http://localhost:3009/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

`GET /auth/me` requires header: `Authorization: Bearer <token>` (token from login response).

### Frontend (browser)

1. Register or log in at `/register` or `/login`.
2. Browse the catalog, open a kit, add to cart (requires `userId` in localStorage from login).
3. Cart → checkout (Stripe keys needed for card payment; wallet balance is handled by the API).
4. Order history: `/myorders`.

### Admin vs storefront

- **Storefront auth** uses the backend (JWT stored in localStorage).
- **Admin catalog and analytics** use **browser localStorage** only; they are not synced to MongoDB APIs yet.

---

## Admin access

Admin is **not** the same as a normal user account.

| Item | Value |
|------|--------|
| URL | `/admin/login` (or `/admin` → redirects to login) |
| Password | `admin123` (see `frontend/kit-app/src/admin/store/constants.js`, `ADMIN_PASSWORD`) |
| Session | `localStorage` key `kitup_admin_session` |

After login you can use Overview, Leagues, Clubs, Jerseys, Purchases, and Attempts under `/admin`.

To change the admin password, edit `ADMIN_PASSWORD` in `constants.js` and rebuild/redeploy the frontend.
