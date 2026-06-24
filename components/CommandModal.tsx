'use client';

import React, { useRef, useEffect } from 'react';

interface CommandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandModal({ isOpen, onClose }: CommandModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    const items = document.querySelectorAll('.command-item');
    items.forEach((item) => {
      const el = item as HTMLElement;
      el.style.display = el.innerText.toLowerCase().includes(query) ? 'flex' : 'none';
    });
  };

  return (
    <div id="command-modal" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} className="pointer-events-none fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 pt-28 opacity-0 backdrop-blur-sm transition-opacity duration-200">
      <div id="command-panel" className="w-full max-w-2xl scale-95 overflow-hidden rounded-2xl border border-line bg-[#0A0A0A] opacity-0 shadow-[0_30px_120px_rgba(0,0,0,.85)] transition duration-200">
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <iconify-icon icon="ph:magnifying-glass-thin" className="text-2xl text-zinc-500"></iconify-icon>
          <input 
            ref={inputRef}
            id="command-input" 
            onChange={handleInput}
            className="h-10 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600" 
            placeholder="Type a command or search Darklaunch AI..." 
          />
          <button onClick={onClose} className="rounded-lg border border-line px-2 py-1 text-xs text-zinc-500 transition hover:text-white">ESC</button>
        </div>
        <div className="p-3">
          <p className="px-3 py-2 text-xs font-medium uppercase tracking-[0.16em] text-zinc-600">Suggested</p>
          <button className="command-item flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition hover:bg-panel">
            <span className="flex items-center gap-3"><iconify-icon icon="ph:rocket-launch-thin" className="text-xl text-cyan"></iconify-icon><span className="text-sm text-zinc-200">Create canary deployment</span></span><span className="text-xs text-zinc-600">Deploy</span>
          </button>
          <button className="command-item flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition hover:bg-panel">
            <span className="flex items-center gap-3"><iconify-icon icon="ph:key-thin" className="text-xl text-cyan"></iconify-icon><span className="text-sm text-zinc-200">Rotate production API key</span></span><span className="text-xs text-zinc-600">Security</span>
          </button>
          <button className="command-item flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition hover:bg-panel">
            <span className="flex items-center gap-3"><iconify-icon icon="ph:chart-line-up-thin" className="text-xl text-cyan"></iconify-icon><span className="text-sm text-zinc-200">Open latency telemetry</span></span><span className="text-xs text-zinc-600">Metrics</span>
          </button>
        </div>
      </div>
    </div>
  );
}
