import crypto from "crypto";
import { createClient } from "@libsql/client";

const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

function hmac(secret, message) {
    return crypto.createHmac("sha256", secret).update(message).digest("hex");
}

async function isAuthenticated(req) {
    const cookie = req.headers.cookie || "";
    const match = cookie.match(/admin_session=([^;]+)/);

    if (!match) return false;

    const token = match[1];
    const parts = token.split(".");

    if (parts.length !== 3) return false;

    const [username, expStr, sig] = parts;
    const exp = Number(expStr);

    if (!exp || exp < Date.now()) return false;

    const expected = hmac(process.env.SESSION_SECRET, `${username}.${expStr}`);

    return expected === sig;
}

export default async function handler(req, res) {
    if (req.method === "GET") {
        const authed = await isAuthenticated(req);
        return res.status(200).json({ authenticated: authed });
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    if (!(await isAuthenticated(req))) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const { section, data } = req.body;

    if (!section || data === undefined || data === null) {
        return res.status(400).json({
            error: "Invalid payload. 'section' and 'data' are required.",
        });
    }

    try {
        // Fetch current JSON
        const result = await db.execute(
            "SELECT data FROM site_content WHERE id = ?",
            [1],
        );

        let merged = {};

        if (result.rows.length > 0) {
            try {
                merged = JSON.parse(result.rows[0].data);
            } catch {
                merged = {};
            }
        } else {
            await db.execute({
                sql: "INSERT INTO site_content (id, data) VALUES (?, ?)",
                args: [1, "{}"],
            });
        }

        // Update only the requested section
        merged[section] = data;

        await db.execute({
            sql: `
                UPDATE site_content
                SET data = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `,
            args: [JSON.stringify(merged), 1],
        });

        res.setHeader("Cache-Control", "no-store");

        return res.status(200).json({
            ok: true,
            section,
            message: "Successfully updated.",
        });
    } catch (err) {
        return res.status(500).json({
            ok: false,
            error: err.message || String(err),
        });
    }
}
