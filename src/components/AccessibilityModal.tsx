import React from 'react';
import {
  Accessibility,
  Volume2,
  Mic,
  Captions,
  Eye,
  Sparkles,
  X,
  Check,
  Zap,
  Ear,
  Type,
  Radio
} from 'lucide-react';
import { AccessibilitySettings } from '../types';
import { audioNarration } from '../utils/speechUtils';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onUpdateSettings: (settings: Partial<AccessibilitySettings>) => void;
  onTriggerVisualAlertTest: () => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onTriggerVisualAlertTest
}) => {
  if (!isOpen) return null;

  const handleTestNarration = () => {
    audioNarration.speak(
      "Accessibility audio narration enabled. Emergency Shelter Finder connects federal health data, visual strobe alerts, and wheelchair accessible routing."
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="a11y-modal-title"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Accessibility className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 id="a11y-modal-title" className="text-base font-bold text-white">
                Universal Accessibility Center
              </h2>
              <p className="text-xs text-slate-400">
                Sensory, hearing, voice & cognitive accessibility for disaster evacuation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close accessibility settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-5 overflow-y-auto max-h-[75vh]">
          {/* Section: Hearing & Sensory (Inspired by Mateo's Story) */}
          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-wider">
                <Ear className="w-4 h-4 text-cyan-400" />
                <span>Hearing & Deaf Accommodations (Mateo Standard)</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/60 text-cyan-300 border border-blue-500/40">
                WCAG AAA
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Designed for deaf evacuees who cannot hear sirens, loudspeaker announcements, or radio alerts during electrical grid blackouts.
            </p>

            {/* Toggle 1: Visual Strobe Alerts */}
            <div className="flex items-center justify-between pt-2 border-t border-blue-500/20">
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-amber-400" />
                  <span>Visual Strobe Alerts (Sound Replacement)</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Flashes visual beacon overlay when within emergency shelter radius
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ visualStrobeAlerts: !settings.visualStrobeAlerts })}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.visualStrobeAlerts ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
                aria-pressed={settings.visualStrobeAlerts}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    settings.visualStrobeAlerts ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2: Closed Captions Subtitle Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-blue-500/20">
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Captions className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Live Presentation Closed Captions</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Persistent high-contrast real-time captions bar across slides & video
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ closedCaptionsEnabled: !settings.closedCaptionsEnabled })}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.closedCaptionsEnabled ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
                aria-pressed={settings.closedCaptionsEnabled}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    settings.closedCaptionsEnabled ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3: ASL On-Site Filter Priority */}
            <div className="flex items-center justify-between pt-2 border-t border-blue-500/20">
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ASL (Sign Language) Shelter Prioritization</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Prioritize shelters with visual alarms and certified Sign Language staff
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ aslSupportFilter: !settings.aslSupportFilter })}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.aslSupportFilter ? 'bg-cyan-500' : 'bg-slate-800'
                }`}
                aria-pressed={settings.aslSupportFilter}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    settings.aslSupportFilter ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={onTriggerVisualAlertTest}
                className="w-full py-1.5 px-3 rounded-lg bg-blue-900/60 hover:bg-blue-800/80 border border-blue-500/40 text-blue-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Test Visual Strobe Alert Flash (Judge Demo)</span>
              </button>
            </div>
          </div>

          {/* Section: Voice & Speech Accessibility */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Mic className="w-4 h-4 text-emerald-400" />
              <span>Voice Dictation & Audio Narration</span>
            </div>

            {/* Toggle 4: Voice-to-Text */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Voice-to-Text Search & Commands</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Dictate addresses and locations via microphone into the search tool
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ voiceInputActive: !settings.voiceInputActive })}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.voiceInputActive ? 'bg-emerald-500' : 'bg-slate-800'
                }`}
                aria-pressed={settings.voiceInputActive}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    settings.voiceInputActive ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Toggle 5: Text-to-Speech Audio Narration */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Text-to-Speech Audio Read-Aloud</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Read shelter directions, capacity, and proximity alerts out loud
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ textToSpeechEnabled: !settings.textToSpeechEnabled })}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.textToSpeechEnabled ? 'bg-blue-500' : 'bg-slate-800'
                }`}
                aria-pressed={settings.textToSpeechEnabled}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    settings.textToSpeechEnabled ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={handleTestNarration}
                className="w-full py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Play Sample Speech Narration</span>
              </button>
            </div>
          </div>

          {/* Section: Visual Comfort & Typography */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Type className="w-4 h-4 text-cyan-400" />
              <span>Typography & Visual Contrast</span>
            </div>

            {/* Font Size Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 block">
                Reading Text Scale
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'standard', label: '100% Standard' },
                  { id: 'large', label: '125% Large' },
                  { id: 'xl', label: '150% Extra' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onUpdateSettings({ fontSize: s.id as any })}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-colors cursor-pointer ${
                      settings.fontSize === s.id
                        ? 'bg-blue-600/30 text-white border-blue-400 ring-1 ring-blue-400'
                        : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>High Contrast Visual Outlines</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Enforces maximum contrast borders on all interactive cards
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ highContrast: !settings.highContrast })}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                  settings.highContrast ? 'bg-amber-500' : 'bg-slate-800'
                }`}
                aria-pressed={settings.highContrast}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                    settings.highContrast ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-white font-mono text-[10px]">A</kbd> to toggle this panel
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shadow-md transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
