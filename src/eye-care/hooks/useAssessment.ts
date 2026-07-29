import { useState, useEffect, useCallback } from "react";
import { chapters, ComplianceStatus } from "../data/standards";

export interface ElementAssessment {
  elementId: string;
  status: ComplianceStatus;
  score: number; // 0, 5, 8, 10
  remarks: string;
  evidence: string;
  assessorName: string;
  assessedAt?: string;
}

export type NCStatus = "open" | "in-progress" | "closed";

export interface InspectionNC {
  id: string;
  elementCode: string; // e.g. "AAC.1.a" — free text, may or may not match an internal element
  elementText?: string;
  ncDescription: string; // the actual NC as written by the NABH assessor
  rootCause: string;
  correctiveAction: string; // immediate fix
  preventiveAction: string; // systemic fix to stop recurrence
  responsiblePerson: string;
  targetDate: string;
  status: NCStatus;
  raisedDate: string;
  closedDate?: string;
  assessmentType?: "pre-assessment" | "final" | "surveillance" | "re-accreditation";
}

export interface AssessmentSession {
  id: string;
  hospitalName: string;
  hospitalId: string;
  city: string;
  state: string;
  assessmentType: "pre-assessment" | "final" | "surveillance" | "re-accreditation";
  assessorName: string;
  startedAt: string;
  lastSavedAt: string;
  elements: Record<string, ElementAssessment>;
  notes: string;
  inspectionNCs: InspectionNC[];
}

const STORAGE_KEY = "eye_care_nabh_assessment";

const defaultSession = (): AssessmentSession => ({
  id: crypto.randomUUID(),
  hospitalName: "",
  hospitalId: "",
  city: "",
  state: "",
  assessmentType: "pre-assessment",
  assessorName: "",
  startedAt: new Date().toISOString(),
  lastSavedAt: new Date().toISOString(),
  elements: {},
  notes: "",
  inspectionNCs: [],
});

const scoreFromStatus = (status: ComplianceStatus): number => {
  switch (status) {
    case "compliant": return 10;
    case "partial": return 5;
    case "non-compliant": return 0;
    default: return 0;
  }
};

export function useAssessment() {
  const [session, setSession] = useState<AssessmentSession>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return defaultSession();
      const parsed = JSON.parse(stored);
      return { ...defaultSession(), ...parsed, inspectionNCs: parsed.inspectionNCs || [] };
    } catch {
      return defaultSession();
    }
  });

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (isDirty) {
      const updated = { ...session, lastSavedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setIsDirty(false);
    }
  }, [isDirty, session]);

  const updateHospitalInfo = useCallback(
    (info: Partial<Pick<AssessmentSession, "hospitalName" | "hospitalId" | "city" | "state" | "assessmentType" | "assessorName" | "notes">>) => {
      setSession((prev) => ({ ...prev, ...info }));
      setIsDirty(true);
    },
    []
  );

  const updateElement = useCallback(
    (elementId: string, data: Partial<ElementAssessment>) => {
      setSession((prev) => {
        const existing = prev.elements[elementId] || {
          elementId,
          status: "not-assessed" as ComplianceStatus,
          score: 0,
          remarks: "",
          evidence: "",
          assessorName: prev.assessorName,
        };
        const updated = { ...existing, ...data };
        if (data.status) {
          updated.score = scoreFromStatus(data.status);
          updated.assessedAt = new Date().toISOString();
        }
        return {
          ...prev,
          elements: { ...prev.elements, [elementId]: updated },
        };
      });
      setIsDirty(true);
    },
    []
  );

  const resetSession = useCallback(() => {
    const fresh = defaultSession();
    setSession(fresh);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    setIsDirty(false);
  }, []);

  const loadSession = useCallback((data: AssessmentSession) => {
    const normalized = { ...defaultSession(), ...data, inspectionNCs: data.inspectionNCs || [] };
    setSession(normalized);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  }, []);

  const addNC = useCallback(
    (nc: Omit<InspectionNC, "id" | "raisedDate" | "status"> & { status?: NCStatus }) => {
      const newNC: InspectionNC = {
        id: crypto.randomUUID(),
        raisedDate: new Date().toISOString(),
        status: nc.status || "open",
        ...nc,
      };
      setSession((prev) => ({ ...prev, inspectionNCs: [newNC, ...prev.inspectionNCs] }));
      setIsDirty(true);
      return newNC.id;
    },
    []
  );

  const updateNC = useCallback((id: string, data: Partial<InspectionNC>) => {
    setSession((prev) => ({
      ...prev,
      inspectionNCs: prev.inspectionNCs.map((nc) => {
        if (nc.id !== id) return nc;
        const updated = { ...nc, ...data };
        if (data.status === "closed" && nc.status !== "closed") {
          updated.closedDate = new Date().toISOString();
        }
        if (data.status && data.status !== "closed") {
          updated.closedDate = undefined;
        }
        return updated;
      }),
    }));
    setIsDirty(true);
  }, []);

  const deleteNC = useCallback((id: string) => {
    setSession((prev) => ({
      ...prev,
      inspectionNCs: prev.inspectionNCs.filter((nc) => nc.id !== id),
    }));
    setIsDirty(true);
  }, []);

  // Computed stats
  const getChapterProgress = useCallback(
    (chapterId: string) => {
      const chapter = chapters.find((c) => c.id === chapterId);
      if (!chapter) return { assessed: 0, total: 0, score: 0, maxScore: 0, percentage: 0 };
      const allElements = chapter.standards.flatMap((s) => s.elements);
      const assessed = allElements.filter(
        (e) => session.elements[e.id]?.status && session.elements[e.id].status !== "not-assessed"
      );
      const score = assessed.reduce((sum, e) => sum + (session.elements[e.id]?.score || 0), 0);
      const maxScore = assessed.length * 10;
      return {
        assessed: assessed.length,
        total: allElements.length,
        score,
        maxScore,
        percentage: maxScore > 0 ? Math.round((score / maxScore) * 100) : 0,
      };
    },
    [session.elements]
  );

  const getOverallStats = useCallback(() => {
    let totalElements = 0;
    let assessedElements = 0;
    let totalScore = 0;
    let maxPossibleScore = 0;
    let compliant = 0;
    let partial = 0;
    let nonCompliant = 0;
    let coreCompliant = 0;
    let coreTotal = 0;

    chapters.forEach((chapter) => {
      chapter.standards.forEach((std) => {
        std.elements.forEach((el) => {
          totalElements++;
          if (el.category === "CORE") coreTotal++;
          const assessment = session.elements[el.id];
          if (assessment && assessment.status !== "not-assessed") {
            assessedElements++;
            totalScore += assessment.score;
            maxPossibleScore += 10;
            if (assessment.status === "compliant") {
              compliant++;
              if (el.category === "CORE") coreCompliant++;
            }
            if (assessment.status === "partial") partial++;
            if (assessment.status === "non-compliant") nonCompliant++;
          }
        });
      });
    });

    return {
      totalElements,
      assessedElements,
      totalScore,
      maxPossibleScore,
      overallPercentage: maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0,
      compliant,
      partial,
      nonCompliant,
      notAssessed: totalElements - assessedElements,
      coreCompliant,
      coreTotal,
      coreCompliancePercentage: coreTotal > 0 ? Math.round((coreCompliant / coreTotal) * 100) : 0,
      completionPercentage: Math.round((assessedElements / totalElements) * 100),
    };
  }, [session.elements]);

  const getReadinessLevel = useCallback(() => {
    const stats = getOverallStats();
    if (stats.assessedElements === 0) return { level: "Not Started", color: "gray", description: "Begin your assessment" };
    if (stats.overallPercentage >= 85 && stats.coreCompliancePercentage >= 80)
      return { level: "Accreditation Ready", color: "green", description: "Excellent compliance across all chapters" };
    if (stats.overallPercentage >= 70)
      return { level: "Near Ready", color: "blue", description: "Minor gaps to address before submission" };
    if (stats.overallPercentage >= 50)
      return { level: "In Progress", color: "amber", description: "Significant improvements underway" };
    return { level: "Early Stage", color: "red", description: "Foundational work required across chapters" };
  }, [getOverallStats]);

  const exportData = useCallback(() => {
    const data = JSON.stringify(session, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nabh-assessment-${session.hospitalName || "hospital"}-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [session]);

  return {
    session,
    updateHospitalInfo,
    updateElement,
    resetSession,
    loadSession,
    getChapterProgress,
    getOverallStats,
    getReadinessLevel,
    exportData,
    addNC,
    updateNC,
    deleteNC,
  };
}
