import React, { useState } from 'react';
import { CODE_LABS } from '../data/tutorData';
import { Code2, Play, CheckCircle2, AlertTriangle, Copy, Check, Terminal, ShieldAlert, ShieldCheck, Sparkles, Layers } from 'lucide-react';

export default function SecureCodeLab() {
  const [activeLabId, setActiveLabId] = useState('LAB-001');
  const [activeExampleIndex, setActiveExampleIndex] = useState(0);
  const [copiedVulnerable, setCopiedVulnerable] = useState(false);
  const [copiedFixed, setCopiedFixed] = useState(false);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  const currentLab = CODE_LABS.find(l => l.id === activeLabId) || CODE_LABS[0];
  const activeExample = (currentLab.examples && currentLab.examples[activeExampleIndex])
    ? currentLab.examples[activeExampleIndex]
    : currentLab;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'vulnerable') {
      setCopiedVulnerable(true);
      setTimeout(() => setCopiedVulnerable(false), 2000);
    } else {
      setCopiedFixed(true);
      setTimeout(() => setCopiedFixed(false), 2000);
    }
  };

  const handleRunSimulation = () => {
    setSimulationRunning(true);
    setSimulationResult(null);
    setTimeout(() => {
      setSimulationRunning(false);
      setSimulationResult({
        vulnerable: activeExample.simulatedVulnerableResult || currentLab.simulatedVulnerableResult,
        secure: activeExample.simulatedSecureResult || currentLab.simulatedSecureResult
      });
    }, 800);
  };

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-xs font-mono mb-2">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            Vulnerable vs Fixed Patterns · Defensive Code Review
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Secure Code Lab</h1>
          <p className="text-xs md:text-sm text-slate-400">
            Compare insecure code anti-patterns with validated defensive mitigations across all 6 OWASP 2025 risks.
          </p>
        </div>

        {/* Lab selector dropdown on mobile, tabs on desktop */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none">
          {CODE_LABS.map(lab => (
            <button
              key={lab.id}
              onClick={() => {
                setActiveLabId(lab.id);
                setActiveExampleIndex(0);
                setSimulationResult(null);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                lab.id === currentLab.id
                  ? 'bg-slate-800 text-cyan-300 border-cyan-500/50 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              <span className="font-mono">{lab.owaspId.split(':')[0]}</span>
              <span className="hidden sm:inline"> · {lab.name.split('(')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lab Title Banner & Multi-Example Switcher */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
              {currentLab.owaspId}
            </span>
            <span className="text-xs font-mono text-slate-400 uppercase">
              Language: {currentLab.language}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 font-mono hidden md:inline">
              2 Interactive Code Examples
            </span>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-semibold w-fit">
            Status: Verified Fix
          </span>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            {activeExample.title || currentLab.name}
          </h2>
          {activeExample.subtitle && (
            <p className="text-xs font-mono text-cyan-300 mt-0.5">
              Focus: {activeExample.subtitle}
            </p>
          )}
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {activeExample.whyFixWorks || currentLab.whyFixWorks}
          </p>
        </div>

        {/* 2-Example Switcher Pills */}
        {currentLab.examples && currentLab.examples.length > 1 && (
          <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Hands-On Scenarios for {currentLab.owaspId.split(':')[0]}:
            </span>
            <div className="flex items-center gap-2">
              {currentLab.examples.map((ex, idx) => (
                <button
                  key={ex.id}
                  onClick={() => {
                    setActiveExampleIndex(idx);
                    setSimulationResult(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    activeExampleIndex === idx
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-950 text-slate-400 border-slate-850 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {ex.title.split(':')[0]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Code Comparison (Vulnerable vs Fixed) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vulnerable Code Panel */}
        <div className="rounded-2xl border border-rose-900/40 bg-slate-950 overflow-hidden flex flex-col justify-between shadow-xl">
          <div className="p-4 bg-rose-950/20 border-b border-rose-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              Insecure / Vulnerable Anti-Pattern
            </div>
            <button
              onClick={() => handleCopy(activeExample.vulnerableCode || currentLab.vulnerableCode, 'vulnerable')}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
            >
              {copiedVulnerable ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedVulnerable ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-rose-200 overflow-x-auto leading-relaxed bg-[#0a0709] flex-1">
            <code>{activeExample.vulnerableCode || currentLab.vulnerableCode}</code>
          </pre>
        </div>

        {/* Fixed Code Panel */}
        <div className="rounded-2xl border border-emerald-900/40 bg-slate-950 overflow-hidden flex flex-col justify-between shadow-xl">
          <div className="p-4 bg-emerald-950/20 border-b border-emerald-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Hardened / Verified Defensive Pattern
            </div>
            <button
              onClick={() => handleCopy(activeExample.fixedCode || currentLab.fixedCode, 'fixed')}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
            >
              {copiedFixed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedFixed ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-emerald-200 overflow-x-auto leading-relaxed bg-[#070b09] flex-1">
            <code>{activeExample.fixedCode || currentLab.fixedCode}</code>
          </pre>
        </div>
      </div>

      {/* Interactive Defensive Test Case Simulator */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Terminal className="w-4 h-4 text-cyan-400" />
              Interactive Defensive Simulation Runner
            </div>
            <h3 className="text-lg font-bold text-white mt-1">Simulate Attack / Defensive Test Case</h3>
            <p className="text-xs text-slate-400">
              Execute a simulated attack payload against both the vulnerable and hardened implementations.
            </p>
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={simulationRunning}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 active:scale-95 disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${simulationRunning ? 'animate-spin' : ''}`} />
            {simulationRunning ? 'Executing Simulation...' : 'Run Simulation Test'}
          </button>
        </div>

        {/* Test Payload Preview */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Simulated Test Input:</span>
          <div>{JSON.stringify(activeExample.testPayload || currentLab.testPayload, null, 2)}</div>
        </div>

        {/* Simulation Output Comparison */}
        {simulationResult && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300 pt-2">
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 space-y-2">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wide flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Vulnerable Code Behavior
              </span>
              <p className="text-xs font-mono text-rose-200 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-rose-900/40">
                {simulationResult.vulnerable}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Hardened Code Behavior
              </span>
              <p className="text-xs font-mono text-emerald-200 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-emerald-900/40">
                {simulationResult.secure}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
