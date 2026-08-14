import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Reveal } from "@/components/site/Reveal";
import { ReleaseCard } from "@/components/site/ReleaseCard";
import { genres, moods, releases } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover — Genre Mood Boards | PITCHFORK_" },
      {
        name: "description",
        content:
          "Six mood boards and six genres instead of one algorithm. Dig through India's underground by feeling, city and tempo.",
      },
      { property: "og:title", content: "Discover — Genre Mood Boards | PITCHFORK_" },
      {
        property: "og:description",
        content: "Browse Indian underground records by mood, genre and city.",
      },
    ],
  }),
  component: Discover,
});

function Discover() {
  const [genre, setGenre] = useState<string | null>(null);
  const list = genre ? releases.filter((r) => r.genre === genre) : releases;

  return (
    <div>
      <header className="border-b border-ink/70 px-5 py-16 md:px-10 md:py-20">
        <p className="label text-muted-foreground">discover / mood board</p>
        <h1 className="mt-6 display text-[clamp(3rem,9vw,8rem)] uppercase animate-fade-up">
          Pick a feeling
        </h1>
        <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Every door below is hand-built by our editors. No listening history, no engagement score —
          just six rooms with different weather.
        </p>
      </header>

      <section className="grid border-b border-ink/70 md:grid-cols-2 xl:grid-cols-3">
        {moods.map((mood, i) => (
          <Reveal key={mood.slug} delay={i * 70}>
            <Link
              to="/moods/$slug"
              params={{ slug: mood.slug }}
              className={cn(
                "group flex h-full flex-col justify-between border-b border-r border-ink/25 p-7 transition-colors duration-500",
                mood.color === "ink" && "bg-ink text-paper hover:bg-acid hover:text-acid-foreground",
                mood.color === "acid" &&
                  "bg-acid text-acid-foreground hover:bg-ink hover:text-paper",
                mood.color === "paper" && "bg-paper hover:bg-ink hover:text-paper",
              )}
            >
              <div className="flex items-center justify-between label opacity-70">
                <span>{mood.no}</span>
                <span>{mood.bpm}</span>
              </div>
              <div className="relative mt-8 h-40 overflow-hidden">
                <img
                  src={mood.image}
                  alt={`${mood.name} mood`}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-70 grayscale transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h2 className="mt-7 display text-4xl uppercase">{mood.name}</h2>
              <p className="mt-3 text-sm leading-relaxed opacity-70">{mood.line}</p>
              <p className="mt-6 label opacity-70">{mood.genres.join(" / ")}</p>
              <span className="mt-5 label">enter the room ↗</span>
            </Link>
          </Reveal>
        ))}
      </section>

      <section className="px-5 py-16 md:px-10 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-ink/30 pb-6">
          <h2 className="display text-4xl uppercase md:text-5xl">Browse by genre</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setGenre(null)}
              className={cn(
                "border border-ink px-4 py-2 label transition-colors",
                !genre ? "bg-ink text-paper" : "hover:bg-acid",
              )}
            >
              all
            </button>
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={cn(
                  "border border-ink px-4 py-2 label transition-colors",
                  genre === g ? "bg-ink text-paper" : "hover:bg-acid",
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
          {list.map((release, i) => (
            <Reveal key={release.slug} delay={i * 60}>
              <ReleaseCard release={release} />
            </Reveal>
          ))}
        </div>
        {list.length === 0 && (
          <p className="mt-12 label text-muted-foreground">Nothing filed under this genre yet.</p>
        )}
      </section>
    </div>
  );
}
