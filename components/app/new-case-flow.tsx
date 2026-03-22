"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, PrimaryButton, SecondaryButton } from "@/components/ui/primitives";
import { cn, randomUUID } from "@/lib/utils";
import { emptyEvidenceSignals, signalOptions } from "@/data/sampleCases";
import { evaluateCase } from "@/lib/engine";
import { createStoredCaseRecord, getCurrentSession, saveCaseRecord } from "@/lib/product/workspace-store";
import type { SavedCase } from "@/lib/product/types";

type AppCaseForm = {
  assetType: "Domain" | "Social Handle" | "SaaS Account" | "Other" | "";
  assetName: string;
  organization: string;
  reasonForRecovery: string;
  notes: string;
  evidenceSignals: typeof emptyEvidenceSignals;
};

const processingSteps = [
  "Validating case",
  "Scoring evidence",
  "Assessing readiness",
  "Generating recommendation",
];

const emptyForm: AppCaseForm = {
  assetType: "",
  assetName: "",
  organization: "",
  reasonForRecovery: "",
  notes: "",
  evidenceSignals: { ...emptyEvidenceSignals },
};

export function NewCaseFlow() {
  const router = useRouter();
  const [view, setView] = useState<"form" | "processing">("form");
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<AppCaseForm>(emptyForm);

  useEffect(() => {
    if (!getCurrentSession()) {
      router.replace("/login");
      return;
    }
  }, [router]);

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
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function toggleSignal(signalKey: keyof typeof emptyEvidenceSignals) {
    setForm((current) => ({
      ...current,
      evidenceSignals: {
        ...current.evidenceSignals,
        [signalKey]: !current.evidenceSignals[signalKey],
      },
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setView("processing");
    setStepIndex(0);

    const payload = {
      assetType: form.assetType || "Other",
      assetName: form.assetName,
      organization: form.organization,
      reasonForRecovery: form.reasonForRecovery,
      notes: form.notes || undefined,
      evidenceSignals: form.evidenceSignals,
    };

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 1900));

      const session = getCurrentSession();

      if (!session) {
        throw new Error("Sign in to create a case.");
      }

      const assessment = evaluateCase(payload);
      const caseId = randomUUID();
      const caseItem: SavedCase = {
        id: caseId,
        status: assessment.reviewStatus,
        createdAt: new Date().toISOString(),
        input: payload,
        assessment,
      };

      saveCaseRecord(createStoredCaseRecord(caseItem, session.id));
      router.push(`/app/cases/${caseId}`);
      router.refresh();
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "Unable to create case.");
      setView("form");
    }
  }

  return view === "processing" ? (
    <div className="mx-auto max-w-3xl">
      <Card className="p-8 sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary-soft)]">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-[rgba(54,85,211,0.16)] border-t-[var(--color-primary)]" />
        </div>
        <h1 className="mt-6 text-center text-3xl font-semibold tracking-[-0.04em] text-ink">Creating case</h1>
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
                {index < stepIndex ? "OK" : `S${index + 1}`}
              </span>
              <p className="text-sm font-medium text-ink">{step}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  ) : (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">New Case</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink">
          Create a recovery case
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Capture the case record, score readiness, and save the resulting assessment into this browser workspace.
        </p>
      </Card>

      <Card className="p-8 sm:p-10">
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-5">
              <label className="block">
                <span className="field-label">Asset Type</span>
                <select
                  className="field mt-2"
                  value={form.assetType}
                  onChange={(event) => updateField("assetType", event.target.value)}
                  required
                >
                  <option value="">Select asset type</option>
                  <option value="Domain">Domain</option>
                  <option value="Social Handle">Social Handle</option>
                  <option value="SaaS Account">SaaS Account</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label className="block">
                <span className="field-label">Asset Name</span>
                <input
                  className="field mt-2"
                  value={form.assetName}
                  onChange={(event) => updateField("assetName", event.target.value)}
                  placeholder="vapourltagentlabs.com"
                  required
                />
              </label>

              <label className="block">
                <span className="field-label">Organization</span>
                <input
                  className="field mt-2"
                  value={form.organization}
                  onChange={(event) => updateField("organization", event.target.value)}
                  placeholder="Vapor Labs Ltd"
                  required
                />
              </label>

              <label className="block">
                <span className="field-label">Reason for Recovery</span>
                <textarea
                  className="field mt-2 min-h-[140px] resize-none"
                  value={form.reasonForRecovery}
                  onChange={(event) => updateField("reasonForRecovery", event.target.value)}
                  placeholder="Describe why this asset needs review and progression."
                  required
                />
              </label>

              <label className="block">
                <span className="field-label">Notes (optional)</span>
                <textarea
                  className="field mt-2 min-h-[110px] resize-none"
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  placeholder="Add any case context that should remain in the system of record."
                />
              </label>
            </div>

            <div className="surface-muted p-6">
              <p className="field-label">Evidence signals</p>
              <div className="mt-5 grid gap-3">
                {signalOptions.map((signal) => {
                  const active = form.evidenceSignals[signal.key];

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

          {error ? (
            <div className="rounded-2xl border border-[rgba(142,75,75,0.18)] bg-[rgba(142,75,75,0.08)] px-4 py-3 text-sm text-[var(--color-danger)]">
              {error}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3 border-t border-[var(--color-border)] pt-6">
            <PrimaryButton type="submit">Submit Case</PrimaryButton>
            <SecondaryButton href="/app">Back to Dashboard</SecondaryButton>
          </div>
        </form>
      </Card>
    </div>
  );
}
