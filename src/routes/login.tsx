import { useState, type FormEvent } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Sign In — PITCHFORK_" }, { name: "robots", content: "noindex" }],
  }),
  component: Login,
});

function Login() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    throw redirect({ to: "/profile" });
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (!password.trim()) return;
    signIn(email, tab === "up" ? name : undefined);
    navigate({ to: "/profile" });
  };

  return (
    <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <p className="label text-muted-foreground">account</p>
        <h1 className="mt-4 display text-5xl uppercase">Sign {tab === "in" ? "In" : "Up"}</h1>

        <div className="mt-8 flex gap-2">
          <button
            type="button"
            onClick={() => setTab("in")}
            className={cn(
              "flex-1 border border-ink py-2 label transition-colors",
              tab === "in" && "bg-ink text-paper",
            )}
          >
            sign in
          </button>
          <button
            type="button"
            onClick={() => setTab("up")}
            className={cn(
              "flex-1 border border-ink py-2 label transition-colors",
              tab === "up" && "bg-ink text-paper",
            )}
          >
            create account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="label text-muted-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full border-b border-ink/40 bg-transparent pb-2 outline-none label placeholder:text-muted-foreground"
              placeholder="you@example.com"
            />
          </div>

          {tab === "up" && (
            <div>
              <label className="label text-muted-foreground">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={tab === "up"}
                className="mt-2 w-full border-b border-ink/40 bg-transparent pb-2 outline-none label placeholder:text-muted-foreground"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className="label text-muted-foreground">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full border-b border-ink/40 bg-transparent pb-2 outline-none label placeholder:text-muted-foreground"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full border border-ink bg-ink py-3 label text-paper transition-colors hover:bg-acid hover:text-acid-foreground"
          >
            {tab === "in" ? "Enter the crate" : "Join the crate"}
          </button>
        </form>
      </div>
    </div>
  );
}
