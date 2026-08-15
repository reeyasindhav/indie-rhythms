import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { Reveal } from "@/components/site/Reveal";
import { getArtist, releases } from "@/lib/data";
import { useAuth } from "@/lib/auth";
import { usePlayer } from "@/lib/player";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/artists/$slug")({
  loader: ({ params }) => {
    const artist = getArtist(params.slug);
    if (!artist) throw notFound();
    const artistReleases = releases.filter((r) => artist.releases.includes(r.slug));
    return { artist, artistReleases };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Artist not found — PITCHFORK_" }] };
    }
    const a = loaderData.artist;
    return {
      meta: [
        { title: `${a.name} — Artist Spotlight | PITCHFORK_` },
        { name: "description", content: a.tagline },
      ],
    };
  },
  component: ArtistPage,
});

function ArtistPage() {
  const { artist, artistReleases } = Route.useLoaderData();
  const { saved, toggleSaved } = useAuth();
  const { current, playing, toggle } = usePlayer();

  return (
    <div>
      <header className="relative overflow-hidden border-b border-ink/70 bg-ink px-5 py-20 text-paper md:px-10 md:py-28">
        <img
          src={artist.hero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale"
        />
        <div className="relative">
          <p className="label text-acid">
            {artist.city} / {artist.genre}
          </p>
          <h1 className="mt-6 display text-[clamp(3rem,10vw,9rem)] uppercase animate-fade-up">
            {artist.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-paper/75">{artist.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-4 label">
            <span>Since {artist.since}</span>
            <span>·</span>
            <span>{artist.listeners} listeners</span>
          </div>
        </div>
      </header>

      <section className="border-b border-ink/70 px-5 py-14 md:px-10">
        <p className="label text-muted-foreground">bio</p>
        <div className="mt-8 max-w-3xl space-y-6 text-base leading-relaxed">
          {artist.bio.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-12">
          <p className="label text-muted-foreground">gear</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {artist.gear.map((item) => (
              <li key={item} className="border border-ink/40 px-3 py-2 label">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 py-14 md:px-10">
        <p className="label text-muted-foreground">releases</p>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {artistReleases.map((release, i) => (
            <Reveal key={release.slug} delay={i * 80}>
              <div className="group flex flex-col border border-ink/70 bg-paper transition-colors duration-500 hover:bg-ink hover:text-paper">
                <Link
                  to="/reviews/$slug"
                  params={{ slug: release.slug }}
                  className="relative aspect-square overflow-hidden border-b border-ink/70"
                >
                  <img
                    src={release.cover}
                    alt={`${release.title} artwork`}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <span className="absolute left-0 top-0 bg-ink px-2 py-1 label text-paper">
                    {release.tag}
                  </span>
                  <span className="absolute bottom-3 right-3 font-display text-5xl text-ink/15 group-hover:text-paper/15">
                    {release.score.toFixed(1)}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggle({
                        slug: release.slug,
                        title: release.title,
                        artist: release.artist,
                        cover: release.cover,
                      });
                    }}
                    className="absolute bottom-0 right-0 flex items-center gap-2 border-l border-t border-ink bg-acid px-3 py-2 label text-acid-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    {current?.slug === release.slug && playing ? "Pause" : "Play"}
                  </button>
                </Link>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <Link
                      to="/reviews/$slug"
                      params={{ slug: release.slug }}
                      className="rule-link display text-2xl uppercase group-hover:text-paper"
                    >
                      {release.title}
                    </Link>
                    <p className="mt-2 label text-muted-foreground group-hover:text-paper/70">
                      {release.score.toFixed(1)} / {release.genre} / {release.year}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSaved(release.slug)}
                    className="mt-4 self-start label rule-link"
                  >
                    {saved.includes(release.slug) ? "Saved" : "Save"}
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
