# Bandela Saibabu — Personal Developer Portfolio

A recruiter-friendly personal portfolio website for **Bandela Saibabu**, Computer Science & Engineering (Artificial Intelligence) graduate (Class of 2026, CGPA 7.79), presenting verified skills in Python Development, Software Engineering, Data Analytics, Quality Assurance (QA), and Technical Support.

---

## 🎨 Color System & Design Language
- **Background**: `#15191C` (Dark Charcoal)
- **Card Background**: `#202629`
- **Accent**: `#57DCC1` (Teal)
- **Primary Text**: `#F5F7F8`
- **Secondary Text**: `#C2CBCE`
- **Borders**: `#2C363B` / subtle dark grey
- **Typography**: Clean, modern geometric typography powered by *Plus Jakarta Sans*

---

## 🚀 Key Features

1. **Full Photo Management Directly in UI**:
   - Features a dignified professional placeholder by default (`BS` monogram & technical badge).
   - Allows Saibabu to click **"Upload My Photo"**, select any image from their device, and view it instantly.
   - Provides **"Replace Photo"** and **"Delete Photo"** options anytime with automatic browser storage persistence (`localStorage`).

2. **Full Resume Management & Download**:
   - **Download Resume**: One-click download of either your uploaded custom PDF/DOCX or a clean, formatted plaintext resume.
   - **Manage Resume File**: Modal allowing you to upload your custom resume file (`.pdf`, `.docx`, `.doc`), inspect file size and upload date, test downloading it, replace it with updated versions, or delete it anytime.

3. **5 Verified GitHub Projects**:
   - **QualityHub** (QA & Testing) — `https://github.com/saibandela/QualityHub`
   - **REST API Project** (Software Development) — `https://github.com/saibandela/REST-API-project`
   - **Retail Data Pipeline** (Data Engineering) — `https://github.com/saibandela/data-pipeline-development-postgresql-python`
   - **Customer Churn Prediction** (Data Science & Insights) — `https://github.com/saibandela/customer-churn-prediction-with-business-insights`
   - **Chocolate Sales & Profitability Dashboard** (Power BI Reporting) — `https://github.com/saibandela/chocolate-sales-dashboard-powerbi-`
   - Dual view modes: **Grid View** and **Horizontal Slider / Carousel View** with touch swiping and navigation arrows.

4. **Grounded Academic & Skills Section**:
   - B.Tech CSE - AI (2026), CGPA 7.79.
   - Skills categorized into 6 core areas without arbitrary percentages or progress bars.
   - Academic coursework highlighted with honest certification verification note.

5. **Direct Recruiter Communication**:
   - Clickable and copyable email (`bandelasai245@gmail.com`).
   - Verified LinkedIn and GitHub links.
   - Functional contact form triggering direct email client compose (`mailto:`) or one-click formatted message draft copy.

---

## 🛠️ Local Development & Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation
```bash
# 1. Clone repository
git clone https://github.com/saibandela/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```
Open `http://localhost:3000` or `http://localhost:5173` in your browser.

### Production Build & Linting
```bash
# Type check and lint
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📝 How to Update Portfolio Information

### 1. Update Project Data or Add New Repositories
Edit `src/data/portfolioData.ts`:
- Modify the `PROJECTS` array to adjust titles, descriptions, problem statements, implementation bullet points, or add newly published GitHub repositories.
- Modify the `SKILL_CATEGORIES` to append new verified tools.

### 2. Update Profile & Contact Information
Edit `PROFILE` in `src/data/portfolioData.ts`:
- Email, phone, location, CGPA, graduation status, LinkedIn URL, or summary.

---

## 🚢 Deployment Guide

### Deploying to Vercel (Recommended)
1. Push your code to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Click **Deploy**. Your site will be live on a secure HTTPS URL within seconds.

### Deploying to GitHub Pages
1. In `vite.config.ts`, ensure `base: '/<repository-name>/'` is specified if deploying under a repo subpath.
2. Run `npm run build`.
3. Push the `dist` directory to your `gh-pages` branch or configure GitHub Actions for Pages deployment.
