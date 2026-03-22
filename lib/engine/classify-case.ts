import type { CaseInput, ClassifiedCase } from "./types";

export function classifyCase(input: CaseInput): ClassifiedCase {
  const reason = input.reasonForRecovery.toLowerCase();

  if (input.assetType === "Domain") {
    if (
      reason.includes("portfolio") ||
      reason.includes("legacy") ||
      reason.includes("dormant") ||
      reason.includes("inactive")
    ) {
      return {
        caseType: "Dormant domain recovery",
        defaultPath: "Registrar-assisted ownership recovery",
        assetSpecificRequirement: "Archived site evidence",
      };
    }

    return {
      caseType: "Dormant domain recovery",
      defaultPath: "Registrar-assisted ownership recovery",
      assetSpecificRequirement: "Archived site evidence",
    };
  }

  if (input.assetType === "Social Handle") {
    return {
      caseType: "Branded handle recovery",
      defaultPath: "Manual platform escalation",
      assetSpecificRequirement: "Historic profile evidence",
    };
  }

  if (input.assetType === "SaaS Account") {
    return {
      caseType: "Administrative account recovery",
      defaultPath: "Administrative ownership review",
      assetSpecificRequirement: "Prior admin continuity evidence",
    };
  }

  return {
    caseType: "General documentation review case",
    defaultPath: "Documentation review and manual triage",
    assetSpecificRequirement: "Supporting ownership documentation",
  };
}
