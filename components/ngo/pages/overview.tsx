
"use client";

import { Leaf, Users, MapPin, IndianRupee, Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import { PortalPageHeader } from "@/components/portal/kpi-card";
import { MetricCard } from "@/components/portal/metric-card";
import { NGO_USER, NGO_VOLUNTEERS } from "@/lib/data/ngo-mock";

export function NgoOverviewPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-6">
      <PortalPageHeader
        icon={<Leaf size={20} />}
        iconBg="bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20"
        title={`Welcome back, ${NGO_USER.name}!`}
        subtitle="Manage your volunteers, field operations, and community impact."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        <MetricCard
          icon={<Users className="h-4 w-4 text-sky-600" />}
          title="Total Volunteers"
          value={NGO_VOLUNTEERS.length}
          growth="+1"
          subtext="new this week"
          tone="sky"
          delay={0}
        />
        <MetricCard
          icon={<MapPin className="h-4 w-4 text-emerald-600" />}
          title="Active Field Sites"
          value="4"
          growth="+2"
          subtext="vs last month"
          tone="emerald"
          delay={0.1}
        />
        <MetricCard
          icon={<IndianRupee className="h-4 w-4 text-rose-600" />}
          title="Funds Deployed"
          value="16,500"
          growth="+12%"
          subtext="this quarter"
          tone="rose"
          delay={0.2}
        />
        <MetricCard
          icon={<TrendingUp className="h-4 w-4 text-amber-600" />}
          title="Community Impact"
          value="2,400"
          growth="+18%"
          subtext="lives improved"
          tone="amber"
          delay={0.3}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5 shadow-xs">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-600" />
            <h2 className="text-sm font-bold text-slate-900">AI Resource Allocation</h2>
          </div>
          <p className="text-sm text-slate-700 mb-4">
            Based on current civic reports in Jodhpur, AI suggests deploying <strong className="font-bold text-amber-700">3 volunteers</strong> to Sector 8 for an immediate waste clearance drive.
          </p>
          <button className="w-full rounded-xl bg-amber-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-amber-700">
            Auto-Deploy Available Volunteers
          </button>
        </div>

        <div className="rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-white p-5 shadow-xs">
          <div className="mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-rose-600" />
            <h2 className="text-sm font-bold text-slate-900">AI Funding Predictor</h2>
          </div>
          <p className="text-sm text-slate-700 mb-4">
            The upcoming &quot;Lake Cleanup&quot; civic issue is predicted to require <strong className="font-bold text-rose-700">₹25,000</strong> in logistics and material costs based on historical data.
          </p>
          <div className="h-2 w-full rounded-full bg-rose-100">
            <div className="h-2 w-[40%] rounded-full bg-rose-500"></div>
          </div>
          <p className="mt-2 text-xs font-bold text-rose-800">40% of predicted funds currently available</p>
        </div>
      </div>
    </div>
  );
}

