import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Play } from "lucide-react";

import { Marquee } from "@/components/site/Marquee";
import { Reveal } from "@/components/site/Reveal";
import { ReleaseCard } from "@/components/site/ReleaseCard";
import { moods, releases } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PITCHFORK_ — Find Your Noise | Indian Underground Music" },
      {
        name: "description",
        content:
          "A field guide to the Indian underground. Records, artists and sounds that deserve a bigger room — reviewed daily.",
      },
      { property: "og:title", content: "PITCHFORK_ — Find Your Noise" },
      {
        property: "og:description",
        content: "Indian underground music discovery: spotlights, mood boards and a release radar.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const feature = releases[2]!;
  const picks = releases.slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="grid border-b border-ink/70 lg:grid-cols-[1.55fr_1fr]">
        <div className="flex flex-col justify-between px-5 py-14 md:px-10 md:py-20">
          <p className="label text-muted-foreground">
            ISSUE NO. 001 / NEW DELHI — MUMBAI — EVERYWHERE
          </p>
          <h1 className="mt-12 display text-[clamp(3.6rem,11vw,10rem)] uppercase">
            <span className="block animate-fade-up">Find</span>
            <span className="block animate-fade-up [animation-delay:120ms]">Your</span>
            <span className="block animate-fade-up text-paper [animation-delay:240ms]">Noise.</span>
          </h1>
          <div className="mt-14 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
              A field guide to the Indian underground. Records, artists, and sounds that deserve a
              bigger room.
            </p>
            <Link
              to="/discover"
              className="group flex items-center gap-6 border border-ink px-6 py-4 label transition-colors hover:bg-ink hover:text-paper"
            >
              start digging
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <aside className="relative flex flex-col justify-between border-t border-ink/70 bg-ink px-5 py-8 text-paper lg:border-l lg:border-t-0 md:px-8">
          <div className="flex items-center justify-between label opacity-70">
            <span>new release radar</span>
            <span>updated daily</span>
          </div>
          <img
            src={feature.cover}
            alt={`${feature.title} artwork`}
            className="mt-8 h-44 w-full object-cover opacity-40 grayscale"
          />
          <div className="mt-8">
            <p className="label text-acid">01 / 04</p>
            <h2 className="mt-3 display text-5xl uppercase">{feature.title}</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/70">{feature.blurb}</p>
          </div>
          <Link
            to="/reviews/$slug"
            params={{ slug: feature.slug }}
            className="group mt-10 flex items-center justify-between border-t border-paper/25 pt-5 label"
          >
            play feature
            <Play className="h-4 w-4 fill-current transition-transform duration-300 group-hover:translate-x-2" />
          </Link>
        </aside>
      </section>

      <Marquee
        items={[
          "6 CITIES INDEXED",
          "128 UNSIGNED ARTISTS",
          "NO ALGORITHM BIAS",
          "REVIEWED BY HUMANS",
          "SUBMISSIONS OPEN",
        ]}
      />

      {/* EDITOR'S PICKS */}
      <section className="border-b border-ink/70 px-5 py-16 md:px-10 md:py-24">
        <Reveal>
          <p className="label text-muted-foreground">the front page</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="display text-5xl uppercase md:text-6xl">Editor's Picks</h2>
            <Link to="/reviews" className="label rule-link">
              view all releases ↗
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
          {picks.map((release, i) => (
            <Reveal key={release.slug} delay={i * 90}>
              <ReleaseCard release={release} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* MOOD BOARD */}
      <section className="grid border-b border-ink/70 lg:grid-cols-[1fr_1.1fr]">
        <div className="border-b border-ink/70 px-5 py-16 md:px-10 lg:border-b-0 lg:border-r">
          <Reveal>
            <p className="label text-muted-foreground">mood board / 06 doors</p>
            <h2 className="mt-8 display text-[clamp(2.6rem,5vw,4.6rem)] uppercase">
              What does your <span className="text-acid">head sound</span> like tonight?
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Six doors instead of one algorithm. Pick a feeling and we hand you records from rooms
              you have never been in.
            </p>
            <Link to="/discover" className="mt-10 inline-block label rule-link">
              open the mood board ↗
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {moods.map((mood, i) => (
            <Link
              key={mood.slug}
              to="/moods/$slug"
              params={{ slug: mood.slug }}
              className="group relative overflow-hidden border-b border-ink/25 px-6 py-10 transition-colors duration-500 hover:bg-ink hover:text-paper sm:odd:border-r"
              style={{ animation: `fade-up 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms both` }}
            >
              <h3 className="display text-3xl uppercase">{mood.name}</h3>
              <p className="mt-4 label opacity-70">{mood.no} / explore ↗</p>
              <p className="mt-3 max-w-[22ch] text-xs leading-relaxed text-muted-foreground opacity-0 transition-opacity duration-500 group-hover:text-paper/70 group-hover:opacity-100">
                {mood.line}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* SUBMIT CTA */}
      <section className="px-5 py-20 text-center md:px-10">
        <Reveal>
          <p className="label text-muted-foreground">for artists</p>
          <h2 className="mx-auto mt-6 max-w-3xl display text-[clamp(2.4rem,6vw,5rem)] uppercase">
            If nobody is playing your record, we will.
          </h2>
          <Link
            to="/submit"
            className="mt-10 inline-block border border-ink bg-acid px-8 py-4 label text-acid-foreground transition-transform duration-300 hover:-translate-y-1"
          >
            submit your music ↗
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
