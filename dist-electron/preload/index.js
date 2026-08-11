import { contextBridge, ipcRenderer } from 'electron';
import { ipcChannels } from '../shared/ipc/channels.js';
const api = {
    getSystemStatus: async () => await ipcRenderer.invoke(ipcChannels.getSystemStatus),
    runSetupStep: async (step) => await ipcRenderer.invoke(ipcChannels.runSetupStep, { step }),
    listProfiles: async () => await ipcRenderer.invoke(ipcChannels.listProfiles),
    saveProfile: async (profile) => await ipcRenderer.invoke(ipcChannels.saveProfile, profile),
    enterGamingMode: async (profileId) => await ipcRenderer.invoke(ipcChannels.enterGamingMode, { profileId }),
    exitGamingMode: async () => await ipcRenderer.invoke(ipcChannels.exitGamingMode),
    runDiagnostics: async () => await ipcRenderer.invoke(ipcChannels.runDiagnostics),
    repairDiagnostic: async (diagnosticId) => await ipcRenderer.invoke(ipcChannels.repairDiagnostic, { diagnosticId }),
};
contextBridge.exposeInMainWorld('bedGaming', api);
//# sourceMappingURL=index.js.map