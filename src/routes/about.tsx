import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [{ title: "About — PITCHFORK_" }, { name: "robots", content: "noindex" }],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <header className="border-b border-ink/70 px-5 py-16 md:px-10 md:py-20">
        <h1 className="display text-[clamp(3rem,9vw,8rem)] uppercase">About</h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          PITCHFORK_ is an independent editorial project documenting music made in India, one
          release at a time. No charts, no payola, no hype loops — just reviews, spotlights, and the
          people making the work.
        </p>
      </header>

      <section className="px-5 py-14 md:px-10">
        <div className="mx-auto max-w-3xl space-y-10 text-sm leading-relaxed">
          <div>
            <h2 className="display text-2xl uppercase">What we publish</h2>
            <p className="mt-4 text-muted-foreground">
              We write long-form reviews of independent Indian releases, from bedroom recordings to
              studio LPs. We also publish artist spotlights that focus on process and context rather
              than promotional biography.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl uppercase">How we choose</h2>
            <p className="mt-4 text-muted-foreground">
              There is no submission fee and no editorial board backed by a label. If a record
              reaches us and we think it has something to say, we may write about it. Release radar
              is logged chronologically, not by popularity.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl uppercase">Who runs this</h2>
            <p className="mt-4 text-muted-foreground">
              PITCHFORK_ is run by a small group of editors and contributors based in India. We are
              not affiliated with any media network, streaming service, or record label.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl uppercase">Get in touch</h2>
            <p className="mt-4 text-muted-foreground">
              For press, submissions, and corrections, use the{" "}
              <a href="/submit" className="rule-link">
                contact form
              </a>
              . For everything else,{" "}
              <a href="https://instagram.com" className="rule-link">
                instagram
              </a>{" "}
              works too.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
