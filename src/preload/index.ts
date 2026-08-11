import { contextBridge, ipcRenderer } from 'electron';
import { ipcChannels } from '../shared/ipc/channels.js';
import type { DiagnosticResult, Profile, SetupStepResult, SystemStatus } from '../shared/types/index.js';

const api = {
  getSystemStatus: async (): Promise<SystemStatus> => await ipcRenderer.invoke(ipcChannels.getSystemStatus),
  runSetupStep: async (step: string): Promise<SetupStepResult> =>
    await ipcRenderer.invoke(ipcChannels.runSetupStep, { step }),
  listProfiles: async (): Promise<Profile[]> => await ipcRenderer.invoke(ipcChannels.listProfiles),
  saveProfile: async (profile: Profile): Promise<Profile> =>
    await ipcRenderer.invoke(ipcChannels.saveProfile, profile),
  enterGamingMode: async (profileId: string): Promise<SystemStatus> =>
    await ipcRenderer.invoke(ipcChannels.enterGamingMode, { profileId }),
  exitGamingMode: async (): Promise<SystemStatus> => await ipcRenderer.invoke(ipcChannels.exitGamingMode),
  runDiagnostics: async (): Promise<DiagnosticResult[]> =>
    await ipcRenderer.invoke(ipcChannels.runDiagnostics),
  repairDiagnostic: async (diagnosticId: string): Promise<DiagnosticResult> =>
    await ipcRenderer.invoke(ipcChannels.repairDiagnostic, { diagnosticId }),
};

contextBridge.exposeInMainWorld('bedGaming', api);
