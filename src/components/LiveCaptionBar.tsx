import React, { useState, useEffect } from 'react';
import { Captions, Volume2, X, Sparkles, MessageSquare } from 'lucide-react';

interface LiveCaptionBarProps {
  isVisible: boolean;
  onClose: () => void;
  activeText?: string;
  speakerName?: string;
}

export const LiveCaptionBar: React.FC<LiveCaptionBarProps> = ({
  isVisible,
  onClose,
  activeText,
  speakerName = 'Live Team Presenter'
}) => {
  const [displayText, setDisplayText] = useState<string>(
    activeText ||
      "Live Captions Active: Real-time spatial routing identifies Baton Rouge River Center as nearest emergency shelter with industrial generator backup."
  );

  useEffect(() => {
    if (activeText) {
      setDisplayText(activeText);
    }
  }, [activeText]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-12 inset-x-0 z-40 flex justify-center px-4 pointer-events-none select-none">
      <div className="max-w-4xl w-full bg-black/90 backdrop-blur-xl border border-yellow-400/60 rounded-xl px-4 py-2.5 shadow-2xl flex items-center justify-between gap-4 pointer-events-auto animate-in slide-in-from-bottom-2 duration-200">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-yellow-400 text-black font-mono text-[10px] font-bold shrink-0">
            <Captions className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>CC</span>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 text-[10px] font-semibold text-yellow-300">
              <span>{speakerName}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-400 font-mono">Deaf / Hearing Accessibility Stream</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-white truncate sm:text-wrap leading-snug">
              {displayText}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
          title="Hide Captions"
          aria-label="Hide Captions"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
