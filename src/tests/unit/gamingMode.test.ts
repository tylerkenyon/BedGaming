import { describe, expect, it } from 'vitest';
import type { AudioConfig, DiagnosticResult, DisplayConfig, Profile } from '../../shared/types/index.js';
import { GamingModeService } from '../../main/services/gaming-mode/stateMachine.js';
import type { WindowsProvider } from '../../main/services/windows/provider.js';

class TestProvider implements WindowsProvider {
  display: DisplayConfig = {
    primaryDisplayId: 'DISPLAY0',
    resolution: '1280x720',
    refreshRate: 60,
    laptopDisplayEnabled: true,
  };

  audio: AudioConfig = { endpointId: 'HEADSET' };

  async detectTv(): Promise<boolean> {
    return true;
  }
  async detectController(): Promise<boolean> {
    return true;
  }
  async detectPlaynite(): Promise<boolean> {
    return true;
  }
  async getDisplayConfig(): Promise<DisplayConfig> {
    return this.display;
  }
  async setDisplayConfig(config: DisplayConfig): Promise<void> {
    this.display = config;
  }
  async getAudioConfig(): Promise<AudioConfig> {
    return this.audio;
  }
  async setAudioConfig(config: AudioConfig): Promise<void> {
    this.audio = config;
  }
  async launchPlaynite(_path: string): Promise<void> {
    return;
  }
  async runDiagnostics(): Promise<DiagnosticResult[]> {
    return [];
  }
}

const profile: Profile = {
  id: 'profile-1',
  name: 'TV',
  version: 1,
  display: {
    primaryDisplayId: 'DISPLAY1',
    resolution: '1920x1080',
    refreshRate: 60,
    laptopDisplayEnabled: false,
  },
  audio: { endpointId: 'TV' },
  playnitePath: '/mock/playnite.exe',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('GamingModeService', () => {
  it('enters and exits gaming mode', async () => {
    const provider = new TestProvider();
    const service = new GamingModeService(provider);

    await service.enter(profile);
    expect(service.getStatus().state).toBe('GAMING');

    await service.exit();
    expect(service.getStatus().state).toBe('NORMAL');
    expect(provider.audio.endpointId).toBe('HEADSET');
  });
});
