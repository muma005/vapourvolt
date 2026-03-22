import { buildAssessmentSummary } from "./build-assessment-summary";
import { classifyCase } from "./classify-case";
import { deriveRecommendation } from "./derive-recommendation";
import { deriveRequirements } from "./derive-requirements";
import { normalizeCaseInput } from "./normalize-case-input";
import { scoreEvidence } from "./score-evidence";
import type { AssessmentResult, CaseInput } from "./types";

export function evaluateCase(rawInput: CaseInput): AssessmentResult {
  const input = normalizeCaseInput(rawInput);
  const classifiedCase = classifyCase(input);
  const score = scoreEvidence(input);
  const requiredDocuments = deriveRequirements(
    input.assetType,
    score.missingSignalKeys,
    classifiedCase.assetSpecificRequirement,
  );
  const recommendation = deriveRecommendation(input, classifiedCase, score, requiredDocuments);

  const assessmentBase = {
    caseType: classifiedCase.caseType,
    readinessScore: score.readinessScore,
    readinessLevel: score.readinessLevel,
    reviewStatus: recommendation.reviewStatus,
    recommendedPath: recommendation.recommendedPath,
    riskFlags: recommendation.riskFlags,
    requiredDocuments,
    nextActions: recommendation.nextActions,
    evidenceBreakdown: score.evidenceBreakdown,
  };

  return {
    ...assessmentBase,
    summary: buildAssessmentSummary(input, assessmentBase),
  };
}
