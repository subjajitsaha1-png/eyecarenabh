import { ReactNode, useState } from "react";
import { useApp } from "../App";
import { chapters } from "../data/standards";
import {
  Eye,
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  Settings,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Download,
  Upload,
  ShieldAlert,
} from "lucide-react";

const chapterColors: Record<string, string> = {
  aac: "bg-blue-500",
  cop: "bg-emerald-500",
  mom: "bg-violet-500",
  pre: "bg-amber-500",
  ipc: "bg-teal-500",
  psq: "bg-rose-500",
  rom: "bg-indigo-500",
  fms: "bg-orange-500",
  hrm: "bg-cyan-500",
  ims: "bg-slate-500",
};

export default function Layout({ children }: { children: ReactNode }) {
  const { currentPage, selectedChapter, navigate, assessment } = useApp();
  const [chaptersOpen, setChaptersOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const stats = assessment.getOverallStats();
  const readiness = assessment.getReadinessLevel();
  const openNCCount = (assessment.session.inspectionNCs || []).filter((n) => n.status !== "closed").length;

  const readinessColors: Record<string, string> = {
    gray: "text-gray-500 bg-gray-100",
    green: "text-green-700 bg-green-100",
    blue: "text-blue-700 bg-blue-100",
    amber: "text-amber-700 bg-amber-100",
    red: "text-red-700 bg-red-100",
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          assessment.loadSession(data);
        } catch {
          alert("Invalid assessment file");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const Sidebar = () => (
    <div className="relative flex flex-col h-full bg-[#0f172a] text-white overflow-hidden">
      {/* Ambient aurora background */}
      <div className="aurora-bg">
        <div className="aurora-blob b1" />
        <div className="aurora-blob b2" />
        <div className="aurora-blob b3" />
        <div className="aurora-blob b4" />
      </div>

      {/* Logo */}
      <div className="relative z-10 px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="rainbow-ring w-9 h-9 rounded-xl">
            <div className="w-9 h-9 rounded-xl bg-[#0f172a] flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <div className="rainbow-text font-extrabold text-sm leading-tight tracking-wide">EyeCare NABH</div>
            <div className="text-[10px] text-blue-300/70 tracking-widest uppercase">Assessment Portal</div>
          </div>
        </div>
      </div>

      {/* Readiness Badge */}
      {stats.assessedElements > 0 && (
        <div className="relative z-10 mx-4 mt-4 mb-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 backdrop-blur-sm">
          <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Readiness Status</div>
          <div className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block ${readinessColors[readiness.color]}`}>
            {readiness.level}
          </div>
          <div className="mt-2 text-xs text-white/50">{stats.completionPercentage}% complete • {stats.overallPercentage}% score</div>
          <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="rainbow-bar h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.completionPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="relative z-10 flex-1 overflow-y-auto px-3 py-3 space-y-1">
        <button
          onClick={() => { navigate("dashboard"); setSidebarOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            currentPage === "dashboard"
              ? "rainbow-active text-white"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </button>

        <button
          onClick={() => { navigate("setup"); setSidebarOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            currentPage === "setup"
              ? "rainbow-active text-white"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <Settings className="w-4 h-4" />
          Hospital Setup
        </button>

        {/* Chapters */}
        <div className="pt-2">
          <button
            onClick={() => setChaptersOpen(!chaptersOpen)}
            className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/30 hover:text-white/50 transition-colors"
          >
            <span>Chapters</span>
            {chaptersOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          </button>

          {chaptersOpen && (
            <div className="mt-1 space-y-0.5">
              {chapters.map((ch) => {
                const progress = assessment.getChapterProgress(ch.id);
                const isSelected = currentPage === "assessment" && selectedChapter === ch.id;
                return (
                  <button
                    key={ch.id}
                    onClick={() => { navigate("assessment", ch.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all group ${
                      isSelected
                        ? "rainbow-active text-white"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${chapterColors[ch.id]} ${isSelected ? "shadow-[0_0_8px_2px] shadow-current" : ""}`} />
                    <span className="flex-1 text-left truncate font-medium">{ch.code}</span>
                    {progress.assessed > 0 && (
                      <span className="text-[10px] opacity-60">
                        {progress.assessed}/{progress.total}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <button
          onClick={() => { navigate("reports"); setSidebarOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            currentPage === "reports"
              ? "rainbow-active text-white"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Reports & Analytics
        </button>

        <button
          onClick={() => { navigate("ncRegister"); setSidebarOpen(false); }}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
            currentPage === "ncRegister"
              ? "rainbow-active text-white"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          NC Register
          {openNCCount > 0 && (
            <span className="ml-auto text-[10px] font-bold bg-red-500/80 text-white px-1.5 py-0.5 rounded-full">
              {openNCCount}
            </span>
          )}
        </button>
      </nav>

      {/* Actions */}
      <div className="relative z-10 px-3 py-4 border-t border-white/10 space-y-2">
        <button
          onClick={assessment.exportData}
          className="rainbow-shimmer w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/5 transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          Export Assessment
        </button>
        <button
          onClick={handleImport}
          className="rainbow-shimmer w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/5 transition-all"
        >
          <Upload className="w-3.5 h-3.5" />
          Import Assessment
        </button>
        <div className="px-3 pt-1 text-[10px] text-white/20">
          NABH Eye Care Standards 2nd Ed. • Eff. Jan 2026
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 flex-col">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 flex flex-col">
            <Sidebar />
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="relative lg:hidden flex items-center gap-3 px-4 py-3 bg-[#0f172a] border-b border-white/10 overflow-hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white/70 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="rainbow-ring w-7 h-7 rounded-lg">
              <div className="w-7 h-7 rounded-lg bg-[#0f172a] flex items-center justify-center">
                <Eye className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="rainbow-text font-bold text-sm">EyeCare NABH</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 rainbow-underline" />
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
