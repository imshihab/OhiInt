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
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");

        return res.status(200).json(siteData);
    } catch (error) {
        return res.status(500).json({
            error: "Failed to fetch data from database",
            details: error.message,
        });
    }
}
