# Architecture

Bed Gaming uses a split Electron architecture:

- `src/main`: privileged process services for Windows integrations and orchestration.
- `src/preload`: minimal typed API bridge.
- `src/renderer`: React UI shell with Zustand state.
- `src/shared`: schemas and contracts used by all layers.

## Safety model

- Strict CSP in BrowserWindow responses.
- Renderer cannot execute arbitrary shell commands.
- All IPC input validated with Zod.
- Windows operations routed through bounded service interfaces.
