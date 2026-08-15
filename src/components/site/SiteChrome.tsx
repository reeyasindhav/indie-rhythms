import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Pause, Play, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/lib/auth";
import { usePlayer } from "@/lib/player";
import { artists, releases } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Result = {
  kind: "release" | "artist";
  slug: string;
  title: string;
  subtitle: string;
  to: string;
  params?: Record<string, string>;
};

const nav = [
  { to: "/", label: "home" },
  { to: "/discover", label: "discover" },
  { to: "/radar", label: "release radar" },
  { to: "/artists", label: "artist spotlight" },
  { to: "/reviews", label: "reviews" },
] as const;

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const { current, playing, pause, play } = usePlayer();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const mobileNav: { to: string; label: string }[] = [
    ...nav,
    ...(user ? [{ to: "/profile", label: "my profile" }] : []),
    { to: "/submit", label: "submit music" },
  ];

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const out: Result[] = [];
    for (const r of releases) {
      if (
        r.title.toLowerCase().includes(q) ||
        r.artist.toLowerCase().includes(q) ||
        r.genre.toLowerCase().includes(q)
      ) {
        out.push({
          kind: "release",
          slug: r.slug,
          title: r.title,
          subtitle: `${r.artist} — ${r.genre}`,
          to: "/reviews/$slug",
          params: { slug: r.slug },
        });
      }
    }
    for (const a of artists) {
      if (
        a.name.toLowerCase().includes(q) ||
        a.genre.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q)
      ) {
        out.push({
          kind: "artist",
          slug: a.slug,
          title: a.name,
          subtitle: `${a.city} / ${a.genre}`,
          to: "/artists/$slug",
          params: { slug: a.slug },
        });
      }
    }
    return out.slice(0, 8);
  }, [query]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

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
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              placeholder="SEARCH"
              className="w-28 bg-transparent label outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="hidden md:inline-flex label rule-link text-muted-foreground"
          >
            <span className="inline-flex items-center gap-2">
              <Search className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">search</span>
              <kbd className="hidden xl:inline border border-ink/40 px-1 py-0.5 text-[0.6rem]">
                ⌘K
              </kbd>
            </span>
          </button>
          <Link to="/submit" className="label rule-link hidden md:inline-block">
            submit music ↗
          </Link>
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="label rule-link hidden sm:inline-block">
                {user.handle}
              </Link>
              <button
                onClick={() => setSignOutOpen(true)}
                className="label rule-link text-muted-foreground"
              >
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
          <button className="lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-ink/40 bg-background px-5 py-4 md:px-10">
          <div className="mx-auto max-w-[1600px]">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => {
                  if (!query) setSearchOpen(false);
                }}
                placeholder="Search releases, artists, genres..."
                className="flex-1 bg-transparent py-2 outline-none label placeholder:text-muted-foreground"
              />
              <button
                onClick={() => {
                  setQuery("");
                  setSearchOpen(false);
                }}
                className="label text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {results.length > 0 && (
              <ul className="mt-4 divide-y divide-ink/15">
                {results.map((item) => (
                  <li key={`${item.kind}-${item.slug}`}>
                    <Link
                      to={item.to as unknown as string}
                      params={item.params as unknown as Record<string, string>}
                      onClick={() => {
                        setQuery("");
                        setSearchOpen(false);
                      }}
                      className="flex items-center justify-between py-3 transition-colors hover:bg-ink hover:text-paper"
                    >
                      <span>
                        <span className="display text-lg uppercase">{item.title}</span>
                        <span className="ml-3 label text-muted-foreground">{item.subtitle}</span>
                      </span>
                      <span className="label opacity-70">{item.kind}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {query.length >= 2 && results.length === 0 && (
              <p className="mt-4 label text-muted-foreground">No matches in the crate.</p>
            )}
          </div>
        </div>
      )}

      <AlertDialog open={signOutOpen} onOpenChange={setSignOutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Sign out?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be signed out of your library and saved releases will no longer be synced
              until you sign back in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay signed in</AlertDialogCancel>
            <AlertDialogAction onClick={signOut}>Sign out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {open && (
        <nav className="border-t border-ink/40 bg-paper px-5 py-6 lg:hidden">
          {mobileNav.map((item, i) => (
            <Link
              key={item.to}
              to={item.to as "/"}
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
          <Link to="/terms" className="label rule-link">
            terms ↗
          </Link>
          <Link to="/privacy" className="label rule-link">
            privacy ↗
          </Link>
          <Link to="/about" className="label rule-link">
            about ↗
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function MiniPlayer() {
  const { current, playing, pause, play, stop } = usePlayer();
  if (!current) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-ink bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-5 py-3 md:px-10">
        <img src={current.cover} alt="" className="h-10 w-10 object-cover grayscale" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{current.title}</p>
          <p className="truncate label text-muted-foreground">{current.artist}</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => (playing ? pause() : play(current))}
            className="border border-ink px-3 py-2 label transition-colors hover:bg-acid hover:text-acid-foreground"
          >
            <span className="inline-flex items-center gap-2">
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {playing ? "Pause" : "Play"}
            </span>
          </button>
          <button type="button" onClick={stop} className="label text-muted-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
