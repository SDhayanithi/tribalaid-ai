import React from 'react';
import { MapPin, TrendingUp, Users, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTribalAid } from '../../context/TribalAidContext';
import { StateAnalytics } from '../../types';

export const StateAnalyticsMap: React.FC = () => {
  const { stateAnalytics, selectedState, setSelectedState } = useTribalAid();

  const activeData =
    stateAnalytics.find((s) => s.state === selectedState) || stateAnalytics[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 lg:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            State & Regional Penetration Analytics
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              PAN-India Tribal Belts
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Select a state to inspect intake density, verified beneficiaries, and top tribal districts
          </p>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Click any state card to filter insights
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left State Selection Pills / Cards */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-2 gap-2.5">
          {stateAnalytics.map((st) => {
            const isSelected = st.state === selectedState;
            return (
              <div
                key={st.state}
                onClick={() => setSelectedState(st.state)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-400/40'
                    : 'bg-slate-50/70 hover:bg-slate-100/80 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm leading-tight">{st.state}</h4>
                    <p
                      className={`text-xs mt-1 font-mono ${
                        isSelected ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {st.applications.toLocaleString('en-IN')} applications
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
                      isSelected
                        ? 'bg-blue-700/80 text-blue-100'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    +{st.growthYoY}%
                  </span>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/40 flex items-center justify-between text-[11px]">
                  <span className={isSelected ? 'text-blue-100' : 'text-slate-500'}>
                    Selected: {st.selected}
                  </span>
                  <span
                    className={`font-semibold font-mono ${
                      isSelected ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    ₹{st.disbursedCr} Cr
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Deep-Dive State Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-5 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold">
                  State Regional Focus
                </span>
                <h4 className="text-xl font-extrabold text-white mt-0.5">{activeData.state}</h4>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                +{activeData.growthYoY}% YoY Growth
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Total Applications
                </span>
                <span className="text-lg font-black text-white mt-1 block">
                  {activeData.applications.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-400">11.4% of national volume</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Verified Candidates
                </span>
                <span className="text-lg font-black text-emerald-400 mt-1 block">
                  {activeData.verified.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-400">77.8% clearance rate</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Awarded Fellows
                </span>
                <span className="text-lg font-black text-amber-400 mt-1 block">
                  {activeData.selected.toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-slate-400">Final sanctioned awards</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">
                  Direct Benefit Disbursed
                </span>
                <span className="text-lg font-black text-white mt-1 block">
                  ₹{activeData.disbursedCr} Cr
                </span>
                <span className="text-[10px] text-slate-400">100% Aadhaar DBT</span>
              </div>
            </div>

            {/* Top Tribal Districts */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-bold block mb-2">
                High-Volume Tribal Districts:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeData.topDistricts.map((d) => (
                  <span
                    key={d}
                    className="px-2 py-0.5 rounded-lg bg-blue-900/40 text-blue-200 border border-blue-700/50 text-xs font-mono"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              State Nodal Agency Synchronized
            </span>
            <span className="text-[11px] font-mono text-slate-500">Live Telemetry</span>
          </div>
        </div>
      </div>
    </div>
  );
};
