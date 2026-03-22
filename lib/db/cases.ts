import { randomUUID } from "node:crypto";
import { getDatabase } from "@/lib/db/sqlite";
import { evaluateCase, type AssessmentResult, type CaseInput } from "@/lib/engine";
import type { CaseAssessmentRow, CaseRow, CaseStatus, LocalUser, SavedCase } from "@/lib/db/types";

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

export async function createCaseWithAssessment(user: LocalUser, input: CaseInput) {
  const db = getDatabase();
  const assessment = evaluateCase(input);
  const status = toCaseStatus(assessment);
  const caseRow: CaseRow = {
    id: randomUUID(),
    user_id: user.id,
    asset_type: input.assetType,
    asset_name: input.assetName,
    organization: input.organization,
    reason_for_recovery: input.reasonForRecovery,
    notes: input.notes ?? null,
    evidence_signals: input.evidenceSignals,
    status,
    created_at: new Date().toISOString(),
  };
  const assessmentRow: CaseAssessmentRow = {
    id: randomUUID(),
    case_id: caseRow.id,
    user_id: user.id,
    assessment,
    created_at: caseRow.created_at,
  };

  const insertCase = db.prepare(`
    insert into cases (
      id, user_id, asset_type, asset_name, organization, reason_for_recovery, notes, evidence_signals, status, created_at
    ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const insertAssessment = db.prepare(`
    insert into case_assessments (id, case_id, user_id, assessment, created_at)
    values (?, ?, ?, ?, ?)
  `);

  const transaction = db.transaction(() => {
    insertCase.run(
      caseRow.id,
      caseRow.user_id,
      caseRow.asset_type,
      caseRow.asset_name,
      caseRow.organization,
      caseRow.reason_for_recovery,
      caseRow.notes,
      JSON.stringify(caseRow.evidence_signals),
      caseRow.status,
      caseRow.created_at,
    );
    insertAssessment.run(
      assessmentRow.id,
      assessmentRow.case_id,
      assessmentRow.user_id,
      JSON.stringify(assessmentRow.assessment),
      assessmentRow.created_at,
    );
  });

  transaction();

  return mapSavedCase(caseRow, assessmentRow);
}

export async function listUserCases(userId: string) {
  const db = getDatabase();
  const rows = db
    .prepare(
      `
      select
        c.*,
        a.id as assessment_id,
        a.assessment as assessment_json,
        a.created_at as assessment_created_at
      from cases c
      join case_assessments a on a.case_id = c.id
      where c.user_id = ?
      order by c.created_at desc
      `,
    )
    .all(userId) as Array<CaseRow & { assessment_id: string; assessment_json: string; assessment_created_at: string }>;

  return rows.map((row) =>
    mapSavedCase(
      {
        ...row,
        evidence_signals: JSON.parse(row.evidence_signals as unknown as string) as CaseInput["evidenceSignals"],
      },
      {
        id: row.assessment_id,
        case_id: row.id,
        user_id: row.user_id,
        assessment: JSON.parse(row.assessment_json) as AssessmentResult,
        created_at: row.assessment_created_at,
      },
    ),
  );
}

export async function getUserCaseById(userId: string, caseId: string) {
  const db = getDatabase();
  const row = db
    .prepare(
      `
      select
        c.*,
        a.id as assessment_id,
        a.assessment as assessment_json,
        a.created_at as assessment_created_at
      from cases c
      join case_assessments a on a.case_id = c.id
      where c.user_id = ? and c.id = ?
      limit 1
      `,
    )
    .get(userId, caseId) as
    | (CaseRow & { assessment_id: string; assessment_json: string; assessment_created_at: string })
    | undefined;

  if (!row) {
    return null;
  }

  return mapSavedCase(
    {
      ...row,
      evidence_signals: JSON.parse(row.evidence_signals as unknown as string) as CaseInput["evidenceSignals"],
    },
    {
      id: row.assessment_id,
      case_id: row.id,
      user_id: row.user_id,
      assessment: JSON.parse(row.assessment_json) as AssessmentResult,
      created_at: row.assessment_created_at,
    },
  );
}
