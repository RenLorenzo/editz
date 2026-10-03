import { Link } from "react-router-dom";
import { config } from "../config";

export default function Nav({ home = true }: { home?: boolean }) {
  const a = "label !text-ink/70 transition-colors hover:!text-ink";
  return (
    <nav className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="pill flex w-full max-w-3xl items-center justify-between py-2 pl-6 pr-2">
        <Link to="/" className="font-serif text-2xl leading-none">{config.agencyName}</Link>
        <div className="flex items-center gap-6 md:gap-9">
          {home && <a href="#process" className={`${a} hidden md:block`}>Process</a>}
          {home && <a href="#about" className={`${a} hidden md:block`}>About</a>}
          <Link to="/login" className={a}>Login</Link>
          <Link to="/slots" className="btn !px-5 !py-3 !text-[11px]">Get started <span className="ar">→</span></Link>
        </div>
      </div>
    </nav>
  );
}
