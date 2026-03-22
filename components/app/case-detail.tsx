"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CaseReport } from "@/components/app/case-report";
import { findCaseById } from "@/lib/product/workspace-store";
import type { SavedCase } from "@/lib/product/types";

export function CaseDetail({ caseId }: { caseId: string }) {
  const router = useRouter();
  const [caseItem, setCaseItem] = useState<SavedCase | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const nextCase = findCaseById(caseId);

    if (!nextCase) {
      router.replace("/app");
      return;
    }

    setCaseItem(nextCase);
    setReady(true);
  }, [caseId, router]);

  if (!ready || !caseItem) {
    return (
      <div className="rounded-[1.75rem] border border-[rgba(22,28,40,0.08)] bg-white/75 px-6 py-10 text-sm text-muted">
        Loading case record...
      </div>
    );
  }

  return <CaseReport caseItem={caseItem} />;
}
