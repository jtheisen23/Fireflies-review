"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import CallTable from "@/components/calls/CallTable";
import { ProcessedCall } from "@/types";

export default function CallsPage() {
  const [calls, setCalls] = useState<ProcessedCall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/calls")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setCalls(data.calls);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-sm text-slate-500">Loading call log...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="font-medium text-red-800">Failed to load calls</p>
        <p className="mt-1 text-sm text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Header
        title="Prospect Call Log"
        subtitle={`${calls.length} prospect calls in the last 3 months`}
      />
      <CallTable calls={calls} />
    </>
  );
}
