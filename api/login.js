import { route, limit, redis, bcrypt, DUMMY_HASH, startSession, clean } from "./_lib.js";
export default route("POST", async (req, res) => {
  if (!(await limit(req, res, "auth"))) return;
  const email = clean(req.body?.email), password = String(req.body?.password || "");
  const user = await redis.get(`user:${email}`);
  const ok = await bcrypt.compare(password, user ? user.hash : DUMMY_HASH);
  if (!user || !ok) return res.status(401).json({ error: "wrong email or password" });
  startSession(res, email);
  res.json({ email });
});
