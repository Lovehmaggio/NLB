import React, { useState } from 'react';
import { Database, CheckCircle, ShieldCheck, Wrench, Layers, Info } from 'lucide-react';
import { FEDERAL_DATA_SOURCES, PREPROCESSING_NOTICE } from '../../data/mockData';
import { FederalDataSource } from '../../types';

export const SlideDataSources: React.FC = () => {
  const [selectedSource, setSelectedSource] = useState<FederalDataSource>(FEDERAL_DATA_SOURCES[0]);
  const [showNotice, setShowNotice] = useState<boolean>(false);

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-8 md:p-12 lg:p-14 overflow-hidden bg-slate-950 text-white select-none">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Federal Data Architecture
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
            Authoritative Federal Grounding (7 Data Streams)
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNotice(!showNotice)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              showNotice
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>Preprocessing & Quality Notice</span>
          </button>
          <div className="text-xs text-slate-400 font-mono">
            Slide 03 · Data Engineering
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="my-auto py-3 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: 7 Sources List */}
        <div className="lg:col-span-5 flex flex-col space-y-2 max-h-[380px] overflow-y-auto pr-1">
          {FEDERAL_DATA_SOURCES.map((source) => (
            <div
              key={source.id}
              onClick={() => {
                setSelectedSource(source);
                setShowNotice(false);
              }}
              className={`p-3 rounded-xl border transition-all cursor-pointer text-left ${
                selectedSource.id === source.id && !showNotice
                  ? 'bg-blue-950/40 border-blue-500/60 shadow-md'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 flex items-center justify-center font-mono text-[10px] font-bold">
                    {source.number}
                  </span>
                  <span className="text-xs font-bold text-slate-200 truncate max-w-[210px]">
                    {source.name}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-500/30 shrink-0">
                  {source.statusTag}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                {source.agency}
              </p>
            </div>
          ))}
        </div>

        {/* Right Column: Source Details or Preprocessing Notice */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
          {showNotice ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400 border-b border-amber-500/20 pb-3">
                <Wrench className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  {PREPROCESSING_NOTICE.title}
                </h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {PREPROCESSING_NOTICE.summary}
              </p>

              <div className="space-y-2.5">
                {PREPROCESSING_NOTICE.bulletPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/30 text-xs text-blue-200">
                <strong>Result:</strong> Clean, deterministic spatial geometries stored in BigQuery as native <code className="font-mono text-cyan-300">GEOGRAPHY</code> types, indexed for sub-50ms bounding lookups.
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-300 flex items-center justify-center font-mono text-xs font-bold border border-blue-400/40">
                      0{selectedSource.number}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      {selectedSource.name}
                    </h3>
                  </div>
                  <p className="text-xs text-blue-400 font-medium mt-0.5">
                    Maintained by: {selectedSource.agency}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-slate-300">{selectedSource.stats}</div>
                  <div className="text-[10px] text-emerald-400 font-mono">100% Public Domain (17 U.S.C. § 105)</div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Source Scope & Description
                </h4>
                <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {selectedSource.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-blue-400" />
                    Critical Platform Role
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">
                    {selectedSource.keyUtility}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-emerald-400" />
                    Endpoint Architecture
                  </div>
                  <p className="text-xs font-mono text-slate-300 truncate">
                    {selectedSource.endpointInfo}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  HIPAA compliant aggregation (masked small cells)
                </span>
                <span className="font-mono text-slate-500">Live BigQuery GIS Connection</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Strip */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>Authoritative Data Sources: FEMA NSS · HHS emPOWER · U.S. Census ACS · CDC SVI · CDC PLACES · FEMA NRI · CMS</span>
        </div>
        <span className="font-mono text-slate-400">Zero Hallucinations · Real Open Data</span>
      </div>
    </div>
  );
};
