import React from 'react';
import { BarChart2, ListChecks, PieChart } from 'lucide-react';

const Stat = ({ label, value, hint }) => (
  <div className="flex-1 rounded-xl bg-black/30 border border-white/10 p-4">
    <div className="text-white/60 text-xs">{label}</div>
    <div className="text-white text-2xl font-semibold mt-1">{value}</div>
    {hint && <div className="text-white/50 text-xs mt-1">{hint}</div>}
  </div>
);

const AnalyticsPreview = () => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5">
      <div className="flex items-center gap-2 text-white/90">
        <BarChart2 size={18} className="text-emerald-300" />
        <h3 className="font-medium">Analytics Snapshot</h3>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <Stat label="Topics" value="—" hint="Upload PDFs to extract" />
        <Stat label="Question Clusters" value="—" hint="Auto-clustered" />
        <Stat label="Repeated Questions" value="—" hint="Deduplicated" />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-black/20 h-40 flex items-center justify-center text-white/50">
          <PieChart className="mr-2" size={18} /> Topic Frequency Chart
        </div>
        <div className="rounded-xl border border-white/10 bg-black/20 h-40 flex items-center justify-center text-white/50">
          <ListChecks className="mr-2" size={18} /> Cluster Distribution
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPreview;
