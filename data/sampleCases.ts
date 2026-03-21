export type SampleCase = {
  id: string;
  title: string;
  assetType: "Domain" | "Social Handle" | "SaaS Account";
  assetName: string;
  organization: string;
  reason: string;
  category: string;
  readinessScore: number;
  reviewStatus: string;
  recommendedPath: string;
  ownershipSignals: {
    trademark: "Strong" | "Moderate" | "Partial" | "None";
    billing: "Strong" | "Moderate" | "Partial" | "None";
    adminContinuity: "Strong" | "Moderate" | "Partial" | "None";
    archiveEvidence: "Strong" | "Moderate" | "Partial" | "None";
    documentationCompleteness: number;
  };
  requiredDocuments: string[];
  riskChecks: {
    unauthorizedAccessRisk: string;
    impersonationRisk: string;
    proofGapSeverity: string;
    manualValidationRequired: string;
  };
  timeline: string[];
  status: string;
  activity: string[];
};

export type DemoFormSignal =
  | "Trademark record"
  | "Historical billing proof"
  | "Company registration documents"
  | "Prior admin email evidence"
  | "Archived website evidence"
  | "Registrar/support correspondence";

export type DemoFormState = {
  assetType: SampleCase["assetType"] | "";
  assetName: string;
  organization: string;
  reason: string;
  signals: DemoFormSignal[];
};

export const signalOptions: DemoFormSignal[] = [
  "Trademark record",
  "Historical billing proof",
  "Company registration documents",
  "Prior admin email evidence",
  "Archived website evidence",
  "Registrar/support correspondence",
];

export const emptyDemoForm: DemoFormState = {
  assetType: "",
  assetName: "",
  organization: "",
  reason: "",
  signals: [],
};

export const sampleCases: SampleCase[] = [
  {
    id: "dormant-company-domain",
    title: "Dormant company domain",
    assetType: "Domain",
    assetName: "vaporvaultlabs.com",
    organization: "Vapor Labs Ltd",
    reason: "Legacy domain tied to inactive business unit",
    category: "Dormant asset recovery",
    readinessScore: 72,
    reviewStatus: "Human review required",
    recommendedPath: "Registrar-assisted ownership recovery",
    ownershipSignals: {
      trademark: "Strong",
      billing: "Partial",
      adminContinuity: "Moderate",
      archiveEvidence: "Strong",
      documentationCompleteness: 72,
    },
    requiredDocuments: [
      "Company registration certificate",
      "Historical billing statement",
      "Claimant authorization letter",
      "Archive or DNS evidence",
      "Support correspondence reference",
    ],
    riskChecks: {
      unauthorizedAccessRisk: "Blocked",
      impersonationRisk: "Low",
      proofGapSeverity: "Medium",
      manualValidationRequired: "Yes",
    },
    timeline: [
      "Intake completed",
      "Initial signals reviewed",
      "Documentation gaps identified",
      "Awaiting claimant documents",
      "Ready for submission review",
    ],
    status: "Awaiting Docs",
    activity: [
      "Case created",
      "Evidence signals reviewed",
      "Documentation gap flagged",
      "Review pending",
    ],
  },
  {
    id: "branded-social-handle",
    title: "Branded social handle",
    assetType: "Social Handle",
    assetName: "@vaporvaulthq",
    organization: "VaporVault Holdings",
    reason: "Handle recovery case with incomplete historical records",
    category: "Brand identity recovery",
    readinessScore: 61,
    reviewStatus: "Needs evidence review",
    recommendedPath: "Platform-supported identity and trademark review",
    ownershipSignals: {
      trademark: "Strong",
      billing: "None",
      adminContinuity: "Partial",
      archiveEvidence: "Moderate",
      documentationCompleteness: 61,
    },
    requiredDocuments: [
      "Trademark registration copy",
      "Claimant authorization letter",
      "Historic profile screenshots",
      "Archived link references",
      "Platform support reference",
    ],
    riskChecks: {
      unauthorizedAccessRisk: "Blocked",
      impersonationRisk: "Low",
      proofGapSeverity: "Medium",
      manualValidationRequired: "Yes",
    },
    timeline: [
      "Intake completed",
      "Brand evidence reviewed",
      "Historic ownership gaps noted",
      "Awaiting claimant declaration",
      "Ready for reviewer routing",
    ],
    status: "Needs Review",
    activity: [
      "Case created",
      "Trademark record added",
      "Historic proof requested",
      "Manual review queued",
    ],
  },
  {
    id: "legacy-saas-workspace",
    title: "Legacy SaaS workspace",
    assetType: "SaaS Account",
    assetName: "Workspace-19",
    organization: "Northline Ops",
    reason: "Admin continuity issue with prior ownership documentation",
    category: "Continuity restoration",
    readinessScore: 84,
    reviewStatus: "Ready for formal review",
    recommendedPath: "Administrative continuity review and workspace recovery",
    ownershipSignals: {
      trademark: "Moderate",
      billing: "Strong",
      adminContinuity: "Strong",
      archiveEvidence: "Partial",
      documentationCompleteness: 84,
    },
    requiredDocuments: [
      "Workspace billing export",
      "Current claimant authorization",
      "Prior admin correspondence",
      "Internal continuity memo",
      "Support escalation reference",
    ],
    riskChecks: {
      unauthorizedAccessRisk: "Blocked",
      impersonationRisk: "Low",
      proofGapSeverity: "Low",
      manualValidationRequired: "Yes",
    },
    timeline: [
      "Intake completed",
      "Billing continuity validated",
      "Admin continuity confirmed",
      "Awaiting reviewer sign-off",
      "Ready for submission review",
    ],
    status: "Ready for Review",
    activity: [
      "Case created",
      "Billing proof validated",
      "Admin continuity confirmed",
      "Reviewer requested",
    ],
  },
  {
    id: "legacy-domain-portfolio",
    title: "Legacy domain portfolio",
    assetType: "Domain",
    assetName: "oldbrand.io",
    organization: "OldBrand Group",
    reason: "Portfolio cleanup for inactive legacy brand property",
    category: "Portfolio recovery",
    readinessScore: 67,
    reviewStatus: "In progress",
    recommendedPath: "Registrar-assisted ownership recovery",
    ownershipSignals: {
      trademark: "Moderate",
      billing: "Partial",
      adminContinuity: "Partial",
      archiveEvidence: "Strong",
      documentationCompleteness: 67,
    },
    requiredDocuments: [
      "Portfolio registration extracts",
      "Historic billing statement",
      "Claimant authorization letter",
      "Archive evidence bundle",
      "Support ticket reference",
    ],
    riskChecks: {
      unauthorizedAccessRisk: "Blocked",
      impersonationRisk: "Low",
      proofGapSeverity: "Medium",
      manualValidationRequired: "Yes",
    },
    timeline: [
      "Intake completed",
      "Archive evidence reviewed",
      "Billing continuity pending",
      "Awaiting supporting records",
      "Ready for reviewer routing",
    ],
    status: "In Progress",
    activity: [
      "Case created",
      "Archive evidence attached",
      "Billing records requested",
      "Coordinator follow-up scheduled",
    ],
  },
];

export const sampleCaseSubtitles: Record<string, string> = {
  "dormant-company-domain": "Legacy domain recovery for a dissolved product line",
  "branded-social-handle": "Handle recovery case with incomplete historical records",
  "legacy-saas-workspace": "Admin continuity issue with prior ownership documentation",
};

export function sampleCaseToFormState(caseItem: SampleCase): DemoFormState {
  const nextSignals: DemoFormSignal[] = [];

  if (caseItem.ownershipSignals.trademark !== "None") {
    nextSignals.push("Trademark record");
  }
  if (caseItem.ownershipSignals.billing !== "None") {
    nextSignals.push("Historical billing proof");
  }
  if (caseItem.ownershipSignals.adminContinuity !== "None") {
    nextSignals.push("Prior admin email evidence");
  }
  if (caseItem.ownershipSignals.archiveEvidence !== "None") {
    nextSignals.push("Archived website evidence");
  }
  nextSignals.push("Company registration documents", "Registrar/support correspondence");

  return {
    assetType: caseItem.assetType,
    assetName: caseItem.assetName,
    organization: caseItem.organization,
    reason: caseItem.reason,
    signals: Array.from(new Set(nextSignals)),
  };
}

function levelFromSignal(signalCount: number, weighted: number) {
  if (weighted >= 5 || signalCount >= 5) {
    return "Strong" as const;
  }
  if (weighted >= 4 || signalCount >= 4) {
    return "Moderate" as const;
  }
  if (weighted >= 2 || signalCount >= 2) {
    return "Partial" as const;
  }
  return "None" as const;
}

export function buildGeneratedCase(formState: DemoFormState): SampleCase {
  const signalCount = formState.signals.length;
  const readinessScore = Math.max(38, Math.min(92, 36 + signalCount * 9));
  const assetType = formState.assetType || "Domain";
  const assetName =
    formState.assetName || (assetType === "Domain" ? "untitled-recovery-case.com" : "Untitled Asset");
  const organization = formState.organization || "Unspecified claimant";
  const reason = formState.reason || "Recovery request under documentation review";

  const weighted = {
    trademark: formState.signals.includes("Trademark record") ? signalCount : 0,
    billing: formState.signals.includes("Historical billing proof") ? signalCount - 1 : 0,
    admin: formState.signals.includes("Prior admin email evidence") ? signalCount - 2 : 0,
    archive: formState.signals.includes("Archived website evidence") ? signalCount - 1 : 0,
  };

  const categoryMap: Record<SampleCase["assetType"], string> = {
    Domain: "Dormant asset recovery",
    "Social Handle": "Brand identity recovery",
    "SaaS Account": "Continuity restoration",
  };

  const pathMap: Record<SampleCase["assetType"], string> = {
    Domain: "Registrar-assisted ownership recovery",
    "Social Handle": "Platform-supported identity and trademark review",
    "SaaS Account": "Administrative continuity review and workspace recovery",
  };

  const supportDocumentMap: Record<SampleCase["assetType"], string> = {
    Domain: "Archive or DNS evidence",
    "Social Handle": "Historic profile screenshot bundle",
    "SaaS Account": "Prior admin continuity evidence",
  };

  const status = readinessScore >= 78 ? "Ready for Review" : readinessScore >= 60 ? "Awaiting Docs" : "Needs Review";

  return {
    id: "generated-recovery-case",
    title: "Custom recovery case",
    assetType,
    assetName,
    organization,
    reason,
    category: categoryMap[assetType],
    readinessScore,
    reviewStatus: readinessScore >= 78 ? "Ready for formal review" : "Human review required",
    recommendedPath: pathMap[assetType],
    ownershipSignals: {
      trademark: levelFromSignal(signalCount, weighted.trademark),
      billing: levelFromSignal(signalCount, weighted.billing),
      adminContinuity: levelFromSignal(signalCount, weighted.admin),
      archiveEvidence: levelFromSignal(signalCount, weighted.archive),
      documentationCompleteness: readinessScore,
    },
    requiredDocuments: [
      "Company registration certificate",
      "Historical billing statement",
      "Claimant authorization letter",
      supportDocumentMap[assetType],
      "Support correspondence reference",
    ],
    riskChecks: {
      unauthorizedAccessRisk: "Blocked",
      impersonationRisk: readinessScore >= 70 ? "Low" : "Medium",
      proofGapSeverity: readinessScore >= 78 ? "Low" : readinessScore >= 58 ? "Medium" : "High",
      manualValidationRequired: "Yes",
    },
    timeline: [
      "Intake completed",
      "Initial signals reviewed",
      "Documentation gaps identified",
      readinessScore >= 78 ? "Ready for submission review" : "Awaiting claimant documents",
      "Ready for submission review",
    ],
    status,
    activity: [
      "Case created",
      "Evidence signals reviewed",
      "Documentation gap flagged",
      "Review pending",
    ],
  };
}
