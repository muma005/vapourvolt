import { notFound } from "next/navigation";
import { CaseReport } from "@/components/app/case-report";
import { getUserCaseById } from "@/lib/db/cases";
import { hasSupabaseEnv } from "@/lib/auth/env";
import { requireUser } from "@/lib/auth/require-user";

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const user = await requireUser();
  const { id } = await params;
  const caseItem = await getUserCaseById(user!.id, id);

  if (!caseItem) {
    notFound();
  }

  return <CaseReport caseItem={caseItem} />;
}
