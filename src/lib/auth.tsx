import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

// Client-side mock session (no backend). Persisted in localStorage so the
// gated dashboard/library routes behave like a real signed-in experience.
export type SessionUser = {
  name: string;
  email: string;
  handle: string;
  city: string;
};

type AuthValue = {
  user: SessionUser | null;
  ready: boolean;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  saved: string[];
  toggleSaved: (slug: string) => void;
};

const KEY = "pitchfork_session";
const SAVED_KEY = "pitchfork_saved";

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw) as SessionUser);
      const rawSaved = localStorage.getItem(SAVED_KEY);
      if (rawSaved) setSaved(JSON.parse(rawSaved) as string[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const signIn = useCallback((email: string, name?: string) => {
    const handle = email.split("@")[0] || "listener";
    const next: SessionUser = {
      email,
      name: name?.trim() || handle.replace(/[._-]/g, " "),
      handle: `@${handle}`,
      city: "New Delhi",
    };
    localStorage.setItem(KEY, JSON.stringify(next));
    setUser(next);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(KEY);
    setUser(null);
  }, []);

  const toggleSaved = useCallback((slug: string) => {
    setSaved((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ user, ready, signIn, signOut, saved, toggleSaved }),
    [user, ready, signIn, signOut, saved, toggleSaved],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
