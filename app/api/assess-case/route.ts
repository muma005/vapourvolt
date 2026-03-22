import { NextResponse } from "next/server";
import { evaluateCase, type AssetType, type CaseInput, type EvidenceSignals } from "../../../lib/engine";

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readBoolean(value: unknown) {
  return value === true;
}

function parseEvidenceSignals(value: unknown): EvidenceSignals | null {
  if (!isObject(value)) {
    return null;
  }

  return {
    trademarkRecord: readBoolean(value.trademarkRecord),
    historicalBillingProof: readBoolean(value.historicalBillingProof),
    companyRegistrationDocuments: readBoolean(value.companyRegistrationDocuments),
    priorAdminEmailEvidence: readBoolean(value.priorAdminEmailEvidence),
    archivedWebsiteEvidence: readBoolean(value.archivedWebsiteEvidence),
    supportCorrespondence: readBoolean(value.supportCorrespondence),
  };
}

function parseAssetType(value: unknown): AssetType | null {
  if (value === "Domain" || value === "Social Handle" || value === "SaaS Account" || value === "Other") {
    return value;
  }

  return null;
}

function parseCaseInput(value: unknown): CaseInput | null {
  if (!isObject(value)) {
    return null;
  }

  const assetType = parseAssetType(value.assetType);
  const evidenceSignals = parseEvidenceSignals(value.evidenceSignals);

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
  try {
    const payload = parseCaseInput(await request.json());

    if (!payload) {
      return NextResponse.json({ error: "Invalid case payload." }, { status: 400 });
    }

    const assessment = evaluateCase(payload);

    return NextResponse.json({ assessment });
  } catch {
    return NextResponse.json({ error: "Unable to assess case." }, { status: 400 });
  }
}
