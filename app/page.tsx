import Link from "next/link";
import {
  ShieldAlert,
  Zap,
  CalendarClock,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#04040a] text-[#e8e4ff] selection:bg-violet-500/30 font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/4 bg-[#04040a]/75 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 font-black text-xl tracking-tighter text-white">
            <div className="bg-linear-to-br from-violet-500 to-purple-700 p-1.5 rounded-xl shadow-[0_0_18px_rgba(139,92,246,0.5)]">
              <Layers size={18} className="text-white" />
            </div>
            <span>
              Clash
              <span className="bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Sync
              </span>
            </span>
          </div>
          <Link href="/add-event">
            <button className="text-sm font-bold bg-linear-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 text-white px-5 py-2.5 rounded-full transition-all shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_32px_rgba(139,92,246,0.55)] cursor-pointer">
              Add Event
            </button>
          </Link>
        </div>
      </nav>

      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-12%] left-[8%] w-175 h-175 bg-violet-700/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-15%] right-[5%] w-150 h-150 bg-fuchsia-700/8 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] right-[30%] w-87.5 h-87.5 bg-purple-900/10 rounded-full blur-[100px]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-size-[80px_80px]" />
      </div>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-44 pb-28">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow badge */}
          <div className="mb-9 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/25 bg-violet-500/8 text-violet-300 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
            <Sparkles size={11} />
            AI-Powered Conflict Detection
          </div>

          <h1 className="text-6xl md:text-[5.5rem] font-black tracking-tighter mb-8 leading-[1.05] text-[#f0eeff]">
            Master your schedule. <br />
            <span className="bg-linear-to-r from-violet-400 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent">
              Eliminate the overlap.
            </span>
          </h1>

          <p className="text-[#6e6e9a] mb-12 max-w-xl text-lg md:text-xl leading-relaxed">
            The intelligent clash detection system that predicts scheduling
            conflicts before they happen, ensuring your team stays in sync
            globally.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/add-event">
              <button className="group flex items-center gap-2.5 px-9 py-4 bg-linear-to-r from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600 text-white rounded-2xl font-bold transition-all shadow-[0_0_50px_rgba(139,92,246,0.35)] hover:shadow-[0_0_70px_rgba(139,92,246,0.55)] cursor-pointer">
                Initialize System
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </Link>
          </div>
        </div>

        {/* Features Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-28">
          <FeatureCard
            title="Real-time Detection"
            desc="Instant conflict alerts as you type, powered by our sub-second latency engine."
            icon={<Zap className="text-amber-400" size={22} />}
            iconBg="bg-amber-500/10 border-amber-500/25"
            hoverColor="group-hover:text-amber-300"
          />
          <FeatureCard
            title="Clash Severity"
            desc="Sophisticated scoring that analyzes attendee priority and meeting urgency."
            icon={<ShieldAlert className="text-rose-400" size={22} />}
            iconBg="bg-rose-500/10 border-rose-500/25"
            hoverColor="group-hover:text-rose-300"
          />
          <FeatureCard
            title="Optimal Windows"
            desc="Automated rescheduling logic that finds the golden hour for all timezones."
            icon={<CalendarClock className="text-emerald-400" size={22} />}
            iconBg="bg-emerald-500/10 border-emerald-500/25"
            hoverColor="group-hover:text-emerald-300"
          />
        </section>
      </main>
    </div>
  );
}

function FeatureCard({
  title,
  desc,
  icon,
  iconBg,
  hoverColor,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  iconBg: string;
  hoverColor: string;
}) {
  return (
    <div className="group relative p-8 rounded-3xl border border-white/5.5 bg-[#0b0b16]/70 backdrop-blur-md hover:border-violet-500/25 transition-all duration-500 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-violet-600/0 to-transparent group-hover:from-violet-600/4 transition-all duration-500 rounded-3xl" />
      <div
        className={`relative mb-6 p-3 inline-block rounded-xl border ${iconBg}`}
      >
        {icon}
      </div>
      <h3
        className={`relative text-xl font-bold mb-3 text-[#f0eeff] transition-colors ${hoverColor}`}
      >
        {title}
      </h3>
      <p className="relative text-[#6e6e9a] leading-relaxed">{desc}</p>
    </div>
  );
}
