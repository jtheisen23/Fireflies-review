import { NextRequest, NextResponse } from "next/server";
import { getTranscripts } from "@/lib/fireflies";
import { processAll, computeAnalytics } from "@/lib/analyzer";
import { generateReport } from "@/lib/report-generator";
import { subMonths, format } from "date-fns";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const from = body.from || format(subMonths(new Date(), 3), "yyyy-MM-dd");
    const to = body.to || format(new Date(), "yyyy-MM-dd");

    const transcripts = await getTranscripts(from, to);
    const calls = processAll(transcripts);
    const analytics = computeAnalytics(calls);
    const report = generateReport(analytics, calls, { from, to });

    return NextResponse.json(report);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
