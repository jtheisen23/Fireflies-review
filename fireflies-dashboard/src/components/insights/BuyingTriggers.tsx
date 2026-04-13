"use client";

import { Zap } from "lucide-react";

const TRIGGERS = [
  {
    title: "Legacy Platform Frustration",
    desc: "Prospects actively seeking to leave Punch, Lunchbox, Como, Patronics, and legacy POS loyalty modules.",
  },
  {
    title: "AI Capability Gap",
    desc: "Prospects recognize they lack AI-driven personalization and want to leapfrog competitors.",
  },
  {
    title: "POS Migration Timing",
    desc: "Many brands migrating POS (Revel to Toast, Micros to Toast, Aloha to Q) creating natural loyalty re-evaluation window.",
  },
  {
    title: "Single-Person Marketing Teams",
    desc: "Multiple prospects need automation to scale loyalty across 40-800 locations without adding headcount.",
  },
];

export default function BuyingTriggers() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900">
        <Zap className="h-5 w-5 text-orange-500" />
        Top Buying Triggers
      </h3>
      <div className="space-y-3">
        {TRIGGERS.map((t, i) => (
          <div key={i} className="rounded-lg bg-slate-50 p-4">
            <p className="font-medium text-slate-800">
              {i + 1}. {t.title}
            </p>
            <p className="mt-1 text-sm text-slate-600">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
