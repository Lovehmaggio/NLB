/**
 * Accessibility Speech Utilities
 * Provides Web Speech API Speech-to-Text (Voice Dictation) and Text-to-Speech (Audio Narration)
 * with robust fallbacks for demo presentation environments.
 */

// Safe Speech Recognition type shim
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export class VoiceDictationService {
  private recognition: any = null;
  private isListening: boolean = false;
  private onResultCallback?: (transcript: string, isFinal: boolean) => void;
  private onStatusCallback?: (listening: boolean, error?: string) => void;

  constructor() {
    const win = typeof window !== 'undefined' ? (window as unknown as IWindow) : null;
    if (win) {
      const SpeechRecognitionClass = win.SpeechRecognition || win.webkitSpeechRecognition;
      if (SpeechRecognitionClass) {
        try {
          this.recognition = new SpeechRecognitionClass();
          this.recognition.continuous = true;
          this.recognition.interimResults = true;
          this.recognition.lang = 'en-US';

          this.recognition.onresult = (event: any) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
              } else {
                interimTranscript += event.results[i][0].transcript;
              }
            }

            const text = finalTranscript || interimTranscript;
            if (this.onResultCallback && text) {
              this.onResultCallback(text, !!finalTranscript);
            }
          };

          this.recognition.onerror = (event: any) => {
            console.warn('Speech recognition error:', event.error);
            if (this.onStatusCallback) {
              this.onStatusCallback(false, event.error);
            }
            this.isListening = false;
          };

          this.recognition.onend = () => {
            this.isListening = false;
            if (this.onStatusCallback) {
              this.onStatusCallback(false);
            }
          };
        } catch (e) {
          console.warn('SpeechRecognition initialization error:', e);
        }
      }
    }
  }

  public isSupported(): boolean {
    return !!this.recognition;
  }

  public start(
    onResult: (transcript: string, isFinal: boolean) => void,
    onStatus?: (listening: boolean, error?: string) => void,
    fallbackText?: string
  ): void {
    this.onResultCallback = onResult;
    this.onStatusCallback = onStatus;

    if (this.recognition) {
      try {
        this.recognition.start();
        this.isListening = true;
        if (this.onStatusCallback) {
          this.onStatusCallback(true);
        }
      } catch (err) {
        console.warn('Recognition start failed, using simulated fallback:', err);
        this.simulateDictation(fallbackText || 'Baton Rouge River Center 70802');
      }
    } else {
      // Graceful presentation fallback
      this.simulateDictation(fallbackText || 'Baton Rouge River Center 70802');
    }
  }

  public stop(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        // ignore
      }
    }
    this.isListening = false;
    if (this.onStatusCallback) {
      this.onStatusCallback(false);
    }
  }

  private simulateDictation(phrase: string): void {
    if (this.onStatusCallback) this.onStatusCallback(true);
    let index = 0;
    const interval = setInterval(() => {
      index += 3;
      if (index >= phrase.length) {
        clearInterval(interval);
        if (this.onResultCallback) this.onResultCallback(phrase, true);
        if (this.onStatusCallback) this.onStatusCallback(false);
      } else {
        if (this.onResultCallback) {
          this.onResultCallback(phrase.slice(0, index), false);
        }
      }
    }, 90);
  }
}

export class AudioNarrationService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public isSupported(): boolean {
    return !!this.synth;
  }

  public speak(
    text: string,
    onStart?: () => void,
    onEnd?: () => void
  ): void {
    if (!this.synth) {
      if (onStart) onStart();
      setTimeout(() => {
        if (onEnd) onEnd();
      }, 1500);
      return;
    }

    try {
      this.synth.cancel(); // Stop any pending speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      utterance.onstart = () => {
        if (onStart) onStart();
      };
      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };
      utterance.onerror = (e) => {
        console.warn('Speech synthesis error:', e);
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis exception:', e);
      if (onEnd) onEnd();
    }
  }

  public stop(): void {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {
        // ignore
      }
    }
    this.currentUtterance = null;
  }

  public isSpeaking(): boolean {
    return !!this.synth && this.synth.speaking;
  }
}

export const voiceDictation = new VoiceDictationService();
export const audioNarration = new AudioNarrationService();
