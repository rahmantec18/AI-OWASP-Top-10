import React, { useState } from 'react';
import { AI_COMPARISONS } from '../data/tutorData';
import { GitCompare, Sparkles, AlertTriangle, CheckCircle, Terminal, HelpCircle, ArrowRight } from 'lucide-react';

export default function AiComparisonLab({ setActiveTab }) {
  const [selectedCat, setSelectedCat] = useState('A01:2025');
  const [strategy, setStrategy] = useState('A-Basic'); // 'A-Basic' | 'B-Evidence'
  const [showPromptModal, setShowPromptModal] = useState(false);

  const availableData = AI_COMPARISONS[selectedCat] || AI_COMPARISONS['A01:2025'];
  const currentExperiment = availableData[strategy];

  return (
    <div className="space-y-8 py-6">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-xs font-mono mb-2">
            <GitCompare className="w-3.5 h-3.5 text-cyan-400" />
            3 Frontier Models · 36 Test Runs
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">AI Engine Comparison Lab</h1>
          <p className="text-xs md:text-sm text-slate-400">
            Compare ChatGPT, Gemini, and Claude outputs under unconstrained vs evidence-anchored prompts.
          </p>
        </div>

        {/* Strategy Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setStrategy('A-Basic')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                strategy === 'A-Basic'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Strategy A: Basic Prompt
            </button>
            <button
              onClick={() => setStrategy('B-Evidence')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                strategy === 'B-Evidence'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Strategy B: Evidence-Constrained
            </button>
          </div>

          {/* Category Toggle */}
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-500"
          >
            <option value="A01:2025">A01:2025 Broken Access Control</option>
            <option value="A04:2025">A04:2025 Cryptographic Failures</option>
          </select>
        </div>
      </div>

      {/* Strategy Banner / Prompt Preview */}
      <div className={`p-5 rounded-2xl border ${
        strategy === 'A-Basic'
          ? 'bg-rose-950/20 border-rose-800/40'
          : 'bg-emerald-950/20 border-emerald-800/40'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${strategy === 'A-Basic' ? 'bg-rose-400 animate-pulse' : 'bg-emerald-400'}`} />
              <h3 className="font-bold text-white text-sm md:text-base">
                {strategy === 'A-Basic'
                  ? 'Strategy A: Conversational Unconstrained Prompt'
                  : 'Strategy B: Evidence-Constrained Grounding'}
              </h3>
            </div>
            <p className="text-xs text-slate-300 font-mono line-clamp-1">
              Prompt executed: "{currentExperiment.prompt}"
            </p>
          </div>

          <button
            onClick={() => setShowPromptModal(!showPromptModal)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 whitespace-nowrap self-start md:self-auto"
          >
            {showPromptModal ? 'Hide Full Prompt' : 'View Full Prompt'}
          </button>
        </div>

        {showPromptModal && (
          <div className="mt-4 pt-4 border-t border-slate-800/60 font-mono text-xs text-slate-300 bg-slate-950/70 p-4 rounded-xl whitespace-pre-wrap leading-relaxed">
            {currentExperiment.prompt}
          </div>
        )}
      </div>

      {/* 3 Model Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(currentExperiment.tools).map(([toolName, data]) => {
          const isHighAccuracy = parseInt(data.accuracyScore) >= 90;

          return (
            <div
              key={toolName}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-slate-800 space-y-3 bg-slate-950/40">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">{toolName}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                    data.rating.startsWith('A')
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : data.rating.startsWith('B')
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}>
                    Grade: {data.rating}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Accuracy</span>
                    <span className={`font-bold font-mono text-base ${isHighAccuracy ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {data.accuracyScore}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Source Grounding</span>
                    <span className="font-bold font-mono text-base text-cyan-400">
                      {data.groundingScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 text-xs flex-1">
                {/* Findings summary */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Evaluation Findings</span>
                  <p className="text-slate-300 leading-relaxed">{data.summary}</p>
                </div>

                {/* Hallucinations / Unsupported Claims */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Detected Hallucinations / Flaws
                  </span>
                  <div className="space-y-1">
                    {data.hallucinations.map((h, i) => (
                      <div key={i} className="p-2 rounded bg-rose-950/20 border border-rose-800/40 text-rose-200 font-mono text-[11px]">
                        • {h}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Excerpt */}
                <div className="space-y-1 pt-2 border-t border-slate-800/60">
                  <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Beginner Excerpt</span>
                  <p className="text-slate-300 italic bg-slate-950/50 p-2.5 rounded-lg border border-slate-800">
                    "{data.beginnerExcerpt}"
                  </p>
                </div>

                {/* Code Advice Warning */}
                <div className="space-y-1 pt-2 border-t border-slate-800/60">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    Code Advice Audit
                  </span>
                  <p className={`p-2.5 rounded-lg font-mono text-[11px] leading-relaxed ${
                    data.codeTip.includes('CRITICAL') || data.codeTip.includes('Insecure')
                      ? 'bg-rose-950/30 text-rose-300 border border-rose-800/60'
                      : 'bg-emerald-950/30 text-emerald-300 border border-emerald-800/60'
                  }`}>
                    {data.codeTip}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-4 bg-slate-950/40 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setActiveTab('verification')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  Inspect in Verification Center <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
