import React from "react"; // Trigger IDE recheck again

export default function Home() {
  return (
    <>
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <div className="glass rounded-3xl border border-line p-8 shadow-soft">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-black px-3 py-1.5 text-xs font-medium text-zinc-400">
                <span className="live-dot relative h-1.5 w-1.5 rounded-full bg-cyan"></span>
                14 regions synchronized
              </div>
              <h2 className="max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-white">Quick Launch</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">Deploy a guarded AI endpoint, rotate credentials, or promote a model variant across production traffic in seconds.</p>
            </div>
            <button className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan px-5 text-sm font-semibold text-black transition hover:scale-[1.02] hover:shadow-[0_0_34px_rgba(0,217,255,.28)] active:scale-[0.98]">
              Launch Endpoint
              <iconify-icon icon="ph:arrow-up-right-thin" className="text-xl transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></iconify-icon>
            </button>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <button className="group rounded-2xl border border-line bg-black p-5 text-left transition hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-cyan/[0.04]">
              <iconify-icon icon="ph:lightning-thin" className="text-2xl text-cyan"></iconify-icon>
              <p className="mt-4 text-sm font-semibold text-white">Canary Deploy</p>
              <p className="mt-1 text-xs leading-5 text-zinc-500">Shift 5% traffic to a new model with rollback guards.</p>
            </button>
            <button className="group rounded-2xl border border-line bg-black p-5 text-left transition hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-cyan/[0.04]">
              <iconify-icon icon="ph:shield-check-thin" className="text-2xl text-cyan"></iconify-icon>
              <p className="mt-4 text-sm font-semibold text-white">Policy Gate</p>
              <p className="mt-1 text-xs leading-5 text-zinc-500">Apply latency, cost, and safety limits before release.</p>
            </button>
            <button className="group rounded-2xl border border-line bg-black p-5 text-left transition hover:-translate-y-0.5 hover:border-cyan/50 hover:bg-cyan/[0.04]">
              <iconify-icon icon="ph:terminal-window-thin" className="text-2xl text-cyan"></iconify-icon>
              <p className="mt-4 text-sm font-semibold text-white">Generate SDK</p>
              <p className="mt-1 text-xs leading-5 text-zinc-500">Create typed client snippets for server environments.</p>
            </button>
          </div>
        </div>

        <div className="glass rounded-3xl border border-line p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Telemetry</h3>
            <span className="rounded-full border border-cyan/25 bg-cyan/[0.08] px-2.5 py-1 text-xs font-medium text-cyan">Live</span>
          </div>
          <div className="mt-6 space-y-6">
            <div>
              <div className="mb-2 flex justify-between text-xs"><span className="text-zinc-500">Requests / min</span><span className="text-cyan">18,492</span></div>
              <div className="h-1.5 overflow-hidden rounded-full bg-black"><div className="metric-line h-full w-[86%]"></div></div>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-xs"><span className="text-zinc-500">P95 Latency</span><span className="text-cyan">42 ms</span></div>
              <div className="h-1.5 overflow-hidden rounded-full bg-black"><div className="metric-line h-full w-[42%]"></div></div>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-xs"><span className="text-zinc-500">Error Budget</span><span className="text-cyan">91.4%</span></div>
              <div className="h-1.5 overflow-hidden rounded-full bg-black"><div className="metric-line h-full w-[91%]"></div></div>
            </div>
          </div>
          <div className="mt-7 rounded-2xl border border-line bg-black p-4">
            <p className="text-xs text-zinc-500">Current spend velocity</p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-3xl font-semibold tracking-tight">$0.084</p>
              <p className="text-xs text-zinc-500">per 1K tokens</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-line bg-panel p-5 transition hover:border-zinc-600">
          <p className="text-xs font-medium text-zinc-500">Active Requests</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight">2,847</p>
          <p className="mt-2 text-xs text-cyan">+12.8% last hour</p>
        </div>
        <div className="rounded-2xl border border-line bg-panel p-5 transition hover:border-zinc-600">
          <p className="text-xs font-medium text-zinc-500">Median Latency</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight">24 ms</p>
          <p className="mt-2 text-xs text-zinc-500">P95 under 50 ms</p>
        </div>
        <div className="rounded-2xl border border-line bg-panel p-5 transition hover:border-zinc-600">
          <p className="text-xs font-medium text-zinc-500">Healthy Models</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight">37 / 38</p>
          <p className="mt-2 text-xs text-zinc-500">1 warming instance</p>
        </div>
        <div className="rounded-2xl border border-line bg-panel p-5 transition hover:border-zinc-600">
          <p className="text-xs font-medium text-zinc-500">Uptime</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight">99.99%</p>
          <p className="mt-2 text-xs text-cyan">SLO compliant</p>
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-3xl border border-line bg-panel shadow-soft">
        <div className="flex flex-col justify-between gap-4 border-b border-line p-6 md:flex-row md:items-center">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-white">Active API Requests</h3>
            <p className="mt-1 text-sm text-zinc-500">Realtime request routing, latency, model health, and region status.</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-line bg-black px-3 py-2 text-xs text-zinc-500">
            <iconify-icon icon="ph:funnel-thin" className="text-lg"></iconify-icon>
            Filter: Production
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead className="border-b border-line bg-black text-xs uppercase tracking-[0.16em] text-zinc-500">
              <tr>
                <th className="px-6 py-4 font-medium">Request ID</th>
                <th className="px-6 py-4 font-medium">Endpoint</th>
                <th className="px-6 py-4 font-medium">Model</th>
                <th className="px-6 py-4 font-medium">Region</th>
                <th className="px-6 py-4 font-medium">Latency</th>
                <th className="px-6 py-4 font-medium">Tokens</th>
                <th className="px-6 py-4 font-medium">Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              <tr className="transition hover:bg-white/[0.025]">
                <td className="px-6 py-5 font-mono text-xs text-zinc-300">req_9f42c18a</td>
                <td className="px-6 py-5 text-zinc-300">/v1/generate</td>
                <td className="px-6 py-5 text-white">dl-orion-7b</td>
                <td className="px-6 py-5 text-zinc-400">iad-1</td>
                <td className="px-6 py-5 text-cyan">31 ms</td>
                <td className="px-6 py-5 text-zinc-400">1,284</td>
                <td className="px-6 py-5"><span className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/[0.07] px-2.5 py-1 text-xs text-cyan"><span className="h-1.5 w-1.5 rounded-full bg-cyan"></span>Healthy</span></td>
              </tr>
              <tr className="transition hover:bg-white/[0.025]">
                <td className="px-6 py-5 font-mono text-xs text-zinc-300">req_b117e03d</td>
                <td className="px-6 py-5 text-zinc-300">/v1/embed</td>
                <td className="px-6 py-5 text-white">dl-vector-3</td>
                <td className="px-6 py-5 text-zinc-400">fra-2</td>
                <td className="px-6 py-5 text-cyan">18 ms</td>
                <td className="px-6 py-5 text-zinc-400">482</td>
                <td className="px-6 py-5"><span className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/[0.07] px-2.5 py-1 text-xs text-cyan"><span className="h-1.5 w-1.5 rounded-full bg-cyan"></span>Healthy</span></td>
              </tr>
              <tr className="transition hover:bg-white/[0.025]">
                <td className="px-6 py-5 font-mono text-xs text-zinc-300">req_45a02d9f</td>
                <td className="px-6 py-5 text-zinc-300">/v1/chat</td>
                <td className="px-6 py-5 text-white">dl-nova-32b</td>
                <td className="px-6 py-5 text-zinc-400">sfo-1</td>
                <td className="px-6 py-5 text-cyan">47 ms</td>
                <td className="px-6 py-5 text-zinc-400">3,940</td>
                <td className="px-6 py-5"><span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-black px-2.5 py-1 text-xs text-zinc-400"><span className="h-1.5 w-1.5 rounded-full bg-zinc-500"></span>Warming</span></td>
              </tr>
              <tr className="transition hover:bg-white/[0.025]">
                <td className="px-6 py-5 font-mono text-xs text-zinc-300">req_f0e381ab</td>
                <td className="px-6 py-5 text-zinc-300">/v1/rerank</td>
                <td className="px-6 py-5 text-white">dl-rank-2</td>
                <td className="px-6 py-5 text-zinc-400">nrt-1</td>
                <td className="px-6 py-5 text-cyan">22 ms</td>
                <td className="px-6 py-5 text-zinc-400">916</td>
                <td className="px-6 py-5"><span className="inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/[0.07] px-2.5 py-1 text-xs text-cyan"><span className="h-1.5 w-1.5 rounded-full bg-cyan"></span>Healthy</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

