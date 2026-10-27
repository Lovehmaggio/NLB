import React from 'react';
import { Shield, Radio, Database, MapPin, Zap, ArrowRight, Activity, Cpu } from 'lucide-react';

interface SlideCoverProps {
  onStartDemo: () => void;
}

export const SlideCover: React.FC<SlideCoverProps> = ({ onStartDemo }) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-8 md:p-12 lg:p-16 overflow-hidden bg-gradient-to-br from-slate-950 via-[#0b1329] to-slate-950 text-white select-none">
      {/* Background ambient geometry */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-600/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-cyan-600/20 blur-3xl" />
        {/* Subtle coordinate grid lines */}
        <div
          className="w-full h-full opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      {/* Top Header metadata strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="text-xs font-bold tracking-widest text-blue-400 uppercase">
              Hackathon Project Pitch
            </div>
            <div className="text-sm font-semibold text-slate-200">
              Disaster Response & Evacuation Resilience
            </div>
          </div>
        </div>

        {/* Unboxed metadata status */}
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            BigQuery GIS Grounded
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Google Cloud Run</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>ADK Toolbox</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Google Maps Platform</span>
        </div>
      </div>

      {/* Main Pitch Title & Subtitle */}
      <div className="relative z-10 my-auto py-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-4 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30">
          <Radio className="w-3.5 h-3.5 text-cyan-400" />
          Sub-Second Spatial Intelligence for Vulnerable Evacuees
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
          Emergency Shelter Finder
        </h1>

        <p className="mt-4 text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl">
          AI Agent Readiness & Spatial Routing connecting evacuees with life-saving shelter infrastructure—matching medical electricity dependency, mobility access, and real-time transit routes across 7 authoritative federal datasets.
        </p>

        {/* 4 Pillars Strip */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <Database className="w-4 h-4" />
              <span className="text-xs font-semibold">1,326 Shelters</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              FEMA National Shelter System (NSS) spatial indexing
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-semibold">4.4M+ Vulnerable</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              HHS emPOWER electricity-dependent Medicare patients
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Cpu className="w-4 h-4" />
              <span className="text-xs font-semibold">Sub-50ms</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              BigQuery GIS spatial distance & bounding calculations
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-semibold">Live Routes</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">
              Turn-by-turn traffic-aware Google Maps directions
            </p>
          </div>
        </div>
      </div>

      {/* Footer Call to Action / Pitch Deck metadata */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-400" />
          <span>Engineered for Emergency Operations & Citizen Evacuation Routing</span>
        </div>

        <button
          onClick={onStartDemo}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-600/30 whitespace-nowrap cursor-pointer"
        >
          <span>Launch Interactive Walkthrough</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
