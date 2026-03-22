"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  buildCustomDemoCase,
  emptyDemoForm,
  findSampleCaseByInput,
  formStateToCaseInput,
  getDashboardStatus,
  getTimelineSteps,
  sampleCases,
  sampleCaseToFormState,
  signalOptions,
  type DemoCaseRecord,
  type DemoFormState,
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

function activeTimelineIndex(reviewStatus: string) {
  const value = reviewStatus.toLowerCase();

  if (value.includes("ready")) {
    return 4;
  }

  if (value.includes("awaiting")) {
    return 3;
  }

  return 2;
}

function buildDashboardCases(customCase: DemoCaseRecord | null) {
  if (!customCase) {
    return sampleCases;
  }

  return [customCase, ...sampleCases];
}

export function DemoExperience() {
  const initialCase = sampleCases[0];
  const [view, setView] = useState<DemoView>("intro");
  const [selectedSampleId, setSelectedSampleId] = useState(initialCase.id);
  const [formState, setFormState] = useState<DemoFormState>(sampleCaseToFormState(initialCase));
  const [reportCase, setReportCase] = useState<DemoCaseRecord | null>(null);
  const [customCase, setCustomCase] = useState<DemoCaseRecord | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [dashboardSelectedId, setDashboardSelectedId] = useState(initialCase.id);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const selectedSample = sampleCases.find((caseItem) => caseItem.id === selectedSampleId) ?? initialCase;
  const dashboardCases = useMemo(() => buildDashboardCases(customCase), [customCase]);
  const selectedDashboardCase =
    dashboardCases.find((caseItem) => caseItem.id === dashboardSelectedId) ?? reportCase ?? initialCase;

  useEffect(() => {
    if (view !== "processing") {
      return;
    }

    const intervalId = window.setInterval(() => {
      setStepIndex((current) => (current < processingSteps.length - 1 ? current + 1 : current));
    }, 450);

    return () => window.clearInterval(intervalId);
  }, [view]);

  function updateField(
    field: "assetType" | "assetName" | "organization" | "reasonForRecovery" | "notes",
    value: string,
  ) {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function toggleSignal(signalKey: keyof DemoFormState["evidenceSignals"]) {
    setFormState((current) => ({
      ...current,
      evidenceSignals: {
        ...current.evidenceSignals,
        [signalKey]: !current.evidenceSignals[signalKey],
      },
    }));
  }

  function loadSample(caseItem: DemoCaseRecord) {
    setSelectedSampleId(caseItem.id);
    setSubmissionError(null);
    setFormState(sampleCaseToFormState(caseItem));
    setView("intake");
  }

  function startBlank() {
    setSubmissionError(null);
    setFormState(emptyDemoForm);
    setView("intake");
  }

  async function generateReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionError(null);
    setStepIndex(0);
    setView("processing");

    const input = formStateToCaseInput(formState);

    try {
      const [response] = await Promise.all([
        fetch("/api/assess-case", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }),
        new Promise((resolve) => window.setTimeout(resolve, 1900)),
      ]);

      if (!response.ok) {
        throw new Error("Assessment request failed");
      }

      const payload = (await response.json()) as { assessment: DemoCaseRecord["assessment"] };
      const matchedSample = findSampleCaseByInput(input);
      const nextCase = matchedSample ?? buildCustomDemoCase(input, payload.assessment);

      if (!matchedSample) {
        setCustomCase(nextCase);
      }

      setReportCase(nextCase);
      setDashboardSelectedId(nextCase.id);
      setView("report");
    } catch {
      setSubmissionError("Unable to assess this case right now. Please try again.");
      setView("intake");
    }
  }

  return (
    <main className="min-h-screen pb-12">
      <div className="site-shell pt-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-[1.75rem] border border-[rgba(22,28,40,0.08)] bg-[rgba(255,253,248,0.76)] px-5 py-4 backdrop-blur-xl">
          <div>
            <p className="text-sm font-semibold text-ink">VaporVault demo</p>
            <p className="mt-1 text-sm text-muted">Recovery Readiness Engine preview</p>
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
                  <StatusBadge value={getDashboardStatus(caseItem.assessment)} />
                  <h2 className="mt-5 text-xl font-semibold text-ink">{caseItem.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted">{caseItem.subtitle}</p>
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
              {submissionError ? (
                <div className="mt-5 rounded-2xl border border-[rgba(142,75,75,0.18)] bg-[rgba(142,75,75,0.08)] px-4 py-3 text-sm text-[var(--color-danger)]">
                  {submissionError}
                </div>
              ) : null}
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
                      className="field mt-2 min-h-[144px] resize-none"
                      value={formState.reasonForRecovery}
                      onChange={(event) => updateField("reasonForRecovery", event.target.value)}
                      placeholder="Legacy domain tied to inactive business unit"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="field-label">Notes (optional)</span>
                    <textarea
                      className="field mt-2 min-h-[112px] resize-none"
                      value={formState.notes}
                      onChange={(event) => updateField("notes", event.target.value)}
                      placeholder="Add context that helps a reviewer understand the recovery case."
                    />
                  </label>
                </div>

                <div className="surface-muted p-6">
                  <p className="field-label">Available Ownership Signals</p>
                  <div className="mt-5 grid gap-3">
                    {signalOptions.map((signal) => {
                      const active = formState.evidenceSignals[signal.key];

                      return (
                        <button
                          key={signal.key}
                          type="button"
                          onClick={() => toggleSignal(signal.key)}
                          className={cn(
                            "flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition",
                            active
                              ? "border-[rgba(54,85,211,0.24)] bg-white"
                              : "border-[rgba(22,28,40,0.08)] bg-[rgba(255,255,255,0.55)] hover:bg-white/80",
                          )}
                        >
                          <span className="text-sm font-medium text-ink">{signal.label}</span>
                          <span
                            className={cn(
                              "inline-flex min-w-[3rem] items-center justify-center rounded-full border px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]",
                              active
                                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                                : "border-[var(--color-border)] text-muted",
                            )}
                          >
                            {active ? "On" : "Off"}
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
                        "inline-flex h-8 min-w-[3rem] items-center justify-center rounded-full px-2 text-xs font-semibold uppercase",
                        index < stepIndex
                          ? "bg-[var(--color-primary)] text-white"
                          : index === stepIndex
                            ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                            : "bg-[rgba(22,28,40,0.06)] text-muted",
                      )}
                    >
                      {index < stepIndex ? "OK" : `Step ${index + 1}`}
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

function ReportView({
  caseItem,
  onOpenDashboard,
}: {
  caseItem: DemoCaseRecord;
  onOpenDashboard: () => void;
}) {
  const timelineSteps = getTimelineSteps(caseItem.assessment);

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
        <MetricCard label="Asset Type" value={caseItem.input.assetType} />
        <MetricCard label="Case Category" value={caseItem.assessment.caseType} />
        <MetricCard label="Readiness Score" value={`${caseItem.assessment.readinessScore}%`} />
        <MetricCard label="Review Status" value={caseItem.assessment.reviewStatus} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-ink">Case summary</h3>
            <div className="mt-5 space-y-4">
              {[
                ["Asset", caseItem.input.assetName],
                ["Claimed owner", caseItem.input.organization],
                ["Reason for recovery", caseItem.input.reasonForRecovery],
                ["Recommended pathway", caseItem.assessment.recommendedPath],
                ...(caseItem.input.notes ? [["Notes", caseItem.input.notes]] : []),
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
              {caseItem.assessment.evidenceBreakdown.map((item) => (
                <div
                  key={item.key}
                  className="rounded-2xl border border-[rgba(22,28,40,0.08)] bg-white/75 px-4 py-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm font-medium text-ink">{item.label}</span>
                    <StatusBadge value={item.strength} />
                  </div>
                  <p className="mt-2 text-xs leading-6 text-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-ink">Required documents</h3>
            <div className="mt-5 space-y-3">
              {caseItem.assessment.requiredDocuments.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-[rgba(22,28,40,0.08)] bg-white/75 px-4 py-3 text-sm text-ink"
                >
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-primary)]" />
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-ink">Risk and compliance</h3>
            <div className="mt-5 rounded-[1.25rem] border border-[rgba(22,28,40,0.08)] bg-[rgba(240,237,229,0.72)] p-4">
              <div className="space-y-3">
                {caseItem.assessment.riskFlags.map((flag) => (
                  <div key={flag.label} className="rounded-2xl bg-white/70 px-4 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-sm font-medium text-ink">{flag.label}</span>
                      <StatusBadge value={flag.level} />
                    </div>
                    <p className="mt-2 text-xs leading-6 text-muted">{flag.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card className="border-[rgba(54,85,211,0.14)] bg-[rgba(54,85,211,0.08)] p-6">
        <h3 className="text-lg font-semibold text-ink">Recommended next step</h3>
        <p className="mt-4 text-sm leading-7 text-muted">{caseItem.assessment.summary}</p>
        <div className="mt-5 grid gap-3">
          {caseItem.assessment.nextActions.map((action) => (
            <div
              key={action}
              className="rounded-2xl border border-[rgba(54,85,211,0.16)] bg-white/70 px-4 py-3 text-sm text-ink"
            >
              {action}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-ink">Case timeline</h3>
        <div className="mt-6 space-y-4">
          {timelineSteps.map((item, index) => (
            <div key={item} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "inline-flex h-8 min-w-[3rem] items-center justify-center rounded-full px-2 text-xs font-semibold uppercase",
                    index < activeTimelineIndex(caseItem.assessment.reviewStatus)
                      ? "bg-[var(--color-primary)] text-white"
                      : index === activeTimelineIndex(caseItem.assessment.reviewStatus)
                        ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                        : "bg-[rgba(22,28,40,0.06)] text-muted",
                  )}
                >
                  {index < activeTimelineIndex(caseItem.assessment.reviewStatus) ? "OK" : `S${index + 1}`}
                </span>
                {index < timelineSteps.length - 1 ? <span className="mt-2 h-10 w-px bg-[var(--color-border)]" /> : null}
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
  cases: DemoCaseRecord[];
  selectedCase: DemoCaseRecord;
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
            <div className="max-w-md flex-1">
              <input className="field !rounded-full" placeholder="Search cases" />
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
                    <p className="text-sm font-semibold text-ink">{caseItem.input.assetName}</p>
                    <StatusBadge value={getDashboardStatus(caseItem.assessment)} />
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-muted">Selected case</p>
                <h3 className="mt-2 text-2xl font-semibold text-ink">{selectedCase.input.assetName}</h3>
              </div>
              <StatusBadge value={getDashboardStatus(selectedCase.assessment)} />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Claimant", selectedCase.input.organization],
                ["Asset Type", selectedCase.input.assetType],
                ["Readiness Score", `${selectedCase.assessment.readinessScore}%`],
                ["Recommended Path", selectedCase.assessment.recommendedPath],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-[rgba(22,28,40,0.08)] bg-white/75 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">{label}</p>
                  <p className="mt-2 text-sm font-semibold text-ink">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[rgba(22,28,40,0.08)] bg-[rgba(240,237,229,0.72)] p-5">
              <p className="text-sm font-semibold text-ink">Summary</p>
              <p className="mt-3 text-sm leading-7 text-muted">{selectedCase.assessment.summary}</p>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-5">
              <h3 className="text-base font-semibold text-ink">Required actions</h3>
              <div className="mt-4 space-y-3">
                {selectedCase.assessment.nextActions.map((item) => (
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
              <p className="mt-4 text-sm leading-7 text-muted">{selectedCase.assessment.summary}</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
