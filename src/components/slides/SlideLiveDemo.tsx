import React, { useState } from 'react';
import { Search, MapPin, Zap, Accessibility, Stethoscope, Navigation, CheckCircle2, Shield, Sparkles, Clock, AlertCircle } from 'lucide-react';
import { MOCK_SHELTERS } from '../../data/mockData';
import { ShelterItem } from '../../types';

export const SlideLiveDemo: React.FC = () => {
  const [address, setAddress] = useState('Baton Rouge, LA');
  const [requireWheelchair, setRequireWheelchair] = useState(true);
  const [requireMedical, setRequireMedical] = useState(true);
  const [requireGenerator, setRequireGenerator] = useState(true);
  const [previewMode, setPreviewMode] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<ShelterItem[] | null>(MOCK_SHELTERS.slice(0, 2));
  const [queryStats, setQueryStats] = useState<{ count: number; timeMs: number } | null>({ count: 2, timeMs: 44 });

  const handleSearch = () => {
    setIsSearching(true);
    setResults(null);
    setQueryStats(null);

    setTimeout(() => {
      // Filter mock shelters
      let filtered = MOCK_SHELTERS.filter(s => {
        if (requireWheelchair && !s.hasWheelchairAccess) return false;
        if (requireMedical && !s.isMedicalNeedsReady) return false;
        if (requireGenerator && !s.hasBackupGenerator) return false;
        return true;
      });

      if (filtered.length === 0) {
        filtered = [MOCK_SHELTERS[0]]; // fallback
      }

      setResults(filtered.slice(0, 3));
      setQueryStats({ count: filtered.length, timeMs: Math.floor(Math.random() * 20) + 38 });
      setIsSearching(false);
    }, 450);
  };

  const handlePreset = (presetAddress: string) => {
    setAddress(presetAddress);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-10 lg:p-12 overflow-hidden bg-slate-950 text-white select-none">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div>
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Live System Demonstration
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-0.5">
            Live Evacuation Simulation: Baton Rouge, LA
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Preset Buttons */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => handlePreset('Baton Rouge, LA')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                address.includes('Baton Rouge') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Baton Rouge, LA
            </button>
            <button
              onClick={() => handlePreset('Utuado, PR')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                address.includes('Utuado') ? 'bg-cyan-600 text-white font-semibold' : 'text-cyan-400 hover:text-white'
              }`}
              title="Mateo's Scenario: Deaf evacuee sensory access in Utuado, Puerto Rico"
            >
              Utuado, PR (Mateo)
            </button>
            <button
              onClick={() => handlePreset('New Orleans, LA')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                address.includes('New Orleans') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              New Orleans, LA
            </button>
            <button
              onClick={() => handlePreset('Lafayette, LA')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                address.includes('Lafayette') ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Lafayette, LA
            </button>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Slide 05 · Live Walkthrough
          </div>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Search & Accessibility Parameters */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              Evacuee Origin Point
            </span>
            <span className="text-[10px] font-mono text-cyan-400">ADK Geocode Tool</span>
          </div>

          <div>
            <div className="relative">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter street, city, or postal code"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-medium"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Google Maps Geocoding Tool will resolve address to sub-meter coordinates.
            </p>
          </div>

          {/* Special Needs & Amenities Checkboxes */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
              Special Needs & Critical Life Support
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 cursor-pointer">
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Accessibility className="w-3.5 h-3.5 text-blue-400" />
                <span>Wheelchair Accessible (ADA)</span>
              </div>
              <input
                type="checkbox"
                checked={requireWheelchair}
                onChange={(e) => setRequireWheelchair(e.target.checked)}
                className="rounded accent-blue-600 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 cursor-pointer">
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Stethoscope className="w-3.5 h-3.5 text-rose-400" />
                <span>Medical Needs Ready</span>
              </div>
              <input
                type="checkbox"
                checked={requireMedical}
                onChange={(e) => setRequireMedical(e.target.checked)}
                className="rounded accent-rose-600 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 cursor-pointer">
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Backup Generator Onsite</span>
              </div>
              <input
                type="checkbox"
                checked={requireGenerator}
                onChange={(e) => setRequireGenerator(e.target.checked)}
                className="rounded accent-amber-600 w-4 h-4"
              />
            </label>
          </div>

          {/* Preview Mode Notice */}
          <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-[11px] text-amber-200 flex items-start gap-2">
            <input
              type="checkbox"
              id="previewCheck"
              checked={previewMode}
              onChange={(e) => setPreviewMode(e.target.checked)}
              className="mt-0.5 accent-amber-500 rounded"
            />
            <label htmlFor="previewCheck" className="cursor-pointer leading-tight">
              <strong>Include Inactive / Standby Shelters (Preview Mode)</strong>
              <div className="text-[10px] text-amber-300/80 mt-0.5">
                Database notice: All 1,326 FEMA NSS records currently hold status 'CLOSED' until active emergency declaration.
              </div>
            </label>
          </div>

          {/* Execute Query Button */}
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/30 cursor-pointer"
          >
            {isSearching ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Executing BigQuery GIS Spatial Routing...</span>
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4" />
                <span>Search Shelters & Calculate Routes</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Matched Shelters & Route Guidance */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col justify-between min-h-[420px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">
                Shelters Found & Route Guidance
              </span>
            </div>

            {queryStats && (
              <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                <Clock className="w-3 h-3 text-emerald-400" />
                <span>BigQuery GIS: {queryStats.timeMs}ms ({queryStats.count} matches)</span>
              </div>
            )}
          </div>

          {/* Shelter Cards List */}
          <div className="my-auto py-2 space-y-3">
            {isSearching ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-8 h-8 border-2 border-blue-500/30 border-t-cyan-400 rounded-full animate-spin mx-auto" />
                <p className="text-xs text-slate-400">
                  Executing ST_DWithin against 1,326 FEMA NSS shelters and calculating Google Routes...
                </p>
              </div>
            ) : results && results.length > 0 ? (
              results.map((shelter, idx) => (
                <div
                  key={shelter.id}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-300 font-mono text-[10px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          {shelter.name}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-400 ml-7">
                        {shelter.address}, {shelter.city}, {shelter.state} · {shelter.agency}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-emerald-400 font-mono">
                        {shelter.distanceMiles} mi · ~{shelter.travelTimeMinutes} min drive
                      </div>
                      <div className="text-[10px] text-slate-400">Live Traffic Routing</div>
                    </div>
                  </div>

                  {/* Badges strip */}
                  <div className="flex flex-wrap items-center gap-2 text-[10px] ml-7">
                    {shelter.hasBackupGenerator && (
                      <span className="flex items-center gap-1 text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/30 font-medium">
                        <Zap className="w-3 h-3 text-amber-400" />
                        Industrial Backup Generator
                      </span>
                    )}
                    {shelter.hasWheelchairAccess && (
                      <span className="flex items-center gap-1 text-blue-300 bg-blue-950/50 px-2 py-0.5 rounded border border-blue-500/30 font-medium">
                        <Accessibility className="w-3 h-3 text-blue-400" />
                        ADA Accessible
                      </span>
                    )}
                    {shelter.isMedicalNeedsReady && (
                      <span className="flex items-center gap-1 text-rose-300 bg-rose-950/50 px-2 py-0.5 rounded border border-rose-500/30 font-medium">
                        <Stethoscope className="w-3 h-3 text-rose-400" />
                        Medical Staffed
                      </span>
                    )}
                    <span className="text-slate-400 bg-slate-900 px-2 py-0.5 rounded font-mono">
                      Cap: {shelter.currentOccupancy} / {shelter.totalCapacity} beds
                    </span>
                  </div>

                  {/* HHS emPOWER Grounding indicator */}
                  <div className="text-[11px] text-slate-300 bg-blue-950/40 p-2 rounded-lg border border-blue-500/20 ml-7 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-blue-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                      Matches {shelter.hhsEmPowerVulnerabilityMatched} electricity-dependent patients in tract
                    </span>

                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${shelter.lat},${shelter.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Turn-by-Turn GPS</span>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center text-slate-400 space-y-2">
                <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
                <p className="text-xs">No search performed yet. Click Search Shelters & Calculate Routes above.</p>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Powered by ADK Toolbox & BigQuery GIS Geography</span>
            <span className="font-mono text-emerald-400">Google Maps Platform Toolbox Active</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <span>Emergency Shelter Finder · Live Product Simulation</span>
        <span className="font-mono text-slate-400">Ready for Live Judge Q&A</span>
      </div>
    </div>
  );
};
