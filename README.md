# React Advanced Patterns & Performance (2026)

An **advanced React learning project** focused on concurrency, composition patterns, and resilience primitives used in real-world apps.

## Table of Contents

1. [Project Goals](#project-goals)
2. [Features Implemented](#features-implemented)
   - [Concurrent Features: useTransition + useDeferredValue](#concurrent-features-usetransition--usedeferredvalue)
   - [Compound Components + Render Props](#compound-components--render-props)
   - [Error Boundaries + Suspense Boundaries](#error-boundaries--suspense-boundaries)
3. [Architecture](#architecture)
4. [Run the Project](#run-the-project)
5. [Why This Project Is Useful](#why-this-project-is-useful)

## Project Goals

Build an “amazing” React 2026 practice app that demonstrates:

- **Responsive UX under heavy rendering.**
- **Expert-level reusable component design.**
- **Graceful failure and loading isolation.**

## Features Implemented

### Concurrent Features: useTransition + useDeferredValue

`ConcurrentSearch` includes a 2200-item searchable inventory.

- `useTransition` marks list-update work as non-urgent so typing stays immediate.
- `useDeferredValue` defers the query passed to the heavy results component to avoid blocking rapid input.
- `React.memo` + `useMemo` are used in the heavy list to reduce unnecessary work.

### Compound Components + Render Props

`PatternStudio` combines two advanced composition techniques:

- **Compound components (`Tabs.Root`, `Tabs.List`, `Tabs.Trigger`, `Tabs.Content`)**
  - Shared state is provided via React Context.
  - Consumers can compose tab layout declaratively with minimal prop drilling.

- **Render props (`DataFetcher`)**
  - Data-fetching logic is encapsulated.
  - UI rendering is delegated to a function child for full flexibility.

### Error Boundaries + Suspense Boundaries

`ResiliencePlayground` demonstrates resilient UI isolation:

- **Error Boundary** catches rendering crashes in a widget and shows a recoverable fallback.
- **Suspense Boundary** wraps a lazily loaded card and displays a loading fallback while code resolves.
- Boundaries are **localized** so one failing/loading widget does not block the entire app.

## Architecture

```txt
src/
  components/
    DataFetcher.tsx      # Render props
    ErrorBoundary.tsx    # Declarative error handling
    Tabs.tsx             # Compound component system
  features/
    ConcurrentSearch.tsx # useTransition + useDeferredValue + memoization
    PatternStudio.tsx    # Compound + render props integration
    ResiliencePlayground.tsx
    SuspenseCard.tsx
  utils/
    mockApi.ts           # Simulated async data source
  App.tsx                # Main page + visible in-app TOC
```

## Run the Project

```bash
npm install
npm run dev
```

Then open the Vite URL (usually `http://localhost:5173`).

## Why This Project Is Useful

This project mirrors common enterprise React challenges:

- Large list filtering and expensive renders.
- Design-system style component composition.
- Isolated failure/loading behavior for stable UX.

It is intentionally structured as a **hands-on advanced pattern playground** so you can extend each section with your own experiments.
