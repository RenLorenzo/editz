import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Shell from "../components/Shell";
import { api } from "../api";

type Status = { opensAt: string; open: boolean };

function Countdown({ to }: { to: number }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const s = Math.max(0, Math.floor((to - now) / 1000));
  const parts: [number, string][] = [[Math.floor(s / 86400), "days"], [Math.floor(s / 3600) % 24, "hours"], [Math.floor(s / 60) % 60, "minutes"], [s % 60, "seconds"]];
  return (
    <div className="mt-10 grid w-full max-w-xl grid-cols-4 rounded-[1.5rem] border border-line bg-white/50 py-6 shadow-[0_30px_80px_-40px_rgba(23,23,23,.25)]">
      {parts.map(([n, l], i) => (
        <div key={l} className={i ? "border-l border-line" : ""}>
          <p className="font-serif text-4xl tabular-nums md:text-6xl">{String(n).padStart(2, "0")}</p>
          <p className="label mt-2 !text-[9px] md:!text-[11px]">{l}</p>
        </div>
      ))}
    </div>
  );
}

export default function Slots() {
  const [st, setSt] = useState<Status | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => { api<Status>("/api/status").then(setSt).catch(() => setErr("couldn't reach the server")); }, []);

  const open = st ? st.open || Date.parse(st.opensAt) <= Date.now() : false;
  return (
    <Shell>
      <p className="label">Client availability</p>
      <h1 className="h2 mt-6">{open ? <>slots are<br />open</> : <>our next<br />opening</>}</h1>
      {st && !open && <Countdown to={Date.parse(st.opensAt)} />}
      {st && !open && <p className="mt-8 font-sans text-sm text-mute">{new Date(st.opensAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}. client slots are currently closed.</p>}
      <Link to={open ? "/login?mode=register" : "/login"} className="btn mt-10">{open ? "Create your account" : "Sign in"} <span className="ar">→</span></Link>
      {!open && <p className="mt-6 font-sans text-sm text-mute">new here? <Link to="/login?mode=register" className="text-ink underline underline-offset-4">create an account</Link></p>}
      {err && <p className="mt-4 font-sans text-sm text-accent" role="alert">{err}</p>}
    </Shell>
  );
}
