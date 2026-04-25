# devops-project

Minimal full-stack monorepo prepared for later Docker/Kubernetes work.

## Stack

- Backend: NestJS (TypeScript)
- Frontend: Next.js (App Router)
- Package manager: npm workspaces

## Project Structure

- `backend/` - NestJS REST API
- `frontend/` - Next.js frontend app

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create frontend env file:
   ```bash
   cp frontend/.env.example frontend/.env.local
   ```
3. Run both apps:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev:backend` - run backend on `http://localhost:3001`
- `npm run dev:frontend` - run frontend on `http://localhost:3000`
- `npm run dev` - run both apps concurrently

## Backend API

Base URL: `http://localhost:3001`

- `POST /auth/register`
- `POST /auth/login`
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

## Notes

- Data is stored in-memory (no database).
- DTO validation is enabled globally.
- CORS is enabled for frontend-backend communication.
# tasks-app
