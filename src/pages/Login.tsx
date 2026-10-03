import { FormEvent, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Shell from "../components/Shell";
import { api } from "../api";

export default function Login() {
  const [params, setParams] = useSearchParams();
  const register = params.get("mode") === "register";
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setErr("");
    try { await api(register ? "/api/register" : "/api/login", { email, password }); nav("/account"); }
    catch (x) { setErr((x as Error).message); setBusy(false); }
  }

  return (
    <Shell>
      <h1 className="h2">{register ? "create account" : "sign in"}</h1>
      <form onSubmit={submit} className="mt-10 flex w-full max-w-sm flex-col gap-3">
        <input className="field" type="email" required autoComplete="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="field" type="password" required minLength={register ? 8 : 1} autoComplete={register ? "new-password" : "current-password"} placeholder={register ? "password (8+ characters)" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn mt-2 justify-center" disabled={busy}>{busy ? "One moment" : register ? "Create account" : "Sign in"} <span className="ar">→</span></button>
        {err && <p className="font-sans text-sm text-accent" role="alert">{err}</p>}
      </form>
      <p className="mt-8 font-sans text-sm text-mute">
        {register ? "have an account? " : "new here? "}
        <button className="text-ink underline underline-offset-4" onClick={() => setParams(register ? {} : { mode: "register" })}>{register ? "sign in" : "create an account"}</button>
      </p>
      <Link to="/" className="label mt-8 hover:text-ink">Back to home →</Link>
    </Shell>
  );
}
