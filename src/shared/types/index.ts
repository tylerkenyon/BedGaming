export type HealthStatus = 'ok' | 'warning' | 'error';

export interface DiagnosticResult {
  id: string;
  status: HealthStatus;
  title: string;
  message: string;
  remediation?: string[];
  repairAvailable: boolean;
}

export type GamingModeState =
  | 'NORMAL'
  | 'PREPARING'
  | 'DISPLAY_READY'
  | 'AUDIO_READY'
  | 'CONTROLLER_READY'
  | 'LAUNCHER_READY'
  | 'GAMING'
  | 'EXITING'
  | 'RESTORING'
  | 'FAILED'
  | 'ROLLBACK';

export interface DisplayConfig {
  primaryDisplayId: string;
  resolution: string;
  refreshRate: number;
  laptopDisplayEnabled: boolean;
}

export interface AudioConfig {
  endpointId: string;
}

export interface Profile {
  id: string;
  name: string;
  version: number;
  display: DisplayConfig;
  audio: AudioConfig;
  playnitePath: string;
  createdAt: string;
  updatedAt: string;
}

export interface SetupStepResult {
  step: string;
  status: HealthStatus;
  message: string;
}

export interface AppSnapshot {
  display: DisplayConfig;
  audio: AudioConfig;
}

export interface SystemStatus {
  state: GamingModeState;
  activeProfileId: string | null;
  tvDetected: boolean;
  controllerDetected: boolean;
  playniteDetected: boolean;
}
