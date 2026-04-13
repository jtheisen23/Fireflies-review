"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import MetricCards from "@/components/dashboard/MetricCards";
import TopicChart from "@/components/dashboard/TopicChart";
import TrendChart from "@/components/dashboard/TrendChart";
import CompetitorMentions from "@/components/dashboard/CompetitorMentions";
import { Analytics } from "@/types";

export default function DashboardPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setAnalytics(data.analytics);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-sm text-slate-500">Loading analytics from Fireflies...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="font-medium text-red-800">Failed to load analytics</p>
        <p className="mt-1 text-sm text-red-600">{error}</p>
        <p className="mt-2 text-sm text-red-500">
          Make sure FIREFLIES_API_KEY is set in .env.local
        </p>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <>
      <Header
        title="Prospect Intelligence Dashboard"
        subtitle="Analyzing prospect calls from the last 3 months"
      />
      <div className="space-y-6">
        <MetricCards
          totalCalls={analytics.totalCalls}
          uniqueProspects={analytics.uniqueProspects}
          avgDuration={analytics.avgDuration}
          topTopic={analytics.topTopics[0]?.label || "N/A"}
        />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TopicChart data={analytics.topTopics} />
          </div>
          <CompetitorMentions data={analytics.competitorMentions} />
        </div>
        <TrendChart data={analytics.weeklyTrends} />
      </div>
    </>
  );
}
