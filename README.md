# React Base Admin (Vite + React + TypeScript)

Starter project for an admin dashboard with authentication, role/permission-based access control, reusable CRUD flow, and modular feature structure.

## Tech Stack

- React 19 + TypeScript
- Vite 7 + SWC
- Ant Design 6
- Tailwind CSS 4
- React Query (TanStack Query)
- React Router
- Axios + refresh-token interceptor
- Zustand (persisted auth state)
- CASL (`@casl/ability`) for permissions/abilities

## Main Features

- Auth flow (`/auth/login`)
- Protected admin layout with sidebar/header/breadcrumb
- Ability-driven menu and access control
- Generic Axios query hooks for GET/POST/PATCH/DELETE
- Modular auth resources:
  - Users (index/create/edit)
  - Roles (index/create/edit/detail)
- Global error boundary + route-level lazy loading

## Project Structure

Key folders:

- `src/Layouts` → `AdminLayout`, `AuthLayout`
- `src/lib/Axios` → endpoint configs by domain
- `src/lib/Hooks/Query` → reusable query/mutation hooks
- `src/lib/Interceptors` → auth/refresh token interceptor
- `src/lib/Routes` → route composition per module
- `src/lib/Stores` → Zustand auth store
- `src/lib/Utils/Abilities` → CASL ability generator
- `src/Views` → page-level UI (Dashboard, Auth, Users, Roles)

## Environment Variables

Create `.env` in project root:

```env
VITE_API_URL=http://127.0.0.1:8000
VITE_APP_NAME=React Base Admin
```

Used by app:

- `VITE_API_URL` → Axios base URL + refresh endpoint
- `VITE_APP_NAME` → app title in sidebar

## Run Locally

1. Install dependencies
   - `npm install`
2. Start development server
   - `npm run dev`
3. App runs on:
   - `http://127.0.0.1:5175`

## Available Scripts

- `npm run dev` → run Vite dev server
- `npm run build` → type-check + production build
- `npm run preview` → preview production build
- `npm run lint` → run ESLint

## Routing Overview

- Public auth:
  - `/auth/login`
- Protected admin:
  - `/` (dashboard)
  - `/users`
  - `/users/create`
  - `/users/:id/edit`
  - `/roles`
  - `/roles/create`
  - `/roles/:id/edit`
  - `/roles/:id`

## Auth & Permission Flow (Summary)

1. Login stores user in Zustand (`auth-store` in localStorage).
2. Permissions from user role are mapped to CASL abilities.
3. Abilities are provided through context and consumed in layout/menu.
4. Axios interceptor handles `401` and triggers token refresh.

## Notes

- Locale/timezone defaults are Indonesian (`id`, `Asia/Jakarta`).
- Ant Design primary color is customized in app bootstrap.
- The codebase is prepared as a reusable internal base for future admin modules.
