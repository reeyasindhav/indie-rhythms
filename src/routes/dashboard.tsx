import { createFileRoute, redirect, notFound } from "@tanstack/react-router";
import { useState } from "react";

import { ReleaseCard } from "@/components/site/ReleaseCard";
import { Reveal } from "@/components/site/Reveal";
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
import { useAuth } from "@/lib/auth";
import { getRelease } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "Your Library — PITCHFORK_" }, { name: "robots", content: "noindex" }],
  }),
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const raw = localStorage.getItem("pitchfork_session");
    if (!raw) {
      throw redirect({ to: "/login" });
    }
  },
  component: Dashboard,
});

function Dashboard() {
  const { user, saved, signOut } = useAuth();
  const [signOutOpen, setSignOutOpen] = useState(false);
  const items = saved.map((slug) => getRelease(slug)).filter(Boolean);

  return (
    <div>
      <header className="border-b border-ink/70 px-5 py-16 md:px-10 md:py-20">
        <Reveal>
          <p className="label text-muted-foreground">your library</p>
          <h1 className="mt-4 display text-[clamp(3rem,9vw,8rem)] uppercase">
            {user?.name ?? "Listener"}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="label text-muted-foreground">
              {saved.length} saved record{saved.length === 1 ? "" : "s"}
            </span>
            <button
              onClick={() => setSignOutOpen(true)}
              className="label rule-link text-muted-foreground"
            >
              sign out
            </button>
            <AlertDialog open={signOutOpen} onOpenChange={setSignOutOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Sign out?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be signed out of your library and saved releases will no longer be
                    synced until you sign back in.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Stay signed in</AlertDialogCancel>
                  <AlertDialogAction onClick={signOut}>Sign out</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </Reveal>
      </header>

      <section className="px-5 py-14 md:px-10">
        {items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="display text-4xl uppercase">Your crate is empty</p>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Start saving releases from the front page, reviews or radar. They will show up here.
            </p>
            <a
              href="/"
              className="mt-8 inline-block border border-ink bg-ink px-5 py-3 label text-paper"
            >
              browse releases
            </a>
          </div>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((release, i) => (
              <Reveal key={release.slug} delay={i * 80}>
                <ReleaseCard release={release} index={i + 1} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
