import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Shell from "../components/Shell";
import { api } from "../api";

export default function Account() {
  const nav = useNavigate();
  const [me, setMe] = useState<{ email: string; open: boolean } | null>(null);

  useEffect(() => { api<{ email: string; open: boolean }>("/api/me").then(setMe).catch(() => nav("/login")); }, [nav]);

  async function out() { await api("/api/logout", {}); nav("/"); }
  if (!me) return <Shell><p className="label">Loading</p></Shell>;
  return (
    <Shell>
      <p className="label">Signed in</p>
      <h1 className="h2 mt-6">{me.email}</h1>
      <p className="mt-8 max-w-sm font-sans text-base leading-relaxed text-mute">
        {me.open ? "client slots are open. send us your footage and instructions to get started." : "your account is ready. client slots are currently closed."}
      </p>
      <button onClick={out} className="btn mt-10">Sign out <span className="ar">→</span></button>
    </Shell>
  );
}
