import Link from "next/link";
import { CasesTable } from "@/components/app/cases-table";
import { Card, PrimaryButton, MetricCard } from "@/components/ui/primitives";
import { listUserCases } from "@/lib/db/cases";
import { hasSupabaseEnv } from "@/lib/auth/env";
import { requireUser } from "@/lib/auth/require-user";

export default async function AppDashboardPage() {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const user = await requireUser();
  const cases = await listUserCases(user!.id);
  const highReadiness = cases.filter((caseItem) => caseItem.assessment.readinessLevel === "High").length;
  const actionRequired = cases.filter((caseItem) => caseItem.status !== "Ready for Submission Review").length;

  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-ink">
              Digital asset recovery operations workspace
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
              Centralize case intake, score readiness, and track case progression through a structured system of record.
            </p>
          </div>
          <PrimaryButton href="/app/cases/new">New Case</PrimaryButton>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Total Cases" value={cases.length} />
        <MetricCard label="High Readiness" value={highReadiness} />
        <MetricCard label="Action Required" value={actionRequired} />
      </div>

      {cases.length > 0 ? (
        <CasesTable cases={cases} />
      ) : (
        <Card className="p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-ink">No cases yet</h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted">
            Create your first recovery case to generate a structured readiness report and save it into the dashboard.
          </p>
          <div className="mt-8">
            <PrimaryButton href="/app/cases/new">Create First Case</PrimaryButton>
          </div>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-ink">Next actions</h2>
          <div className="mt-5 grid gap-3">
            {[
              "Route high-readiness cases toward submission review",
              "Close documentation gaps on cases with open proof requirements",
              "Keep evidence, readiness, and review state inside one system of record",
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

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-ink">Recent activity</h2>
          <div className="mt-5 space-y-3">
            {(cases.slice(0, 4).length > 0 ? cases.slice(0, 4) : []).map((caseItem) => (
              <Link key={caseItem.id} href={`/app/cases/${caseItem.id}`} className="block rounded-2xl border border-[rgba(22,28,40,0.08)] bg-white/75 px-4 py-3">
                <p className="text-sm font-semibold text-ink">{caseItem.input.assetName}</p>
                <p className="mt-1 text-xs text-muted">{caseItem.assessment.reviewStatus}</p>
              </Link>
            ))}
            {cases.length === 0 ? (
              <p className="text-sm text-muted">Activity will appear here once cases are created and assessed.</p>
            ) : null}
          </div>
        </Card>
      </div>
    </div>
  );
}
