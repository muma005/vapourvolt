import { LocalCaseDetail } from "@/components/app/local-case-detail";

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <LocalCaseDetail caseId={id} />;
}
