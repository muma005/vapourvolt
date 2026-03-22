import { Card, MetricCard } from "@/components/ui/primitives";
import { StatusBadge } from "@/components/ui/status-badge";
import type { SavedCase } from "@/lib/product/types";

export function CaseReport({ caseItem }: { caseItem: SavedCase }) {
  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-ink">{caseItem.input.assetName}</h1>
            <p className="mt-3 text-base leading-7 text-muted">
              Saved case record with readiness output, document gaps, and next actions.
            </p>
          </div>
          <StatusBadge value={caseItem.status} />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Asset Type" value={caseItem.input.assetType} />
        <MetricCard label="Case Type" value={caseItem.assessment.caseType} />
        <MetricCard label="Readiness Score" value={`${caseItem.assessment.readinessScore}%`} />
        <MetricCard label="Review Status" value={caseItem.assessment.reviewStatus} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-ink">Case record</h2>
            <div className="mt-5 space-y-4">
              {[
                ["Asset", caseItem.input.assetName],
                ["Organization", caseItem.input.organization],
                ["Reason", caseItem.input.reasonForRecovery],
                ["Created", new Date(caseItem.createdAt).toLocaleString()],
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
            <h2 className="text-lg font-semibold text-ink">Evidence breakdown</h2>
            <div className="mt-5 space-y-3">
              {caseItem.assessment.evidenceBreakdown.map((item) => (
                <div key={item.key} className="rounded-2xl border border-[rgba(22,28,40,0.08)] bg-white/75 px-4 py-3">
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
            <h2 className="text-lg font-semibold text-ink">Recommended path</h2>
            <p className="mt-4 text-sm leading-7 text-muted">{caseItem.assessment.recommendedPath}</p>
            <div className="mt-5 grid gap-3">
              {caseItem.assessment.nextActions.map((action) => (
                <div
                  key={action}
                  className="rounded-2xl border border-[rgba(54,85,211,0.16)] bg-[rgba(54,85,211,0.06)] px-4 py-3 text-sm text-ink"
                >
                  {action}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-ink">Required documents</h2>
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
            <h2 className="text-lg font-semibold text-ink">Risk and compliance</h2>
            <div className="mt-5 space-y-3">
              {caseItem.assessment.riskFlags.map((flag) => (
                <div key={flag.label} className="rounded-2xl border border-[rgba(22,28,40,0.08)] bg-white/75 px-4 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm font-medium text-ink">{flag.label}</span>
                    <StatusBadge value={flag.level} />
                  </div>
                  <p className="mt-2 text-xs leading-6 text-muted">{flag.detail}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold text-ink">Summary</h2>
            <p className="mt-4 text-sm leading-7 text-muted">{caseItem.assessment.summary}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
