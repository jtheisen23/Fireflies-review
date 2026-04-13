export interface FirefliesTranscript {
  id: string;
  title: string;
  dateString: string;
  duration: number;
  organizerEmail: string;
  meetingLink: string;
  summary: {
    short_summary: string;
    keywords: string[];
    action_items: string;
  } | null;
  meetingAttendees: { displayName: string | null; email: string }[];
  participants: string[];
}

export interface ProcessedCall {
  id: string;
  date: string;
  title: string;
  company: string;
  contacts: string[];
  duration: number;
  topics: TopicTag[];
  competitorMentions: string[];
  summary: string;
  nextSteps: string;
  isProspect: boolean;
}

export type TopicSlug =
  | "ai-personalization"
  | "pos-integration"
  | "loyalty-migration"
  | "cdp-data-unification"
  | "gamification"
  | "pricing"
  | "online-ordering"
  | "mobile-whitelabel"
  | "analytics-dashboards"
  | "gift-cards";

export interface TopicTag {
  slug: TopicSlug;
  label: string;
  color: string;
}

export interface TopicFrequency {
  slug: TopicSlug;
  label: string;
  count: number;
  percentage: number;
  color: string;
}

export interface CompetitorMention {
  name: string;
  count: number;
  prospects: string[];
}

export interface WeeklyTrend {
  week: string;
  calls: number;
}

export interface Analytics {
  totalCalls: number;
  uniqueProspects: number;
  avgDuration: number;
  topTopics: TopicFrequency[];
  competitorMentions: CompetitorMention[];
  weeklyTrends: WeeklyTrend[];
}

export interface ReportPayload {
  generatedAt: string;
  dateRange: { from: string; to: string };
  analytics: Analytics;
  calls: ProcessedCall[];
}
