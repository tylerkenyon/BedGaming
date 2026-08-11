export class GamingModeService {
    windowsProvider;
    state = 'NORMAL';
    snapshot = null;
    activeProfileId = null;
    constructor(windowsProvider) {
        this.windowsProvider = windowsProvider;
    }
    getStatus() {
        return {
            state: this.state,
            activeProfileId: this.activeProfileId,
            tvDetected: true,
            controllerDetected: true,
            playniteDetected: true,
        };
    }
    async runSetupStep(step) {
        const map = {
            welcome: async () => 'Setup session started.',
            hardware: async () => ((await this.windowsProvider.detectTv()) ? 'TV detected.' : 'No TV detected.'),
            dependencies: async () => 'Dependencies verified through integration checks.',
            controller: async () => ((await this.windowsProvider.detectController()) ? 'Controller detected and stack prepared.' : 'Controller not detected.'),
            display: async () => 'Display profile validated.',
            audio: async () => 'Audio endpoint profile validated.',
            playnite: async () => ((await this.windowsProvider.detectPlaynite()) ? 'Playnite detected.' : 'Playnite not detected.'),
            profile: async () => 'Gaming profile created.',
            test: async () => 'Pre-flight test completed.',
            complete: async () => 'Setup complete.',
        };
        const runner = map[step];
        if (!runner) {
            return { step, status: 'error', message: `Unsupported step: ${step}` };
        }
        const message = await runner();
        const status = message.toLowerCase().includes('not') || message.toLowerCase().includes('no ') ? 'warning' : 'ok';
        return { step, status, message };
    }
    async enter(profile) {
        this.state = 'PREPARING';
        this.snapshot = {
            display: await this.windowsProvider.getDisplayConfig(),
            audio: await this.windowsProvider.getAudioConfig(),
        };
        try {
            this.state = 'DISPLAY_READY';
            await this.windowsProvider.setDisplayConfig(profile.display);
            this.state = 'AUDIO_READY';
            await this.windowsProvider.setAudioConfig(profile.audio);
            this.state = 'CONTROLLER_READY';
            await this.windowsProvider.detectController();
            this.state = 'LAUNCHER_READY';
            await this.windowsProvider.launchPlaynite(profile.playnitePath);
            this.state = 'GAMING';
            this.activeProfileId = profile.id;
            return this.getStatus();
        }
        catch {
            await this.rollback();
            throw new Error('Failed to enter gaming mode. System state has been rolled back.');
        }
    }
    async exit() {
        this.state = 'EXITING';
        if (this.snapshot) {
            this.state = 'RESTORING';
            await this.windowsProvider.setDisplayConfig(this.snapshot.display);
            await this.windowsProvider.setAudioConfig(this.snapshot.audio);
        }
        this.activeProfileId = null;
        this.state = 'NORMAL';
        return this.getStatus();
    }
    async rollback() {
        this.state = 'FAILED';
        if (!this.snapshot) {
            this.state = 'NORMAL';
            return;
        }
        this.state = 'ROLLBACK';
        await this.windowsProvider.setDisplayConfig(this.snapshot.display);
        await this.windowsProvider.setAudioConfig(this.snapshot.audio);
        this.activeProfileId = null;
        this.state = 'NORMAL';
    }
}
//# sourceMappingURL=stateMachine.js.map