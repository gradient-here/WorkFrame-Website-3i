# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
```bash
# Install dependencies (using pnpm)
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

### Alternative Package Managers
This project uses pnpm (confirmed by pnpm-lock.yaml), but npm/yarn work too:
```bash
# Using npm
npm install && npm run dev

# Using yarn  
yarn install && yarn dev
```

### Testing & Quality
Currently no test framework is configured. Consider adding Vitest or Jest for component testing.

## Architecture Overview

### Project Structure
This is a **Next.js 15 App Router** project with TypeScript, built as a marketing website for WorkFrame - a productivity platform for knowledge workers. The project uses modern React patterns with server and client components.

### Key Architectural Decisions

**Frontend Stack:**
- **Next.js 15** with App Router (RSC-enabled)
- **TypeScript** with strict configuration (ES6 target)
- **Tailwind CSS v4** with PostCSS integration
- **shadcn/ui** component library (New York variant)
- **Framer Motion** for animations
- **Lucide React** for icons

**Backend & Services:**
- **Firebase Auth** for user authentication 
- **PostHog** for analytics with proxy routing (`/ingest/*`)
- **Discord webhooks** for contact form submissions and engagement tracking
- **Stripe** integration available (configured in dependencies)

**Design System:**
- CSS custom properties with neutral base colors
- Component aliases: `@/components`, `@/lib`, `@/hooks`, `@/ui`
- shadcn/ui configured with CSS variables and RSC support

### Component Architecture

**App Router Structure:**
- Main marketing page: `app/page.tsx`
- Product pages: `app/products/[tool]/page.tsx` (chat, zettelkasten, quickread, etc.)
- Account section: `app/account/` (settings, notes, with layout)
- Course pages: `app/courses/` 
- Legal pages: `app/privacy/`, `app/terms/`, `app/cookies/`
- API routes: `app/api/` (contact, discord-webhook, stripe, newsletter)

**Component Architecture:**
- `components/ui/` - shadcn/ui base components
- `components/` - Business components (site-header, site-footer, tool-card, course-card)
- `hooks/` - Custom hooks (useFirebaseAuth, use-toast)
- `lib/` - Utilities (firebase, posthog, utils)

**State Management:**
- Firebase Auth via `useFirebaseAuth` hook
- PostHog analytics via provider pattern
- Form state managed with react-hook-form + zod validation

### Configuration Files

**Next.js Configuration (`next.config.mjs`):**
- ESLint and TypeScript build errors ignored 
- Image optimization disabled (`unoptimized: true`)
- PostHog proxy rewrites for `/ingest/*` endpoints
- Trailing slash redirects disabled for PostHog compatibility

**Build Configuration:**
- `components.json` - shadcn/ui (New York style, RSC enabled)
- `tsconfig.json` - Strict TypeScript, ES6 target, path aliases
- `postcss.config.mjs` - Tailwind CSS v4 with PostCSS plugin

### Environment Variables Required

```bash
# Firebase Auth (required - validation in lib/firebase.ts)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_MEASUREMENT_ID=

# PostHog Analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# Discord Webhooks (for contact form)
DISCORD_WEBHOOK_URL=

# Optional: Stripe (configured in dependencies)
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```

## Development Guidelines

### File Organization
- Use the established alias patterns (`@/components`, `@/lib`, `@/hooks`)
- Keep page-specific components in the same directory as pages when possible
- UI components follow shadcn/ui patterns and naming conventions

### Styling Approach
- Use Tailwind classes with the established design system
- Custom properties are defined in `app/globals.css`
- Components use `cn()` utility from `lib/utils.ts` for conditional classes
- Maintain the established color scheme using CSS custom properties

### Component Development
- Follow the established TypeScript prop interface patterns
- Use Lucide React for consistent iconography
- Maintain responsive design patterns (mobile-first with md: breakpoints)
- Client components marked with "use client" directive when needed

### Analytics & Integrations
- **PostHog**: Configured with proxy routing, automatic page view tracking
- **Discord Webhooks**: Contact form submissions routed to Discord
- **Firebase Auth**: Full configuration with validation, minimal UI implementation
- **Stripe**: Dependencies configured but implementation not complete


## Important Notes

### v0.dev Integration
This project was generated using v0.dev and maintains automatic synchronization:
- Changes deployed from v0.dev are automatically pushed to this repository  
- Continue development at: https://v0.dev/chat/projects/P89IHjgIY4w
- Vercel deployment: https://vercel.com/gradientheres-projects/v0-workframe-website-design

### Development Considerations
- No test framework configured (consider Vitest for component testing)
- Build errors ignored in next.config.mjs for rapid prototyping
- Firebase config has validation but hardcoded fallback values in comments
- Form validation infrastructure ready (react-hook-form + zod)
- Stripe integration prepared but not implemented
