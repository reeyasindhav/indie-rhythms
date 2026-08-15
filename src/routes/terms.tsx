import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "Terms — PITCHFORK_" }, { name: "robots", content: "noindex" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div>
      <header className="border-b border-ink/70 px-5 py-16 md:px-10 md:py-20">
        <h1 className="display text-[clamp(3rem,9vw,8rem)] uppercase">Terms</h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Last updated: August 15, 2026
        </p>
      </header>

      <section className="px-5 py-14 md:px-10">
        <div className="mx-auto max-w-3xl space-y-10 text-sm leading-relaxed">
          <div>
            <h2 className="display text-2xl uppercase">1. Acceptance of Terms</h2>
            <p className="mt-4 text-muted-foreground">
              By accessing or using PITCHFORK_, you agree to be bound by these Terms. If you do not
              agree to these Terms, do not use the site.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl uppercase">2. Use of Content</h2>
            <p className="mt-4 text-muted-foreground">
              All reviews, images, and text on this site are the property of PITCHFORK_ unless
              otherwise stated. You may not reproduce, distribute, or create derivative works
              without prior written permission.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl uppercase">3. User Accounts</h2>
            <p className="mt-4 text-muted-foreground">
              You are responsible for maintaining the confidentiality of your account and password.
              You agree to notify us immediately of any unauthorized access. PITCHFORK_ is not
              liable for loss or damage arising from your failure to protect your credentials.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl uppercase">4. Submissions</h2>
            <p className="mt-4 text-muted-foreground">
              By submitting music or content, you grant PITCHFORK_ a non-exclusive, worldwide,
              royalty-free license to use, display, and publish the submitted material in connection
              with the site and related promotional activities.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl uppercase">5. Disclaimer</h2>
            <p className="mt-4 text-muted-foreground">
              The site is provided on an &quot;as is&quot; basis. We make no warranties, express or
              implied, regarding the reliability, accuracy, or availability of the service. Some
              content may reflect subjective opinion.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl uppercase">6. Limitation of Liability</h2>
            <p className="mt-4 text-muted-foreground">
              To the fullest extent permitted by law, PITCHFORK_ shall not be liable for any
              indirect, incidental, special, or consequential damages arising out of your use of, or
              inability to use, the site.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl uppercase">7. Changes</h2>
            <p className="mt-4 text-muted-foreground">
              We may revise these Terms at any time. Continued use of the site after changes
              constitutes acceptance of the revised Terms.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl uppercase">8. Contact</h2>
            <p className="mt-4 text-muted-foreground">
              For questions about these Terms, reach out via the{" "}
              <a href="/submit" className="rule-link">
                contact form
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
