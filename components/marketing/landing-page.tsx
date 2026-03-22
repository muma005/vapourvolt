import { AccordionItem } from "@/components/ui/accordion-item";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, IconTextCard, PrimaryButton, SectionHeader, SecondaryButton } from "@/components/ui/primitives";

const problemCards = [
  {
    title: "Fragmented case records",
    body: "Recovery work often lives across inboxes, screenshots, support threads, and spreadsheets instead of one durable system.",
    icon: <LineIcon path="M5 6.5h14M5 12h9M5 17.5h14" />,
  },
  {
    title: "Unclear readiness state",
    body: "Teams can collect signals, but still lack a clear decision on whether a case is ready for review or still needs evidence.",
    icon: <LineIcon path="M12 5v7l4 3M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />,
  },
  {
    title: "No operational spine",
    body: "Without a dedicated case platform, evidence tracking, next actions, and status progression break down quickly.",
    icon: <LineIcon path="M6 7h12M6 12h7M6 17h10" />,
  },
];

const capabilityCards = [
  {
    title: "Case intake",
    body: "Capture asset details, claimant information, and structured evidence signals in one product flow.",
    icon: <LineIcon path="M7 6h10l2 3v9H5V9l2-3Z" />,
  },
  {
    title: "Evidence tracking",
    body: "Keep ownership proof, continuity signals, and document gaps visible inside a single case record.",
    icon: <LineIcon path="M7 17 10.5 13.5 13 16l4-5" />,
  },
  {
    title: "Readiness scoring",
    body: "Run deterministic scoring that classifies the case, assigns readiness, and returns a structured review state.",
    icon: <LineIcon path="M6 15 10 11l3 3 5-6" />,
  },
  {
    title: "Case progression",
    body: "Move cases from intake to review with status badges, required documents, and next-step guidance.",
    icon: <LineIcon path="M7 7h10v10H7zM10 10h4v4h-4z" />,
  },
];

const steps = [
  ["Create the case record", "Start with asset details, claimant organization, recovery reason, and the available evidence set."],
  ["Score readiness", "The engine classifies the case, scores the evidence profile, and determines review status."],
  ["Close proof gaps", "Required documents, risk flags, and next actions stay attached to the case record."],
  ["Progress the case", "Reopen saved cases later from the dashboard and keep the operation inside one workspace."],
];

const trustCards = [
  {
    title: "Bounded decisioning",
    body: "The platform generates structured recommendations and review states. It does not perform recovery actions.",
  },
  {
    title: "Evidence-led records",
    body: "Every case is anchored in claimant proof, continuity signals, document requirements, and explicit next actions.",
  },
  {
    title: "Manual review visibility",
    body: "High-sensitivity cases surface manual review requirements directly in the assessment output.",
  },
  {
    title: "Audit-friendly history",
    body: "Saved cases keep their input, readiness output, and progression state together as a single system of record.",
  },
];

const faqs = [
  {
    question: "What is VaporVault?",
    answer:
      "VaporVault is a vertical SaaS platform for digital asset recovery operations. It centralizes case intake, evidence tracking, readiness scoring, and case progression in one structured system.",
  },
  {
    question: "Who is it built for?",
    answer:
      "The product is designed for operations, legal, brand protection, portfolio, and internal platform teams that manage recovery-sensitive digital asset cases.",
  },
  {
    question: "Does VaporVault recover assets automatically?",
    answer:
      "No. The platform provides structured case management, deterministic readiness scoring, and bounded recommendations. It does not perform unauthorized access, takeover, or automated recovery actions.",
  },
  {
    question: "What does the MVP store?",
    answer:
      "The product stores authenticated user accounts, saved case records, and the structured assessment generated for each case so teams can revisit them later.",
  },
  {
    question: "Can the public demo save data?",
    answer:
      "No. The public demo previews the engine and report experience. Persistent case records live inside the authenticated product workspace.",
  },
];

function LineIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-[var(--color-primary)]" fill="none" strokeWidth="1.7">
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeroPreview() {
  return (
    <Card className="overflow-hidden p-5 sm:p-6">
      <div className="grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="space-y-4">
          <div className="surface-muted p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-ink">Case Queue</p>
                <p className="mt-1 text-xs text-muted">Recovery operations workspace</p>
              </div>
              <StatusBadge value="Ready for Review" />
            </div>
            <div className="mt-4 space-y-3">
              {[
                ["vaporvaultlabs.com", "Ready for Submission Review"],
                ["@vaporvaulthq", "Manual Review Required"],
                ["Workspace-19", "Needs Evidence"],
              ].map(([label, status], index) => (
                <div
                  key={label}
                  className={`rounded-2xl border px-4 py-3 ${index === 0 ? "border-[rgba(54,85,211,0.22)] bg-white" : "border-transparent bg-white/70"}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-ink">{label}</p>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-muted">#{index + 1}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted">{status}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="surface-muted p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Readiness Score</p>
              <p className="mt-3 text-3xl font-semibold text-ink">85%</p>
              <p className="mt-2 text-xs text-muted">High readiness case with only a small proof gap remaining.</p>
            </div>
            <div className="surface-muted p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Evidence Completeness</p>
              <p className="mt-3 text-3xl font-semibold text-ink">5 / 6</p>
              <p className="mt-2 text-xs text-muted">Most claimant and continuity signals are already present.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="surface-muted p-4">
            <div className="flex flex-wrap gap-2">
              <StatusBadge value="Ready for Submission Review" />
              <StatusBadge value="Low" />
            </div>
            <p className="mt-4 text-sm font-semibold text-ink">Next-step panel</p>
            <div className="mt-3 grid gap-3">
              {[
                "Attach claimant authorization letter",
                "Route the case to submission review",
                "Keep reviewer notes inside the case record",
              ].map((item) => (
                <div key={item} className="rounded-2xl border border-[rgba(22,28,40,0.08)] bg-white/75 px-4 py-3 text-sm text-ink">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="surface-muted p-4">
            <p className="text-sm font-semibold text-ink">Recent activity</p>
            <div className="mt-4 space-y-3 text-sm text-muted">
              {[
                "Case created and normalized",
                "Evidence score recalculated",
                "Documentation gap flagged",
                "Review status updated",
              ].map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-2 inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-primary)]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function HeroSplit() {
  return (
    <section className="section-pad pt-16" id="product">
      <div className="site-shell grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <span className="eyebrow">Digital asset recovery operations platform</span>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-ink sm:text-6xl">
            The case management and recovery readiness platform for digital asset operations.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            VaporVault centralizes case intake, evidence tracking, readiness scoring, and case progression in one
            structured system.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton href="/signup">Get Started</PrimaryButton>
            <SecondaryButton href="/demo">View Product</SecondaryButton>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-success)]" />
            Structured workflows. Clear decisioning. Audit-friendly case records.
          </div>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

export function ProblemCardGrid() {
  return (
    <section className="section-pad">
      <div className="site-shell">
        <SectionHeader
          label="The problem"
          title="Digital asset recovery operations break down when case records, evidence, and decisions live in disconnected tools."
          description="Teams need a repeatable operating model for intake, evidence review, readiness scoring, and case progression. Without one, the workflow becomes slower, riskier, and harder to audit."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {problemCards.map((card) => (
            <IconTextCard key={card.title} title={card.title} body={card.body} icon={card.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function SolutionCardGrid() {
  return (
    <section className="section-pad border-y border-[rgba(22,28,40,0.06)] bg-[rgba(255,253,248,0.6)]">
      <div className="site-shell">
        <SectionHeader
          label="Product capabilities"
          title="VaporVault provides the software layer for running recovery cases as a structured operation."
          description="Instead of stitching together tickets, screenshots, and notes, teams get a dedicated workspace for case intake, evidence tracking, readiness scoring, and progression management."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {capabilityCards.map((card) => (
            <IconTextCard key={card.title} title={card.title} body={card.body} icon={card.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function StepsRow() {
  return (
    <section className="section-pad" id="workflow">
      <div className="site-shell">
        <SectionHeader label="How it works" title="A narrow product loop built for repeatable recovery operations." />
        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {steps.map(([title, body], index) => (
            <Card key={title} className="relative h-full p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-primary-soft)] text-sm font-semibold text-[var(--color-primary)]">
                {index + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProductPreviewPanel() {
  return (
    <section className="section-pad border-y border-[rgba(22,28,40,0.06)] bg-[rgba(255,253,248,0.55)]">
      <div className="site-shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeader
            label="Product preview"
            title="A system of record for case intake, readiness scoring, and progression."
            description="The public preview shows the assessment flow. Inside the authenticated product, cases are saved to the workspace and can be reopened later from the dashboard."
          />
          <ul className="mt-8 space-y-4 text-sm text-muted">
            {[
              "Saved case records with review status and readiness score",
              "Evidence breakdown tied directly to the case",
              "Required documents and next actions in the same report",
              "Dashboard views for recent cases and progression state",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  +
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton href="/signup">Get Started</PrimaryButton>
            <SecondaryButton href="/demo">View Product</SecondaryButton>
          </div>
        </div>

        <Card className="p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_0.88fr]">
            <div className="surface-muted p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-ink">Recovery Readiness Report</p>
                  <p className="mt-1 text-xs text-muted">Case type, evidence score, review state, and next actions.</p>
                </div>
                <StatusBadge value="85%" />
              </div>

              <div className="mt-6 space-y-4">
                {[
                  ["Case Type", "Dormant domain recovery"],
                  ["Review Status", "Ready for Submission Review"],
                  ["Recommended Path", "Registrar-assisted ownership recovery"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white/85 p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">{label}</p>
                    <p className="mt-2 text-sm font-semibold text-ink">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="surface-muted p-5">
                <p className="text-sm font-semibold text-ink">Required documents</p>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  <li>Claimant authorization letter</li>
                  <li>Company registration certificate</li>
                  <li>Archived site evidence</li>
                </ul>
              </div>
              <div className="surface-muted p-5">
                <p className="text-sm font-semibold text-ink">Review signals</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <StatusBadge value="Low" />
                  <StatusBadge value="Medium" />
                  <StatusBadge value="Ready for Review" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

export function TrustGrid() {
  return (
    <section className="section-pad" id="trust">
      <div className="site-shell">
        <div className="rounded-[2rem] border border-[rgba(22,28,40,0.08)] bg-[rgba(240,237,229,0.7)] p-8 sm:p-10">
          <SectionHeader
            label="Trust and compliance"
            title="Built for documented, reviewable, compliance-aware operations."
            description="VaporVault is intentionally scoped around intake, evidence tracking, deterministic scoring, and reviewer-facing output. The platform does not perform recovery actions."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {trustCards.map((card) => (
              <Card key={card.title} className="h-full bg-white/85 p-6">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[rgba(54,85,211,0.08)]">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-[var(--color-primary)]" fill="none" strokeWidth="1.7">
                    <path
                      d="M12 3 6.5 5v6.5c0 3.6 2.2 6.8 5.5 8.5 3.3-1.7 5.5-4.9 5.5-8.5V5L12 3Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="m9.5 12 1.7 1.7 3.4-3.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-ink">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{card.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="section-pad pt-0">
      <div className="site-shell">
        <Card className="overflow-hidden border-[rgba(54,85,211,0.14)] bg-[linear-gradient(135deg,rgba(54,85,211,0.10),rgba(255,255,255,0.92))] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-3xl font-semibold tracking-[-0.04em] text-ink">
                Centralize digital asset recovery cases in one platform.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                Sign in to the product workspace, create a case, run the Recovery Readiness Engine, and save the result
                for later review.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <PrimaryButton href="/signup">Get Started</PrimaryButton>
              <SecondaryButton href="/login">Log In</SecondaryButton>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

export function LandingPage() {
  return (
    <>
      <HeroSplit />
      <ProblemCardGrid />
      <SolutionCardGrid />
      <StepsRow />
      <ProductPreviewPanel />
      <TrustGrid />

      <section className="section-pad" id="faq">
        <div className="site-shell">
          <SectionHeader
            label="FAQ"
            title="Answers for teams evaluating the platform."
            description="The MVP focuses on the real product loop: auth, protected routes, case creation, deterministic assessment, saved cases, and dashboard revisit."
          />

          <div className="mt-10 grid gap-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} defaultOpen={index === 0} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
