import { runPowerShell } from './powershell.js';
class MockWindowsProvider {
    display = {
        primaryDisplayId: 'DISPLAY1',
        resolution: '1920x1080',
        refreshRate: 60,
        laptopDisplayEnabled: false,
    };
    audio = { endpointId: 'TV_SPEAKERS' };
    async detectTv() {
        return true;
    }
    async detectController() {
        return true;
    }
    async detectPlaynite() {
        return true;
    }
    async getDisplayConfig() {
        return this.display;
    }
    async setDisplayConfig(config) {
        this.display = config;
    }
    async getAudioConfig() {
        return this.audio;
    }
    async setAudioConfig(config) {
        this.audio = config;
    }
    async launchPlaynite(_path) {
        return;
    }
    async runDiagnostics() {
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
    async detectTv() {
        const output = await runPowerShell("Get-CimInstance -ClassName Win32_DesktopMonitor | Select-Object -ExpandProperty Name");
        return output.toLowerCase().includes('tv');
    }
    async detectController() {
        const output = await runPowerShell("Get-PnpDevice -Class HIDClass | Select-Object -ExpandProperty FriendlyName");
        return /dualsense|wireless controller/i.test(output);
    }
    async detectPlaynite() {
        const output = await runPowerShell("Test-Path \\\"$env:LOCALAPPDATA\\\\Playnite\\\\Playnite.DesktopApp.exe\\\"");
        return output.trim().toLowerCase() === 'true';
    }
    async launchPlaynite(path) {
        await runPowerShell(`Start-Process -FilePath '${path.replace(/'/g, "''")}'`);
    }
}
let provider = null;
export function getWindowsProvider() {
    if (provider) {
        return provider;
    }
    provider = process.platform === 'win32' ? new NativeWindowsProvider() : new MockWindowsProvider();
    return provider;
}
//# sourceMappingURL=provider.js.map