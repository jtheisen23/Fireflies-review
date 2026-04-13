import { NextRequest, NextResponse } from "next/server";
import { getTranscripts } from "@/lib/fireflies";
import { processAll, computeAnalytics } from "@/lib/analyzer";
import { subMonths, format } from "date-fns";

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const from = params.get("from") || format(subMonths(new Date(), 3), "yyyy-MM-dd");
    const to = params.get("to") || format(new Date(), "yyyy-MM-dd");

    const transcripts = await getTranscripts(from, to);
    const calls = processAll(transcripts);
    const analytics = computeAnalytics(calls);

    return NextResponse.json({ analytics, dateRange: { from, to } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
