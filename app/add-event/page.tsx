"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  CalendarPlus,
  LayoutDashboard,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";
import EventForm from "../../components/EventForm";
import ResultCard from "../../components/ResultCard";

const RESULT_STORAGE_KEY = "latest-clash-analysis";

export interface EventData {
  id: number;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  venue: string;
  organizer?: string;
  category?: string;
}

export interface ResultData {
  conflicting_event: EventData;
  severity: number;
  reason: string;
  suggestions: string[];
  clash_breakdown: {
    time_overlap: number;
    venue: number;
    organizer: number;
    semantic: number;
    total: number;
  };
  clash_candidates: {
    event_id: number;
    severity: number;
    reason: string;
    clash_breakdown: {
      time_overlap: number;
      venue: number;
      organizer: number;
      semantic: number;
      total: number;
    };
  }[];
}

export default function AddEventPage() {
  const [result, setResult] = useState<ResultData | null>(null);
  const [events, setEvents] = useState<EventData[]>([]);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch("/api/events", { cache: "no-store" });
      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as EventData[];
      setEvents(Array.isArray(data) ? data : []);
    } catch {
      setEvents([]);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadStoredResult = async () => {
      const savedResult = window.localStorage.getItem(RESULT_STORAGE_KEY);
      if (!savedResult || !isMounted) {
        return;
      }

      try {
        const parsedResult = JSON.parse(savedResult) as ResultData;
        if (isMounted) {
          setResult(parsedResult);
        }
      } catch {
        window.localStorage.removeItem(RESULT_STORAGE_KEY);
      }
    };

    const loadEvents = async () => {
      try {
        const response = await fetch("/api/events", { cache: "no-store" });
        if (!response.ok || !isMounted) {
          return;
        }

        const data = (await response.json()) as EventData[];
        if (isMounted) {
          setEvents(Array.isArray(data) ? data : []);
        }
      } catch {
        if (isMounted) {
          setEvents([]);
        }
      }
    };

    void loadStoredResult();
    void loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleResult = useCallback(
    (data: ResultData) => {
      setResult(data);
      window.localStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(data));

      if (data.reason === "No Clash") {
        fetchEvents();
      }
    },
    [fetchEvents],
  );

  const clashPercentageByEventId = useMemo(() => {
    const clashMap = new Map<number, number>();

    for (const candidate of result?.clash_candidates ?? []) {
      clashMap.set(candidate.event_id, candidate.severity);
    }

    return clashMap;
  }, [result]);

  return (
    <div className="min-h-screen bg-[#04040a] text-[#e8e4ff] selection:bg-violet-500/30 font-sans pb-20">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-violet-700/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-100 h-100 bg-fuchsia-700/8 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.016)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.016)_1px,transparent_1px)] bg-size-[80px_80px]" />
      </div>

      {/* Header / Navigation */}
      <header className="relative z-10 max-w-7xl mx-auto px-6 pt-10 mb-12 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 text-[#6e6e9a] hover:text-[#f0eeff] transition-colors text-sm font-medium"
        >
          <ChevronLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Terminal
        </Link>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/6 bg-white/4 text-[#6e6e9a] text-xs font-mono tracking-wider">
          <LayoutDashboard size={14} />
          SYSTEM_NODE: EVENT_ENTRY
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Title Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-violet-600/20 rounded-2xl border border-violet-500/30 shadow-[0_0_24px_rgba(139,92,246,0.2)]">
              <CalendarPlus className="text-violet-400" size={28} />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-[#f0eeff]">
              Schedule New Event
            </h1>
          </div>
          <p className="text-[#6e6e9a] text-lg leading-relaxed">
            Enter your event details below. Our AI will analyze global schedules
            to detect potential synchronization conflicts.
          </p>
        </div>

        {/* Two-column layout: Form (left) + Clash Report (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT — Event Form */}
          <div className="bg-[#0b0b16]/65 backdrop-blur-xl border border-white/7 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden ring-1 ring-inset ring-white/4 flex flex-col">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-500/10 blur-3xl rounded-full" />
            <div className="relative z-10 flex-1 flex flex-col">
              <EventForm onResult={handleResult} />
            </div>
          </div>

          {/* RIGHT — Clash Analysis Report */}
          <div className="flex flex-col">
            {result ? (
              <div className="animate-in fade-in slide-in-from-right-4 duration-700 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-5 px-1">
                  <Sparkles size={20} className="text-violet-400" />
                  <h2 className="font-bold text-[#f0eeff] uppercase tracking-widest text-sm">
                    Clash Analysis Report
                  </h2>
                </div>
                <div className="bg-linear-to-b from-violet-900/20 to-transparent p-px rounded-4xl flex-1">
                  <div className="bg-[#04040a] rounded-4xl overflow-hidden h-full">
                    <ResultCard data={result} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 rounded-[2.5rem] border border-dashed border-white/8 bg-white/[0.01]">
                <Sparkles size={32} className="text-violet-500/40" />
                <p className="text-[#6e6e9a] text-sm max-w-[200px] leading-relaxed">
                  Submit an event to see the clash analysis here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom — All Stored Events */}
        <div className="mt-14 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-2 mb-6 px-1">
            <Sparkles size={20} className="text-violet-400" />
            <h2 className="font-bold text-[#f0eeff] uppercase tracking-widest text-sm">
              All Stored Events
            </h2>
          </div>

          <div className="bg-[#0b0b16]/65 backdrop-blur-xl border border-white/7 rounded-3xl p-5 md:p-6 ring-1 ring-inset ring-white/3">
            {events.length === 0 ? (
              <p className="text-[#6e6e9a] text-sm">No events stored yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {events.map((event) => {
                  const clashPct = clashPercentageByEventId.get(event.id) ?? 0;
                  const hasClash = clashPct > 0;
                  return (
                    <div
                      key={event.id}
                      className={`rounded-xl border px-4 py-3 transition-colors ${
                        hasClash
                          ? "border-red-500/40 bg-red-950/30"
                          : "border-white/10 bg-slate-950/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3
                          className={`font-semibold truncate ${hasClash ? "text-red-200" : "text-white"}`}
                        >
                          {event.name}
                        </h3>
                        <span
                          className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-md border ${
                            hasClash
                              ? "text-red-300 bg-red-500/15 border-red-500/30"
                              : "text-violet-300 bg-violet-500/10 border-violet-500/20"
                          }`}
                        >
                          Clash: {clashPct}%
                        </span>
                      </div>
                      <div
                        className={`mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs ${hasClash ? "text-red-300/70" : "text-slate-400"}`}
                      >
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} /> {event.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={13} /> {event.start_time} –{" "}
                          {event.end_time}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} /> {event.venue}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
