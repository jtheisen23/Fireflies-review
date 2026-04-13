"use client";

import Header from "@/components/layout/Header";
import BuyingTriggers from "@/components/insights/BuyingTriggers";
import VerticalBreakdown from "@/components/insights/VerticalBreakdown";
import Recommendations from "@/components/insights/Recommendations";

export default function InsightsPage() {
  return (
    <>
      <Header
        title="Insights & Recommendations"
        subtitle="Strategic takeaways from prospect conversations"
      />
      <div className="space-y-6">
        <BuyingTriggers />
        <VerticalBreakdown />
        <Recommendations />
      </div>
    </>
  );
}
