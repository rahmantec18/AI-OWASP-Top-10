import React, { useState } from 'react';
import { PRESENTATION_SLIDES } from '../data/tutorData';
import { FileText, Presentation, ChevronLeft, ChevronRight, Download, ShieldCheck, Scale, CheckCircle2 } from 'lucide-react';

export default function ResearchReport() {
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const slide = PRESENTATION_SLIDES[currentSlideIdx];

  return (
    <div className="space-y-10 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-xs font-mono mb-2">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            Empirical Findings & Slide Presentation
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Research Report & Slides</h1>
          <p className="text-xs md:text-sm text-slate-400">
            Empirical evaluation results, before/after analysis, ethics boundaries, and 7-slide defense presentation.
          </p>
        </div>

        <a
          href="./06_Presentation.pptx"
          download="06_Presentation.pptx"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
        >
          <Download className="w-4 h-4" />
          Download PowerPoint (.pptx)
        </a>
      </div>

      {/* Interactive 7-Slide Deck Viewer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Presentation className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">Interactive 7-Slide Defense Presentation</h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Slide {currentSlideIdx + 1} of {PRESENTATION_SLIDES.length}</span>
          </div>
        </div>

        {/* Slide Stage */}
        <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-8 md:p-12 shadow-2xl min-h-[420px] flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Slide Header */}
          <div className="space-y-3 relative z-10 border-b border-slate-800 pb-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-2xl font-black text-cyan-400">
                Slide {slide.num}
              </span>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 text-slate-300">
                CAPSTONE 9 DEFENSE DECK
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              {slide.title}
            </h3>
            <p className="text-sm md:text-base text-emerald-400 font-medium">
              {slide.subtitle}
            </p>
          </div>

          {/* Slide Content Bullets */}
          <div className="py-6 space-y-4 relative z-10">
            {slide.bullets.map((bullet, i) => (
              <div key={i} className="flex items-start gap-3 text-sm md:text-base text-slate-200">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-2" />
                <span className="leading-relaxed">{bullet}</span>
              </div>
            ))}
          </div>

          {/* Slide Navigation Controls */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between relative z-10">
            <button
              disabled={currentSlideIdx === 0}
              onClick={() => setCurrentSlideIdx(prev => Math.max(prev - 1, 0))}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Previous Slide
            </button>

            {/* Thumbnail Pills */}
            <div className="hidden sm:flex items-center gap-1.5">
              {PRESENTATION_SLIDES.map((s, idx) => (
                <button
                  key={s.num}
                  onClick={() => setCurrentSlideIdx(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                    idx === currentSlideIdx
                      ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-400/50'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {s.num}
                </button>
              ))}
            </div>

            <button
              disabled={currentSlideIdx === PRESENTATION_SLIDES.length - 1}
              onClick={() => setCurrentSlideIdx(prev => Math.min(prev + 1, PRESENTATION_SLIDES.length - 1))}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold text-slate-200 transition-all"
            >
              Next Slide <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quantitative Before / After Comparison Table */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div>
          <h2 className="text-xl font-bold text-white">Quantitative Before/After Findings</h2>
          <p className="text-xs md:text-sm text-slate-400">
            Comparative performance across 36 empirical model runs under Strategy A vs Strategy B.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
          <table className="w-full text-left text-xs border-collapse font-sans">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono">
                <th className="p-3.5">Research Evaluation Measure</th>
                <th className="p-3.5">Strategy A: Basic Prompting</th>
                <th className="p-3.5">Strategy B: Evidence-Constrained</th>
                <th className="p-3.5">Delta / Improvement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              <tr>
                <td className="p-3.5 font-medium text-white">Evidence-Checkable Accuracy (Metric A)</td>
                <td className="p-3.5 font-mono text-amber-400">72.5%</td>
                <td className="p-3.5 font-mono text-emerald-400 font-bold">96.8%</td>
                <td className="p-3.5 font-mono text-cyan-400 font-bold">+24.3% Boost</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-white">Source-Grounding Rate (Metric B)</td>
                <td className="p-3.5 font-mono text-amber-400">61.1%</td>
                <td className="p-3.5 font-mono text-emerald-400 font-bold">94.4%</td>
                <td className="p-3.5 font-mono text-cyan-400 font-bold">+33.3% Boost</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-white">Severe Security Hallucinations Logged</td>
                <td className="p-3.5 font-mono text-rose-400 font-bold">7 Critical Flaws</td>
                <td className="p-3.5 font-mono text-emerald-400 font-bold">0 Flaws</td>
                <td className="p-3.5 font-mono text-emerald-400 font-bold">-100% Elimination</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-white">Outdated Release Citations (2021 vs 2025)</td>
                <td className="p-3.5 font-mono text-rose-400 font-bold">14 Instances</td>
                <td className="p-3.5 font-mono text-emerald-400 font-bold">0 Instances</td>
                <td className="p-3.5 font-mono text-emerald-400 font-bold">-100% Elimination</td>
              </tr>
              <tr>
                <td className="p-3.5 font-medium text-white">Source Citation Traceability (0-2 Scale)</td>
                <td className="p-3.5 font-mono text-slate-400">0.88 / 2.0</td>
                <td className="p-3.5 font-mono text-cyan-400 font-bold">1.96 / 2.0</td>
                <td className="p-3.5 font-mono text-cyan-400 font-bold">+1.08 Score</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Ethics & Defensive Principles */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-cyan-950/20 to-blue-950/20 border border-cyan-800/40 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider">
          <Scale className="w-5 h-5 text-cyan-400" />
          Ethics & Responsible Research Statement
        </div>
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
          This project adheres strictly to defensive cybersecurity education guidelines. All demonstrations utilize synthetic test fixtures, local mock servers, and isolated database schemas. No live exploit payloads, automated credential stuffers, or denial-of-service tools were deployed against real-world educational or corporate systems. The core objective is to educate developers on verifiable software hardening and highlight why AI output must undergo rigorous source verification.
        </p>
      </div>
    </div>
  );
}
