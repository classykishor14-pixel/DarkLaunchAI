'use client';

import React from 'react';
import PromptBar from '@/components/PromptBar';
import PreviewCanvas from '@/components/PreviewCanvas';
import CodeInspector from '@/components/CodeInspector';

const SAMPLE_CODE = `import { Hero } from "@/components/hero"

export default function Page() {
  return (
    <main className="bg-background">
      <Nav />
      <Hero
        badge="Now in public beta"
        title="Ship products faster"
        cta="Start free trial"
      />
      <Features items={features} />
      <LogoCloud brands={brands} />
    </main>
  )
}`;

export default function BuilderWorkspace() {
  const [prompt, setPrompt] = React.useState('A modern SaaS landing page for a cloud infrastructure product');
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 1600);
  };

  return (
    <div className="flex flex-col gap-6">
      <PromptBar
        value={prompt}
        onChange={setPrompt}
        onGenerate={handleGenerate}
        isGenerating={isGenerating}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
        <div className="min-h-[620px]">
          <PreviewCanvas isGenerating={isGenerating} />
        </div>
        <div className="min-h-[620px]">
          <CodeInspector code={SAMPLE_CODE} />
        </div>
      </div>
    </div>
  );
}
