import Link from "next/link";
import { StatusBadge } from "@/components/ui/status-badge";
import { Card } from "@/components/ui/primitives";
import type { SavedCase } from "@/lib/db/types";

export function CasesTable({ cases }: { cases: SavedCase[] }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-ink">Recent cases</h2>
          <p className="mt-1 text-sm text-muted">Saved case records with readiness state and review status.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[rgba(22,28,40,0.08)] text-sm">
          <thead className="bg-[rgba(240,237,229,0.52)] text-left text-xs uppercase tracking-[0.14em] text-muted">
            <tr>
              <th className="px-6 py-4">Asset</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Score</th>
              <th className="px-6 py-4">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(22,28,40,0.08)] bg-white/70">
            {cases.map((caseItem) => (
              <tr key={caseItem.id}>
                <td className="px-6 py-4">
                  <Link href={`/app/cases/${caseItem.id}`} className="font-semibold text-ink transition hover:text-[var(--color-primary)]">
                    {caseItem.input.assetName}
                  </Link>
                  <p className="mt-1 text-xs text-muted">{caseItem.input.organization}</p>
                </td>
                <td className="px-6 py-4 text-ink">{caseItem.input.assetType}</td>
                <td className="px-6 py-4">
                  <StatusBadge value={caseItem.status} />
                </td>
                <td className="px-6 py-4 text-ink">{caseItem.assessment.readinessScore}%</td>
                <td className="px-6 py-4 text-muted">{new Date(caseItem.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
