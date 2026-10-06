# LearnHub

**LearnHub** is a modern learning platform built with **Next.js, React, TypeScript, Convex, and Clerk**.

The application allows authenticated users to browse courses, study lessons, track their progress, and complete timed multiple-choice quizzes. Lesson completion and quiz results are persisted per user through Convex, so progress remains available after refreshing or returning to the application.

The project was built with a focus on **clean architecture, responsive UX, persistent state, and practical full-stack implementation**.

## Assignment Highlights

- 📚 Course library with search and progress filtering
- 📖 Course detail pages with structured lesson content
- ✅ Lesson completion tracking
- 📊 Per-course and overall progress indicators
- 🧠 Multiple-choice quiz for each course
- ⏱️ Timed quiz experience
- ↔️ Previous and next question navigation
- 📝 Score, correct, and incorrect answer summary
- 🔄 Quiz retry functionality
- 🔐 Clerk authentication
- 💾 Persistent user progress and quiz results with Convex
- 📱 Responsive desktop and mobile layouts
- 🌙 Dark-mode-friendly UI
- ⚡ Loading, empty, and error states

## Project structure

```text
.
├── app/                     # Next.js pages and app router structure
│   ├── (auth)/             # authenticated and unauthenticated route groups
│   ├── courses/            # course listing and course detail pages
│   ├── globals.css         # global styling and design tokens
│   └── layout.tsx          # root app wrapper and auth providers
├── components/             # reusable UI and page-level components
├── convex/                 # Convex schema, auth config, and backend functions
│   ├── schema.ts           # database tables and indexes
│   ├── courses.ts          # course list and lookup queries
│   ├── progress.ts         # lesson and quiz persistence logic
│   ├── courseSeed.ts       # seeded course content
│   └── auth.config.ts      # Convex auth configuration for Clerk JWTs
├── hooks/                  # data access hooks for course and progress features
├── lib/                    # shared app-level utilities and course typing
├── public/                 # static assets
├── package.json            # scripts and dependency manifest
├── next.config.ts          # Next.js config
├── tsconfig.json           # TypeScript config
├── components.json         # component configuration for UI generation
├── .env.local.example      # example environment file (if present in your setup)
└── README.md
```

## Features

### Course library

Users can browse a list of curated courses with metadata such as:

- category
- level
- duration
- instructor
- lesson count
- completion percentage

The dashboard supports filtering by:

- All courses
- In progress
- Completed

and includes a search function for quick discovery.

### Lesson progress tracking

Each lesson can be marked complete or incomplete by an authenticated user. Progress is stored in the Convex database and linked to the user's Clerk identity.

### Quiz results

Each course includes a short quiz. Quiz results are saved and reused to display completion state and score tracking.

### Authentication

The app uses Clerk for sign-in/sign-up flows and secures the progress-saving functions with Convex authentication.

### Design

The UI is intentionally clean and product-focused, with a calm palette, rounded cards, and responsive layout patterns consistent with a modern learning experience.

## Environment setup

Create a `.env.local` file in the project root with the following values:

```bash
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_JWT_ISSUER_DOMAIN=your_clerk_jwt_issuer_domain
```

Notes:

- `NEXT_PUBLIC_CONVEX_URL` is required by the frontend to connect to the Convex backend.
- Clerk keys are used for the sign-in and sign-up experience.
- `CLERK_JWT_ISSUER_DOMAIN` is used in `convex/auth.config.ts` so Convex can validate authenticated users via Clerk JWTs.

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Start the Convex backend in a terminal:

```bash
npx convex dev
```

3. In a second terminal, start the Next.js application:

```bash
npm run dev
```

4. Open the app in your browser:

```text
http://localhost:3000
```

## Data model

The app stores the following main objects in Convex:

- `courses`: course catalog content and lesson metadata
- `lessonProgress`: per-user tracking of completed lessons
- `quizResults`: per-user quiz outcomes by course

The schema is defined in `convex/schema.ts`, and the course content is seeded from `convex/courseSeed.ts`.

## Routing summary

- `/` → learning dashboard / home view
- `/courses` → full course library
- `/courses/[courseId]` → detailed course page with lessons and quiz
- `/sign-in` and `/sign-up` → Clerk authentication pages

## Scripts

```bash
npm run dev      # run the Next.js development server
npm run build    # create a production build
npm run start    # run the production build
npm run lint     # run ESLint checks
```

## Future ideas

This project is a strong starting point for a larger learning platform. Potential extensions include:

- course creation/admin tools
- instructor dashboards
- certificates and badges
- progress analytics
- subscriptions or premium learning paths
- AI-powered learning recommendations

## License

This project is currently set up as an internal prototype and does not include a project-wide license declaration.

---

If you want, this README can also be expanded with a product pitch section, screenshots, or a deployment guide for Vercel + Convex + Clerk.
