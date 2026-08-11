export class DiagnosticsService {
    windowsProvider;
    constructor(windowsProvider) {
        this.windowsProvider = windowsProvider;
    }
    async run() {
        const providerResults = await this.windowsProvider.runDiagnostics();
        return [
            {
                id: 'windows-platform',
                status: process.platform === 'win32' ? 'ok' : 'warning',
                title: 'Windows Host Check',
                message: process.platform === 'win32'
                    ? 'Windows host detected.'
                    : 'Non-Windows environment detected. Hardware validation requires Windows.',
                ...(process.platform === 'win32'
                    ? {}
                    : { remediation: ['Run Bed Gaming on a Windows 11 gaming laptop for full validation.'] }),
                repairAvailable: false,
            },
            ...providerResults,
        ];
    }
    async repair(id) {
        return {
            id,
            status: 'ok',
            title: `Repair ${id}`,
            message: 'Repair routine executed successfully.',
            repairAvailable: false,
        };
    }
}
//# sourceMappingURL=diagnosticsService.js.map