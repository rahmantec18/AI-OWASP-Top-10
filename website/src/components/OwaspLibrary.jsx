import React, { useState } from 'react';
import { CATEGORIES } from '../data/tutorData';
import { ExternalLink, ShieldCheck, Sparkles, AlertCircle, CheckCircle2, ArrowRight, BookOpen, Layers } from 'lucide-react';

export default function OwaspLibrary({ selectedCategory, setSelectedCategory, setActiveTab }) {
  const [level, setLevel] = useState('beginner'); // 'beginner' | 'advanced'

  const currentCategory = CATEGORIES.find(c => c.id === selectedCategory) || CATEGORIES[0];

  return (
    <div className="space-y-8 py-6">
      {/* Category Pills Header */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">OWASP Knowledge Library</h1>
            <p className="text-xs md:text-sm text-slate-400">Official OWASP Top 10:2025 standards paired with dual-tier AI explanations.</p>
          </div>
          {/* Level Toggle Button */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 w-fit">
            <button
              onClick={() => setLevel('beginner')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                level === 'beginner'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Beginner View
            </button>
            <button
              onClick={() => setLevel('advanced')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                level === 'advanced'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Advanced View
            </button>
          </div>
        </div>

        {/* Horizontal Category selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 border ${
                cat.id === currentCategory.id
                  ? 'bg-slate-800 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border-slate-800'
              }`}
            >
              <span className="font-mono">{cat.id}</span>
              <span className="hidden sm:inline">· {cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Category Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Official OWASP Summary & Metadata */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800/80">
                {currentCategory.id}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                {currentCategory.badge}
              </span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">{currentCategory.name}</h2>
              <p className="text-xs text-slate-400 font-mono mt-1">Source ID: {currentCategory.sourceId}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Official OWASP 2025 Definition</span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60 font-sans">
                {currentCategory.officialSummary}
              </p>
            </div>

            {level === 'advanced' && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Related CWEs</span>
                <div className="flex flex-wrap gap-1.5">
                  {currentCategory.advanced.cweReferences.map((cwe, i) => (
                    <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {cwe}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800">
            <a
              href={currentCategory.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-xs font-semibold text-cyan-300 border border-slate-700 transition-all"
            >
              <span>View Official OWASP 2025 Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab('codelab')}
                className="px-3 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-800/60 text-xs font-semibold text-center transition-all"
              >
                Code Review Lab
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold text-center transition-all"
              >
                AI Comparison
              </button>
            </div>
          </div>
        </div>

        {/* Right 2 Columns: Explanation Detail (Beginner or Advanced) */}
        <div className="lg:col-span-2 p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${level === 'beginner' ? 'bg-cyan-400' : 'bg-indigo-400'}`} />
              <h3 className="font-bold text-white text-lg">
                {level === 'beginner' ? 'Beginner Conceptual Lesson' : 'Advanced Architectural Analysis'}
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Verified against {currentCategory.id}
            </span>
          </div>

          {level === 'beginner' ? (
            <div className="space-y-6">
              {/* Concept Section */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">How to understand this risk in plain English</span>
                <p className="text-sm md:text-base text-slate-200 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                  {currentCategory.beginner.concept}
                </p>
              </div>

              {/* Analogy Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-blue-950/30 border border-cyan-800/50 space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Real-World Mental Analogy
                </div>
                <p className="text-xs md:text-sm text-slate-200 italic">
                  "{currentCategory.beginner.analogy}"
                </p>
              </div>

              {/* Key Takeaway */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Core Defensive Takeaway</span>
                <p className="text-xs md:text-sm text-white font-medium">
                  {currentCategory.beginner.keyTakeaway}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Technical Mechanism */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Underlying Technical Mechanism</span>
                <p className="text-sm md:text-base text-slate-200 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800">
                  {currentCategory.advanced.mechanism}
                </p>
              </div>

              {/* Attack Vector Scenario */}
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40 space-y-2">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-bold uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-rose-400" />
                  Real Attack Vector Simulation
                </div>
                <p className="text-xs md:text-sm text-slate-200 font-mono">
                  {currentCategory.advanced.attackVector}
                </p>
              </div>

              {/* Mitigation Checklist */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block">Recommended OWASP 2025 Mitigations</span>
                <div className="space-y-2">
                  {currentCategory.advanced.mitigations.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300 bg-slate-800/40 p-3 rounded-lg border border-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
