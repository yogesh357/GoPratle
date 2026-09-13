# GoPratle — Event Requirement Posting Flow

A production-ready full-stack web application implementing an interactive **4-step Event Requirement Posting Flow** built for the GoPratle Full-Stack Developer Intern technical assignment.

---

## 🌟 Overview & Highlights

- **Frontend**: Next.js 15 (App Router, TypeScript, Tailwind CSS, Lucide Icons, Canvas Confetti).
- **Backend**: Node.js + Express (TypeScript, Zod Validation, Morgan Logging, CORS, Error Handler).
- **Database**: MongoDB (Mongoose Schema with category-specific nested payloads & indexing).
- **Architecture**: Clean decoupled client-server architecture with REST API endpoints, real-time client validation, interactive review summaries, and live requirement explorer feed.

---

## 📋 4-Step Dynamic Form Flow

1. **Step 1 — Event Basics & Category Selection**:
   - Event name, event type (with quick-select badges + custom input).
   - Date picker supporting **Single Day** or **Multi-Day Range** schedules.
   - Location (City, State, Venue details).
   - Category Selection: **Event Planner**, **Performer / Talent**, or **Event Crew & Staff**.

2. **Step 2 — Dynamic Scope & Core Specifications**:
   - *Planner*: Planning type (Full / Partial / Day-of), guest count, budget range, required deliverables.
   - *Performer*: Performer type (Musician, DJ, Comedian, Dancer, Host), duration in minutes, sets, genre, languages.
   - *Crew*: Dynamic multi-role allocation table (Role title, headcount, skill level), total crew count, call time & wrap time.

3. **Step 3 — Dynamic Logistics, Rider & Preferences**:
   - *Planner*: Venue booking status (Booked, Shortlisted, Need Assistance), theme/mood, milestone dates, vendor preferences.
   - *Performer*: Audio PA rider requirements, backline instruments checklist, stage dimensions, green room, rehearsals, song notes.
   - *Crew*: Equipment provision policy (On-site vs Bring own), uniform dress code (All Black, Formal, etc.), safety conditions, meals & transport provisions.

4. **Step 4 — Review, Contact Information & Submission**:
   - Real-time interactive summary review card of all steps.
   - Organizer contact details (Name, Email, Phone, Agency).
   - Urgent hiring requirement badge toggle.
   - Client and server-side Zod validation.
   - Submits payload to Express API and stores in MongoDB.
   - Success modal with generated MongoDB ID and celebratory animations.

---

## 🚀 Live Requirements Explorer (`/requirements`)

- Real-time MongoDB requirements feed.
- Filter by category (`All`, `Planner`, `Performer`, `Crew`).
- Search by event name, type, and location.
- Live aggregate statistics bar.
- Interactive modal with full requirement specifications.

---

## 🛠️ Project Structure

```
GoPratle/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts               # MongoDB Mongoose connection
│   │   ├── controllers/
│   │   │   └── requirementController.ts # REST API handlers (CRUD, filters, stats)
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts     # Global error & 404 handlers
│   │   │   └── validate.ts         # Zod schema validation middleware
│   │   ├── models/
│   │   │   └── Requirement.ts      # Mongoose schema with category payloads
│   │   ├── routes/
│   │   │   └── requirementRoutes.ts # Express routes
│   │   ├── types/
│   │   │   └── requirement.ts      # TypeScript interfaces
│   │   ├── validations/
│   │   │   └── requirementValidation.ts # Zod validation rules
│   │   ├── app.ts                  # Express application setup & CORS
│   │   └── server.ts               # Server bootstrap entrypoint
│   ├── .env.example
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   └── test_api.js                 # Automated backend verification test suite
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx          # Root layout with Navbar & Footer
│   │   │   ├── page.tsx            # Landing page with hero & flow overview
│   │   │   ├── post-requirement/
│   │   │   │   └── page.tsx        # 4-Step requirement posting wizard
│   │   │   ├── requirements/
│   │   │   │   └── page.tsx        # Live MongoDB requirements feed & search
│   │   │   └── globals.css         # Design tokens & glassmorphism utilities
│   │   ├── components/
│   │   │   ├── form/
│   │   │   │   ├── StepIndicator.tsx
│   │   │   │   ├── Step1Basics.tsx
│   │   │   │   ├── Step2CategorySpecific.tsx
│   │   │   │   ├── Step3CategorySpecific.tsx
│   │   │   │   ├── Step4ReviewSubmit.tsx
│   │   │   │   ├── PlannerFields.tsx
│   │   │   │   ├── PerformerFields.tsx
│   │   │   │   ├── CrewFields.tsx
│   │   │   │   └── SuccessModal.tsx
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   └── requirements/
│   │   │       ├── RequirementCard.tsx
│   │   │       └── RequirementDetailModal.tsx
│   │   └── lib/
│   │       ├── api.ts              # Fetch API client
│   │       └── types.ts            # Frontend TypeScript definitions
│   ├── .env.local.example
│   ├── .env.local
│   ├── package.json
│   └── tsconfig.json
├── README.md
└── SUBMISSION_GUIDE.md             # 5-7 minute recording demo script & guide
```

---

## ⚡ Quick Start (Local Setup)

### Prerequisites
- **Node.js**: v18+ (tested on v24)
- **MongoDB**: Local MongoDB instance on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI.

---

### 1. Backend Setup

```bash
cd backend
npm install
```

Ensure `.env` contains:
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/gopratle_db
CORS_ORIGIN=http://localhost:3000
```

Start the backend server:
```bash
npm run dev
```
> Backend runs at `http://localhost:5001`

To run automated backend tests:
```bash
node test_api.js
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Ensure `.env.local` contains:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

Start the Next.js dev server:
```bash
npm run dev
```
> Frontend runs at `http://localhost:3000`

---

## 📡 REST API Reference

### Health Check
- `GET /api/health` — Checks API health and status.

### Requirements Endpoints
- `POST /api/requirements` — Validates and creates a new requirement post.
- `GET /api/requirements` — Returns list of requirements with filtering (`category`, `search`, `city`, `page`, `limit`).
- `GET /api/requirements/:id` — Fetches complete requirement specifications by ID.
- `DELETE /api/requirements/:id` — Deletes a requirement from MongoDB.
- `GET /api/requirements/stats/summary` — Returns total counts and category breakdown.

---

## 🌐 Cloud Deployment (Vercel & Atlas)

1. **Database**: Create a free MongoDB Atlas cluster and get your connection string (`mongodb+srv://...`).
2. **Backend**: Deploy the `backend/` folder on Render, Railway, or Vercel Serverless Functions. Set `MONGODB_URI` and `CORS_ORIGIN`.
3. **Frontend**: Deploy `frontend/` on Vercel. Set `NEXT_PUBLIC_API_URL` to your live backend API URL.
