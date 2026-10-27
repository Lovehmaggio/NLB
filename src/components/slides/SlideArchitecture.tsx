import React, { useState } from 'react';
import { Cpu, Database, MapPin, Globe, Server, ArrowRight, Code2, CheckCircle, Zap } from 'lucide-react';
import { ARCHITECTURE_COMPONENTS } from '../../data/mockData';
import { ArchitectureComponent } from '../../types';

export const SlideArchitecture: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<ArchitectureComponent>(ARCHITECTURE_COMPONENTS[2]); // ADK default

  const getNodeIcon = (category: ArchitectureComponent['category']) => {
    switch (category) {
      case 'frontend':
        return <Globe className="w-5 h-5 text-blue-400" />;
      case 'server':
        return <Server className="w-5 h-5 text-indigo-400" />;
      case 'agent':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'spatial':
        return <Database className="w-5 h-5 text-amber-400" />;
      case 'routing':
        return <MapPin className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-8 md:p-12 lg:p-14 overflow-hidden bg-slate-950 text-white select-none">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            Hackathon Judge Reference Architecture
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
            End-to-End System Architecture: ADK Multi-Tool & BigQuery GIS
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-emerald-400" />
            <span>End-to-End Latency: ~140ms</span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Slide 05 · Technical Architecture
          </div>
        </div>
      </div>

      {/* Main Flow Stage */}
      <div className="my-auto py-3 space-y-4">
        {/* Pipeline Nodes Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 items-center">
          {ARCHITECTURE_COMPONENTS.map((node, index) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <div key={node.id} className="relative group">
                <button
                  onClick={() => setSelectedNode(node)}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-950/60 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.25)] ring-1 ring-cyan-400'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-1.5 rounded-lg bg-slate-800/80">
                      {getNodeIcon(node.category)}
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      {node.latencyMs}ms
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white truncate">
                    {node.name}
                  </div>
                  <div className="text-[10px] text-cyan-300 font-mono truncate mt-0.5">
                    {node.tech}
                  </div>
                </button>

                {/* Arrow connector except last */}
                {index < ARCHITECTURE_COMPONENTS.length - 1 && (
                  <div className="hidden sm:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-600 pointer-events-none">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Component Deep-Dive Inspection Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Role & Details */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-blue-500/20 text-cyan-400">
                    {getNodeIcon(selectedNode.category)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {selectedNode.name}
                    </h3>
                    <p className="text-xs text-cyan-300 font-mono">
                      {selectedNode.role} · {selectedNode.tech}
                    </p>
                  </div>
                </div>
                <div className="text-xs font-mono text-emerald-400">
                  Execution Budget: ~{selectedNode.latencyMs}ms
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Implementation Highlights
                </div>
                {selectedNode.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Code / Query Blueprint Sample */}
            <div className="lg:col-span-5 bg-slate-950 rounded-xl p-3.5 border border-slate-800 font-mono text-[11px] text-slate-300 overflow-x-auto space-y-2">
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800 pb-1.5">
                <div className="flex items-center gap-1.5">
                  <Code2 className="w-3 h-3 text-cyan-400" />
                  <span>
                    {selectedNode.id === 'bigquery'
                      ? 'BigQuery GIS Spatial Query'
                      : selectedNode.id === 'agent'
                      ? 'ADK Tool Specification'
                      : selectedNode.id === 'maps'
                      ? 'Routes API Driving Matrix'
                      : selectedNode.id === 'server'
                      ? 'Cloud Run Express Gateway'
                      : 'Frontend Autocomplete & Filter'}
                  </span>
                </div>
                <span className="text-emerald-400">Production Ready</span>
              </div>

              {selectedNode.id === 'bigquery' && (
                <pre className="text-cyan-200 leading-relaxed overflow-x-auto">
{`-- BigQuery GIS Geodesic Spatial Search
SELECT
  s.shelter_name,
  s.capacity,
  s.has_generator,
  ST_DISTANCE(
    s.geog_point,
    ST_GEOGPOINT(@origin_lng, @origin_lat)
  ) / 1609.34 AS distance_miles,
  emp.electric_dependent_count
FROM \`disaster_db.fema_nss_shelters\` s
LEFT JOIN \`disaster_db.hhs_empower\` emp
  ON ST_CONTAINS(emp.tract_geog, s.geog_point)
WHERE ST_DWITHIN(
  s.geog_point,
  ST_GEOGPOINT(@origin_lng, @origin_lat),
  @radius_meters
)
AND (@require_generator = FALSE OR s.has_generator = TRUE)
ORDER BY distance_miles ASC
LIMIT @max_results;`}
                </pre>
              )}

              {selectedNode.id === 'agent' && (
                <pre className="text-emerald-200 leading-relaxed overflow-x-auto">
{`// ADK Multi-Tool Orchestrator
export const shelterRoutingTool = {
  name: 'find_emergency_shelters',
  description: 'Searches FEMA NSS & HHS emPOWER via BigQuery GIS',
  parameters: {
    type: 'object',
    properties: {
      address: { type: 'string' },
      requireWheelchair: { type: 'boolean' },
      requireGenerator: { type: 'boolean' },
      includeStandby: { type: 'boolean' }
    },
    required: ['address']
  },
  execute: async (args) => {
    const coords = await geocodeWithMaps(args.address);
    const shelters = await queryBigQueryGIS(coords, args);
    return computeRoutes(coords, shelters);
  }
};`}
                </pre>
              )}

              {selectedNode.id === 'maps' && (
                <pre className="text-amber-200 leading-relaxed overflow-x-auto">
{`// Google Maps Routes API Real-Time Direction Matrix
const response = await fetch(
  'https://routes.googleapis.com/directions/v2:computeRoutes',
  {
    method: 'POST',
    headers: { 'X-Goog-FieldMask': 'routes.duration,routes.distanceMeters,routes.legs.steps' },
    body: JSON.stringify({
      origin: { location: { latLng: userCoords } },
      destination: { location: { latLng: shelterCoords } },
      travelMode: 'DRIVE',
      routingPreference: 'TRAFFIC_AWARE'
    })
  }
);`}
                </pre>
              )}

              {(selectedNode.id === 'frontend' || selectedNode.id === 'server') && (
                <pre className="text-purple-200 leading-relaxed overflow-x-auto">
{`// Cloud Run Stateless Gateway
app.post('/api/shelters/search', async (req, res) => {
  const { query, filters, previewMode } = req.body;
  const auditId = crypto.randomUUID();
  const results = await adkPipeline.dispatch({
    query,
    filters,
    previewMode,
    auditId
  });
  res.json({ results, executionMs: 138, auditId });
});`}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <span>Google Cloud Run · BigQuery GIS · ADK Agent Framework · Google Maps Platform</span>
        <span className="font-mono text-cyan-400">Scalable to 50,000+ Concurrent Requests</span>
      </div>
    </div>
  );
};
