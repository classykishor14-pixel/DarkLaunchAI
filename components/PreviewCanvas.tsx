'use client';

import React from 'react';

interface PreviewCanvasProps {
  isGenerating: boolean;
}

type Viewport = 'desktop' | 'tablet' | 'mobile';

export default function PreviewCanvas({ isGenerating }: PreviewCanvasProps) {
  const [viewport, setViewport] = React.useState<Viewport>('desktop');

  const widths: Record<Viewport, string> = {
    desktop: 'max-w-full',
    tablet: 'max-w-2xl',
    mobile: 'max-w-sm',
  };

  return (
    <div className="glass flex h-full flex-col overflow-hidden rounded-3xl border border-line shadow-soft">
      {/* Canvas toolbar */}
      <div className="flex items-center justify-between border-b border-line bg-black/50 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="h-3 w-3 rounded-full border border-line bg-panel"></span>
          <span className="h-3 w-3 rounded-full border border-line bg-panel"></span>
          <span className="h-3 w-3 rounded-full border border-line bg-panel"></span>
          <div className="ml-3 hidden items-center gap-2 rounded-lg border border-line bg-charcoal px-3 py-1.5 text-xs text-zinc-500 sm:flex">
            <iconify-icon icon="ph:lock-simple-thin" className="text-sm text-cyan"></iconify-icon>
            preview.darklaunch.ai
          </div>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-line bg-charcoal p-1">
          {([
            ['desktop', 'ph:desktop-thin'],
            ['tablet', 'ph:device-tablet-thin'],
            ['mobile', 'ph:device-mobile-thin'],
          ] as [Viewport, string][]).map(([key, icon]) => (
            <button
              key={key}
              onClick={() => setViewport(key)}
              aria-label={`${key} preview`}
              className={`flex h-7 w-7 items-center justify-center rounded-md transition ${
                viewport === key ? 'bg-cyan/15 text-cyan' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <iconify-icon icon={icon} className="text-lg"></iconify-icon>
            </button>
          ))}
        </div>
      </div>

      {/* Canvas body */}
      <div className="relative flex-1 overflow-y-auto bg-[radial-gradient(circle_at_50%_0%,rgba(0,217,255,0.04),transparent_60%)] p-4 sm:p-8">
        {isGenerating && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black/70 backdrop-blur-sm">
            <iconify-icon icon="ph:circle-notch-bold" className="animate-spin text-4xl text-cyan"></iconify-icon>
            <p className="text-sm font-medium text-zinc-300">Composing your interface...</p>
          </div>
        )}

        <div className={`mx-auto overflow-hidden rounded-2xl border border-line bg-charcoal transition-all duration-500 ${widths[viewport]}`}>
          {/* Mock landing page */}
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded-md bg-cyan"></span>
              <span className="text-sm font-semibold text-white">Nimbus</span>
            </div>
            <div className="hidden items-center gap-6 text-xs font-medium text-zinc-400 md:flex">
              <span>Product</span>
              <span>Pricing</span>
              <span>Docs</span>
              <span className="rounded-lg bg-white px-3 py-1.5 text-black">Sign up</span>
            </div>
          </div>

          <div className="px-6 py-12 text-center sm:px-10 sm:py-16">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan/30 bg-cyan/[0.07] px-3 py-1 text-[11px] font-medium text-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan"></span>
              Now in public beta
            </span>
            <h2 className="mx-auto mt-5 max-w-md text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ship products faster with autonomous infrastructure
            </h2>
            <p className="mx-auto mt-4 max-w-sm text-pretty text-sm leading-relaxed text-zinc-400">
              Nimbus deploys, scales, and heals your apps so your team can focus on building what matters.
            </p>
            <div className="mt-7 flex items-center justify-center gap-3">
              <span className="rounded-xl bg-cyan px-5 py-2.5 text-xs font-semibold text-black">Start free trial</span>
              <span className="rounded-xl border border-line px-5 py-2.5 text-xs font-semibold text-zinc-300">Book a demo</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 px-6 pb-12 sm:grid-cols-3 sm:px-10">
            {[
              ['ph:lightning-thin', 'Instant deploys', 'Push to production in under nine seconds.'],
              ['ph:shield-check-thin', 'Zero downtime', 'Self-healing nodes with automatic failover.'],
              ['ph:chart-line-up-thin', 'Live insights', 'Real-time metrics across every region.'],
            ].map(([icon, title, copy]) => (
              <div key={title} className="rounded-2xl border border-line bg-black/40 p-5 text-left">
                <iconify-icon icon={icon} className="text-2xl text-cyan"></iconify-icon>
                <p className="mt-3 text-sm font-semibold text-white">{title}</p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">{copy}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-line px-6 py-10 text-center sm:px-10">
            <p className="text-lg font-semibold tracking-tight text-white">Trusted by fast-moving teams</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-60">
              {['Vertex', 'Lumen', 'Orbit', 'Forge', 'Halo'].map((b) => (
                <span key={b} className="text-sm font-semibold tracking-tight text-zinc-300">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
