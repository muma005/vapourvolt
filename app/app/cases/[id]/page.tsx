import { notFound } from "next/navigation";
import { CaseReport } from "@/components/app/case-report";
import { getUserCaseById } from "@/lib/db/cases";
import { requireUser } from "@/lib/auth/require-user";

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;
  const caseItem = await getUserCaseById(user.id, id);

  if (!caseItem) {
    notFound();
  }

  return <CaseReport caseItem={caseItem} />;
}
