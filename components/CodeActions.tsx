"use client";

import { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';

export function CodeActions({ code, projectId }: { code: string, projectId?: string }) {
  const [copied, setCopied] = useState(false);
  const posthog = usePostHog();

  const handleExport = () => {
    if (!code) return;
    
    if (posthog && projectId) {
      posthog.capture('code_exported', { project_id: projectId, framework: 'nextjs' });
    }

    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'darklaunch-component.tsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex gap-3 w-full">
      <button 
        onClick={handleExport}
        className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:from-cyan-400 hover:to-purple-500 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" />
        Export Code
      </button>
      
      <div className="relative">
        <button 
          onClick={handleCopy}
          className="px-4 h-full rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 text-white transition-all duration-300 flex items-center justify-center"
          title="Copy Code"
        >
          {copied ? <Check className="w-5 h-5 text-cyan-400" /> : <Copy className="w-5 h-5 text-gray-300" />}
        </button>
        
        {/* Success Toast */}
        <div 
          className={`absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-gray-900 shadow-xl border border-white/10 text-xs font-medium text-cyan-400 whitespace-nowrap transition-all duration-300 ${
            copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          Copied to clipboard!
        </div>
      </div>
    </div>
  );
}
