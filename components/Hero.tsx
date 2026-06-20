"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { usePostHog } from 'posthog-js/react';
import { useAuth } from '@clerk/nextjs';
import { supabase } from '@/lib/supabaseClient';
import { GlassCard } from "./GlassCard";
import { PreviewWindow } from "./PreviewWindow";

export function Hero() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const posthog = usePostHog();
  const { userId } = useAuth();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    posthog.capture('ai_engine_triggered', { prompt_length: prompt.length });
    setIsGenerating(true);
    setGeneratedHtml(null);
    setError(null);

    // Scroll down slightly so the user sees the pulsing loading state
    setTimeout(() => {
      document.getElementById("preview")?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (data.html) {
        setGeneratedHtml(data.html);
        
        // Save to Supabase
        if (userId) {
          console.log('Sending to DB:', { user_id: userId, prompt, generated_code: data.html });
          const { error: dbError } = await supabase
            .from('generations')
            .insert([{ user_id: userId, prompt: prompt, generated_code: data.html }]);
          if (dbError) {
            console.error('--- SUPABASE ERROR DETAILS ---');
            console.dir(dbError); // Shows full object structure
            console.error('Raw message:', dbError.message);
            console.error('Hint:', dbError.hint);
            console.error('Details:', dbError.details);
            alert('Error: ' + dbError.message); // Will show us the exact error in browser
          } else {
            console.log("Successfully saved generation to Supabase.");
          }
        } else {
          console.log("Login to save your projects.");
        }
      } else {
        console.error("API Response:", data);
        setError(data.error || "Received empty response from the API.");
        setGeneratedHtml("");
      }
    } catch (err: any) {
      console.error("Fetch Error:", err);
      console.error("Error Stack:", err.stack);
      setError("An unexpected error occurred during generation.");
      setGeneratedHtml("");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="z-10 flex flex-col items-center text-center w-full max-w-4xl mt-20"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="text-6xl md:text-[5.5rem] font-medium tracking-tight mb-8 text-white leading-[1.1]"
          >
            Build with <br className="hidden md:block" />
            DarkLaunch AI
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl font-normal"
          >
            The enterprise-ready platform that generates production-grade landing pages in seconds. Step into the future of web creation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-full max-w-2xl"
          >
            <GlassCard className="p-2 flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleGenerate();
                }}
                disabled={isGenerating}
                placeholder="Describe your dream landing page..."
                className="flex-1 w-full bg-transparent border-none outline-none text-white px-6 py-4 text-lg placeholder:text-gray-500 focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 rounded-lg"
              />
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full sm:w-auto px-10 py-4 rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.4)] border-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating
                  </>
                ) : (
                  "Generate"
                )}
              </button>
            </GlassCard>
          </motion.div>
        </motion.div>
      </section>

      <PreviewWindow code={generatedHtml} isGenerating={isGenerating} error={error} />
    </div>
  );
}
