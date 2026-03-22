import type { AssessmentResult, CaseInput } from "@/lib/engine";

export type ProductSession = {
  id: string;
  name: string;
  company: string;
  email: string;
};

export type ProductUserRecord = ProductSession & {
  password: string;
  createdAt: string;
};

export type ProductCaseStatus =
  | "Needs Evidence"
  | "Ready for Review"
  | "Ready for Submission Review"
  | "Manual Review Required";

export type SavedCase = {
  id: string;
  status: ProductCaseStatus;
  createdAt: string;
  input: CaseInput;
  assessment: AssessmentResult;
};

export type StoredCaseRecord = SavedCase & {
  userId: string;
};
