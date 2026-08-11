import { z } from 'zod';
export const displayConfigSchema = z.object({
    primaryDisplayId: z.string().min(1),
    resolution: z.string().min(1),
    refreshRate: z.number().int().positive(),
    laptopDisplayEnabled: z.boolean(),
});
export const audioConfigSchema = z.object({
    endpointId: z.string().min(1),
});
export const profileSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    version: z.number().int().positive(),
    display: displayConfigSchema,
    audio: audioConfigSchema,
    playnitePath: z.string().min(1),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
export const saveProfileSchema = profileSchema;
export const runSetupStepSchema = z.object({
    step: z.enum(['welcome', 'hardware', 'dependencies', 'controller', 'display', 'audio', 'playnite', 'profile', 'test', 'complete']),
});
export const enterGamingModeSchema = z.object({
    profileId: z.string().min(1),
});
export const diagnosticRepairSchema = z.object({
    diagnosticId: z.string().min(1),
});
//# sourceMappingURL=index.js.map