'use client';

import React from 'react';

interface PromptBarProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const SUGGESTIONS = [
  'SaaS pricing page',
  'Mobile app hero',
  'Newsletter waitlist',
  'AI product launch',
];

export default function PromptBar({ value, onChange, onGenerate, isGenerating }: PromptBarProps) {
  return (
    <div className="glass relative overflow-hidden rounded-3xl border border-line p-5 shadow-soft">
      <div className="pointer-events-none absolute -left-24 -top-24 h-56 w-56 rounded-full bg-cyan/10 blur-[90px]"></div>

      <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-line bg-black/60 px-4 py-3.5">
          <iconify-icon icon="ph:sparkle-thin" className="shrink-0 text-2xl text-cyan"></iconify-icon>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isGenerating) onGenerate();
            }}
            placeholder="Describe the landing page you want to build..."
            className="w-full bg-transparent text-sm font-medium text-white placeholder:text-zinc-500 focus:outline-none"
            aria-label="Landing page prompt"
          />
          <kbd className="hidden shrink-0 rounded-md border border-line bg-panel px-2 py-1 text-[11px] font-medium text-zinc-500 sm:block">
            Enter
          </kbd>
        </div>

        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="group inline-flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-2xl bg-cyan px-7 text-sm font-semibold text-black shadow-[0_0_34px_rgba(0,217,255,.32)] transition hover:scale-[1.02] hover:shadow-[0_0_46px_rgba(0,217,255,.5)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isGenerating ? (
            <>
              <iconify-icon icon="ph:circle-notch-bold" className="animate-spin text-xl"></iconify-icon>
              Generating
            </>
          ) : (
            <>
              <iconify-icon icon="ph:magic-wand-fill" className="text-xl"></iconify-icon>
              Generate UI
            </>
          )}
        </button>
      </div>

      <div className="relative mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-zinc-500">Try:</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onChange(s)}
            className="rounded-full border border-line bg-black px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:border-cyan/40 hover:text-cyan"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
