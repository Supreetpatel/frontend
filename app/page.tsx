import Link from "next/link";
import {
  ShieldAlert,
  Zap,
  CalendarClock,
  ArrowRight,
  Layers,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-white">
            <div className="bg-blue-600 p-1 rounded-lg">
              <Layers size={20} className="text-white" />
            </div>
            <span>
              Clash<span className="text-blue-500">Sync</span>
            </span>
          </div>
          <Link href="/add-event">
            <button className="text-sm font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-slate-200 transition cursor-pointer">
              Add Event
            </button>
          </Link>
        </div>
      </nav>

      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-125 h-125 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
            Master your schedule. <br />
            <span className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Eliminate the overlap.
            </span>
          </h1>

          <p className="text-slate-400 mb-10 max-w-2xl text-lg md:text-xl leading-relaxed">
            The intelligent clash detection system that predicts scheduling
            conflicts before they happen, ensuring your team stays in sync
            globally.
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <Link href="/add-event">
              <button className="group flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all shadow-[0_0_40px_rgba(37,99,235,0.2)] cursor-pointer">
                Initialize System
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-32 border-y border-white/5 py-12">
          {[
            { label: "Precision Rate", value: "99.9%" },
            { label: "Sync Latency", value: "< 12ms" },
            { label: "Active Nodes", value: "2.4k" },
            { label: "Clashes Prevented", value: "1.2M" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <FeatureCard
            title="Real-time Detection"
            desc="Instant conflict alerts as you type, powered by our sub-second latency engine."
            icon={<Zap className="text-amber-400" />}
          />
          <FeatureCard
            title="Clash Severity"
            desc="Sophisticated scoring that analyzes attendee priority and meeting urgency."
            icon={<ShieldAlert className="text-red-400" />}
          />
          <FeatureCard
            title="Optimal Windows"
            desc="Automated rescheduling logic that finds the 'golden hour' for all timezones."
            icon={<CalendarClock className="text-emerald-400" />}
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
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group p-10 rounded-4xl border border-slate-800 bg-slate-900/40 backdrop-blur-md hover:border-blue-500/50 transition-all duration-500">
      <div className="mb-6 p-3 bg-slate-950 inline-block rounded-xl border border-white/5">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 leading-relaxed text-lg">{desc}</p>
    </div>
  );
}
