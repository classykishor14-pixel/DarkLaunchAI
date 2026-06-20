"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";

export function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-white" />
              <span className="font-semibold text-lg tracking-tight">DarkLaunch AI</span>
            </Link>
          </div>

          {/* Center: Links */}
          <div className="hidden md:flex items-center justify-center space-x-8 flex-1">
            <Link href="/pricing" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/documentation" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Documentation
            </Link>
            <Link href="/case-studies" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Case Studies
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <UserButton />
              </>
            ) : (
              <SignInButton mode="modal">
                <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                  Get started
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
