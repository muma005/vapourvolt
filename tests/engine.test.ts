import assert from "node:assert/strict";
import test from "node:test";
import { POST } from "../app/api/assess-case/route.ts";
import { evaluateCase } from "../lib/engine/evaluate-case.ts";
import type { CaseInput } from "../lib/engine/types.ts";

test("evaluateCase handles a strong domain case", () => {
  const input: CaseInput = {
    assetType: "Domain",
    assetName: "vaporvaultlabs.com",
    organization: "Vapor Labs Ltd",
    reasonForRecovery: "Legacy domain tied to inactive business unit",
    evidenceSignals: {
      trademarkRecord: true,
      historicalBillingProof: true,
      companyRegistrationDocuments: true,
      priorAdminEmailEvidence: false,
      archivedWebsiteEvidence: true,
      supportCorrespondence: true,
    },
  };

  const result = evaluateCase(input);

  assert.equal(result.caseType, "Dormant asset recovery");
  assert.equal(result.readinessScore, 84);
  assert.equal(result.readinessLevel, "High");
  assert.equal(result.reviewStatus, "Ready for formal review");
  assert.equal(result.recommendedPath, "Registrar-assisted ownership recovery");
});

test("evaluateCase handles a partial social handle case", () => {
  const input: CaseInput = {
    assetType: "Social Handle",
    assetName: "@vaporvaulthq",
    organization: "VaporVault Holdings",
    reasonForRecovery: "Brand handle recovery with incomplete historical records",
    evidenceSignals: {
      trademarkRecord: true,
      historicalBillingProof: false,
      companyRegistrationDocuments: true,
      priorAdminEmailEvidence: false,
      archivedWebsiteEvidence: true,
      supportCorrespondence: false,
    },
  };

  const result = evaluateCase(input);

  assert.equal(result.caseType, "Brand identity recovery");
  assert.equal(result.readinessScore, 52);
  assert.equal(result.readinessLevel, "Low");
  assert.equal(result.reviewStatus, "Needs evidence review");
  assert.ok(result.requiredDocuments.includes("Historical billing statement"));
});

test("evaluateCase handles a weak SaaS case", () => {
  const input: CaseInput = {
    assetType: "SaaS Account",
    assetName: "workspace-legacy",
    organization: "Northline Ops",
    reasonForRecovery: "Administrative continuity issue with little supporting documentation",
    evidenceSignals: {
      trademarkRecord: false,
      historicalBillingProof: false,
      companyRegistrationDocuments: true,
      priorAdminEmailEvidence: false,
      archivedWebsiteEvidence: false,
      supportCorrespondence: false,
    },
  };

  const result = evaluateCase(input);

  assert.equal(result.caseType, "Administrative continuity restoration");
  assert.equal(result.readinessLevel, "Low");
  assert.equal(result.reviewStatus, "Needs evidence review");
  assert.ok(result.nextActions.some((action) => action.includes("documentation")));
});

test("assess-case API returns structured assessment output", async () => {
  const response = await POST(
    new Request("http://localhost/api/assess-case", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assetType: "Domain",
        assetName: "oldbrand.io",
        organization: "OldBrand Group",
        reasonForRecovery: "Portfolio cleanup for inactive legacy brand property",
        evidenceSignals: {
          trademarkRecord: false,
          historicalBillingProof: true,
          companyRegistrationDocuments: true,
          priorAdminEmailEvidence: false,
          archivedWebsiteEvidence: true,
          supportCorrespondence: false,
        },
      } satisfies CaseInput),
    }),
  );

  assert.equal(response.status, 200);

  const payload = (await response.json()) as { assessment: ReturnType<typeof evaluateCase> };

  assert.equal(payload.assessment.caseType, "Portfolio recovery");
  assert.ok(Array.isArray(payload.assessment.evidenceBreakdown));
  assert.ok(Array.isArray(payload.assessment.riskFlags));
});

test("assess-case API rejects malformed payloads", async () => {
  const response = await POST(
    new Request("http://localhost/api/assess-case", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assetType: "Domain",
        assetName: "missing-signals",
      }),
    }),
  );

  assert.equal(response.status, 400);
});
