import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  onToggle: () => void;
}

export default function Sidebar({ onToggle }: SidebarProps) {
  return (
    <aside id="sidebar" className="fixed left-0 top-0 z-40 flex h-screen w-[284px] flex-col border-r border-line bg-black transition-all duration-300 ease-out">
      <div className="flex h-20 items-center justify-between px-5">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-panel shadow-soft transition group-hover:border-cyan/50">
            <span className="h-3 w-3 rounded-full bg-cyan shadow-[0_0_24px_rgba(0,217,255,.85)]"></span>
          </span>
          <span className="brand-text transition-all duration-300">
            <span className="block text-sm font-semibold tracking-tight text-white">Darklaunch AI</span>
            <span className="block text-xs font-medium text-zinc-500">Control Plane</span>
          </span>
        </Link>
        <button onClick={onToggle} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-charcoal text-zinc-400 transition hover:border-cyan/50 hover:text-cyan" aria-label="Toggle sidebar">
          <iconify-icon icon="ph:sidebar-simple-thin" className="text-xl"></iconify-icon>
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-4">
        <Link href="#" className="nav-item flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-sm font-medium text-zinc-400 transition hover:border-line hover:bg-panel hover:text-white">
          <iconify-icon icon="ph:folders-thin" className="text-[22px]"></iconify-icon>
          <span className="sidebar-label transition-all duration-300">My Projects</span>
        </Link>
        <Link href="/" className="nav-item flex items-center gap-3 rounded-xl border border-cyan/25 bg-cyan/[0.08] px-3 py-3 text-sm font-medium text-white shadow-glow transition">
          <iconify-icon icon="ph:sparkle-thin" className="text-[22px] text-cyan"></iconify-icon>
          <span className="sidebar-label transition-all duration-300">AI Generation</span>
        </Link>
        <Link href="#" className="nav-item flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-sm font-medium text-zinc-400 transition hover:border-line hover:bg-panel hover:text-white">
          <iconify-icon icon="ph:squares-four-thin" className="text-[22px]"></iconify-icon>
          <span className="sidebar-label transition-all duration-300">Component Library</span>
        </Link>
        <Link href="#" className="nav-item flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-sm font-medium text-zinc-400 transition hover:border-line hover:bg-panel hover:text-white">
          <iconify-icon icon="ph:export-thin" className="text-[22px]"></iconify-icon>
          <span className="sidebar-label transition-all duration-300">Export Code</span>
        </Link>
        <Link href="#" className="nav-item flex items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-sm font-medium text-zinc-400 transition hover:border-line hover:bg-panel hover:text-white">
          <iconify-icon icon="ph:gear-six-thin" className="text-[22px]"></iconify-icon>
          <span className="sidebar-label transition-all duration-300">Settings</span>
        </Link>
      </nav>

      <div className="m-4 rounded-2xl border border-line bg-panel p-4 transition-all duration-300">
        <div className="mb-3 flex items-center gap-2">
          <span className="live-dot relative h-2 w-2 rounded-full bg-cyan"></span>
          <span className="sidebar-label text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 transition-all duration-300">Live Network</span>
        </div>
        <div className="sidebar-meta transition-all duration-300">
          <div className="flex items-end justify-between">
            <span className="text-2xl font-semibold tracking-tight">99.99%</span>
            <span className="text-xs text-cyan">healthy</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-900">
            <div className="metric-line h-full w-[92%] rounded-full"></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
