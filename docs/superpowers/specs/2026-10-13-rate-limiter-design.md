# Rate Limiter — Design Doc

Date: 2026-10-13
Repo: `tutainvoice-backend/`
Approach: A — `hono/rate-limiter` di route groups (dipilih user; hand-rolled / reverse-proxy ditolak: YAGNI / out of scope)

## 1. Keputusan

- Storage: in-memory bawaan `hono/rate-limiter` (single instance, tanpa infra baru)
- Scope: semua route API kecuali `/health` (health-check bebas untuk docker/monitoring)
- Limit: 1000 request per 60 detik per IP, dev-friendly

## 2. Implementasi

File baru `src/middleware/rate-limit.ts`: export `rateLimit(options?: { windowMs?: number; limit?: number })` dengan default `windowMs: 60_000`, `limit: 1000` sebagai named constants. Key per IP, `standardHeaders: true`, 429 balas JSON `{ error: 'Too many requests' }`. Parameter override hanya untuk test — bukan env var (YAGNI).

Wiring: `src/routes/index.ts` panggil `app.use(rateLimit())` sebelum mount controllers. `/health` didefinisikan di root `src/app.ts`, di luar `createRoutes()`, jadi otomatis bebas limit. Tanpa dependensi baru (`hono/rate-limiter` ships dengan hono 4.x).

## 3. Testing

`tests/middleware/rate-limit.test.ts`: mount limiter `limit: 2` di Hono app test — request ke-3 assert 429 + body JSON + header `RateLimit-Limit`. Test exclusion: 5 hit beruntun ke `/health` di app asli assert tetap 200.

## 4. Kriteria sukses

`pnpm test` hijau, `pnpm typecheck` bersih. Exceed limit → 429 JSON + headers. `/health` tidak pernah kena limit.

## Non-goals

Redis-backed limiter, per-route limit berbeda, env-var config untuk angka limit (tahap berikut jika perlu).
