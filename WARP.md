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

### Testing & Quality
Currently no test framework is configured. Consider adding Vitest or Jest for component testing.

## Architecture Overview

### Project Structure
This is a **Next.js 15 App Router** project with TypeScript, built as a marketing website for WorkFrame - a productivity platform for knowledge workers. The project uses modern React patterns with server and client components.

### Key Architectural Decisions

**Frontend Stack:**
- **Next.js 15** with App Router (RSC-enabled)
- **TypeScript** with strict configuration
- **Tailwind CSS v4** with custom design system
- **shadcn/ui** component library (New York variant)
- **Framer Motion** for animations
- **Lucide React** for icons

**Authentication & Analytics:**
- **Firebase Auth** for user authentication (configured but minimal implementation)
- **PostHog** for analytics with custom ingest endpoints (`/ingest/*`)
- Analytics events tracked via Discord webhooks for product engagement

**Design System:**
- Custom CSS variables using OKLCH color space
- Outfit font family from Google Fonts
- Neutral base color with comprehensive theme support
- Component aliases configured for clean imports (`@/components`, `@/lib`, etc.)

### Component Architecture

**Layout Structure:**
- Root layout includes PostHog provider, site header, and footer
- Persistent header with sticky positioning and backdrop blur
- Mobile-responsive navigation with Sheet component

**Page Components:**
- `app/page.tsx` - Main marketing page with hero, features, tools overview, courses, and testimonials
- Client-side interactivity for engagement tracking

**Reusable Components:**
- `components/ui/` - shadcn/ui base components
- `components/` - Custom business components (ToolCard, CourseCard, Testimonial, etc.)
- Consistent prop interfaces with TypeScript

**State Management:**
- `hooks/useFirebaseAuth.ts` - Authentication state management
- React Context via PostHog provider for analytics
- Local state for UI interactions

### Configuration Files

**Next.js Configuration:**
- ESLint and TypeScript build errors ignored (typical for rapid prototyping)
- Image optimization disabled
- PostHog proxy rewrites configured for `/ingest/*` endpoints
- Trailing slash redirects disabled for PostHog compatibility

**Styling Configuration:**
- `components.json` - shadcn/ui configuration with New York style
- `app/globals.css` - CSS custom properties for design system
- Uses CSS `@theme inline` for Tailwind integration

### Environment Variables Required

Based on the code, ensure these environment variables are configured:

```bash
# Firebase Auth
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
NEXT_PUBLIC_NODE_ENV=
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

### Analytics Integration
- PostHog automatically tracks page views and user interactions
- Custom events can be tracked via the PostHog client
- Discord webhook integration exists for specific product engagement events

### Authentication Flow
- Firebase Auth is configured but minimally implemented
- `useFirebaseAuth` hook provides auth state and methods
- Auth state is managed at the layout level but not deeply integrated

## Special Notes

### v0.dev Integration
This project was generated using v0.dev and maintains synchronization with deployed chats. The README indicates that changes are automatically pushed from v0.dev to this repository.

### Deployment
- Project is configured for Vercel deployment
- PostHog analytics routing configured for production environment
- Build configuration optimized for static site generation where possible

### Missing Implementations
- Test framework not configured
- Error boundaries not implemented
- Loading states minimal
- Form validation using react-hook-form and zod is available but not extensively used
- Stripe integration present in dependencies but not implemented