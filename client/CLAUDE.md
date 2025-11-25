# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 project using the App Router with TypeScript.

### Tech Stack
- **Next.js 16** with App Router (`app/` directory)
- **React 19**
- **TypeScript** (strict mode enabled)
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **ESLint 9** with flat config (`eslint.config.mjs`)

### Path Alias
- `@/*` maps to the project root (configured in `tsconfig.json`)
