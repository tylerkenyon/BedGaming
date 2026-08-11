const pages = ['Home', 'Games', 'Controller', 'TV Mode', 'Profiles', 'Integrations', 'Diagnostics', 'Settings'];

export function Navigation({ activePage, onSelect }: { activePage: string; onSelect: (page: string) => void }) {
  return (
    <nav className="flex flex-wrap gap-2 border-b border-zinc-800 pb-4"> 
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onSelect(page)}
          className={`rounded-lg border px-3 py-2 text-sm transition ${
            activePage === page
              ? 'border-accent bg-accent/15 text-accent'
              : 'border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100'
          }`}
        >
          {page}
        </button>
      ))}
    </nav>
  );
}
