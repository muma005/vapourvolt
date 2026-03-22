import type { AssessmentResult, CaseInput } from "@/lib/engine";

export type LocalUser = {
  id: string;
  name: string;
  company: string;
  email: string;
  createdAt: string;
};

export type CaseStatus =
  | "Needs Evidence"
  | "Ready for Review"
  | "Ready for Submission Review"
  | "Manual Review Required";

export type CaseRow = {
  id: string;
  user_id: string;
  asset_type: CaseInput["assetType"];
  asset_name: string;
  organization: string;
  reason_for_recovery: string;
  notes: string | null;
  evidence_signals: CaseInput["evidenceSignals"];
  status: CaseStatus;
  created_at: string;
};

export type CaseAssessmentRow = {
  id: string;
  case_id: string;
  user_id: string;
  assessment: AssessmentResult;
  created_at: string;
};

export type SavedCase = {
  id: string;
  status: CaseStatus;
  createdAt: string;
  input: CaseInput;
  assessment: AssessmentResult;
};
