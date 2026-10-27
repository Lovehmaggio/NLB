import { FederalDataSource, ShelterItem, ArchitectureComponent, SlideInfo } from '../types';

export const FEDERAL_DATA_SOURCES: FederalDataSource[] = [
  {
    id: 'fema-nss',
    number: 1,
    name: 'FEMA National Shelter System (NSS)',
    agency: 'FEMA & American Red Cross',
    description: 'Standing national inventory of registered emergency evacuation shelters, capacity metrics, and operational flags (wheelchair access, generators, pets).',
    statusTag: 'Public & Maintained',
    endpointInfo: 'ArcGIS Feature Service (gis.fema.gov)',
    accentColor: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400',
    stats: '1,326 active/standby shelters indexed',
    keyUtility: 'Physical shelter locations, bed counts, ADA compliance & pet policies'
  },
  {
    id: 'hhs-empower',
    number: 2,
    name: 'HHS emPOWER Program',
    agency: 'U.S. Dept of Health & Human Services (ASPR / CMS)',
    description: 'Monthly datasets tracking Medicare beneficiaries who rely on electricity-dependent life-maintaining medical equipment (ventilators, dialysis, oxygen, CPAP).',
    statusTag: 'Public & Maintained',
    endpointInfo: 'Privacy Protected (counts 1–10 masked as "11")',
    accentColor: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400',
    stats: '4.4M+ electricity-dependent beneficiaries',
    keyUtility: 'Direct matching for backup generator priority during power grid blackouts'
  },
  {
    id: 'census-acs',
    number: 3,
    name: 'American Community Survey (ACS)',
    agency: 'U.S. Census Bureau',
    description: 'Demographic characteristics, total households, zero-vehicle households, and housing infrastructure metrics at the census tract level.',
    statusTag: 'Public & Maintained',
    endpointInfo: 'Google Cloud Public Datasets (bigquery-public-data.census_bureau_acs)',
    accentColor: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400',
    stats: '73,000+ census tracts nationwide',
    keyUtility: 'Identifies transit-dependent evacuees needing targeted pickup hubs'
  },
  {
    id: 'cdc-svi',
    number: 4,
    name: 'CDC Social Vulnerability Index (SVI)',
    agency: 'Centers for Disease Control and Prevention (CDC / ATSDR)',
    description: 'Tract-level percentile rankings assessing socioeconomic vulnerability, household composition, minority status, and housing/transportation barriers.',
    statusTag: 'Public & Maintained',
    endpointInfo: 'ArcGIS REST Endpoints (Updated biennially)',
    accentColor: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
    stats: '16 social factor metrics per tract',
    keyUtility: 'Prioritizes high-vulnerability evacuees during regional surge events'
  },
  {
    id: 'cdc-places',
    number: 5,
    name: 'CDC PLACES (Local Data for Health)',
    agency: 'CDC in partnership with CDC Foundation',
    description: 'Model-based small-area health estimates (walking difficulties, independent living capabilities, cognitive disability) at census tract resolution.',
    statusTag: 'Public & Maintained',
    endpointInfo: 'Open Data API (data.cdc.gov)',
    accentColor: 'from-teal-500/20 to-teal-600/10 border-teal-500/30 text-teal-400',
    stats: '39 chronic health measures',
    keyUtility: 'Anticipates high-barrier medical supplies required at designated sites'
  },
  {
    id: 'fema-nri',
    number: 6,
    name: 'FEMA National Risk Index (NRI)',
    agency: 'Federal Emergency Management Agency (FEMA)',
    description: 'Baseline natural hazard risk measurements, annualized loss estimates, and exposure metrics for hurricanes, coastal flooding, and severe weather.',
    statusTag: 'Public & Maintained',
    endpointInfo: 'ArcGIS Services (FEMA Open Data)',
    accentColor: 'from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-400',
    stats: '18 natural hazard categories',
    keyUtility: 'Validates that recommended shelters lie outside immediate flood surge zones'
  },
  {
    id: 'cms-nursing-homes',
    number: 7,
    name: 'CMS Provider Data (Nursing Homes)',
    agency: 'Centers for Medicare & Medicaid Services (CMS)',
    description: 'Monthly registry of certified skilled nursing and long-term care facilities, including licensed bed capacities and verified geographic coordinates.',
    statusTag: 'Public & Maintained',
    endpointInfo: 'Open Data (data.cms.gov)',
    accentColor: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-400',
    stats: '15,000+ certified facilities',
    keyUtility: 'Assesses specialized institutional surge bed availability'
  }
];

export const PREPROCESSING_NOTICE = {
  title: 'Engineering Preprocessing & Data Quality Notice',
  summary: 'While these sources are publicly maintained by federal agencies, they require careful pipeline preprocessing before ingestion into BigQuery.',
  bulletPoints: [
    'Inverted coordinate axes: Rectified longitude/latitude flips in certain legacy regional records.',
    'Blank-space string padding: Replaced whitespace artifacts with true SQL nulls for deterministic filtering.',
    'Omitted state reporting variables: Normalized irregular state schemas (such as TX & FL omitting LACKTRPT).',
    'Spatial BigQuery conversion: Automated ETL scripts normalize, validate, and convert spatial geometries into BigQuery Geography prior to real-time spatial indexing.'
  ]
};

export const MOCK_SHELTERS: ShelterItem[] = [
  {
    id: 'sh-01',
    name: 'Raising Cane’s River Center Evacuation Hub',
    agency: 'FEMA NSS #LA-70802-01 / American Red Cross',
    address: '275 S River Rd',
    city: 'Baton Rouge',
    state: 'LA',
    zip: '70802',
    lat: 30.4462,
    lng: -91.1895,
    distanceMiles: 1.4,
    travelTimeMinutes: 5,
    totalCapacity: 1200,
    currentOccupancy: 380,
    status: 'STANDBY',
    hasWheelchairAccess: true,
    isMedicalNeedsReady: true,
    hasBackupGenerator: true,
    allowsPets: true,
    foodService: true,
    hhsEmPowerVulnerabilityMatched: 148,
    contactPhone: '(225) 389-3030',
    notes: 'Primary regional evacuation command. Dual industrial caterpillar generators installed. Medical triage zone active.'
  },
  {
    id: 'sh-02',
    name: 'LSU Pete Maravich Assembly Center (PMAC)',
    agency: 'Louisiana Department of Children & Family Services',
    address: 'Nicholson Dr & N Stadium Dr',
    city: 'Baton Rouge',
    state: 'LA',
    zip: '70803',
    lat: 30.4184,
    lng: -91.1843,
    distanceMiles: 3.2,
    travelTimeMinutes: 8,
    totalCapacity: 2500,
    currentOccupancy: 420,
    status: 'STANDBY',
    hasWheelchairAccess: true,
    isMedicalNeedsReady: true,
    hasBackupGenerator: true,
    allowsPets: false,
    foodService: true,
    hhsEmPowerVulnerabilityMatched: 94,
    contactPhone: '(225) 578-8205',
    notes: 'Designated high-capacity hurricane shelter. Red Cross volunteer team on site. Oxygen concentrator charging bank available.'
  },
  {
    id: 'sh-03',
    name: 'Southern University F.G. Clark Activity Center',
    agency: 'FEMA NSS #LA-70813-04',
    address: '801 Harding Blvd',
    city: 'Baton Rouge',
    state: 'LA',
    zip: '70807',
    lat: 30.5255,
    lng: -91.1899,
    distanceMiles: 6.8,
    travelTimeMinutes: 14,
    totalCapacity: 850,
    currentOccupancy: 110,
    status: 'STANDBY',
    hasWheelchairAccess: true,
    isMedicalNeedsReady: false,
    hasBackupGenerator: true,
    allowsPets: true,
    foodService: true,
    hhsEmPowerVulnerabilityMatched: 67,
    contactPhone: '(225) 771-3140',
    notes: 'North Baton Rouge hub with designated pet boarding zone and exterior staging.'
  },
  {
    id: 'sh-04',
    name: 'Baker High School Community Storm Shelter',
    agency: 'East Baton Rouge Parish OEP',
    address: '3200 Groom Rd',
    city: 'Baker',
    state: 'LA',
    zip: '70714',
    lat: 30.5898,
    lng: -91.1712,
    distanceMiles: 11.2,
    travelTimeMinutes: 19,
    totalCapacity: 450,
    currentOccupancy: 50,
    status: 'STANDBY',
    hasWheelchairAccess: true,
    isMedicalNeedsReady: false,
    hasBackupGenerator: false,
    allowsPets: false,
    foodService: true,
    hhsEmPowerVulnerabilityMatched: 31,
    contactPhone: '(225) 775-6085',
    notes: 'Secondary community staging shelter. Non-critical evacuees only.'
  },
  {
    id: 'sh-05',
    name: 'Denham Springs High School Regional Evac Hub',
    agency: 'Livingston Parish Homeland Security',
    address: '1000 N Range Ave',
    city: 'Denham Springs',
    state: 'LA',
    zip: '70726',
    lat: 30.4952,
    lng: -90.9592,
    distanceMiles: 14.8,
    travelTimeMinutes: 22,
    totalCapacity: 600,
    currentOccupancy: 75,
    status: 'STANDBY',
    hasWheelchairAccess: true,
    isMedicalNeedsReady: true,
    hasBackupGenerator: true,
    allowsPets: true,
    foodService: true,
    hhsEmPowerVulnerabilityMatched: 52,
    contactPhone: '(225) 665-8851',
    notes: 'High-elevation facility equipped with secondary water reserve and emergency generator.'
  }
];

export const ARCHITECTURE_COMPONENTS: ArchitectureComponent[] = [
  {
    id: 'frontend',
    name: 'Frontend UI Client',
    category: 'frontend',
    role: 'Real-Time Interface & Accessibility Filters',
    tech: 'React 19 + Tailwind CSS + Lucide',
    latencyMs: 12,
    details: [
      'Interactive address geocoding input with single-keystroke debounce',
      'Special needs triage: Wheelchair ADA, Medical Needs, Backup Generator',
      'Preview Mode bypass for non-declared emergency states (accesses 1,326 closed NSS records)',
      'Turn-by-turn driving steps rendering and instant navigation launches'
    ]
  },
  {
    id: 'server',
    name: 'Cloud Run Backend',
    category: 'server',
    role: 'Stateless Secure Agent Gateway',
    tech: 'Node.js Express on Google Cloud Run',
    latencyMs: 28,
    details: [
      'Autoscaling containerized REST API with zero cold-start footprint',
      'Environment security with secret injection and CORS validation',
      'Sanitizes user input queries and builds parameterized geospatial predicates',
      'Emits standardized JSON schemas for ADK agent tool routing'
    ]
  },
  {
    id: 'agent',
    name: 'ADK Multi-Tool Pipeline',
    category: 'agent',
    role: 'Intelligent Orchestration Engine',
    tech: 'Agent Development Kit (ADK) Toolbox',
    latencyMs: 35,
    details: [
      'Multi-tool execution pipeline dynamically selecting optimal spatial actions',
      'Parallel parameter mapping between geocoding coordinates & BigQuery SQL',
      'Vulnerability weighting logic combining HHS emPOWER & CDC SVI rankings',
      'Authoritative source fallback handling and error boundary recovery'
    ]
  },
  {
    id: 'bigquery',
    name: 'BigQuery GIS Spatial Grounding',
    category: 'spatial',
    role: 'Massive Geospatial Query Engine',
    tech: 'Google BigQuery GIS + SQL GEOGRAPHY',
    latencyMs: 44,
    details: [
      'ST_DWithin spatial radius queries against 1,326 national shelter locations',
      'ST_Distance geodesic calculations with millimeter precision',
      'Preprocessed joins with 73,000+ Census ACS tracts & HHS emPOWER counts',
      'Sub-50ms execution over gigabytes of federal open data'
    ]
  },
  {
    id: 'maps',
    name: 'Google Maps Platform',
    category: 'routing',
    role: 'Live Geocoding & Routes Computation',
    tech: 'Maps Geocoding API + Routes API',
    latencyMs: 82,
    details: [
      'Precise forward/reverse geocoding to exact lat/lng coordinates',
      'Live traffic-aware driving duration and distance calculations',
      'Turn-by-turn directions with highway evacuation route verification',
      'Direct navigation URL generation with one-touch driver kickoff'
    ]
  }
];

export const SLIDES_DATA: SlideInfo[] = [
  {
    id: 'cover',
    number: 1,
    title: 'Never Left Behind',
    subtitle: 'AI-Powered Accessibility & Evacuation-Readiness System',
    category: 'Title & Hook',
    durationEstimate: '0:30',
    notes: [
      'Original Script — Act I: When the World Went Silent (Presenter 1 | 0:00–0:45)',
      '[The stage is dark. Hold three seconds of silence.]',
      'Before the water came, there was darkness.',
      'At 2:00 in the morning, Hurricane Maria tore through Utuado, Puerto Rico. Mateo, who was deaf, sat beside his grandmother, whose oxygen machine depended on electricity. He could not hear the wind tearing through the mountains. But he felt the concrete trembling beneath him.',
      'Then he watched the green light on her oxygen machine flicker... once... twice... and disappear.',
      'His phone had no signal. Without light, he could not read lips or see anyone sign. Then water touched his feet. And one thought consumed him: Does anyone know we are here?',
      'The storm did not make Mateo invisible. The system had failed to see him long before the rain began.'
    ]
  },
  {
    id: 'problem',
    number: 2,
    title: 'The Disaster Evacuation Gap',
    subtitle: 'Why Standard Consumer Navigation Fails During Natural Disasters',
    category: 'The Problem',
    durationEstimate: '0:30',
    notes: [
      'Original Script — Act II: A System That Understands the Person (Presenter 2 | 0:45–1:35)',
      '[The Never Left Behind interface appears.]',
      'That is why we created Never Left Behind, an NLP-powered accessibility and evacuation-readiness system designed to understand the person behind the emergency.',
      'Instead of forcing someone in crisis to navigate different agencies, databases, and inaccessible forms, the system allows them to describe their situation in plain language:',
      '“I am deaf and use a wheelchair. My grandmother needs oxygen. There are three people in our party, and we do not have a vehicle.”',
      'From that sentence, the engine identifies the information responders need:',
      '• The user’s location and contact information\n• Disabilities and communication needs\n• Mobility and travel limitations\n• Medical or equipment dependencies\n• The number of people in the party\n• Transportation and shelter requirements',
      'The user does not need to understand emergency terminology. They only need to explain what is happening. The system does the work of understanding what survival requires.'
    ]
  },
  {
    id: 'data-sources',
    number: 3,
    title: 'Authoritative Federal Grounding',
    subtitle: 'Ingesting & Preprocessing 7 Mission-Critical Government Feeds',
    category: 'Data & ETL',
    durationEstimate: '0:30',
    notes: [
      'Original Script — Act III: Turning Information Into a Way Out (Presenter 2 | 1:35–2:25)',
      'Once the user’s needs are understood, Never Left Behind locates them and cross-references their situation against three connected knowledge areas.',
      'First, it searches nearby healthcare facilities for resources capable of supporting medical needs, including oxygen dependency and continuous electrical power.',
      'Second, it evaluates available emergency shelters, looking beyond distance to determine whether a location can accommodate wheelchairs, medical equipment, the full party, and specific accessibility needs.',
      'Third, it reviews public transportation and paratransit options to determine how the family can physically reach safety.',
      'The system then combines those findings with route and hazard information. Because the closest shelter is not always the safest shelter.',
      'A building may be nearby but have stairs. A facility may be open but lack backup power. A bus route may exist but be inaccessible to a wheelchair. And a road that appears passable may lead directly through rising water.',
      'Never Left Behind evaluates the entire journey, not just the destination.'
    ]
  },
  {
    id: 'accessibility-ui',
    number: 4,
    title: 'Accessible Emergency Interface & Universal UX',
    subtitle: 'Visual Strobe Beacons, Voice Dictation, Audio Narration & Multi-Theme Contrast',
    category: 'UI & Accessibility',
    durationEstimate: '0:30',
    notes: [
      'Feature Walkthrough — The Universal Accessibility Suite (Presenter 2):',
      '1. Visual Strobe Alert Beacon: Replaces sirens for deaf evacuees with high-visibility pulsing screen beacons.',
      '2. Hands-Free Voice Dictation & Speech Narration: Web Speech STT lets panicked or motor-impaired users speak naturally; TTS provides real-time audio read-aloud for visually impaired evacuees.',
      '3. Multi-Theme Contrast: High-contrast Dark, Gray, and Warm Beige themes ensure visibility in bright sunlight or battery-saving conditions.',
      '4. Offline Emergency Manifest: Generates a self-contained offline credential with medical triage flags so evacuees can navigate checkpoints when mobile networks collapse.'
    ]
  },
  {
    id: 'live-demo',
    number: 5,
    title: 'Live Interactive Walkthrough',
    subtitle: 'Simulating a Category 4 Evacuation in Baton Rouge, LA',
    category: 'Product Demo',
    durationEstimate: '0:35',
    notes: [
      'Original Script — Act IV: From Data to Coordinated Action (Presenter 2 | 2:25–2:45)',
      'In seconds, scattered information becomes one personalized evacuation plan:',
      '• A verified destination.\n• An accessible route.\n• The transportation required.\n• The medical and accessibility accommodations needed upon arrival.\n• And the contact information authorized responders need to reach the family.',
      'When information is missing, the system does not guess. It identifies the gap, flags the risk, and prioritizes options that can be verified.',
      'Live Demo Cue: Click Baton Rouge with Wheelchair Access & Backup Generator filters. Point out Raising Cane’s River Center and LSU PMAC, with sub-50ms BigQuery GIS retrieval and driving directions.'
    ]
  },
  {
    id: 'team-impact',
    number: 6,
    title: 'Impact: Never Left Behind',
    subtitle: 'Scalable to Every U.S. County · Ready for State Emergency Operations',
    category: 'Closing Call',
    durationEstimate: '0:25',
    notes: [
      'Original Script — Act V: No More Names Lost in the Dark (Presenter 1 | 2:45–3:00)',
      'Survival should not belong only to those who can hear the siren, run down the stairs, drive themselves to safety, or breathe without electricity.',
      'Never Left Behind turns one sentence into recognition, recognition into action, and action into a way out.',
      'Because no one should spend their final moments wondering whether the world knows they exist.',
      'And when the lights go out...',
      'no one should be left behind.',
      '[Hold two seconds of silence.]'
    ]
  }
];

export const TEAM_MEMBERS = [
  {
    name: 'Lead AI & Cloud Engineer',
    role: 'ADK Tool Pipeline & Cloud Run Architecture',
    focus: 'Google Cloud Run, ADK Toolbox orchestration, API gateways'
  },
  {
    name: 'Geospatial & BigQuery Specialist',
    role: 'BigQuery GIS & Federal ETL Engineering',
    focus: 'Spatial indexing, geometry conversion, HHS emPOWER data join'
  },
  {
    name: 'UX & Visual Systems Designer',
    role: 'Mission-Critical Human Interface & Maps Integration',
    focus: 'Accessible emergency UI, Google Maps Routes, zero-latency flows'
  }
];
