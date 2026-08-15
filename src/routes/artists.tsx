import { createFileRoute, Link } from "@tanstack/react-router";

import { Reveal } from "@/components/site/Reveal";
import { artists } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/artists")({
  head: () => ({
    meta: [
      { title: "Artist Spotlights — PITCHFORK_" },
      {
        name: "description",
        content:
          "Portraits and spotlights on the independent Indian artists shaping the underground.",
      },
    ],
  }),
  component: Artists,
});

function Artists() {
  return (
    <div>
      <header className="border-b border-ink/70 px-5 py-16 md:px-10 md:py-20">
        <Reveal>
          <p className="label text-muted-foreground">artist spotlights</p>
          <h1 className="mt-4 display text-[clamp(3rem,9vw,8rem)] uppercase animate-fade-up">
            The Rooms
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Musicians, not brands. We wrote about the people behind the records — where they
            rehearse, what they record on, and why they keep doing it.
          </p>
        </Reveal>
      </header>

      <section className="px-5 py-14 md:px-10">
        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {artists.map((artist, i) => (
            <Reveal key={artist.slug} delay={i * 80}>
              <Link
                to="/artists/$slug"
                params={{ slug: artist.slug }}
                className="group flex flex-col border border-ink/70 bg-paper transition-colors duration-500 hover:bg-ink hover:text-paper"
              >
                <div className="aspect-[4/3] overflow-hidden border-b border-ink/70">
                  <img
                    src={artist.hero}
                    alt={artist.name}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="label text-muted-foreground">
                      {artist.city} / {artist.genre}
                    </p>
                    <h2 className="mt-3 display text-4xl uppercase">{artist.name}</h2>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground group-hover:text-paper/70">
                      {artist.tagline}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between label">
                    <span>since {artist.since}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      enter the room ↗
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
