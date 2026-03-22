import { NextResponse } from "next/server";
import { getSessionPayload } from "@/lib/auth/session";
import { createCaseWithAssessment } from "@/lib/db/cases";
import { findUserById } from "@/lib/db/users";
import type { AssetType, CaseInput, EvidenceSignals } from "@/lib/engine";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseAssetType(value: unknown): AssetType | null {
  if (value === "Domain" || value === "Social Handle" || value === "SaaS Account" || value === "Other") {
    return value;
  }

  return null;
}

function parseSignals(value: unknown): EvidenceSignals | null {
  if (!isObject(value)) {
    return null;
  }

  return {
    trademarkRecord: value.trademarkRecord === true,
    historicalBillingProof: value.historicalBillingProof === true,
    companyRegistrationDocuments: value.companyRegistrationDocuments === true,
    priorAdminEmailEvidence: value.priorAdminEmailEvidence === true,
    archivedWebsiteEvidence: value.archivedWebsiteEvidence === true,
    supportCorrespondence: value.supportCorrespondence === true,
  };
}

function parseCaseInput(value: unknown): CaseInput | null {
  if (!isObject(value)) {
    return null;
  }

  const assetType = parseAssetType(value.assetType);
  const evidenceSignals = parseSignals(value.evidenceSignals);

  if (
    !assetType ||
    !evidenceSignals ||
    typeof value.assetName !== "string" ||
    typeof value.organization !== "string" ||
    typeof value.reasonForRecovery !== "string"
  ) {
    return null;
  }

  return {
    assetType,
    assetName: value.assetName,
    organization: value.organization,
    reasonForRecovery: value.reasonForRecovery,
    notes: typeof value.notes === "string" ? value.notes : undefined,
    evidenceSignals,
  };
}

export async function POST(request: Request) {
  const session = await getSessionPayload();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const user = findUserById(session.userId);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const input = parseCaseInput(await request.json());

  if (!input) {
    return NextResponse.json({ error: "Invalid case payload." }, { status: 400 });
  }

  const savedCase = await createCaseWithAssessment(user, input);

  return NextResponse.json({ caseId: savedCase.id, assessment: savedCase.assessment });
}
