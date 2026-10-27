export interface SlideInfo {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  category: string;
  notes: string[];
  durationEstimate: string;
}

export interface ShelterItem {
  id: string;
  name: string;
  agency: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  distanceMiles: number;
  travelTimeMinutes: number;
  totalCapacity: number;
  currentOccupancy: number;
  status: 'OPEN' | 'STANDBY' | 'CLOSED';
  hasWheelchairAccess: boolean;
  isMedicalNeedsReady: boolean;
  hasBackupGenerator: boolean;
  allowsPets: boolean;
  foodService: boolean;
  hhsEmPowerVulnerabilityMatched: number; // e.g. 142 electricity-dependent Medicare patients in 5mi radius
  contactPhone: string;
  notes: string;
}

export interface FederalDataSource {
  id: string;
  number: number;
  name: string;
  agency: string;
  description: string;
  statusTag: string;
  endpointInfo: string;
  accentColor: string;
  stats: string;
  keyUtility: string;
}

export interface ArchitectureComponent {
  id: string;
  name: string;
  category: 'frontend' | 'server' | 'agent' | 'spatial' | 'routing';
  role: string;
  tech: string;
  latencyMs: number;
  details: string[];
}

export type ViewMode = 'slides' | 'story' | 'demo' | 'architecture' | 'datasources' | 'original-screenshots' | 'export';

export type AppTheme = 'dark' | 'beige' | 'gray';

export interface AccessibilitySettings {
  voiceInputActive: boolean;
  textToSpeechEnabled: boolean;
  closedCaptionsEnabled: boolean;
  visualStrobeAlerts: boolean; // High-visibility pulse for deaf/HOH evacuees (like Mateo)
  fontSize: 'standard' | 'large' | 'xl';
  highContrast: boolean;
  screenReaderDescriptions: boolean;
  aslSupportFilter: boolean;
}

export interface PresenterConfig {
  isEnabled: boolean;
  position: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left' | 'sidebar';
  shape: 'rounded-rect' | 'circle' | 'card';
  size: 'compact' | 'standard' | 'expanded';
  speakerName: string;
  speakerRole: string;
  isMicActive: boolean;
  isMuted: boolean;
}
