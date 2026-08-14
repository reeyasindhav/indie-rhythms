import { Link } from "@tanstack/react-router";
import { Bookmark, Play } from "lucide-react";

import type { Release } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export function ReleaseCard({ release, index = 0 }: { release: Release; index?: number }) {
  const { saved, toggleSaved } = useAuth();
  const isSaved = saved.includes(release.slug);

  return (
    <article className="group flex flex-col">
      <Link
        to="/reviews/$slug"
        params={{ slug: release.slug }}
        className="lift relative block aspect-square overflow-hidden border border-ink/70 bg-paper"
      >
        <img
          src={release.cover}
          alt={`${release.title} by ${release.artist} cover art`}
          loading="lazy"
          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
        />
        <span className="absolute left-0 top-0 bg-ink px-2 py-1 label text-paper">{release.tag}</span>
        <span className="absolute bottom-0 right-0 flex items-center gap-2 border-l border-t border-ink bg-acid px-3 py-2 label text-acid-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Play <Play className="h-3 w-3" />
        </span>
        <span className="pointer-events-none absolute bottom-3 left-3 font-display text-5xl text-ink/15">
          {release.score.toFixed(1)}
        </span>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3 border-b border-ink/25 pb-3">
        <div>
          <Link
            to="/reviews/$slug"
            params={{ slug: release.slug }}
            className="rule-link display text-2xl uppercase"
          >
            {release.title}
          </Link>
          <p className="mt-2 label text-muted-foreground">
            {release.artist} / {release.score.toFixed(1)} / {release.genre}
          </p>
        </div>
        <button
          type="button"
          onClick={() => toggleSaved(release.slug)}
          aria-label={isSaved ? "Remove from library" : "Save to library"}
          className="mt-1 transition-transform duration-300 hover:scale-125"
        >
          <Bookmark className={cn("h-4 w-4", isSaved && "fill-acid text-ink")} />
        </button>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{release.blurb}</p>
      <span className="mt-2 label text-muted-foreground/80">
        {index > 0 ? String(index).padStart(2, "0") + " / " : ""}
        {release.city} — {release.year}
      </span>
    </article>
  );
}
