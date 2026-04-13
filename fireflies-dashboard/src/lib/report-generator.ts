import { ProcessedCall, Analytics, ReportPayload } from "@/types";

export function generateReport(
  analytics: Analytics,
  calls: ProcessedCall[],
  dateRange: { from: string; to: string },
): ReportPayload {
  return {
    generatedAt: new Date().toISOString(),
    dateRange,
    analytics,
    calls: calls.filter((c) => c.isProspect),
  };
}

// Pluggable delivery stubs — implement when ready
export async function sendEmail(_payload: ReportPayload, _to: string[]): Promise<void> {
  console.log("[report] Email delivery not yet configured");
}

export async function sendSlack(_payload: ReportPayload, _channel: string): Promise<void> {
  console.log("[report] Slack delivery not yet configured");
}
