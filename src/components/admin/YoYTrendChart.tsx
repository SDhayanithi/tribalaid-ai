import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

export const YoYTrendChart: React.FC = () => {
  const yoyData = [
    { year: '2023', Applications: 16400, Selections: 5200, DisbursementCr: 12.2 },
    { year: '2024', Applications: 18900, Selections: 6100, DisbursementCr: 14.5 },
    { year: '2025', Applications: 21800, Selections: 7200, DisbursementCr: 16.8 },
    { year: '2026', Applications: 24821, Selections: 8214, DisbursementCr: 18.4 }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Year-on-Year Programme Trajectory (2023 - 2026)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            4-year intake scaling across ST scholarship and fellowship schemes
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-blue-700">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Applications (+51.3%)
          </span>
          <span className="flex items-center gap-1.5 text-emerald-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> Selections (+57.9%)
          </span>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={yoyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey="year" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={{ stroke: '#E2E8F0' }} />
            <YAxis tick={{ fill: '#64748B', fontSize: 11 }} axisLine={{ stroke: '#E2E8F0' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0F172A',
                border: 'none',
                borderRadius: '12px',
                color: '#FFFFFF',
                fontSize: '12px'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
            <Bar dataKey="Applications" fill="#2563EB" radius={[4, 4, 0, 0]} name="Applications Received" />
            <Bar dataKey="Selections" fill="#059669" radius={[4, 4, 0, 0]} name="Candidates Selected" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
