# Vercel Deployment Guide — OHI International (React + Turso DB)

This guide walks through deploying the **OHI International** project to **Vercel**. The app is a React 19 SPA (Vite + Tailwind v4) with serverless API routes (`/api/*.js`) that connect to a **Turso** (libSQL) database.

The frontend ships from Vite (`dist/`) and the API routes run as Vercel Serverless Functions. The Turso database holds the entire site content as a single JSON blob in the `site_content` table.

---

## 1. Project Overview

| Layer    | Tech                                                            |
| -------- | --------------------------------------------------------------- |
| Frontend | React 19, Vite 8, Tailwind 4, react-router 8, framer-motion 12 |
| Backend  | Vercel Serverless Functions (`/api/*.js`)                       |
| Database | Turso (libSQL) via `@libsql/client`                             |
| Auth     | HMAC-signed `admin_session` cookie (8 h expiry)                 |

### API surface

| Route        | Methods        | Purpose                                | Auth          |
| ------------ | -------------- | -------------------------------------- | ------------- |
| `/api/read`  | `GET`          | Returns the full `site_content.data`   | Public        |
| `/api/login` | `POST`         | Sets `admin_session` cookie            | Admin creds   |
| `/api/logout`| `POST`         | Clears `admin_session` cookie          | Public        |
| `/api/update`| `GET`, `POST`  | `GET` → auth status, `POST` → section write | Session cookie |

---

## 2. Prerequisites

- **Node.js 18+** (Vite 8 and React 19 require modern Node)
- A **GitHub** account (used as the Vercel source)
- A **Vercel** account (https://vercel.com)
- A **Turso** account (https://turso.tech) and the `turso` CLI
- The **Vercel CLI** (optional but recommended):
  ```bash
  npm i -g vercel
  ```

### Install the Turso CLI

```bash
# macOS / Linux
curl -sSfL https://get.tur.so/install.sh | bash

# or via Homebrew
brew install tursodatabase/tap/turso

turso auth login
```

Verify everything:

```bash
node -v
npm -v
vercel --version
turso --version
```

---

## 3. Create / Configure the Turso Database

You can use an existing database or create a new one.

### 3.1 Create the DB

```bash
turso db create ohi-int
turso db list
```

### 3.2 Capture the URL

```bash
turso db show ohi-int --url
```

It returns something like:

```
libsql://ohi-int-<your-org>.turso.io
```

### 3.3 Generate an auth token

```bash
turso db tokens create ohi-int
```

> The token is shown **once** — copy it immediately.

---

## 4. Apply the Schema (`schema.sql`)

The schema drops and recreates `site_content` and seeds it with the site JSON.

```bash
turso db shell ohi-int < schema.sql
```

Verify:

```bash
turso db shell ohi-int
```

```sql
.tables
.schema site_content
SELECT id, length(data) AS bytes, updated_at FROM site_content WHERE id = 1;
```

You should see one row with a non-zero `bytes` value.

> Note: re-running `schema.sql` will **drop** the table and reseed. For content changes, prefer the in-app admin editor (which calls `/api/update`).

---

## 5. Local Environment Variables

Create `.env` in the project root (already in `.gitignore`):

```env
# Turso (libSQL)
TURSO_DATABASE_URL=libsql://ohi-int-<your-org>.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOi...   # paste token from step 3.3

# Admin auth
ADMIN_USER=your_admin
ADMIN_PASS=your_strong_password
SESSION_SECRET=any_long_random_string_at_least_32_chars
```

> `.env` is ignored by git and by Vercel's build — it is only used locally.

---

## 6. Run Locally

### Option A — Vite frontend only (UI on `:5173`)

```bash
npm install
npm run dev
```

Calls to `/api/*` will be proxied to `http://127.0.0.1:3000` (see `vite.config.js`), so you also need:

```bash
vercel dev
```

in a second terminal to serve the functions.

### Option B — Full Vercel runtime (frontend + API on `:3000`)

```bash
npm install
vercel dev
```

Then open:

- Frontend:   http://localhost:3000
- Health:     http://localhost:3000/api/read
- Admin:      http://localhost:3000/admin/login

### Build

```bash
npm run build   # produces dist/ for production
```

---

## 7. Configure Vercel

### 7.1 Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

`node_modules`, `dist`, `.env*`, `.vercel`, `.wrangler` are all excluded via `.gitignore`.

### 7.2 Import the Project in Vercel

1. Go to https://vercel.com/new
2. Import the GitHub repo
3. Vercel will auto-detect **Vite**:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Leave the defaults; the `/api/*.js` folder is automatically picked up as Serverless Functions.
5. **Do not deploy yet** — first add environment variables.

### 7.3 Add Environment Variables (Vercel dashboard)

Project Settings → **Environment Variables**, add for **Production** (and Preview if you want):

| Key                   | Value                                    |
| --------------------- | ---------------------------------------- |
| `TURSO_DATABASE_URL`  | `libsql://ohi-int-<org>.turso.io`        |
| `TURSO_AUTH_TOKEN`    | the token from `turso db tokens create`  |
| `ADMIN_USER`          | your admin username                      |
| `ADMIN_PASS`          | a strong password                        |
| `SESSION_SECRET`      | a long random string                     |

Equivalently via CLI:

```bash
vercel env add TURSO_DATABASE_URL production
vercel env add TURSO_AUTH_TOKEN production
vercel env add ADMIN_USER production
vercel env add ADMIN_PASS production
vercel env add SESSION_SECRET production
```

### 7.4 (Optional) `vercel.json`

A minimal config for SPA routing + cached static assets (drop in project root if needed):

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

The rewrite lets the React Router handle unknown paths (admin editor expects client routes like `/admin/login`).

---

## 8. Deploy

### First deploy — Vercel dashboard

Click **Deploy**. The first build typically takes 60–90 seconds.

### Subsequent deploys

Just push to `main` (or any enabled branch):

```bash
git add .
git commit -m "Update something"
git push
```

Vercel auto-builds and creates a unique preview URL for every branch / PR.

### CLI deploy

```bash
vercel          # preview deployment
vercel --prod   # production deployment
```

---

## 9. Smoke-Test the Deployment

After the build succeeds:

1. Open `https://<your-app>.vercel.app/` — the landing page should render.
2. Open `https://<your-app>.vercel.app/api/read` — should return JSON (the seed content).
3. Open `https://<your-app>.vercel.app/admin/login` and log in with `ADMIN_USER` / `ADMIN_PASS`.
4. Edit a section in the admin editor and save — the public page should refresh with the change on next request.

---

## 10. How the Pieces Connect at Runtime

```
┌──────────────────────────┐         ┌───────────────────────────┐
│  Vercel Static / SPA     │         │  Vercel Serverless        │
│  (dist/)                 │         │  (/api/*.js)              │
│                          │  /api/* │                           │
│  React 19 + Tailwind 4   ├────────►│  read / login / logout /  │
│  React Router 8          │         │  update (Turso client)    │
└──────────────────────────┘         └─────────────┬─────────────┘
                                                     │ libSQL/HTTPS
                                                     ▼
                                          ┌───────────────────────┐
                                          │  Turso                │
                                          │  site_content (JSON)  │
                                          └───────────────────────┘
```

- The SPA is served from `dist/`.
- `/api/*` are serverless functions: each request creates a fresh invocation, and the `@libsql/client` connects outbound over HTTPS to Turso.
- `admin_session` is a signed cookie (`HMAC-SHA256`) and is the only mechanism protecting write endpoints.

---

## 11. Content Management Workflow

There are three ways to change site content in production:

### A. Admin editor (recommended)

1. Visit `/admin/login` on your Vercel deployment.
2. Sign in with `ADMIN_USER` / `ADMIN_PASS`.
3. Edit sections; each save calls `POST /api/update` which merges and re-stores the JSON blob in Turso.

### B. Re-seed from `schema.sql`

```bash
turso db shell ohi-int < schema.sql
```

> ⚠️ Drops and recreates `site_content`. Use only when you want a clean reset.

### C. Direct SQL update

```bash
turso db shell ohi-int
```

```sql
UPDATE site_content
SET data = '{"siteTitle":"OHI International"}',
    updated_at = CURRENT_TIMESTAMP
WHERE id = 1;
```

---

## 12. Useful Commands Cheat-Sheet

```bash
# Turso
turso db list
turso db show ohi-int --url
turso db shell ohi-int
turso db shell ohi-int < schema.sql
turso db tokens create ohi-int
turso db tokens invalidate ohi-int
turso db destroy ohi-int        # irreversible

# Vercel
vercel login
vercel link
vercel dev
vercel env ls
vercel env add KEY production
vercel
vercel --prod
vercel logs                    # tail runtime logs
vercel inspect <deployment>
```

---

## 13. Troubleshooting

| Symptom                                                | Likely cause                                                        | Fix                                                                                                |
| ------------------------------------------------------ | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `/api/read` returns `{ error: "Failed to fetch ..." }` | Missing/wrong `TURSO_DATABASE_URL` or `TURSO_AUTH_TOKEN`            | Re-check env vars in Vercel dashboard, redeploy                                                    |
| `SQLITE_AUTH: not authorized`                          | Bad/expired token                                                   | `turso db tokens create ohi-int` and update `TURSO_AUTH_TOKEN` env, redeploy                      |
| API returns `{}` (empty object)                        | Seed row missing                                                    | Re-run `turso db shell ohi-int < schema.sql`                                                       |
| `Cannot find module @libsql/client` at runtime         | Edge / wrong preset                                                 | Ensure functions run on Node runtime (Vercel auto-detects; no `@vercel/postgres`/Edge config used) |
| Login works but `POST /api/update` returns 401         | Cookie not sent cross-site / `Secure` flag on http preview          | Preview URLs use https, but if testing over `http://localhost:3000` the `Secure` cookie is dropped — use `https://` preview URL or temporarily remove `Secure` for local dev |
| Admin saves don't show on public page                  | Browser/CDN cache                                                   | `Cache-Control: no-store` is set; force-refresh (Ctrl/Cmd+Shift+R)                                  |
| Build fails: `Cannot find package`                     | Lockfile out of sync                                                | `rm -rf node_modules package-lock.json && npm install` then redeploy                              |
| React Router 404 on `/admin/login` after refresh       | SPA rewrites missing                                                | Add `vercel.json` rewrite so unknown paths fall through to `/`                                     |

---

## 14. Security Notes

- `SESSION_SECRET` should be a long random string (32+ chars). Rotate by replacing the env var and redeploying — all existing sessions invalidate.
- `ADMIN_PASS` is sent over HTTPS only; the `Secure` cookie attribute ensures it is never sent over plain HTTP in production.
- `login.js` and `update.js` currently have **no rate limiting**. Consider putting Vercel in front of a rate-limited proxy or adding per-IP throttling inside the functions if abuse is a concern.
- The `Secure` flag on the session cookie means **local `http://` previews won't retain the session** — use the Vercel-provided `https://` preview URLs instead.
- Keep `.env` out of git. The repo already has `.env*` in `.gitignore`.

---

## 15. Quick Recap

1. Install Vercel + Turso CLIs.
2. `turso db create ohi-int` → `turso db tokens create ohi-int`.
3. `turso db shell ohi-int < schema.sql` to seed.
4. Add `.env` with `TURSO_*`, `ADMIN_USER`, `ADMIN_PASS`, `SESSION_SECRET`.
5. `npm install` (locally, optional).
6. Push the repo to GitHub.
7. Import the repo in Vercel, set the five env vars for Production.
8. Deploy → open `/` and `/admin/login`.
9. Manage content via the admin editor (recommended) or by re-seeding `schema.sql`.

---

## 16. Local Files at a Glance

```
.
├── api/                       # Vercel Serverless Functions
│   ├── read.js                # GET  /api/read     (public)
│   ├── login.js               # POST /api/login    (admin creds)
│   ├── logout.js              # POST /api/logout   (clears cookie)
│   └── update.js              # GET/POST /api/update (session-protected)
├── public/                    # Static assets (logo, video, etc.)
├── src/
│   ├── api/
│   │   ├── content.js         # fetch("/api/read")
│   │   └── admin.js           # fetch("/api/login|logout|update")
│   ├── components/            # Hero, Navbar, Footer, About, …
│   ├── hooks/useContent.js    # React hook around getContent()
│   ├── pages/                 # Landing, AdminLogin, AdminEditor, NotFound
│   ├── App.jsx                # <BrowserRouter> + <Routes>
│   ├── main.jsx               # ReactDOM.createRoot
│   └── index.css              # Tailwind v4 entry
├── schema.sql                 # Turso schema + seed JSON
├── index.html                 # Vite HTML entry
├── vite.config.js             # React + Tailwind plugins; /api proxy to :3000
├── package.json               # scripts: dev, build, preview, lint
├── .env                       # LOCAL only (gitignored)
├── .gitignore                 # ignores node_modules, dist, .env*, .vercel, .wrangler
└── vercel.json                # (optional) SPA rewrites + asset caching
```

---

## 17. What Changes vs. Cloudflare Pages

The repo's original `README.md` describes a Cloudflare Pages setup with Wrangler. The codebase does not use any Cloudflare-specific APIs — the same `/api/*.js` files work on **both** platforms:

- **Runtime:** Vercel uses Node.js Serverless Functions; Cloudflare Pages would use Workers.
- **Local dev:** `vercel dev` instead of `wrangler pages dev dist`.
- **Secrets:** configured in Vercel dashboard instead of `wrangler secret put` / `.dev.vars`.

If you later want to move back to Cloudflare, the only changes are local-dev tooling and where secrets are stored — the source code stays the same.
