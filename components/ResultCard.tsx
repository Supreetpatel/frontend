import { ResultData } from "@/app/add-event/page";
import {
  AlertTriangle,
  Info,
  CheckCircle2,
  Calendar,
  MapPin,
  Lightbulb,
  Terminal,
} from "lucide-react";

interface ResultCardProps {
  data: ResultData;
}

export default function ResultCard({ data }: ResultCardProps) {
  const hasTimeAndVenueClash =
    data.clash_breakdown.time_overlap > 0 && data.clash_breakdown.venue > 0;

  // Dynamic color based on severity
  const getSeverityColor = (score: number) => {
    if (score > 70) return "text-red-500 border-red-500/20 bg-red-500/5";
    if (score > 30) return "text-amber-500 border-amber-500/20 bg-amber-500/5";
    return "text-emerald-500 border-emerald-500/20 bg-emerald-500/5";
  };

  const getProgressColor = (score: number) => {
    if (score > 70) return "bg-red-500";
    if (score > 30) return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <div className="animate-in fade-in zoom-in duration-500">
      <div
        className={`relative overflow-hidden backdrop-blur-xl border rounded-4xl shadow-2xl ${
          hasTimeAndVenueClash
            ? "bg-amber-950/25 border-amber-500/35"
            : "bg-[#0b0b16]/80 border-white/8"
        }`}
      >
        {/* Top Header Section */}
        <div
          className={`p-6 border-b flex items-center justify-between ${
            hasTimeAndVenueClash
              ? "border-amber-500/20 bg-amber-500/10"
              : "border-white/5 bg-white/5"
          }`}
        >
          <div className="flex items-center gap-2">
            <Terminal
              size={18}
              className={
                hasTimeAndVenueClash ? "text-amber-300" : "text-violet-400"
              }
            />
            <span
              className={`text-xs font-mono font-bold tracking-[0.2em] uppercase ${
                hasTimeAndVenueClash ? "text-amber-200" : "text-[#8080b0]"
              }`}
            >
              Analysis Results
            </span>
          </div>
          <div
            className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-tighter ${getSeverityColor(data.severity)}`}
          >
            {data.severity > 50 ? "Conflict Detected" : "System Clear"}
          </div>
        </div>

        <div className="p-8">
          {hasTimeAndVenueClash && (
            <div className="mb-4 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-200">
              Warning: Time and venue both clash with the compared event.
            </div>
          )}

          {/* Severity Meter */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-[#8080b0]">
                Event Clash Percentage
              </span>
              <span
                className={`text-3xl font-black ${data.severity > 70 ? "text-red-400" : "text-[#f0eeff]"}`}
              >
                {data.severity}%
              </span>
            </div>
            <p className="text-xs text-[#5a5a7a] mb-3">
              Between your submitted event and{" "}
              <b className="text-[#a0a0c0]">{data.conflicting_event.name}</b>
            </p>
            <div className="h-2 w-full bg-[#16162e] rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ease-out ${getProgressColor(data.severity)}`}
                style={{ width: `${data.severity}%` }}
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg border border-violet-500/10 bg-violet-950/20 px-3 py-2 text-[#9090c0]">
                Time overlap: {data.clash_breakdown.time_overlap}%
              </div>
              <div className="rounded-lg border border-violet-500/10 bg-violet-950/20 px-3 py-2 text-[#9090c0]">
                Venue match: {data.clash_breakdown.venue}%
              </div>
              <div className="rounded-lg border border-violet-500/10 bg-violet-950/20 px-3 py-2 text-[#9090c0]">
                Organizer match: {data.clash_breakdown.organizer}%
              </div>
              <div className="rounded-lg border border-violet-500/10 bg-violet-950/20 px-3 py-2 text-[#9090c0]">
                Name similarity: {data.clash_breakdown.semantic}%
              </div>
            </div>
          </div>

          {/* Conflicting Event Details */}
          <div
            className={`rounded-2xl p-5 border mb-6 ${
              hasTimeAndVenueClash
                ? "bg-amber-500/10 border-amber-500/25"
                : "bg-[#0d0d1e]/60 border-white/6"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-2 rounded-lg ${
                  hasTimeAndVenueClash ? "bg-amber-500/15" : "bg-violet-900/40"
                }`}
              >
                <AlertTriangle
                  className={
                    hasTimeAndVenueClash
                      ? "text-amber-300"
                      : data.severity > 50
                        ? "text-amber-500"
                        : "text-slate-500"
                  }
                  size={20}
                />
              </div>
              <div>
                <h3 className="text-[#f0eeff] font-bold text-lg mb-1">
                  {data.conflicting_event.name}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-[#7070a0]">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} /> {data.conflicting_event.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} /> {data.conflicting_event.venue}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Reason Section */}
          <div className="flex gap-3 mb-8">
            <Info className="text-violet-400 shrink-0" size={20} />
            <p className="text-[#a0a0c0] leading-relaxed italic">
              {data.reason}
            </p>
          </div>

          {/* Suggestions Section */}
          {data.suggestions.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest">
                <Lightbulb size={16} />
                Strategic Alternatives
              </div>
              <div className="grid gap-2">
                {data.suggestions.map((s: string, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-violet-500/5 border border-violet-500/10 rounded-xl text-[#b0b0d0] hover:bg-violet-500/10 transition-colors cursor-default group"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-emerald-500 opacity-50 group-hover:opacity-100"
                    />
                    <span className="text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
