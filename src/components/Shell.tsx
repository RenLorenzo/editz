import type { ReactNode } from "react";
import Nav from "./Nav";

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <main className="glow relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32 text-center">
      <Nav home={false} />
      {children}
    </main>
  );
}
