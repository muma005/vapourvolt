import type { AssessmentResult, CaseInput, ClassifiedCase, EvidenceScore, RiskFlag } from "./types";

function deriveRiskFlags(input: CaseInput, score: EvidenceScore): RiskFlag[] {
  const insufficientProof: RiskFlag = {
    label: "Insufficient proof",
    level: score.readinessScore >= 65 ? "Low" : score.readinessScore >= 35 ? "Medium" : "High",
    detail:
      score.readinessScore >= 65
        ? "Evidence coverage is strong enough for structured reviewer handling."
        : score.readinessScore >= 35
          ? "The case can be assessed, but material proof gaps remain."
          : "Additional documentation should be attached before the case moves forward.",
  };

  const documentationGap: RiskFlag = {
    label: "Documentation gap",
    level: score.missingSignalKeys.length <= 1 ? "Low" : score.missingSignalKeys.length <= 3 ? "Medium" : "High",
    detail:
      score.missingSignalKeys.length <= 1
        ? "Only a small number of supporting records are still missing."
        : score.missingSignalKeys.length <= 3
          ? "Several supporting records should be added to improve submission readiness."
          : "The case record is missing multiple key documents and continuity signals.",
  };

  const ownershipContinuity: RiskFlag = {
    label: "Incomplete ownership continuity",
    level:
      input.evidenceSignals.historicalBillingProof && input.evidenceSignals.priorAdminEmailEvidence
        ? "Low"
        : input.evidenceSignals.historicalBillingProof || input.evidenceSignals.priorAdminEmailEvidence
          ? "Medium"
          : "High",
    detail:
      input.evidenceSignals.historicalBillingProof && input.evidenceSignals.priorAdminEmailEvidence
        ? "Continuity evidence is present across prior billing and admin records."
        : input.evidenceSignals.historicalBillingProof || input.evidenceSignals.priorAdminEmailEvidence
          ? "Continuity is partially documented and may need reviewer follow-up."
          : "Continuity evidence is limited and requires closer validation.",
  };

  const claimantVerification: RiskFlag = {
    label: "Elevated claimant verification need",
    level:
      input.evidenceSignals.companyRegistrationDocuments && input.evidenceSignals.trademarkRecord
        ? "Low"
        : input.evidenceSignals.companyRegistrationDocuments
          ? "Medium"
          : "High",
    detail:
      input.evidenceSignals.companyRegistrationDocuments
        ? "Claimant verification is supported by organization documentation."
        : "Claimant verification should be strengthened with formal organization records.",
  };

  const manualReview: RiskFlag = {
    label: "Manual review required",
    level:
      input.assetType === "Domain" && score.readinessScore >= 65
        ? "Medium"
        : input.assetType === "SaaS Account" && score.readinessScore >= 65
          ? "Medium"
          : "High",
    detail: "All assessment outputs require reviewer validation before any external submission or escalation.",
  };

  return [insufficientProof, documentationGap, ownershipContinuity, claimantVerification, manualReview];
}

function deriveNextActions(requiredDocuments: string[], readinessLevel: AssessmentResult["readinessLevel"]) {
  const nextActions = requiredDocuments
    .slice(0, 3)
    .map((document) => `Attach ${document.toLowerCase()}`);

  if (readinessLevel === "High") {
    nextActions.push("Route the case to submission review");
  } else if (readinessLevel === "Moderate") {
    nextActions.push("Route the case to reviewer validation after the current gaps are addressed");
  } else {
    nextActions.push("Complete missing documentation before reviewer routing");
  }

  return nextActions.slice(0, 4);
}

export function deriveRecommendation(
  input: CaseInput,
  classifiedCase: ClassifiedCase,
  score: EvidenceScore,
  requiredDocuments: string[],
) {
  const hasContinuityStrength =
    input.evidenceSignals.historicalBillingProof && input.evidenceSignals.priorAdminEmailEvidence;
  const needsManualReview =
    input.assetType === "Social Handle" ||
    input.assetType === "Other" ||
    (input.assetType === "SaaS Account" && !hasContinuityStrength);

  let reviewStatus: AssessmentResult["reviewStatus"];

  if (score.readinessScore < 35) {
    reviewStatus = needsManualReview ? "Manual Review Required" : "Needs Evidence";
  } else if (needsManualReview) {
    reviewStatus = "Manual Review Required";
  } else if (score.readinessScore >= 65) {
    reviewStatus = "Ready for Submission Review";
  } else {
    reviewStatus = "Ready for Review";
  }

  let recommendedPath = classifiedCase.defaultPath;

  if (score.readinessScore < 35) {
    recommendedPath = "Documentation required before proceeding";
  } else if (input.assetType === "Domain" && score.readinessScore >= 65) {
    recommendedPath = "Registrar-assisted ownership recovery";
  } else if (input.assetType === "Social Handle" && score.readinessScore >= 35) {
    recommendedPath = "Manual platform escalation";
  } else if (input.assetType === "SaaS Account" && hasContinuityStrength && score.readinessScore >= 65) {
    recommendedPath = "Administrative ownership review";
  } else if (input.assetType === "Other") {
    recommendedPath = "Documentation review and manual triage";
  }

  return {
    reviewStatus,
    recommendedPath,
    riskFlags: deriveRiskFlags(input, score),
    nextActions: deriveNextActions(requiredDocuments, score.readinessLevel),
  };
}
