<div align="center">

<img src="client/public/logo.svg" alt="CarePath Logo" height="80"/>

# CarePath

**AI-Powered Healthcare Navigation Platform**

*Empowering patients to find the right care, at the right time.*

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue?style=flat-square)](https://opensource.org/licenses/ISC)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Running in Development](#running-in-development)
- [API Reference](#-api-reference)
- [Authentication](#-authentication)
- [AI Engine](#-ai-engine)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Disclaimer](#-disclaimer)

---

## 🩺 Overview

**CarePath** is a full-stack, AI-powered healthcare navigation platform built by **Team XiBit**. It bridges the gap between patients and the right medical specialists by analyzing user-described symptoms using large language models and instantly surfacing nearby clinics, specialists, and emergency services.

CarePath is **not a diagnostic tool** — it is a smart triage assistant designed to reduce healthcare decision fatigue, minimize incorrect specialist visits, and provide users with actionable next steps in plain language.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🤖 **AI Symptom Analysis** | Powered by Llama 3.1 (via Groq) — returns triage urgency, possible conditions, and ideal specialist type |
| 🏥 **Clinic Locator** | Real-time nearby clinic & specialist discovery using location data |
| 🚑 **Ambulance Tracker** | Dedicated emergency page with live ambulance location tracking via Leaflet maps |
| 🔐 **Firebase Authentication** | Google Sign-In & Email/Password auth with session management using access/refresh tokens |
| 🎁 **Guest Free Trial** | First consultation free for unauthenticated users — seamless onboarding with a prompt to sign up |
| 📄 **Results Export** | Export AI analysis results as PDF using `html2pdf.js` |
| 🎨 **Premium UI/UX** | Dark-mode glassmorphism interface with Framer Motion animations, GSAP, and smooth page transitions |
| 📱 **PWA Ready** | Progressive Web App support via `vite-plugin-pwa` — installable on mobile and desktop |
| 🌐 **Responsive Design** | Fully adaptive across mobile, tablet, and desktop viewports |

---

## 🏛 Architecture

CarePath follows a **monorepo structure** with a clean separation between the React SPA (client) and the Express REST API (server).

```
┌─────────────────────────────────────────────────────────┐
│                      USER BROWSER                       │
│                React 19 SPA (Vite + PWA)                │
│   Redux Toolkit ▸ Firebase Auth ▸ Framer Motion / GSAP  │
└────────────────────────┬────────────────────────────────┘
                         │  HTTPS / REST
┌────────────────────────▼────────────────────────────────┐
│                  EXPRESS 5 REST API                      │
│         /api/analyze  /api/clinics  /api/auth            │
│      Firebase Admin SDK ▸ Auth Middleware                │
└────────┬──────────────────────────────┬─────────────────┘
         │                              │
┌────────▼──────────┐      ┌────────────▼────────────────┐
│   GROQ LLM API    │      │        MongoDB Atlas          │
│ (Llama 3.1 8b)    │      │   Users ▸ Sessions ▸ History │
└───────────────────┘      └─────────────────────────────┘
```

### State Management

The frontend uses **Redux Toolkit** with two primary slices:
- `authSlice` — manages Firebase user state, session, and guest consultation count
- `analysisSlice` — manages the active screen (`home` → `loading` → `results`) and AI response data

---

## 🛠 Tech Stack

### Frontend (`/client`)

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Styling | TailwindCSS 4 + DaisyUI 5 |
| State Management | Redux Toolkit + React-Redux |
| Routing | React Router DOM 7 |
| Animations | Framer Motion 12 + GSAP 3 |
| Auth | Firebase 12 |
| Maps | React-Leaflet + Leaflet |
| HTTP Client | Axios |
| Notifications | React Hot Toast |
| PDF Export | html2pdf.js |
| PWA | vite-plugin-pwa |
| Icons | Lucide React |

### Backend (`/server`)

| Layer | Technology |
|---|---|
| Runtime | Node.js (ESM) |
| Framework | Express 5 |
| Database | MongoDB via Mongoose 8 |
| Auth | Firebase Admin SDK |
| AI Provider | Groq SDK (Llama 3.1 8b Instant) |
| Env Management | dotenv |
| Dev Server | nodemon |

---

## 📁 Project Structure

```
Xibit/
├── client/                         # React SPA
│   ├── public/
│   │   └── logo.svg                # Application logo
│   ├── src/
│   │   ├── app/                    # Redux store configuration
│   │   ├── assets/                 # Static assets
│   │   ├── components/
│   │   │   ├── layout/             # Navbar, Footer, Layout wrapper
│   │   │   └── ui/                 # Reusable UI components
│   │   │       ├── EmergencyWidget.jsx
│   │   │       ├── HowItWorks.jsx
│   │   │       ├── Testimonials.jsx
│   │   │       └── ScrollToTop.jsx
│   │   ├── config/
│   │   │   └── firebase.js         # Firebase client SDK init
│   │   ├── data/                   # Static data / mock datasets
│   │   ├── features/
│   │   │   └── auth/authSlice.js   # Auth Redux slice
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── pages/
│   │   │   ├── HomePage.jsx        # Landing + symptom input
│   │   │   ├── LoadingPage.jsx     # AI analysis loading screen
│   │   │   ├── ResultsPage.jsx     # Triage results + clinic map
│   │   │   ├── AmbulancePage.jsx   # Emergency ambulance tracker
│   │   │   ├── AboutPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── services/               # API call utilities (axios)
│   │   ├── utils/                  # Helper functions
│   │   ├── App.jsx                 # Root component + routing logic
│   │   ├── main.jsx                # React DOM entry point
│   │   └── index.css               # Global styles + design tokens
│   ├── vite.config.js
│   └── package.json
│
├── server/                         # Express REST API
│   ├── src/
│   │   ├── config/                 # DB and Firebase Admin config
│   │   ├── controllers/
│   │   │   ├── analysisController.js   # AI symptom analysis logic
│   │   │   └── clinicController.js     # Clinic lookup logic
│   │   ├── data/                   # Static clinic / seed data
│   │   ├── middleware/             # Firebase auth verification middleware
│   │   ├── models/                 # Mongoose schemas
│   │   └── routes/
│   │       ├── analysisRoutes.js
│   │       ├── clinicRoutes.js
│   │       └── authRoutes.js
│   ├── server.js                   # Express app entry point
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure the following are installed on your system:

- **Node.js** ≥ 18.x — [Download](https://nodejs.org/)
- **npm** ≥ 9.x (bundled with Node.js)
- A **MongoDB** instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A **Firebase** project with Authentication enabled
- A **Groq** API key — [Get one free](https://console.groq.com/)

---

### Environment Variables

#### `server/.env`

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/carepath

# Firebase Admin (download from Firebase Console > Project Settings > Service Accounts)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com

# AI Provider
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### `client/.env`

```env
# Firebase Client SDK
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# Backend API
VITE_API_URL=http://localhost:5000
```

> ⚠️ **Never commit `.env` files.** Both `.gitignore` files are pre-configured to exclude them.

---

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/carepath.git
cd carepath

# 2. Install server dependencies
cd server && npm install

# 3. Install client dependencies
cd ../client && npm install
```

---

### Running in Development

Open two terminal sessions:

**Terminal 1 — API Server**
```bash
cd server
npm run dev
# Server starts at http://localhost:5000
```

**Terminal 2 — React Dev Server**
```bash
cd client
npm run dev
# App starts at http://localhost:5173
```

---

## 📡 API Reference

All endpoints are prefixed with `/api`.

### Health Check

```
GET /api/health
```
```json
{ "status": "ok", "name": "CarePath API", "version": "1.0.0" }
```

---

### Symptom Analysis

```
POST /api/analyze
Content-Type: application/json
```

**Request Body**
```json
{
  "symptoms": "I have had a severe headache and blurry vision for 2 days"
}
```

**Success Response** `200 OK`
```json
{
  "possibleConditions": ["Hypertensive crisis", "Migraine with aura", "Optic neuritis"],
  "specialistType": "Neurologist",
  "urgencyLevel": "Urgent",
  "urgencyReason": "Combination of severe headache and visual disturbance warrants prompt evaluation.",
  "searchQuery": "neurologist near me",
  "disclaimer": "This is not a medical diagnosis. Please consult a licensed physician.",
  "inputQuality": "valid"
}
```

**`urgencyLevel` values:** `Emergency` | `Urgent` | `Routine`

---

### Clinics

```
GET /api/clinics
```
Returns a list of nearby clinics filtered by specialist type and location.

---

### Authentication Routes

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user, sync to MongoDB |
| `POST` | `/api/auth/login` | Verify Firebase ID token, return session |
| `GET` | `/api/auth/me` | Get authenticated user profile (requires Bearer token) |

---

## 🔐 Authentication

CarePath uses **Firebase Authentication** with two sign-in methods:

1. **Google OAuth** — One-click sign-in
2. **Email / Password** — Standard registration and login

### Flow

```
Client                      Firebase                  CarePath Server
  │                             │                           │
  │──── signInWithGoogle ───────▶│                           │
  │◀─── Firebase ID Token ──────│                           │
  │                             │                           │
  │──── POST /api/auth/login (ID Token in Authorization header) ──▶│
  │                             │◀── verifyIdToken() ───────│
  │                             │─── token valid ──────────▶│
  │◀──────────────── 200 OK (user profile) ────────────────│
```

### Guest Trial

Unauthenticated users receive **one free symptom analysis**. After the first consultation, they are prompted to sign up to continue. This is tracked client-side via `guestConsultations` in the Redux auth slice.

### Route Protection

Backend routes requiring authentication use the `verifyFirebaseToken` middleware, which validates the Bearer token against Firebase Admin SDK before forwarding the request to the controller.

---

## 🤖 AI Engine

The core intelligence of CarePath is the **Symptom Analysis Engine** built around the **Groq Inference API** with the `llama-3.1-8b-instant` model.

### Design Decisions

| Decision | Rationale |
|---|---|
| **Groq + Llama 3.1** | Near-instant inference (<1s) — critical for medical UX where response time affects trust |
| **`temperature: 0.3`** | Low temperature ensures consistent, conservative triage — not creative |
| **`json_object` response format** | Forces structured JSON output, eliminates prompt engineering for parsing |
| **In-memory LRU cache (5 min TTL)** | Identical symptom strings are cached server-side to reduce API spend and latency |
| **2-attempt retry with backoff** | Gracefully handles Groq rate-limiting (429) and transient errors (503) |
| **Field validation** | All six required fields validated before caching — protects downstream UI from crashes |

### Safety Rules Enforced via System Prompt

- Never provides a definitive diagnosis — only suggests specialist types
- Always flags chest pain, breathing difficulty, loss of consciousness as **Emergency**
- Rejects vague or gibberish input with clear user-facing error messages
- Includes a safety disclaimer in every successful response

---

## 🚢 Deployment

### Client — Vercel

The client is configured for Vercel deployment via `client/vercel.json`. All routes are redirected to `index.html` for SPA support.

```bash
cd client
npm run build        # Generates /dist
# Deploy /dist to Vercel, Netlify, or any static host
```

### Server — Any Node.js Host (Railway, Render, Fly.io)

```bash
cd server
npm start            # node server.js
```

Set all production environment variables in your hosting platform's dashboard. **Do not commit `.env` files.**

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m 'feat: add your feature'`
4. **Push** to your fork: `git push origin feature/your-feature-name`
5. **Open** a Pull Request against `main`

### Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use for |
|---|---|
| `feat:` | New features |
| `fix:` | Bug fixes |
| `docs:` | Documentation changes |
| `refactor:` | Code refactoring |
| `chore:` | Build / tooling changes |

---

## ⚖️ Disclaimer

> **CarePath is a triage assistance tool, not a medical device.**
>
> The AI analysis provided by CarePath is for **informational and navigational purposes only**. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
>
> In case of a medical emergency, call your local emergency number (e.g., **112** in India) immediately.

---

<div align="center">

Built with ❤️ by **Team XiBit**

</div>
