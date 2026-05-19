import { useState } from "react";
import { useApp } from "../App";
import { Building2, User, MapPin, ClipboardList, Save, RefreshCw, AlertTriangle } from "lucide-react";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

const assessmentTypes = [
  { value: "pre-assessment", label: "Pre-Assessment", desc: "Initial self-assessment before formal NABH assessment" },
  { value: "final", label: "Final Assessment", desc: "Formal NABH final accreditation assessment" },
  { value: "surveillance", label: "Surveillance Assessment", desc: "Mid-term surveillance at 21-24 months" },
  { value: "re-accreditation", label: "Re-accreditation", desc: "Renewal assessment before expiry of 4-year cycle" },
];

export default function Setup() {
  const { assessment, navigate } = useApp();
  const { session, updateHospitalInfo, resetSession } = assessment;
  const [saved, setSaved] = useState(false);
  const [showReset, setShowReset] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    resetSession();
    setShowReset(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hospital Setup</h1>
        <p className="text-sm text-gray-500 mt-1">
          Configure your Eye Care Organization's assessment profile. This information appears in reports.
        </p>
      </div>

      {/* Hospital Information */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-600" />
          <h2 className="font-semibold text-gray-800">Hospital Information</h2>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Hospital / Eye Care Organization Name *
            </label>
            <input
              type="text"
              value={session.hospitalName}
              onChange={(e) => updateHospitalInfo({ hospitalName: e.target.value })}
              placeholder="e.g., Sankara Eye Hospital"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 placeholder-gray-300"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Hospital ID / NABH Application Number
            </label>
            <input
              type="text"
              value={session.hospitalId}
              onChange={(e) => updateHospitalInfo({ hospitalId: e.target.value })}
              placeholder="e.g., ECO-2024-0123"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 placeholder-gray-300"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              City
            </label>
            <input
              type="text"
              value={session.city}
              onChange={(e) => updateHospitalInfo({ city: e.target.value })}
              placeholder="e.g., Hyderabad"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 placeholder-gray-300"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              State
            </label>
            <select
              value={session.state}
              onChange={(e) => updateHospitalInfo({ state: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white"
            >
              <option value="">Select state...</option>
              {indianStates.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Assessment Configuration */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-blue-600" />
          <h2 className="font-semibold text-gray-800">Assessment Configuration</h2>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Assessment Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {assessmentTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => updateHospitalInfo({ assessmentType: type.value as any })}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    session.assessmentType === type.value
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className={`text-sm font-semibold mb-0.5 ${
                    session.assessmentType === type.value ? "text-blue-700" : "text-gray-700"
                  }`}>
                    {type.label}
                  </div>
                  <div className="text-xs text-gray-500">{type.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Assessor Information */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" />
          <h2 className="font-semibold text-gray-800">Assessor Information</h2>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Lead Assessor / Quality Manager Name
            </label>
            <input
              type="text"
              value={session.assessorName}
              onChange={(e) => updateHospitalInfo({ assessorName: e.target.value })}
              placeholder="e.g., Dr. Priya Sharma"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 placeholder-gray-300"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Assessment Notes / General Observations
            </label>
            <textarea
              rows={4}
              value={session.notes}
              onChange={(e) => updateHospitalInfo({ notes: e.target.value })}
              placeholder="Overall observations, scope of assessment, special circumstances..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 placeholder-gray-300 resize-none"
            />
          </div>
        </div>
      </div>

      {/* NABH Standards Reference */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-800 text-sm mb-1">NABH Standards Reference</h3>
            <p className="text-xs text-blue-700/80 leading-relaxed">
              This application is based on the <strong>NABH Accreditation Standards and Guidebook for Eye Care Organisations — 2nd Edition</strong> effective from 1st January 2026. It covers 302 objective elements across 10 chapters: 77 CORE, 205 Commitment, 12 Achievement, and 8 Excellence elements.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                { label: "77 CORE", color: "bg-red-100 text-red-700" },
                { label: "205 Commitment", color: "bg-blue-100 text-blue-700" },
                { label: "12 Achievement", color: "bg-purple-100 text-purple-700" },
                { label: "8 Excellence", color: "bg-amber-100 text-amber-700" },
              ].map((b) => (
                <span key={b.label} className={`text-xs px-2 py-0.5 rounded-full font-medium ${b.color}`}>
                  {b.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <button
          onClick={() => setShowReset(true)}
          className="flex items-center gap-2 px-4 py-2.5 border border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
          Reset All Assessment Data
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("dashboard")}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => { handleSave(); navigate("assessment", "aac"); }}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
          >
            <Save className="w-4 h-4" />
            {saved ? "Saved!" : "Save & Start Assessment"}
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showReset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Reset Assessment?</h3>
                <p className="text-xs text-gray-500">This cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-5">
              All assessment data including scores, remarks, and evidence will be permanently deleted. Export your data first if you want to keep a backup.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowReset(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 transition-all"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
