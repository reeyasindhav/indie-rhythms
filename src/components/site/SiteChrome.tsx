import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "home" },
  { to: "/discover", label: "discover" },
  { to: "/radar", label: "release radar" },
  { to: "/artists", label: "artist spotlight" },
  { to: "/reviews", label: "reviews" },
] as const;

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-ink/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 py-4 md:px-10">
        <Link to="/" className="display text-xl tracking-[0.08em]">
          PITCHFORK<span className="text-acid">_</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "label rule-link lowercase tracking-[0.2em]",
                pathname === item.to && "text-foreground after:scale-x-100",
                pathname !== item.to && "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-2 border-b border-ink/40 pb-1 md:flex">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              placeholder="SEARCH"
              className="w-28 bg-transparent label outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Link to="/submit" className="label rule-link hidden md:inline-block">
            submit music ↗
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="label rule-link hidden sm:inline-block">
                {user.handle}
              </Link>
              <button onClick={signOut} className="label rule-link text-muted-foreground">
                sign out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="border border-ink bg-ink px-3 py-2 label text-paper transition-colors hover:bg-acid hover:text-acid-foreground"
            >
              sign in
            </Link>
          )}
          <button
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-ink/40 bg-paper px-5 py-6 lg:hidden">
          {[...nav, { to: "/submit", label: "submit music" } as const].map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block py-3 display text-3xl uppercase"
              style={{ animation: `slide-in 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 45}ms both` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/70 px-5 py-6 md:px-10">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <span className="label text-muted-foreground">
          PITCHFORK_ / INDEPENDENT MUSIC FROM INDIA
        </span>
        <span className="label text-muted-foreground">BUILT FOR THE CURIOUS. EST. 2026.</span>
        <div className="flex gap-6">
          <a href="https://instagram.com" className="label rule-link">
            instagram ↗
          </a>
          <Link to="/submit" className="label rule-link">
            contact ↗
          </Link>
        </div>
      </div>
    </footer>
  );
}
