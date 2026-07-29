import { useApp } from "../App";
import { chapters } from "../data/standards";
import { isHighRiskElement } from "../lib/inspectorRisk";
import {
  Eye,
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  Award,
  ChevronRight,
  ArrowRight,
  Building2,
  Shield,
  Activity,
  ClipboardList,
  ShieldAlert,
} from "lucide-react";

const chapterGradients: Record<string, string> = {
  aac: "from-blue-500 to-blue-700",
  cop: "from-emerald-500 to-emerald-700",
  mom: "from-violet-500 to-violet-700",
  pre: "from-amber-500 to-amber-700",
  ipc: "from-teal-500 to-teal-700",
  psq: "from-rose-500 to-rose-700",
  rom: "from-indigo-500 to-indigo-700",
  fms: "from-orange-500 to-orange-700",
  hrm: "from-cyan-500 to-cyan-700",
  ims: "from-slate-500 to-slate-700",
};

const chapterBg: Record<string, string> = {
  aac: "bg-blue-50 border-blue-200",
  cop: "bg-emerald-50 border-emerald-200",
  mom: "bg-violet-50 border-violet-200",
  pre: "bg-amber-50 border-amber-200",
  ipc: "bg-teal-50 border-teal-200",
  psq: "bg-rose-50 border-rose-200",
  rom: "bg-indigo-50 border-indigo-200",
  fms: "bg-orange-50 border-orange-200",
  hrm: "bg-cyan-50 border-cyan-200",
  ims: "bg-slate-50 border-slate-200",
};

const scoreColor = (pct: number) => {
  if (pct >= 80) return "text-green-600";
  if (pct >= 60) return "text-amber-600";
  if (pct > 0) return "text-red-500";
  return "text-gray-400";
};

const progressColor = (pct: number) => {
  if (pct >= 80) return "bg-green-500";
  if (pct >= 60) return "bg-amber-500";
  if (pct > 0) return "bg-red-400";
  return "bg-gray-200";
};

export default function Dashboard() {
  const { navigate, assessment } = useApp();
  const stats = assessment.getOverallStats();
  const readiness = assessment.getReadinessLevel();
  const { session } = assessment;

  const readinessConfig: Record<string, { bg: string; text: string; border: string; icon: string }> = {
    gray: { bg: "bg-gray-100", text: "text-gray-600", border: "border-gray-200", icon: "⏳" },
    green: { bg: "bg-green-100", text: "text-green-700", border: "border-green-200", icon: "✅" },
    blue: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200", icon: "🎯" },
    amber: { bg: "bg-amber-100", text: "text-amber-700", border: "border-amber-200", icon: "⚡" },
    red: { bg: "bg-red-100", text: "text-red-700", border: "border-red-200", icon: "⚠️" },
  };

  const rc = readinessConfig[readiness.color];

  const chapterRisk = chapters
    .map((ch) => {
      const els = ch.standards.flatMap((s) => s.elements);
      const count = els.filter((e) => isHighRiskElement(e, session.elements[e.id])).length;
      return { chapter: ch, count, total: els.length };
    })
    .filter((r) => r.count > 0)
    .sort((a, b) => b.count - a.count);
  const totalHighRisk = chapterRisk.reduce((sum, r) => sum + r.count, 0);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {session.hospitalName ? `${session.hospitalName}` : "NABH Assessment Dashboard"}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {session.hospitalName
              ? `${session.city}${session.state ? ", " + session.state : ""} • NABH Eye Care Standards 2nd Edition`
              : "NABH Accreditation Standards for Eye Care Organisations — 2nd Edition (Effective Jan 2026)"}
          </p>
        </div>
        {!session.hospitalName && (
          <button
            onClick={() => navigate("setup")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Building2 className="w-4 h-4" />
            Setup Hospital
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Readiness Banner */}
      <div className={`rounded-2xl border ${rc.border} ${rc.bg} p-5 flex flex-col sm:flex-row sm:items-center gap-4`}>
        <div className="text-3xl">{rc.icon}</div>
        <div className="flex-1">
          <div className={`font-bold text-lg ${rc.text}`}>{readiness.level}</div>
          <div className={`text-sm ${rc.text} opacity-80`}>{readiness.description}</div>
        </div>
        <div className="flex gap-6">
          <div className="text-center">
            <div className={`text-2xl font-bold ${rc.text}`}>{stats.overallPercentage}%</div>
            <div className={`text-xs ${rc.text} opacity-70`}>Score</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${rc.text}`}>{stats.completionPercentage}%</div>
            <div className={`text-xs ${rc.text} opacity-70`}>Complete</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${rc.text}`}>{stats.coreCompliancePercentage}%</div>
            <div className={`text-xs ${rc.text} opacity-70`}>CORE</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Elements"
          value={stats.totalElements.toString()}
          sub="302 per NABH standard"
          icon={<ClipboardList className="w-5 h-5 text-blue-600" />}
          bg="bg-blue-50"
        />
        <StatCard
          label="Assessed"
          value={stats.assessedElements.toString()}
          sub={`${stats.totalElements - stats.assessedElements} remaining`}
          icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
          bg="bg-green-50"
        />
        <StatCard
          label="Compliant"
          value={stats.compliant.toString()}
          sub={`${stats.partial} partial • ${stats.nonCompliant} non-compliant`}
          icon={<Shield className="w-5 h-5 text-emerald-600" />}
          bg="bg-emerald-50"
        />
        <StatCard
          label="CORE Compliant"
          value={`${stats.coreCompliant}/${stats.coreTotal}`}
          sub="Mandatory elements"
          icon={<Award className="w-5 h-5 text-amber-600" />}
          bg="bg-amber-50"
        />
      </div>

      {/* Inspector Watch panel */}
      {totalHighRisk > 0 && (
        <div className="bg-white rounded-2xl border border-fuchsia-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-fuchsia-600" />
              <span className="text-sm font-semibold text-gray-700">Inspector Watch — where NCs usually happen</span>
            </div>
            <span className="text-xs text-gray-400">{totalHighRisk} elements flagged</span>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            These are CORE gaps, elements marked compliant without evidence, and requirements
            historically verified by staff interview, walk-through, or record sampling — not
            just paperwork. Review these before your next assessment.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {chapterRisk.slice(0, 6).map(({ chapter, count, total }) => (
              <button
                key={chapter.id}
                onClick={() => navigate("assessment", chapter.id)}
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-fuchsia-100 bg-fuchsia-50 hover:bg-fuchsia-100 transition-colors text-left"
              >
                <span className="text-xs font-medium text-fuchsia-800 truncate">{chapter.code}</span>
                <span className="text-[10px] font-bold text-fuchsia-600 flex-shrink-0">{count}/{total}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Progress bar overall */}
      {stats.assessedElements > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">Compliance Breakdown</span>
            </div>
            <span className="text-xs text-gray-400">{stats.assessedElements} assessed elements</span>
          </div>
          <div className="flex h-4 rounded-full overflow-hidden gap-px">
            {stats.compliant > 0 && (
              <div
                className="bg-green-500 transition-all duration-500"
                style={{ width: `${(stats.compliant / stats.assessedElements) * 100}%` }}
                title={`Compliant: ${stats.compliant}`}
              />
            )}
            {stats.partial > 0 && (
              <div
                className="bg-amber-400 transition-all duration-500"
                style={{ width: `${(stats.partial / stats.assessedElements) * 100}%` }}
                title={`Partial: ${stats.partial}`}
              />
            )}
            {stats.nonCompliant > 0 && (
              <div
                className="bg-red-400 transition-all duration-500"
                style={{ width: `${(stats.nonCompliant / stats.assessedElements) * 100}%` }}
                title={`Non-compliant: ${stats.nonCompliant}`}
              />
            )}
          </div>
          <div className="flex gap-4 mt-3">
            <LegendItem color="bg-green-500" label="Compliant" count={stats.compliant} />
            <LegendItem color="bg-amber-400" label="Partial" count={stats.partial} />
            <LegendItem color="bg-red-400" label="Non-Compliant" count={stats.nonCompliant} />
            <LegendItem color="bg-gray-200" label="Not Assessed" count={stats.notAssessed} />
          </div>
        </div>
      )}

      {/* Chapter Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Eye className="w-4 h-4 text-gray-400" />
            Assessment Chapters
          </h2>
          <span className="text-xs text-gray-400">10 chapters • Click to assess</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {chapters.map((ch) => {
            const progress = assessment.getChapterProgress(ch.id);
            const pct = progress.assessed > 0
              ? Math.round((progress.assessed / progress.total) * 100)
              : 0;
            const scorePct = progress.percentage;

            return (
              <button
                key={ch.id}
                onClick={() => navigate("assessment", ch.id)}
                className={`text-left rounded-xl border p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 ${chapterBg[ch.id]}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`px-2 py-0.5 rounded-lg bg-gradient-to-r ${chapterGradients[ch.id]} text-white text-xs font-bold`}>
                    {ch.code}
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
                <div className="font-semibold text-gray-800 text-sm leading-tight mb-1">{ch.name}</div>
                <div className="text-xs text-gray-500 mb-3 line-clamp-2">{ch.fullName}</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{progress.assessed}/{progress.total} assessed</span>
                    {scorePct > 0 && (
                      <span className={`font-semibold ${scoreColor(scorePct)}`}>{scorePct}% score</span>
                    )}
                  </div>
                  <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${progressColor(scorePct)}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] rounded-2xl p-6 text-white">
        <h3 className="font-semibold mb-1">Quick Actions</h3>
        <p className="text-blue-200/70 text-sm mb-4">Get started with your NABH assessment journey</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => navigate("setup")}
            className="flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-all"
          >
            <Building2 className="w-4 h-4 text-blue-300" />
            Hospital Setup
          </button>
          <button
            onClick={() => navigate("assessment", "aac")}
            className="flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-all"
          >
            <ClipboardList className="w-4 h-4 text-blue-300" />
            Start Assessment
          </button>
          <button
            onClick={() => navigate("reports")}
            className="flex items-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm font-medium transition-all"
          >
            <TrendingUp className="w-4 h-4 text-blue-300" />
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, icon, bg }: {
  label: string; value: string; sub: string; icon: ReactNode; bg: string;
}) {
  return (
    <div className={`${bg} rounded-2xl border border-white p-4 shadow-sm`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500">{label}</span>
        <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">{icon}</div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
    </div>
  );
}

function LegendItem({ color, label, count }: { color: string; label: string; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-2.5 h-2.5 rounded-sm ${color}`} />
      <span className="text-xs text-gray-500">{label} ({count})</span>
    </div>
  );
}

// Add ReactNode to imports
import { ReactNode } from "react";
