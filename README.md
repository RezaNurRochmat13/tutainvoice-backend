# tutainvoice-backend

Backend API untuk Tuta Invoice Generator. Hono + Prisma + PostgreSQL.

## Stack

- Node >= 20, pnpm
- Hono 4 (HTTP framework)
- Prisma 5 + PostgreSQL 16 (ORM + database)
- Zod (validasi env)
- Vitest (test), TypeScript strict

## Struktur

```
├── prisma/schema.prisma      # schema: stores, customers, invoices, invoice_items
├── src/
│   ├── index.ts              # entry point (serve di PORT)
│   ├── app.ts                # Hono app factory
│   ├── routes/               # mount controllers
│   ├── controllers/          # HTTP handlers (stores, customers, invoices)
│   ├── services/             # akses DB via prisma
│   └── config/               # validasi env (zod) + PrismaClient singleton
├── tests/                    # mirror src: app, config
├── docker-compose.yml        # postgres + app
└── Dockerfile
```

## Setup lokal

```bash
# 1. DB
docker compose up -d db

# 2. Install + siapkan schema
pnpm install
pnpm prisma:push

# 3. Jalan
pnpm dev   # http://localhost:3000/health
```

Env (lihat `.env.example`): `DATABASE_URL`, `PORT` (default 3000), `NODE_ENV`.

## Scripts

| Script            | Keterangan                          |
| ----------------- | ----------------------------------- |
| `pnpm dev`        | dev server (tsx watch)              |
| `pnpm build`      | compile src ke dist (tanpa test)    |
| `pnpm start`      | jalan dist                          |
| `pnpm test`       | vitest (tests/)                     |
| `pnpm typecheck`  | tsc --noEmit (src + tests)          |
| `pnpm prisma:push`| sinkron schema ke DB (dev)          |
| `pnpm prisma:studio` | GUI database                     |

## API

| Method | Path            | Status      |
| ------ | --------------- | ----------- |
| GET    | `/health`       | ok          |
| GET    | `/stores`       | list/get ok, create/update/delete 501 |
| GET    | `/customers`    | sama        |
| GET    | `/invoices`     | sama (include items) |

CRUD penuh (`POST`/`PUT`/`DELETE`) belum diimplementasi — masih 501.
