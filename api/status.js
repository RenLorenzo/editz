import { route, OPENS_AT, isOpen } from "./_lib.js";
export default route("GET", (_req, res) => res.json({ opensAt: OPENS_AT.toISOString(), open: isOpen() }));
