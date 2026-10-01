# Kit-Up backend API

**Start:** `cd backend && npm start`  
**Entry:** `index.js` → connects DB → ensures collections → `app.js`  
**Base URL (local):** `http://localhost:3009`

---

## Where to put the MongoDB URL

| Location | Variable | Notes |
|----------|----------|--------|
| **Local dev** | `backend/.env` | **`MONGO_URI=...`** (copy from `backend/.env.example`) |
| **Docker** | `docker-compose.yml` → backend `environment` | **`MONGO_URI=mongodb://mongo:27017/kit-db`** |
| **Atlas** | Same `MONGO_URI` | Cluster **Connect** → Node driver → paste string; set DB name in path (e.g. `/kitup`) |

After any change, **restart the backend**. Password special characters must be **URL-encoded** in the URI.

---

## Startup & collections

On boot the server:

1. Loads `backend/.env` via `config/env.js`
2. Connects with `MONGO_URI` (`config/database.js`)
3. **Creates collections if missing** and syncs indexes for: `users`, `carts`, `purchases`, `jerseys`
4. Listens on `PORT` (default **3009**)

MongoDB does not use SQL tables; Mongoose models map to **collections**. Empty collections are created before first document insert.

---

## Architecture

```
index.js          → start server
app.js            → express app + route mounts + errors
config/env.js     → MONGO_URI, JWT, Stripe
config/database.js → connect + ensureCollections()
Routes/*          → HTTP paths
Controllers/*     → business logic
Schemas/*         → Mongoose models
middleware/*      → auth, asyncHandler, errors
```

---

## API flows

### Health

| Method | Path | Flow |
|--------|------|------|
| GET | `/health` | `{ status: 'ok' }` — no DB |

---

### Auth — mount `/auth`

| Method | Path | Auth | Flow |
|--------|------|------|------|
| POST | `/auth/register` | No | Body: `name`, `email`, `password` → check email unique → bcrypt hash → create **User** (balance 1500) → **201** |
| POST | `/auth/login` | No | Body: `email`, `password` → verify → JWT (**7d**, `JWT_SECRET`) → **200** + `user` + `token` |
| GET | `/auth/me` | Bearer JWT | Resolve user → **200** `{ userId, name, email, balance }` (no password) |

**Frontend:** `Register.js`, `Login.js`  
**Not implemented:** password reset, logout endpoint

---

### Cart — mount `/api`

| Method | Path | Flow |
|--------|------|------|
| POST | `/api/cart/add` | Body: `userId`, `jerseyId`, `quantity`, `image`, `type`, `rating`, `price` → validate user → upsert line in **carts** (merge qty if same `jerseyId`) → **201** |
| GET | `/api/cart/:userId` | Load **carts** for user + **users.balance** → **200** `{ cartItems, userBalance }` |
| PATCH | `/api/cart/:itemId` | Body: `quantity` (≥ 1) → update line by Mongo `_id` → **200** |
| DELETE | `/api/remove/:itemId` | Delete cart line by `_id` → **200** |

**DB:** `carts` collection linked to `users` via `userId`.

**Frontend:** `Details.js` (add), `useFetchCart.js` (get). Wire PATCH/DELETE from cart UI when ready.

---

### Orders — mount `/order`

| Method | Path | Flow |
|--------|------|------|
| GET | `/order/myorders/:userId` | Verify user → **purchases** sorted newest first → **200** `{ orders }` |

**DB:** `purchases` collection.

**Frontend:** `Orders.js`

---

### Payment — mount `/api/payment`

| Method | Path | Flow |
|--------|------|------|
| POST | `/api/payment/create-payment-intent` | Body: `amount` (**cents**, min 50) → Stripe PaymentIntent → **200** `{ clientSecret }` |
| PUT | `/api/payment/purchase` | Body: `userId`, `cartItems[]` → sum prices → check **users.balance** → deduct balance → insert **purchases** → **delete all cart lines for user** → **200** + `balance` |

**Frontend:** `PaymentForm.js`  
**Note:** Checkout uses Stripe + wallet purchase; ensure frontend sends cents to Stripe and dollars (or consistent units) for purchase total.

---

### Clubs — mount `/api/clubs`

| Method | Path | Flow |
|--------|------|------|
| GET | `/api/clubs/search?q=` | Query substring match on in-memory `shared/clubs.js` → **200** array or **404** |

**Not in DB.** No POST/PUT for clubs yet.

---

### Static assets

| Method | Path | Flow |
|--------|------|------|
| GET | `/clubs/*` | Serve crest files from `backend/shared/clubs/` |

---

## Endpoint cheat sheet

```
GET    /health
POST   /auth/register
POST   /auth/login
GET    /auth/me                    Authorization: Bearer <token>

POST   /api/cart/add
GET    /api/cart/:userId
PATCH  /api/cart/:itemId
DELETE /api/remove/:itemId

GET    /order/myorders/:userId

POST   /api/payment/create-payment-intent
PUT    /api/payment/purchase

GET    /api/clubs/search?q=
GET    /clubs/*
```

---

## Collections (MongoDB)

| Collection | Model | Purpose |
|------------|--------|---------|
| `users` | User | Auth, wallet balance |
| `carts` | Cart | Shopping cart lines |
| `purchases` | Purchase | Order history |
| `jerseys` | Jersey | Schema only — **no HTTP routes yet** |

---

## Still missing (future)

- JWT on cart/orders/payment (today `userId` still sent in body/URL)
- Catalog CRUD: leagues, clubs, jerseys APIs
- Admin APIs (frontend admin uses localStorage)
- Password reset
- Stripe webhooks / payment history API separate from purchases

---

## MongoDB Atlas password

Cannot view old password. **Database Access** → user → **Edit Password** → update **`MONGO_URI`** in `backend/.env` → **Network Access** → allow IP → restart server.
