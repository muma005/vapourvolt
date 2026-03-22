import { evaluateCase, type AssessmentResult, type AssetType, type CaseInput, type EvidenceSignals } from "@/lib/engine";

export type DemoFormState = {
  assetType: AssetType | "";
  assetName: string;
  organization: string;
  reasonForRecovery: string;
  notes: string;
  evidenceSignals: EvidenceSignals;
};

export type DemoCaseRecord = {
  id: string;
  title: string;
  subtitle: string;
  input: CaseInput;
  assessment: AssessmentResult;
  activity: string[];
};

export const signalOptions: Array<{ key: keyof EvidenceSignals; label: string }> = [
  { key: "trademarkRecord", label: "Trademark record" },
  { key: "historicalBillingProof", label: "Historical billing proof" },
  { key: "companyRegistrationDocuments", label: "Company registration documents" },
  { key: "priorAdminEmailEvidence", label: "Prior admin email evidence" },
  { key: "archivedWebsiteEvidence", label: "Archived website evidence" },
  { key: "supportCorrespondence", label: "Registrar/support correspondence" },
];

export const emptyEvidenceSignals: EvidenceSignals = {
  trademarkRecord: false,
  historicalBillingProof: false,
  companyRegistrationDocuments: false,
  priorAdminEmailEvidence: false,
  archivedWebsiteEvidence: false,
  supportCorrespondence: false,
};

export const emptyDemoForm: DemoFormState = {
  assetType: "",
  assetName: "",
  organization: "",
  reasonForRecovery: "",
  notes: "",
  evidenceSignals: { ...emptyEvidenceSignals },
};

const sampleCaseSeeds: Array<Omit<DemoCaseRecord, "assessment">> = [
  {
    id: "dormant-company-domain",
    title: "Dormant company domain",
    subtitle: "Legacy domain recovery for a dissolved product line",
    input: {
      assetType: "Domain",
      assetName: "vaporvaultlabs.com",
      organization: "Vapor Labs Ltd",
      reasonForRecovery: "Legacy domain tied to inactive business unit",
      notes: "Registrar trail exists, but claimant authorization should be refreshed before final submission.",
      evidenceSignals: {
        trademarkRecord: true,
        historicalBillingProof: true,
        companyRegistrationDocuments: true,
        priorAdminEmailEvidence: false,
        archivedWebsiteEvidence: true,
        supportCorrespondence: true,
      },
    },
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
    subtitle: "Handle recovery case with incomplete historical records",
    input: {
      assetType: "Social Handle",
      assetName: "@vaporvaulthq",
      organization: "VaporVault Holdings",
      reasonForRecovery: "Brand handle recovery with incomplete historical records",
      notes: "Historic screenshots are partial and support escalation has not been reopened.",
      evidenceSignals: {
        trademarkRecord: true,
        historicalBillingProof: false,
        companyRegistrationDocuments: true,
        priorAdminEmailEvidence: false,
        archivedWebsiteEvidence: true,
        supportCorrespondence: false,
      },
    },
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
    subtitle: "Admin continuity issue with prior ownership documentation",
    input: {
      assetType: "SaaS Account",
      assetName: "Workspace-19",
      organization: "Northline Ops",
      reasonForRecovery: "Administrative continuity issue with prior ownership documentation",
      notes: "Workspace billing export and prior admin thread are already attached.",
      evidenceSignals: {
        trademarkRecord: false,
        historicalBillingProof: true,
        companyRegistrationDocuments: true,
        priorAdminEmailEvidence: true,
        archivedWebsiteEvidence: false,
        supportCorrespondence: true,
      },
    },
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
    subtitle: "Portfolio cleanup for inactive legacy brand property",
    input: {
      assetType: "Domain",
      assetName: "oldbrand.io",
      organization: "OldBrand Group",
      reasonForRecovery: "Portfolio cleanup for inactive legacy brand property",
      notes: "Archive evidence is present, but claimant paperwork is still being assembled.",
      evidenceSignals: {
        trademarkRecord: false,
        historicalBillingProof: true,
        companyRegistrationDocuments: true,
        priorAdminEmailEvidence: false,
        archivedWebsiteEvidence: true,
        supportCorrespondence: false,
      },
    },
    activity: [
      "Case created",
      "Archive evidence attached",
      "Billing records requested",
      "Coordinator follow-up scheduled",
    ],
  },
];

export const sampleCases: DemoCaseRecord[] = sampleCaseSeeds.map((seed) => ({
  ...seed,
  assessment: evaluateCase(seed.input),
}));

export function sampleCaseToFormState(caseItem: DemoCaseRecord): DemoFormState {
  return {
    assetType: caseItem.input.assetType,
    assetName: caseItem.input.assetName,
    organization: caseItem.input.organization,
    reasonForRecovery: caseItem.input.reasonForRecovery,
    notes: caseItem.input.notes ?? "",
    evidenceSignals: { ...caseItem.input.evidenceSignals },
  };
}

export function formStateToCaseInput(formState: DemoFormState): CaseInput {
  return {
    assetType: formState.assetType || "Domain",
    assetName: formState.assetName,
    organization: formState.organization,
    reasonForRecovery: formState.reasonForRecovery,
    notes: formState.notes || undefined,
    evidenceSignals: { ...formState.evidenceSignals },
  };
}

export function findSampleCaseByInput(input: CaseInput) {
  return sampleCases.find((caseItem) => {
    return JSON.stringify(caseItem.input) === JSON.stringify(input);
  });
}

export function buildCustomDemoCase(input: CaseInput, assessment: AssessmentResult): DemoCaseRecord {
  return {
    id: "custom-recovery-case",
    title: "Custom recovery case",
    subtitle: "Submitted through the interactive recovery readiness engine",
    input,
    assessment,
    activity: [
      "Case created",
      "Intake normalized",
      "Assessment generated",
      "Reviewer routing pending",
    ],
  };
}

export function getDashboardStatus(assessment: AssessmentResult) {
  if (assessment.readinessScore >= 80) {
    return "Ready for Review";
  }

  if (assessment.readinessScore >= 60) {
    return "Awaiting Docs";
  }

  if (assessment.readinessScore >= 45) {
    return "In Progress";
  }

  return "Needs Review";
}

export function getTimelineSteps(assessment: AssessmentResult) {
  return [
    "Intake completed",
    "Initial signals reviewed",
    "Documentation gaps identified",
    assessment.reviewStatus === "Ready for formal review" ? "Ready for reviewer routing" : assessment.reviewStatus,
    "Ready for submission review",
  ];
}
