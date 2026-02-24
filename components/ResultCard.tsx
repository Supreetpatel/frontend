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
    <div className="max-w-xl mx-auto mt-8 animate-in fade-in zoom-in duration-500">
      <div className="relative overflow-hidden bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-4xl shadow-2xl">
        {/* Top Header Section */}
        <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal size={18} className="text-blue-400" />
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-slate-400 uppercase">
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
          {/* Severity Meter */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-medium text-slate-400">
                Clash Severity
              </span>
              <span
                className={`text-3xl font-black ${data.severity > 70 ? "text-red-500" : "text-white"}`}
              >
                {data.severity}%
              </span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-1000 ease-out ${getProgressColor(data.severity)}`}
                style={{ width: `${data.severity}%` }}
              />
            </div>
          </div>

          {/* Conflicting Event Details */}
          <div className="bg-slate-950/50 rounded-2xl p-5 border border-white/5 mb-6">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-slate-800 rounded-lg">
                <AlertTriangle
                  className={
                    data.severity > 50 ? "text-amber-500" : "text-slate-500"
                  }
                  size={20}
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  {data.conflicting_event.name}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-slate-400">
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
            <Info className="text-blue-400 shrink-0" size={20} />
            <p className="text-slate-300 leading-relaxed italic">
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
                    className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-xl text-slate-300 hover:bg-white/10 transition-colors cursor-default group"
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
