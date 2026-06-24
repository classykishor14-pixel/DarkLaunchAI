import React from 'react';

interface HeaderProps {
  onOpenCommand: () => void;
}

export default function Header({ onOpenCommand }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-line bg-black px-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">Landing Page Builder</p>
        <h1 className="mt-1 text-xl font-semibold tracking-tight text-white">AI Generation</h1>
      </div>
      <div className="flex items-center gap-4">
        <button onClick={onOpenCommand} className="group hidden h-11 w-[420px] items-center justify-between rounded-xl border border-line bg-charcoal px-4 text-left transition hover:border-zinc-600 md:flex">
          <span className="flex items-center gap-3 text-sm text-zinc-500 group-hover:text-zinc-300">
            <iconify-icon icon="ph:magnifying-glass-thin" className="text-xl"></iconify-icon>
            Search projects, components, templates...
          </span>
          <span className="rounded-md border border-line bg-black px-2 py-1 text-[11px] font-medium text-zinc-500">⌘ K</span>
        </button>
        <button onClick={onOpenCommand} className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-charcoal text-zinc-400 transition hover:border-cyan/50 hover:text-cyan md:hidden" aria-label="Open command menu">
          <iconify-icon icon="ph:magnifying-glass-thin" className="text-xl"></iconify-icon>
        </button>
        <button className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-panel text-zinc-400 transition hover:border-zinc-600 hover:text-white" aria-label="Notifications">
          <iconify-icon icon="ph:bell-thin" className="text-xl"></iconify-icon>
          <span className="absolute right-3 top-3 h-1.5 w-1.5 rounded-full bg-cyan"></span>
        </button>
        <button className="flex h-11 items-center gap-2.5 rounded-xl border border-line bg-panel py-1 pl-1.5 pr-3 transition hover:border-zinc-600" aria-label="User profile">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-xs font-semibold text-black">AR</span>
          <span className="hidden flex-col items-start lg:flex">
            <span className="text-sm font-medium leading-tight text-zinc-200">Avery Reed</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan">
              <iconify-icon icon="ph:lightning-fill" className="text-[11px]"></iconify-icon>
              Pro Plan
            </span>
          </span>
        </button>
      </div>
    </header>
  );
}
