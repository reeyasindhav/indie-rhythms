import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "Privacy — PITCHFORK_" }, { name: "robots", content: "noindex" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div>
      <header className="border-b border-ink/70 px-5 py-16 md:px-10 md:py-20">
        <h1 className="display text-[clamp(3rem,9vw,8rem)] uppercase">Privacy</h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Last updated: August 15, 2026
        </p>
      </header>

      <section className="px-5 py-14 md:px-10">
        <div className="mx-auto max-w-3xl space-y-10 text-sm leading-relaxed">
          <div>
            <h2 className="display text-2xl uppercase">1. Information We Collect</h2>
            <p className="mt-4 text-muted-foreground">
              We collect information you provide directly, such as your name, email address, and any
              content you submit through the site. We also collect limited technical data, including
              device type, browser information, and usage patterns, to improve the experience.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl uppercase">2. How We Use Information</h2>
            <p className="mt-4 text-muted-foreground">
              We use your information to operate and improve the site, communicate with you,
              personalize content, and process submissions. We do not sell your personal data to
              third parties.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl uppercase">3. Cookies</h2>
            <p className="mt-4 text-muted-foreground">
              This site uses essential cookies to maintain your session and preferences. We do not
              use advertising or tracking cookies. You may disable cookies in your browser, but some
              features may not function as intended.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl uppercase">4. Data Sharing</h2>
            <p className="mt-4 text-muted-foreground">
              We may share data with trusted service providers who assist in operating the site.
              These parties are obligated to protect your information. We may also disclose data if
              required by law or to protect our rights and safety.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl uppercase">5. Data Retention</h2>
            <p className="mt-4 text-muted-foreground">
              We retain personal data only as long as necessary to provide services and comply with
              legal obligations. You may request deletion of your account and associated data by
              contacting us.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl uppercase">6. Your Rights</h2>
            <p className="mt-4 text-muted-foreground">
              Depending on your location, you may have rights to access, correct, or delete your
              personal data. You may also object to or restrict certain processing. To exercise
              these rights, use the{" "}
              <a href="/submit" className="rule-link">
                contact form
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="display text-2xl uppercase">7. Children&apos;s Privacy</h2>
            <p className="mt-4 text-muted-foreground">
              This site is not intended for users under the age of 13. We do not knowingly collect
              personal information from children. If we learn that we have collected data from a
              child, we will delete it promptly.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl uppercase">8. Changes to This Policy</h2>
            <p className="mt-4 text-muted-foreground">
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated date. Continued use of the site after changes constitutes
              acceptance of the revised policy.
            </p>
          </div>

          <div>
            <h2 className="display text-2xl uppercase">9. Contact</h2>
            <p className="mt-4 text-muted-foreground">
              For questions about this Privacy Policy, reach out via the{" "}
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
