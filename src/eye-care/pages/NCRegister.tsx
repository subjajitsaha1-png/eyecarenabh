import { useMemo, useState } from "react";
import { useApp } from "../App";
import { chapters } from "../data/standards";
import { InspectionNC, NCStatus } from "../hooks/useAssessment";
import {
  ShieldAlert,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  Save,
  Calendar,
  User,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const statusConfig: Record<NCStatus, { label: string; color: string; bg: string; border: string; icon: React.ReactNode }> = {
  open: {
    label: "Open",
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-300",
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
  },
  "in-progress": {
    label: "In Progress",
    color: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-300",
    icon: <Clock className="w-3.5 h-3.5" />,
  },
  closed: {
    label: "Closed",
    color: "text-green-700",
    bg: "bg-green-50",
    border: "border-green-300",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
  },
};

const emptyForm = {
  elementCode: "",
  elementText: "",
  ncDescription: "",
  rootCause: "",
  correctiveAction: "",
  preventiveAction: "",
  responsiblePerson: "",
  targetDate: "",
  assessmentType: "final" as const,
};

function isOverdue(nc: InspectionNC) {
  if (nc.status === "closed" || !nc.targetDate) return false;
  return new Date(nc.targetDate) < new Date(new Date().toDateString());
}

function NCForm({ onClose }: { onClose: () => void }) {
  const { assessment } = useApp();
  const [form, setForm] = useState({ ...emptyForm });

  const allElements = useMemo(
    () => chapters.flatMap((ch) => ch.standards.flatMap((s) => s.elements.map((e) => ({ ...e, chapterCode: ch.code })))),
    []
  );

  const handleElementPick = (code: string) => {
    const match = allElements.find((e) => e.code.toLowerCase() === code.toLowerCase());
    setForm((f) => ({ ...f, elementCode: code, elementText: match?.text || "" }));
  };

  const canSave = form.elementCode.trim() && form.ncDescription.trim() && form.correctiveAction.trim();

  const handleSave = () => {
    if (!canSave) return;
    assessment.addNC({
      elementCode: form.elementCode.trim(),
      elementText: form.elementText,
      ncDescription: form.ncDescription.trim(),
      rootCause: form.rootCause.trim(),
      correctiveAction: form.correctiveAction.trim(),
      preventiveAction: form.preventiveAction.trim(),
      responsiblePerson: form.responsiblePerson.trim(),
      targetDate: form.targetDate,
      assessmentType: form.assessmentType,
    });
    onClose();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-fuchsia-600" />
          Log a New NC
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
            Element Code (e.g. AAC.1.a)
          </label>
          <input
            type="text"
            list="element-codes"
            value={form.elementCode}
            onChange={(e) => handleElementPick(e.target.value)}
            placeholder="Type or pick a standard code..."
            className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 focus:border-fuchsia-400"
          />
          <datalist id="element-codes">
            {allElements.map((e) => (
              <option key={e.id} value={e.code}>
                {e.text.slice(0, 60)}
              </option>
            ))}
          </datalist>
          {form.elementText && (
            <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">{form.elementText}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
            Assessment Type
          </label>
          <select
            value={form.assessmentType}
            onChange={(e) => setForm((f) => ({ ...f, assessmentType: e.target.value as typeof f.assessmentType }))}
            className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 focus:border-fuchsia-400"
          >
            <option value="pre-assessment">Pre-Assessment</option>
            <option value="final">Final Assessment</option>
            <option value="surveillance">Surveillance</option>
            <option value="re-accreditation">Re-accreditation</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
          NC as Recorded by Assessor
        </label>
        <textarea
          rows={2}
          value={form.ncDescription}
          onChange={(e) => setForm((f) => ({ ...f, ncDescription: e.target.value }))}
          placeholder="Exact wording of the non-conformity noted during the visit..."
          className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 focus:border-fuchsia-400"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
          Root Cause
        </label>
        <textarea
          rows={2}
          value={form.rootCause}
          onChange={(e) => setForm((f) => ({ ...f, rootCause: e.target.value }))}
          placeholder="Why did this gap exist — process, training, resource, documentation..."
          className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 focus:border-fuchsia-400"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
            Corrective Action (immediate fix)
          </label>
          <textarea
            rows={3}
            value={form.correctiveAction}
            onChange={(e) => setForm((f) => ({ ...f, correctiveAction: e.target.value }))}
            placeholder="What will be done right away to close this specific gap..."
            className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 focus:border-fuchsia-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
            Preventive Action (stop recurrence)
          </label>
          <textarea
            rows={3}
            value={form.preventiveAction}
            onChange={(e) => setForm((f) => ({ ...f, preventiveAction: e.target.value }))}
            placeholder="Systemic change so this doesn't recur elsewhere..."
            className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 focus:border-fuchsia-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
            Responsible Person
          </label>
          <input
            type="text"
            value={form.responsiblePerson}
            onChange={(e) => setForm((f) => ({ ...f, responsiblePerson: e.target.value }))}
            placeholder="Name / designation"
            className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 focus:border-fuchsia-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
            Target Closure Date
          </label>
          <input
            type="date"
            value={form.targetDate}
            onChange={(e) => setForm((f) => ({ ...f, targetDate: e.target.value }))}
            className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30 focus:border-fuchsia-400"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-50 border border-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!canSave}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-fuchsia-600 text-white hover:bg-fuchsia-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Save className="w-3.5 h-3.5" />
          Save NC
        </button>
      </div>
    </div>
  );
}

function NCCard({ nc }: { nc: InspectionNC }) {
  const { assessment } = useApp();
  const [expanded, setExpanded] = useState(false);
  const cfg = statusConfig[nc.status];
  const overdue = isOverdue(nc);

  return (
    <div className={`rounded-xl border bg-white shadow-sm ${overdue ? "border-red-300" : "border-gray-200"}`}>
      <div className="flex items-start gap-3 p-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
          <span className={cfg.color}>{cfg.icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-xs font-bold text-gray-500 font-mono">{nc.elementCode}</span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
              {cfg.label}
            </span>
            {overdue && (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-red-100 text-red-700">
                Overdue
              </span>
            )}
            {nc.targetDate && (
              <span className="text-[10px] text-gray-400 flex items-center gap-0.5 ml-auto">
                <Calendar className="w-2.5 h-2.5" />
                Target: {new Date(nc.targetDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-700 font-medium leading-snug">{nc.ncDescription}</p>
          {nc.responsiblePerson && (
            <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
              <User className="w-2.5 h-2.5" /> {nc.responsiblePerson}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 text-gray-400">
          {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
          {nc.rootCause && (
            <div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Root Cause</div>
              <p className="text-xs text-gray-600">{nc.rootCause}</p>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Corrective Action</div>
              <p className="text-xs text-gray-600">{nc.correctiveAction}</p>
            </div>
            {nc.preventiveAction && (
              <div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Preventive Action</div>
                <p className="text-xs text-gray-600">{nc.preventiveAction}</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Status:</span>
            {(["open", "in-progress", "closed"] as NCStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => assessment.updateNC(nc.id, { status: s })}
                className={`text-[10px] px-2 py-1 rounded-full font-medium border transition-all ${
                  nc.status === s
                    ? `${statusConfig[s].bg} ${statusConfig[s].color} ${statusConfig[s].border}`
                    : "border-gray-200 text-gray-400 hover:bg-gray-50"
                }`}
              >
                {statusConfig[s].label}
              </button>
            ))}
            <button
              onClick={() => {
                if (confirm("Delete this NC entry?")) assessment.deleteNC(nc.id);
              }}
              className="ml-auto text-gray-300 hover:text-red-500"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          {nc.closedDate && (
            <p className="text-[10px] text-green-600">
              Closed on {new Date(nc.closedDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function NCRegister() {
  const { assessment } = useApp();
  const { session } = assessment;
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<NCStatus | "all">("all");

  const ncs = session.inspectionNCs || [];
  const open = ncs.filter((n) => n.status === "open").length;
  const inProgress = ncs.filter((n) => n.status === "in-progress").length;
  const closed = ncs.filter((n) => n.status === "closed").length;
  const overdue = ncs.filter(isOverdue).length;

  const filtered = ncs.filter((n) => filterStatus === "all" || n.status === filterStatus);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between mb-2">
          <div>
            <div className="text-xs font-semibold text-blue-300/70 tracking-widest uppercase mb-1">
              Corrective Action Tracker
            </div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-fuchsia-400" />
              NC Register
            </h1>
            <p className="text-blue-200/70 text-sm mt-1">
              Log the exact non-conformities raised during your NABH visit, and track corrective / preventive action to closure.
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 rounded-xl text-sm font-medium transition-all flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            Log NC
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold">{ncs.length}</div>
            <div className="text-[11px] text-blue-200/70">Total NCs</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold text-red-300">{open}</div>
            <div className="text-[11px] text-blue-200/70">Open</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold text-amber-300">{inProgress}</div>
            <div className="text-[11px] text-blue-200/70">In Progress</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-300">{closed}</div>
            <div className="text-[11px] text-blue-200/70">Closed</div>
          </div>
        </div>
        {overdue > 0 && (
          <div className="mt-3 text-xs bg-red-500/20 border border-red-400/30 rounded-lg px-3 py-2 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-red-300" />
            <span className="text-red-200">{overdue} NC{overdue > 1 ? "s are" : " is"} past its target closure date.</span>
          </div>
        )}
      </div>

      {showForm && <NCForm onClose={() => setShowForm(false)} />}

      {/* Filters */}
      {ncs.length > 0 && (
        <div className="flex gap-2 flex-wrap items-center">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Filter:</span>
          {(["all", "open", "in-progress", "closed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                filterStatus === s
                  ? s === "all"
                    ? "bg-gray-800 text-white border-gray-800"
                    : `${statusConfig[s].bg} ${statusConfig[s].color} ${statusConfig[s].border}`
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {s === "all" ? "All" : statusConfig[s].label}
            </button>
          ))}
        </div>
      )}

      {/* List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            {ncs.length === 0
              ? "No NCs logged yet. Click \"Log NC\" to record findings from your inspection."
              : "No NCs match this filter."}
          </div>
        ) : (
          filtered.map((nc) => <NCCard key={nc.id} nc={nc} />)
        )}
      </div>
    </div>
  );
}
