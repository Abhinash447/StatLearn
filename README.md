# StatSkill AI — MoSPI Skill Intelligence & Learning Platform
> **SIH 2026 Problem Statement ID: 26101**  
> **Theme:** Smart Education | **Category:** Software | **Organization:** Ministry of Statistics & Programme Implementation (MoSPI)  
> **Department:** Data Informatics & Innovation Division (DIID)

---

## 🌟 Executive Overview
**StatSkill AI** is an enterprise-grade AI-powered Skill Intelligence and Learning Platform engineered specifically for officials working within **India's Official Statistical System (MoSPI)**.

The platform automatically constructs dynamic competency profiles, executes multi-tier psychometric assessments, identifies mathematical skill deficits ($Gap = Required - Current$), generates personalized 5-phase capacity building roadmaps with **iGOT Karmayogi** and **NSSTA TPAC** integrations, and features a state-of-the-art **AI Quiz Generator** that synthesizes calibrated MCQs directly from uploaded official manuals, circulars, and training documents (PDF, DOCX, PPTX, TXT).

---

## 🚀 Key Architectural Features & SIH Requirements Mapping

| SIH Requirement | Platform Feature | Implementation Details |
|---|---|---|
| **A. Competency Profiles** | Dynamic Profile Dossier | Preloaded & editable profile for **Priya Sharma (Statistical Officer, NSS)** across 23 standard statistical, technical, digital governance, and managerial competencies. |
| **B. Competency Assessment** | AI Diagnostic Assessment | 10–15 psychometric MCQ diagnostic covering sampling, GSBPM, Python, SQL, AI/ML, Cloud, and Data Privacy with instant scoring and category breakdown. |
| **C. Skill Gap Identification** | Automated Skill Gap Engine | Mathematical formula ($Required - Current$) classifying gaps into **Critical (41%+)**, **High (26–40%)**, **Medium (11–25%)**, and **Low (0–10%)** with AI contextual rationale. |
| **D. Personalized Training** | 5-Factor Recommendation Engine | Weighted formula: **40% Skill Gap + 25% Role Match + 15% Level + 10% History + 10% Dept Priority**. Generates 5-phase visual roadmap (Foundation → Analytics → AI → Advanced → Deployment). |
| **E. iGOT Karmayogi Integration** | `IGOTService` Gateway | Course catalogue with live status badge (`🟢 Connected — Demo Integration`), category/difficulty filters, and 1-click enrollment with progress tracking. |
| **F. NSSTA TPAC Integration** | `NSSTAService` Gateway | Apex residential/hybrid training calendar for NSSTA Greater Noida campus with seat tracking and official nomination workflow. |
| **G. AI Quiz Generator** | Document-to-Psychometric Engine | Uploads PDF, DOCX, PPTX, TXT or uses built-in **"Try Demo Material: Introduction to Sampling Methods"** to generate 5/10/15/20 MCQs with answers, explanations, and competency tags. |
| **H. Automatic Evaluation & Feedback** | Interactive Exam & AI Feedback | Real-time quiz taking with timer and question palette. Shows correct answers, explanations, personalized feedback, and an **"Update Competency Profile"** button that upgrades live scores. |
| **I. AI Virtual Assistant** | Context-Aware Chatbot | Profile-aware virtual assistant with starter prompt chips and multilingual support (**English, Hindi, Telugu**). |
| **J. Administrator Intelligence** | Workforce Skill Intelligence | Executive dashboard for **2,486 officials**, cross-departmental heatmap, predictive 12–24 month demand forecasting (**AI/ML ↑38%**), and 1-click **Workforce Intelligence Report** generator. |
| **K. Judge Demo Mode** | Evaluator Quick Tour Toolbar | Floating persistent toolbar at the bottom for hackathon judges to verify all workflows in 1-click. |

---

## 🛠️ Unified MERN Technology Stack
- **M — MongoDB & Mongoose:** Persistent NoSQL document schemas for Users, Competencies, iGOT Courses, NSSTA Calendar, Quizzes, and Departments with dual offline memory fallback.
- **E — Express.js REST API:** Unified backend gateway (`/api/*`) on Node.js port 5000 managing psychometric calculations, Multer document ingestion, AI assistant routing, and executive analytics.
- **R — React 18 & Vite:** Lightning-fast responsive single page application with TypeScript, Tailwind CSS, Recharts visualizations, Lucide icons, and Canvas-Confetti.
- **N — Node.js Runtime:** Single runtime environment orchestrating both server and client with unified concurrent startup (`npm run dev` / `npm start`).

---

## ⚡ Quick Start Instructions

### 1. Unified 1-Command Startup (MERN Full Stack)
```bash
# Navigate to project directory
cd SIH

# Start both Express Backend (Port 5000) and React Vite Frontend (Port 5173) simultaneously:
npm run dev
```

The application interface will open at **`http://localhost:5173`** and automatically proxy API calls to the Express server at **`http://localhost:5000/api`**.

### 2. Independent Commands (Optional)
```bash
# Run only Express Backend API
npm run server

# Run only Vite Frontend Client
npm run client

# Production Build
npm run build
npm start
```

---

## 🔑 Demo Authentication Credentials

| Role | Email | Password | 1-Click Fast Login |
|---|---|---|---|
| **Learner (Statistical Officer)** | `official@statskill.gov.in` | `demo123` | Click **"Login as Demo Learner"** |
| **Administrator (MoSPI DIID)** | `admin@statskill.gov.in` | `admin123` | Click **"Login as Demo Admin"** |

---

## 📋 Comprehensive Demonstration Workflow for Judges

1. **Login & Dashboard:** Login as *Priya Sharma (NSS)*. Inspect the KPI cards (72% Competency, 28% Gap, 12-day streak) and the Competency Radar Chart.
2. **AI Diagnostic Assessment:** Navigate to **AI Assessment**, answer the 10 diagnostic questions, submit to view category scores and strengths/weaknesses.
3. **Skill Gap Diagnostics:** Click **Skill Gap Analysis** to view calculated gaps (e.g. AI/ML 35% vs 75% required = 40% Critical Gap) and AI explanations.
4. **Personalized Learning Path:** Navigate to **Personalized Learning** to view the 5-phase sequential capacity building roadmap.
5. **iGOT Karmayogi & NSSTA:** Explore **iGOT Courses** (enroll in 1-click) and **NSSTA Training** (submit nomination for residential AI masterclass).
6. **AI Quiz Generation from Document:** Click **AI Quiz Generator**, select **"Try Demo Material"** (or upload your own PDF/DOCX), choose question count, and click **Generate AI Quiz**.
7. **Take Quiz & Update Profile:** Answer the generated questions, submit, review the explanations, and click **"Update Competency Profile"** to see live scores increase!
8. **StatSkill AI Assistant:** Chat with the assistant in English, Hindi, or Telugu about your skill gaps and training recommendations.
9. **Admin Workforce Intelligence:** Switch to **Admin Role** to view the 2,486 official analytics, cross-divisional heatmap, predictive skill velocity (**AI/ML ↑38%**), and generate the executive printable workforce report.

---
*Developed for MoSPI Data Informatics & Innovation Division (DIID) • Smart India Hackathon (SIH 2026)*
