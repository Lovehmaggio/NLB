import React, { useState } from 'react';
import { AlertTriangle, Zap, ShieldAlert, Car, Lock, CheckCircle2, ChevronRight, XCircle } from 'lucide-react';

export const SlideProblem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'medical' | 'database' | 'transit'>('medical');

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-8 md:p-12 lg:p-14 overflow-hidden bg-slate-950 text-white select-none">
      {/* Background glow */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            The Mission Challenge
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
            Why Standard Consumer Navigation Fails During Natural Disasters
          </h2>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Slide 02 · Problem Statement
        </div>
      </div>

      {/* Main Content Split */}
      <div className="my-auto py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: 3 Critical Failure Modes */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          <div
            onClick={() => setActiveTab('medical')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'medical'
                ? 'bg-amber-950/40 border-amber-500/60 shadow-lg shadow-amber-950/50'
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <Zap className="w-4 h-4" />
                <span>1. Electricity-Dependent Medical Life Support</span>
              </div>
              <span className="text-[10px] font-mono text-amber-300">4.4M Patients</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Evacuees relying on powered ventilators, oxygen concentrators, CPAPs, or refrigerated insulin are directed to generic shelters that have NO backup generators. During blackout surges, this causes preventable casualties.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('database')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'database'
                ? 'bg-rose-950/40 border-rose-500/60 shadow-lg shadow-rose-950/50'
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                <Lock className="w-4 h-4" />
                <span>2. The "CLOSED" Status Standby Trap</span>
              </div>
              <span className="text-[10px] font-mono text-rose-300">1,326 NSS Records</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Federal shelter databases list all shelters as "CLOSED" until an emergency declaration is finalized. Evacuees preparing 12–24 hours in advance find zero options unless an intelligent Preview Bypass is applied.
            </p>
          </div>

          <div
            onClick={() => setActiveTab('transit')}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'transit'
                ? 'bg-blue-950/40 border-blue-500/60 shadow-lg shadow-blue-950/50'
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                <Car className="w-4 h-4" />
                <span>3. Zero-Vehicle & High-SVI Vulnerability</span>
              </div>
              <span className="text-[10px] font-mono text-blue-300">Census ACS / SVI</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Standard consumer apps assume every user owns a vehicle and can drive anywhere. Without demographic spatial awareness, transit-dependent households are left stranded in evacuation zones.
            </p>
          </div>
        </div>

        {/* Right Side: Direct Comparison Visual */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              Direct Capability Comparison
            </h3>
            <span className="text-xs text-slate-400">Ground-Truth Reality</span>
          </div>

          <div className="my-auto py-2 space-y-3">
            {/* Row 1 */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <div className="text-xs font-semibold text-slate-300 mb-2">
                Medical & Generator Capability Matching
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2 text-rose-300 bg-rose-950/30 p-2 rounded-lg border border-rose-900/40">
                  <XCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                  <span>Consumer Maps: No generator flags; zero visibility into medical ventilators or oxygen needs.</span>
                </div>
                <div className="flex items-start gap-2 text-emerald-300 bg-emerald-950/30 p-2 rounded-lg border border-emerald-900/40">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>Our System: HHS emPOWER + FEMA NSS filter ensures active backup generator match.</span>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <div className="text-xs font-semibold text-slate-300 mb-2">
                Evacuation Preparation Window (Pre-Declaration)
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2 text-rose-300 bg-rose-950/30 p-2 rounded-lg border border-rose-900/40">
                  <XCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                  <span>Consumer Search: Displays "Closed" or "Permanently Inactive" for school/arena sites.</span>
                </div>
                <div className="flex items-start gap-2 text-emerald-300 bg-emerald-950/30 p-2 rounded-lg border border-emerald-900/40">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>Our System: Preview Mode activates registered standby hubs with capacity forecasts.</span>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
              <div className="text-xs font-semibold text-slate-300 mb-2">
                Data Authority & Legal Reliability
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2 text-rose-300 bg-rose-950/30 p-2 rounded-lg border border-rose-900/40">
                  <XCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                  <span>Consumer Crowdsourcing: Unverified social posts or stale Yelp listings.</span>
                </div>
                <div className="flex items-start gap-2 text-emerald-300 bg-emerald-950/30 p-2 rounded-lg border border-emerald-900/40">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span>Our System: 7 official federal agencies (FEMA, CDC, HHS, Census, CMS) in BigQuery GIS.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
            <span>Result: Targeted, safe evacuation before routes flood</span>
            <span className="text-cyan-400 font-medium flex items-center gap-1">
              Explore Federal Sources <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <span>Emergency Shelter Finder · Visual Storytelling</span>
        <span className="font-mono text-slate-400">Target audience: Emergency Operations Centers, Evacuees, First Responders</span>
      </div>
    </div>
  );
};
