"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import {
  buildGeneratedCase,
  emptyDemoForm,
  sampleCases,
  sampleCaseSubtitles,
  sampleCaseToFormState,
  signalOptions,
  type DemoFormSignal,
  type DemoFormState,
  type SampleCase,
} from "@/data/sampleCases";
import { cn } from "@/lib/utils";
import { Card, MetricCard, PrimaryButton, SecondaryButton } from "@/components/ui/primitives";
import { StatusBadge } from "@/components/ui/status-badge";

type DemoView = "intro" | "intake" | "processing" | "report" | "dashboard";

const processingSteps = [
  "Validating case inputs",
  "Reviewing ownership signals",
  "Checking documentation completeness",
  "Building recovery recommendation",
];

const dashboardNav = ["Overview", "Cases", "Reviews", "Documents", "Activity"];

function findMatchedCase(formState: DemoFormState) {
  return sampleCases.find((caseItem) => {
    const candidate = sampleCaseToFormState(caseItem);
    return (
      candidate.assetType === formState.assetType &&
      candidate.assetName === formState.assetName &&
      candidate.organization === formState.organization &&
      candidate.reason === formState.reason &&
      candidate.signals.length === formState.signals.length &&
      candidate.signals.every((signal) => formState.signals.includes(signal))
    );
  });
}

function activeTimelineIndex(status: string) {
  const value = status.toLowerCase();
  if (value.includes("ready")) return 4;
  if (value.includes("awaiting")) return 3;
  if (value.includes("progress")) return 2;
  return 1;
}

function allDashboardCases(reportCase: SampleCase | null) {
  if (!reportCase || sampleCases.some((caseItem) => caseItem.id === reportCase.id)) return sampleCases;
  return [reportCase, ...sampleCases];
}

export function DemoExperience() {
  const initialCase = sampleCases[0];
  const [view, setView] = useState<DemoView>("intro");
  const [selectedSampleId, setSelectedSampleId] = useState(initialCase.id);
  const [formState, setFormState] = useState<DemoFormState>(sampleCaseToFormState(initialCase));
  const [pendingCase, setPendingCase] = useState<SampleCase | null>(null);
  const [reportCase, setReportCase] = useState<SampleCase | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [dashboardSelectedId, setDashboardSelectedId] = useState(initialCase.id);

  const selectedSample = sampleCases.find((caseItem) => caseItem.id === selectedSampleId) ?? initialCase;
  const dashboardCases = allDashboardCases(reportCase);
  const selectedDashboardCase =
    dashboardCases.find((caseItem) => caseItem.id === dashboardSelectedId) ?? reportCase ?? initialCase;

  useEffect(() => {
    if (view !== "processing" || !pendingCase) return;

    const intervalId = window.setInterval(() => {
      setStepIndex((current) => (current < processingSteps.length - 1 ? current + 1 : current));
    }, 450);

    const timeoutId = window.setTimeout(() => {
      setReportCase(pendingCase);
      setDashboardSelectedId(pendingCase.id);
      setView("report");
    }, 1900);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(timeoutId);
    };
  }, [pendingCase, view]);

  function updateField(field: keyof DemoFormState, value: string | DemoFormSignal[]) {
    setFormState((current) => ({ ...current, [field]: value }));
  }

  function toggleSignal(signal: DemoFormSignal) {
    setFormState((current) => ({
      ...current,
      signals: current.signals.includes(signal)
        ? current.signals.filter((item) => item !== signal)
        : [...current.signals, signal],
    }));
  }

  function loadSample(caseItem: SampleCase) {
    setSelectedSampleId(caseItem.id);
    setFormState(sampleCaseToFormState(caseItem));
    setView("intake");
  }

  function startBlank() {
    setFormState(emptyDemoForm);
    setView("intake");
  }

  function generateReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPendingCase(findMatchedCase(formState) ?? buildGeneratedCase(formState));
    setStepIndex(0);
    setView("processing");
  }

  return (
    <main className="min-h-screen pb-12">
      <div className="site-shell pt-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border border-[rgba(22,28,40,0.08)] bg-[rgba(255,253,248,0.76)] px-5 py-4 backdrop-blur-xl">
          <div>
            <p className="text-sm font-semibold text-ink">VaporVault demo</p>
            <p className="mt-1 text-sm text-muted">Local interactive workflow preview</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/" className="text-sm font-medium text-muted transition hover:text-ink">
              Back to product
            </Link>
            <PrimaryButton href="/contact">Request Access</PrimaryButton>
          </div>
        </div>

        {view === "intro" ? (
          <Card className="p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <span className="eyebrow">Interactive recovery workflow demo</span>
                <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] text-ink sm:text-5xl">
                  Interactive recovery workflow demo
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
                  Load a sample case or enter your own details to see how VaporVault structures a lawful recovery
                  workflow.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <PrimaryButton onClick={() => loadSample(selectedSample)}>Load Sample Case</PrimaryButton>
                <SecondaryButton onClick={startBlank}>Start Blank Case</SecondaryButton>
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {sampleCases.slice(0, 3).map((caseItem) => (
                <button
                  key={caseItem.id}
                  type="button"
                  onClick={() => setSelectedSampleId(caseItem.id)}
                  className={cn(
                    "surface-card h-full p-6 text-left transition",
                    selectedSampleId === caseItem.id
                      ? "border-[rgba(54,85,211,0.28)] bg-white shadow-[0_16px_40px_rgba(54,85,211,0.12)]"
                      : "hover:bg-white",
                  )}
                >
                  <StatusBadge value={caseItem.status} />
                  <h2 className="mt-5 text-xl font-semibold text-ink">{caseItem.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{sampleCaseSubtitles[caseItem.id]}</p>
                </button>
              ))}
            </div>
          </Card>
        ) : null}

        {view === "intake" ? (
          <Card className="p-8 sm:p-10">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-ink">Case intake</h1>
              <p className="mt-4 text-base leading-7 text-muted">
                Enter the case details and available ownership signals to generate a structured readiness report.
              </p>
            </div>

            <form className="mt-10" onSubmit={generateReport}>
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-5">
                  <label className="block">
                    <span className="field-label">Asset Type</span>
                    <select
                      className="field mt-2"
                      value={formState.assetType}
                      onChange={(event) => updateField("assetType", event.target.value)}
                      required
                    >
                      <option value="">Select asset type</option>
                      <option value="Domain">Domain</option>
                      <option value="Social Handle">Social Handle</option>
                      <option value="SaaS Account">SaaS Account</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="field-label">Asset Name</span>
                    <input
                      className="field mt-2"
                      value={formState.assetName}
                      onChange={(event) => updateField("assetName", event.target.value)}
                      placeholder="vaporvaultlabs.com"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="field-label">Claimed Organization</span>
                    <input
                      className="field mt-2"
                      value={formState.organization}
                      onChange={(event) => updateField("organization", event.target.value)}
                      placeholder="Vapor Labs Ltd"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="field-label">Reason for Recovery</span>
                    <textarea
                      className="field mt-2 min-h-[168px] resize-none"
                      value={formState.reason}
                      onChange={(event) => updateField("reason", event.target.value)}
                      placeholder="Legacy domain tied to inactive business unit"
                      required
                    />
                  </label>
                </div>

                <div className="surface-muted p-6">
                  <p className="field-label">Available Ownership Signals</p>
                  <div className="mt-5 grid gap-3">
                    {signalOptions.map((signal) => {
                      const active = formState.signals.includes(signal);
                      return (
                        <button
                          key={signal}
                          type="button"
                          onClick={() => toggleSignal(signal)}
                          className={cn(
                            "flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition",
                            active
                              ? "border-[rgba(54,85,211,0.24)] bg-white"
                              : "border-[rgba(22,28,40,0.08)] bg-[rgba(255,255,255,0.55)] hover:bg-white/80",
                          )}
                        >
                          <span className="text-sm font-medium text-ink">{signal}</span>
                          <span
                            className={cn(
                              "inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs",
                              active
                                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                                : "border-[var(--color-border)] text-transparent",
                            )}
                          >
                            ✓
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 border-t border-[var(--color-border)] pt-6">
                <SecondaryButton onClick={() => setView("intro")}>Back</SecondaryButton>
                <SecondaryButton onClick={() => loadSample(selectedSample)}>Load Sample Data</SecondaryButton>
                <PrimaryButton type="submit">Generate Recovery Report</PrimaryButton>
              </div>
            </form>
          </Card>
        ) : null}

        {view === "processing" ? (
          <div className="mx-auto max-w-2xl">
            <Card className="p-8 sm:p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-soft)]">
                <div className="h-7 w-7 animate-spin rounded-full border-2 border-[rgba(54,85,211,0.16)] border-t-[var(--color-primary)]" />
              </div>
              <h1 className="mt-6 text-center text-3xl font-semibold tracking-[-0.04em] text-ink">Building report</h1>
              <div className="mt-8 space-y-4">
                {processingSteps.map((step, index) => (
                  <div
                    key={step}
                    className={cn(
                      "flex items-center gap-4 rounded-2xl border px-5 py-4 transition",
                      index <= stepIndex
                        ? "border-[rgba(54,85,211,0.2)] bg-[rgba(54,85,211,0.08)]"
                        : "border-[var(--color-border)] bg-white/55",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                        index < stepIndex
                          ? "bg-[var(--color-primary)] text-white"
                          : index === stepIndex
                            ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                            : "bg-[rgba(22,28,40,0.06)] text-muted",
                      )}
                    >
                      {index < stepIndex ? "✓" : index + 1}
                    </span>
                    <p className="text-sm font-medium text-ink">{step}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ) : null}

        {view === "report" && reportCase ? (
          <ReportView caseItem={reportCase} onOpenDashboard={() => setView("dashboard")} />
        ) : null}

        {view === "dashboard" && reportCase ? (
          <DashboardView
            cases={dashboardCases}
            selectedCase={selectedDashboardCase}
            onSelectCase={setDashboardSelectedId}
            onNewCase={startBlank}
          />
        ) : null}
      </div>
    </main>
  );
}

function ReportView({ caseItem, onOpenDashboard }: { caseItem: SampleCase; onOpenDashboard: () => void }) {
  const signalRows = [
    ["Trademark evidence", caseItem.ownershipSignals.trademark],
    ["Billing continuity", caseItem.ownershipSignals.billing],
    ["Admin continuity", caseItem.ownershipSignals.adminContinuity],
    ["Archive/history evidence", caseItem.ownershipSignals.archiveEvidence],
    ["Documentation completeness", `${caseItem.ownershipSignals.documentationCompleteness}%`],
  ];
  const riskRows = [
    ["Unauthorized access risk", caseItem.riskChecks.unauthorizedAccessRisk],
    ["Impersonation risk", caseItem.riskChecks.impersonationRisk],
    ["Proof gap severity", caseItem.riskChecks.proofGapSeverity],
    ["Manual validation required", caseItem.riskChecks.manualValidationRequired],
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-ink">Recovery Readiness Report</h1>
            <p className="mt-3 text-base leading-7 text-muted">
              Case classification, documentation review, and recommended path.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <SecondaryButton>Export PDF</SecondaryButton>
            <PrimaryButton onClick={onOpenDashboard}>Open Dashboard</PrimaryButton>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Asset Type" value={caseItem.assetType} />
        <MetricCard label="Case Category" value={caseItem.category} />
        <MetricCard label="Readiness Score" value={`${caseItem.readinessScore}%`} />
        <MetricCard label="Review Status" value={caseItem.reviewStatus} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-ink">Case summary</h3>
            <div className="mt-5 space-y-4">
              {[
                ["Asset", caseItem.assetName],
                ["Claimed owner", caseItem.organization],
                ["Reason for recovery", caseItem.reason],
                ["Recommended pathway", caseItem.recommendedPath],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-[rgba(22,28,40,0.08)] bg-white/75 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-ink">{value}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-ink">Ownership signals</h3>
            <div className="mt-5 space-y-3">
              {signalRows.map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[rgba(22,28,40,0.08)] bg-white/75 px-4 py-3"
                >
                  <span className="text-sm font-medium text-ink">{label}</span>
                  <StatusBadge value={value} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-ink">Required documents</h3>
            <div className="mt-5 space-y-3">
              {caseItem.requiredDocuments.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-[rgba(22,28,40,0.08)] bg-white/75 px-4 py-3 text-sm text-ink"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-ink">Risk and compliance</h3>
            <div className="mt-5 rounded-[1.25rem] border border-[rgba(22,28,40,0.08)] bg-[rgba(240,237,229,0.72)] p-4">
              <div className="space-y-3">
                {riskRows.map(([label, value]) => (
                  <div key={label} className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm text-muted">{label}</span>
                    <StatusBadge value={value} />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card className="border-[rgba(54,85,211,0.14)] bg-[rgba(54,85,211,0.08)] p-6">
        <h3 className="text-lg font-semibold text-ink">Recommended next step</h3>
        <p className="mt-4 text-sm leading-7 text-muted">
          Proceed with document completion and formal review. Current signals support a registrar-led recovery
          request, but claimant authorization and billing continuity should be completed before submission.
        </p>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-ink">Case timeline</h3>
        <div className="mt-6 space-y-4">
          {caseItem.timeline.map((item, index) => (
            <div key={item} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold",
                    index < activeTimelineIndex(caseItem.status)
                      ? "bg-[var(--color-primary)] text-white"
                      : index === activeTimelineIndex(caseItem.status)
                        ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                        : "bg-[rgba(22,28,40,0.06)] text-muted",
                  )}
                >
                  {index < activeTimelineIndex(caseItem.status) ? "✓" : index + 1}
                </span>
                {index < caseItem.timeline.length - 1 ? <span className="mt-2 h-10 w-px bg-[var(--color-border)]" /> : null}
              </div>
              <p className="pt-1 text-sm font-medium text-ink">{item}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function DashboardView({
  cases,
  selectedCase,
  onSelectCase,
  onNewCase,
}: {
  cases: SampleCase[];
  selectedCase: SampleCase;
  onSelectCase: (caseId: string) => void;
  onNewCase: () => void;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="hidden rounded-[1.75rem] border border-[rgba(22,28,40,0.08)] bg-[rgba(255,253,248,0.9)] p-5 lg:block">
        <div className="rounded-2xl bg-[var(--color-primary)] px-4 py-4 text-white">
          <p className="text-xs uppercase tracking-[0.16em] text-white/70">VaporVault</p>
          <p className="mt-2 text-lg font-semibold">Recovery workspace</p>
        </div>
        <nav className="mt-6 space-y-2">
          {dashboardNav.map((item) => (
            <div
              key={item}
              className={cn(
                "rounded-2xl px-4 py-3 text-sm font-medium",
                item === "Cases" ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]" : "text-muted",
              )}
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      <div className="space-y-6">
        <Card className="p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative max-w-md flex-1">
              <input className="field !rounded-full pr-12" placeholder="Search cases" />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted">⌕</span>
            </div>
            <div className="flex items-center gap-3">
              <PrimaryButton onClick={onNewCase}>New Case</PrimaryButton>
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white/80 text-sm font-semibold text-ink">
                VV
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr_0.9fr]">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-ink">Cases</h3>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">{cases.length} active</p>
            </div>
            <div className="mt-5 space-y-3">
              {cases.map((caseItem) => (
                <button
                  key={caseItem.id}
                  type="button"
                  onClick={() => onSelectCase(caseItem.id)}
                  className={cn(
                    "w-full rounded-2xl border px-4 py-4 text-left transition",
                    selectedCase.id === caseItem.id
                      ? "border-[rgba(54,85,211,0.24)] bg-[rgba(54,85,211,0.08)]"
                      : "border-[rgba(22,28,40,0.08)] bg-white/75 hover:bg-white",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-ink">{caseItem.assetName}</p>
                    <StatusBadge value={caseItem.status} />
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted">Selected case</p>
                <h3 className="mt-2 text-2xl font-semibold text-ink">{selectedCase.assetName}</h3>
              </div>
              <StatusBadge value={selectedCase.status} />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Claimant", selectedCase.organization],
                ["Asset Type", selectedCase.assetType],
                ["Readiness Score", `${selectedCase.readinessScore}%`],
                ["Recommended Path", selectedCase.recommendedPath],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-[rgba(22,28,40,0.08)] bg-white/75 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-ink">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[rgba(22,28,40,0.08)] bg-[rgba(240,237,229,0.72)] p-5">
              <p className="text-sm font-semibold text-ink">Summary</p>
              <p className="mt-3 text-sm leading-7 text-muted">
                {selectedCase.reason}. Recommended pathway: {selectedCase.recommendedPath}.
              </p>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-5">
              <h3 className="text-base font-semibold text-ink">Required actions</h3>
              <div className="mt-4 space-y-3">
                {[
                  "Upload claimant authorization",
                  "Verify billing continuity",
                  "Confirm support reference",
                  "Route to reviewer",
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

            <Card className="p-5">
              <h3 className="text-base font-semibold text-ink">Activity feed</h3>
              <div className="mt-4 space-y-3">
                {selectedCase.activity.map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-muted">
                    <span className="mt-2 inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-primary)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="text-base font-semibold text-ink">Recommendation summary</h3>
              <p className="mt-4 text-sm leading-7 text-muted">
                Proceed with document completion and formal review. Current signals support a registrar-led recovery
                request, but claimant authorization and billing continuity should be completed before submission.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
