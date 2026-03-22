import { AccordionItem } from "@/components/ui/accordion-item";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, IconTextCard, PrimaryButton, SectionHeader, SecondaryButton } from "@/components/ui/primitives";

const capabilityCards = [
  {
    title: "Case intake",
    body: "Capture asset details, claimant context, and structured recovery reasons in one repeatable intake flow.",
    icon: <LineIcon path="M7 6h10l2 3v9H5V9l2-3Z" />,
  },
  {
    title: "Evidence tracking",
    body: "Keep ownership signals, continuity proof, and document gaps visible inside a single case system.",
    icon: <LineIcon path="M7 17 10.5 13.5 13 16l4-5" />,
  },
  {
    title: "Readiness scoring",
    body: "Run a structured assessment engine that classifies the case, scores evidence, and sets review state.",
    icon: <LineIcon path="M6 15 10 11l3 3 5-6" />,
  },
  {
    title: "Case progression",
    body: "Track recommendations, status changes, and next actions from intake through submission readiness.",
    icon: <LineIcon path="M7 7h10v10H7zM10 10h4v4h-4z" />,
  },
];

const problemCards = [
  {
    title: "Disconnected records",
    body: "Recovery cases break when evidence, screenshots, and ownership notes are scattered across inboxes, support threads, and spreadsheets.",
    icon: <LineIcon path="M5 6.5h14M5 12h9M5 17.5h14" />,
  },
  {
    title: "No shared readiness state",
    body: "Teams can collect proof, but still lack a clear view of whether a case is ready for review or missing critical evidence.",
    icon: <LineIcon path="M12 5v7l4 3M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />,
  },
  {
    title: "Workflow drift",
    body: "Without a dedicated platform, next actions, required documents, and review progression slip between disconnected tools.",
    icon: <LineIcon path="M6 7h12M6 12h7M6 17h10" />,
  },
];

const workflowSteps = [
  ["Create case", "Open a structured case record with asset details, organization, and recovery context."],
  ["Add evidence signals", "Toggle claimant and continuity signals so the case has a clear evidence profile."],
  ["Run assessment", "Let the Recovery Readiness Engine classify the case and score available proof."],
  ["Review recommendation", "Read the recommended path, required documents, and review state in one report."],
  ["Track progression", "Return to saved cases later and keep the operation moving from a single workspace."],
];

const trustCards = [
  {
    title: "Structured for lawful workflows",
    body: "The platform is framed around documented case intake, evidence handling, and bounded review outputs.",
  },
  {
    title: "Documented case handling",
    body: "Every case keeps its evidence profile, recommendations, and required records in a single system of record.",
  },
  {
    title: "Bounded recommendations",
    body: "The engine produces structured recommendations and readiness states. It does not perform recovery actions.",
  },
  {
    title: "Audit-friendly progression",
    body: "Status changes, proof gaps, and next actions remain visible as the case moves through review.",
  },
];

const faqs = [
  {
    question: "What kind of product is VapourltAgent?",
    answer:
      "VapourltAgent is a case management and recovery readiness platform for digital asset operations. It centralizes intake, evidence tracking, readiness scoring, and case progression in one product workflow.",
  },
  {
    question: "What is the Recovery Readiness Engine?",
    answer:
      "The Recovery Readiness Engine classifies incoming cases, scores the available evidence, identifies proof gaps, and returns a structured recommendation with next actions.",
  },
  {
    question: "Is this a working product or just a concept site?",
    answer:
      "It is a working product loop. Users can sign in, create a case, run an assessment, and revisit saved cases from the dashboard.",
  },
  {
    question: "Does VapourltAgent automate recovery actions?",
    answer:
      "No. VapourltAgent is a structured operations platform. It provides readiness scoring, evidence tracking, and review outputs, but it does not perform unauthorized access or automated recovery behavior.",
  },
  {
    question: "Who is it built for?",
    answer:
      "The platform is designed for operations, legal, brand protection, and portfolio teams managing recovery-sensitive digital assets as an operational workflow.",
  },
];

const credibilityItems = [
  "Real sign-in",
  "Structured case intake",
  "Working assessment engine",
];

const productProofItems = [
  "Users can sign in and enter a real product workspace.",
  "Cases can be created from a structured intake flow.",
  "The readiness engine returns a working assessment report.",
  "Saved cases can be reopened later from the dashboard.",
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
    <div className="ui-frame">
      <div className="ui-frame__topbar">
        <div className="flex items-center gap-2">
          <span className="ui-frame__dot bg-[rgba(142,75,75,0.85)]" />
          <span className="ui-frame__dot bg-[rgba(156,106,28,0.85)]" />
          <span className="ui-frame__dot bg-[rgba(63,120,86,0.85)]" />
        </div>
        <div className="rounded-full border border-[rgba(22,28,40,0.08)] bg-white/80 px-3 py-1 text-[11px] font-medium text-muted">
          vapourltagent.app
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-4">
          <div className="product-panel p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-ink">Active cases</p>
                <p className="mt-1 text-xs text-muted">Workspace queue</p>
              </div>
              <StatusBadge value="Ready for Review" />
            </div>
            <div className="mt-4 space-y-3">
              {[
                ["vapourltagentlabs.com", "Ready for Submission Review"],
                ["@vapourltagenthq", "Manual Review Required"],
                ["Workspace-19", "Needs Evidence"],
              ].map(([label, status], index) => (
                <div
                  key={label}
                  className={`rounded-2xl border px-4 py-3 ${index === 0 ? "border-[rgba(54,85,211,0.24)] bg-white" : "border-transparent bg-white/75"}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-ink">{label}</p>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-muted">Case {index + 1}</span>
                  </div>
                  <p className="mt-2 text-xs text-muted">{status}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="product-panel p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Readiness score</p>
              <p className="mt-3 text-3xl font-semibold text-ink">85%</p>
              <p className="mt-2 text-xs text-muted">High readiness with one document gap still open.</p>
            </div>
            <div className="product-panel p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Evidence completeness</p>
              <p className="mt-3 text-3xl font-semibold text-ink">5 / 6</p>
              <p className="mt-2 text-xs text-muted">Most ownership and continuity signals are already attached.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="product-panel p-4">
            <div className="flex flex-wrap gap-2">
              <StatusBadge value="Ready for Submission Review" />
              <StatusBadge value="Low" />
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.92fr]">
              <div>
                <p className="text-sm font-semibold text-ink">Recommended path</p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Registrar-assisted ownership recovery with a structured document package and reviewer validation.
                </p>
              </div>
              <div className="rounded-2xl border border-[rgba(22,28,40,0.08)] bg-white/75 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted">Next actions</p>
                <div className="mt-3 space-y-2">
                  {[
                    "Attach claimant authorization",
                    "Route to submission review",
                    "Keep reviewer notes in record",
                  ].map((item) => (
                    <div key={item} className="rounded-xl bg-[rgba(240,237,229,0.75)] px-3 py-2 text-xs text-ink">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[0.95fr_1.05fr]">
            <div className="product-panel p-4">
              <p className="text-sm font-semibold text-ink">Status badges</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <StatusBadge value="Ready for Review" />
                <StatusBadge value="Manual Review Required" />
                <StatusBadge value="Needs Evidence" />
              </div>
            </div>
            <div className="product-panel p-4">
              <p className="text-sm font-semibold text-ink">Recent activity</p>
              <div className="mt-4 space-y-3 text-sm text-muted">
                {[
                  "Case created and normalized",
                  "Evidence score recalculated",
                  "Proof gap flagged",
                  "Review state updated",
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
      </div>
    </div>
  );
}

function CredibilityStrip() {
  return (
    <section className="section-pad pt-0">
      <div className="site-shell">
        <div className="credibility-strip">
          {credibilityItems.map((item) => (
            <div key={item} className="proof-chip">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-primary)]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeroSplit() {
  return (
    <section className="section-pad pb-4 pt-16" id="product">
      <div className="site-shell grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <span className="eyebrow">Digital asset recovery operations platform</span>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-ink sm:text-6xl">
            The case management and recovery readiness platform for digital asset operations.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            VapourltAgent centralizes case intake, evidence tracking, readiness scoring, and case progression in one
            structured system.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton href="/signup">Get Started</PrimaryButton>
            <SecondaryButton href="/demo">View Product</SecondaryButton>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-success)]" />
            Real sign-in • Structured case intake • Working assessment engine
          </div>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

function ProblemCardGrid() {
  return (
    <section className="section-pad" id="problem">
      <div className="site-shell">
        <SectionHeader
          label="The problem"
          title="Recovery cases break when evidence, ownership signals, and next steps are scattered across disconnected tools."
          description="The workflow often fragments across inboxes, screenshots, support threads, notes, and spreadsheets. VapourltAgent addresses that as a software systems problem, not a service coordination problem."
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

function CapabilitiesGrid() {
  return (
    <section className="section-pad border-y border-[rgba(22,28,40,0.06)] bg-[rgba(255,253,248,0.62)]" id="capabilities">
      <div className="site-shell">
        <SectionHeader
          label="Product capabilities"
          title="A productized workflow built around case intake, evidence tracking, readiness scoring, and progression."
          description="Each capability is visible in the product itself. VapourltAgent is a workspace teams log into, not a service wrapper around manual process."
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

function WorkflowSection() {
  return (
    <section className="section-pad" id="workflow">
      <div className="site-shell">
        <SectionHeader
          label="Workflow"
          title="A repeatable operational loop for digital asset case progression."
          description="The product keeps the workflow structured from first intake through recommendation and follow-through."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          {workflowSteps.map(([title, body], index) => (
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

function ProductPreviewSection() {
  return (
    <section className="section-pad border-y border-[rgba(22,28,40,0.06)] bg-[rgba(255,253,248,0.58)]" id="preview">
      <div className="site-shell">
        <SectionHeader
          label="Product preview"
          title="Three core product surfaces, visible on the site."
          description="The platform is easiest to understand when the product itself is visible: dashboard, intake, and assessment report."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Card className="p-5">
            <div className="product-panel p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink">Dashboard</p>
                <StatusBadge value="Cases" />
              </div>
              <div className="mt-4 space-y-3">
                {[
                  ["Total Cases", "12"],
                  ["High Readiness", "4"],
                  ["Action Required", "8"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl bg-white/75 px-4 py-3">
                    <span className="text-xs uppercase tracking-[0.14em] text-muted">{label}</span>
                    <span className="text-sm font-semibold text-ink">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">
              Dashboard view for recent cases, readiness state, and operational activity.
            </p>
          </Card>

          <Card className="p-5">
            <div className="product-panel p-4">
              <div className="grid gap-3">
                {["Asset Type", "Asset Name", "Organization", "Reason for Recovery"].map((label) => (
                  <div key={label} className="rounded-2xl bg-white/75 px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-muted">{label}</p>
                    <div className="mt-2 h-3 rounded-full bg-[rgba(22,28,40,0.08)]" />
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">
              Case intake surface for structured input and evidence signal capture.
            </p>
          </Card>

          <Card className="p-5">
            <div className="product-panel p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-ink">Assessment report</p>
                <StatusBadge value="85%" />
              </div>
              <div className="mt-4 space-y-3">
                {[
                  "Dormant domain recovery",
                  "Registrar-assisted ownership recovery",
                  "Required documents and next actions",
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/75 px-4 py-3 text-sm text-ink">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">
              Structured report output with case classification, scoring, and recommendation detail.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}

function EngineSection() {
  return (
    <section className="section-pad" id="engine">
      <div className="site-shell grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SectionHeader
            label="Recovery Readiness Engine"
            title="Built around a structured assessment engine."
            description="The VapourltAgent Recovery Readiness Engine classifies incoming cases, scores available evidence, identifies proof gaps, and generates a structured recovery recommendation."
          />
        </div>

        <Card className="p-6">
          <div className="engine-flow">
            {["Case Input", "Evidence Scoring", "Readiness Assessment", "Recommendation Output"].map((item, index) => (
              <div key={item} className="engine-flow__step">
                <span className="text-sm font-semibold text-ink">{item}</span>
                {index < 3 ? <span className="engine-flow__arrow">→</span> : null}
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="product-panel p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">Inputs</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Asset type, organization, recovery reason, and evidence signals feed the engine.
              </p>
            </div>
            <div className="product-panel p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">Outputs</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Case type, readiness score, review status, required documents, and next actions.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

function WorkingProductProof() {
  return (
    <section className="section-pad border-y border-[rgba(22,28,40,0.06)] bg-[rgba(255,253,248,0.62)]" id="proof">
      <div className="site-shell">
        <div className="rounded-[2rem] border border-[rgba(22,28,40,0.08)] bg-[rgba(240,237,229,0.72)] p-8 sm:p-10">
          <SectionHeader
            label="Working product proof"
            title="A working product loop, not just a concept."
            description="Users can sign in, create a case, run a readiness assessment, and revisit saved cases from the dashboard."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {productProofItems.map((item, index) => (
              <div key={item} className="working-proof-card">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-sm font-semibold text-[var(--color-primary)]">
                  {index + 1}
                </span>
                <p className="mt-4 text-sm leading-7 text-ink">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustGrid() {
  return (
    <section className="section-pad" id="trust">
      <div className="site-shell">
        <SectionHeader
          label="Trust and compliance"
          title="Software-first, but safely framed for documented case operations."
          description="VapourltAgent is positioned around structured workflows, bounded recommendations, and audit-friendly progression tracking."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {trustCards.map((card) => (
            <Card key={card.title} className="h-full p-6">
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[rgba(54,85,211,0.08)]">
                <svg viewBox="0 0 24 24" className="h-5 w-5 stroke-[var(--color-primary)]" fill="none" strokeWidth="1.7">
                  <path d="M12 3 6.5 5v6.5c0 3.6 2.2 6.8 5.5 8.5 3.3-1.7 5.5-4.9 5.5-8.5V5L12 3Z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="m9.5 12 1.7 1.7 3.4-3.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-ink">{card.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{card.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section-pad pt-0">
      <div className="site-shell">
        <Card className="overflow-hidden border-[rgba(54,85,211,0.14)] bg-[linear-gradient(135deg,rgba(54,85,211,0.10),rgba(255,255,255,0.92))] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-3xl font-semibold tracking-[-0.04em] text-ink">
                Run digital asset case operations from one working platform.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                Get started with sign-in, structured case intake, a working assessment engine, and saved case revisit
                from the dashboard.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <PrimaryButton href="/signup">Get Started</PrimaryButton>
              <SecondaryButton href="/demo">View Product</SecondaryButton>
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
      <CredibilityStrip />
      <ProblemCardGrid />
      <CapabilitiesGrid />
      <WorkflowSection />
      <ProductPreviewSection />
      <EngineSection />
      <WorkingProductProof />
      <TrustGrid />

      <section className="section-pad" id="faq">
        <div className="site-shell">
          <SectionHeader
            label="FAQ"
            title="Answers for teams evaluating the platform."
            description="The website now presents VapourltAgent as working software: real sign-in, structured case intake, a readiness engine, and saved case revisit."
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
