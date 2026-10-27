import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, FileText, Camera, RefreshCw, LayoutGrid } from 'lucide-react';
import { SLIDES_DATA } from '../data/mockData';
import { PresenterConfig, SlideInfo, AppTheme } from '../types';
import { SlideCover } from './slides/SlideCover';
import { SlideProblem } from './slides/SlideProblem';
import { SlideDataSources } from './slides/SlideDataSources';
import { SlideAccessibilityUI } from './slides/SlideAccessibilityUI';
import { SlideLiveDemo } from './slides/SlideLiveDemo';
import { SlideTeamImpact } from './slides/SlideTeamImpact';
import { PresenterNotes } from './PresenterNotes';
import { Sun, Moon, Palette as PaletteIcon } from 'lucide-react';

interface SlideDeckProps {
  presenterConfig: PresenterConfig;
  onUpdatePresenterConfig: (cfg: Partial<PresenterConfig>) => void;
  onOpenFullDemo: () => void;
  activeSlideIndex?: number;
  onSlideChange?: (index: number) => void;
  theme?: AppTheme;
  onToggleTheme?: () => void;
}

export const SlideDeck: React.FC<SlideDeckProps> = ({
  presenterConfig,
  onUpdatePresenterConfig,
  onOpenFullDemo,
  activeSlideIndex,
  onSlideChange,
  theme = 'dark',
  onToggleTheme
}) => {
  const [internalSlideIndex, setInternalSlideIndex] = useState(0);
  const currentSlideIndex = activeSlideIndex !== undefined ? activeSlideIndex : internalSlideIndex;

  const [slideDirection, setSlideDirection] = useState<'right' | 'left' | 'fade'>('fade');
  const [showNotes, setShowNotes] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentSlide: SlideInfo = SLIDES_DATA[currentSlideIndex];
  const nextSlide: SlideInfo | undefined = SLIDES_DATA[currentSlideIndex + 1];

  const goToSlide = (idx: number) => {
    if (idx >= 0 && idx < SLIDES_DATA.length) {
      setSlideDirection(idx > currentSlideIndex ? 'right' : 'left');
      if (onSlideChange) {
        onSlideChange(idx);
      } else {
        setInternalSlideIndex(idx);
      }
    }
  };

  const nextSlideHandler = () => {
    if (currentSlideIndex < SLIDES_DATA.length - 1) {
      setSlideDirection('right');
      const nextIdx = currentSlideIndex + 1;
      if (onSlideChange) {
        onSlideChange(nextIdx);
      } else {
        setInternalSlideIndex(nextIdx);
      }
    }
  };

  const prevSlideHandler = () => {
    if (currentSlideIndex > 0) {
      setSlideDirection('left');
      const prevIdx = currentSlideIndex - 1;
      if (onSlideChange) {
        onSlideChange(prevIdx);
      } else {
        setInternalSlideIndex(prevIdx);
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.warn('Fullscreen error:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        nextSlideHandler();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlideHandler();
      } else if (e.key.toLowerCase() === 'n') {
        setShowNotes(prev => !prev);
      } else if (e.key.toLowerCase() === 'f') {
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'c') {
        onUpdatePresenterConfig({ isEnabled: !presenterConfig.isEnabled });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, presenterConfig.isEnabled]);

  // Track fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const renderSlideContent = () => {
    switch (currentSlide.id) {
      case 'cover':
        return <SlideCover onStartDemo={() => goToSlide(4)} />;
      case 'problem':
        return <SlideProblem />;
      case 'data-sources':
        return <SlideDataSources />;
      case 'accessibility-ui':
        return <SlideAccessibilityUI />;
      case 'live-demo':
        return <SlideLiveDemo />;
      case 'team-impact':
        return <SlideTeamImpact />;
      default:
        return <SlideCover onStartDemo={() => goToSlide(4)} />;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex flex-col items-center justify-center bg-slate-950 transition-colors ${
        isFullscreen ? 'h-screen p-0' : 'min-h-[calc(100vh-65px)] py-6 px-4 md:px-8'
      }`}
    >
      {/* 16:9 Presentation Stage Wrapper */}
      <div
        className={`w-full max-w-6xl slide-ratio-16-9 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col justify-between ${
          isFullscreen ? 'max-w-none h-full rounded-none border-none' : ''
        }`}
      >
        {/* Render Slide with CSS-based directional transition */}
        <div
          key={currentSlide.id}
          className={`w-full h-full relative ${
            slideDirection === 'right'
              ? 'slide-transition-right'
              : slideDirection === 'left'
              ? 'slide-transition-left'
              : 'slide-transition-fade'
          }`}
        >
          {renderSlideContent()}
        </div>

        {/* Floating Slide Progress Bar */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-slate-800/80 z-20">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300"
            style={{ width: `${((currentSlideIndex + 1) / SLIDES_DATA.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Presentation Control Dock Below Slide */}
      <div className="w-full max-w-6xl mt-4 flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 backdrop-blur-md text-slate-300">
        {/* Left: Slide navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlideHandler}
            disabled={currentSlideIndex === 0}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            title="Previous Slide (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-800 text-white">
            {currentSlideIndex + 1} / {SLIDES_DATA.length}
          </span>

          <button
            onClick={nextSlideHandler}
            disabled={currentSlideIndex === SLIDES_DATA.length - 1}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            title="Next Slide (Right Arrow or Space)"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1" />

          {/* Slide title */}
          <span className="text-xs font-medium text-slate-200 hidden sm:inline-block truncate max-w-xs">
            {currentSlide.title}
          </span>
        </div>

        {/* Center: Slide Jump Pills */}
        <div className="hidden md:flex items-center gap-1.5">
          {SLIDES_DATA.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(idx)}
              title={`Slide ${idx + 1}: ${slide.title}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlideIndex === idx
                  ? 'w-7 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Right: Pitch Tools Controls */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              showThumbnails
                ? 'bg-blue-600/20 text-blue-300 border-blue-500/50'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Toggle Slide Grid Overview"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Slides</span>
          </button>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              showNotes
                ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/50'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Toggle Presenter Speaker Notes (N)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Notes</span>
          </button>

          <button
            onClick={() => onUpdatePresenterConfig({ isEnabled: !presenterConfig.isEnabled })}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              presenterConfig.isEnabled
                ? 'bg-rose-600/20 text-rose-300 border-rose-500/50'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Toggle Live Camera Overlay (C)"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Camera</span>
          </button>

          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title={`Switch Theme: currently ${theme === 'beige' ? 'Warm Beige' : theme === 'gray' ? 'Cool Gray' : 'Midnight Dark'} (Press 'T')`}
            >
              {theme === 'beige' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : theme === 'gray' ? (
                <PaletteIcon className="w-4 h-4 text-slate-300" />
              ) : (
                <Moon className="w-4 h-4 text-blue-400" />
              )}
            </button>
          )}

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Fullscreen Presentation Mode (F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

        </div>
      </div>

      {/* Slide Thumbnails Drawer */}
      {showThumbnails && (
        <div className="w-full max-w-6xl mt-3 p-4 bg-slate-900 border border-slate-800 rounded-xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 animate-in fade-in duration-200">
          {SLIDES_DATA.map((slide, idx) => (
            <div
              key={slide.id}
              onClick={() => {
                goToSlide(idx);
                setShowThumbnails(false);
              }}
              className={`p-2.5 rounded-lg border cursor-pointer transition-all text-left ${
                currentSlideIndex === idx
                  ? 'bg-blue-950/60 border-cyan-400 ring-1 ring-cyan-400'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                <span>0{slide.number}</span>
                <span>{slide.durationEstimate}</span>
              </div>
              <div className="text-xs font-bold text-white truncate">
                {slide.title}
              </div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5">
                {slide.category}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Presenter Teleprompter Notes */}
      <PresenterNotes
        currentSlide={currentSlide}
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        nextSlideTitle={nextSlide?.title}
      />
    </div>
  );
};
