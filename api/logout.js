export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    res.setHeader(
        "Set-Cookie",
        "admin_session=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0",
    );

    return res.status(200).json({ ok: true });
}
