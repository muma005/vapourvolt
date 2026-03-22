import { CaseDetail } from "@/components/app/case-detail";

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CaseDetail caseId={id} />;
}
