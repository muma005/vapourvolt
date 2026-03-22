You are a senior product engineer and pragmatic MVP architect.

Your task is to help me design and implement the core engine for a simple first version of this product.

Do not overengineer it.
Do not jump to a complex multi-agent system.
Do not design a huge backend.
Do not assume deep automation is needed yet.

I want the simplest possible engine that still makes the product feel real and functional.

## Goal
Design and implement a minimum viable product engine that can be built quickly and convincingly.

The engine should:
- feel like a real product core
- demonstrate the main value proposition
- be simple enough to build fast
- avoid unnecessary complexity
- be easy to explain in a demo

## Product context
The product is VapourltAgent.

For now, treat it as a lawful digital asset recovery workflow assistant for authorized users.
It should help a user:
- enter an asset case
- review the asset details
- run a basic check/workflow
- produce a useful recommendation or recovery plan
- display a clear result

Do not include anything involving unauthorized access, impersonation, or illegal recovery behavior.

## What I need
Design and implement the simplest engine that powers the MVP.

I want you to define and build:

### 1. Core engine purpose
Define exactly what the engine does in the MVP.
Keep it narrow and clear.

### 2. Engine inputs
Define what the user provides.
Only include essential inputs.

### 3. Engine logic
Define what happens step by step after the user submits a case.
Keep the logic simple, believable, and structured.

### 4. Engine outputs
Define what the system returns to the user.
These outputs should make the product feel useful and real.

### 5. Minimum internal modules
Define the smallest set of internal modules/functions needed.
For each one, explain its role briefly and implement it cleanly.

### 6. What should be real vs simulated
Decide what parts should actually work in version 1 and what parts can be mocked or simulated for the MVP.

### 7. Best MVP architecture
Recommend and use the simplest technical architecture for this engine.
For example:
- frontend form
- lightweight backend endpoint
- simple rules engine
- static/mock database
- generated report output

Keep it lean.

### 8. Demo flow
Describe how the engine should behave in a demo from start to finish.

### 9. What to avoid
Explicitly identify what not to build yet because it adds complexity without enough MVP value.

### 10. Final recommendation
End with:
- the exact MVP engine to build
- the simplest architecture
- the key output that sells the product
- the biggest thing that would overcomplicate version 1

## Quality bar
I do not want a fantasy architecture.
I want a simple, professional, believable engine design that a strong solo builder could implement fast.

Optimize for:
- clarity
- simplicity
- demo value
- product credibility
- fast implementation

## Implementation instructions
Work inside the existing repository.

Your job is not just to describe the engine.
Your job is to inspect the repo, decide where the engine should live, and implement a clean MVP version.

Use this workflow:

1. Inspect the existing repository structure first.
2. Identify where the engine logic, types, and sample data should live.
3. Propose a short implementation plan before coding.
4. Implement the engine with the smallest clean architecture.
5. Reuse existing code where sensible instead of rebuilding everything.
6. Keep the implementation easy to understand and easy to demo.
7. Run lint/typecheck/tests if available.
8. Fix any errors you introduce.
9. Summarize what you changed.

## Engine design requirements
The engine should be a narrow “Recovery Readiness Engine” for lawful digital asset recovery workflow support.

It should do these things:
- accept a structured case input
- classify the case
- score the strength of provided ownership/evidence signals
- identify missing requirements
- generate a recommended lawful recovery path
- generate next steps
- return a short summary explanation

It should NOT:
- perform recovery automatically
- connect to third-party systems unless already trivially present
- attempt any unauthorized access
- simulate illegal or unsafe recovery behavior
- rely on a large autonomous agent architecture

## Suggested essential inputs
Keep the form minimal. Prefer something like:
- assetType
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

Do not expand this into a giant intake system.

## Suggested engine behavior
After submit, the engine should roughly do:

1. Normalize input
2. Classify the case
3. Score available evidence
4. Assign readiness level
5. Generate risk/compliance flags
6. Generate required documents / missing items
7. Recommend a lawful recovery path
8. Generate a concise summary explanation

Keep this deterministic and easy to follow.

## Suggested output structure
The engine should return something like:

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

These outputs should be designed so they can be rendered cleanly in a report UI and dashboard.

## Suggested minimum modules
Prefer a very small set such as:
- normalizeCaseInput
- classifyCase
- scoreEvidence
- deriveRecommendation
- deriveRequirements
- buildAssessmentSummary
- evaluateCase

Keep modules small, readable, and testable.

## What should be real in v1
These should actually work:
- structured case intake handling
- case classification
- evidence scoring
- readiness assignment
- recommendation generation
- required documents generation
- next actions generation
- final structured assessment output

## What can be simulated in v1
These can be mocked or template-based:
- database persistence
- activity history
- AI-generated narrative wording
- export actions
- external integrations
- registrar/platform checks
- advanced verification systems

## Preferred architecture
Use the simplest serious architecture possible.

Ideal shape:
- frontend form
- lightweight backend endpoint or shared evaluation function
- deterministic rules engine
- static/mock sample cases
- generated report output

If this is a Next.js repo, a good structure would be:
- shared types
- lib/engine/*
- app/api/assess-case/route.ts or equivalent
- data/sampleCases.ts

No heavy infra.
No queues.
No event systems.
No agent frameworks.

## Demo requirement
The MVP engine must demo well.

The demo flow should feel like:
1. user opens demo
2. user enters or loads a sample case
3. user submits
4. system shows a short processing state
5. system returns a Recovery Readiness Report
6. user sees score, recommendation, missing requirements, and next actions

That output is the selling point.

## Important constraints
Avoid building:
- multi-agent orchestration
- autonomous recovery execution
- deep backend systems
- auth if not already present and trivial
- document OCR pipelines
- external API integrations
- complex databases
- workflow orchestration infrastructure
- anything unsafe or legally questionable

## Final output format
Before coding:
- summarize what exists in the repo
- propose a concise implementation plan

After coding:
- summarize files created
- summarize files changed
- explain the final engine behavior
- clearly separate what is real vs simulated
- note what should come later, but do not build it now

Most important rule:
Build the simplest believable MVP engine.
Do not build a fantasy architecture.