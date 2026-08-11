/// <reference types="vite/client" />

import type { DiagnosticResult, Profile, SetupStepResult, SystemStatus } from '../shared/types/index';

declare global {
  interface Window {
    bedGaming: {
      getSystemStatus: () => Promise<SystemStatus>;
      runSetupStep: (step: string) => Promise<SetupStepResult>;
      listProfiles: () => Promise<Profile[]>;
      saveProfile: (profile: Profile) => Promise<Profile>;
      enterGamingMode: (profileId: string) => Promise<SystemStatus>;
      exitGamingMode: () => Promise<SystemStatus>;
      runDiagnostics: () => Promise<DiagnosticResult[]>;
      repairDiagnostic: (diagnosticId: string) => Promise<DiagnosticResult>;
    };
  }
}

export {};
