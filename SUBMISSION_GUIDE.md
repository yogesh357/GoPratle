# GoPratle Assignment — 5 to 7 Minute Video Demo Script & Guide

Use this script as a guide when recording your 5–7 minute video submission for the technical assignment.

---

## 🎯 Recording Objectives
Demonstrate:
1. **The 4-Step Dynamic Form Flow** (with field adaptation across Planner, Performer, and Crew).
2. **Real-Time API Requests & Responses** in Browser DevTools (Network tab).
3. **Data Verification in MongoDB** (Mongo Shell, MongoDB Compass, or API fetch).

---

## ⏱️ Video Demo Timeline & Script Breakdown

### 1. Introduction & Overview (0:00 – 0:45)
- **What to show**: Homepage (`http://localhost:3000`).
- **Talking points**:
  - *"Hello! This is my submission for the GoPratle Full-Stack Developer Intern technical assignment."*
  - *"I've built an end-to-end Requirement Posting Flow using Next.js 15 App Router with Tailwind CSS on the frontend, Node.js + Express with TypeScript and Zod validation on the backend, and MongoDB as the database."*
  - Point out the clean UI, the live MongoDB stats counter, and the navigation bar showing the live API connection status indicator.

---

### 2. Category 1: Event Planner Flow (0:45 – 2:00)
- **Action**: Click **Post Requirement** (`/post-requirement`).
- **Step 1 (Event Basics)**:
  - Enter Event Name: *"Royal Heritage Wedding & Sangeet"*.
  - Select Type: *Wedding & Reception*.
  - Choose Schedule: Multi-day date range.
  - Set Location: *Jaipur, Rajasthan*.
  - Click on the **Event Planner** card.
  - Show the Step Indicator advancing to Step 2.
- **Step 2 (Scope & Specs)**:
  - Highlight how the fields dynamically adapt to Planner requirements: Planning model (*Full Planning*), Expected Guest Count (*450*), Budget (*$30k-$60k*), and Deliverable chips (*Decor, Catering, Venue, RSVP*).
- **Step 3 (Logistics & Milestones)**:
  - Show Venue Status (*Booked*), Theme (*Royal Rajputana*), and Milestone Date.
- **Step 4 (Review & Contact)**:
  - Show the interactive summary card displaying all previous steps.
  - Fill organizer contact info (*Meera Singhania, meera@singhania.com, phone*).
  - Toggle **Urgent Requirement** flag.
  - Open Browser DevTools (`F12` -> Network tab).
  - Click **Submit & Publish Requirement**.
  - Show the `POST /api/requirements` request returning `201 Created` with the JSON payload.
  - Show the **Success Modal** displaying the MongoDB Document ID and confetti celebration.

---

### 3. Category 2: Performer / Talent Flow (2:00 – 3:15)
- **Action**: Click "Post Another" or use the top preset button **🎧 Performer**.
- **Step 1**:
  - Show Event Name (*"Sunwaves Electronic Indie Fest"*), single date, location (*Goa*), and **Performer / Talent** category selected.
- **Step 2**:
  - Point out the dynamic Performer fields: Performer type (*DJ / Musician*), Duration in minutes (*120 mins*), Sets (*2 sets*), Languages (*English, Hindi*), Genre (*Deep House*).
- **Step 3**:
  - Show the stage and audio rider fields: PA Sound system toggle, Backline instruments checklist (*Pioneer CDJ, IEMs*), Stage dimensions (*32ft x 20ft*), and Green Room toggle.
- **Step 4**:
  - Submit the form and verify instant 201 Created response.

---

### 4. Category 3: Event Crew & Staffing Flow (3:15 – 4:30)
- **Action**: Click "Post Another" or click **🛠️ Crew** preset.
- **Step 1**:
  - Show Event Name (*"Global AI Summit & Developer Expo"*), **Event Crew & Staff** category selected.
- **Step 2**:
  - Point out the dynamic Crew table: Add/remove roles (*Audio Engineer x4 Lead, Lighting Tech x4, Camera Crew x6, Stagehands x8, Ushers x12* -> Total 34 staff), Shift call time (*06:30 AM*) and Wrap time (*09:30 PM*).
- **Step 3**:
  - Show Gear Provision (*Provided on Site*), Uniform Dress Code (*All Black*), Physical requirements (*Heavy lifting*), and Meals/Transport toggles.
- **Step 4**:
  - Submit the requirement and verify MongoDB storage.

---

### 5. Requirements Explorer Feed & Search (4:30 – 5:30)
- **Action**: Navigate to **Browse Feed** (`http://localhost:3000/requirements`).
- **Showcase**:
  - Category filter tabs (**All**, **Planners**, **Performers**, **Crew & Staff**).
  - Real-time search bar (search by event name or city).
  - Click **View Full Specifications** on any card to open the detail modal displaying the entire nested document breakdown.
  - Demonstrate that all data is retrieved dynamically via `GET /api/requirements`.

---

### 6. MongoDB Verification & Technical Recap (5:30 – 6:30)
- **Action**: Open terminal or MongoDB Compass:
  - Run:
    ```bash
    mongosh
    use gopratle_db
    db.requirements.find().pretty()
    ```
  - Show the stored documents with `category`, `plannerDetails`, `performerDetails`, and `crewDetails` fields properly typed and stored.
- **Highlight Backend Architecture**:
  - TypeScript types, Zod validation middleware rejecting invalid payloads, CORS setup, structured REST controllers, and error handling.

---

### 7. Wrap-up (6:30 – 7:00)
- Mention GitHub repository link and deployed frontend URL.
- Thank the GoPratle team!
