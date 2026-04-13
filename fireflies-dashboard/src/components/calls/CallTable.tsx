"use client";

import { useState, useMemo } from "react";
import { ProcessedCall } from "@/types";
import { format } from "date-fns";

interface CallTableProps {
  calls: ProcessedCall[];
}

export default function CallTable({ calls }: CallTableProps) {
  const [sortField, setSortField] = useState<"date" | "company" | "duration">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [topicFilter, setTopicFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const allTopics = useMemo(() => {
    const set = new Set<string>();
    calls.forEach((c) => c.topics.forEach((t) => set.add(t.label)));
    return Array.from(set).sort();
  }, [calls]);

  const filtered = useMemo(() => {
    let result = [...calls];
    if (topicFilter) {
      result = result.filter((c) => c.topics.some((t) => t.label === topicFilter));
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.company.toLowerCase().includes(q) ||
          c.contacts.some((ct) => ct.toLowerCase().includes(q)) ||
          c.title.toLowerCase().includes(q),
      );
    }
    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === "date") cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
      else if (sortField === "company") cmp = a.company.localeCompare(b.company);
      else cmp = a.duration - b.duration;
      return sortDir === "desc" ? -cmp : cmp;
    });
    return result;
  }, [calls, topicFilter, searchQuery, sortField, sortDir]);

  function toggleSort(field: typeof sortField) {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  const sortIcon = (field: typeof sortField) =>
    sortField === field ? (sortDir === "desc" ? " ↓" : " ↑") : "";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search company or contact..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <select
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        >
          <option value="">All Topics</option>
          {allTopics.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <span className="text-sm text-slate-500">
          {filtered.length} call{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th
                className="cursor-pointer px-4 py-3 text-left font-semibold text-slate-700"
                onClick={() => toggleSort("date")}
              >
                Date{sortIcon("date")}
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Contact(s)</th>
              <th
                className="cursor-pointer px-4 py-3 text-left font-semibold text-slate-700"
                onClick={() => toggleSort("company")}
              >
                Company{sortIcon("company")}
              </th>
              <th
                className="cursor-pointer px-4 py-3 text-center font-semibold text-slate-700"
                onClick={() => toggleSort("duration")}
              >
                Duration{sortIcon("duration")}
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Topics</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((call, i) => (
              <tr
                key={call.id}
                className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
              >
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                  {format(new Date(call.date), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {call.contacts.slice(0, 2).join(", ")}
                  {call.contacts.length > 2 && ` +${call.contacts.length - 2}`}
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">{call.company}</td>
                <td className="px-4 py-3 text-center text-slate-600">{call.duration} min</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {call.topics.slice(0, 3).map((t) => (
                      <span
                        key={t.slug}
                        className="inline-block rounded-full px-2 py-0.5 text-xs font-medium text-white"
                        style={{ backgroundColor: t.color }}
                      >
                        {t.label}
                      </span>
                    ))}
                    {call.topics.length > 3 && (
                      <span className="text-xs text-slate-400">
                        +{call.topics.length - 3}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                  No calls found matching filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
