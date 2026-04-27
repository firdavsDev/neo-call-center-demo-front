# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # dev server on http://localhost:5173 (HMR)
pnpm build        # tsc && vite build → dist/
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint src (zero warnings allowed)
pnpm fmt          # prettier --write src
pnpm preview      # preview the production build
```

There are no tests. `pnpm typecheck` and `pnpm lint` are the verification tools.

## Architecture

**Stack:** React 19, Vite, TypeScript, Zustand, TanStack Query, axios, react-router-dom v7, Tailwind CSS (for layout utilities), CSS custom properties for all theming.

### Routing & roles

Three protected routes in `src/App.tsx`:
- `/agent` — requires `agent` or `admin` role
- `/supervisor` — requires `supervisor` role
- `/customer/:clientId/call` — public (no auth)

Auth guard lives in `src/components/ProtectedRoute.tsx`. Role is stored in `useAuthStore` (Zustand) and persisted to `localStorage` via `src/lib/auth.ts`.

Demo login credentials (no backend needed):
- `agent@sqb.uz` / `demo`
- `supervisor@sqb.uz` / `demo`

### Call session — dual-hook pattern

`AgentDashboardPage` unconditionally instantiates **both** hooks (Rules of Hooks constraint), then selects the active one based on `useDemoModeStore`:

```
demoEnabled → useScriptedSession  (src/hooks/useScriptedSession.ts)
real mode   → useCallSession      (src/hooks/useCallSession.ts)
```

Both hooks implement the same `CallSessionApi` interface and share `useSessionReducer` for state transitions.

**Real session (`useCallSession`):** attempts WebRTC (offer/answer via `/ws/signaling`, events over DataChannel). Falls back to MediaRecorder chunks posted to `/api/transcribe-chunk` on ICE failure or WebSocket error. The REST fallback prepends the EBML init segment to every subsequent WebM chunk so the backend can decode them.

**Demo session (`useScriptedSession`):** ticks every 100 ms, replays `DEMO_TIMELINE` from `src/data/demoTimeline.ts` (transcript bubbles, suggestions, sentiment shifts, compliance ticks, intake proposal) without any backend.

### Session state machine

`src/hooks/useSessionReducer.ts` defines `SessionState` + `SessionAction`. Key state transitions:
- `CALL_STARTED` → status: `active` (idempotent if already active)
- `SUMMARY_READY` → status: `ended`
- `RESET` → initial state

Transcript capped at 50 entries; suggestions capped at 5 (newest first).

### Global state (Zustand stores)

| Store | File | Persisted |
|---|---|---|
| `useAuthStore` | `src/store/authStore.ts` | localStorage (via `src/lib/auth.ts`) |
| `useThemeStore` | `src/store/themeStore.ts` | localStorage (key: `sqb_theme`) |
| `useDemoModeStore` | `src/store/demoModeStore.ts` | no |

### HTTP client

`src/lib/api.ts` — axios instance with base URL `''` (proxy handles routing). Attaches `Authorization: Bearer` on every request. On 401, attempts a single token refresh via `/api/auth/refresh`; on failure, clears tokens and redirects to `/login`. A shared `refreshPromise` deduplicates parallel 401 retries.

### Styling system

All colours, spacing, shadows, and radius values are CSS custom properties defined in `src/styles/tokens.css`. Light and dark themes are set via `data-theme` on `<html>`. Density variants (`comfortable` / `compact`) are set via `data-density`. Brand blue hue is dynamic — `App.tsx` recalculates a set of `--sqb-blue-*` and `--ai-glow*` CSS variables whenever `blueHue` changes in `useThemeStore`.

Components use inline styles referencing these tokens (e.g. `color: 'var(--text-primary)'`). Do not introduce CSS modules or Tailwind component classes — keep the token-based inline style pattern.

### Backend proxy

`vite.config.ts` proxies `/api` and `/ws` to the backend host. Update the `target` IP when the backend address changes. In production, set `VITE_API_BASE` instead of relying on the proxy.

### Component organisation

```
src/components/
  primitives/   — Button, Badge, Card, Input, Avatar, LiveDot, Logo, MiniWaveform
  call/         — TranscriptBubble, SuggestionCard, IntakeCard, ComplianceChip, CallButton
  queue/        — QueueRail, IncomingCallModal
```

`src/components/primitives/index.ts` re-exports all primitives.
