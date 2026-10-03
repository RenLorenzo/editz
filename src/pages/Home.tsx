import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { config } from "../config";

const Cta = () => <Link to="/slots" className="btn">Get started <span className="ar">→</span></Link>;

const STEPS = [
  ["01", "send", "send your footage and instructions."],
  ["02", "edit", "we handle the editing."],
  ["03", "publish", "you get finished shorts ready to post."],
];

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <Nav />

      <header className="hero glow relative flex min-h-screen flex-col items-center justify-center px-6 pb-16 pt-32 text-center">
        <h1 className="h1 rise">short-form<br />editing,<br />handled.</h1>
        <p className="rise mt-8 max-w-sm font-sans text-base leading-relaxed text-mute">send your footage and instructions.<br />we take care of the rest.</p>
        <div className="rise mt-9"><Cta /></div>
        <p className="rise label mt-8">youtube shorts · daily editing</p>
      </header>

      <section id="process" className="mx-auto max-w-4xl px-6 py-28 text-center md:py-40">
        <p className="label">how it works</p>
        <h2 className="h2 mt-6">simple on<br />your side.</h2>
        <div className="mt-16 rounded-[2rem] border border-line bg-white/50 px-6 text-left shadow-[0_30px_80px_-40px_rgba(23,23,23,.25)] md:mt-24 md:px-12">
          {STEPS.map(([n, t, d], k) => (
            <div key={n} className="relative grid items-baseline gap-3 py-9 md:grid-cols-12 md:gap-6 md:py-12">
              {k > 0 && <div className="absolute inset-x-0 top-0 h-px bg-line" />}
              <p className="label md:col-span-2">{n}</p>
              <h3 className="font-serif text-5xl leading-none md:col-span-5 md:text-6xl">{t}</h3>
              <p className="font-sans text-base text-mute md:col-span-5">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-4xl px-6 py-28 text-center md:py-40">
        <h2 className="h2">you focus on<br />the content.<br />we handle the<br />editing.</h2>
        <p className="mx-auto mt-10 max-w-sm font-sans text-base leading-relaxed text-mute">our team takes care of the editing workflow so you can keep creating.</p>
      </section>

      <section className="px-6 py-40 text-center md:py-56">
        <h2 className="h1">ready to<br />publish more?</h2>
        <p className="mx-auto mt-10 max-w-xs font-sans text-base leading-relaxed text-mute">send the footage.<br />we'll handle the rest.</p>
        <div className="mt-10"><Cta /></div>
      </section>

      <footer className="mx-auto flex max-w-5xl flex-col justify-between gap-8 border-t border-line px-6 py-12 md:flex-row md:px-10">
        <div>
          <p className="font-serif text-2xl leading-none">{config.agencyName}</p>
          <p className="mt-3 font-sans text-sm text-mute">short-form editing, handled.</p>
        </div>
        <div className="flex gap-8">
          <a href="#process" className="label hover:text-ink">Process</a>
          <Link to="/slots" className="label hover:text-ink">Get started</Link>
        </div>
      </footer>
    </div>
  );
}
