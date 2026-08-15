import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [{ title: "Submit Music — PITCHFORK_" }, { name: "robots", content: "noindex" }],
  }),
  component: Submit,
});

function Submit() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-5">
        <div className="max-w-md text-center">
          <p className="display text-5xl uppercase">Received</p>
          <p className="mt-4 text-sm text-muted-foreground">
            We read everything. If it fits the crate, we will reach out.
          </p>
          <a
            href="/"
            className="mt-8 inline-block border border-ink bg-ink px-5 py-3 label text-paper"
          >
            back to the front page
          </a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="border-b border-ink/70 px-5 py-16 md:px-10 md:py-20">
        <Reveal>
          <p className="label text-muted-foreground">for artists</p>
          <h1 className="mt-4 display text-[clamp(3rem,9vw,8rem)] uppercase animate-fade-up">
            Submit
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Send us your record. We listen to everything that comes in, but we can only write about
            a fraction. Include a short note about where it was made and why.
          </p>
        </Reveal>
      </header>

      <section className="mx-auto max-w-2xl px-5 py-14 md:px-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="label text-muted-foreground">Artist / Project Name</label>
              <input
                type="text"
                required
                className="mt-2 w-full border-b border-ink/40 bg-transparent pb-2 outline-none label placeholder:text-muted-foreground"
                placeholder="Your project name"
              />
            </div>
            <div>
              <label className="label text-muted-foreground">City</label>
              <input
                type="text"
                required
                className="mt-2 w-full border-b border-ink/40 bg-transparent pb-2 outline-none label placeholder:text-muted-foreground"
                placeholder="Where are you based?"
              />
            </div>
          </div>

          <div>
            <label className="label text-muted-foreground">Release Title</label>
            <input
              type="text"
              required
              className="mt-2 w-full border-b border-ink/40 bg-transparent pb-2 outline-none label placeholder:text-muted-foreground"
              placeholder="Album, EP or single title"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="label text-muted-foreground">Genre</label>
              <input
                type="text"
                required
                className="mt-2 w-full border-b border-ink/40 bg-transparent pb-2 outline-none label placeholder:text-muted-foreground"
                placeholder="e.g. Ambient, Post-Punk"
              />
            </div>
            <div>
              <label className="label text-muted-foreground">Link to Stream / Download</label>
              <input
                type="url"
                required
                className="mt-2 w-full border-b border-ink/40 bg-transparent pb-2 outline-none label placeholder:text-muted-foreground"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="label text-muted-foreground">A short note about this record</label>
            <textarea
              required
              rows={5}
              className="mt-2 w-full border border-ink/40 bg-transparent p-3 outline-none label placeholder:text-muted-foreground"
              placeholder="Where was it recorded? What were you listening to? Why should we care?"
            />
          </div>

          <button
            type="submit"
            className="w-full border border-ink bg-ink py-3 label text-paper transition-colors hover:bg-acid hover:text-acid-foreground"
          >
            Send to the crate
          </button>
        </form>
      </section>
    </div>
  );
}
