import { useEffect } from 'react';
import { DiagnosticsPage } from './components/DiagnosticsPage';
import { HomePage } from './components/HomePage';
import { Navigation } from './components/Navigation';
import { SetupWizard } from './components/SetupWizard';
import { useAppStore } from './stores/appStore';

export default function App() {
  const activePage = useAppStore((state) => state.activePage);
  const setActivePage = useAppStore((state) => state.setActivePage);
  const loadInitialData = useAppStore((state) => state.loadInitialData);

  useEffect(() => {
    void loadInitialData();
  }, [loadInitialData]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-4 p-6">
      <Navigation activePage={activePage} onSelect={setActivePage} />
      {activePage === 'Home' ? <HomePage /> : null}
      {activePage === 'Diagnostics' ? <DiagnosticsPage /> : null}
      <SetupWizard />
    </main>
  );
}
