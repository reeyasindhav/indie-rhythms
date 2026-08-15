import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Check, MapPin, Music2 } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [{ title: "Your Profile — PITCHFORK_" }, { name: "robots", content: "noindex" }],
  }),
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem("pitchfork_session")) throw redirect({ to: "/login" });
  },
  component: Profile,
});

function Profile() {
  const { user, saved, updateProfile, ready } = useAuth();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setCity(user.city);
  }, [user]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !city.trim()) return;
    updateProfile({ name: name.trim(), city: city.trim() });
    setSavedMessage(true);
  };

  if (!ready || !user) return null;

  return (
    <div>
      <header className="border-b border-ink/70 px-5 py-16 md:px-10 md:py-20">
        <Reveal>
          <p className="label text-muted-foreground">account / profile</p>
          <h1 className="mt-4 display text-[clamp(3rem,9vw,8rem)] uppercase">{user.name}</h1>
          <div className="mt-6 flex flex-wrap gap-5 label text-muted-foreground">
            <span>{user.handle}</span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" /> {user.city}
            </span>
            <span className="inline-flex items-center gap-2">
              <Music2 className="h-3.5 w-3.5" /> {saved.length} saved releases
            </span>
          </div>
        </Reveal>
      </header>

      <section className="grid border-b border-ink/70 md:grid-cols-[1fr_2fr]">
        <aside className="border-b border-ink/70 px-5 py-12 md:border-b-0 md:border-r md:px-10">
          <p className="label text-muted-foreground">account details</p>
          <dl className="mt-6 space-y-5 text-sm">
            <div>
              <dt className="label text-muted-foreground">Email</dt>
              <dd className="mt-1">{user.email}</dd>
            </div>
            <div>
              <dt className="label text-muted-foreground">Member handle</dt>
              <dd className="mt-1">{user.handle}</dd>
            </div>
          </dl>
        </aside>

        <div className="px-5 py-12 md:px-10">
          <p className="label text-muted-foreground">edit your profile</p>
          <form onSubmit={handleSubmit} className="mt-8 max-w-xl space-y-6">
            <label className="block">
              <span className="label text-muted-foreground">Display name</span>
              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setSavedMessage(false);
                }}
                className="mt-2 w-full border-b border-ink/40 bg-transparent pb-2 text-base outline-none"
                required
              />
            </label>
            <label className="block">
              <span className="label text-muted-foreground">City</span>
              <input
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                  setSavedMessage(false);
                }}
                className="mt-2 w-full border-b border-ink/40 bg-transparent pb-2 text-base outline-none"
                required
              />
            </label>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="submit"
                className="border border-ink bg-ink px-5 py-3 label text-paper transition-colors hover:bg-acid hover:text-acid-foreground"
              >
                Save changes
              </button>
              {savedMessage && (
                <span className="inline-flex items-center gap-2 label text-muted-foreground">
                  <Check className="h-3.5 w-3.5" /> Profile saved
                </span>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
