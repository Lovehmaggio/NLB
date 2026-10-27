import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Eye, EyeOff, Sparkles } from 'lucide-react';
import { SlideInfo } from '../types';

interface PresentationProgressIndicatorProps {
  currentSectionIndex: number;
  totalSections: number;
  sections: SlideInfo[];
  onSelectSection: (index: number) => void;
}

export const PresentationProgressIndicator: React.FC<PresentationProgressIndicatorProps> = ({
  currentSectionIndex,
  totalSections,
  sections,
  onSelectSection
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const currentSection = sections[currentSectionIndex] || sections[0];
  const progressPercent = Math.round(((currentSectionIndex + 1) / totalSections) * 100);
  const sectionsRemaining = totalSections - (currentSectionIndex + 1);

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      onSelectSection(currentSectionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentSectionIndex < totalSections - 1) {
      onSelectSection(currentSectionIndex + 1);
    }
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 pointer-events-none select-none">
      {/* 1. Viewport-Wide Ambient Bottom Progress Line */}
      <div className="w-full h-1 bg-slate-900/90 relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-emerald-400 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(34,211,238,0.7)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 2. Floating Section Indicator Bar at Bottom Center */}
      <div className="w-full flex items-center justify-center pb-2 pt-1 pointer-events-auto">
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2 px-3 py-1 bg-slate-950/80 hover:bg-slate-900 backdrop-blur-md border border-slate-800 rounded-full text-[11px] text-slate-300 shadow-xl transition-all hover:text-white cursor-pointer"
            title="Expand presentation progress indicator"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Section {currentSectionIndex + 1}/{totalSections}</span>
            <span className="text-slate-500">·</span>
            <span className="text-cyan-400 font-medium truncate max-w-[140px]">{currentSection?.title}</span>
            <Eye className="w-3 h-3 text-slate-400 ml-1" />
          </button>
        ) : (
          <div className="flex items-center gap-3 px-3.5 py-1.5 bg-slate-950/90 backdrop-blur-xl border border-slate-800/90 rounded-2xl shadow-2xl text-slate-200 transition-all animate-in fade-in slide-in-from-bottom-2 duration-200 max-w-4xl">
            {/* Section Counter & Current Title */}
            <div className="flex items-center gap-2 border-r border-slate-800 pr-3">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-white bg-slate-900 px-2 py-0.5 rounded-md border border-slate-800">
                <span className="text-cyan-400">{currentSectionIndex + 1}</span>
                <span className="text-slate-500">/</span>
                <span>{totalSections}</span>
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-[11px] font-bold text-white truncate max-w-[180px]">
                  {currentSection?.title}
                </div>
                <div className="text-[9px] text-slate-400 truncate max-w-[180px]">
                  {currentSection?.category}
                </div>
              </div>
            </div>

            {/* Stepped Progress Segment Indicators */}
            <div className="flex items-center gap-1.5">
              {sections.map((section, idx) => {
                const isCompleted = idx < currentSectionIndex;
                const isCurrent = idx === currentSectionIndex;
                return (
                  <button
                    key={section.id}
                    onClick={() => onSelectSection(idx)}
                    title={`Section ${idx + 1}: ${section.title} (${section.durationEstimate})`}
                    className={`group relative flex items-center justify-center transition-all cursor-pointer ${
                      isCurrent
                        ? 'w-7 h-5 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono text-[10px] font-bold shadow-[0_0_12px_rgba(34,211,238,0.5)] ring-1 ring-cyan-300'
                        : isCompleted
                        ? 'w-5 h-5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-emerald-400 text-[10px] font-mono'
                        : 'w-5 h-5 rounded-md bg-slate-900/80 hover:bg-slate-800 text-slate-500 text-[10px] font-mono'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3 h-3 stroke-[3]" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}

                    {/* Tooltip on hover */}
                    <div className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center pointer-events-none z-50">
                      <div className="bg-slate-900 text-white text-[10px] font-medium px-2 py-1 rounded shadow-xl border border-slate-700 whitespace-nowrap">
                        0{idx + 1}. {section.title}
                      </div>
                      <div className="w-1.5 h-1.5 bg-slate-900 rotate-45 border-r border-b border-slate-700 -mt-1" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Remaining Sections Status */}
            <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
              <div className="text-[11px] font-mono">
                {sectionsRemaining === 0 ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    Final Section
                  </span>
                ) : (
                  <span className="text-slate-400">
                    <strong className="text-cyan-300 font-bold">{sectionsRemaining}</strong> {sectionsRemaining === 1 ? 'section' : 'sections'} left
                  </span>
                )}
              </div>

              {/* Prev / Next controls */}
              <div className="flex items-center gap-0.5">
                <button
                  onClick={handlePrev}
                  disabled={currentSectionIndex === 0}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                  title="Previous Section"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentSectionIndex === totalSections - 1}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                  title="Next Section"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Minimize indicator button */}
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-slate-800 text-slate-500 hover:text-slate-300 rounded transition-colors cursor-pointer"
                title="Minimize Indicator"
              >
                <EyeOff className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
