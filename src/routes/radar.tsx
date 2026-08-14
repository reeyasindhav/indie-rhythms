import { Link, createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";

import { Marquee } from "@/components/site/Marquee";
import { Reveal } from "@/components/site/Reveal";
import { getRelease, radar } from "@/lib/data";

export const Route = createFileRoute("/radar")({
  head: () => ({
    meta: [
      { title: "New Release Radar — Updated Daily | PITCHFORK_" },
      {
        name: "description",
        content:
          "Every independent Indian release we log, day by day: EPs, LPs, tapes and singles from unsigned artists.",
      },
      { property: "og:title", content: "New Release Radar | PITCHFORK_" },
      {
        property: "og:description",
        content: "A daily log of independent Indian releases, no chart weighting.",
      },
    ],
  }),
  component: Radar,
});

function Radar() {
  return (
    <div>
      <header className="border-b border-ink/70 px-5 py-16 md:px-10 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label text-muted-foreground">new release radar / updated daily</p>
            <h1 className="mt-6 display text-[clamp(3rem,9vw,8rem)] uppercase animate-fade-up">
              The Radar
            </h1>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Chronological, unweighted, human-logged. If it came out and it's independent, it's here —
            no chart position required.
          </p>
        </div>
      </header>

      <Marquee items={["LOGGED TODAY: 12", "SUBMISSIONS QUEUE: 47", "NO PLAYLIST PAYOLA"]} />

      <section className="px-5 py-14 md:px-10">
        {radar.map((block, bi) => (
          <Reveal key={block.day} delay={bi * 80}>
            <div className="mb-14 border-b border-ink/25 pb-6">
              <div className="flex items-baseline justify-between">
                <h2 className="display text-4xl uppercase">{block.day}</h2>
                <span className="label text-muted-foreground">{block.date}</span>
              </div>

              <ul className="mt-8">
                {block.items.map((item) => {
                  const release = getRelease(item.slug);
                  return (
                    <li key={item.slug} className="group border-t border-ink/20">
                      <Link
                        to="/reviews/$slug"
                        params={{ slug: item.slug }}
                        className="flex flex-wrap items-center gap-6 py-6 transition-[padding] duration-300 group-hover:pl-4"
                      >
                        <img
                          src={release?.cover}
                          alt=""
                          loading="lazy"
                          className="h-16 w-16 object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                        />
                        <span className="display text-3xl uppercase md:text-4xl">{item.title}</span>
                        <span className="label text-muted-foreground">{item.artist}</span>
                        <span className="border border-ink px-2 py-1 label">{item.type}</span>
                        <span className="ml-auto flex items-center gap-3 label opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          play <Play className="h-3 w-3 fill-current" />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
