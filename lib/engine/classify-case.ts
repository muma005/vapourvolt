import type { CaseInput, ClassifiedCase } from "./types";

export function classifyCase(input: CaseInput): ClassifiedCase {
  const reason = input.reasonForRecovery.toLowerCase();

  if (input.assetType === "Domain") {
    if (reason.includes("portfolio")) {
      return {
        caseType: "Portfolio recovery",
        recommendedPath: "Registrar-assisted ownership recovery",
        assetSpecificRequirement: "Archive or DNS evidence",
      };
    }

    if (reason.includes("legacy") || reason.includes("dormant") || reason.includes("inactive")) {
      return {
        caseType: "Dormant asset recovery",
        recommendedPath: "Registrar-assisted ownership recovery",
        assetSpecificRequirement: "Archive or DNS evidence",
      };
    }

    return {
      caseType: "Domain ownership recovery",
      recommendedPath: "Registrar-assisted ownership recovery",
      assetSpecificRequirement: "Archive or DNS evidence",
    };
  }

  if (input.assetType === "Social Handle") {
    return {
      caseType: "Brand identity recovery",
      recommendedPath: "Platform-supported identity and brand review",
      assetSpecificRequirement: "Historic profile or archive evidence",
    };
  }

  return {
    caseType: "Administrative continuity restoration",
    recommendedPath: "Administrative continuity review and workspace recovery",
    assetSpecificRequirement: "Prior admin continuity evidence",
  };
}
