import { route, endSession } from "./_lib.js";
export default route("POST", (_req, res) => { endSession(res); res.json({ ok: true }); });
