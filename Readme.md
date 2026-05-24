# Portfolio

This repository contains multiple frontend projects inside the `Portfolio` folder.

## Projects

- `exotic-nature`
  - Main portfolio site built with Vite, React, and TanStack React Start.
  - Uses modern React tooling and Cloudflare/Vite integration.
- `stride-project`
  - Secondary project with a similar Vite + React setup.

## Setup

Each project manages its own dependencies and scripts.

### Run `exotic-nature`

```powershell
cd exotic-nature
bun install
bun run dev
```

### Run `stride-project`

```powershell
cd stride-project
bun install
bun run dev
```

## Notes

- This root folder is a portfolio workspace container, not a single app.
- The `exotic-nature` folder is now tracked as a normal subfolder inside this repo.
- Ignore files like `.workspace/` and `node_modules/` are handled by the repository configuration.
