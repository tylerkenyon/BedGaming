# Bed Gaming

Bed Gaming is an Electron desktop application that automates TV gaming mode on Windows laptops.

## Stack

- Electron
- TypeScript (strict)
- React + Vite
- Tailwind CSS
- Zustand
- Zod
- Vitest + Playwright
- electron-builder

## Run locally

```bash
npm install
npm run dev
```

## Quality gates

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Packaging

```bash
npm run package
```

## Project structure

- `src/main`: orchestration and system integrations
- `src/preload`: secure bridge
- `src/renderer`: console-style UI
- `src/shared`: contracts and schema validation
- `docs/`: architecture and validation guidance

## Production readiness notes

This repository includes mocked providers for non-Windows environments and a hardware validation checklist for full physical verification.
