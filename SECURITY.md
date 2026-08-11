# Security Policy

Bed Gaming does not enable telemetry by default and uses strict Electron security defaults.

## Reporting a vulnerability

Open a private security advisory in GitHub with:

- Reproduction steps
- Affected version
- Suggested remediation

## Security controls

- `contextIsolation: true`
- `nodeIntegration: false`
- Renderer has no direct shell access
- IPC payloads are validated with Zod
