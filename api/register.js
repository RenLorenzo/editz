import { randomUUID } from "node:crypto";
import { route, limit, redis, bcrypt, startSession, EMAIL, clean } from "./_lib.js";
export default route("POST", async (req, res) => {
  if (!(await limit(req, res, "auth"))) return;
  const email = clean(req.body?.email), password = String(req.body?.password || "");
  if (!EMAIL.test(email)) return res.status(400).json({ error: "enter a valid email address" });
  if (password.length < 8 || password.length > 100) return res.status(400).json({ error: "password must be 8+ characters" });
  const user = { id: randomUUID(), email, hash: await bcrypt.hash(password, 12), created: Date.now() };
  const created = await redis.set(`user:${email}`, user, { nx: true });
  if (!created) return res.status(409).json({ error: "an account with this email already exists" });
  startSession(res, email);
  res.json({ email });
});
