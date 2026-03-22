import type { CaseInput, EvidenceSignals } from "./types";

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

function cleanSignalValue(value: unknown) {
  return value === true;
}

export function normalizeCaseInput(input: CaseInput): CaseInput {
  const evidenceSignals: EvidenceSignals = {
    trademarkRecord: cleanSignalValue(input.evidenceSignals.trademarkRecord),
    historicalBillingProof: cleanSignalValue(input.evidenceSignals.historicalBillingProof),
    companyRegistrationDocuments: cleanSignalValue(input.evidenceSignals.companyRegistrationDocuments),
    priorAdminEmailEvidence: cleanSignalValue(input.evidenceSignals.priorAdminEmailEvidence),
    archivedWebsiteEvidence: cleanSignalValue(input.evidenceSignals.archivedWebsiteEvidence),
    supportCorrespondence: cleanSignalValue(input.evidenceSignals.supportCorrespondence),
  };

  const notes = cleanText(input.notes);

  return {
    assetType: input.assetType,
    assetName: cleanText(input.assetName),
    organization: cleanText(input.organization),
    reasonForRecovery: cleanText(input.reasonForRecovery),
    notes: notes || undefined,
    evidenceSignals,
  };
}
