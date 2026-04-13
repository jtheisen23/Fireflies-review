import { TopicSlug, TopicTag } from "@/types";

export const TOPIC_DEFINITIONS: Record<
  TopicSlug,
  { label: string; color: string; keywords: string[] }
> = {
  "ai-personalization": {
    label: "AI / Personalization",
    color: "#2E75B6",
    keywords: [
      "ai", "personalization", "personalized", "segmentation", "segment",
      "machine learning", "natural language", "ai-driven", "ai-powered",
      "automated campaign", "smart", "intelligent", "copilot",
    ],
  },
  "pos-integration": {
    label: "POS Integration",
    color: "#548235",
    keywords: [
      "toast", "pos", "point of sale", "ncr", "aloha", "micros", "revel",
      "par", "integration", "api", "transaction", "backfill",
    ],
  },
  "loyalty-migration": {
    label: "Loyalty Migration",
    color: "#ED7D31",
    keywords: [
      "migration", "migrate", "switch", "replace", "legacy", "contract",
      "punch", "lunchbox", "como", "patronics", "incumbent", "transition",
    ],
  },
  "cdp-data-unification": {
    label: "CDP / Data Unification",
    color: "#7030A0",
    keywords: [
      "cdp", "customer data platform", "data unification", "unified",
      "snowflake", "data warehouse", "omnichannel", "profile", "crm",
    ],
  },
  gamification: {
    label: "Gamification",
    color: "#FF6384",
    keywords: [
      "gamification", "gamified", "game", "quest", "challenge", "reward",
      "redemption", "participation", "engagement", "tier", "tiered",
    ],
  },
  pricing: {
    label: "Pricing",
    color: "#36A2EB",
    keywords: [
      "pricing", "price", "cost", "per store", "per location", "budget",
      "roi", "fee", "trial", "free", "discount",
    ],
  },
  "online-ordering": {
    label: "Online Ordering",
    color: "#FFCE56",
    keywords: [
      "ordering", "online order", "olo", "doordash", "delivery", "pickup",
      "e-commerce", "ecommerce", "checkout", "apple pay", "google pay",
    ],
  },
  "mobile-whitelabel": {
    label: "Mobile / White-Label",
    color: "#4BC0C0",
    keywords: [
      "mobile app", "pwa", "progressive web app", "native app", "white label",
      "white-label", "branded", "front-end", "frontend", "app store",
    ],
  },
  "analytics-dashboards": {
    label: "Analytics / Dashboards",
    color: "#9966FF",
    keywords: [
      "dashboard", "analytics", "reporting", "report", "cohort", "insight",
      "visualization", "chart", "metric", "kpi",
    ],
  },
  "gift-cards": {
    label: "Gift Cards",
    color: "#FF9F40",
    keywords: [
      "gift card", "gift cards", "stored value", "prepaid", "gift",
    ],
  },
};

export const COMPETITORS = [
  "Patronics", "Lunchbox", "Como", "PAR", "Biki", "Global", "Genius",
  "Punchh", "Punch", "Paytronix", "Toast Loyalty", "Square Loyalty",
];

export const INTERNAL_DOMAINS = [
  "hang.com", "toasttab.com", "fireflies.ai", "bcc.hubspot.com",
];

export function getTopicTag(slug: TopicSlug): TopicTag {
  const def = TOPIC_DEFINITIONS[slug];
  return { slug, label: def.label, color: def.color };
}

export function getAllTopicSlugs(): TopicSlug[] {
  return Object.keys(TOPIC_DEFINITIONS) as TopicSlug[];
}
