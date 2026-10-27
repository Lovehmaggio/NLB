import React from 'react';
import { FileText, Clock, ChevronRight, Copy, Check, X } from 'lucide-react';
import { SlideInfo } from '../types';

interface PresenterNotesProps {
  currentSlide: SlideInfo;
  isOpen: boolean;
  onClose: () => void;
  nextSlideTitle?: string;
}

export const PresenterNotes: React.FC<PresenterNotesProps> = ({
  currentSlide,
  isOpen,
  onClose,
  nextSlideTitle
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const textToCopy = `[Slide ${currentSlide.number}: ${currentSlide.title}]\n\nPitch Script / Presenter Notes:\n${currentSlide.notes.map((n, i) => `${i + 1}. ${n}`).join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-4 left-6 z-40 max-w-lg w-full bg-slate-900/95 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-4 shadow-2xl text-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-white tracking-wide">
              Presenter Notes · Slide {currentSlide.number}
            </h4>
            <p className="text-[10px] text-slate-400 truncate max-w-xs">{currentSlide.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            <Clock className="w-3 h-3" />
            <span>Target: {currentSlide.durationEstimate}</span>
          </div>

          <button
            onClick={handleCopy}
            title="Copy notes to clipboard for PowerPoint slide notes"
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-2 max-h-52 overflow-y-auto pr-1">
        {currentSlide.notes.map((note, idx) => (
          <div key={idx} className="flex items-start gap-2 text-xs leading-relaxed text-slate-300">
            <span className="font-mono text-blue-400 font-semibold text-[11px] shrink-0 mt-0.5">
              0{idx + 1}.
            </span>
            <span className="whitespace-pre-line">{note}</span>
          </div>
        ))}
      </div>

      {nextSlideTitle && (
        <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <span className="text-[10px] uppercase tracking-wider text-slate-500">Up Next</span>
          <div className="flex items-center gap-1 text-slate-300 font-medium truncate max-w-[280px]">
            <span className="truncate">{nextSlideTitle}</span>
            <ChevronRight className="w-3 h-3 text-slate-500 shrink-0" />
          </div>
        </div>
      )}
    </div>
  );
};
