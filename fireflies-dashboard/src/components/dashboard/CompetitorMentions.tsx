"use client";

import { CompetitorMention } from "@/types";

interface CompetitorMentionsProps {
  data: CompetitorMention[];
}

export default function CompetitorMentions({ data }: CompetitorMentionsProps) {
  if (data.length === 0) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-slate-900">
        Competitor Mentions
      </h3>
      <div className="space-y-3">
        {data.map((comp) => (
          <div key={comp.name} className="flex items-center justify-between">
            <div>
              <span className="font-medium text-slate-800">{comp.name}</span>
              <p className="text-xs text-slate-500">
                {comp.prospects.slice(0, 3).join(", ")}
                {comp.prospects.length > 3 && ` +${comp.prospects.length - 3} more`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-2 rounded-full bg-red-400"
                style={{ width: `${Math.max(comp.count * 20, 20)}px` }}
              />
              <span className="text-sm font-semibold text-slate-700">
                {comp.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
