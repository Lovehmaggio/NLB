import React, { useRef, useState, useEffect } from 'react';
import { Camera, CameraOff, Mic, MicOff, Move, Maximize2, Minimize2, Video, Volume2, UserCheck } from 'lucide-react';
import { PresenterConfig } from '../types';

interface PresenterCameraProps {
  config: PresenterConfig;
  onChangeConfig: (newConfig: Partial<PresenterConfig>) => void;
}

export const PresenterCamera: React.FC<PresenterCameraProps> = ({ config, onChangeConfig }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isAudioDetected, setIsAudioDetected] = useState<boolean>(false);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [nameInput, setNameInput] = useState<string>(config.speakerName);
  const [roleInput, setRoleInput] = useState<string>(config.speakerRole);
  const [audioLevel, setAudioLevel] = useState<number>(0);

  // Initialize Camera
  useEffect(() => {
    let currentStream: MediaStream | null = null;
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let animationFrameId: number;

    const startCamera = async () => {
      if (!config.isEnabled) {
        if (stream) {
          stream.getTracks().forEach(t => t.stop());
          setStream(null);
        }
        return;
      }

      try {
        setErrorMsg(null);
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user'
          },
          audio: config.isMicActive
        });

        currentStream = mediaStream;
        setStream(mediaStream);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        // Setup audio visualizer if mic is active
        if (config.isMicActive && mediaStream.getAudioTracks().length > 0) {
          try {
            audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
            const source = audioContext.createMediaStreamSource(mediaStream);
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 64;
            source.connect(analyser);

            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            const checkAudio = () => {
              if (!analyser) return;
              analyser.getByteFrequencyData(dataArray);
              let sum = 0;
              for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
              }
              const average = sum / dataArray.length;
              setAudioLevel(Math.min(100, Math.round((average / 128) * 100)));
              setIsAudioDetected(average > 10);
              animationFrameId = requestAnimationFrame(checkAudio);
            };
            checkAudio();
          } catch {
            // Audio visualizer optional fallback
          }
        }
      } catch (err: unknown) {
        const error = err as Error;
        console.warn('Camera/Mic access info:', error.message);
        setErrorMsg('Camera access unavailable. Using interactive team standby portrait.');
      }
    };

    if (config.isEnabled) {
      startCamera();
    } else if (stream) {
      stream.getTracks().forEach(t => t.stop());
      setStream(null);
    }

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(t => t.stop());
      }
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close();
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [config.isEnabled, config.isMicActive]);

  // Update video ref whenever stream changes or component re-renders
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Position classes
  const getPositionClass = () => {
    switch (config.position) {
      case 'top-right':
        return 'top-20 right-6';
      case 'top-left':
        return 'top-20 left-6';
      case 'bottom-left':
        return 'bottom-20 left-6';
      case 'bottom-right':
      default:
        return 'bottom-20 right-6';
    }
  };

  const getSizeClass = () => {
    switch (config.size) {
      case 'compact':
        return 'w-56 h-36';
      case 'expanded':
        return 'w-88 h-52';
      case 'standard':
      default:
        return 'w-72 h-44';
    }
  };

  const cyclePosition = () => {
    const positions: PresenterConfig['position'][] = ['bottom-right', 'top-right', 'top-left', 'bottom-left'];
    const currentIndex = positions.indexOf(config.position);
    const nextIndex = (currentIndex + 1) % positions.length;
    onChangeConfig({ position: positions[nextIndex] });
  };

  const cycleSize = () => {
    const sizes: PresenterConfig['size'][] = ['compact', 'standard', 'expanded'];
    const currentIndex = sizes.indexOf(config.size);
    const nextIndex = (currentIndex + 1) % sizes.length;
    onChangeConfig({ size: sizes[nextIndex] });
  };

  const saveName = () => {
    onChangeConfig({ speakerName: nameInput, speakerRole: roleInput });
    setIsEditingName(false);
  };

  return (
    <div
      className={`fixed z-50 ${getPositionClass()} transition-all duration-300 ease-out select-none`}
      style={{ filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.6))' }}
    >
      <div
        className={`relative ${getSizeClass()} rounded-2xl overflow-hidden border-2 transition-all duration-200 bg-slate-900 ${
          isAudioDetected ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.5)]' : 'border-blue-500/60 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
        }`}
      >
        {/* Actual Video or Standby graphic */}
        {config.isEnabled && stream && !errorMsg ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform -scale-x-100"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-slate-200">
            <div className="relative mb-2">
              <div className="w-14 h-14 rounded-full bg-blue-600/30 border border-blue-400/50 flex items-center justify-center text-blue-300 shadow-inner">
                <Video className="w-7 h-7" />
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
            </div>
            <p className="text-xs font-semibold text-white tracking-wide truncate max-w-full px-2">
              {config.speakerName}
            </p>
            <p className="text-[10px] text-blue-300 truncate max-w-full px-2">
              {config.isEnabled ? 'Camera connecting...' : 'Live Presenter Standby'}
            </p>
            {!config.isEnabled && (
              <button
                onClick={() => onChangeConfig({ isEnabled: true })}
                className="mt-2 text-[10px] bg-blue-600 hover:bg-blue-500 text-white font-medium px-2.5 py-1 rounded-md transition-colors shadow-sm"
              >
                Turn On Camera
              </button>
            )}
          </div>
        )}

        {/* Top Control Bar inside PIP */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-auto">
          {/* Live broadcast badge */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-white font-medium">
            <span className={`w-2 h-2 rounded-full ${config.isEnabled && stream ? 'bg-red-500 animate-pulse' : 'bg-amber-400'}`} />
            <span>{config.isEnabled && stream ? 'LIVE ON AIR' : 'PRESENTER'}</span>
          </div>

          {/* Quick window controls */}
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-lg p-0.5 border border-white/10 text-white/80">
            <button
              onClick={cyclePosition}
              title="Move camera to next corner"
              className="p-1 hover:text-white hover:bg-white/10 rounded transition-colors"
            >
              <Move className="w-3 h-3" />
            </button>
            <button
              onClick={cycleSize}
              title="Resize camera"
              className="p-1 hover:text-white hover:bg-white/10 rounded transition-colors"
            >
              {config.size === 'expanded' ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </button>
            <button
              onClick={() => onChangeConfig({ isEnabled: !config.isEnabled })}
              title={config.isEnabled ? 'Disable camera' : 'Enable camera'}
              className="p-1 hover:text-white hover:bg-white/10 rounded transition-colors"
            >
              {config.isEnabled ? <Camera className="w-3 h-3 text-emerald-400" /> : <CameraOff className="w-3 h-3 text-rose-400" />}
            </button>
          </div>
        </div>

        {/* Bottom Speaker Title Strip */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-2 text-white">
          {isEditingName ? (
            <div className="flex flex-col gap-1 bg-slate-900/95 p-1.5 rounded border border-blue-500/50">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Presenter / Team Name"
                className="text-xs bg-slate-800 text-white px-1.5 py-0.5 rounded border border-slate-700 outline-none"
              />
              <input
                type="text"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                placeholder="Role (e.g. Lead Engineer)"
                className="text-[10px] bg-slate-800 text-white px-1.5 py-0.5 rounded border border-slate-700 outline-none"
              />
              <div className="flex justify-end gap-1 mt-0.5">
                <button
                  onClick={() => setIsEditingName(false)}
                  className="text-[10px] px-1.5 py-0.5 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={saveName}
                  className="text-[10px] px-2 py-0.5 bg-blue-600 hover:bg-blue-500 text-white rounded font-medium"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div
                onClick={() => setIsEditingName(true)}
                title="Click to customize presenter name for PowerPoint pitch"
                className="cursor-pointer group flex items-center gap-1.5 truncate"
              >
                <UserCheck className="w-3 h-3 text-blue-400 shrink-0" />
                <div className="truncate">
                  <div className="text-[11px] font-semibold tracking-wide text-white group-hover:text-blue-300 transition-colors truncate">
                    {config.speakerName}
                  </div>
                  <div className="text-[9px] text-slate-300 truncate">
                    {config.speakerRole}
                  </div>
                </div>
              </div>

              {/* Mic & Audio meter */}
              <div className="flex items-center gap-1.5 shrink-0">
                {config.isMicActive && (
                  <div className="flex items-end gap-0.5 h-3 w-4 px-0.5" title={`Speaking Volume: ${audioLevel}%`}>
                    <div
                      className="w-1 bg-emerald-400 rounded-full transition-all duration-75"
                      style={{ height: `${Math.max(20, audioLevel)}%` }}
                    />
                    <div
                      className="w-1 bg-emerald-400 rounded-full transition-all duration-75"
                      style={{ height: `${Math.max(15, audioLevel * 0.8)}%` }}
                    />
                    <div
                      className="w-1 bg-emerald-400 rounded-full transition-all duration-75"
                      style={{ height: `${Math.max(10, audioLevel * 0.6)}%` }}
                    />
                  </div>
                )}
                <button
                  onClick={() => onChangeConfig({ isMicActive: !config.isMicActive })}
                  className="p-1 hover:bg-white/20 rounded transition-colors text-slate-300 hover:text-white"
                  title={config.isMicActive ? 'Mute microphone' : 'Unmute microphone'}
                >
                  {config.isMicActive ? <Mic className="w-3 h-3 text-emerald-400" /> : <MicOff className="w-3 h-3 text-rose-400" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
