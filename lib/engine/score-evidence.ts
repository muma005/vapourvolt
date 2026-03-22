import type { CaseInput, EvidenceBreakdownItem, EvidenceScore, EvidenceStrength } from "./types";

const signalDefinitions: Array<{
  key: keyof CaseInput["evidenceSignals"];
  label: string;
  weight: number;
  detail: string;
}> = [
  {
    key: "trademarkRecord",
    label: "Trademark evidence",
    weight: 20,
    detail: "Supports the claimant's brand ownership position.",
  },
  {
    key: "historicalBillingProof",
    label: "Billing continuity",
    weight: 20,
    detail: "Shows historical control or payment continuity tied to the asset.",
  },
  {
    key: "companyRegistrationDocuments",
    label: "Organization documentation",
    weight: 20,
    detail: "Confirms the claimant organization as a lawful requesting party.",
  },
  {
    key: "priorAdminEmailEvidence",
    label: "Admin continuity",
    weight: 15,
    detail: "Links prior administrative control to the claimant or authorized team.",
  },
  {
    key: "archivedWebsiteEvidence",
    label: "Archive or history evidence",
    weight: 10,
    detail: "Provides historical public signals connecting the asset to the claimant.",
  },
  {
    key: "supportCorrespondence",
    label: "Support correspondence",
    weight: 15,
    detail: "Shows an auditable recovery trail and prior support engagement.",
  },
];

function strengthFromItem(present: boolean, weight: number): EvidenceStrength {
  if (!present) {
    return "None";
  }

  if (weight >= 20) {
    return "Strong";
  }

  if (weight >= 15) {
    return "Moderate";
  }

  return "Partial";
}

function readinessLevelFromScore(score: number): EvidenceScore["readinessLevel"] {
  if (score >= 65) {
    return "High";
  }

  if (score >= 35) {
    return "Moderate";
  }

  return "Low";
}

export function scoreEvidence(input: CaseInput): EvidenceScore {
  const evidenceBreakdown: EvidenceBreakdownItem[] = signalDefinitions.map((definition) => {
    const present = input.evidenceSignals[definition.key];

    return {
      key: definition.key,
      label: definition.label,
      present,
      weight: definition.weight,
      strength: strengthFromItem(present, definition.weight),
      detail: present ? definition.detail : `Missing: ${definition.detail}`,
    };
  });

  const readinessScore = evidenceBreakdown.reduce((total, item) => total + (item.present ? item.weight : 0), 0);
  const missingSignalKeys = evidenceBreakdown.filter((item) => !item.present).map((item) => item.key);

  return {
    readinessScore,
    readinessLevel: readinessLevelFromScore(readinessScore),
    evidenceBreakdown,
    missingSignalKeys,
  };
}
