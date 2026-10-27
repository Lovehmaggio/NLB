import React, { useState } from 'react';
import {
  Eye,
  Volume2,
  Mic,
  Zap,
  Radio,
  FileDown,
  Layers,
  Sparkles,
  Accessibility,
  CheckCircle2,
  Sliders,
  Shield,
  Palette,
  VolumeX,
  Compass
} from 'lucide-react';
import { audioNarration } from '../../utils/speechUtils';

export const SlideAccessibilityUI: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'strobe' | 'speech' | 'themes' | 'offline'>('strobe');
  const [isStrobing, setIsStrobing] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'gray' | 'beige'>('dark');

  const triggerStrobeTest = () => {
    setIsStrobing(true);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      if (count > 6) {
        clearInterval(interval);
        setIsStrobing(false);
      }
    }, 200);
  };

  const triggerSpeechTest = () => {
    if (isSpeaking) {
      audioNarration.stop();
      setIsSpeaking(false);
      return;
    }
    audioNarration.speak(
      "Never Left Behind. Raising Cane's River Center shelter located 1.4 miles away. Wheelchair ramps confirmed. Onsite Caterpillar diesel generators operational. Medical triage team standing by.",
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-10 lg:p-12 overflow-hidden bg-slate-950 text-white select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div>
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Accessibility className="w-3.5 h-3.5" />
            Universal Inclusive Design
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-0.5">
            Accessible User Interface & Crisis Resilience Suite
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/30 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            WCAG 2.2 AAA Compliant
          </span>
          <div className="text-xs text-slate-400 font-mono">
            Slide 04 · UI & Accessibility
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-auto py-3 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: Interactive Feature Highlights */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-2.5">
          {/* Card 1: Visual Strobe Alert Beacon */}
          <div
            onClick={() => setActiveTab('strobe')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'strobe'
                ? 'bg-amber-950/40 border-amber-500/60 shadow-lg shadow-amber-950/40'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs md:text-sm">
                <VolumeX className="w-4 h-4 shrink-0" />
                <span>Visual Strobe Alert Beacon</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Deaf / Hard of Hearing
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When audio bullhorns and warning sirens fail for deaf evacuees, high-frequency pulsing visual beacons provide unmistakable sensory cues for evacuation warnings.
            </p>
          </div>

          {/* Card 2: Voice-to-Text & Speech Narration */}
          <div
            onClick={() => setActiveTab('speech')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'speech'
                ? 'bg-blue-950/40 border-blue-500/60 shadow-lg shadow-blue-950/40'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs md:text-sm">
                <Mic className="w-4 h-4 shrink-0" />
                <span>Hands-Free Speech & Audio Narration</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Voice STT & TTS
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Users in panic or with motor impairments speak directly into the microphone. Blind and low-vision evacuees receive instant synthesized audio turn-by-turn routing.
            </p>
          </div>

          {/* Card 3: Multi-Theme Contrast & Low Glare */}
          <div
            onClick={() => setActiveTab('themes')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'themes'
                ? 'bg-purple-950/40 border-purple-500/60 shadow-lg shadow-purple-950/40'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs md:text-sm">
                <Palette className="w-4 h-4 shrink-0" />
                <span>Multi-Theme Contrast Control</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Dark · Gray · Beige
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Instant toggles between High-Contrast Dark, Tactical Gray, and Warm Beige, reducing eye strain and maximizing outdoor readability during bright daylight searches.
            </p>
          </div>

          {/* Card 4: Offline Resiliency & Manifest Card */}
          <div
            onClick={() => setActiveTab('offline')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'offline'
                ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950/40'
                : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs md:text-sm">
                <FileDown className="w-4 h-4 shrink-0" />
                <span>Offline Emergency Manifest</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Zero-Grid Resilient
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Generates a self-contained offline evacuation pass with verified medical dependencies and shelter dispatch codes that works when cell towers fail completely.
            </p>
          </div>
        </div>

        {/* Right Column: Live Interactive Interactive UI Preview Sandbox */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-900/80 border border-slate-800 rounded-2xl p-4 md:p-5 relative shadow-2xl overflow-hidden">
          {/* Simulated Screen Strobe Flash */}
          {isStrobing && (
            <div className="absolute inset-0 z-30 bg-amber-400/30 animate-ping pointer-events-none" />
          )}

          {/* Top Bar of Sandbox */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-slate-400 text-[11px] ml-1">
                never-left-behind.internal/evac-portal
              </span>
            </div>

            {/* Sandbox Theme Switcher */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setPreviewTheme('dark')}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  previewTheme === 'dark' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => setPreviewTheme('gray')}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  previewTheme === 'gray' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Gray
              </button>
              <button
                onClick={() => setPreviewTheme('beige')}
                className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                  previewTheme === 'beige' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Beige
              </button>
            </div>
          </div>

          {/* Simulated Interface Body with Chosen Theme */}
          <div
            className={`mt-3 p-3.5 rounded-xl border transition-colors flex-1 flex flex-col justify-between ${
              previewTheme === 'dark'
                ? 'bg-slate-950 border-slate-800 text-slate-100'
                : previewTheme === 'gray'
                ? 'bg-neutral-900 border-neutral-700 text-neutral-100'
                : 'bg-[#1e1b18] border-amber-900/50 text-amber-100'
            }`}
          >
            {/* Search Input Bar Mockup */}
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2 text-xs">
              <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
              <input
                type="text"
                readOnly
                value="“I am deaf and use a wheelchair. Grandmother needs oxygen.”"
                className="bg-transparent text-slate-200 flex-1 outline-none text-xs italic font-medium truncate"
              />
              <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[10px]">
                <Mic className="w-3 h-3 text-blue-400" /> STT Active
              </span>
            </div>

            {/* Extracted Clinical Needs Badges */}
            <div className="flex flex-wrap items-center gap-1.5 my-2.5">
              <span className="text-[10px] font-mono text-slate-400">Agent Extraction:</span>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-300 text-[10px] font-medium flex items-center gap-1">
                <Accessibility className="w-2.5 h-2.5" /> Wheelchair ADA
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-medium flex items-center gap-1">
                <Zap className="w-2.5 h-2.5" /> Backup Generator (Oxygen)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-medium flex items-center gap-1">
                <VolumeX className="w-2.5 h-2.5" /> Deaf / Visual Comm
              </span>
            </div>

            {/* Simulated Live Verified Shelter Result Card */}
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-700/80 flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Raising Cane’s River Center Evac Hub</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono">275 S River Rd, Baton Rouge · 1.4 mi (5 mins)</p>
                </div>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                  STANDBY · 1,200 Beds
                </span>
              </div>

              {/* Status flags */}
              <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono text-center pt-1 border-t border-slate-800">
                <div className="bg-slate-950/80 p-1 rounded border border-slate-800 text-slate-300">
                  Dual Generators: <span className="text-emerald-400 font-semibold">Active</span>
                </div>
                <div className="bg-slate-950/80 p-1 rounded border border-slate-800 text-slate-300">
                  Wheelchair Ramps: <span className="text-emerald-400 font-semibold">Level 1</span>
                </div>
                <div className="bg-slate-950/80 p-1 rounded border border-slate-800 text-slate-300">
                  emPOWER Match: <span className="text-amber-400 font-semibold">148 Pts</span>
                </div>
              </div>
            </div>

            {/* Interactive Live Test Buttons */}
            <div className="mt-3 pt-2.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={triggerStrobeTest}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                    isStrobing
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                  }`}
                >
                  <Radio className={`w-3.5 h-3.5 ${isStrobing ? 'animate-spin' : ''}`} />
                  <span>{isStrobing ? 'Pulsing Strobe...' : 'Test Visual Strobe Alert'}</span>
                </button>

                <button
                  onClick={triggerSpeechTest}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                    isSpeaking
                      ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                      : 'bg-blue-500/20 text-blue-300 border-blue-500/40 hover:bg-blue-500/30'
                  }`}
                >
                  <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-pulse' : ''}`} />
                  <span>{isSpeaking ? 'Reading Aloud...' : 'Test Speech Narration'}</span>
                </button>
              </div>

              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero-Barrier Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div className="border-t border-slate-800 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            Visual Alerts for Deaf Evacuees
          </span>
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            Speech STT & TTS Narration
          </span>
          <span className="flex items-center gap-1.5 text-slate-300 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            Zero-Cell Offline Manifests
          </span>
        </div>

        <div className="font-mono text-[11px] text-cyan-400">
          Engineered for 100% human crisis inclusivity
        </div>
      </div>
    </div>
  );
};
