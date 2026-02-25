"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { ResultData } from "@/app/add-event/page";
import {
  Type,
  Calendar,
  Clock,
  MapPin,
  User,
  Tag,
  SendHorizontal,
  Loader2,
} from "lucide-react";

interface EventFormProps {
  onResult: (data: ResultData) => void;
}

interface EventFormData {
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  venue: string;
  organizer?: string;
  category?: string;
}

const initialForm: EventFormData = {
  name: "",
  date: "",
  start_time: "",
  end_time: "",
  venue: "",
  organizer: "",
  category: "",
};

export default function EventForm({ onResult }: EventFormProps) {
  const [form, setForm] = useState<EventFormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [toast]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);
    try {
      const res = await axios.post<ResultData>("/api/add-event", form);
      onResult(res.data);

      const eventStored = res.data.reason === "No Clash";

      if (eventStored) {
        setForm(initialForm);
      }

      setToast({
        type: eventStored ? "success" : "error",
        message: eventStored
          ? "Event stored successfully. Form has been reset."
          : "Conflict detected. Event was not stored.",
      });
    } catch (err) {
      console.error(err);
      setToast({
        type: "error",
        message: "Failed to submit event. Please check backend connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`rounded-xl border px-4 py-3 text-sm ${
            toast.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              : "border-red-500/30 bg-red-500/10 text-red-300"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Event Name */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
          <Type size={18} />
        </div>
        <input
          name="name"
          placeholder="Event Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all"
        />
      </div>

      {/* Date & Time Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="date"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-400"
          >
            Date
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400">
              <Calendar size={18} />
            </div>
            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all scheme-dark [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-80 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="start_time"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-400"
          >
            Start Time
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400">
              <Clock size={18} />
            </div>
            <input
              id="start_time"
              name="start_time"
              type="time"
              value={form.start_time}
              onChange={handleChange}
              required
              className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all scheme-dark [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-80 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="end_time"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-400"
          >
            End Time
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400">
              <Clock size={18} />
            </div>
            <input
              id="end_time"
              name="end_time"
              type="time"
              value={form.end_time}
              onChange={handleChange}
              required
              className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all scheme-dark [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-80 hover:[&::-webkit-calendar-picker-indicator]:opacity-100"
            />
          </div>
        </div>
      </div>

      {/* Venue */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400">
          <MapPin size={18} />
        </div>
        <input
          name="venue"
          placeholder="Venue / Location"
          value={form.venue}
          onChange={handleChange}
          required
          className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
        />
      </div>

      {/* Organizer & Category Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400">
            <User size={18} />
          </div>
          <input
            name="organizer"
            placeholder="Organizer"
            value={form.organizer}
            onChange={handleChange}
            className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
          />
        </div>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400">
            <Tag size={18} />
          </div>
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full group relative flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden cursor-pointer"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <>
            <span>Analyze for Clashes</span>
            <SendHorizontal
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </>
        )}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
      </button>

      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </form>
  );
}
