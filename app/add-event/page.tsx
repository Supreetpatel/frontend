"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  CalendarPlus,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import EventForm from "../../components/EventForm";
import ResultCard from "../../components/ResultCard";

export interface ResultData {
  conflicting_event: {
    id: number;
    name: string;
    date: string;
    start_time: string;
    end_time: string;
    venue: string;
    organizer?: string;
    category?: string;
  };
  severity: number;
  reason: string;
  suggestions: string[];
}

export default function AddEventPage() {
  const [result, setResult] = useState<ResultData | null>(null);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30 font-sans pb-20">
      {/* Background Decor - Matches Landing Page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-100 h-100 bg-indigo-600/5 rounded-full blur-[120px]" />
      </div>

      {/* Header / Navigation */}
      <header className="relative z-10 max-w-5xl mx-auto px-6 pt-10 mb-12 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
        >
          <ChevronLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Terminal
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 text-slate-400 text-xs font-mono">
          <LayoutDashboard size={14} />
          SYSTEM_NODE: EVENT_ENTRY
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Title Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600/20 rounded-2xl border border-blue-500/30">
              <CalendarPlus className="text-blue-400" size={28} />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white">
              Schedule New Event
            </h1>
          </div>
          <p className="text-slate-400 text-lg">
            Enter your event details below. Our AI will analyze global schedules
            to detect potential synchronization conflicts.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle glow inside the card */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-3xl rounded-full" />

          <div className="relative z-10">
            <EventForm
              onResult={(data: unknown) => setResult(data as ResultData)}
            />
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-2 mb-6 px-2">
              <Sparkles size={20} className="text-blue-400" />
              <h2 className="font-bold text-white uppercase tracking-widest text-sm">
                Clash Analysis Report
              </h2>
            </div>
            <div className="bg-linear-to-b from-slate-800/50 to-transparent p-px rounded-4xl">
              <div className="bg-[#020617] rounded-4xl overflow-hidden">
                <ResultCard data={result} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
