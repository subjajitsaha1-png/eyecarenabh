import { ObjectiveElement } from "../data/standards";
import { ElementAssessment } from "../hooks/useAssessment";

export interface RiskSignal {
  tag: string;
  message: string;
}

/**
 * Scans an element's NABH interpretation text for patterns that
 * historically catch organisations out during an assessment — i.e.
 * places where the assessor verifies something beyond the paperwork
 * (staff interviews, physical walk-throughs, record sampling, display
 * checks). Flagging these lets a team rehearse the "live" part of the
 * standard, not just file the SOP.
 */
export function getInterpretationRiskSignals(interpretation: string): RiskSignal[] {
  const text = interpretation.toLowerCase();
  const signals: RiskSignal[] = [];

  if (text.includes("direct questioning") || text.includes("interview")) {
    signals.push({
      tag: "Staff Interview",
      message:
        "Assessor is likely to question frontline staff directly. Brief the team — if staff can't repeat the process in their own words, it's scored as a gap even with perfect paperwork.",
    });
  }

  if (text.includes("direct observation") || text.includes("point of care")) {
    signals.push({
      tag: "Walk-through Check",
      message:
        "Verified by observing actual practice at the point of care, not just the file. Do a dry-run walk-through before the visit.",
    });
  }

  if (text.includes("sample of patient") || text.includes("records or registers") || text.includes("sample of applicable cases")) {
    signals.push({
      tag: "Random Record Pull",
      message:
        "Assessor typically pulls a random sample of records/registers. Keep a ready, cleaned sample folder — don't rely on cherry-picked 'best' files.",
    });
  }

  if (text.includes("display") || text.includes("signage")) {
    signals.push({
      tag: "Display / Signage",
      message:
        "Physical display or signage is checked for visibility, currency, and bilingual content. A stale or missing board is an easy, visible non-conformity.",
    });
  }

  if (text.includes("training") || text.includes("orientation") || text.includes("competency assessment")) {
    signals.push({
      tag: "Training Records",
      message:
        "Attendance sheets and competency records are checked, not just the training calendar. Confirm every named staff member actually has a signed record on file.",
    });
  }

  if (text.includes("calibration") || text.includes("maintenance")) {
    signals.push({
      tag: "Equipment Records",
      message:
        "Maintenance/calibration logs are checked against actual equipment tags in the room. Mismatched or overdue dates are a common, quick catch.",
    });
  }

  if (text.includes("embedded in routine operations") || text.includes("not merely introduced for the assessment visit")) {
    signals.push({
      tag: "Routine, Not Rehearsed",
      message:
        "Assessor is trained to probe whether this is everyday practice or something set up just for the visit. Dates, versions, and staff answers should be consistent, not suspiciously fresh.",
    });
  }

  return signals;
}

/**
 * Additional risk purely from how the element has (or hasn't) been
 * filled in during self-assessment — the gaps a team creates for itself.
 */
export function getSelfAssessmentRiskSignals(elAssessment: ElementAssessment | undefined): RiskSignal[] {
  const signals: RiskSignal[] = [];
  if (!elAssessment || elAssessment.status === "not-assessed") return signals;

  if (elAssessment.status === "compliant" && !elAssessment.evidence?.trim()) {
    signals.push({
      tag: "No Evidence Logged",
      message:
        "Marked Compliant but no evidence is recorded here. If you can't name the exact document/record on the spot, an assessor will mark it down.",
    });
  }

  if (elAssessment.status === "compliant" && !elAssessment.remarks?.trim()) {
    signals.push({
      tag: "No Remarks",
      message:
        "No observation notes saved. A one-line note on what was actually checked makes it much faster to defend this during the live assessment.",
    });
  }

  return signals;
}

export function isHighRiskElement(element: ObjectiveElement, elAssessment: ElementAssessment | undefined): boolean {
  const interpSignals = getInterpretationRiskSignals(element.interpretation);
  const selfSignals = getSelfAssessmentRiskSignals(elAssessment);
  const status = elAssessment?.status ?? "not-assessed";
  const isCoreGap = element.category === "CORE" && (status === "non-compliant" || status === "partial" || status === "not-assessed");
  return interpSignals.length > 0 || selfSignals.length > 0 || isCoreGap;
}
