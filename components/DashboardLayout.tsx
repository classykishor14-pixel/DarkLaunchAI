'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import CommandModal from '@/components/CommandModal';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen(true);
      }
      if (event.key === 'Escape') {
        setCommandOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      id="app" 
      className={`noise min-h-screen bg-oled font-sans text-white selection:bg-cyan selection:text-black ${
        sidebarCollapsed ? 'sidebar-collapsed' : ''
      } ${
        commandOpen ? 'command-open' : ''
      }`}
    >
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan/10 blur-[120px]"></div>
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-white/[0.035] blur-[90px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.18]"></div>
      </div>

      <Sidebar onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <div id="main-area" className="relative ml-[284px] min-h-screen transition-all duration-300 ease-out z-10">
        <Header onOpenCommand={() => setCommandOpen(true)} />
        <main className="relative px-8 py-8">
          {children}
        </main>
      </div>

      <CommandModal isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
    </div>
  );
}
