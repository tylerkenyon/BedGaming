import { create } from 'zustand';
import type { DiagnosticResult, Profile, SetupStepResult, SystemStatus } from '../../shared/types/index';

const setupSteps = [
  'welcome',
  'hardware',
  'dependencies',
  'controller',
  'display',
  'audio',
  'playnite',
  'profile',
  'test',
  'complete',
] as const;

interface AppState {
  systemStatus: SystemStatus | null;
  profiles: Profile[];
  diagnostics: DiagnosticResult[];
  setupLog: SetupStepResult[];
  activePage: string;
  setupIndex: number;
  loadInitialData: () => Promise<void>;
  setActivePage: (page: string) => void;
  runSetupStep: () => Promise<void>;
  enterTvMode: (profileId: string) => Promise<void>;
  exitTvMode: () => Promise<void>;
  runDiagnostics: () => Promise<void>;
  repairDiagnostic: (diagnosticId: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  systemStatus: null,
  profiles: [],
  diagnostics: [],
  setupLog: [],
  activePage: 'Home',
  setupIndex: 0,
  loadInitialData: async () => {
    const [systemStatus, profiles] = await Promise.all([
      window.bedGaming.getSystemStatus(),
      window.bedGaming.listProfiles(),
    ]);
    set({ systemStatus, profiles });
  },
  setActivePage: (activePage: string) => set({ activePage }),
  runSetupStep: async () => {
    const index = get().setupIndex;
    const step = setupSteps[index];
    if (!step) {
      return;
    }
    const result = await window.bedGaming.runSetupStep(step);
    set((state) => ({
      setupLog: [...state.setupLog, result],
      setupIndex: Math.min(state.setupIndex + 1, setupSteps.length),
    }));
  },
  enterTvMode: async (profileId: string) => {
    const status = await window.bedGaming.enterGamingMode(profileId);
    set({ systemStatus: status });
  },
  exitTvMode: async () => {
    const status = await window.bedGaming.exitGamingMode();
    set({ systemStatus: status });
  },
  runDiagnostics: async () => {
    const diagnostics = await window.bedGaming.runDiagnostics();
    set({ diagnostics });
  },
  repairDiagnostic: async (diagnosticId: string) => {
    const repaired = await window.bedGaming.repairDiagnostic(diagnosticId);
    set((state) => ({
      diagnostics: state.diagnostics.map((item) => (item.id === repaired.id ? repaired : item)),
    }));
  },
}));
