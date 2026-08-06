# CustHub Customer Dashboard

A customer management dashboard for a bank/fintech relationship manager to register, view, search, and filter business customers. Built with Next.js (App Router), TypeScript, Tailwind CSS, React Hook Form + Zod, and Firebase (client SDK only).

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Firebase Setup](#firebase-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [How It Works](#how-it-works)
- [Data Model](#data-model)


---

## Overview

The app has three pages:

| Route         | Purpose                                                                 |
| ------------- | ------------------------------------------------------------------------ |
| `/`           | Dashboard — summary stat cards (mock data) + a customer table demo      |
| `/customers`  | Customers — live list of all customers pulled from Firestore, with search, filters, and pagination |
| `/register`   | Register Customer — form to add a new business customer to Firestore    |

The dashboard stat cards (`Total Customers`, `Active Customers`, etc.) use static mock numbers to match the original design mockup. The `/customers` page is the one connected to live Firebase data.

## Tech Stack

- **[Next.js](https://nextjs.org/)** (App Router) — React framework, file-based routing
- **[TypeScript](https://www.typescriptlang.org/)** — static typing throughout
- **[Tailwind CSS](https://tailwindcss.com/)** — utility-first styling
- **[React Hook Form](https://react-hook-form.com/)** — form state management
- **[Zod](https://zod.dev/)** — schema validation, wired into the form via `@hookform/resolvers`
- **[Firebase](https://firebase.google.com/)** (client SDK only — no `firebase-admin`) — Firestore for reading/writing customer records
- **[lucide-react](https://lucide.dev/)** — icon set

## Features

- **Register Customer form** (`/register`)
  - Validated with Zod: business name, business type, industry, contact person, Nigerian phone number format, and email
  - On submit, writes a new document to the Firestore `customers` collection with `status: "Pending"` and a server timestamp
  - Shows success/error banners after submission

- **Customers page** (`/customers`)
  - Reads customers **live** from Firestore using `onSnapshot` — any newly registered customer appears automatically, no refresh needed
  - Search by business name, contact person, or email
  - Filter by status, business type, and industry
  - Working pagination — page size selector (5/10/25/50 per page), previous/next, and page-number buttons that actually slice the filtered result set
  - Loading, empty, and error states

- **Dashboard page** (`/`)
  - Stat cards matching the original design mockup (static/mock numbers)
  - Same search/filter/table/pagination UI, backed by mock data (`src/lib/mock-data.ts`) for demonstration

## Project Structure

```
custHub-dashboard/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Dashboard (/)
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Tailwind entry + theme tokens
│   │   ├── customers/
│   │   │   └── page.tsx          # Customers list (/customers) — live Firestore data
│   │   └── register/
│   │       └── page.tsx          # Register Customer form (/register)
│   │
│   ├── components/
│   │   ├── DashboardShell.tsx    # Sidebar + main content wrapper
│   │   ├── Sidebar.tsx           # Left navigation
│   │   ├── Topbar.tsx            # Page title + notifications/user menu
│   │   ├── StatCard.tsx          # KPI summary card
│   │   ├── StatusBadge.tsx       # Active/Pending/Inactive pill
│   │   ├── CustomerFilters.tsx   # Search bar + status/type/industry filters
│   │   ├── CustomerTable.tsx     # Table + Loading/Empty/Error states
│   │   └── Pagination.tsx        # Page-size selector + page controls
│   │
│   ├── hooks/
│   │   └── useCustomers.ts       # Live Firestore listener (onSnapshot) for the customers collection
│   │
│   └── lib/
│       ├── firebase.ts           # Firebase client SDK init (reads env vars)
│       ├── customers.ts          # addCustomer() — writes a new customer to Firestore
│       ├── validation.ts         # Zod schema + form value types
│       ├── types.ts              # Shared TypeScript types (Customer, CustomerStatus, BusinessType)
│       └── mock-data.ts          # Mock customers + stats used on the Dashboard page
│
├── .env.local.example            # Template for required Firebase env vars
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18.18+ (or 20+ recommended)
- npm (or swap in yarn/pnpm — no lockfile-specific tooling is used)
- A Firebase project with Firestore enabled

### Installation

```bash
# 1. Unzip / clone the project, then move into it
cd customer-management-dashboard

# 2. Install dependencies
npm install

# 3. Copy the env template and fill in your Firebase config
cp .env.local.example .env.local

# 4. Start the dev server
npm run dev
```

Visit `http://localhost:3000`.

## Firebase Setup

This project uses the **Firebase client SDK only** — there is no server-side `firebase-admin` code, so it's safe to deploy anywhere that can serve a Next.js app (Vercel, Netlify, etc.) without extra server credentials.

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a project (or use an existing one).
2. Enable **Firestore Database** (Build → Firestore Database → Create database). Start in test mode for local development, or set up rules manually (see below).
3. Register a **Web app** under Project Settings → General → Your apps, and copy the config values into `.env.local`.
4. Set Firestore security rules to allow the app to read/write the `customers` collection. For local development without auth wired up yet, a permissive starting rule looks like:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /customers/{customerId} {
         allow read, create: if true;
       }
     }
   }
   ```

   **This is intentionally open for development.** Before shipping to production, lock this down — for example, restrict `create` to signed-in relationship managers only, and add your own `update`/`delete` rules once those actions exist in the UI.

No Firestore indexes are required beyond the default — the `customers` collection is queried with a single `orderBy("createdAt", "desc")`.

## Environment Variables

All variables are prefixed `NEXT_PUBLIC_` because they're read on the client (this is normal and expected for Firebase client SDK config — it is not a secret key in the traditional sense; access is controlled by Firestore security rules, not by hiding these values).

| Variable                                   | Where to find it                                   |
| ------------------------------------------- | --------------------------------------------------- |
| `NEXT_PUBLIC_FIREBASE_API_KEY`              | Firebase Console → Project Settings → General       |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`          | Same page                                            |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`           | Same page                                            |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`       | Same page                                            |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`  | Same page                                            |
| `NEXT_PUBLIC_FIREBASE_APP_ID`               | Same page                                            |

See `.env.local.example` for the exact keys expected.

## Available Scripts

| Command           | What it does                                  |
| ------------------ | ---------------------------------------------- |
| `npm run dev`       | Start the local dev server (`localhost:3000`) |
| `npm run build`     | Type-check and build a production bundle       |
| `npm run start`     | Serve the production build (run after `build`) |
| `npm run lint`      | Run ESLint                                     |

## How It Works

### Registering a customer

`src/app/register/page.tsx` uses `react-hook-form` with `zodResolver(customerSchema)` (schema in `src/lib/validation.ts`) to validate input before submission. On a valid submit, it calls `addCustomer()` from `src/lib/customers.ts`, which writes a document to the `customers` Firestore collection with:

```ts
{
  ...formData,
  status: "Pending",
  createdAt: serverTimestamp(),
}
```

### Reading customers

`src/hooks/useCustomers.ts` opens a real-time `onSnapshot` listener on the `customers` collection (ordered by `createdAt` descending). It normalizes each document into the `Customer` type, guarding against unexpected `businessType`/`status` values by falling back to safe defaults. The hook returns `{ customers, loading, error }`, which `src/app/customers/page.tsx` consumes directly — so any customer registered via `/register` shows up on `/customers` immediately without a page refresh.

### Filtering, searching, and pagination

Both `/` and `/customers` follow the same pattern:

1. `customers` (from Firestore or mock data) is filtered client-side against the search term and the three dropdown filters using `useMemo`.
2. `totalItems` is the length of the **filtered** array (not the whole collection), so pagination and the "Showing X to Y of Z" label always reflect the current search/filter state.
3. The filtered array is sliced by `(page - 1) * pageSize` to `page * pageSize` before being passed to `CustomerTable` — this is what makes clicking through pages actually change the visible rows.
4. If a filter narrows the result set below the current page number, the page resets to 1 automatically.

## Data Model

```ts
type CustomerStatus = "Active" | "Pending" | "Inactive";
type BusinessType = "Enterprise" | "SME" | "Startup";

interface Customer {
  id: string;
  businessName: string;
  businessType: BusinessType;
  industry: string;
  contactPerson: string;
  phone: string;
  email: string;
  status: CustomerStatus;
  createdAt?: string;
}
```

Customers registered through the form always start with `status: "Pending"`. Firestore doesn't enforce the `BusinessType`/`CustomerStatus` unions at the database level — `useCustomers.ts` validates incoming values against the known list and falls back to a safe default (`"SME"` / `"Pending"`) if a document has an unexpected value.


