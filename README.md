# TribalAid AI
### AI-Powered Scholarship & Fellowship Management Platform
**For the Ministry of Tribal Affairs (MoTA), Government of India**

---

> **IMPORTANT DISCLAIMER**
> This application is a hackathon demonstration prototype built using simulated, fictional demo data. It does not represent an official Government of India deployment or claim official certification. All Aadhaar numbers, certificate IDs, and bank account references are completely fictitious.

---

## 1. Executive Summary

**TribalAid AI** is a production-grade GovTech frontend prototype designed to transform the administration of higher education scholarships and doctoral fellowships for Scheduled Tribe (ST) scholars across India—specifically under the **National Fellowship for Higher Education of ST Students (NFST)** and the **National Overseas Scholarship (NOS)** schemes.

By integrating **AI Document Intelligence**, **sub-second OCR parsing**, **dynamic policy rules**, **statutory SLA tracking**, **human-in-the-loop verification**, **merit ranking transparency**, and **automated Direct Benefit Transfer (DBT) fellowship lifecycle management**, TribalAid AI bridges the critical gap between tribal aspirants and timely financial empowerment.

---

## 2. Problem Statement

1. **Verification Latency & Backlogs**: Manual scrutiny of state-issued Scheduled Tribe, income, and university marks certificates across regional languages creates months-long application backlogs.
2. **Deficiency Communication Breakdown**: Clerical income variances or ambiguous scans often lead to summary rejections rather than structured, actionable rectification requests.
3. **Merit Screening Opacity**: Traditional offline committee reviews lack auditable decision logging, side-by-side comparative tools, and transparent score normalization.
4. **Post-Award Tracking Blindspots**: Doctoral fellowships span 4–5 years. Tracking annual guide endorsements, departmental research council approvals, and PFMS stipend disbursements has historically been fragmented across spreadsheets.
5. **Citizen Grievance Bottlenecks**: Tribal students in remote areas encounter difficulty escalating document or bank account seeding issues to nodal officers.

---

## 3. The TribalAid AI Solution

TribalAid AI unifies the scholarship and fellowship ecosystem into **one continuous, realistic, role-based workflow**:

```
Applicant Submits Application & Documents
                 ↓
AI Document Intelligence (OCR & State Registry Cross-check)
                 ↓
Eligibility Rules Evaluated & Anomaly Signals Flagged
                 ↓
Human Scrutiny Officer Reviews Split-Screen Dossier
                 ↓
Deficiency Raised if Variance Detected (e.g., Income Certificate)
                 ↓
Applicant Resubmits Clarification & Endorsed Document
                 ↓
Scrutiny Officer Approves & Clears Application
                 ↓
National Selection Committee Reviews Composite Merit Ranking
                 ↓
Committee Selects Beneficiary with Auditable Justification
                 ↓
MoTA Executive Monitors National Funnel, State Penetration & Budget
                 ↓
Fellowship Converted to Active 5-Year Doctoral Lifecycle
                 ↓
Supervisor Endorsements & Monthly PFMS DBT Disbursements Tracked
                 ↓
Citizen Grievance Redressal with Statutory SLA Escalations
```

---

## 4. Key AI & GovTech Capabilities

### 🔍 1. AI Document Intelligence & Vision OCR
* **Sub-Second Extraction**: Automatically parses key entities (Full Name, Certificate ID, Community, Issuing Authority, Issue Date, Aggregate Marks, Annual Income) from certificates.
* **Side-by-Side Verification**: Displays the simulated official document alongside extracted entities and application form fields.
* **Match vs. Mismatch Badges**: Identifies matching values and highlights potential discrepancies (e.g. ₹1,50,000 entered vs ₹1,80,000 on certificate).
* **Confidence Scoring**: Delivers an automated confidence score (e.g., 96%) and flags risk levels (Low, Medium, High).
* **Interactive Document Inspection**: Zoom, scanline animation overlay, bounding-box detection, and DigiLocker hash checks.

### 🛡️ 2. Responsible AI & Human-in-the-Loop Governance
* **AI Informs, Humans Decide**: The AI does *not* autonomously accept or reject scholarship applications.
* **Statutory Officer Discretion**: Scrutiny officers retain sole authority to approve, raise deficiencies, or dispatch cases for physical field verification.
* **Mandatory Decision Justification**: Selection committee decisions require mandatory written audit remarks before records are finalized.

### ⏱️ 3. Statutory SLA Enforcement
* **Live Countdown Timers**: Tracks statutory 48-hour scrutiny windows and deficiency turnaround times.
* **SLA Breach Warnings**: Automated escalations (On Track → Approaching SLA → SLA Breached) routed to Appellate Nodal Officers.
* **Historical Benchmarks**: Compares processing velocity across document verification (1.8 days avg), eligibility review (0.9 days), and selection review (2.2 days).

### 📊 4. Policy Configuration Engine
* **No-Code Scheme Adjustments**: Admin-level toggles for income ceilings, minimum academic percentages, age limits, required document prerequisites, and SLA targets for NFST and NOS schemes.

### 💳 5. Post-Award Doctoral Lifecycle & DBT
* **5-Year Milestone Pipeline**: Tracks doctoral milestones (Year 1 to Year 5), research guide reviews, and Departmental Research Committee (DRC) clearances.
* **Direct Benefit Transfer (DBT)**: Displays bank account details, Aadhaar-seeding status, and Public Financial Management System (PFMS) transaction UTR references.

---

## 5. System Architecture & Role Perspectives

TribalAid AI provides 6 distinct role views accessible via the global **Topbar Role Switcher** and the **Hackathon Demo Tour Bar**:

| Role Persona | Primary Route | Core Responsibilities |
| :--- | :--- | :--- |
| **Applicant** | `/applicant` | Track application journey, review document status, upload rectified certificates, inspect DBT readiness |
| **AI Document Intelligence** | `/applicant/documents` | Interactive OCR scanner, side-by-side field matching, document switching |
| **Scrutiny Officer** | `/scrutiny` | Manage regional review queue, inspect split-screen dossier, raise deficiencies, approve applications |
| **Selection Committee** | `/selection` | National merit rankings, 2–3 candidate side-by-side comparison, override decisions with audit trail |
| **MoTA Administrator** | `/admin` | National application funnel, state-by-state geographic penetration, AI bottleneck signals, budget tracking, YoY analytics |
| **Fellow** | `/fellowship` | Post-selection doctoral tracking, annual progress review endorsements, monthly DBT stipend history |
| **Grievance Officer** | `/grievances` | CPGRAMS-integrated ticket management, conversation threads, internal notes, formal resolution sign-off |
| **Policy Administrator** | `/schemes` | Dynamic rule matrix, income ceilings, required document sets, SLA configurations |

---

## 6. Technology Stack

* **Frontend Framework**: React 19 + TypeScript
* **Build Tool**: Vite 8.3
* **Styling**: Tailwind CSS v4 (Curated GovTech palette: Deep Navy `#0F172A`, Government Blue `#1E3A8A`, Indigo `#2563EB`, Saffron highlight `#D97706`, Emerald `#059669`)
* **Typography**: Google Fonts (*Manrope* primary UI, *Inter* supporting text, *JetBrains Mono* for IDs and metrics)
* **Routing**: React Router v7
* **Analytics & Charts**: Recharts (Responsive bar charts, funnels, multi-year trajectories)
* **Icons**: Lucide React
* **Micro-Interactions**: Canvas Confetti (celebratory award feedback), animated scanlines, smooth drawer slide-ins
* **State Management**: Centralized reactive React Context with local offline persistence (`localStorage`)

---

## 7. Hackathon Demo Walkthrough (Step-by-Step Flow)

To present this prototype to evaluators, click through the **top sticky Demo Tour Bar** (Steps 1 through 8):

1. **Step 1: Applicant Portal (`/applicant`)**
   - Review Arun Kumar's application (`NFST-2026-00482`).
   - Observe the 5-stage Application Journey timeline (currently on *Document Verification*).
   - See the prominent **Action Required** card: *Income Certificate could not be verified*.
   - Click **Upload Document** to open the Resubmit modal, select an endorsed file, and submit.
2. **Step 2: AI OCR Inspector (`/applicant/documents`)**
   - Inspect the Certificate Viewer on the left (stamp, seal, QR code, scanline overlay).
   - On the right, verify the field comparison matrix: Name (Match), Certificate No (Match), Community (Match).
3. **Step 3: Scrutiny Operations (`/scrutiny`)**
   - Review the queue metrics (1,248 Pending, 186 AI Flagged, 18 SLA Breaches).
   - Click **Review Focus Case: Arun Kumar** to open `/scrutiny/application/NFST-2026-00482`.
   - Inspect the split-screen verification workspace.
   - Click **Approve Application** to endorse the dossier and forward it to the Selection Committee.
4. **Step 4: Selection Committee (`/selection`)**
   - Review the National Merit List sorted by composite score.
   - Select checkboxes for Arun Kumar and Meena Devi, then click **Compare Selected (2/3)** for side-by-side evaluation.
   - Click **Record Decision** on Arun Kumar, select *Selected (Awarded)*, review the mandatory audit note, and confirm. Confetti fires to celebrate!
5. **Step 5: MoTA Admin Cockpit (`/admin`)**
   - Inspect the **Application Funnel** (24,821 Applied → 19,462 Verified → 14,821 Eligible → 8,214 Selected → 7,962 Disbursed).
   - In the **State Analytics Map**, click *Odisha* or *Jharkhand* to observe the live regional card updates.
   - Review the **AI Operational Insights** (verification bottlenecks and efficiency gains).
   - Review **Budget Tracking** (₹25 Cr Allocated, ₹21.3 Cr Committed, ₹18.4 Cr Disbursed).
6. **Step 6: Fellowship Management (`/fellowship`)**
   - View the active fellows directory.
   - Click **Open Fellow Profile: Arun Kumar** (`/fellowship/FST-2026-00231`).
   - Review the 5-year doctoral milestone pipeline (Years 1 & 2 completed, Year 3 active).
   - Inspect the PFMS DBT payment audit history.
7. **Step 7: Grievance Redressal (`/grievances`)**
   - Open ticket `GRV-2026-1042` (Income certificate clarification).
   - Inspect the citizen conversation thread and internal officer notes.
   - Click **Mark as Resolved** and submit the statutory closure remark.
8. **Step 8: Scheme Configuration (`/schemes`)**
   - Switch between NFST and NOS.
   - Adjust the income ceiling or toggle mandatory document prerequisites to demonstrate platform configurability.

---

## 8. Getting Started Locally

### Prerequisites
- Node.js (v18 or higher, tested on v20.20.0)
- npm (v9 or higher)

### Installation
```bash
# Clone or navigate to the project directory
cd "d:/TribalAid AI"

# Install dependencies
npm install

# Start local development server
npm run dev
```

The web application will launch at:
```
http://127.0.0.1:5173/
```

### Production Build
```bash
npm run build
```
Creates an optimized static bundle in the `dist/` directory.

---

## 9. Future Roadmap & Production Extensions

1. **DigiLocker & API Setu Direct Integration**: Real-time cryptographic API verification of caste and income certificates directly from state e-District portals.
2. **Multilingual Regional Voice Support**: Voice-assisted portal guidance in Santhali, Gondi, Tamil, Odia, Hindi, and other tribal languages for rural aspirants.
3. **Verifiable Academic Credentials (W3C Standard)**: Blockchain/DID-based issuing of fellowship sanction letters for automated international visa endorsement.
4. **Geo-Spatial School Mapping**: Saturation analysis identifying tribal aspirational districts with low higher education participation to trigger targeted outreach camps.

---

*TribalAid AI — Developed for the Ministry of Tribal Affairs (MoTA) Hackathon Showcase.*
