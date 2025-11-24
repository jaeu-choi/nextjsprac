# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

Monorepo with two directories:
- `client/` - Next.js 16 frontend application
- `backend/` - NestJS API server with MongoDB

## Commands

### Client (Next.js)
```bash
cd client
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

### Backend (NestJS)
```bash
cd backend
npm run start:dev   # Start dev server with hot reload (http://localhost:4000)
npm run build       # Production build
npm run start:prod  # Start production server
```

## Architecture

### Client
- **Next.js 16** with App Router (`client/app/`)
- **React 19**, **TypeScript**, **Tailwind CSS v4**
- Path alias: `@/*` → project root

### Backend
- **NestJS** with **MongoDB** (Mongoose)
- Global prefix: `/api`
- CORS enabled for `localhost:3000`

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | List courses (supports `level`, `isFree`, `tag`, `page`, `limit`) |
| GET | `/api/courses/:id` | Get course by id |
| POST | `/api/courses` | Create course |
| PATCH | `/api/courses/:id` | Update course |
| DELETE | `/api/courses/:id` | Delete course |
| POST | `/api/seed/reseed` | Reset database with dataset.json |

### Data Model
Course schema with embedded `instructor` and `sections` - see `dataset.json` for structure.

## Environment Setup

1. Copy `backend/.env.example` to `backend/.env`
2. Set `MONGODB_URI` with your MongoDB Atlas connection string
