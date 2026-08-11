import { describe, expect, it } from 'vitest';
import { DiagnosticsService } from '../../main/services/diagnostics/diagnosticsService.js';
import type { WindowsProvider } from '../../main/services/windows/provider.js';

const provider: WindowsProvider = {
  detectTv: async () => true,
  detectController: async () => true,
  detectPlaynite: async () => true,
  getDisplayConfig: async () => ({
    primaryDisplayId: 'DISPLAY1',
    resolution: '1920x1080',
    refreshRate: 60,
    laptopDisplayEnabled: false,
  }),
  setDisplayConfig: async () => undefined,
  getAudioConfig: async () => ({ endpointId: 'TV' }),
  setAudioConfig: async () => undefined,
  launchPlaynite: async () => undefined,
  runDiagnostics: async () => [
    {
      id: 'provider-check',
      status: 'ok',
      title: 'Provider',
      message: 'Ready',
      repairAvailable: false,
    },
  ],
};

describe('DiagnosticsService', () => {
  it('returns base and provider diagnostics', async () => {
    const service = new DiagnosticsService(provider);
    const result = await service.run();
    expect(result.length).toBeGreaterThan(1);
  });
});
