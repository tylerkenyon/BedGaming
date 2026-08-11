import { describe, expect, it } from 'vitest';
import { profileSchema } from '../../shared/schemas/index.js';

describe('profileSchema', () => {
  it('accepts valid profile', () => {
    const parsed = profileSchema.parse({
      id: 'profile-1',
      name: 'Bedroom TV',
      version: 1,
      display: {
        primaryDisplayId: 'DISPLAY1',
        resolution: '1920x1080',
        refreshRate: 60,
        laptopDisplayEnabled: false,
      },
      audio: { endpointId: 'TV' },
      playnitePath: 'C:/Playnite/Playnite.DesktopApp.exe',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    expect(parsed.name).toBe('Bedroom TV');
  });

  it('rejects invalid profile', () => {
    expect(() =>
      profileSchema.parse({
        id: '',
        name: '',
      }),
    ).toThrow();
  });
});
