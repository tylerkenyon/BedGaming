import { ipcMain } from 'electron';
import { z } from 'zod';
import { diagnosticRepairSchema, enterGamingModeSchema, runSetupStepSchema, saveProfileSchema } from '../../shared/schemas/index.js';
import { ipcChannels } from '../../shared/ipc/channels.js';
import { DiagnosticsService } from '../services/diagnostics/diagnosticsService.js';
import { GamingModeService } from '../services/gaming-mode/stateMachine.js';
import { ProfileStore } from '../services/profiles/profileStore.js';
import { getWindowsProvider } from '../services/windows/provider.js';

const windowsProvider = getWindowsProvider();
const profileStore = new ProfileStore();
const gamingModeService = new GamingModeService(windowsProvider);
const diagnosticsService = new DiagnosticsService(windowsProvider);

export function registerIpcHandlers(): void {
  ipcMain.handle(ipcChannels.getSystemStatus, async () => gamingModeService.getStatus());

  ipcMain.handle(ipcChannels.runSetupStep, async (_event, payload: unknown) => {
    const parsed = runSetupStepSchema.parse(payload);
    return await gamingModeService.runSetupStep(parsed.step);
  });

  ipcMain.handle(ipcChannels.listProfiles, async () => await profileStore.list());

  ipcMain.handle(ipcChannels.saveProfile, async (_event, payload: unknown) => {
    const parsed = saveProfileSchema.parse(payload);
    return await profileStore.save(parsed);
  });

  ipcMain.handle(ipcChannels.enterGamingMode, async (_event, payload: unknown) => {
    const parsed = enterGamingModeSchema.parse(payload);
    const profiles = await profileStore.list();
    const profile = profiles.find((item) => item.id === parsed.profileId);
    if (!profile) {
      throw new z.ZodError([
        {
          code: 'custom',
          message: `Profile not found: ${parsed.profileId}`,
          path: ['profileId'],
          input: parsed.profileId,
        },
      ]);
    }
    return await gamingModeService.enter(profile);
  });

  ipcMain.handle(ipcChannels.exitGamingMode, async () => await gamingModeService.exit());

  ipcMain.handle(ipcChannels.runDiagnostics, async () => await diagnosticsService.run());

  ipcMain.handle(ipcChannels.repairDiagnostic, async (_event, payload: unknown) => {
    const parsed = diagnosticRepairSchema.parse(payload);
    return await diagnosticsService.repair(parsed.diagnosticId);
  });
}
