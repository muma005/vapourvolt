import type { AssetType, EvidenceSignals } from "./types";

const signalDocumentMap: Record<keyof EvidenceSignals, string> = {
  trademarkRecord: "Trademark registration or brand ownership evidence",
  historicalBillingProof: "Historical billing statement",
  companyRegistrationDocuments: "Company registration certificate",
  priorAdminEmailEvidence: "Prior admin continuity evidence",
  archivedWebsiteEvidence: "Archive or historical asset evidence",
  supportCorrespondence: "Support correspondence reference",
};

export function deriveRequirements(
  assetType: AssetType,
  missingSignals: Array<keyof EvidenceSignals>,
  assetSpecificRequirement: string,
) {
  const requiredDocuments = ["Claimant authorization letter"];

  for (const signal of missingSignals) {
    const mapped = signalDocumentMap[signal];

    if (mapped && !requiredDocuments.includes(mapped)) {
      requiredDocuments.push(mapped);
    }
  }

  if (!requiredDocuments.includes(assetSpecificRequirement)) {
    requiredDocuments.push(assetSpecificRequirement);
  }

  if (assetType === "SaaS Account" && !requiredDocuments.includes("Workspace or account continuity reference")) {
    requiredDocuments.push("Workspace or account continuity reference");
  }

  if (requiredDocuments.length === 1) {
    requiredDocuments.push("Formal reviewer sign-off");
  }

  return requiredDocuments;
}
