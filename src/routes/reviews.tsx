import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

import { Reveal } from "@/components/site/Reveal";

type ReviewEntry = {
  artist: string;
  title: string;
  year: string;
  city: string;
  format: string;
  description: string;
  source: string;
  accent: string;
};

// Each entry points to an official Bandcamp page so this is a catalogue of
// released work rather than fictional editorial records.
const reviewEntries: ReviewEntry[] = [
  {
    artist: "Peter Cat Recording Co.",
    title: "BETA",
    year: "2024",
    city: "New Delhi, India",
    format: "Album · 13 tracks",
    description:
      "A 13-track record released on 9 August 2024. The group credits Suryakant Sawhney, Karan Singh, Kartik Pillai, Rohit Gupta and Dhruv Bhola among its contributors.",
    source: "https://pcrc.bandcamp.com/album/beta",
    accent: "bg-acid",
  },
  {
    artist: "Angad Berar",
    title: "Sundae",
    year: "2025",
    city: "Faridabad, India",
    format: "Album · 8 tracks",
    description:
      "Berar's fourth album was released on 6 June 2025. It was co-produced with Kartik Pillai and recorded at Karuta Records in Faridabad.",
    source: "https://gezelligrecords.bandcamp.com/album/sundae",
    accent: "bg-ink text-paper",
  },
  {
    artist: "Parekh & Singh",
    title: "The Night is Clear",
    year: "2022",
    city: "Kolkata, India",
    format: "Album · 9 tracks",
    description:
      "Released on 2 September 2022, this nine-song album includes “Sleepyhead”, “Bedouin” and “The Nightingale”.",
    source: "https://parekhandsingh.bandcamp.com/album/the-night-is-clear",
    accent: "bg-paper",
  },
  {
    artist: "The F16s",
    title: "Is It Time To Eat The Rich Yet?",
    year: "2021",
    city: "Chennai, India",
    format: "EP · 5 tracks",
    description:
      "A five-track release from the Chennai alternative-indie band, issued on 22 October 2021 and written, composed, arranged and produced by The F16s.",
    source: "https://thef16s.bandcamp.com/album/is-it-time-to-eat-the-rich-yet",
    accent: "bg-acid",
  },
  {
    artist: "LIFAFA",
    title: "Jaago जागो",
    year: "2019",
    city: "New Delhi, India",
    format: "Album",
    description:
      "Suryakant Sawhney's 2019 album combines electronic production with harmonium-led songwriting. Its title track was written and produced by Sawhney.",
    source: "https://lifafa.bandcamp.com/album/jaago",
    accent: "bg-ink text-paper",
  },
];

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — PITCHFORK_" },
      {
        name: "description",
        content:
          "A reference shelf of real independent Indian releases, linked to official artist pages.",
      },
    ],
  }),
  component: Reviews,
});

function Reviews() {
  return (
    <div>
      <header className="border-b border-ink/70 px-5 py-16 md:px-10 md:py-20">
        <Reveal>
          <p className="label text-muted-foreground">reviews / independent India</p>
          <h1 className="mt-4 display text-[clamp(3rem,9vw,8rem)] uppercase animate-fade-up">
            Real Releases
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            A growing reference shelf of released work from independent Indian artists. Every entry
            links directly to an official artist or label page, with release details kept clear and
            verifiable.
          </p>
        </Reveal>
      </header>

      <section className="px-5 py-14 md:px-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {reviewEntries.map((entry, index) => (
            <Reveal key={entry.source} delay={index * 70}>
              <article
                className={`flex min-h-80 flex-col border border-ink/70 p-6 ${entry.accent}`}
              >
                <p className="label opacity-70">
                  {String(index + 1).padStart(2, "0")} / {entry.year}
                </p>
                <h2 className="mt-10 display text-4xl uppercase leading-none">{entry.title}</h2>
                <p className="mt-3 label">{entry.artist}</p>
                <p className="mt-7 text-sm leading-relaxed opacity-80">{entry.description}</p>
                <div className="mt-auto pt-8">
                  <p className="label opacity-70">
                    {entry.city} / {entry.format}
                  </p>
                  <a
                    href={entry.source}
                    target="_blank"
                    rel="noreferrer"
                    className="rule-link mt-4 inline-flex items-center gap-2 label"
                  >
                    Official release page <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
