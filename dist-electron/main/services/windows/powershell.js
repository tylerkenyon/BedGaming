import { spawn } from 'node:child_process';
export async function runPowerShell(script) {
    return await new Promise((resolve, reject) => {
        const child = spawn('powershell.exe', ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-Command', script], { windowsHide: true });
        let stdout = '';
        let stderr = '';
        child.stdout.on('data', (chunk) => {
            stdout += chunk.toString('utf-8');
        });
        child.stderr.on('data', (chunk) => {
            stderr += chunk.toString('utf-8');
        });
        child.on('error', (error) => reject(error));
        child.on('close', (code) => {
            if (code === 0) {
                resolve(stdout.trim());
                return;
            }
            reject(new Error(stderr.trim() || `PowerShell exited with code ${code}`));
        });
    });
}
//# sourceMappingURL=powershell.js.map