# Control Desk

UI-001's local, synthetic operator interface. Built with Next.js App Router, React, tRPC, TanStack Query and Tailwind, using the existing Factory Core routers.

## Run locally

Use Node.js 22.13+ (Node 24 LTS recommended) and pnpm 10.14+. From the repository root:

```powershell
pnpm --dir packages/core install --frozen-lockfile --ignore-scripts
pnpm --dir packages/control-desk install --frozen-lockfile --ignore-scripts
pnpm --dir packages/control-desk dev
```

Open [the local desk](http://127.0.0.1:3000). Both dev and production scripts bind to loopback by default. No environment variables, credentials or database are required. The app imports Core source directly; install both packages.

For a production build running locally:

```powershell
pnpm --dir packages/control-desk build
pnpm --dir packages/control-desk start
```

## Verify

```powershell
pnpm --dir packages/control-desk typecheck
pnpm --dir packages/control-desk test
pnpm --dir packages/control-desk build
pnpm --dir packages/control-desk test:browser
pwsh -File scripts/validate-factory.ps1
```

Browser checks require installed Google Chrome. Playwright starts and stops its own production server at port 3100. They cover the decision flow, filters, evidence detail, keyboard skip link, loading/failure/retry and automated WCAG A/AA scans on all eleven views at 1440px and 390px. Preview screenshots are written to the repository's ignored `.cache/` directory. Automated scans do not replace a human accessibility review.

## Demo boundary

- All records are bundled synthetic fixtures. No work/client folders are read.
- Each browser session gets isolated in-memory Core stores through an HttpOnly, SameSite=Strict cookie. Sessions expire after one hour; a server restart resets them. Multiple tabs in one browser session share state.
- The tRPC HTTP endpoint allowlists Core read procedures, the desk snapshot and one bounded demo decision procedure. General Core writes are unavailable. Decisions validate the exact synthetic ID/version and require same-origin requests.
- Approve/reject records only a simulated decision and a session audit event. It never executes an adapter, grants real authorization or returns an execution receipt.
- Live remains unavailable until separately implemented authentication/authorization, durable persistence and approved adapters are verified. This is a local demo, not a deployable Live control plane.
- ETA is unavailable because the demo has no historical duration sample. Progress derives from task and phase records.

See the [task contract](../../plans/dashboard/UI-001-control-desk.md) and [validation record](../../docs/06-control-desk/UI-001-validation.md).

Implementation references: [Next.js Route Handlers](https://nextjs.org/docs/app/getting-started/route-handlers) and [tRPC App Router setup](https://trpc.io/docs/client/nextjs/app-router-setup).
