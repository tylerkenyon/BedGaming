import { useMemo } from 'react';
import { useAppStore } from '../stores/appStore';

export function HomePage() {
  const status = useAppStore((state) => state.systemStatus);
  const profiles = useAppStore((state) => state.profiles);
  const enterTvMode = useAppStore((state) => state.enterTvMode);
  const exitTvMode = useAppStore((state) => state.exitTvMode);

  const defaultProfile = useMemo(() => profiles[0], [profiles]);

  return (
    <section className="rounded-xl border border-zinc-800 bg-panel p-6">
      <h1 className="text-3xl font-black tracking-tight">BED GAMING</h1>
      <p className="mt-2 text-zinc-300">TV GAMING MODE ● {status?.state ?? 'UNKNOWN'}</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
          <h3 className="text-sm font-semibold text-zinc-200">TV</h3>
          <p className="text-zinc-400">Samsung TV</p>
          <p className="text-zinc-400">1920×1080 · 60Hz</p>
        </article>
        <article className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
          <h3 className="text-sm font-semibold text-zinc-200">Controller</h3>
          <p className="text-zinc-400">DualSense</p>
          <p className="text-zinc-400">82%</p>
        </article>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          type="button"
          disabled={!defaultProfile}
          onClick={() => defaultProfile && void enterTvMode(defaultProfile.id)}
          className="rounded-md border border-accent bg-accent/10 px-4 py-2 text-sm font-semibold text-accent disabled:opacity-50"
        >
          ENTER TV MODE
        </button>
        <button
          type="button"
          onClick={() => void exitTvMode()}
          className="rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-200"
        >
          EXIT TV MODE
        </button>
      </div>
    </section>
  );
}
