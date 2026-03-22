export type AssetType = "Domain" | "Social Handle" | "SaaS Account";

export type EvidenceSignals = {
  trademarkRecord: boolean;
  historicalBillingProof: boolean;
  companyRegistrationDocuments: boolean;
  priorAdminEmailEvidence: boolean;
  archivedWebsiteEvidence: boolean;
  supportCorrespondence: boolean;
};

export type CaseInput = {
  assetType: AssetType;
  assetName: string;
  organization: string;
  reasonForRecovery: string;
  notes?: string;
  evidenceSignals: EvidenceSignals;
};

export type EvidenceStrength = "Strong" | "Moderate" | "Partial" | "None";

export type EvidenceBreakdownItem = {
  key: keyof EvidenceSignals;
  label: string;
  present: boolean;
  weight: number;
  strength: EvidenceStrength;
  detail: string;
};

export type RiskLevel = "Low" | "Medium" | "High" | "Blocked";

export type RiskFlag = {
  label: string;
  level: RiskLevel;
  detail: string;
};

export type AssessmentResult = {
  caseType: string;
  readinessScore: number;
  readinessLevel: "Low" | "Moderate" | "High";
  reviewStatus: string;
  recommendedPath: string;
  riskFlags: RiskFlag[];
  requiredDocuments: string[];
  nextActions: string[];
  evidenceBreakdown: EvidenceBreakdownItem[];
  summary: string;
};

export type ClassifiedCase = {
  caseType: string;
  recommendedPath: string;
  assetSpecificRequirement: string;
};

export type EvidenceScore = {
  readinessScore: number;
  readinessLevel: AssessmentResult["readinessLevel"];
  evidenceBreakdown: EvidenceBreakdownItem[];
  missingSignalKeys: Array<keyof EvidenceSignals>;
};
