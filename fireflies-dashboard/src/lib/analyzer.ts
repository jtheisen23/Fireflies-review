import {
  FirefliesTranscript,
  ProcessedCall,
  TopicTag,
  TopicFrequency,
  CompetitorMention,
  WeeklyTrend,
  Analytics,
} from "@/types";
import {
  TOPIC_DEFINITIONS,
  COMPETITORS,
  INTERNAL_DOMAINS,
  getTopicTag,
  getAllTopicSlugs,
} from "./constants";
import { startOfWeek, format } from "date-fns";

function isInternalEmail(email: string): boolean {
  return INTERNAL_DOMAINS.some((d) => email.endsWith(`@${d}`));
}

function extractCompany(transcript: FirefliesTranscript): string {
  const external = transcript.meetingAttendees.filter(
    (a) => a.email && !isInternalEmail(a.email),
  );
  if (external.length > 0) {
    const domain = external[0].email.split("@")[1];
    return domain.split(".")[0].charAt(0).toUpperCase() + domain.split(".")[0].slice(1);
  }
  const title = transcript.title;
  const parts = title.split(/[+\-|\/]/);
  if (parts.length > 1) {
    const candidate = parts.find(
      (p) => !p.toLowerCase().includes("hang") && p.trim().length > 0,
    );
    if (candidate) return candidate.trim();
  }
  return title;
}

function extractContacts(transcript: FirefliesTranscript): string[] {
  return transcript.meetingAttendees
    .filter((a) => a.email && !isInternalEmail(a.email))
    .map((a) => a.displayName || a.email);
}

function detectTopics(transcript: FirefliesTranscript): TopicTag[] {
  const text = [
    transcript.title,
    transcript.summary?.short_summary || "",
    (transcript.summary?.keywords || []).join(" "),
    transcript.summary?.action_items || "",
  ]
    .join(" ")
    .toLowerCase();

  const matched: TopicTag[] = [];
  for (const slug of getAllTopicSlugs()) {
    const def = TOPIC_DEFINITIONS[slug];
    if (def.keywords.some((kw) => text.includes(kw))) {
      matched.push(getTopicTag(slug));
    }
  }
  return matched;
}

function detectCompetitors(transcript: FirefliesTranscript): string[] {
  const text = [
    transcript.summary?.short_summary || "",
    transcript.summary?.action_items || "",
  ]
    .join(" ")
    .toLowerCase();

  return COMPETITORS.filter((c) => text.includes(c.toLowerCase()));
}

function isProspectCall(transcript: FirefliesTranscript): boolean {
  const hasExternal = transcript.meetingAttendees.some(
    (a) => a.email && !isInternalEmail(a.email),
  );
  if (!hasExternal) return false;
  const allInternal = transcript.meetingAttendees.every(
    (a) => !a.email || isInternalEmail(a.email),
  );
  return !allInternal;
}

export function processTranscript(t: FirefliesTranscript): ProcessedCall {
  return {
    id: t.id,
    date: t.dateString,
    title: t.title,
    company: extractCompany(t),
    contacts: extractContacts(t),
    duration: Math.round(t.duration),
    topics: detectTopics(t),
    competitorMentions: detectCompetitors(t),
    summary: t.summary?.short_summary || "",
    nextSteps: t.summary?.action_items || "",
    isProspect: isProspectCall(t),
  };
}

export function processAll(transcripts: FirefliesTranscript[]): ProcessedCall[] {
  return transcripts.map(processTranscript);
}

export function computeAnalytics(calls: ProcessedCall[]): Analytics {
  const prospectCalls = calls.filter((c) => c.isProspect);

  const topicCounts: Record<string, number> = {};
  for (const slug of getAllTopicSlugs()) topicCounts[slug] = 0;
  for (const call of prospectCalls) {
    for (const topic of call.topics) {
      topicCounts[topic.slug] = (topicCounts[topic.slug] || 0) + 1;
    }
  }

  const topTopics: TopicFrequency[] = getAllTopicSlugs()
    .map((slug) => ({
      slug,
      label: TOPIC_DEFINITIONS[slug].label,
      count: topicCounts[slug],
      percentage:
        prospectCalls.length > 0
          ? Math.round((topicCounts[slug] / prospectCalls.length) * 100)
          : 0,
      color: TOPIC_DEFINITIONS[slug].color,
    }))
    .sort((a, b) => b.count - a.count);

  const compMap = new Map<string, { count: number; prospects: Set<string> }>();
  for (const call of prospectCalls) {
    for (const comp of call.competitorMentions) {
      const entry = compMap.get(comp) || { count: 0, prospects: new Set() };
      entry.count++;
      entry.prospects.add(call.company);
      compMap.set(comp, entry);
    }
  }
  const competitorMentions: CompetitorMention[] = Array.from(compMap.entries())
    .map(([name, data]) => ({
      name,
      count: data.count,
      prospects: Array.from(data.prospects),
    }))
    .sort((a, b) => b.count - a.count);

  const weekMap = new Map<string, number>();
  for (const call of prospectCalls) {
    const weekStart = startOfWeek(new Date(call.date), { weekStartsOn: 1 });
    const key = format(weekStart, "MMM d");
    weekMap.set(key, (weekMap.get(key) || 0) + 1);
  }
  const weeklyTrends: WeeklyTrend[] = Array.from(weekMap.entries())
    .map(([week, count]) => ({ week, calls: count }))
    .sort((a, b) => a.week.localeCompare(b.week));

  const uniqueCompanies = new Set(prospectCalls.map((c) => c.company));

  return {
    totalCalls: prospectCalls.length,
    uniqueProspects: uniqueCompanies.size,
    avgDuration:
      prospectCalls.length > 0
        ? Math.round(
            prospectCalls.reduce((sum, c) => sum + c.duration, 0) /
              prospectCalls.length,
          )
        : 0,
    topTopics,
    competitorMentions,
    weeklyTrends,
  };
}
