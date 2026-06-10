# Kanban Board

A small full-stack kanban board: Express + Prisma/PostgreSQL API in `server/`, React + Vite + MUI client in `web/`.

## Prerequisites

- Node.js (LTS) and npm
- Docker (for the local PostgreSQL database)

## 1. Clone the repo

```bash
git clone <repo-url>
cd kanban-board
```

## 2. Configure environment variables

Each app has its own `.env.example`. Copy them to `.env`:

```bash
cp server/.env.example server/.env
cp web/.env.example web/.env
```

`web/.env` works out of the box for local development — no changes needed.

`server/.env` needs three secrets generated before the API will start:
`JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, and `COOKIE_SECRET`. Generate a
random value for each (a long random hex string works well) and paste it in:

```bash
openssl rand -hex 32
```

Run this three times and put one value into each of `JWT_ACCESS_SECRET`,
`JWT_REFRESH_SECRET`, and `COOKIE_SECRET` in `server/.env`. Don't reuse the
same value for multiple secrets.

If you don't have `openssl`, you can use Node instead:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

The rest of `server/.env` (DB credentials, ports, `CLIENT_URL`) already has
sensible defaults for local development and can be left as-is.

## 3. Install dependencies

```bash
cd server && npm install
cd ../web && npm install --legacy-peer-deps
```

(`--legacy-peer-deps` is needed on `web` because of a peer-dependency version
mismatch between `typescript` and `openapi-typescript`.)

## 4. Start the database

From `server/`, start PostgreSQL via Docker Compose:

```bash
cd server
docker compose up -d
```

## 5. Run migrations and seed data

Still from `server/`:

```bash
npx prisma migrate deploy
npm run db:seed
```

This creates a test user (`test@example.com` / `Password123!`) with the
default TODO / IN_PROGRESS / DONE columns.

## 6. Run the apps

In two separate terminals:

```bash
# terminal 1
cd server && npm run dev

# terminal 2
cd web && npm run dev
```

- API: http://localhost:3000 (docs at http://localhost:3000/api/docs)
- Web: http://localhost:5173

## Quick start (alternative)

Once `server/.env` and `web/.env` are set up and dependencies are installed,
`./dev.sh` from the repo root will start the database, run migrations, and
launch both dev servers together (Ctrl+C to stop everything).

```bash
./dev.sh
```
