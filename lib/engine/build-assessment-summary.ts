import type { AssessmentResult, CaseInput } from "./types";

export function buildAssessmentSummary(input: CaseInput, assessment: Omit<AssessmentResult, "summary">) {
  const presentSignals = assessment.evidenceBreakdown.filter((item) => item.present).length;
  const missingItems = assessment.requiredDocuments.length;

  return `${input.assetName} is classified as ${assessment.caseType.toLowerCase()} with a ${assessment.readinessLevel.toLowerCase()} readiness score of ${assessment.readinessScore}%. ${presentSignals} evidence signals are present, ${missingItems} document requirements remain, and the recommended lawful path is ${assessment.recommendedPath.toLowerCase()}.`;
}
