You are a senior product engineer, product designer, and pragmatic MVP architect.

Your task is to redesign and implement VaporVault as a real vertical SaaS MVP inside this repository.

Read the existing codebase first.
Understand what already exists.
Then propose a short plan.
Then implement.

Do not overengineer.
Do not introduce a complex multi-agent system.
Do not design a huge backend.
Do not turn this into a services website.
Do not build fake UI-only product flows.
Do not include anything involving unauthorized access, impersonation, bypass, account takeover, or illegal recovery behavior.

The goal is to make VaporVault feel like a real software product with a narrow but working product loop.

==================================================
PRODUCT POSITIONING
==================================================

VaporVault should feel like a vertical SaaS product.

It should NOT feel like:
- an agency
- a consultancy
- an operations service business
- a managed recovery firm
- a workflow helper with service language

It SHOULD feel like:
- a category-specific software platform
- a case management and decisioning system
- a domain-specific operating system
- a product with a clear engine and structured outputs
- a real application teams log into and use

The right framing is:

VaporVault is a vertical SaaS platform for digital asset recovery operations.

At its core, VaporVault provides:
- case intake
- evidence tracking
- recovery readiness scoring
- structured recommendations
- case progression tracking
- a system of record for recovery cases

Do not use language that makes it sound like a service business.

Avoid words like:
- assistant
- helper
- agency
- concierge
- we handle
- we recover for you
- managed service
- hands-on recovery team

Prefer language like:
- platform
- engine
- workspace
- case management
- readiness scoring
- decisioning
- structured workflow
- evidence tracking
- case progression
- system of record
- operations platform

==================================================
PRIMARY GOAL
==================================================

Build a real, narrow SaaS MVP that a user can actually use.

A user should be able to:
1. visit the site
2. sign up or sign in
3. enter the protected product
4. create a recovery case
5. submit the case
6. receive a real structured assessment
7. see the saved case in a dashboard
8. reopen the case later

This is not a UI-only product shell.
This is not a fake access flow.
Auth, persistence, case creation, and assessment should actually work.

==================================================
PRODUCT SCOPE
==================================================

The MVP should include:

PUBLIC LAYER
- a premium landing page
- clear vertical SaaS positioning
- software-style messaging
- product screenshots or live product previews
- strong CTA to get started

PRODUCT LAYER
- real sign up
- real sign in
- real sign out
- protected app routes
- dashboard
- new case flow
- case assessment report
- saved cases list
- case detail page

ENGINE LAYER
- deterministic Recovery Readiness Engine
- structured case classification
- evidence scoring
- readiness scoring
- documentation gap detection
- risk/compliance flags
- recommended path generation
- next-step generation
- concise case summary

==================================================
IMPORTANT PRODUCT RULE
==================================================

Do not make VaporVault sound like:
“software that helps people do a service.”

Make it sound like:
“software that runs a specific operational workflow.”

The product should feel like the operating system for this category.

==================================================
UI / BRAND / POSITIONING TRANSFORMATION
==================================================

Redesign the UI and copy so it no longer looks like an agency website.

The current or default failure mode to avoid is:
- too much descriptive service language
- too much “we help teams”
- generic consulting tone
- generic modern landing page with no real product identity
- too much emphasis on humans doing the work
- vague operational messaging without a product spine

The new design should feel like:
- a serious B2B vertical SaaS product
- product-first
- platform-centric
- structured
- premium
- restrained
- operational
- software-led

The UI should communicate:
- this is a product people log into
- this is a system of record
- this has a real case engine
- this supports repeatable workflows
- this is built for a specific category

==================================================
VISUAL DIRECTION
==================================================

The site and app should look like a premium SaaS product, not a service agency.

Design direction:
- clean, modern B2B SaaS
- premium but restrained
- strong spacing
- crisp typography
- subtle borders
- soft shadows
- disciplined use of color
- realistic dashboard density
- minimal decorative noise
- no overblown gradients
- no abstract “AI agency” visuals
- no cyberpunk aesthetics
- no oversized marketing illustrations unless they reinforce the product

Good UI patterns:
- sticky top nav on marketing site
- product preview in hero
- dashboard screenshots or live mock panels
- metric cards
- status badges
- table/list views
- evidence checklists
- timelines
- activity rows
- sidebar app navigation
- empty states
- product tabs if useful

The product should visually suggest:
- queue management
- case review
- decisioning
- structured workflow
- evidence completeness
- readiness state

==================================================
LANDING PAGE REQUIREMENTS
==================================================

Build or redesign the marketing site to sound and look like a vertical SaaS platform.

Required sections:
1. Navbar
2. Hero
3. Problem
4. Product capabilities
5. How it works
6. Product preview
7. Trust / compliance
8. FAQ
9. CTA
10. Footer

Tone:
- sharp
- professional
- modern
- credible
- software-first
- category-defining
- not scammy
- not overhyped

Use or adapt this positioning:

Eyebrow:
Digital asset recovery operations platform

Headline:
The case management and recovery readiness platform for digital asset operations.

Subheadline:
VaporVault centralizes case intake, evidence tracking, readiness scoring, and case progression in one structured system.

Primary CTA:
Get Started

Secondary CTA:
View Product

Trust line:
Structured workflows. Clear decisioning. Audit-friendly case records.

The landing page should show the product as software, not describe it like a service.

The hero should include a product preview that looks like:
- case queue
- readiness score
- evidence completeness
- status badges
- next-step panel
- recent activity

Do not rely on generic copy-heavy sections alone.
Show product surfaces.

==================================================
AUTH REQUIREMENTS
==================================================

Implement real auth.

Minimum:
- sign up
- sign in
- sign out
- authenticated session
- protected app routes

Use the simplest reliable option for this repo.
If auth does not exist, prefer a fast, sensible solution compatible with the stack.
Email/password is enough.

Do not build:
- social auth unless trivial
- complex onboarding
- magic links unless already set up
- RBAC
- org switching
- team invitations

==================================================
PROTECTED APP REQUIREMENTS
==================================================

Create a protected app area.

Suggested routes:
- /app
- /app/cases/new
- /app/cases/[id]

The app should feel like real software.

Inside the app include:
- sidebar or app nav
- dashboard home
- recent cases
- “New Case” action
- case creation form
- case result page
- saved case list
- status indicators
- next actions panel

This should feel like a category-specific workspace, not a demo page.

==================================================
CORE ENGINE
==================================================

Build a narrow deterministic engine called the Recovery Readiness Engine.

Its purpose:
Evaluate a recovery case and return a structured readiness assessment.

The engine should:
- accept structured case input
- classify the case
- score evidence
- determine readiness
- detect proof gaps
- generate recommendation paths
- generate next actions
- generate a concise summary

The engine should NOT:
- execute recovery
- access external systems
- automate account actions
- pretend to do deep agentic orchestration
- rely entirely on AI text generation

The deterministic engine is the core product logic.

==================================================
ENGINE INPUTS
==================================================

Keep inputs minimal and productized.

Required fields:
- assetType
  Allowed values:
  - Domain
  - Social Handle
  - SaaS Account
  - Other

- assetName
- organization
- reasonForRecovery
- notes (optional)

- evidenceSignals:
  - trademarkRecord
  - historicalBillingProof
  - companyRegistrationDocuments
  - priorAdminEmailEvidence
  - archivedWebsiteEvidence
  - supportCorrespondence

Do not turn this into a giant enterprise form.

==================================================
ENGINE LOGIC
==================================================

Implement simple deterministic logic.

Step 1: normalize input
- validate required fields
- sanitize strings
- normalize evidence signal structure

Step 2: classify case
Assign a caseType such as:
- Dormant domain recovery
- Branded handle recovery
- Administrative account recovery
- General documentation review case

Use simple rules from assetType + evidence profile.

Step 3: score evidence
Use a weighted model.

Suggested weights:
- trademarkRecord = 20
- historicalBillingProof = 20
- companyRegistrationDocuments = 20
- priorAdminEmailEvidence = 15
- archivedWebsiteEvidence = 10
- supportCorrespondence = 15

Cap total at 100.

Step 4: assign readiness band
Suggested bands:
- 0–34 = Low
- 35–64 = Moderate
- 65–100 = High

Step 5: derive recommended path
Suggested rules:
- Domain + strong evidence -> Registrar-assisted ownership recovery
- Social Handle + moderate evidence -> Manual platform escalation
- SaaS Account + strong continuity -> Administrative ownership review
- Weak evidence -> Documentation required before proceeding

Step 6: generate risk/compliance flags
Suggested flags:
- Insufficient proof
- Documentation gap
- Manual review required
- Incomplete ownership continuity
- Elevated claimant verification need

Step 7: generate missing requirements
Create:
- requiredDocuments
- nextActions

Examples:
- Company registration certificate
- Historical billing statement
- Claimant authorization letter
- Archived site evidence
- Prior support ticket reference

Step 8: generate summary
Produce a concise case summary that explains:
- what the case is
- how strong the current evidence is
- what is missing
- what should happen next

This can be template-based.
If there is already an easy model integration path, you may wrap the summary generation behind a small interface.
But the engine output must remain deterministic and primary.

==================================================
ENGINE OUTPUTS
==================================================

Return a structured assessment object.

Suggested fields:
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

These outputs must be suitable for:
- report UI
- dashboard summary
- case detail page
- status badges
- action checklist

==================================================
PERSISTENCE
==================================================

Persistence must be real.

At minimum:
- save the case
- save the assessment
- tie it to the authenticated user
- load the user’s cases in the dashboard
- open a saved case later

Use the lightest sensible persistence option.

If there is already a DB pattern in the repo, reuse it.
If not, choose the simplest durable option compatible with the stack.

Suggested minimum entities:
- auth user
- cases
- case_assessments

Evidence signals can be stored as JSON if that keeps things simple.

==================================================
APP UX REQUIREMENTS
==================================================

The app should feel like a real operational system.

Dashboard should include:
- recent cases
- case statuses
- readiness scores
- “new case” button
- quick stats if useful but do not overdo them
- next actions
- recent activity if easy

New case page should include:
- clean structured form
- evidence checkboxes
- submit action
- simple validation

Case detail page should include:
- asset name
- asset type
- organization
- case type
- readiness score
- readiness level
- recommended path
- review status
- risk flags
- required documents
- next actions
- summary
- created date
- optional activity/history section

Use interface patterns that make this feel like domain software:
- badges
- tables
- cards
- timeline or activity list
- checklist
- info panels
- side navigation

==================================================
COPY / MESSAGING RULES
==================================================

Everywhere in the product, rewrite copy so it sounds like vertical SaaS.

Avoid:
- “we help”
- “we assist”
- “our team handles”
- “authorized recovery support”
- “service-led workflow”
- “concierge”
- “agency”
- “managed operation”

Prefer:
- platform
- workspace
- case system
- case intake
- readiness scoring
- evidence tracking
- case progression
- structured recommendations
- review state
- decisioning
- operations platform

Examples of good messaging:
- “Centralize digital asset recovery cases in one platform.”
- “Score readiness, track proof gaps, and move cases forward with structured workflows.”
- “Run intake, evidence review, and case progression in one system.”
- “A system of record for digital asset recovery operations.”

==================================================
WHAT MUST BE REAL IN V1
==================================================

These must actually work:
- sign up
- sign in
- sign out
- protected routes
- case creation
- engine evaluation
- assessment storage
- dashboard case loading
- saved case detail pages

==================================================
WHAT CAN BE SIMPLIFIED
==================================================

These can be simplified or mocked:
- activity feed wording
- summary narrative generation
- export actions
- advanced analytics
- team management
- org management
- advanced permissions
- billing
- notifications
- audit exports
- external integrations
- registrar/platform checks
- OCR
- document ingestion pipelines

==================================================
WHAT TO AVOID
==================================================

Do NOT build:
- multi-agent orchestration
- autonomous recovery execution
- external recovery integrations
- OCR pipelines
- document parsing systems
- large backend services
- enterprise RBAC
- event buses
- background job systems
- billing systems
- complex notification systems
- fake AI complexity
- big analytics dashboards with meaningless charts
- anything unsafe or legally questionable

Avoid anything that adds engineering weight without strengthening the core product loop.

==================================================
RECOMMENDED ARCHITECTURE
==================================================

Use the simplest serious architecture.

Preferred shape:
- marketing site
- auth
- protected app routes
- lightweight backend endpoint or server actions
- deterministic engine in shared lib code
- persistence
- report UI

If this is a Next.js repo, a good structure may be:
- app/
- app/login
- app/signup
- app/app
- app/app/cases/new
- app/app/cases/[id]
- app/api/*
- components/ui/
- components/marketing/
- components/app/
- lib/engine/*
- lib/auth/*
- lib/db/*
- types/*
- data/*

Keep abstractions light.

==================================================
DEMO FLOW REQUIREMENT
==================================================

The product should demo cleanly end-to-end.

Flow:
1. User lands on homepage
2. User clicks Get Started
3. User signs up or signs in
4. User enters the dashboard
5. User clicks New Case
6. User fills in the case form
7. User submits the case
8. UI shows a short processing state:
   - validating case
   - scoring evidence
   - assessing readiness
   - generating recommendation
9. User sees the Recovery Readiness Report
10. User returns to dashboard and sees the case saved

The strongest product moment is the assessment output.
Make that screen feel sharp, structured, and useful.

==================================================
WORK PROCESS
==================================================

Work in this order:

1. Inspect the repository
2. Summarize the current structure and relevant files
3. Propose a concise implementation plan
4. Implement the redesign and MVP
5. Reuse existing code where sensible
6. Keep the architecture understandable
7. Run lint/typecheck/tests if available
8. Fix any issues you introduce
9. Summarize:
   - files created
   - files changed
   - auth implementation
   - persistence implementation
   - engine behavior
   - UI/positioning changes
   - what is real
   - what is simplified
   - what should come later

==================================================
MOST IMPORTANT RULE
==================================================

Do not leave this as a polished agency-style website.

Turn VaporVault into a real vertical SaaS product with a working loop:

marketing site -> auth -> protected app -> case intake -> deterministic assessment -> saved case -> dashboard revisit

That is VaporVault v1.