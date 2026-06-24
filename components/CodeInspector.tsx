'use client';

import React from 'react';

interface CodeInspectorProps {
  code: string;
}

// Lightweight token highlighter for the read-only inspector view.
function highlight(line: string): React.ReactNode {
  const tokens = line.split(/(\s+)/);
  const keywords = new Set([
    'export', 'default', 'function', 'return', 'const', 'import', 'from',
  ]);
  return tokens.map((tok, i) => {
    const trimmed = tok.trim();
    if (keywords.has(trimmed)) return <span key={i} className="text-cyan">{tok}</span>;
    if (/^["'].*["']$/.test(trimmed)) return <span key={i} className="text-emerald-400">{tok}</span>;
    if (/^<\/?[A-Za-z]/.test(trimmed)) return <span key={i} className="text-sky-300">{tok}</span>;
    if (/^className=|^href=/.test(trimmed)) return <span key={i} className="text-violet-300">{tok}</span>;
    return <span key={i} className="text-zinc-300">{tok}</span>;
  });
}

export default function CodeInspector({ code }: CodeInspectorProps) {
  const [copied, setCopied] = React.useState(false);
  const lines = code.split('\n');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="glass flex h-full flex-col overflow-hidden rounded-3xl border border-line shadow-soft">
      <div className="flex items-center justify-between border-b border-line bg-black/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <iconify-icon icon="ph:code-thin" className="text-lg text-cyan"></iconify-icon>
          <span className="text-sm font-semibold text-white">Code Inspector</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copy}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-line bg-charcoal px-2.5 text-xs font-medium text-zinc-300 transition hover:border-cyan/50 hover:text-cyan"
          >
            <iconify-icon icon={copied ? 'ph:check-bold' : 'ph:copy-thin'} className="text-base"></iconify-icon>
            {copied ? 'Copied' : 'Copy Code'}
          </button>
          <button className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-cyan px-2.5 text-xs font-semibold text-black transition hover:shadow-[0_0_20px_rgba(0,217,255,.35)]">
            <iconify-icon icon="ph:file-zip-thin" className="text-base"></iconify-icon>
            Export ZIP
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-line bg-black/30 px-4 py-2">
        <span className="flex items-center gap-1.5 rounded-md border border-line bg-panel px-2.5 py-1 text-[11px] font-medium text-zinc-300">
          <iconify-icon icon="ph:file-tsx-thin" className="text-sm text-cyan"></iconify-icon>
          page.tsx
        </span>
        <span className="text-[11px] font-medium text-zinc-600">components/hero.tsx</span>
      </div>

      <div className="flex-1 overflow-auto bg-black/40 p-4 font-mono text-[12.5px] leading-6">
        <pre className="min-w-max">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-4 w-6 shrink-0 select-none text-right text-zinc-700">{i + 1}</span>
              <code className="whitespace-pre">{line ? highlight(line) : ' '}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
