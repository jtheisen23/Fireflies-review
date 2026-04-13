"use client";

import { Building2 } from "lucide-react";

const VERTICALS = [
  {
    name: "QSR / Fast Casual",
    color: "bg-blue-100 text-blue-800",
    brands: ["Galardi (Wienerschnitzel)", "Naf Naf", "Bagel Brands", "Sambazon", "Better Buzz"],
  },
  {
    name: "Casual Dining",
    color: "bg-green-100 text-green-800",
    brands: ["Friendly Toast", "Melting Pot", "Gastamo", "bartaco", "Snooze"],
  },
  {
    name: "Multi-Unit Operators",
    color: "bg-purple-100 text-purple-800",
    brands: ["Delaware North/Patina (26+ loc)", "Maman (52-70)", "Portillo's", "La La Land"],
  },
  {
    name: "Emerging / Growth",
    color: "bg-orange-100 text-orange-800",
    brands: ["Three Notch'd (expanding)", "Klatch (15-30)", "Chill Bros", "Simply Salad"],
  },
];

export default function VerticalBreakdown() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900">
        <Building2 className="h-5 w-5 text-green-600" />
        Verticals Showing Strongest Interest
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {VERTICALS.map((v) => (
          <div key={v.name} className="rounded-lg border border-slate-100 p-4">
            <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${v.color}`}>
              {v.name}
            </span>
            <div className="mt-2 space-y-1">
              {v.brands.map((b) => (
                <p key={b} className="text-sm text-slate-600">{b}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
