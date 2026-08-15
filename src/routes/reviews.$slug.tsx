import { createFileRoute, notFound } from "@tanstack/react-router";
import { Play, Bookmark } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";
import { getRelease } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import { usePlayer } from "@/lib/player";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/reviews/$slug")({
  loader: ({ params }) => {
    const release = getRelease(params.slug);
    if (!release) throw notFound();
    return { release };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Review not found — PITCHFORK_" }] };
    }
    const r = loaderData.release;
    return {
      meta: [
        { title: `${r.title} by ${r.artist} — PITCHFORK_` },
        { name: "description", content: r.blurb },
      ],
    };
  },
  component: ReviewPage,
});

function ReviewPage() {
  const { release } = Route.useLoaderData();
  const { saved, toggleSaved } = useAuth();
  const { current, playing, toggle } = usePlayer();
  const isSaved = saved.includes(release.slug);
  const isCurrent = current?.slug === release.slug;

  return (
    <div>
      <header className="relative overflow-hidden border-b border-ink/70 bg-ink px-5 py-16 text-paper md:px-10 md:py-24">
        <img
          src={release.cover}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale"
        />
        <div className="relative">
          <p className="label text-acid">
            {release.artist} / {release.year} / {release.city}
          </p>
          <h1 className="mt-6 display text-[clamp(3rem,10vw,9rem)] uppercase animate-fade-up">
            {release.title}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="display text-6xl">{release.score.toFixed(1)}</span>
            <span className="label opacity-70">/ 10</span>
            <button
              type="button"
              onClick={() => toggleSaved(release.slug)}
              className="ml-auto border border-paper/40 px-3 py-2 label transition-colors hover:bg-acid hover:text-acid-foreground"
            >
              <span className="inline-flex items-center gap-2">
                <Bookmark className={cn("h-3.5 w-3.5", isSaved && "fill-current")} />
                {isSaved ? "Saved" : "Save"}
              </span>
            </button>
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-paper/75">{release.blurb}</p>
        </div>
      </header>

      <section className="grid border-b border-ink/70 md:grid-cols-[1fr_2fr]">
        <aside className="border-b border-ink/70 px-5 py-12 md:border-b-0 md:border-r md:px-10">
          <p className="label text-muted-foreground">facts</p>
          <div className="mt-6 space-y-4">
            <div>
              <p className="label text-muted-foreground">Artist</p>
              <p className="mt-1 text-sm">{release.artist}</p>
            </div>
            <div>
              <p className="label text-muted-foreground">Genre</p>
              <p className="mt-1 text-sm">{release.genre}</p>
            </div>
            <div>
              <p className="label text-muted-foreground">Year</p>
              <p className="mt-1 text-sm">{release.year}</p>
            </div>
            <div>
              <p className="label text-muted-foreground">City</p>
              <p className="mt-1 text-sm">{release.city}</p>
            </div>
            <div>
              <p className="label text-muted-foreground">Tag</p>
              <p className="mt-1 text-sm">{release.tag}</p>
            </div>
          </div>
        </aside>

        <div className="px-5 py-12 md:px-10">
          <p className="label text-muted-foreground">the review</p>
          <div className="mt-8 space-y-6 text-base leading-relaxed">
            {release.review.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-ink/70 px-5 py-12 md:px-10">
        <p className="label text-muted-foreground">tracklist</p>
        <ul className="mt-8 divide-y divide-ink/20">
          {release.tracks.map((track) => (
            <li key={track.no} className="flex items-center gap-4 py-3">
              <span className="label text-muted-foreground">{track.no}</span>
              <span className="flex-1 text-sm">{track.name}</span>
              <span className="label text-muted-foreground">{track.length}</span>
              <button
                type="button"
                onClick={() =>
                  toggle({
                    slug: release.slug,
                    title: release.title,
                    artist: release.artist,
                    cover: release.cover,
                  })
                }
                className="border border-ink px-2 py-1 label transition-colors hover:bg-acid hover:text-acid-foreground"
              >
                <span className="inline-flex items-center gap-1">
                  {isCurrent && playing ? "Pause" : "Play"} <Play className="h-3 w-3" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
