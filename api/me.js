import { route, sessionEmail, isOpen } from "./_lib.js";
export default route("GET", (req, res) => {
  const email = sessionEmail(req);
  email ? res.json({ email, open: isOpen() }) : res.status(401).json({ error: "not signed in" });
});
