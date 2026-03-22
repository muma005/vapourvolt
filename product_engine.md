You are a senior product engineer and pragmatic MVP architect.

Your task is to implement the working VapourltAgent product layer inside this repository.

Read the existing codebase first.
Understand what already exists.
Then propose a short plan.
Then implement.

Important constraints:
- Do not overengineer.
- Do not build a huge backend.
- Do not introduce multi-agent architecture.
- Do not build fake UI-only flows.
- Do not add unsafe or unauthorized recovery behavior.
- Keep the scope narrow but real.

==================================================
GOAL
==================================================

Build a real, narrow vertical SaaS MVP for VapourltAgent.

A user should be able to:
1. sign up or sign in
2. enter a protected app
3. create a case
4. submit that case
5. run a deterministic assessment
6. view a structured assessment report
7. see the case saved in a dashboard
8. reopen the case later

This must be a real product loop, not a static demo.

==================================================
PRODUCT SHAPE
==================================================

VapourltAgent is a case management and recovery readiness platform for digital asset operations.

The product should feel like:
- a category-specific workspace
- a system of record
- a structured case platform
- software with a real engine

The product should not feel like:
- an agency portal
- a generic admin panel
- a consultancy dashboard
- a fake “AI” demo

==================================================
CORE APP ROUTES
==================================================

Implement or improve routes like:
- /login
- /signup
- /app
- /app/cases/new
- /app/cases/[id]

If the existing repo structure differs, adapt cleanly.

==================================================
AUTH
==================================================

Implement real authentication.

Minimum requirements:
- sign up
- sign in
- sign out
- authenticated session
- protected app routes

Use the lightest reliable option compatible with the repo.
If no auth exists, choose the simplest practical implementation.

Do not build:
- org switching
- complex onboarding
- RBAC
- social auth unless trivial
- enterprise permissions

==================================================
APP UX
==================================================

The app should feel like real vertical SaaS software.

Dashboard should include:
- recent cases
- case statuses
- readiness scores
- new case button
- next actions
- optional recent activity

New case page should include:
- structured form
- essential fields only
- evidence signals
- simple validation
- submit button

Case detail page should include:
- asset name
- asset type
- organization
- case type
- readiness score
- readiness level
- review status
- recommended path
- risk flags
- required documents
- next actions
- summary
- created date

Use:
- badges
- cards
- tables or lists
- checklists
- side navigation if appropriate
- realistic software density

==================================================
ENGINE
==================================================

Implement a deterministic Recovery Readiness Engine.

Purpose:
Take structured case input and return a clear readiness assessment.

The engine must:
- normalize input
- classify the case
- score evidence
- assign readiness level
- detect proof gaps
- generate recommendation path
- generate next actions
- generate summary

The engine must NOT:
- automate recovery
- call unsafe external systems
- rely on large agentic workflows
- pretend to do magical AI reasoning

==================================================
INPUTS
==================================================

Use a lean intake model:
- assetType
  - Domain
  - Social Handle
  - SaaS Account
  - Other
- assetName
- organization
- reasonForRecovery
- notes (optional)

evidenceSignals:
- trademarkRecord
- historicalBillingProof
- companyRegistrationDocuments
- priorAdminEmailEvidence
- archivedWebsiteEvidence
- supportCorrespondence

Do not make the form bloated.

==================================================
ENGINE LOGIC
==================================================

Use simple deterministic rules.

Suggested evidence weights:
- trademarkRecord = 20
- historicalBillingProof = 20
- companyRegistrationDocuments = 20
- priorAdminEmailEvidence = 15
- archivedWebsiteEvidence = 10
- supportCorrespondence = 15

Readiness bands:
- 0–34 = Low
- 35–64 = Moderate
- 65–100 = High

Suggested case types:
- Dormant domain recovery
- Branded handle recovery
- Administrative account recovery
- General documentation review case

Suggested recommendation logic:
- Domain + strong evidence -> Registrar-assisted ownership recovery
- Social Handle + moderate evidence -> Manual platform escalation
- SaaS Account + strong continuity -> Administrative ownership review
- Weak evidence -> Documentation required before proceeding

Suggested flags:
- Insufficient proof
- Documentation gap
- Manual review required
- Incomplete ownership continuity
- Elevated claimant verification need

==================================================
ENGINE OUTPUT
==================================================

Return a structured object with:
- caseType
- readinessScore
- readinessLevel
- reviewStatus
- recommendedPath
- riskFlags
- requiredDocuments
- nextActions
- evidenceBreakdown
- summary

Suggested reviewStatus values:
- Needs Evidence
- Ready for Review
- Ready for Submission Review
- Manual Review Required

==================================================
PERSISTENCE
==================================================

Persistence must be real.

At minimum:
- save the case
- save the assessment
- associate both with the authenticated user
- load the user’s cases in the dashboard
- open a saved case later

Use the lightest durable persistence option compatible with the repo.
Keep the schema lean.

Suggested entities:
- users/auth user
- cases
- case_assessments

Evidence signals may be stored as JSON if simpler.

==================================================
SUMMARY / AI LAYER
==================================================

If there is an easy existing model integration, you may add a thin explanation layer for the summary.

If not, use a template-based summary generator behind a clean interface.

Important:
- deterministic engine is the source of truth
- summary is secondary
- do not build a complex agent architecture

==================================================
UI DIRECTION
==================================================

The app must look like vertical SaaS software, not a service portal.

Design direction:
- premium B2B SaaS
- restrained color system
- crisp typography
- subtle borders
- soft shadows
- strong spacing
- realistic app density

The app should visually suggest:
- case queue
- review states
- evidence completeness
- recommendation outputs
- next-step management

==================================================
DEMO FLOW
==================================================

Make the product demo cleanly:
1. user lands on site
2. user signs up or signs in
3. user enters dashboard
4. user clicks New Case
5. user fills the form
6. user submits
7. UI shows short processing state:
   - validating case
   - scoring evidence
   - assessing readiness
   - generating recommendation
8. user sees Recovery Readiness Report
9. user returns to dashboard and sees saved case

That is the core product loop.

==================================================
WHAT MUST BE REAL
==================================================

These must work:
- auth
- protected routes
- create case
- run engine
- store assessment
- load dashboard data
- open saved case

==================================================
WHAT CAN BE SIMPLIFIED
==================================================

These can be simple/template-based:
- activity feed
- summary wording
- analytics
- export
- notifications
- org management
- billing
- external integrations

==================================================
WHAT TO AVOID
==================================================

Do NOT build:
- multi-agent systems
- autonomous recovery execution
- OCR/document ingestion
- external registrar/platform integrations
- enterprise admin systems
- large analytics dashboards
- event buses
- background jobs
- anything unsafe or legally questionable

Avoid anything that adds engineering weight without strengthening the core loop.

==================================================
WORK PROCESS
==================================================

1. Inspect the repository
2. Summarize current relevant files and architecture
3. Propose a short implementation plan
4. Implement the MVP cleanly
5. Reuse existing code where sensible
6. Run lint/typecheck/tests if available
7. Fix issues introduced
8. Summarize:
   - files created
   - files changed
   - auth implementation
   - persistence implementation
   - engine behavior
   - what is real
   - what is simplified

==================================================
DEFINITION OF DONE
==================================================

The implementation is done when:
- a user can authenticate
- a user can enter the protected app
- a user can create a case
- the deterministic engine produces an assessment
- the assessment is saved
- the dashboard shows saved cases
- the product feels like real vertical SaaS software