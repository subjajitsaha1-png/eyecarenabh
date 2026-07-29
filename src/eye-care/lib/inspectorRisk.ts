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

  // Only the narrow, specific patterns below are used. Broad boilerplate phrases
  // like "interview", "direct observation", "point of care", or "embedded in
  // routine operations" appear in the assessment-approach text of nearly every
  // element, so keying off them flagged almost everything and added noise.
  // Keeping only the rarer, more distinctive phrases keeps the signal meaningful.

  if (text.includes("direct questioning")) {
    signals.push({
      tag: "Staff Interview",
      message:
        "Assessor is likely to question frontline staff directly on this point. Brief the team — if staff can't repeat the process in their own words, it's scored as a gap even with perfect paperwork.",
    });
  }

  if (text.includes("sample of applicable cases")) {
    signals.push({
      tag: "Random Record Pull",
      message:
        "Assessor pulls a random sample of applicable cases/records. Keep a ready, cleaned sample folder — don't rely on cherry-picked 'best' files.",
    });
  }

  if (text.includes("signage")) {
    signals.push({
      tag: "Display / Signage",
      message:
        "Physical signage is checked for visibility, currency, and bilingual content. A stale or missing board is an easy, visible non-conformity.",
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
