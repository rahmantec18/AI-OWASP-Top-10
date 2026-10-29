import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Database,
  Lock,
  Terminal,
  FileSpreadsheet,
  Cpu,
  ChevronRight,
  Globe,
  Laptop,
  ExternalLink,
  Copy,
  Check,
  GitBranch
} from 'lucide-react';
import { CATEGORIES } from '../data/tutorData';

export default function Dashboard({ setActiveTab, setSelectedCategory }) {
  const [copiedLink, setCopiedLink] = useState(null);

  const handleCopy = (text, type) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(null), 2000);
  };
  const metrics = [
    { label: "OWASP Categories", value: "6 Core", detail: "Top 10:2025 Release", icon: ShieldCheck, color: "text-cyan-400", border: "border-cyan-500/30" },
    { label: "Empirical Test Runs", value: "36 Runs", detail: "3 AI Tools × 2 Strategies", icon: Cpu, color: "text-indigo-400", border: "border-indigo-500/30" },
    { label: "Strategy B Accuracy", value: "96.8%", detail: "+24.3% vs Strategy A (72.5%)", icon: CheckCircle, color: "text-emerald-400", border: "border-emerald-500/30" },
    { label: "Verified Quiz Bank", value: "15 Qs", detail: "100% Traceable Evidence", icon: Sparkles, color: "text-amber-400", border: "border-amber-500/30" }
  ];

  return (
    <div className="space-y-10 py-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-[#0c1322] border border-slate-800 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Official OWASP Top 10:2025 Evaluation Framework
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Don't just trust AI. <br className="hidden md:block"/>
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Verify it.
            </span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            <strong className="text-white">Research Question: </strong>
            How accurately can AI explain common web application risks, and how can its explanations be verified against official OWASP material?
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('library')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 active:scale-95"
            >
              Explore OWASP Library
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold text-sm transition-all active:scale-95"
            >
              Compare AI Engines
            </button>
            <button
              onClick={() => setActiveTab('downloads')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-700/50 text-emerald-300 font-semibold text-sm transition-all active:scale-95"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              Download Excel & Slides
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className={`p-5 rounded-2xl bg-slate-900/60 border ${m.border} backdrop-blur-sm space-y-2`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{m.label}</span>
                <Icon className={`w-5 h-5 ${m.color}`} />
              </div>
              <div className="text-2xl md:text-3xl font-extrabold text-white">{m.value}</div>
              <div className="text-xs text-slate-400 font-mono">{m.detail}</div>
            </div>
          );
        })}
      </div>

      {/* Interlinked Environments & Deployment Hub Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0a1224] to-slate-900 border border-cyan-800/40 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/80">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Connected Environments & Deployment Hub
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-semibold">
                  Live Synced
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                This project is simultaneously available on the live web via GitHub Pages and locally on port 5173.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-800/60 w-fit">
            origin/main
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Card 1: Live Deployment */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>Live Production (GitHub Pages)</span>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                24/7 Live
              </span>
            </div>
            <div className="font-mono text-xs text-cyan-300 bg-slate-900 p-2 rounded-lg border border-slate-800 truncate select-all">
              https://rahmantec18.github.io/AI-OWASP-Top-10/
            </div>
            <p className="text-[11px] text-slate-400">
              Zero-setup live website for evaluators, mobile phones, and tablets.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://rahmantec18.github.io/AI-OWASP-Top-10/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-colors"
              >
                <span>Open Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => handleCopy('https://rahmantec18.github.io/AI-OWASP-Top-10/', 'dash-live')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
              >
                {copiedLink === 'dash-live' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Card 2: Localhost Server */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Laptop className="w-4 h-4 text-cyan-400" />
                <span>Localhost Server (Dev & Tests)</span>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                Port 5173
              </span>
            </div>
            <div className="font-mono text-xs text-cyan-300 bg-slate-900 p-2 rounded-lg border border-slate-800 truncate select-all">
              http://localhost:5173/
            </div>
            <p className="text-[11px] text-slate-400">
              Local Vite development server with Playwright automated verification test suite.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="http://localhost:5173/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
              >
                <span>Open Localhost</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => handleCopy('http://localhost:5173/', 'dash-local')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
              >
                {copiedLink === 'dash-local' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Diagram Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white">How the AI OWASP Tutor Works</h2>
            <p className="text-xs md:text-sm text-slate-400">Closed-loop pipeline ensuring verifiable cybersecurity knowledge transfer.</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950 text-cyan-400 border border-cyan-800/80 w-fit">
            System Workflow
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">1</div>
            <h3 className="font-semibold text-white text-sm">1. Official Source Register</h3>
            <p className="text-xs text-slate-400">Pulls exact definitions, risks, and mitigations from official OWASP Top 10:2025.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm">2</div>
            <h3 className="font-semibold text-white text-sm">2. Multi-Engine Generation</h3>
            <p className="text-xs text-slate-400">Generates beginner and advanced lessons across ChatGPT, Gemini, and Claude.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">3</div>
            <h3 className="font-semibold text-white text-sm">3. Verification Audit</h3>
            <p className="text-xs text-slate-400">Parses factual claims into a verification matrix, catching hallucinations & outdated info.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/60 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">4</div>
            <h3 className="font-semibold text-white text-sm">4. Defensive Code Lab</h3>
            <p className="text-xs text-slate-400">Pairs vulnerable code with verified fixes and reproducible defensive test cases.</p>
          </div>
        </div>
      </div>

      {/* Six OWASP Categories Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Six Selected OWASP Top 10:2025 Categories</h2>
            <p className="text-sm text-slate-400">Click any category to open its full beginner & advanced lessons</p>
          </div>
          <button
            onClick={() => setActiveTab('library')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            View Full Library <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setActiveTab('library');
              }}
              className="group cursor-pointer rounded-2xl bg-slate-900/70 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 p-6 transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-slate-800 text-cyan-400 font-bold border border-slate-700">
                    {cat.id}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {cat.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {cat.beginner.concept}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-cyan-400">
                <span>Explore Lessons & Fixes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
