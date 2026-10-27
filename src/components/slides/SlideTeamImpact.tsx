import React from 'react';
import { Users, Award, ShieldCheck, Heart, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TEAM_MEMBERS } from '../../data/mockData';

export const SlideTeamImpact: React.FC = () => {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between p-8 md:p-12 lg:p-14 overflow-hidden bg-slate-950 text-white select-none">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            Hackathon Final Submission
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mt-1">
            Impact, The Team & Future Scaling
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={triggerConfetti}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs rounded-lg transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Celebrate Build</span>
          </button>
          <div className="text-xs text-slate-400 font-mono">
            Slide 06 · Summary & Team
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="my-auto py-3 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: The Team Behind It */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              The Build Team
            </h3>
            <span className="text-xs text-blue-400 font-mono">Hackathon 2026</span>
          </div>

          <div className="space-y-3 my-auto">
            {TEAM_MEMBERS.map((member, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">
                    {member.name}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    Team Role 0{i + 1}
                  </span>
                </div>
                <div className="text-[11px] text-blue-300 font-medium mt-0.5">
                  {member.role}
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  {member.focus}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1 text-rose-400">
              <Heart className="w-3 h-3 fill-rose-400" />
              Built for Community Safety
            </span>
            <span className="font-mono text-slate-400">100% Open Data Grounded</span>
          </div>
        </div>

        {/* Right: Key Hackathon Takeaways & Roadmap */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Hackathon Judge Takeaways
            </h3>
            <span className="text-xs text-emerald-400 font-mono">Ready for Deployment</span>
          </div>

          <div className="space-y-2.5 my-auto">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-xs font-bold text-slate-200 flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Zero-Hallucination Mission Critical Safety
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                By strictly binding the ADK Agent to BigQuery GIS spatial predicates and 7 public federal agency datasets, evacuees receive verified shelter statuses rather than probabilistic LLM guesses.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-xs font-bold text-slate-200 flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Sub-Second Serverless Architecture
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cloud Run + BigQuery scale to thousands of simultaneous citizens fleeing natural disasters at near-zero idle cost when conditions are calm.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-xs font-bold text-slate-200 flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                Targeted Medical Vulnerability Routing
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                First evacuation platform to join HHS emPOWER Medicare life-support claims data with real-time generator capability matching during regional blackouts.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-between text-xs text-blue-200">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Next Step: Live Webhook Integration with State Emergency Operations Centers</span>
            </div>
            <span className="font-mono text-cyan-300 font-semibold">Q1 2027</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <span>Thank you! We welcome questions from the judging panel.</span>
        <span className="font-mono text-slate-400">Emergency Shelter Finder · Powered by Google Cloud</span>
      </div>
    </div>
  );
};
