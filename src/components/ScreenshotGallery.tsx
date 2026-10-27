import React, { useState } from 'react';
import { Eye, Layers, Sparkles, Check, ArrowRight } from 'lucide-react';

interface ScreenshotItem {
  id: string;
  title: string;
  description: string;
  path: string;
  uxTransformation: string;
}

const SCREENSHOTS: ScreenshotItem[] = [
  {
    id: 'hero',
    title: 'Platform Header & Search Form',
    description: 'Original search interface showing address input, special needs triage checkboxes (Wheelchair, Medical, Generator), and Hackathon Judge Reference banner.',
    path: '/assets/aistudio/Screenshot_2026-10-27_at_1.36.18_PM_8d8ed354.png',
    uxTransformation: 'Elevated into an executive-ready 16:9 Slide 01 & Slide 05 Live Walkthrough with instant preset buttons, real-time geocoding feedback, and turn-by-turn driving routing.'
  },
  {
    id: 'search-card',
    title: 'Search Form & Useful Tips',
    description: 'Detailed form with Baton Rouge pre-fill, inactive shelter preview mode notice, and useful search tips on medical equipment and authoritative federal data.',
    path: '/assets/aistudio/Screenshot_2026-10-27_at_1.36.25_PM_bb3e9d62.png',
    uxTransformation: 'Transformed into interactive parameter controls with visual feedback for electricity-dependent ventilator users and standby shelter activation.'
  },
  {
    id: 'datasources-1',
    title: 'Federal Data Sources (Part 1)',
    description: 'FEMA NSS, HHS emPOWER program (electricity-dependent Medicare tracking), and American Community Survey (ACS) tract demographics.',
    path: '/assets/aistudio/Screenshot_2026-10-27_at_1.36.43_PM_8955a63c.png',
    uxTransformation: 'Crafted into Slide 03 with an interactive matrix comparing each federal agency, endpoint API, and specific life-saving utility.'
  },
  {
    id: 'datasources-2',
    title: 'Federal Data Sources (Part 2)',
    description: 'CDC SVI, CDC PLACES health disability estimates, FEMA National Risk Index, and CMS Nursing Home capacities.',
    path: '/assets/aistudio/Screenshot_2026-10-27_at_1.36.57_PM_37049e8e.png',
    uxTransformation: 'Organized with unboxed typography, clear agency seals, and public domain legal protections under 17 U.S.C. § 105.'
  },
  {
    id: 'etl-notice',
    title: 'Engineering ETL Notice & Disclaimers',
    description: 'Crucial engineering details on inverted coordinate axes, null-string normalization, and BigQuery Geography conversion.',
    path: '/assets/aistudio/Screenshot_2026-10-27_at_1.37.06_PM_cedf9c77.png',
    uxTransformation: 'Turned into an interactive Preprocessing & Quality modal and embedded directly in the architecture diagrams for the judging panel.'
  }
];

export const ScreenshotGallery: React.FC = () => {
  const [selectedScreenshot, setSelectedScreenshot] = useState<ScreenshotItem>(SCREENSHOTS[0]);

  return (
    <div className="w-full min-h-[calc(100vh-65px)] bg-slate-950 p-6 md:p-10 text-white select-none">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              Source Material & Visual Evolution
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
              Original Platform Screenshots vs. Presentation Suite
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Inspect the five foundational screenshots from the engineering build and review the UX design decisions.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            5 Screenshots Documented
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {SCREENSHOTS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedScreenshot(item)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                selectedScreenshot.id === item.id
                  ? 'bg-blue-950/60 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-white truncate mb-1">
                {item.title}
              </div>
              <div className="text-[10px] text-slate-400 line-clamp-2">
                {item.description}
              </div>
            </button>
          ))}
        </div>

        {/* Active Inspection Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Screenshot Preview */}
          <div className="lg:col-span-8 bg-slate-900 rounded-2xl border border-slate-800 p-3 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 text-xs text-slate-400 mb-2">
              <span className="font-semibold text-slate-200">{selectedScreenshot.title}</span>
              <span className="font-mono text-[10px] truncate max-w-xs">{selectedScreenshot.path}</span>
            </div>
            <div className="rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950 flex items-center justify-center max-h-[560px]">
              <img
                src={selectedScreenshot.path}
                alt={selectedScreenshot.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[560px] object-contain"
              />
            </div>
          </div>

          {/* Design & Visual Storytelling Analysis */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 border-b border-slate-800 pb-3">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">
                Visual Storytelling Transformation
              </h3>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div>
                <h4 className="font-semibold text-slate-300 uppercase tracking-wider text-[11px] mb-1">
                  Original Interface Role
                </h4>
                <p className="text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  {selectedScreenshot.description}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-cyan-400 uppercase tracking-wider text-[11px] mb-1">
                  Enhancement for PowerPoint Presentation
                </h4>
                <p className="text-cyan-200 bg-blue-950/40 p-3 rounded-xl border border-blue-500/30">
                  {selectedScreenshot.uxTransformation}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Key UX Design Principles Applied
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Zero-Pill discipline: Replaced candy capsules with unboxed text and subtle typographic dividers.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Cinematic 16:9 Aspect Ratio: Designed specifically for live video streaming & projector displays.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Interactive Presenter PIP: Enables team webcam video directly over the slides.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
