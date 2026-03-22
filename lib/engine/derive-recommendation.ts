import type { AssessmentResult, CaseInput, ClassifiedCase, EvidenceScore, RiskFlag } from "./types";

function deriveRiskFlags(input: CaseInput, score: EvidenceScore): RiskFlag[] {
  const unauthorizedRisk: RiskFlag = {
    label: "Unauthorized access risk",
    level: "Blocked",
    detail: "The workflow supports only lawful, documented recovery actions.",
  };

  const impersonationRisk: RiskFlag = {
    label: "Impersonation risk",
    level: input.evidenceSignals.companyRegistrationDocuments ? "Low" : "Medium",
    detail: input.evidenceSignals.companyRegistrationDocuments
      ? "Claimant organization evidence is present."
      : "Organization proof should be added before formal review.",
  };

  const proofGapSeverity: RiskFlag = {
    label: "Proof gap severity",
    level: score.readinessScore >= 80 ? "Low" : score.readinessScore >= 55 ? "Medium" : "High",
    detail:
      score.readinessScore >= 80
        ? "Evidence is mostly complete for a formal review."
        : score.readinessScore >= 55
          ? "The case is viable but still missing important supporting material."
          : "The case needs stronger documentation before it can move forward.",
  };

  const manualReview: RiskFlag = {
    label: "Manual validation required",
    level: "Blocked",
    detail: "A human reviewer is required before any external recovery request is prepared.",
  };

  return [unauthorizedRisk, impersonationRisk, proofGapSeverity, manualReview];
}

function deriveNextActions(requiredDocuments: string[], readinessLevel: AssessmentResult["readinessLevel"]) {
  const nextActions = requiredDocuments
    .slice(0, 3)
    .map((document) => `Attach ${document.toLowerCase()}`);

  if (readinessLevel === "High") {
    nextActions.push("Route the case to formal reviewer validation");
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
  const reviewStatus =
    score.readinessScore >= 80
      ? "Ready for formal review"
      : score.readinessScore >= 55
        ? "Awaiting required documents"
        : "Needs evidence review";

  return {
    reviewStatus,
    recommendedPath: classifiedCase.recommendedPath,
    riskFlags: deriveRiskFlags(input, score),
    nextActions: deriveNextActions(requiredDocuments, score.readinessLevel),
  };
}
