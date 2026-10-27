import React, { useState } from 'react';
import { VolumeX, Eye, BatteryCharging, ShieldAlert, Heart, ChevronRight, CheckCircle2, MapPin } from 'lucide-react';
import { MATEO_STORY } from '../../data/mateoStory';

export const SlideHumanStory: React.FC = () => {
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const chapter = MATEO_STORY.chapters[activeChapterIndex];

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-10 lg:p-12 overflow-hidden bg-slate-950 text-white select-none">
      {/* Background atmospheric gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center">
            <VolumeX className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
              <span>The Human Reality Behind The Data</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-mono">Hurricane Maria (Sept 20, 2017)</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
              Mateo’s Silent Storm: Facing the Double Disaster in Utuado, PR
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/30 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            Utuado, Puerto Rico
          </span>
          <div className="text-xs text-slate-400 font-mono">
            Slide 02 · Human Story
          </div>
        </div>
      </div>

      {/* Main Storytelling Stage */}
      <div className="my-auto py-2 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: Character Card & Chapter Navigation */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          {/* Main Pull Quote */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-2 right-2 opacity-10">
              <VolumeX className="w-20 h-20 text-cyan-400" />
            </div>
            <p className="text-sm md:text-base font-semibold text-cyan-200 italic leading-snug">
              "{MATEO_STORY.headline}"
            </p>
            <div className="mt-3 flex items-center gap-3 text-xs text-slate-400 border-t border-slate-800/80 pt-2.5">
              <div className="w-7 h-7 rounded-full bg-cyan-600/30 text-cyan-300 font-bold flex items-center justify-center font-mono text-xs border border-cyan-400/40">
                M
              </div>
              <div>
                <span className="font-bold text-white">Mateo, age 28</span>
                <span className="text-slate-400"> · Born profoundly deaf · Utuado hills</span>
              </div>
            </div>
          </div>

          {/* Interactive Chapter Selector Buttons */}
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Story Timeline (Click to Read Phase)
            </div>
            {MATEO_STORY.chapters.map((chap, idx) => (
              <button
                key={chap.id}
                onClick={() => setActiveChapterIndex(idx)}
                className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  activeChapterIndex === idx
                    ? 'bg-blue-950/60 border-cyan-400 ring-1 ring-cyan-400 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span className="font-mono text-[10px] text-cyan-400">0{idx + 1}.</span>
                    <span>{chap.title}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 ml-5">
                    {chap.phase} · {chap.timeframe}
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${activeChapterIndex === idx ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Expanded Narrative Chapter & Platform Connection */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-2xl flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center border border-cyan-500/40">
                  {activeChapterIndex + 1}
                </span>
                <h3 className="text-sm md:text-base font-bold text-white">
                  {chapter.title}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {chapter.timeframe}
              </span>
            </div>

            <p className="text-xs text-cyan-200/90 font-medium italic mb-3 bg-cyan-950/30 p-2.5 rounded-lg border border-cyan-500/20">
              "{chapter.excerpt}"
            </p>

            <div className="space-y-2">
              {chapter.details.map((detail, dIdx) => (
                <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Grounding Callout */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                The Double Disaster & Platform Solution
              </span>
              <span className="text-[10px] font-mono text-slate-400">CDC PLACES + FEMA NSS</span>
            </div>

            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 text-xs text-slate-200 leading-relaxed">
              <strong>Why This Platform Solves This:</strong> Standard audio bullhorns and dark evacuation shelters leave deaf evacuees in the dark. By ingesting <strong>CDC PLACES</strong> sensory disability tracts, our system maps households to FEMA shelters with <strong>Visual Alert Systems</strong>, <strong>ASL Auxiliary Support</strong>, and <strong>Reliable Backup Generators</strong> for communication devices.
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1 text-rose-400">
                <Heart className="w-3 h-3 fill-rose-400" />
                Human-Centered Spatial Justice
              </span>
              <span className="font-mono text-cyan-400">
                Key Takeaway: {chapter.keyInsight}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <span>Emergency Shelter Finder · Designed for Real Evacuee Realities</span>
        <span className="font-mono text-slate-400">Ground-Truth Evidence: Utuado, Puerto Rico</span>
      </div>
    </div>
  );
};
