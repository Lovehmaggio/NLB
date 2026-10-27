import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Navigation,
  Zap,
  Accessibility,
  Stethoscope,
  ShieldAlert,
  Compass,
  AlertTriangle,
  Radio,
  ExternalLink,
  Layers,
  ChevronRight,
  Sparkles,
  Maximize2,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { ShelterItem } from '../types';

interface InteractiveShelterMapProps {
  originAddress: string;
  shelters: ShelterItem[];
  selectedShelterId: string | null;
  onSelectShelter: (shelter: ShelterItem) => void;
  userCoords?: { lat: number; lng: number };
}

export const InteractiveShelterMap: React.FC<InteractiveShelterMapProps> = ({
  originAddress,
  shelters,
  selectedShelterId,
  onSelectShelter,
  userCoords = { lat: 30.4515, lng: -91.1871 } // Default Baton Rouge center
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showAlertPushover, setShowAlertPushover] = useState<boolean>(true);
  const [mapStyle, setMapStyle] = useState<'emergency-dark' | 'satellite' | 'hydrology'>('emergency-dark');

  const activeShelter = shelters.find(s => s.id === selectedShelterId) || shelters[0] || null;

  // Whenever selected shelter changes, trigger the proximity alert banner
  useEffect(() => {
    if (activeShelter) {
      setShowAlertPushover(true);
    }
  }, [selectedShelterId]);

  // Spatial coordinates normalization for the canvas (Baton Rouge bbox or relative)
  const mapCenter = { lat: 30.46, lng: -91.17 };
  const latSpan = 0.22;
  const lngSpan = 0.30;

  const projectToCanvas = (lat: number, lng: number) => {
    // Mercator-like normalized 0-100% inside SVG container
    const x = ((lng - (mapCenter.lng - lngSpan / 2)) / lngSpan) * 100;
    const y = (((mapCenter.lat + latSpan / 2) - lat) / latSpan) * 100;
    // Clamp to valid canvas bounds
    return {
      x: Math.max(8, Math.min(92, x)),
      y: Math.max(10, Math.min(90, y))
    };
  };

  const originPoint = projectToCanvas(userCoords.lat, userCoords.lng);
  const activePoint = activeShelter ? projectToCanvas(activeShelter.lat, activeShelter.lng) : null;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-[#070b14] shadow-2xl flex flex-col select-none">
      {/* Top Map Header & Controls Strip */}
      <div className="bg-slate-950/90 backdrop-blur-md px-4 py-2.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 z-20">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Compass className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Google Maps Spatial Routing & Proximity HUD</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              Origin: {originAddress} ({userCoords.lat.toFixed(4)}, {userCoords.lng.toFixed(4)})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Map Layer Mode */}
          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-[11px]">
            <button
              onClick={() => setMapStyle('emergency-dark')}
              className={`px-2 py-0.5 rounded transition-colors ${
                mapStyle === 'emergency-dark' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Dark Grid
            </button>
            <button
              onClick={() => setMapStyle('hydrology')}
              className={`px-2 py-0.5 rounded transition-colors ${
                mapStyle === 'hydrology' ? 'bg-cyan-600 text-white font-medium' : 'text-slate-400 hover:text-white'
              }`}
            >
              Surge & Flood
            </button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-0.5 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-slate-300">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.6))}
              className="p-1 hover:bg-slate-800 hover:text-white rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))}
              className="p-1 hover:bg-slate-800 hover:text-white rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Real-Time Proximity Alert Banner */}
      {activeShelter && showAlertPushover && (
        <div className="absolute top-14 inset-x-4 z-30 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className={`p-3 rounded-xl border shadow-2xl backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 ${
            activeShelter.distanceMiles <= 2.0
              ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100 shadow-emerald-950/50'
              : activeShelter.distanceMiles <= 8.0
              ? 'bg-blue-950/90 border-blue-500/50 text-blue-100 shadow-blue-950/50'
              : 'bg-amber-950/90 border-amber-500/50 text-amber-100 shadow-amber-950/50'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl flex items-center justify-center shrink-0 ${
                activeShelter.distanceMiles <= 2.0
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-blue-500/20 text-blue-400'
              }`}>
                <Radio className="w-5 h-5 animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                    activeShelter.distanceMiles <= 2.0
                      ? 'bg-emerald-500/30 text-emerald-300'
                      : 'bg-blue-500/30 text-blue-300'
                  }`}>
                    {activeShelter.distanceMiles <= 2.0 ? 'IMMEDIATE REACH' : 'ACCESSIBLE CORRIDOR'}
                  </span>
                  <span>{activeShelter.name}</span>
                </div>

                <div className="text-xs mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-200">
                  <span className="font-mono font-bold text-white">
                    📍 {activeShelter.distanceMiles} miles away · ~{activeShelter.travelTimeMinutes} mins drive
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="flex items-center gap-1 text-amber-300">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    {activeShelter.hasBackupGenerator ? 'Industrial Generator Active' : 'Standard Power'}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-cyan-300 font-mono">
                    {activeShelter.hhsEmPowerVulnerabilityMatched} emPOWER vulnerable matched
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${activeShelter.lat},${activeShelter.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-md transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Launch GPS Routing</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>

              <button
                onClick={() => setShowAlertPushover(false)}
                className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white text-xs"
                title="Dismiss Alert"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Map Viewport Canvas */}
      <div className="relative w-full h-[400px] md:h-[460px] overflow-hidden bg-[#090e1a]">
        {/* SVG Cartographic Layer with Scaling */}
        <div
          className="w-full h-full transition-transform duration-300 origin-center"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              {/* Radial gradient for pulse beacon */}
              <radialGradient id="originGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
              </radialGradient>

              {/* Route stroke gradient */}
              <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>

              {/* Waterway pattern */}
              <linearGradient id="waterway" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0e2338" />
                <stop offset="100%" stopColor="#0a1827" />
              </linearGradient>
            </defs>

            {/* Grid Coordinates Lines */}
            <pattern id="coordGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#coordGrid)" />

            {/* Mississippi River Natural Curve Simulation for Baton Rouge */}
            <path
              d="M 28 0 C 32 25, 24 45, 26 65 C 27 80, 22 92, 18 100 L 10 100 L 10 0 Z"
              fill="url(#waterway)"
              stroke="rgba(56, 189, 248, 0.2)"
              strokeWidth="0.8"
            />

            {/* Major Evacuation Corridors (I-10 & I-12 Highways) */}
            <path
              d="M 0 48 Q 45 42 100 52"
              fill="none"
              stroke="rgba(148, 163, 184, 0.2)"
              strokeWidth="1.2"
              strokeDasharray="2, 1"
            />
            <path
              d="M 38 45 L 95 20"
              fill="none"
              stroke="rgba(148, 163, 184, 0.15)"
              strokeWidth="1"
            />
            <path
              d="M 25 10 L 28 95"
              fill="none"
              stroke="rgba(148, 163, 184, 0.15)"
              strokeWidth="0.8"
            />

            {/* Hydrology & Flood Surge Zones if selected */}
            {mapStyle === 'hydrology' && (
              <g opacity="0.35">
                <circle cx="25" cy="55" r="14" fill="#0284c7" />
                <circle cx="22" cy="75" r="18" fill="#0369a1" />
                <circle cx="15" cy="30" r="12" fill="#0284c7" />
              </g>
            )}

            {/* Active Turn-by-Turn Route Polyline (if shelter selected) */}
            {activePoint && (
              <g>
                {/* Glowing shadow line */}
                <path
                  d={`M ${originPoint.x} ${originPoint.y} Q ${(originPoint.x + activePoint.x) / 2 + 3} ${(originPoint.y + activePoint.y) / 2 - 4} ${activePoint.x} ${activePoint.y}`}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                  strokeOpacity="0.4"
                  strokeLinecap="round"
                />
                {/* Foreground animated pulse path */}
                <path
                  d={`M ${originPoint.x} ${originPoint.y} Q ${(originPoint.x + activePoint.x) / 2 + 3} ${(originPoint.y + activePoint.y) / 2 - 4} ${activePoint.x} ${activePoint.y}`}
                  fill="none"
                  stroke="url(#routeGrad)"
                  strokeWidth="1.2"
                  strokeDasharray="3, 2"
                  strokeLinecap="round"
                >
                  <animate attributeName="stroke-dashoffset" values="10;0" dur="1.2s" repeatCount="indefinite" />
                </path>
              </g>
            )}

            {/* Radius Proximity Ring around user (5 miles) */}
            <circle
              cx={originPoint.x}
              cy={originPoint.y}
              r="22"
              fill="none"
              stroke="rgba(56, 189, 248, 0.15)"
              strokeWidth="0.6"
              strokeDasharray="2, 2"
            />
            <circle
              cx={originPoint.x}
              cy={originPoint.y}
              r="38"
              fill="none"
              stroke="rgba(56, 189, 248, 0.08)"
              strokeWidth="0.4"
            />

            {/* Origin User Marker */}
            <g transform={`translate(${originPoint.x}, ${originPoint.y})`}>
              <circle r="4.5" fill="url(#originGlow)" className="animate-ping" opacity="0.6" />
              <circle r="2.2" fill="#38bdf8" stroke="#ffffff" strokeWidth="0.8" />
              <text y="-3.5" textAnchor="middle" fill="#38bdf8" fontSize="2.4" fontWeight="bold" fontFamily="monospace">
                YOU (ORIGIN)
              </text>
            </g>

            {/* Shelter Markers */}
            {shelters.map((shelter, idx) => {
              const pt = projectToCanvas(shelter.lat, shelter.lng);
              const isSelected = shelter.id === activeShelter?.id;

              return (
                <g
                  key={shelter.id}
                  transform={`translate(${pt.x}, ${pt.y})`}
                  className="cursor-pointer group"
                  onClick={() => onSelectShelter(shelter)}
                >
                  {/* Selection pulse ring */}
                  {isSelected && (
                    <circle
                      r="6"
                      fill="none"
                      stroke={shelter.hasBackupGenerator ? '#f59e0b' : '#38bdf8'}
                      strokeWidth="0.8"
                      className="animate-ping"
                      opacity="0.75"
                    />
                  )}

                  {/* Marker Pin Base */}
                  <circle
                    r={isSelected ? '3.5' : '2.8'}
                    fill={isSelected ? '#1d4ed8' : '#0f172a'}
                    stroke={
                      isSelected
                        ? '#38bdf8'
                        : shelter.hasBackupGenerator
                        ? '#f59e0b'
                        : '#64748b'
                    }
                    strokeWidth={isSelected ? '1' : '0.7'}
                  />

                  {/* Shelter index number */}
                  <text
                    y="1"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize={isSelected ? '2.4' : '2'}
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {idx + 1}
                  </text>

                  {/* Generator badge pill */}
                  {shelter.hasBackupGenerator && (
                    <circle cx="2.2" cy="-2.2" r="1.1" fill="#f59e0b" />
                  )}

                  {/* Label on Hover / Active */}
                  <g opacity={isSelected ? 1 : 0.85} transform="translate(0, 5)">
                    <rect
                      x="-14"
                      y="-1.5"
                      width="28"
                      height="3.8"
                      rx="1"
                      fill="#020617"
                      stroke={isSelected ? '#38bdf8' : '#334155'}
                      strokeWidth="0.3"
                    />
                    <text
                      y="1.2"
                      textAnchor="middle"
                      fill={isSelected ? '#38bdf8' : '#cbd5e1'}
                      fontSize="1.8"
                      fontWeight="600"
                    >
                      {shelter.name.split(' ')[0]} {shelter.distanceMiles}mi
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Bottom Shelter Quick-Selector Strip inside Map */}
        <div className="absolute bottom-3 inset-x-3 z-20 flex items-center gap-2 overflow-x-auto pb-1">
          {shelters.map((shelter, idx) => {
            const isSelected = shelter.id === activeShelter?.id;
            return (
              <button
                key={shelter.id}
                onClick={() => onSelectShelter(shelter)}
                className={`p-2 rounded-xl border text-left backdrop-blur-md transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-950/90 border-cyan-400 ring-1 ring-cyan-400 shadow-lg text-white'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`w-4 h-4 rounded-full font-mono text-[9px] font-bold flex items-center justify-center ${
                    isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold truncate max-w-[140px]">
                    {shelter.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                  <span className="text-emerald-400">{shelter.distanceMiles} mi</span>
                  <span>·</span>
                  <span>{shelter.travelTimeMinutes} mins</span>
                  {shelter.hasBackupGenerator && (
                    <Zap className="w-3 h-3 text-amber-400 shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Legend & Telemetry Footer */}
      <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>Origin (GPS Anchor)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Backup Generator Onsite</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>ADA Wheelchair Hub</span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-cyan-400">
          <span>Click any pin or shelter card to trigger real-time proximity alerts</span>
        </div>
      </div>
    </div>
  );
};
