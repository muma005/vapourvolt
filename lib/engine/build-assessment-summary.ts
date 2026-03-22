import type { AssessmentResult, CaseInput } from "./types";

export function buildAssessmentSummary(input: CaseInput, assessment: Omit<AssessmentResult, "summary">) {
  const presentSignals = assessment.evidenceBreakdown.filter((item) => item.present).length;
  const missingItems = assessment.requiredDocuments.length;

  return `${input.assetName} is classified as ${assessment.caseType.toLowerCase()} with a ${assessment.readinessLevel.toLowerCase()} readiness score of ${assessment.readinessScore}%. ${presentSignals} evidence signals are currently present, ${missingItems} required records remain in the case file, and the next platform path is ${assessment.recommendedPath.toLowerCase()}.`;
}
