import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { app } from 'electron';
import { profileSchema } from '../../../shared/schemas/index.js';
const CONFIG_VERSION = 1;
export class ProfileStore {
    configDir = join(app.getPath('appData'), 'BedGaming');
    profilePath = join(this.configDir, 'profiles.json');
    async list() {
        const file = await this.readOrCreate();
        return file.profiles;
    }
    async save(profile) {
        profileSchema.parse(profile);
        const file = await this.readOrCreate();
        const profiles = file.profiles.filter((item) => item.id !== profile.id);
        profiles.push(profile);
        const next = { version: CONFIG_VERSION, profiles };
        await writeFile(this.profilePath, JSON.stringify(next, null, 2), 'utf-8');
        return profile;
    }
    async readOrCreate() {
        await mkdir(this.configDir, { recursive: true });
        try {
            const content = await readFile(this.profilePath, 'utf-8');
            const parsed = JSON.parse(content);
            return {
                version: CONFIG_VERSION,
                profiles: parsed.profiles.map((profile) => profileSchema.parse(profile)),
            };
        }
        catch {
            const initial = {
                version: CONFIG_VERSION,
                profiles: [
                    {
                        id: 'default-tv-mode',
                        name: 'Default TV Mode',
                        version: CONFIG_VERSION,
                        display: {
                            primaryDisplayId: 'DISPLAY1',
                            resolution: '1920x1080',
                            refreshRate: 60,
                            laptopDisplayEnabled: false,
                        },
                        audio: { endpointId: 'TV_SPEAKERS' },
                        playnitePath: process.platform === 'win32'
                            ? `${process.env.LOCALAPPDATA ?? 'C:/Users/Public/AppData/Local'}/Playnite/Playnite.DesktopApp.exe`
                            : '/mock/Playnite.DesktopApp.exe',
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    },
                ],
            };
            await writeFile(this.profilePath, JSON.stringify(initial, null, 2), 'utf-8');
            return initial;
        }
    }
}
//# sourceMappingURL=profileStore.js.map