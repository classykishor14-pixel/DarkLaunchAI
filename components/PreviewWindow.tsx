"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { Copy, Check } from "lucide-react";

interface PreviewWindowProps {
  code: string | null;
  isGenerating: boolean;
  error?: string | null;
}

export function PreviewWindow({ code, isGenerating, error }: PreviewWindowProps) {
  const [copied, setCopied] = useState(false);

  console.log("PreviewWindow received code:", code ? "Yes, length: " + code.length : "No code");

  // If we aren't generating, have no content, and no error, don't show the window
  if (!isGenerating && code === null && !error) return null;

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full max-w-7xl mx-auto px-4 pb-24 z-10 relative mt-12"
      id="preview"
    >
      <div className="flex items-center justify-between mb-6 px-4">
        <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-cyan"></span>
          </span>
          Live Preview
        </h2>
        
        <div className="flex items-center gap-4">
          {code && !isGenerating && !error && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors text-white shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-300" />}
              {copied ? "Copied!" : "Copy Code"}
            </button>
          )}
          
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          </div>
        </div>
      </div>
      
      <GlassCard className="p-1 sm:p-2 overflow-hidden flex flex-col min-h-[80vh] border-white/20">
        <div className="flex-1 w-full rounded-xl overflow-hidden bg-[#0a0a0a] relative flex items-center justify-center">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center text-white/70 animate-pulse">
              <div className="w-12 h-12 border-4 border-neon-cyan/20 border-t-neon-cyan rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(0,240,255,0.5)]" />
              <p className="text-xl tracking-widest font-light text-neon-cyan/80">Generating cinematic code...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center text-red-400 p-8 text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                <span className="text-3xl">⚠️</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Generation Failed</h3>
              <p className="text-red-300/80">{error}</p>
            </div>
          ) : code ? (
            <iframe
              srcDoc={code}
              title="Generated Preview"
              className="w-full min-h-[700px] bg-white border-none rounded-b-xl"
              sandbox="allow-scripts"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-white/50">
              <p>No content generated.</p>
            </div>
          )}
        </div>
      </GlassCard>
    </motion.section>
  );
}
