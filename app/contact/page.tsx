import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Card, PrimaryButton, SectionHeader } from "@/components/ui/primitives";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="section-pad">
        <div className="site-shell grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <Card className="p-8 sm:p-10">
            <SectionHeader
              label="Early access"
              title="Request access to VapourltAgent."
              description="Share your team details and use case. This page is still local-only in v1, but it is framed like the product access intake we would ship next."
            />

            <form className="mt-10 space-y-5">
              <label className="block">
                <span className="field-label">Full Name</span>
                <input className="field mt-2" placeholder="Jordan Lee" />
              </label>
              <label className="block">
                <span className="field-label">Work Email</span>
                <input className="field mt-2" type="email" placeholder="jordan@company.com" />
              </label>
              <label className="block">
                <span className="field-label">Company</span>
                <input className="field mt-2" placeholder="Vapor Labs Ltd" />
              </label>
              <label className="block">
                <span className="field-label">Use Case</span>
                <textarea
                  className="field mt-2 min-h-[168px] resize-none"
                  placeholder="Tell us what kinds of digital asset recovery cases your team manages."
                />
              </label>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <PrimaryButton type="button">Request Access</PrimaryButton>
                <a href="mailto:hello@vapourltagent.co" className="text-sm font-medium text-muted transition hover:text-ink">
                  Or email hello@vapourltagent.co
                </a>
              </div>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Contact</p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">Built for serious operations teams.</h2>
              <p className="mt-4 text-sm leading-7 text-muted">
                VapourltAgent is positioned for operations, legal, brand protection, and internal portfolio teams
                managing digital asset recovery cases as an operational system.
              </p>
              <div className="mt-6 grid gap-3">
                {[
                  "Evidence-led case records",
                  "Deterministic readiness scoring",
                  "Audit-friendly saved assessments",
                  "Compliance-aware decisioning",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[rgba(22,28,40,0.08)] bg-white/75 px-4 py-3 text-sm text-ink"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6" id="privacy">
              <p className="text-sm font-semibold text-ink">Privacy</p>
              <p className="mt-3 text-sm leading-7 text-muted">
                Early-access details on this page are not persisted. In a production version, contact intake would
                store only the information required to evaluate a product access request.
              </p>
            </Card>

            <Card className="p-6" id="terms">
              <p className="text-sm font-semibold text-ink">Terms</p>
              <p className="mt-3 text-sm leading-7 text-muted">
                VapourltAgent is a case management and readiness platform. It does not support unauthorized access,
                bypass, or account takeover methods.
              </p>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
