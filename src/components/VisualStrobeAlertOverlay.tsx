import React, { useEffect } from 'react';
import { ShieldAlert, Ear, Radio, Zap, X, MapPin } from 'lucide-react';

interface VisualStrobeAlertOverlayProps {
  isVisible: boolean;
  onDismiss: () => void;
  shelterName?: string;
  distanceMiles?: number;
}

export const VisualStrobeAlertOverlay: React.FC<VisualStrobeAlertOverlayProps> = ({
  isVisible,
  onDismiss,
  shelterName = 'Baton Rouge River Center',
  distanceMiles = 0.8
}) => {
  // Auto-dismiss after 8 seconds
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-16 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
      role="alert"
      aria-live="assertive"
    >
      <div className="w-full max-w-3xl bg-amber-950/95 border-2 border-amber-400 rounded-2xl p-4 shadow-[0_0_50px_rgba(251,191,36,0.6)] backdrop-blur-2xl pointer-events-auto animate-bounce duration-1000 flex items-center justify-between gap-4 text-white">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-500/30 border border-amber-400 flex items-center justify-center shrink-0 animate-pulse text-amber-300">
            <Radio className="w-7 h-7 stroke-[2.5]" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider">
                🚨 Visual Alert for Deaf / Hard of Hearing
              </span>
              <span className="text-xs text-amber-200 hidden sm:inline">
                Sound Replacement Beacon
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              Immediate Reach Shelter: {shelterName} ({distanceMiles} mi)
            </h3>
            <p className="text-xs text-amber-100/90 flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
              <span>⚡ Industrial Generator Verified</span>
              <span>·</span>
              <span>🦽 Wheelchair Accessible Ramp</span>
              <span>·</span>
              <span>🤟 ASL Visual Communication Support</span>
            </p>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="p-2 rounded-xl bg-amber-900/60 hover:bg-amber-800 text-amber-200 hover:text-white border border-amber-500/50 transition-colors cursor-pointer shrink-0"
          title="Dismiss Alert"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
