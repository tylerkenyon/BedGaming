import { useAppStore } from '../stores/appStore';

export function SetupWizard() {
  const setupLog = useAppStore((state) => state.setupLog);
  const runSetupStep = useAppStore((state) => state.runSetupStep);

  return (
    <section className="rounded-xl border border-zinc-800 bg-panel p-4">
      <h2 className="mb-3 text-lg font-semibold">First-run Setup Wizard</h2>
      <button
        type="button"
        onClick={() => void runSetupStep()}
        className="rounded-md border border-accent bg-accent/10 px-3 py-2 text-sm font-medium text-accent hover:bg-accent/20"
      >
        Execute Next Step
      </button>
      <ul className="mt-4 space-y-2 text-sm">
        {setupLog.map((entry) => (
          <li key={`${entry.step}-${entry.message}`} className="rounded border border-zinc-800 bg-zinc-950 p-2">
            <span className="font-semibold uppercase">{entry.step}</span>: {entry.message} ({entry.status})
          </li>
        ))}
      </ul>
    </section>
  );
}
