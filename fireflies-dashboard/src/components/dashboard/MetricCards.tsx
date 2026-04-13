"use client";

import { Phone, Users, Clock, TrendingUp } from "lucide-react";

interface MetricCardsProps {
  totalCalls: number;
  uniqueProspects: number;
  avgDuration: number;
  topTopic: string;
}

export default function MetricCards({
  totalCalls,
  uniqueProspects,
  avgDuration,
  topTopic,
}: MetricCardsProps) {
  const cards = [
    { label: "Prospect Calls", value: totalCalls, icon: Phone, color: "text-blue-600 bg-blue-50" },
    { label: "Unique Prospects", value: uniqueProspects, icon: Users, color: "text-green-600 bg-green-50" },
    { label: "Avg Duration", value: `${avgDuration} min`, icon: Clock, color: "text-orange-600 bg-orange-50" },
    { label: "Top Topic", value: topTopic, icon: TrendingUp, color: "text-purple-600 bg-purple-50" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className={`rounded-lg p-2.5 ${card.color}`}>
              <card.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                {card.label}
              </p>
              <p className="text-xl font-bold text-slate-900">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
