import { Redis } from "@upstash/redis";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN,
});
export const OPENS_AT = new Date(process.env.OPENS_AT || "2026-10-09T00:00:00Z");
export const isOpen = () => Date.now() >= OPENS_AT.getTime();
export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const clean = (v) => String(v || "").trim().toLowerCase().slice(0, 254);
export const DUMMY_HASH = bcrypt.hashSync("x", 10);
export { bcrypt };

export const route = (method, fn) => async (req, res) => {
  if (req.method !== method) { res.setHeader("Allow", method); return res.status(405).json({ error: "method not allowed" }); }
  try { await fn(req, res); } catch (e) { console.error(e); res.status(500).json({ error: "server error, try again" }); }
};

export async function limit(req, res, name, max = 20) {
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "local";
  const key = `rl:${name}:${ip}`;
  const n = await redis.incr(key);
  if (n === 1) await redis.expire(key, 900);
  if (n > max) { res.status(429).json({ error: "too many attempts, try again in a few minutes" }); return false; }
  return true;
}

export function startSession(res, email) {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.setHeader("Set-Cookie", `sid=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=604800${process.env.VERCEL ? "; Secure" : ""}`);
}
export const endSession = (res) => res.setHeader("Set-Cookie", "sid=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0");
export function sessionEmail(req) {
  try { return jwt.verify(req.cookies?.sid || "", process.env.JWT_SECRET).email; } catch { return null; }
}
