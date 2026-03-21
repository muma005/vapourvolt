Below is a direct build spec for **VaporVault v1**.

This is optimized for one serious build session. It is not a strategy document anymore. It is the thing to build.

---

# VaporVault v1 Build Spec

## Product definition

### Product type

A professional product website with an interactive demo for a lawful digital asset recovery workflow platform.

### Product goal

Make VaporVault feel like a real B2B startup product by combining:

* a premium landing page
* a believable interactive demo
* a lightweight dashboard view

### Core story the product must communicate

VaporVault helps teams assess, document, and manage lawful digital asset recovery cases in a structured way.

### Core action

The user should be able to:

1. understand the product in under 20 seconds
2. click into a demo
3. submit or load a sample case
4. see a structured recovery readiness report
5. view that case inside a simple dashboard

---

# 1. Exact site map

## Routes

Build these 3 routes only:

### `/`

Landing page

### `/demo`

Interactive demo flow

### `/contact`

Simple contact / early access page

That is enough. Do not add blog, pricing, docs, or auth.

---

# 2. Exact landing page sections

## Page: `/`

Build sections in this exact order.

---

## Section 1: Top navigation

### Purpose

Instantly frame VaporVault as a serious software company.

### Layout

* left: logo mark + wordmark “VaporVault”
* center/right: nav links
* far right: CTA button

### Links

* Product
* Workflow
* Trust
* FAQ
* Demo

### CTA

* Button text: **Try Demo**

### UI components

* sticky navbar
* text links
* primary button

### Copy

**Logo text:** VaporVault

**Nav labels:**

* Product
* Workflow
* Trust
* FAQ
* Demo

**CTA button:** Try Demo

---

## Section 2: Hero

### Purpose

State exactly what the product is and make it look real.

### Layout

Two-column layout:

* left: text stack
* right: product mockup / dashboard preview

### Copy block

**Eyebrow**
Lawful digital asset recovery workflow

**Headline**
Bring structure, evidence, and visibility to digital asset recovery.

**Subheadline**
VaporVault helps teams assess cases, collect supporting evidence, and manage lawful recovery workflows for domains, accounts, and digital properties.

**Primary CTA**
Try Demo

**Secondary CTA**
See Workflow

**Trust line**
Evidence-led. Audit-friendly. Built for lawful recovery operations.

### UI components

* eyebrow label
* large headline
* supporting paragraph
* two CTA buttons
* trust microcopy row
* product preview card/mockup

### Product preview content

A realistic dashboard frame with:

* left sidebar
* case list
* selected case panel
* status chips
* checklist
* recommendation card

### Mockup labels inside preview

* Active Cases
* Ownership Signals
* Recovery Path
* Required Documents
* Awaiting Review
* Ready for Submission

---

## Section 3: Problem

### Purpose

Make the product necessary.

### Layout

Section intro + 3 problem cards

### Copy block

**Section label**
The problem

**Heading**
Recovery work breaks down when evidence, ownership signals, and next steps live in scattered systems.

**Support text**
Teams often handle recovery cases across inboxes, screenshots, legal notes, support tickets, and spreadsheets. That slows decisions, weakens documentation, and increases operational risk.

### 3 cards

#### Card 1

**Title**
Scattered evidence

**Body**
Ownership signals, billing history, screenshots, and legal documents end up fragmented across tools.

#### Card 2

**Title**
Unclear recovery readiness

**Body**
Teams know a case matters, but not whether the documentation is strong enough to proceed.

#### Card 3

**Title**
No structured workflow

**Body**
Without a clear case system, recovery efforts stall between review, follow-up, and submission.

### UI components

* section title
* 3 feature/problem cards
* subtle icons

---

## Section 4: Solution

### Purpose

Show what VaporVault fixes.

### Layout

Section intro + 4 solution cards

### Copy block

**Section label**
The solution

**Heading**
VaporVault turns recovery cases into a clear operational workflow.

**Support text**
Instead of managing recovery through disconnected documents and manual follow-up, teams can run each case through a structured, reviewable process.

### 4 cards

#### Card 1

**Title**
Case intake

**Body**
Capture asset details, claimant information, and available ownership signals in one place.

#### Card 2

**Title**
Evidence review

**Body**
Organize supporting materials and identify proof gaps before the case moves forward.

#### Card 3

**Title**
Recovery readiness

**Body**
Generate a clear recommendation path based on case type, evidence strength, and review requirements.

#### Card 4

**Title**
Case tracking

**Body**
Track progress, required actions, and status changes from intake to submission readiness.

### UI components

* 4 card grid
* icon + heading + short paragraph

---

## Section 5: How it works

### Purpose

Make the workflow obvious.

### Layout

4 horizontal steps or 4 numbered cards

### Copy block

**Section label**
How it works

**Heading**
A simple workflow for complex recovery cases.

### Steps

#### Step 1

**Title**
Submit a case
**Body**
Enter the asset, claimant, and reason for recovery.

#### Step 2

**Title**
Review signals
**Body**
Assess ownership indicators, evidence strength, and missing documentation.

#### Step 3

**Title**
Generate a recovery plan
**Body**
See the recommended path, proof requirements, and human review status.

#### Step 4

**Title**
Track the case
**Body**
Manage progress, pending tasks, and case history in one dashboard.

### UI components

* numbered steps
* connecting line or clean card layout

---

## Section 6: Product preview

### Purpose

Make the product tangible before the user opens the demo.

### Layout

Left: copy
Right: product image or live UI snippet

### Copy block

**Section label**
Product preview

**Heading**
A workspace built for recovery operations.

**Support text**
See case status, ownership signals, document requirements, and review notes in a structured interface designed for compliance-sensitive workflows.

### Bullets

* Recovery readiness report
* Ownership signal scoring
* Required document checklist
* Status tracking and activity history

### CTA

Explore the demo

### UI components

* preview image/card
* bullet list
* button

---

## Section 7: Trust and compliance

### Purpose

Prevent the product from feeling shady.

### Layout

Heading + trust cards or checklist grid

### Copy block

**Section label**
Trust and compliance

**Heading**
Designed for lawful, documented recovery workflows.

**Support text**
VaporVault is framed around structured review, evidence handling, and clearly bounded recovery processes.

### Trust points

#### Point 1

**Title**
No unauthorized access
**Body**
The workflow does not support intrusion, bypass, or account takeover methods.

#### Point 2

**Title**
Evidence-based handling
**Body**
Cases move forward through documentation, ownership signals, and reviewable records.

#### Point 3

**Title**
Human-reviewed decisions
**Body**
Recommendations are surfaced clearly, with manual validation where required.

#### Point 4

**Title**
Audit-friendly records
**Body**
Case history, status progression, and document requirements stay visible and structured.

### UI components

* 4 trust cards
* shield/check icons
* muted background block

---

## Section 8: FAQ

### Purpose

Handle objections and clarify scope.

### Layout

Accordion list

### Copy blocks

#### FAQ 1

**Question**
What kinds of assets can VaporVault support?

**Answer**
VaporVault is designed for structured recovery workflows around digital assets such as domains, branded handles, legacy SaaS accounts, and other digital properties where lawful recovery requires documentation and process control.

#### FAQ 2

**Question**
Does VaporVault perform recovery automatically?

**Answer**
No. VaporVault helps teams organize cases, assess readiness, and manage the workflow required for lawful recovery. It is a workflow and documentation product, not an automated takeover tool.

#### FAQ 3

**Question**
Who is this built for?

**Answer**
The product is best suited for operations, legal, brand protection, portfolio management, and internal teams handling recovery-sensitive digital assets.

#### FAQ 4

**Question**
How does VaporVault handle compliance?

**Answer**
The product is framed around documented workflows, bounded recommendations, visible risk checks, and human review where required.

#### FAQ 5

**Question**
Can this integrate with external systems later?

**Answer**
Yes. Future versions can support registrar workflows, internal case systems, and document pipelines, but the first version focuses on core workflow clarity.

### UI components

* accordion

---

## Section 9: CTA banner

### Purpose

Push the visitor into the demo.

### Copy block

**Heading**
See how structured digital asset recovery should work.

**Body**
Explore the interactive demo and walk through a sample recovery case from intake to readiness report.

**Primary CTA**
Try Demo

**Secondary CTA**
Request Access

### UI components

* full-width callout card
* two buttons

---

## Section 10: Footer

### Purpose

Finish like a real company.

### Layout

3 or 4 columns

### Copy

**Brand line**
VaporVault
Structured workflows for lawful digital asset recovery.

**Links**

* Product
* Demo
* Trust
* Contact
* Privacy
* Terms

**Contact**
[hello@vaporvault.co](mailto:hello@vaporvault.co)

**Bottom line**
© 2026 VaporVault. All rights reserved.

### UI components

* footer columns
* small muted text

---

# 3. Exact MVP screens

## Page: `/demo`

This page should feel like product software, not another landing page.

Build these screens/states.

---

## Screen 1: Demo intro state

### Purpose

Orient the user before they start.

### Layout

Top bar + main intro panel + sample case cards

### Copy

**Heading**
Interactive recovery workflow demo

**Body**
Load a sample case or enter your own details to see how VaporVault structures a lawful recovery workflow.

**Buttons**

* Load Sample Case
* Start Blank Case

### Sample case cards

Build 3 cards:

#### Sample 1

**Title**
Dormant company domain

**Subtitle**
Legacy domain recovery for a dissolved product line

#### Sample 2

**Title**
Branded social handle

**Subtitle**
Handle recovery case with incomplete historical records

#### Sample 3

**Title**
Legacy SaaS workspace

**Subtitle**
Admin continuity issue with prior ownership documentation

### UI components

* page header
* intro panel
* 3 selectable sample cards
* secondary action button

---

## Screen 2: Case intake form

### Purpose

Make the demo interactive.

### Layout

Two-column form with action bar

### Fields

#### Left column

* Asset Type (select)
* Asset Name (input)
* Claimed Organization (input)
* Reason for Recovery (textarea)

#### Right column

Checkbox group: Available Ownership Signals

* Trademark record
* Historical billing proof
* Company registration documents
* Prior admin email evidence
* Archived website evidence
* Registrar/support correspondence

### Bottom actions

* Back
* Load Sample Data
* Generate Recovery Report

### Copy

**Section title**
Case intake

**Section text**
Enter the case details and available ownership signals to generate a structured readiness report.

### UI components

* form card
* select
* input
* textarea
* checkbox group
* action buttons

---

## Screen 3: Processing transition state

### Purpose

Add product feel without complexity.

### Behavior

After clicking “Generate Recovery Report,” show a short staged UI transition for 1.5–2.5 seconds.

### Status labels shown one after another

* Validating case inputs
* Reviewing ownership signals
* Checking documentation completeness
* Building recovery recommendation

### UI components

* centered loader panel
* progress steps list

This can be faked locally.

---

## Screen 4: Recovery Readiness Report

### Purpose

This is the core demo output.

### Layout

Top summary row + card grid + timeline

### Block A: Page header

**Title**
Recovery Readiness Report

**Subtext**
Case classification, documentation review, and recommended path.

**Top-right buttons**

* Export PDF
* Open Dashboard

Buttons can be non-functional except Open Dashboard route/state.

---

### Block B: Summary cards row

Build 4 metric cards:

#### Card 1

**Label**
Asset Type
**Value**
Domain / Handle / SaaS Account

#### Card 2

**Label**
Case Category
**Value**
Dormant asset recovery

#### Card 3

**Label**
Readiness Score
**Value**
72%

#### Card 4

**Label**
Review Status
**Value**
Human review required

---

### Block C: Main two-column content

#### Left panel 1: Case summary

**Title**
Case summary

**Fields**

* Asset
* Claimed owner
* Reason for recovery
* Recommended pathway

Example copy:

* Asset: vaporvaultlabs.com
* Claimed owner: Vapor Labs Ltd
* Reason: Legacy domain tied to inactive business unit
* Recommended pathway: Registrar-assisted ownership recovery

---

#### Left panel 2: Ownership signals

**Title**
Ownership signals

**Rows**

* Trademark evidence — Strong
* Billing continuity — Partial
* Admin continuity — Moderate
* Archive/history evidence — Strong
* Documentation completeness — 72%

Use status chips.

---

#### Right panel 1: Required next documents

**Title**
Required documents

**Checklist rows**

* Company registration certificate
* Historical billing statement
* Claimant authorization letter
* Archive or DNS evidence
* Support correspondence reference

---

#### Right panel 2: Risk and compliance check

**Title**
Risk and compliance

**Rows**

* Unauthorized access risk: Blocked
* Impersonation risk: Low
* Proof gap severity: Medium
* Manual validation required: Yes

Use a muted alert box.

---

### Block D: Recommendation card

**Title**
Recommended next step

**Body**
Proceed with document completion and formal review. Current signals support a registrar-led recovery request, but claimant authorization and billing continuity should be completed before submission.

---

### Block E: Case timeline

**Title**
Case timeline

**Steps**

* Intake completed
* Initial signals reviewed
* Documentation gaps identified
* Awaiting claimant documents
* Ready for submission review

Use vertical timeline with one active state.

---

## Screen 5: Mini dashboard

### Purpose

Make it feel like an actual SaaS product.

### Layout

Sidebar + top bar + main content

---

### Sidebar items

* Overview
* Cases
* Reviews
* Documents
* Activity

Only Cases needs to look active.

---

### Top bar

* Search field
* “New Case” button
* user badge placeholder

---

### Main content layout

Use a 3-panel layout:

#### Left panel: case list

List 4 sample cases with status chips.

Example rows:

* vaporvaultlabs.com — Awaiting Docs
* @vaporvaulthq — Needs Review
* Workspace-19 — Ready for Review
* oldbrand.io — In Progress

#### Center panel: selected case detail

Show:

* case name
* status chip
* claimant
* asset type
* readiness score
* short summary

#### Right panel: action stack

Cards:

* Required actions
* Activity feed
* Recommendation summary

---

### Required actions card

* Upload claimant authorization
* Verify billing continuity
* Confirm support reference
* Route to reviewer

### Activity feed

* Case created
* Evidence signals reviewed
* Documentation gap flagged
* Review pending

### Recommendation summary

Short paragraph from the report.

---

# 4. Exact copy blocks

Use these directly.

---

## Homepage hero copy

**Eyebrow**
Lawful digital asset recovery workflow

**Headline**
Bring structure, evidence, and visibility to digital asset recovery.

**Subheadline**
VaporVault helps teams assess cases, collect supporting evidence, and manage lawful recovery workflows for domains, accounts, and digital properties.

**Primary CTA**
Try Demo

**Secondary CTA**
See Workflow

**Trust line**
Evidence-led. Audit-friendly. Built for lawful recovery operations.

---

## Problem section copy

**Label**
The problem

**Heading**
Recovery work breaks down when evidence, ownership signals, and next steps live in scattered systems.

**Paragraph**
Teams often handle recovery cases across inboxes, screenshots, legal notes, support tickets, and spreadsheets. That slows decisions, weakens documentation, and increases operational risk.

---

## Solution section copy

**Label**
The solution

**Heading**
VaporVault turns recovery cases into a clear operational workflow.

**Paragraph**
Instead of managing recovery through disconnected documents and manual follow-up, teams can run each case through a structured, reviewable process.

---

## How it works copy

**Label**
How it works

**Heading**
A simple workflow for complex recovery cases.

**Step 1**
Submit a case
Enter the asset, claimant, and reason for recovery.

**Step 2**
Review signals
Assess ownership indicators, evidence strength, and missing documentation.

**Step 3**
Generate a recovery plan
See the recommended path, proof requirements, and human review status.

**Step 4**
Track the case
Manage progress, pending tasks, and case history in one dashboard.

---

## Trust section copy

**Label**
Trust and compliance

**Heading**
Designed for lawful, documented recovery workflows.

**Paragraph**
VaporVault is framed around structured review, evidence handling, and clearly bounded recovery processes.

---

## CTA copy

**Heading**
See how structured digital asset recovery should work.

**Paragraph**
Explore the interactive demo and walk through a sample recovery case from intake to readiness report.

**Buttons**
Try Demo
Request Access

---

## Demo intro copy

**Heading**
Interactive recovery workflow demo

**Paragraph**
Load a sample case or enter your own details to see how VaporVault structures a lawful recovery workflow.

---

## Demo intake copy

**Heading**
Case intake

**Paragraph**
Enter the case details and available ownership signals to generate a structured readiness report.

---

## Report header copy

**Heading**
Recovery Readiness Report

**Paragraph**
Case classification, documentation review, and recommended path.

---

## Recommendation card copy

**Title**
Recommended next step

**Body**
Proceed with document completion and formal review. Current signals support a registrar-led recovery request, but claimant authorization and billing continuity should be completed before submission.

---

# 5. Exact UI components

Build this component set only.

## Global components

* Navbar
* Footer
* SectionHeader
* PrimaryButton
* SecondaryButton
* StatusBadge
* Card
* MetricCard
* IconTextCard
* AccordionItem

## Landing page components

* HeroSplit
* ProblemCardGrid
* SolutionCardGrid
* StepsRow
* ProductPreviewPanel
* TrustGrid
* CTASection

## Demo components

* DemoIntroPanel
* SampleCaseCard
* CaseIntakeForm
* LoaderStepsPanel
* ReportSummaryCards
* SignalsTable
* ChecklistCard
* RiskCard
* RecommendationCard
* Timeline
* DashboardSidebar
* CaseListPanel
* CaseDetailPanel
* ActionPanel

---

# 6. Exact data model for fake MVP data

Use static JSON or TS objects.

## Sample case shape

```ts
type SampleCase = {
  id: string
  title: string
  assetType: "Domain" | "Social Handle" | "SaaS Account"
  assetName: string
  organization: string
  reason: string
  category: string
  readinessScore: number
  reviewStatus: string
  recommendedPath: string
  ownershipSignals: {
    trademark: "Strong" | "Moderate" | "Partial" | "None"
    billing: "Strong" | "Moderate" | "Partial" | "None"
    adminContinuity: "Strong" | "Moderate" | "Partial" | "None"
    archiveEvidence: "Strong" | "Moderate" | "Partial" | "None"
    documentationCompleteness: number
  }
  requiredDocuments: string[]
  riskChecks: {
    unauthorizedAccessRisk: string
    impersonationRisk: string
    proofGapSeverity: string
    manualValidationRequired: string
  }
  timeline: string[]
  status: string
  activity: string[]
}
```

## Minimum sample data

Create 4 sample cases.
Only 1 needs full detail. The rest can support the dashboard list.

---

# 7. Exact visual direction

## Design tone

Premium B2B SaaS.

## Color approach

Use:

* background: off-white or dark slate
* text: charcoal / near-black
* accent: indigo or blue
* success: muted green
* warning: amber
* neutral borders: light gray/slate

Do not use multiple bright accent colors.

## Typography

Use one clean font family. Good choices:

* Inter
* Geist
* Plus Jakarta Sans

## Spacing

Generous spacing. Make it feel expensive.

## Cards

* rounded-xl or rounded-2xl
* soft border
* subtle shadow
* slightly tinted background for nested panels

## Buttons

* strong solid primary
* understated secondary
* no flashy gradients

## Icons

Use minimal line icons.

## Dashboard feel

Dense enough to feel real, but not cluttered.

---

# 8. Exact implementation priorities

Build in this order.

## Priority 1: Foundation

### Goal

Get the product shell looking premium fast.

### Build

* app shell
* font
* color tokens
* container widths
* buttons
* cards
* badges
* navbar
* footer

### Do not waste time on

* advanced theming
* dark mode toggle
* animations

---

## Priority 2: Landing page

### Goal

Ship a complete homepage quickly.

### Build

* hero
* problem
* solution
* how it works
* trust
* product preview
* FAQ
* CTA
* footer

### Do not waste time on

* too many decorative visuals
* extra sections
* complex illustrations

---

## Priority 3: Demo intro and intake

### Goal

Create a working interaction path.

### Build

* `/demo`
* intro panel
* sample case selection
* intake form
* form state

### Do not waste time on

* backend form submission
* validation edge cases

---

## Priority 4: Report screen

### Goal

Create the strongest “this is real” moment.

### Build

* fake loading transition
* report header
* summary cards
* case summary
* ownership signals
* required docs
* risk checks
* recommendation
* timeline

### Do not waste time on

* actual scoring logic
* export functionality

---

## Priority 5: Dashboard

### Goal

Make the product feel like software, not a single report page.

### Build

* sidebar
* top bar
* case list
* selected case
* action cards
* activity feed

### Do not waste time on

* filtering systems
* search logic
* charts

---

## Priority 6: Polish

### Goal

Remove the “prototype” feeling.

### Build

* spacing cleanup
* better mock data
* hover states
* consistent headings
* better status chips
* more realistic dashboard density

### Do not waste time on

* pixel-perfection everywhere
* custom illustrations
* over-animation

---

# 9. Exact implementation stack recommendation

## Best stack

* Next.js
* Tailwind CSS
* local React state
* local static data

## Folder structure

```txt
app/
  page.tsx
  demo/page.tsx
  contact/page.tsx
components/
  layout/
  marketing/
  demo/
  ui/
data/
  sampleCases.ts
lib/
  utils.ts
public/
  preview.png
```

---

# 10. Exact build checklist

## Landing page checklist

* [ ] Sticky navbar
* [ ] Hero with dashboard preview
* [ ] Problem section with 3 cards
* [ ] Solution section with 4 cards
* [ ] How it works section
* [ ] Trust/compliance section
* [ ] Product preview section
* [ ] FAQ accordion
* [ ] CTA banner
* [ ] Footer

## Demo checklist

* [ ] Demo intro
* [ ] 3 sample case cards
* [ ] Intake form
* [ ] Loading transition
* [ ] Recovery readiness report
* [ ] Open dashboard action
* [ ] Mini dashboard layout

## Polish checklist

* [ ] Consistent spacing
* [ ] Realistic status labels
* [ ] Clean typography
* [ ] Muted professional colors
* [ ] No filler copy
* [ ] No cheap effects

---

# 11. Final execution summary

## Exact thing to build first

A polished **homepage + interactive demo + mini dashboard** using fake but realistic case data.

## Exact MVP screens

* Landing page
* Demo intro
* Intake form
* Processing state
* Recovery Readiness Report
* Mini dashboard

## Exact positioning

A professional workflow platform for lawful digital asset recovery case management.

## Biggest lever for professionalism

A clean B2B SaaS interface with structured workflow output and disciplined trust/compliance framing.

## Biggest mistake

Trying to simulate deep automation instead of showing a sharp workflow product.

I can turn this into the next layer too: a **full wireframe-to-code screen spec for each page with exact component hierarchy and Tailwind-ready layout structure**.
