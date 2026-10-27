import React, { useState, useEffect } from 'react';
import { ViewMode, PresenterConfig, AppTheme, AccessibilitySettings } from './types';
import { SLIDES_DATA } from './data/mockData';
import { Header } from './components/Header';
import { SlideDeck } from './components/SlideDeck';
import { PlatformDemo } from './components/PlatformDemo';
import { SlideArchitecture } from './components/slides/SlideArchitecture';
import { SlideDataSources } from './components/slides/SlideDataSources';
import { ScreenshotGallery } from './components/ScreenshotGallery';
import { PowerPointExporter } from './components/PowerPointExporter';
import { PresenterCamera } from './components/PresenterCamera';
import { SlideHumanStory } from './components/slides/SlideHumanStory';
import { PresentationProgressIndicator } from './components/PresentationProgressIndicator';
import { AccessibilityModal } from './components/AccessibilityModal';
import { LiveCaptionBar } from './components/LiveCaptionBar';
import { VisualStrobeAlertOverlay } from './components/VisualStrobeAlertOverlay';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('slides');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [theme, setTheme] = useState<AppTheme>(() => {
    const saved = localStorage.getItem('shelter_finder_theme') as AppTheme;
    return saved === 'beige' || saved === 'gray' || saved === 'dark' ? saved : 'dark';
  });

  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>({
    voiceInputActive: true,
    textToSpeechEnabled: true,
    closedCaptionsEnabled: false,
    visualStrobeAlerts: true,
    fontSize: 'standard',
    highContrast: false,
    screenReaderDescriptions: true,
    aslSupportFilter: false
  });
  const [isA11yModalOpen, setIsA11yModalOpen] = useState(false);
  const [showVisualAlert, setShowVisualAlert] = useState(false);

  const [presenterConfig, setPresenterConfig] = useState<PresenterConfig>({
    isEnabled: false,
    position: 'bottom-right',
    shape: 'rounded-rect',
    size: 'standard',
    speakerName: 'Live Presenter · Team On Air',
    speakerRole: 'Engineering Team · Hackathon 2026',
    isMicActive: true,
    isMuted: false
  });

  // Sync data-theme with documentElement
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('shelter_finder_theme', theme);
  }, [theme]);

  // Global keyboard shortcuts: 't' to cycle themes, 'a' to open accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea' || (document.activeElement as HTMLElement)?.isContentEditable) {
        return;
      }
      if (e.key.toLowerCase() === 't') {
        setTheme(prev => (prev === 'dark' ? 'beige' : prev === 'beige' ? 'gray' : 'dark'));
      } else if (e.key.toLowerCase() === 'a') {
        setIsA11yModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);


  const handleUpdatePresenter = (newCfg: Partial<PresenterConfig>) => {
    setPresenterConfig(prev => ({ ...prev, ...newCfg }));
  };

  const handleToggleCamera = () => {
    setPresenterConfig(prev => ({ ...prev, isEnabled: !prev.isEnabled }));
  };

  const handleSelectSection = (index: number) => {
    setCurrentSlideIndex(index);
    if (currentView !== 'slides') {
      setCurrentView('slides');
    }
  };

  return (
    <div
      data-theme={theme}
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-10 transition-colors duration-200"
    >
      {/* Top Bar Navigation */}
      <Header
        currentView={currentView}
        onSelectView={setCurrentView}
        presenterConfig={presenterConfig}
        onToggleCamera={handleToggleCamera}
        theme={theme}
        onSelectTheme={setTheme}
        onOpenAccessibility={() => setIsA11yModalOpen(true)}
      />



      {/* Main Viewport Container with CSS-based View Transition */}
      <main className="flex-1 w-full relative overflow-hidden">
        <div
          key={currentView}
          className="w-full h-full cinematic-view-enter"
        >
          {currentView === 'slides' && (
            <SlideDeck
              presenterConfig={presenterConfig}
              onUpdatePresenterConfig={handleUpdatePresenter}
              onOpenFullDemo={() => setCurrentView('demo')}
              activeSlideIndex={currentSlideIndex}
              onSlideChange={setCurrentSlideIndex}
              theme={theme}
              onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'beige' : prev === 'beige' ? 'gray' : 'dark')}
            />
          )}

          {currentView === 'story' && (
            <div className="w-full min-h-[calc(100vh-65px)] flex items-center justify-center p-4 md:p-8">
              <div className="w-full max-w-6xl slide-ratio-16-9 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <SlideHumanStory />
              </div>
            </div>
          )}

          {currentView === 'demo' && (
            <PlatformDemo
              onOpenArchitecture={() => setCurrentView('architecture')}
              onOpenDataSources={() => setCurrentView('datasources')}
            />
          )}

          {currentView === 'architecture' && (
            <div className="w-full min-h-[calc(100vh-65px)] flex items-center justify-center p-4 md:p-8">
              <div className="w-full max-w-6xl slide-ratio-16-9 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <SlideArchitecture />
              </div>
            </div>
          )}

          {currentView === 'datasources' && (
            <div className="w-full min-h-[calc(100vh-65px)] flex items-center justify-center p-4 md:p-8">
              <div className="w-full max-w-6xl slide-ratio-16-9 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <SlideDataSources />
              </div>
            </div>
          )}

          {currentView === 'original-screenshots' && (
            <ScreenshotGallery />
          )}

          {currentView === 'export' && (
            <PowerPointExporter />
          )}
        </div>
      </main>

      {/* Persistent Live Team Video Overlay (can be toggled / moved across any view) */}
      <PresenterCamera
        config={presenterConfig}
        onChangeConfig={handleUpdatePresenter}
      />

      {/* Viewport Slide & Presentation Progress Indicator */}
      <PresentationProgressIndicator
        currentSectionIndex={currentSlideIndex}
        totalSections={SLIDES_DATA.length}
        sections={SLIDES_DATA}
        onSelectSection={handleSelectSection}
      />

      {/* Universal Accessibility Center Modal */}
      <AccessibilityModal
        isOpen={isA11yModalOpen}
        onClose={() => setIsA11yModalOpen(false)}
        settings={accessibilitySettings}
        onUpdateSettings={(newSettings) =>
          setAccessibilitySettings((prev) => ({ ...prev, ...newSettings }))
        }
        onTriggerVisualAlertTest={() => {
          setShowVisualAlert(true);
          setIsA11yModalOpen(false);
        }}
      />

      {/* Live Presentation Closed Caption Subtitle Bar */}
      <LiveCaptionBar
        isVisible={accessibilitySettings.closedCaptionsEnabled}
        onClose={() =>
          setAccessibilitySettings((prev) => ({ ...prev, closedCaptionsEnabled: false }))
        }
        activeText={
          currentView === 'slides'
            ? `Slide ${currentSlideIndex + 1}: ${SLIDES_DATA[currentSlideIndex]?.title} — ${SLIDES_DATA[currentSlideIndex]?.subtitle}`
            : undefined
        }
      />

      {/* Visual Strobe Alert Beacon for Deaf / Hard of Hearing Evacuees */}
      <VisualStrobeAlertOverlay
        isVisible={showVisualAlert}
        onDismiss={() => setShowVisualAlert(false)}
        shelterName="Baton Rouge River Center"
        distanceMiles={0.8}
      />
    </div>
  );
}


