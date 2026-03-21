import Link from "next/link";
import { AccordionItem } from "@/components/ui/accordion-item";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card, IconTextCard, PrimaryButton, SectionHeader, SecondaryButton } from "@/components/ui/primitives";

const problemCards = [
  {
    title: "Scattered evidence",
    body: "Ownership signals, billing history, screenshots, and legal documents end up fragmented across tools.",
    icon: <LineIcon path="M5 6.5h14M5 12h9M5 17.5h14" />,
  },
  {
    title: "Unclear recovery readiness",
    body: "Teams know a case matters, but not whether the documentation is strong enough to proceed.",
    icon: <LineIcon path="M12 5v7l4 3M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />,
  },
  {
    title: "No structured workflow",
    body: "Without a clear case system, recovery efforts stall between review, follow-up, and submission.",
    icon: <LineIcon path="M6 7h12M6 12h7M6 17h10" />,
  },
];

const solutionCards = [
  {
    title: "Case intake",
    body: "Capture asset details, claimant information, and available ownership signals in one place.",
    icon: <LineIcon path="M7 6h10l2 3v9H5V9l2-3Z" />,
  },
  {
    title: "Evidence review",
    body: "Organize supporting materials and identify proof gaps before the case moves forward.",
    icon: <LineIcon path="M7 17 10.5 13.5 13 16l4-5" />,
  },
  {
    title: "Recovery readiness",
    body: "Generate a clear recommendation path based on case type, evidence strength, and review requirements.",
    icon: <LineIcon path="M6 15 10 11l3 3 5-6" />,
  },
  {
    title: "Case tracking",
    body: "Track progress, required actions, and status changes from intake to submission readiness.",
    icon: <LineIcon path="M7 7h10v10H7zM10 10h4v4h-4z" />,
  },
];

const steps = [
  ["Submit a case", "Enter the asset, claimant, and reason for recovery."],
  ["Review signals", "Assess ownership indicators, evidence strength, and missing documentation."],
  ["Generate a recovery plan", "See the recommended path, proof requirements, and human review status."],
  ["Track the case", "Manage progress, pending tasks, and case history in one dashboard."],
];

const trustCards = [
  {
    title: "No unauthorized access",
    body: "The workflow does not support intrusion, bypass, or account takeover methods.",
  },
  {
    title: "Evidence-based handling",
    body: "Cases move forward through documentation, ownership signals, and reviewable records.",
  },
  {
    title: "Human-reviewed decisions",
    body: "Recommendations are surfaced clearly, with manual validation where required.",
  },
  {
    title: "Audit-friendly records",
    body: "Case history, status progression, and document requirements stay visible and structured.",
  },
];

const faqs = [
  {
    question: "What kinds of assets can VaporVault support?",
    answer:
      "VaporVault is designed for structured recovery workflows around digital assets such as domains, branded handles, legacy SaaS accounts, and other digital properties where lawful recovery requires documentation and process control.",
  },
  {
    question: "Does VaporVault perform recovery automatically?",
    answer:
      "No. VaporVault helps teams organize cases, assess readiness, and manage the workflow required for lawful recovery. It is a workflow and documentation product, not an automated takeover tool.",
  },
  {
    question: "Who is this built for?",
    answer:
      "The product is best suited for operations, legal, brand protection, portfolio management, and internal teams handling recovery-sensitive digital assets.",
  },
  {
    question: "How does VaporVault handle compliance?",
    answer:
      "The product is framed around documented workflows, bounded recommendations, visible risk checks, and human review where required.",
  },
  {
    question: "Can this integrate with external systems later?",
    answer:
      "Yes. Future versions can support registrar workflows, internal case systems, and document pipelines, but the first version focuses on core workflow clarity.",
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
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
        <div>
          <p className="text-sm font-semibold text-ink">Active Cases</p>
          <p className="mt-1 text-xs text-muted">Operations workspace</p>
        </div>
        <StatusBadge value="Awaiting Review" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.85fr_1.25fr]">
        <div className="surface-muted p-4">
          <div className="space-y-3">
            {["vaporvaultlabs.com", "@vaporvaulthq", "Workspace-19"].map((caseName, index) => (
              <div
                key={caseName}
                className={`rounded-2xl border px-4 py-3 ${index === 0 ? "border-[rgba(54,85,211,0.22)] bg-white" : "border-transparent bg-white/55"}`}
              >
                <p className="text-sm font-medium text-ink">{caseName}</p>
                <p className="mt-1 text-xs text-muted">{index === 0 ? "Ready for Submission" : "Ownership Signals"}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="surface-muted p-4">
            <div className="flex flex-wrap gap-2">
              <StatusBadge value="Recovery Path" />
              <StatusBadge value="Required Documents" />
            </div>
            <p className="mt-4 text-sm leading-6 text-muted">
              Selected case panel with ownership review, checklist progression, and next-step guidance.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="surface-muted p-4">
              <p className="text-sm font-semibold text-ink">Checklist</p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>Claimant authorization</li>
                <li>Archive evidence</li>
                <li>Billing continuity</li>
              </ul>
            </div>
            <div className="surface-muted p-4">
              <p className="text-sm font-semibold text-ink">Recommendation</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Registrar-assisted ownership recovery with formal review before submission.
              </p>
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
      <div className="site-shell grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="eyebrow">Lawful digital asset recovery workflow</span>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold tracking-[-0.06em] text-ink sm:text-6xl">
            Bring structure, evidence, and visibility to digital asset recovery.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            VaporVault helps teams assess cases, collect supporting evidence, and manage lawful recovery
            workflows for domains, accounts, and digital properties.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton href="/demo">Try Demo</PrimaryButton>
            <SecondaryButton href="/#workflow">See Workflow</SecondaryButton>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-success)]" />
            Evidence-led. Audit-friendly. Built for lawful recovery operations.
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
          title="Recovery work breaks down when evidence, ownership signals, and next steps live in scattered systems."
          description="Teams often handle recovery cases across inboxes, screenshots, legal notes, support tickets, and spreadsheets. That slows decisions, weakens documentation, and increases operational risk."
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
          label="The solution"
          title="VaporVault turns recovery cases into a clear operational workflow."
          description="Instead of managing recovery through disconnected documents and manual follow-up, teams can run each case through a structured, reviewable process."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {solutionCards.map((card) => (
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
        <SectionHeader label="How it works" title="A simple workflow for complex recovery cases." />
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
      <div className="site-shell grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeader
            label="Product preview"
            title="A workspace built for recovery operations."
            description="See case status, ownership signals, document requirements, and review notes in a structured interface designed for compliance-sensitive workflows."
          />
          <ul className="mt-8 space-y-4 text-sm text-muted">
            {[
              "Recovery readiness report",
              "Ownership signal scoring",
              "Required document checklist",
              "Status tracking and activity history",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <PrimaryButton href="/demo">Explore the demo</PrimaryButton>
          </div>
        </div>

        <Card className="p-6">
          <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
            <div className="surface-muted p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-ink">Recovery Readiness Report</p>
                  <p className="mt-1 text-xs text-muted">Case classification, documentation review, and recommended path.</p>
                </div>
                <StatusBadge value="72%" />
              </div>

              <div className="mt-6 space-y-4">
                {[
                  ["Asset Type", "Domain"],
                  ["Case Category", "Dormant asset recovery"],
                  ["Review Status", "Human review required"],
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
                <p className="text-sm font-semibold text-ink">Required Documents</p>
                <ul className="mt-4 space-y-3 text-sm text-muted">
                  <li>Company registration certificate</li>
                  <li>Historical billing statement</li>
                  <li>Claimant authorization letter</li>
                </ul>
              </div>
              <div className="surface-muted p-5">
                <p className="text-sm font-semibold text-ink">Risk and compliance</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <StatusBadge value="Blocked" />
                  <StatusBadge value="Low" />
                  <StatusBadge value="Medium" />
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
            title="Designed for lawful, documented recovery workflows."
            description="VaporVault is framed around structured review, evidence handling, and clearly bounded recovery processes."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {trustCards.map((card) => (
              <Card key={card.title} className="h-full bg-white/85 p-6">
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
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="section-pad pt-0">
      <div className="site-shell">
        <Card className="overflow-hidden border-[rgba(54,85,211,0.14)] bg-[linear-gradient(135deg,rgba(54,85,211,0.10),rgba(255,255,255,0.9))] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-3xl font-semibold tracking-[-0.04em] text-ink">
                See how structured digital asset recovery should work.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                Explore the interactive demo and walk through a sample recovery case from intake to readiness report.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <PrimaryButton href="/demo">Try Demo</PrimaryButton>
              <SecondaryButton href="/contact">Request Access</SecondaryButton>
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
            title="Answers for teams evaluating the workflow."
            description="The first release focuses on workflow clarity, evidence handling, and compliance-friendly case management."
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
