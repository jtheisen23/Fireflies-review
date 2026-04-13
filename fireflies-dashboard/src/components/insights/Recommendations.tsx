"use client";

import { Target } from "lucide-react";

const RECS = [
  "Lead with AI story — It's the #1 differentiator prospects respond to; make it the first 5 minutes of every demo.",
  "Standardize the migration playbook — 62% of prospects are switching from a competitor; smooth migration is a key buying factor.",
  "Package the 60-day trial more aggressively — Free trials are converting interest to engagement consistently.",
  "Build POS migration partnerships — Toast, NCR, and Q transitions are creating a natural funnel; deepen referral channels.",
  "Create vertical-specific case studies — Casual dining and QSR have different needs; tailor proof points accordingly.",
  "Address the 'single marketer' persona — Position AI as the force multiplier for teams managing loyalty across 40-800 locations.",
];

export default function Recommendations() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900">
        <Target className="h-5 w-5 text-blue-600" />
        Recommendations for the Team
      </h3>
      <ol className="space-y-3">
        {RECS.map((rec, i) => (
          <li key={i} className="flex gap-3 rounded-lg bg-blue-50/50 p-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              {i + 1}
            </span>
            <p className="text-sm text-slate-700">{rec}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
