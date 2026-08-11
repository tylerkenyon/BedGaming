import { useEffect } from 'react';
import { useAppStore } from '../stores/appStore';

const statusColors = {
  ok: 'text-emerald-400',
  warning: 'text-amber-400',
  error: 'text-rose-400',
};

export function DiagnosticsPage() {
  const diagnostics = useAppStore((state) => state.diagnostics);
  const runDiagnostics = useAppStore((state) => state.runDiagnostics);
  const repairDiagnostic = useAppStore((state) => state.repairDiagnostic);

  useEffect(() => {
    void runDiagnostics();
  }, [runDiagnostics]);

  return (
    <section className="rounded-xl border border-zinc-800 bg-panel p-4">
      <h2 className="mb-3 text-lg font-semibold">Diagnostics</h2>
      <div className="space-y-3">
        {diagnostics.map((item) => (
          <article key={item.id} className="rounded-md border border-zinc-800 bg-zinc-950 p-3">
            <header className="flex items-center justify-between">
              <h3 className="font-semibold">{item.title}</h3>
              <span className={`text-xs uppercase ${statusColors[item.status]}`}>{item.status}</span>
            </header>
            <p className="mt-1 text-sm text-zinc-300">{item.message}</p>
            {item.remediation && (
              <ul className="mt-2 list-inside list-disc text-xs text-zinc-400">
                {item.remediation.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            )}
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => void repairDiagnostic(item.id)}
                disabled={!item.repairAvailable}
                className="rounded border border-accent px-2 py-1 text-xs text-accent disabled:opacity-40"
              >
                REPAIR
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
