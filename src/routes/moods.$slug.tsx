import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { Reveal } from "@/components/site/Reveal";
import { ReleaseCard } from "@/components/site/ReleaseCard";
import { getMood, moods, releasesByMood } from "@/lib/data";

export const Route = createFileRoute("/moods/$slug")({
  loader: ({ params }) => {
    const mood = getMood(params.slug);
    if (!mood) throw notFound();
    return { mood, list: releasesByMood(params.slug) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Mood not found — PITCHFORK_" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.mood.name} — Mood Board | PITCHFORK_`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.mood.line },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.mood.line },
      ],
    };
  },
  component: MoodPage,
});

function MoodPage() {
  const { mood, list } = Route.useLoaderData();
  const others = moods.filter((m) => m.slug !== mood.slug).slice(0, 4);

  return (
    <div>
      <header className="relative overflow-hidden border-b border-ink/70 bg-ink px-5 py-20 text-paper md:px-10">
        <img
          src={mood.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale"
        />
        <div className="relative">
          <p className="label text-acid">
            mood {mood.no} / {mood.bpm}
          </p>
          <h1 className="mt-6 display text-[clamp(3rem,10vw,9rem)] uppercase animate-fade-up">
            {mood.name}
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-paper/75">{mood.line}</p>
          <p className="mt-8 label opacity-70">{mood.genres.join(" / ")}</p>
        </div>
      </header>

      <section className="px-5 py-16 md:px-10">
        <p className="label text-muted-foreground">{list.length} records in this room</p>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
          {list.map((release, i) => (
            <Reveal key={release.slug} delay={i * 80}>
              <ReleaseCard release={release} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-ink/70 px-5 py-14 md:px-10">
        <h2 className="display text-3xl uppercase">Other doors</h2>
        <div className="mt-8 grid gap-px sm:grid-cols-2 xl:grid-cols-4">
          {others.map((m) => (
            <Link
              key={m.slug}
              to="/moods/$slug"
              params={{ slug: m.slug }}
              className="border border-ink/25 p-6 transition-colors duration-500 hover:bg-ink hover:text-paper"
            >
              <h3 className="display text-2xl uppercase">{m.name}</h3>
              <p className="mt-3 label opacity-70">{m.no} / explore ↗</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
