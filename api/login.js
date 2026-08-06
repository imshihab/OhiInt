import crypto from "crypto";

function hmac(secret, message) {
  return crypto.createHmac("sha256", secret).update(message).digest("hex");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  if (
    username !== process.env.ADMIN_USER ||
    password !== process.env.ADMIN_PASS
  ) {
    return res.status(401).json({
      error: "Invalid credentials",
    });
  }

  const exp = Date.now() + 1000 * 60 * 60 * 8; // 8 hours
  const payload = `${username}.${exp}`;
  const sig = hmac(process.env.SESSION_SECRET, payload);
  const token = `${payload}.${sig}`;

  res.setHeader(
    "Set-Cookie",
    `admin_session=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${
      60 * 60 * 8
    }; Secure`,
  );

  return res.status(200).json({
    ok: true,
  });
}
