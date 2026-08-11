import type { AudioConfig, DiagnosticResult, DisplayConfig } from '../../../shared/types/index.js';
import { runPowerShell } from './powershell.js';

export interface WindowsProvider {
  detectTv(): Promise<boolean>;
  detectController(): Promise<boolean>;
  detectPlaynite(): Promise<boolean>;
  getDisplayConfig(): Promise<DisplayConfig>;
  setDisplayConfig(config: DisplayConfig): Promise<void>;
  getAudioConfig(): Promise<AudioConfig>;
  setAudioConfig(config: AudioConfig): Promise<void>;
  launchPlaynite(path: string): Promise<void>;
  runDiagnostics(): Promise<DiagnosticResult[]>;
}

class MockWindowsProvider implements WindowsProvider {
  private display: DisplayConfig = {
    primaryDisplayId: 'DISPLAY1',
    resolution: '1920x1080',
    refreshRate: 60,
    laptopDisplayEnabled: false,
  };

  private audio: AudioConfig = { endpointId: 'TV_SPEAKERS' };

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
    return [
      {
        id: 'mock-environment',
        status: 'warning',
        title: 'Mock validation mode',
        message: 'Hardware checks are running against a mocked provider in this environment.',
        remediation: ['Run hardware validation checklist on a Windows gaming laptop and TV setup.'],
        repairAvailable: false,
      },
    ];
  }
}

class NativeWindowsProvider extends MockWindowsProvider {
  async detectTv(): Promise<boolean> {
    const output = await runPowerShell("Get-CimInstance -ClassName Win32_DesktopMonitor | Select-Object -ExpandProperty Name");
    return output.toLowerCase().includes('tv');
  }

  async detectController(): Promise<boolean> {
    const output = await runPowerShell("Get-PnpDevice -Class HIDClass | Select-Object -ExpandProperty FriendlyName");
    return /dualsense|wireless controller/i.test(output);
  }

  async detectPlaynite(): Promise<boolean> {
    const output = await runPowerShell(
      "Test-Path \\\"$env:LOCALAPPDATA\\\\Playnite\\\\Playnite.DesktopApp.exe\\\"",
    );
    return output.trim().toLowerCase() === 'true';
  }

  async launchPlaynite(path: string): Promise<void> {
    await runPowerShell(`Start-Process -FilePath '${path.replace(/'/g, "''")}'`);
  }
}

let provider: WindowsProvider | null = null;

export function getWindowsProvider(): WindowsProvider {
  if (provider) {
    return provider;
  }
  provider = process.platform === 'win32' ? new NativeWindowsProvider() : new MockWindowsProvider();
  return provider;
}
