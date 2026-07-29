import { useState } from "react";
import { useApp } from "../App";
import { chapters, Standard, ObjectiveElement, Category, ComplianceStatus } from "../data/standards";
import {
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Circle,
  Info,
  Star,
  FileText,
  ChevronLeft,
  ChevronRightIcon,
  BookOpen,
  AlertTriangle,
  ShieldAlert,
} from "lucide-react";
import {
  getInterpretationRiskSignals,
  getSelfAssessmentRiskSignals,
  isHighRiskElement,
} from "../lib/inspectorRisk";

const categoryConfig: Record<Category, { label: string; color: string; bg: string; border: string; description: string }> = {
  CORE: {
    label: "CORE",
    color: "text-red-700",
    bg: "bg-red-100",
    border: "border-red-300",
    description: "Mandatory — assessed at every assessment",
  },
  Commitment: {
    label: "Commitment",
    color: "text-blue-700",
    bg: "bg-blue-100",
    border: "border-blue-300",
    description: "Assessed during final assessment",
  },
  Achievement: {
    label: "Achievement",
    color: "text-purple-700",
    bg: "bg-purple-100",
    border: "border-purple-300",
    description: "Assessed during surveillance",
  },
  Excellence: {
    label: "Excellence",
    color: "text-amber-700",
    bg: "bg-amber-100",
    border: "border-amber-300",
    description: "Assessed during re-accreditation",
  },
};

const statusConfig: Record<ComplianceStatus, {
  label: string; icon: React.ReactNode; color: string; bg: string; border: string; score: number;
}> = {
  compliant: {
    label: "Compliant",
    icon: <CheckCircle2 className="w-4 h-4" />,
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-400",
    score: 10,
  },
  partial: {
    label: "Partial",
    icon: <MinusCircle className="w-4 h-4" />,
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-400",
    score: 5,
  },
  "non-compliant": {
    label: "Non-Compliant",
    icon: <XCircle className="w-4 h-4" />,
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-400",
    score: 0,
  },
  "not-assessed": {
    label: "Not Assessed",
    icon: <Circle className="w-4 h-4" />,
    color: "text-gray-400",
    bg: "bg-gray-50",
    border: "border-gray-300",
    score: 0,
  },
};

interface ElementCardProps {
  element: ObjectiveElement;
  standardCode: string;
  filterCategory: Category | "all";
  filterStatus: ComplianceStatus | "all";
}

function ElementCard({ element, filterCategory, filterStatus }: ElementCardProps) {
  const { assessment } = useApp();
  const [expanded, setExpanded] = useState(false);
  const [showInterpretation, setShowInterpretation] = useState(false);
  const elAssessment = assessment.session.elements[element.id];
  const currentStatus: ComplianceStatus = elAssessment?.status || "not-assessed";
  const catConfig = categoryConfig[element.category];
  const statusCfg = statusConfig[currentStatus];
  const interpSignals = getInterpretationRiskSignals(element.interpretation);
  const selfSignals = getSelfAssessmentRiskSignals(elAssessment);
  const riskSignals = [...interpSignals, ...selfSignals];
  const flagged = isHighRiskElement(element, elAssessment);

  // Filter
  if (filterCategory !== "all" && element.category !== filterCategory) return null;
  if (filterStatus !== "all" && currentStatus !== filterStatus) return null;

  return (
    <div className={`rounded-xl border transition-all duration-200 ${
      currentStatus !== "not-assessed" ? `border-l-4 ${statusCfg.border}` : "border-gray-200"
    } bg-white shadow-sm hover:shadow-md`}>
      {/* Header */}
      <div
        className="flex items-start gap-3 p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-shrink-0 mt-0.5">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${statusCfg.bg}`}>
            <span className={statusCfg.color}>{statusCfg.icon}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-bold text-gray-500 font-mono">{element.code}</span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${catConfig.bg} ${catConfig.color}`}>
              {catConfig.label}
            </span>
            {element.requiresWrittenGuidance && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-600 font-medium flex items-center gap-0.5">
                <FileText className="w-2.5 h-2.5" />
                Written Guidance Req.
              </span>
            )}
            {flagged && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-fuchsia-100 text-fuchsia-700 font-medium flex items-center gap-0.5">
                <ShieldAlert className="w-2.5 h-2.5" />
                Inspector Watch
              </span>
            )}
            {currentStatus !== "not-assessed" && (
              <span className="text-[10px] font-bold text-gray-500 ml-auto">
                Score: {elAssessment?.score || 0}/10
              </span>
            )}
          </div>
          <p className="text-sm text-gray-700 font-medium leading-snug">{element.text}</p>
        </div>
        <div className="flex-shrink-0 text-gray-400">
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </div>
      </div>

      {/* Expanded */}
      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-gray-100 pt-4">
          {/* Interpretation */}
          <div>
            <button
              onClick={() => setShowInterpretation(!showInterpretation)}
              className="flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium mb-2"
            >
              <BookOpen className="w-3.5 h-3.5" />
              {showInterpretation ? "Hide" : "Show"} NABH Interpretation
            </button>
            {showInterpretation && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800 leading-relaxed">
                <div className="font-semibold text-blue-700 mb-1 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  Interpretation
                </div>
                {element.interpretation}
              </div>
            )}
          </div>

          {/* Inspector Watch alerts */}
          {riskSignals.length > 0 && (
            <div className="rounded-lg border border-fuchsia-200 bg-fuchsia-50 p-3 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-fuchsia-700">
                <ShieldAlert className="w-3.5 h-3.5" />
                Where an assessor may catch you out
              </div>
              {riskSignals.map((signal, i) => (
                <div key={i} className="text-xs text-fuchsia-800 leading-relaxed pl-1 border-l-2 border-fuchsia-300">
                  <span className="font-semibold">{signal.tag}: </span>
                  {signal.message}
                </div>
              ))}
            </div>
          )}

          {/* Status Selection */}
          <div>
            <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Compliance Status</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(["compliant", "partial", "non-compliant", "not-assessed"] as ComplianceStatus[]).map((s) => {
                const cfg = statusConfig[s];
                const isSelected = currentStatus === s;
                return (
                  <button
                    key={s}
                    onClick={() => assessment.updateElement(element.id, { status: s })}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                      isSelected
                        ? `${cfg.bg} ${cfg.border} ${cfg.color} border-2 shadow-sm`
                        : "border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className={isSelected ? cfg.color : "text-gray-400"}>{cfg.icon}</span>
                    <span className="truncate">{cfg.label}</span>
                    {s !== "not-assessed" && (
                      <span className="ml-auto text-[10px] opacity-60">{cfg.score}pts</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Remarks and Evidence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                Remarks / Observations
              </label>
              <textarea
                rows={3}
                value={elAssessment?.remarks || ""}
                onChange={(e) => assessment.updateElement(element.id, { remarks: e.target.value })}
                placeholder="Add your observations, findings, gaps..."
                className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 placeholder-gray-300"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                Evidence Available
              </label>
              <textarea
                rows={3}
                value={elAssessment?.evidence || ""}
                onChange={(e) => assessment.updateElement(element.id, { evidence: e.target.value })}
                placeholder="Documents reviewed, records checked, observations..."
                className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 placeholder-gray-300"
              />
            </div>
          </div>

          {/* Assessor */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
              Assessed By
            </label>
            <input
              type="text"
              value={elAssessment?.assessorName || ""}
              onChange={(e) => assessment.updateElement(element.id, { assessorName: e.target.value })}
              placeholder={assessment.session.assessorName || "Assessor name..."}
              className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 placeholder-gray-300 max-w-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface StandardSectionProps {
  standard: Standard;
  filterCategory: Category | "all";
  filterStatus: ComplianceStatus | "all";
}

function StandardSection({ standard, filterCategory, filterStatus }: StandardSectionProps) {
  const [open, setOpen] = useState(true);
  const { assessment } = useApp();

  const elements = standard.elements.filter((e) => {
    const elAssessment = assessment.session.elements[e.id];
    const currentStatus: ComplianceStatus = elAssessment?.status || "not-assessed";
    if (filterCategory !== "all" && e.category !== filterCategory) return false;
    if (filterStatus !== "all" && currentStatus !== filterStatus) return false;
    return true;
  });

  if (elements.length === 0) return null;

  const assessed = standard.elements.filter(
    (e) => assessment.session.elements[e.id]?.status && assessment.session.elements[e.id].status !== "not-assessed"
  ).length;

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 text-left p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all mb-2"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 font-mono">{standard.code}</span>
            <span className="text-xs text-gray-400">
              {assessed}/{standard.elements.length} assessed
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-700 mt-0.5">{standard.title}</p>
        </div>
        {open ? <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </button>
      {open && (
        <div className="space-y-2 pl-2">
          {elements.map((element) => (
            <ElementCard
              key={element.id}
              element={element}
              standardCode={standard.code}
              filterCategory={filterCategory}
              filterStatus={filterStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ChapterAssessment({ chapterId }: { chapterId: string }) {
  const { navigate, assessment } = useApp();
  const chapter = chapters.find((c) => c.id === chapterId);
  const [filterCategory, setFilterCategory] = useState<Category | "all">("all");
  const [filterStatus, setFilterStatus] = useState<ComplianceStatus | "all">("all");

  if (!chapter) return <div className="p-8 text-gray-500">Chapter not found</div>;

  const chapterIndex = chapters.findIndex((c) => c.id === chapterId);
  const prevChapter = chapters[chapterIndex - 1];
  const nextChapter = chapters[chapterIndex + 1];
  const progress = assessment.getChapterProgress(chapterId);

  const allElements = chapter.standards.flatMap((s) => s.elements);
  const coreCount = allElements.filter((e) => e.category === "CORE").length;
  const commitmentCount = allElements.filter((e) => e.category === "Commitment").length;
  const achievementCount = allElements.filter((e) => e.category === "Achievement").length;
  const highRiskCount = allElements.filter((e) =>
    isHighRiskElement(e, assessment.session.elements[e.id])
  ).length;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Chapter Header */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xs font-semibold text-blue-300/70 tracking-widest uppercase mb-1">
              Chapter {chapterIndex + 1} of {chapters.length}
            </div>
            <h1 className="text-xl font-bold">{chapter.fullName}</h1>
            <p className="text-blue-200/70 text-sm mt-1">{chapter.code} — {allElements.length} Objective Elements</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{progress.percentage}%</div>
            <div className="text-xs text-blue-300/70">Score</div>
          </div>
        </div>

        <p className="text-blue-200/80 text-xs leading-relaxed mb-4">{chapter.intent}</p>

        {/* Category counts */}
        <div className="flex gap-3 flex-wrap">
          {[
            { label: "CORE", count: coreCount, color: "bg-red-500/20 text-red-300 border-red-500/30" },
            { label: "Commitment", count: commitmentCount, color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
            { label: "Achievement", count: achievementCount, color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
          ].map((c) => c.count > 0 && (
            <div key={c.label} className={`text-xs px-2.5 py-1 rounded-full border ${c.color}`}>
              {c.count} {c.label}
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-blue-300/60 mb-1.5">
            <span>{progress.assessed} of {progress.total} assessed</span>
            <span>{Math.round((progress.assessed / progress.total) * 100)}% complete</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-blue-400 rounded-full transition-all duration-500"
              style={{ width: `${(progress.assessed / progress.total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* NABH Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800">
          <span className="font-semibold">CORE elements</span> are mandatory and assessed at every NABH assessment. Achieving 100% CORE compliance is essential for accreditation. Elements marked with <span className="font-semibold">Written Guidance Required (*)</span> need documented policies/SOPs.
        </div>
      </div>

      {/* Inspector Watch summary */}
      {highRiskCount > 0 && (
        <div className="bg-fuchsia-50 border border-fuchsia-200 rounded-xl p-3 flex gap-2">
          <ShieldAlert className="w-4 h-4 text-fuchsia-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-fuchsia-800">
            <span className="font-semibold">{highRiskCount} of {allElements.length} elements</span> here are flagged as <span className="font-semibold">Inspector Watch</span> — CORE gaps, missing evidence, or areas typically verified by staff interview, walk-through, or record sampling rather than paperwork alone. Expand any element and look for the <span className="font-semibold">"Where an assessor may catch you out"</span> note before the visit.
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap items-center">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Filter:</span>
        <div className="flex gap-1 flex-wrap">
          {(["all", "CORE", "Commitment", "Achievement", "Excellence"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                filterCategory === cat
                  ? cat === "all"
                    ? "bg-gray-800 text-white border-gray-800"
                    : `${categoryConfig[cat]?.bg} ${categoryConfig[cat]?.color} ${categoryConfig[cat]?.border}`
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {cat === "all" ? "All Categories" : cat}
            </button>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap ml-2">
          {(["all", "not-assessed", "compliant", "partial", "non-compliant"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                filterStatus === s
                  ? "bg-gray-800 text-white border-gray-800"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {s === "all" ? "All Status" : s === "not-assessed" ? "Pending" : s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Standards */}
      <div>
        {chapter.standards.map((std) => (
          <StandardSection
            key={std.id}
            standard={std}
            filterCategory={filterCategory}
            filterStatus={filterStatus}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-gray-200">
        {prevChapter ? (
          <button
            onClick={() => navigate("assessment", prevChapter.id)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            {prevChapter.code}
          </button>
        ) : (
          <button
            onClick={() => navigate("dashboard")}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Dashboard
          </button>
        )}
        {nextChapter ? (
          <button
            onClick={() => navigate("assessment", nextChapter.id)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
          >
            {nextChapter.code}
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => navigate("reports")}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-all shadow-sm"
          >
            <Star className="w-4 h-4" />
            View Report
          </button>
        )}
      </div>
    </div>
  );
}
