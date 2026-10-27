import React, { useState } from 'react';
import { Copy, Check, Presentation, Video, Download, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { SLIDES_DATA } from '../data/mockData';

export const PowerPointExporter: React.FC = () => {
  const [copiedPitch, setCopiedPitch] = useState(false);
  const [copiedNotes, setCopiedNotes] = useState<number | null>(null);

  const fullPitchScript = SLIDES_DATA.map(slide => {
    return `=== SLIDE ${slide.number}: ${slide.title} (${slide.durationEstimate}) ===
Category: ${slide.category}
Key Concept: ${slide.subtitle}

Speaking Script:
${slide.notes.map((n, i) => `${i + 1}. ${n}`).join('\n')}
`;
  }).join('\n\n');

  const copyFullPitch = () => {
    navigator.clipboard.writeText(fullPitchScript);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  const copySingleSlideNotes = (slideIndex: number) => {
    const slide = SLIDES_DATA[slideIndex];
    const text = `Slide ${slide.number}: ${slide.title}\n\n${slide.notes.map((n, i) => `${i + 1}. ${n}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedNotes(slideIndex);
    setTimeout(() => setCopiedNotes(null), 2000);
  };

  const downloadPitchMarkdown = () => {
    const blob = new Blob([fullPitchScript], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'emergency_shelter_finder_pitch_deck.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-h-[calc(100vh-65px)] bg-slate-950 p-6 md:p-10 text-white select-none">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Presentation className="w-4 h-4" />
              PowerPoint Presentation Suite
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
              PowerPoint Integration & Live Team Presenter Guide
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Export pitch outlines, copy speaker notes, and configure live team video feeds for maximum judging impact.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyFullPitch}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-colors cursor-pointer"
            >
              {copiedPitch ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copiedPitch ? 'Copied Full Pitch Script!' : 'Copy Full Pitch Script'}</span>
            </button>

            <button
              onClick={downloadPitchMarkdown}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs rounded-xl transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Pitch.md</span>
            </button>
          </div>
        </div>

        {/* 3 Live Team Video Presentation Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Option 1 */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs border border-blue-500/30">
              01
            </div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Video className="w-4 h-4 text-cyan-400" />
              In-Browser Live Studio (Recommended)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Use this web app directly in Fullscreen mode (press <strong>F</strong>). Enable the live camera (press <strong>C</strong>). You get a polished PIP team frame with an active speaking indicator right over the slides.
            </p>
            <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Zero extra software needed
            </div>
          </div>

          {/* Option 2 */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold text-xs border border-purple-500/30">
              02
            </div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Presentation className="w-4 h-4 text-purple-400" />
              PowerPoint "Cameo" Video Feed
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If pasting content into Microsoft PowerPoint: go to <strong>Insert ➔ Cameo</strong>. PowerPoint will insert a live camera feed of your team directly onto each slide, which activates automatically in Slide Show mode.
            </p>
            <div className="text-[11px] text-purple-300 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Built-in Microsoft 365 feature
            </div>
          </div>

          {/* Option 3 */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-8 h-8 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-xs border border-amber-500/30">
              03
            </div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              OBS / Zoom / Teams Split Stage
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In Zoom or Microsoft Teams, choose <strong>Share Screen ➔ Side-by-Side (Speaker + Slides)</strong>. This presents your presentation deck at 16:9 while keeping high-resolution video of your team front and center.
            </p>
            <div className="text-[11px] text-amber-300 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Ideal for remote hackathon judging
            </div>
          </div>
        </div>

        {/* Slide-by-Slide Pitch Notes Table */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white">
              Slide Pitch Outline & Speaker Notes
            </h3>
            <span className="text-xs text-slate-400">
              Total Pitch Time: ~8:30 (Configured for 5–10 min hackathon slots)
            </span>
          </div>

          <div className="space-y-3">
            {SLIDES_DATA.map((slide, idx) => (
              <div
                key={slide.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600/30 text-blue-300 font-mono text-xs font-bold flex items-center justify-center">
                      0{slide.number}
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      {slide.title}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {slide.category}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      Target: {slide.durationEstimate}
                    </span>
                  </div>

                  <p className="text-xs text-blue-300 font-medium ml-8">
                    {slide.subtitle}
                  </p>

                  <div className="ml-8 mt-2 space-y-1">
                    {slide.notes.map((note, nIdx) => (
                      <div key={nIdx} className="text-xs text-slate-300 flex items-start gap-1.5 leading-relaxed">
                        <span className="text-cyan-400 font-mono text-[10px] shrink-0 mt-0.5">•</span>
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 self-end md:self-start">
                  <button
                    onClick={() => copySingleSlideNotes(idx)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedNotes === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Slide Notes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
