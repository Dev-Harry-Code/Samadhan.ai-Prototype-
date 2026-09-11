import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

interface CommunityImpactChartProps {
  isMobileFrame?: boolean;
}

export const CommunityImpactChart: React.FC<CommunityImpactChartProps> = ({
  isMobileFrame = false,
}) => {
  const [activeRange, setActiveRange] = useState<'month' | 'quarter' | 'year'>('month');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(4);

  // Monthly trends data
  const data = [
    { month: 'Apr', submitted: 45, resolved: 32 },
    { month: 'May', submitted: 65, resolved: 50 },
    { month: 'Jun', submitted: 88, resolved: 72 },
    { month: 'Jul', submitted: 110, resolved: 94 },
    { month: 'Aug', submitted: 145, resolved: 128 },
    { month: 'Sep', submitted: 190, resolved: 175 },
    { month: 'Oct', submitted: 220, resolved: 205 },
  ];

  const maxVal = 240;

  return (
    <div className="bg-white border border-slate-200 shadow-sm p-4 sm:p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-full min-h-[390px] box-border">
      {/* Header with Title & Filter controls */}
      <div className={`flex ${isMobileFrame ? 'flex-col items-start gap-3' : 'flex-col sm:flex-row sm:items-center justify-between gap-3'} mb-4 relative z-10`}>
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600 flex-shrink-0" />
            <h3 className="text-base sm:text-lg font-black tracking-tight whitespace-normal text-slate-900">
              Community Impact Analytics
            </h3>
            <span className="flex h-2 w-2 relative flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
            </span>
          </div>
          <p className="text-xs mt-0.5 text-slate-500">
            Civic challenges submitted vs. verified solutions
          </p>
        </div>

        {/* Time range selector */}
        <div className={`flex items-center p-1 rounded-xl text-xs font-semibold ${isMobileFrame ? 'w-full justify-between' : 'self-start sm:self-auto flex-shrink-0'} bg-slate-100 border border-slate-200`}>
          <button
            onClick={() => setActiveRange('month')}
            className={`px-3 py-1.5 rounded-lg transition-all ${isMobileFrame ? 'flex-1 text-center' : ''} ${activeRange === 'month' ? 'bg-teal-600 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            This Month
          </button>
          <button
            onClick={() => setActiveRange('quarter')}
            className={`px-3 py-1.5 rounded-lg transition-all ${isMobileFrame ? 'flex-1 text-center' : ''} ${activeRange === 'quarter' ? 'bg-teal-600 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Quarter
          </button>
          <button
            onClick={() => setActiveRange('year')}
            className={`px-3 py-1.5 rounded-lg transition-all ${isMobileFrame ? 'flex-1 text-center' : ''} ${activeRange === 'year' ? 'bg-teal-600 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Year
          </button>
        </div>
      </div>

      {/* Legend & Ratio */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
            <span className="text-slate-700 font-medium">
              Resolved ({hoveredIndex !== null ? data[hoveredIndex].resolved : 175})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
            <span className="text-slate-500 font-medium">
              Submitted ({hoveredIndex !== null ? data[hoveredIndex].submitted : 190})
            </span>
          </div>
        </div>
        <div className="font-mono text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
          Resolution Rate: 92.1%
        </div>
      </div>

      {/* Custom Bounded Bar Chart */}
      <div className="h-44 w-full flex items-end justify-between gap-1 sm:gap-3 pt-3 px-1 sm:px-3 relative z-10">
        {data.map((item, idx) => {
          const resolvedHeight = Math.min(100, Math.max(12, (item.resolved / maxVal) * 100));
          const submittedHeight = Math.min(100, Math.max(12, (item.submitted / maxVal) * 100));
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer max-w-[42px]"
            >
              {/* Tooltip on active */}
              <div className="h-6 flex items-center justify-center">
                {isHovered ? (
                  <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-md bg-slate-900 text-white">
                    {item.resolved} fixed
                  </span>
                ) : null}
              </div>

              {/* Bars container */}
              <div className="w-full flex items-end justify-center gap-1.5 h-28 relative">
                {/* Submitted Bar */}
                <div
                  style={{ height: `${submittedHeight}%` }}
                  className="w-2 sm:w-3 rounded-t-md transition-all duration-300 bg-slate-200 group-hover:bg-slate-300"
                ></div>

                {/* Resolved Bar */}
                <div
                  style={{ height: `${resolvedHeight}%` }}
                  className={`w-2 sm:w-3 rounded-t-md transition-all duration-300 relative ${
                    isHovered
                      ? 'bg-teal-700 shadow-sm'
                      : 'bg-teal-600'
                  }`}
                ></div>
              </div>

              {/* Month label */}
              <span className={`text-[10px] sm:text-[11px] font-bold mt-2 transition-colors ${
                isHovered ? 'text-slate-900 font-black' : 'text-slate-500'
              }`}>
                {item.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
