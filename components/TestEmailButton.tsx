"use client";

import { useState } from "react";
import { Loader2, Mail } from "lucide-react";

export function TestEmailButton({ email, firstName }: { email?: string, firstName?: string | null }) {
  const [loading, setLoading] = useState(false);

  const handleTestEmail = async () => {
    if (!email) {
      alert("No email found for current user.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/email/welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: email, userName: firstName }),
      });
      if (res.ok) {
        alert("Email sent!");
      } else {
        const data = await res.json();
        alert("Failed to send: " + (data.error || "Unknown error"));
      }
    } catch (err: any) {
      alert("Failed to send: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleTestEmail}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 transition-all font-medium text-sm"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
      Test Welcome Email
    </button>
  );
}
