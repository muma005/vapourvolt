import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/auth/supabase-server";
import { evaluateCase, type AssessmentResult, type CaseInput } from "@/lib/engine";
import type { CaseAssessmentRow, CaseRow, CaseStatus, SavedCase } from "@/lib/db/types";

function toCaseStatus(assessment: AssessmentResult): CaseStatus {
  return assessment.reviewStatus as CaseStatus;
}

function mapSavedCase(caseRow: CaseRow, assessmentRow: CaseAssessmentRow): SavedCase {
  return {
    id: caseRow.id,
    status: caseRow.status,
    createdAt: caseRow.created_at,
    input: {
      assetType: caseRow.asset_type,
      assetName: caseRow.asset_name,
      organization: caseRow.organization,
      reasonForRecovery: caseRow.reason_for_recovery,
      notes: caseRow.notes ?? undefined,
      evidenceSignals: caseRow.evidence_signals,
    },
    assessment: assessmentRow.assessment,
  };
}

export async function createCaseWithAssessment(user: User, input: CaseInput) {
  const supabase = await createSupabaseServerClient();
  const assessment = evaluateCase(input);
  const status = toCaseStatus(assessment);

  const { data: caseRow, error: caseError } = await supabase
    .from("cases")
    .insert({
      user_id: user.id,
      asset_type: input.assetType,
      asset_name: input.assetName,
      organization: input.organization,
      reason_for_recovery: input.reasonForRecovery,
      notes: input.notes ?? null,
      evidence_signals: input.evidenceSignals,
      status,
    })
    .select("*")
    .single();

  if (caseError || !caseRow) {
    throw new Error(caseError?.message ?? "Unable to create case.");
  }

  const { data: assessmentRow, error: assessmentError } = await supabase
    .from("case_assessments")
    .insert({
      case_id: caseRow.id,
      user_id: user.id,
      assessment,
    })
    .select("*")
    .single();

  if (assessmentError || !assessmentRow) {
    throw new Error(assessmentError?.message ?? "Unable to create case assessment.");
  }

  return mapSavedCase(caseRow as CaseRow, assessmentRow as CaseAssessmentRow);
}

export async function listUserCases(userId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("cases")
    .select("*, case_assessments(*)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? [])
    .map((row) => {
      const assessmentRow = Array.isArray(row.case_assessments) ? row.case_assessments[0] : null;

      if (!assessmentRow) {
        return null;
      }

      return mapSavedCase(row as CaseRow, assessmentRow as CaseAssessmentRow);
    })
    .filter(Boolean) as SavedCase[];
}

export async function getUserCaseById(userId: string, caseId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("cases")
    .select("*, case_assessments(*)")
    .eq("user_id", userId)
    .eq("id", caseId)
    .single();

  if (error || !data) {
    return null;
  }

  const assessmentRow = Array.isArray(data.case_assessments) ? data.case_assessments[0] : null;

  if (!assessmentRow) {
    return null;
  }

  return mapSavedCase(data as CaseRow, assessmentRow as CaseAssessmentRow);
}
