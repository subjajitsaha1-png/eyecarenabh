import { useApp } from "../App";
import { chapters, Category, ComplianceStatus } from "../data/standards";
import {
  BarChart3,
  Download,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Circle,
  Award,
  TrendingUp,
  AlertTriangle,
  Eye,
  ChevronRight,
  FileText,
  Shield,
} from "lucide-react";

const chapterGradients: Record<string, string> = {
  aac: "from-blue-500 to-blue-600",
  cop: "from-emerald-500 to-emerald-600",
  mom: "from-violet-500 to-violet-600",
  pre: "from-amber-500 to-amber-600",
  ipc: "from-teal-500 to-teal-600",
  psq: "from-rose-500 to-rose-600",
  rom: "from-indigo-500 to-indigo-600",
  fms: "from-orange-500 to-orange-600",
  hrm: "from-cyan-500 to-cyan-600",
  ims: "from-slate-500 to-slate-600",
};

const statusIcons: Record<ComplianceStatus, React.ReactNode> = {
  compliant: <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />,
  partial: <MinusCircle className="w-3.5 h-3.5 text-amber-500" />,
  "non-compliant": <XCircle className="w-3.5 h-3.5 text-red-500" />,
  "not-assessed": <Circle className="w-3.5 h-3.5 text-gray-300" />,
};

function ScoreBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function getScoreColor(pct: number) {
  if (pct >= 80) return { bar: "bg-green-500", text: "text-green-700", bg: "bg-green-50", badge: "bg-green-100 text-green-700" };
  if (pct >= 60) return { bar: "bg-amber-400", text: "text-amber-700", bg: "bg-amber-50", badge: "bg-amber-100 text-amber-700" };
  if (pct > 0) return { bar: "bg-red-400", text: "text-red-600", bg: "bg-red-50", badge: "bg-red-100 text-red-600" };
  return { bar: "bg-gray-200", text: "text-gray-400", bg: "bg-gray-50", badge: "bg-gray-100 text-gray-500" };
}

function getReadinessLabel(pct: number) {
  if (pct >= 80) return "Ready";
  if (pct >= 60) return "Developing";
  if (pct > 0) return "Needs Work";
  return "Not Started";
}

export default function Reports() {
  const { navigate, assessment } = useApp();
  const { session } = assessment;
  const stats = assessment.getOverallStats();
  const readiness = assessment.getReadinessLevel();

  // Chapter-level detailed stats
  const chapterReports = chapters.map((ch) => {
    const allElements = ch.standards.flatMap((s) => s.elements);
    const coreElements = allElements.filter((e) => e.category === "CORE");
    let compliant = 0, partial = 0, nonCompliant = 0, notAssessed = 0;
    let coreCompliant = 0, coreNonCompliant = 0;
    let totalScore = 0;
    let assessedCount = 0;

    allElements.forEach((el) => {
      const a = session.elements[el.id];
      const status = a?.status || "not-assessed";
      if (status === "not-assessed") { notAssessed++; return; }
      assessedCount++;
      totalScore += a.score || 0;
      if (status === "compliant") { compliant++; if (el.category === "CORE") coreCompliant++; }
      else if (status === "partial") partial++;
      else if (status === "non-compliant") { nonCompliant++; if (el.category === "CORE") coreNonCompliant++; }
    });

    const maxScore = assessedCount * 10;
    const pct = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

    return {
      chapter: ch,
      total: allElements.length,
      assessed: assessedCount,
      compliant,
      partial,
      nonCompliant,
      notAssessed,
      coreTotal: coreElements.length,
      coreCompliant,
      coreNonCompliant,
      totalScore,
      maxScore,
      pct,
    };
  });

  // Find gaps - non-compliant CORE elements
  const coreGaps: { chapterCode: string; elementCode: string; text: string; }[] = [];
  chapters.forEach((ch) => {
    ch.standards.forEach((std) => {
      std.elements.forEach((el) => {
        if (el.category === "CORE") {
          const a = session.elements[el.id];
          if (a?.status === "non-compliant") {
            coreGaps.push({ chapterCode: ch.code, elementCode: el.code, text: el.text });
          }
        }
      });
    });
  });

  // Find partial elements
  const partialItems: { chapterCode: string; elementCode: string; text: string; remarks: string }[] = [];
  chapters.forEach((ch) => {
    ch.standards.forEach((std) => {
      std.elements.forEach((el) => {
        const a = session.elements[el.id];
        if (a?.status === "partial") {
          partialItems.push({
            chapterCode: ch.code,
            elementCode: el.code,
            text: el.text,
            remarks: a.remarks || "",
          });
        }
      });
    });
  });

  const handlePrint = () => window.print();

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assessment Report</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {session.hospitalName || "Eye Care Organization"} • NABH 2nd Edition • {new Date(session.lastSavedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={assessment.exportData}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export JSON
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
          >
            <FileText className="w-4 h-4" />
            Print Report
          </button>
        </div>
      </div>

      {/* Executive Summary Card */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] rounded-2xl p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-5 h-5 text-sky-400" />
          <h2 className="font-bold text-lg">Executive Summary</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          {[
            { label: "Overall Score", value: `${stats.overallPercentage}%`, sub: `${stats.totalScore}/${stats.maxPossibleScore} pts` },
            { label: "Completion", value: `${stats.completionPercentage}%`, sub: `${stats.assessedElements}/${stats.totalElements} elements` },
            { label: "CORE Compliance", value: `${stats.coreCompliancePercentage}%`, sub: `${stats.coreCompliant}/${stats.coreTotal} elements` },
            { label: "Readiness", value: readiness.level.split(" ")[0], sub: readiness.description },
          ].map((item) => (
            <div key={item.label} className="bg-white/10 rounded-xl p-3">
              <div className="text-xs text-blue-200/60 mb-1">{item.label}</div>
              <div className="text-xl font-bold">{item.value}</div>
              <div className="text-xs text-blue-200/50 mt-0.5">{item.sub}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            <span className="text-green-200">{stats.compliant} Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-amber-200">{stats.partial} Partial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="text-red-200">{stats.nonCompliant} Non-Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-400" />
            <span className="text-gray-300">{stats.notAssessed} Not Assessed</span>
          </div>
        </div>
      </div>

      {/* Chapter-wise Scores */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-600" />
          <h2 className="font-semibold text-gray-800">Chapter-wise Performance</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {chapterReports.map((cr) => {
            const colors = getScoreColor(cr.pct);
            return (
              <div key={cr.chapter.id} className="px-6 py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${chapterGradients[cr.chapter.id]} flex items-center justify-center`}>
                      <span className="text-white text-[10px] font-bold">{cr.chapter.code}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800">{cr.chapter.name}</div>
                      <div className="text-xs text-gray-400">
                        {cr.assessed}/{cr.total} assessed • {cr.coreCompliant}/{cr.coreTotal} CORE compliant
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <span className="flex items-center gap-0.5 text-xs text-green-600">{statusIcons.compliant}{cr.compliant}</span>
                      <span className="flex items-center gap-0.5 text-xs text-amber-500">{statusIcons.partial}{cr.partial}</span>
                      <span className="flex items-center gap-0.5 text-xs text-red-500">{statusIcons["non-compliant"]}{cr.nonCompliant}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-bold ${colors.text}`}>{cr.pct}%</span>
                      <div className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${colors.badge} mt-0.5`}>
                        {getReadinessLabel(cr.pct)}
                      </div>
                    </div>
                    <button
                      onClick={() => navigate("assessment", cr.chapter.id)}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <ScoreBar value={cr.totalScore} max={cr.maxScore || cr.total * 10} color={colors.bar} />
              </div>
            );
          })}
        </div>
      </div>

      {/* CORE Gaps */}
      {coreGaps.length > 0 && (
        <div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-red-100 flex items-center gap-2 bg-red-50">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <h2 className="font-semibold text-red-800">Critical Gaps — Non-Compliant CORE Elements</h2>
            <span className="ml-auto text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">{coreGaps.length} items</span>
          </div>
          <div className="divide-y divide-gray-50">
            {coreGaps.map((gap) => (
              <div key={gap.elementCode} className="px-6 py-3 flex gap-3">
                <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-red-500 font-mono">{gap.elementCode}</span>
                  <p className="text-sm text-gray-700 mt-0.5">{gap.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Partial Items */}
      {partialItems.length > 0 && (
        <div className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-amber-100 flex items-center gap-2 bg-amber-50">
            <MinusCircle className="w-4 h-4 text-amber-600" />
            <h2 className="font-semibold text-amber-800">Partially Compliant Elements</h2>
            <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">{partialItems.length} items</span>
          </div>
          <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
            {partialItems.map((item) => (
              <div key={item.elementCode} className="px-6 py-3 flex gap-3">
                <MinusCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <span className="text-xs font-bold text-amber-600 font-mono">{item.elementCode}</span>
                  <p className="text-sm text-gray-700 mt-0.5 truncate">{item.text}</p>
                  {item.remarks && (
                    <p className="text-xs text-gray-400 mt-0.5 italic">"{item.remarks}"</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accreditation Pathway */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          <h2 className="font-semibold text-gray-800">Accreditation Pathway</h2>
        </div>
        <div className="p-6 space-y-4">
          {[
            {
              phase: "Pre-Assessment",
              desc: "Internal gap analysis; focus on CORE elements",
              criteria: "Minimum 3 months of NABH implementation",
              status: stats.coreCompliancePercentage >= 50 ? "done" : "active",
            },
            {
              phase: "Final Assessment",
              desc: "CORE + Commitment elements assessed by NABH team",
              criteria: "All CORE compliant; strong Commitment compliance",
              status: stats.coreCompliancePercentage >= 90 ? "done" : stats.coreCompliancePercentage >= 50 ? "active" : "pending",
            },
            {
              phase: "Accreditation",
              desc: "Certificate issued; valid for 4 years",
              criteria: "Pass final assessment with required scores",
              status: stats.overallPercentage >= 85 ? "done" : "pending",
            },
            {
              phase: "Surveillance (21-24 months)",
              desc: "Achievement elements assessed mid-cycle",
              criteria: "Maintain compliance; implement improvements",
              status: "pending",
            },
            {
              phase: "Re-accreditation",
              desc: "Excellence elements assessed; full 4-year renewal",
              criteria: "Apply 6 months before expiry",
              status: "pending",
            },
          ].map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.status === "done" ? "bg-green-500 text-white" :
                  step.status === "active" ? "bg-blue-500 text-white" :
                  "bg-gray-100 text-gray-400"
                }`}>
                  {step.status === "done" ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                </div>
                {i < 4 && <div className="w-0.5 h-6 bg-gray-200 mt-1" />}
              </div>
              <div className="pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">{step.phase}</span>
                  {step.status === "active" && (
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-semibold">Current</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{step.desc}</p>
                <p className="text-xs text-gray-400 mt-0.5 italic">{step.criteria}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Plan */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] rounded-2xl p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-sky-400" />
          <h2 className="font-bold">Recommended Action Plan</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-red-300 font-semibold text-sm mb-2">🚨 Immediate (0-30 days)</div>
            <ul className="text-xs text-blue-100/80 space-y-1.5">
              <li>• Address all non-compliant CORE elements</li>
              <li>• Establish missing written policies/SOPs</li>
              <li>• Complete hand hygiene infrastructure</li>
              <li>• Set up incident reporting system</li>
            </ul>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-amber-300 font-semibold text-sm mb-2">⚡ Short-term (1-3 months)</div>
            <ul className="text-xs text-blue-100/80 space-y-1.5">
              <li>• Upgrade partial compliance to full</li>
              <li>• Complete staff training documentation</li>
              <li>• Establish quality committee meetings</li>
              <li>• Implement surgical safety checklist</li>
            </ul>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="text-green-300 font-semibold text-sm mb-2">✅ Medium-term (3-6 months)</div>
            <ul className="text-xs text-blue-100/80 space-y-1.5">
              <li>• Complete all Commitment elements</li>
              <li>• Establish KPI monitoring dashboards</li>
              <li>• Conduct internal mock assessment</li>
              <li>• Apply for NABH formal assessment</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Session Info */}
      <div className="text-xs text-gray-400 text-center py-2">
        Assessment ID: {session.id.slice(0, 8)} • Started: {new Date(session.startedAt).toLocaleDateString()} • Last saved: {new Date(session.lastSavedAt).toLocaleTimeString()} • Assessor: {session.assessorName || "Not specified"}
      </div>
    </div>
  );
}
