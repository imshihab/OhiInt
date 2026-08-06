# TursoDB + Vercel API — Working Instructions

This project uses **Turso** (libSQL) as the database, accessed from serverless API routes (`/api/*.js`) deployed on Vercel. The `site_content` table stores the entire site as a single JSON blob in row `id = 1`. The frontend reads it via `GET /api/read`.

---

## 1. Prerequisites

- Node.js 18+
- A Turso account: https://turso.tech
- The `turso` CLI installed
- Vercel CLI (optional, for deploying): `npm i -g vercel`

Install the Turso CLI:

```bash
# macOS / Linux
curl -sSfL https://get.tur.so/install.sh | bash

# or via Homebrew
brew install tursodatabase/tap/turso
```

Log in:

```bash
turso auth login
```

---

## 2. Create / Find Your Database

```bash
# Create a new DB (skip if you already have one)
turso db create ohi-int

# List your databases
turso db list

# Get the connection URL (libsql://...)
turso db show ohi-int --url
```

You'll get something like:

```
libsql://ohi-int-<your-org>.turso.io
```

Create an auth token for the app:

```bash
turso db tokens create ohi-int
```

Copy the token — it is shown **only once**.

---

## 3. Configure Environment Variables

Create or update `.env` in the project root:

```env
TURSO_DATABASE_URL=libsql://ohi-int-<your-org>.turso.io
TURSO_AUTH_TOKEN=eyJhbGciOi...   # paste token from step 2

# Auth (used by /api/login.js)
ADMIN_USER=your_admin
ADMIN_PASS=your_strong_password
SESSION_SECRET=any_long_random_string
```

For Vercel, add the same keys:

```bash
vercel env add TURSO_DATABASE_URL production
vercel env add TURSO_AUTH_TOKEN production
vercel env add ADMIN_USER production
vercel env add ADMIN_PASS production
vercel env add SESSION_SECRET production
```

---

## 4. Apply the Schema (create the table)

There are two ways to run `schema.sql` against Turso.

### Option A — Using the Turso CLI (recommended)

```bash
# Open a SQLite-compatible shell on the remote DB
turso db shell ohi-int < schema.sql
```

This will:

1. `DROP TABLE IF EXISTS site_content;`
2. `CREATE TABLE site_content (id, data, updated_at);`
3. `INSERT` the seed JSON into `id = 1`.

### Option B — Using the libSQL client (Node one-liner)

```bash
node -e "
import('@libsql/client').then(async ({ createClient }) => {
  const fs = await import('fs');
  const sql = fs.readFileSync('schema.sql', 'utf8');
  const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  await db.execute(sql);
  console.log('Schema applied.');
});
"
```

### Option C — Inside the Turso shell, statement by statement

```bash
turso db shell ohi-int
```

Then paste:

```sql
.read schema.sql
```

or run the statements inline. Exit with `.quit`.

---

## 5. Verify the Schema Was Applied

```bash
turso db shell ohi-int
```

```sql
.tables
.schema site_content
SELECT id, length(data) AS bytes, updated_at FROM site_content WHERE id = 1;
```

You should see one row with a non-zero `bytes` value.

---

## 6. Run the App Locally

```bash
npm install
npm run dev
```

The Vite dev server runs the React frontend. The `/api/*` routes run via Vercel's dev runtime.

To test the API routes locally with Vercel's runtime:

```bash
vercel dev
```

Then open:

```
http://localhost:3000/api/read
```

You should get back the JSON blob from `site_content.data`.

---

## 7. How `api/read.js` Works

```js
import { createClient } from "@libsql/client";

const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const result = await db.execute(
            "SELECT data FROM site_content WHERE id = ?",
            [1],
        );

        const row = result.rows[0];
        const siteData = row?.data ? JSON.parse(row.data) : {};

        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
        return res.status(200).json(siteData);
    } catch (error) {
        return res.status(500).json({
            error: "Failed to fetch data from database",
            details: error.message,
        });
    }
}
```

- Read-only endpoint.
- Returns the JSON stored in `site_content.data` for `id = 1`.
- Always sends no-cache headers so the frontend always gets fresh data.

---

## 8. Updating Content (the "Write" side)

The current `read.js` is **read-only**. To change DB content, you have three options:

### A. Edit `schema.sql` and re-seed

```bash
# Update schema.sql, then:
turso db shell ohi-int < schema.sql
```

⚠️ This **drops and recreates** the table — fine for one-row dev data, destructive elsewhere.

### B. Add a `write.js` API endpoint

Create `api/write.js`:

```js
import { createClient } from "@libsql/client";

const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    // TODO: check auth (cookies, session, etc.) before allowing writes

    try {
        const json = JSON.stringify(req.body);
        await db.execute({
            sql: "UPDATE site_content SET data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = 1",
            args: [json],
        });
        return res.status(200).json({ ok: true });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
```

### C. Update directly from the shell

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

## 9. Useful Turso CLI Commands

```bash
turso db list                       # all your DBs
turso db show ohi-int               # info about one DB
turso db shell ohi-int              # open SQL shell
turso db tokens create ohi-int      # create a new auth token
turso db tokens invalidate ohi-int  # rotate tokens
turso db destroy ohi-int            # delete the DB (irreversible)
```

---

## 10. Troubleshooting

| Symptom                                               | Likely cause                                             | Fix                                                        |
| ----------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------- |
| `Failed to fetch data from database` from `/api/read` | Missing/wrong `TURSO_DATABASE_URL` or `TURSO_AUTH_TOKEN` | Re-check `.env`, then redeploy                             |
| `SQLITE_AUTH: not authorized`                         | Bad/expired token                                        | `turso db tokens create ohi-int` and update env            |
| Empty object `{}` returned                            | Row `id = 1` missing or `data` is null                   | Re-run `schema.sql` (Step 4)                               |
| `Cannot find module @libsql/client`                   | Deps not installed                                       | `npm install`                                              |
| CORS error in browser                                 | API not on same origin                                   | Hit `/api/read` via the deployed URL, not a different host |

---

## 11. Quick Recap

1. `turso db create ohi-int`
2. `turso db tokens create ohi-int` → copy token
3. Put `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN` in `.env`
4. `turso db shell ohi-int < schema.sql` — seeds the table
5. `npm run dev` (frontend) or `vercel dev` (frontend + API)
6. `GET /api/read` returns the site JSON
7. Edit `schema.sql` (or add a write endpoint) to change content
