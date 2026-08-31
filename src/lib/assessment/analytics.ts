import { track } from "@vercel/analytics";

export type AssessmentEvent =
  | "assessment_start"
  | "assessment_50_percent"
  | "assessment_email_gate_view"
  | "assessment_lead_created"
  | "assessment_calendar_time_selected"
  | "assessment_calendar_skipped"
  | "assessment_calendar_idle_abandon"
  | "assessment_session_requested"
  | "assessment_results_view"
  | "assessment_export_pdf";

export function trackAssessment(event: AssessmentEvent, properties?: Record<string, string | number | boolean | null>): void {
  track(event, properties);
}
