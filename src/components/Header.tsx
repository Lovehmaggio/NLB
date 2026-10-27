import React, { useState, useRef, useEffect } from 'react';
import { ViewMode, PresenterConfig, AppTheme } from '../types';
import { Video, Shield, Moon, Sun, Palette, ChevronDown, Check, Accessibility } from 'lucide-react';

interface HeaderProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  presenterConfig: PresenterConfig;
  onToggleCamera: () => void;
  theme: AppTheme;
  onSelectTheme: (theme: AppTheme) => void;
  onOpenAccessibility: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  presenterConfig,
  onToggleCamera,
  theme,
  onSelectTheme,
  onOpenAccessibility
}) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setShowThemeMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes: { id: AppTheme; name: string; subtitle: string; icon: React.ReactNode; previewBg: string; previewText: string }[] = [
    {
      id: 'dark',
      name: 'Midnight Dark',
      subtitle: 'Tactical EOC contrast',
      icon: <Moon className="w-3.5 h-3.5 text-blue-400" />,
      previewBg: 'bg-[#090d16]',
      previewText: 'text-white'
    },
    {
      id: 'beige',
      name: 'Warm Beige',
      subtitle: 'Soft sand & editorial paper',
      icon: <Sun className="w-3.5 h-3.5 text-amber-500" />,
      previewBg: 'bg-[#f5f0e6]',
      previewText: 'text-stone-900'
    },
    {
      id: 'gray',
      name: 'Cool Slate Gray',
      subtitle: 'Architectural studio gray',
      icon: <Palette className="w-3.5 h-3.5 text-slate-500" />,
      previewBg: 'bg-[#eef2f6]',
      previewText: 'text-slate-900'
    }
  ];

  const currentThemeObj = themes.find(t => t.id === theme) || themes[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 py-3">
        {/* Zone 1: Single text element wordmark */}
        <div
          onClick={() => onSelectView('slides')}
          className="flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
            <Shield className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-base font-bold tracking-tight text-white whitespace-nowrap">
            Emergency Shelter Finder
          </span>
        </div>

        {/* Zone 2: clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-slate-400">
          <button
            onClick={() => onSelectView('slides')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              currentView === 'slides' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Slide Deck
          </button>
          <button
            onClick={() => onSelectView('story')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              currentView === 'story' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Mateo’s Story
          </button>
          <button
            onClick={() => onSelectView('demo')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              currentView === 'demo' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Live Platform
          </button>
          <button
            onClick={() => onSelectView('architecture')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              currentView === 'architecture' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Architecture
          </button>
          <button
            onClick={() => onSelectView('datasources')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              currentView === 'datasources' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Federal Data
          </button>
          <button
            onClick={() => onSelectView('original-screenshots')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              currentView === 'original-screenshots' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            Original Screenshots
          </button>
          <button
            onClick={() => onSelectView('export')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer ${
              currentView === 'export' ? 'text-cyan-400 font-semibold' : ''
            }`}
          >
            PowerPoint Guide
          </button>
        </nav>

        {/* Zone 3: Actions & Theme Switcher */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Theme Switcher Dropdown */}
          <div className="relative" ref={themeMenuRef}>
            <button
              onClick={() => setShowThemeMenu(prev => !prev)}
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-slate-200 transition-colors cursor-pointer shadow-sm"
              title="Change Color Theme (Dark, Warm Beige, Slate Gray)"
            >
              <span className="w-3.5 h-3.5 flex items-center justify-center">
                {currentThemeObj.icon}
              </span>
              <span className="hidden sm:inline font-medium">{currentThemeObj.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>

            {/* Dropdown Menu */}
            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-64 p-2 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2.5 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800/80 mb-1">
                  Presentation Color Theme
                </div>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onSelectTheme(t.id);
                      setShowThemeMenu(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors cursor-pointer ${
                      theme === t.id
                        ? 'bg-blue-600/20 text-white border border-blue-500/40'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-5 h-5 rounded-full border border-slate-700 ${t.previewBg} flex items-center justify-center text-[10px] font-bold ${t.previewText} shadow-sm shrink-0`}>
                        Aa
                      </div>
                      <div>
                        <div className="text-xs font-medium flex items-center gap-1.5">
                          <span>{t.name}</span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {t.subtitle}
                        </div>
                      </div>
                    </div>
                    {theme === t.id && (
                      <Check className="w-4 h-4 text-cyan-400" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accessibility Center Button */}
          <button
            onClick={onOpenAccessibility}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-slate-800 bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white transition-colors cursor-pointer shadow-sm"
            title="Open Accessibility Center (Voice, Hearing, Captions, Strobe Alerts - Press 'A')"
          >
            <Accessibility className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden xl:inline">Accessibility</span>
          </button>

          {/* Live Video Toggle */}
          <button
            onClick={onToggleCamera}
            className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              presenterConfig.isEnabled
                ? 'bg-rose-950/60 text-rose-300 border-rose-500/50 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-600/20'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{presenterConfig.isEnabled ? 'Live Video Active' : 'Start Team Video'}</span>
            <span className="sm:hidden">{presenterConfig.isEnabled ? 'Video On' : 'Video'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};


