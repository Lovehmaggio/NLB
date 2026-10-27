export interface StoryChapter {
  id: string;
  title: string;
  phase: string;
  timeframe: string;
  excerpt: string;
  details: string[];
  keyInsight: string;
}

export const MATEO_STORY = {
  subject: 'Mateo',
  age: 28,
  condition: 'Born profoundly deaf',
  location: 'Hills of Utuado, Puerto Rico',
  event: 'Hurricane Maria (September 20, 2017)',
  headline: 'The rain did not arrive as a sound for Mateo; it arrived as a physical force.',
  leadText: 'When Hurricane Maria made landfall, the rest of the island heard a freight train roaring through their roofs. Mateo felt it through his feet: violent, rhythmic thrums vibrating through the concrete slab of his floorboards, followed by the rapid drop in barometric pressure that popped his inner ears.',
  
  chapters: [
    {
      id: 'storm-arrival',
      title: 'The Physical Force of Maria',
      phase: 'Landfall & Blackout',
      timeframe: 'Sept 20, 2017 · Nightfall',
      excerpt: 'For a deaf person, pitch darkness is not just an inconvenience—it is total sensory isolation.',
      details: [
        'Stocked fresh water, canned goods, batteries for visual alarm clock, and flashlights.',
        'Grid shattered within hours; lights vanished into total blackness.',
        'Without light, Mateo could not use Puerto Rican Sign Language (LPR) or read lips.',
        'His flashlight beam became his only tether to communication and physical orientation.'
      ],
      keyInsight: 'In disaster blackouts, loss of light removes both vision and communication for deaf evacuees.'
    },
    {
      id: 'midnight-flood',
      title: '2:00 AM: The Sloshing Floorboards',
      phase: 'Flash Flooding & Roof Evacuation',
      timeframe: '2:00 AM · Peak Surge',
      excerpt: 'He felt a slow, sloshing pulse against the frame of his bed: dark water carrying mud beneath the front door.',
      details: [
        'Zero audio cues to know if the roof was peeling off or if a river burst its banks outside.',
        'Relied 100% on tactile vibrations and visual scanning with flashlight.',
        'Water quickly reached his calves; grabbed emergency backpack and booted up.',
        'Forced open back door against wind like a solid wall, guiding himself up concrete exterior stairs to the roof slab under a plastic tarp.'
      ],
      keyInsight: 'Evacuees with sensory disabilities rely solely on tactile and visual cues to detect structural collapse.'
    },
    {
      id: 'triple-barrier',
      title: 'Total Grid Collapse: The 3 Barriers',
      phase: 'The Communication Void',
      timeframe: 'Day 1 to Day 14',
      excerpt: 'When dawn broke, power poles lay crossed like fallen matchsticks and mobile phones were dead glass bricks.',
      details: [
        'Dead Glass Brick: Mobile phone battery died; no text relays or video relay services (VRS).',
        'Inaudible Loudspeakers: National Guard trucks & municipal bullhorns broadcast instructions Mateo could not hear.',
        'Line-of-Sight Isolation: Shouted warnings across flooded streets were completely unreachable.'
      ],
      keyInsight: 'Standard emergency broadcast systems rely entirely on audio bullhorns, leaving deaf citizens invisible.'
    },
    {
      id: 'visual-survival',
      title: 'Overcoming the Odds: Visual Synergy',
      phase: 'Mutual Aid & Community Defense',
      timeframe: 'Weeks 1–20',
      excerpt: 'Mateo survived not by waiting for a hearing world to adapt, but through sharp visual discipline and mutual aid.',
      details: [
        'Bedsheet Signal: Painted “AGUA / COMIDA / DEAF / SORDO” on his porch railing; hung a white towel signal for Doña Carmen.',
        '2-Mile Mountain Trek: Hiked steep landslide trails to a freshwater spring, scanning slopes for falling gravel without audio.',
        'Notebook Pencil Network: Shared water with older neighbors; Doña Carmen wrote updates: “Government truck at bridge tomorrow 9 AM for rations.”',
        'Cooking Oil Lamps: Crafted homemade oil lamps to conserve flashlight batteries across 5 dark months.'
      ],
      keyInsight: 'Resilience requires visual-first communication systems and pre-mapped community safety nodes.'
    }
  ],

  platformRelevance: {
    problemStatement: 'Mateo faced a double disaster: natural catastrophe combined with total communication and sensory blackout.',
    systemSolution: 'Our Emergency Shelter Finder uses CDC PLACES local health data to identify census tracts with high concentrations of hearing, vision, and mobility disabilities—ensuring routing directs evacuees to facilities with visual emergency alerts, auxiliary sign aids, and backup power stations.'
  }
};
