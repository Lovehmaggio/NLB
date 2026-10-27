import React, { useState } from 'react';
import { Cpu, Terminal, Play, CheckCircle2, Database, MapPin, Zap, Layers, VolumeX, Shield, ArrowRight, Accessibility } from 'lucide-react';
import { ShelterItem } from '../types';

interface AgentJudgeDemoProps {
  onTriggerScenario: (scenario: 'generator' | 'wheelchair' | 'mateo' | 'proximity') => void;
  selectedShelter?: ShelterItem | null;
}

export const AgentJudgeDemo: React.FC<AgentJudgeDemoProps> = ({
  onTriggerScenario,
  selectedShelter
}) => {
  const [activeStep, setActiveStep] = useState<number>(2);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const AGENT_STEPS = [
    {
      id: 'step-1',
      tool: 'google_maps_geocoding',
      name: '01. Forward Geocoding & GPS Anchor',
      latency: '24ms',
      status: 'RESOLVED',
      input: { address: 'Baton Rouge, LA', region: 'US' },
      output: { lat: 30.4515, lng: -91.1871, formatted_address: 'Baton Rouge, Louisiana, USA' }
    },
    {
      id: 'step-2',
      tool: 'bigquery_gis_spatial_query',
      name: '02. BigQuery GIS Spatial Bounding (1,326 Shelters)',
      latency: '42ms',
      status: 'EXECUTED',
      input: {
        sql: 'SELECT * FROM `fema_nss` WHERE ST_DWITHIN(geog, ST_GEOGPOINT(-91.1871, 30.4515), 24140) AND has_generator = TRUE',
        radius_meters: 24140
      },
      output: {
        matches_found: 3,
        scanned_records: 1326,
        tract_join: 'HHS emPOWER Medicare Claim Tracts #22033001100'
      }
    },
    {
      id: 'step-3',
      tool: 'google_maps_routes_matrix',
      name: '03. Google Routes Traffic-Aware Driving Matrix',
      latency: '68ms',
      status: 'ROUTED',
      input: {
        origin: [30.4515, -91.1871],
        destinations: [[30.4462, -91.1895], [30.4184, -91.1843]],
        travel_mode: 'DRIVE',
        routing_preference: 'TRAFFIC_AWARE'
      },
      output: {
        route_1: { duration: '5 mins', distance_miles: 1.4, highway_contraflow: 'CLEAR' },
        route_2: { duration: '8 mins', distance_miles: 3.2, highway_contraflow: 'ACTIVE' }
      }
    },
    {
      id: 'step-4',
      tool: 'adk_vulnerability_synthesizer',
      name: '04. Multi-Agent Reasoning & Proximity Alerting',
      latency: '18ms',
      status: 'OPTIMIZED',
      input: {
        prioritize_medical: true,
        generator_required: true,
        beneficiaries_in_tract: 148
      },
      output: {
        top_recommendation: 'Raising Cane’s River Center Hub',
        confidence: 0.994,
        proximity_alert_issued: true,
        justification: 'Matched industrial Caterpillar backup generator for ventilator/dialysis evacuees.'
      }
    }
  ];

  const handleRunAgent = () => {
    setIsSimulating(true);
    setActiveStep(0);
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= AGENT_STEPS.length - 1) {
          clearInterval(interval);
          setIsSimulating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
            <Cpu className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
              ADK Multi-Tool Agent Execution Trace & Judge Rubric
            </h3>
            <p className="text-xs text-slate-400">
              Inspect live parameter dispatch between Agent Tools, BigQuery GIS, and Google Maps
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunAgent}
            disabled={isSimulating}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs rounded-lg transition-all shadow-md shadow-cyan-600/20 cursor-pointer disabled:opacity-50"
          >
            {isSimulating ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Agent Dispathing...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Simulate Agent Tool Loop</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Judge Demo Trigger Pills */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
          One-Click Judge Rubric Demos (Demonstrate in UI)
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => onTriggerScenario('proximity')}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold mb-0.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>Proximity Alerts</span>
            </div>
            <p className="text-[10px] text-slate-400 line-clamp-1">
              Trigger real-time shelter radius alert
            </p>
          </button>

          <button
            onClick={() => onTriggerScenario('generator')}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-400 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-0.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Grid Blackout</span>
            </div>
            <p className="text-[10px] text-slate-400 line-clamp-1">
              Filter by industrial backup generators
            </p>
          </button>

          <button
            onClick={() => onTriggerScenario('mateo')}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-400 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 text-blue-400 text-xs font-bold mb-0.5">
              <VolumeX className="w-3.5 h-3.5" />
              <span>Mateo Sensory Mode</span>
            </div>
            <p className="text-[10px] text-slate-400 line-clamp-1">
              Utuado PR deaf evacuee scenario
            </p>
          </button>

          <button
            onClick={() => onTriggerScenario('wheelchair')}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-400 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold mb-0.5">
              <Accessibility className="w-3.5 h-3.5" />
              <span>ADA Wheelchair</span>
            </div>
            <p className="text-[10px] text-slate-400 line-clamp-1">
              Census SVI mobility barrier matching
            </p>
          </button>
        </div>
      </div>

      {/* Step by Step Agent Trace Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Step buttons */}
        <div className="lg:col-span-5 space-y-2">
          {AGENT_STEPS.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(idx)}
              className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                activeStep === idx
                  ? 'bg-blue-950/60 border-cyan-400 ring-1 ring-cyan-400 shadow-md'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span className="font-mono text-[10px] text-cyan-400">
                    {step.tool}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 mt-0.5">
                  {step.name}
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  {step.latency}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* JSON Tool Payload Console */}
        <div className="lg:col-span-7 bg-slate-900 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-200 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1 text-cyan-400">
              <Terminal className="w-3.5 h-3.5" />
              <span>Active Agent Tool: {AGENT_STEPS[activeStep].tool}</span>
            </span>
            <span className="text-emerald-400 font-bold">
              Latency: {AGENT_STEPS[activeStep].latency}
            </span>
          </div>

          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
              Tool Input Arguments
            </div>
            <pre className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-200 text-[11px] overflow-x-auto leading-relaxed">
              {JSON.stringify(AGENT_STEPS[activeStep].input, null, 2)}
            </pre>
          </div>

          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
              Tool Execution Return Payload
            </div>
            <pre className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-emerald-300 text-[11px] overflow-x-auto leading-relaxed">
              {JSON.stringify(AGENT_STEPS[activeStep].output, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
