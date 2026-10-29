import React, { useState } from 'react';
import { Download, FileSpreadsheet, Presentation, FileText, Terminal, CheckCircle2, Play, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/tutorData';

export default function AutomationDownloads() {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const deliverables = [
    {
      name: "CAPSTONE9_OWASP_AI_Verification.xlsx",
      desc: "Consolidated Master Workbook with all 9 sheets, COUNTIFS formulas, and auto-filters.",
      type: "Master Excel",
      size: "32 KB",
      href: "./CAPSTONE9_OWASP_AI_Verification.xlsx",
      icon: FileSpreadsheet,
      color: "text-emerald-400"
    },
    {
      name: "01_Source_Register.xlsx",
      desc: "Official OWASP Top 10:2025 Source Register with URLs, dates, and summaries.",
      type: "Excel Sheet",
      size: "7 KB",
      href: "./01_Source_Register.xlsx",
      icon: FileSpreadsheet,
      color: "text-cyan-400"
    },
    {
      name: "02_AI_Evaluation.xlsx",
      desc: "Tool Comparison scoring across 3 models and Error Log tracking.",
      type: "Excel Sheet",
      size: "8 KB",
      href: "./02_AI_Evaluation.xlsx",
      icon: FileSpreadsheet,
      color: "text-cyan-400"
    },
    {
      name: "05_Quiz_and_Answer_Key.xlsx",
      desc: "15 verified questions, multiple options, correct answer key, and evidence links.",
      type: "Excel Sheet",
      size: "9 KB",
      href: "./05_Quiz_and_Answer_Key.xlsx",
      icon: FileSpreadsheet,
      color: "text-cyan-400"
    },
    {
      name: "06_Presentation.pptx",
      desc: "Complete 7-slide presentation formatted for evaluator defense and live demo.",
      type: "PowerPoint",
      size: "39 KB",
      href: "./06_Presentation.pptx",
      icon: Presentation,
      color: "text-amber-400"
    },
    {
      name: "07_Prompt_Library.md",
      desc: "Full prompt library documenting Strategy A & Strategy B templates for all categories.",
      type: "Markdown",
      size: "7 KB",
      href: "./07_Prompt_Library.md",
      icon: FileText,
      color: "text-indigo-400"
    },
    {
      name: "09_Before_After_Analysis.md",
      desc: "Quantitative before/after study evaluating accuracy and grounding improvements.",
      type: "Markdown",
      size: "4 KB",
      href: "./09_Before_After_Analysis.md",
      icon: FileText,
      color: "text-indigo-400"
    },
    {
      name: "10_Ethics_and_Methodology.md",
      desc: "Defensive ethics statement, controlled lab boundaries, and research design.",
      type: "Markdown",
      size: "4 KB",
      href: "./10_Ethics_and_Methodology.md",
      icon: FileText,
      color: "text-indigo-400"
    },
    {
      name: "03_Verification_Report.md",
      desc: "Comprehensive evidence audit cross-referencing AI statements with OWASP 2025.",
      type: "Markdown",
      size: "6 KB",
      href: "./03_Verification_Report.md",
      icon: FileText,
      color: "text-indigo-400"
    },
    {
      name: "04_Study_Guide.md",
      desc: "Complete student study guide with Mermaid diagrams and deep-dive risk taxonomy.",
      type: "Markdown",
      size: "7 KB",
      href: "./04_Study_Guide.md",
      icon: FileText,
      color: "text-indigo-400"
    }
  ];

  // Function to download live CSV from memory
  const handleExportCsv = () => {
    const headers = ["Question_ID", "OWASP_ID", "Question", "Option_A", "Option_B", "Option_C", "Option_D", "Correct_Answer", "Explanation", "Evidence_URL"];
    const rows = QUIZ_QUESTIONS.map(q => [
      q.id,
      q.owasp,
      `"${q.question.replace(/"/g, '""')}"`,
      `"${q.options[0].replace(/"/g, '""')}"`,
      `"${q.options[1].replace(/"/g, '""')}"`,
      `"${q.options[2].replace(/"/g, '""')}"`,
      `"${q.options[3].replace(/"/g, '""')}"`,
      String.fromCharCode(65 + q.answer),
      `"${q.explanation.replace(/"/g, '""')}"`,
      q.evidenceUrl
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'OWASP_Quiz_Live_Export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-10 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-xs font-mono mb-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            Automation Hub · Deliverables Repository
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Automation & Research Artifacts</h1>
          <p className="text-xs md:text-sm text-slate-400">
            Download all verified Excel workbooks, slide decks, research reports, and Python automation tools.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 active:scale-95 w-full sm:w-auto"
        >
          <Sparkles className="w-4 h-4" />
          {downloadSuccess ? 'Downloaded CSV!' : 'Instant Live Quiz Export (.csv)'}
        </button>
      </div>

      {/* Step 10 Requirement Spotlight: Python Automation */}
      <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Requirement 10: Automation Step</span>
            <h2 className="text-lg font-bold text-white mt-1">Python Automated Workbook Generator (`export_quiz_to_excel.py`)</h2>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
            Automated Pipeline Verified
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          As required by step 10 of the Capstone project plan, an automated Python CLI tool was developed using <code className="text-cyan-300 bg-slate-950 px-1 py-0.5 rounded">openpyxl</code> to compile, style, auto-fit, and export verified quiz questions directly into formatted spreadsheet workbooks with exact column mapping.
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto max-w-full">
          <span className="text-[10px] text-slate-500 uppercase font-bold block">Run standalone from terminal:</span>
          <div className="text-emerald-400 break-all select-all font-semibold">python 08_Automation/export_quiz_to_excel.py Automated_Quiz_Export.xlsx</div>
          <div className="text-slate-500 text-[11px] pt-1">Output: Generates styled Excel workbook with headers, auto-fit column widths, and verified answers.</div>
        </div>
      </div>

      {/* All Deliverables Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Final Submission Artifacts</h2>
        <p className="text-xs text-slate-400">Directly download any deliverable file generated for CAPSTONE 9</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {deliverables.map((d, i) => {
            const Icon = d.icon;
            return (
              <a
                key={i}
                href={d.href}
                download
                className="group p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/50 transition-all flex items-start justify-between gap-4 shadow-lg hover:shadow-cyan-500/10"
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 group-hover:scale-105 transition-transform">
                    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${d.color}`} />
                  </div>
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="font-bold text-white text-xs sm:text-sm group-hover:text-cyan-300 transition-colors break-all">
                        {d.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                        {d.size}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{d.desc}</p>
                    <span className="text-[10px] font-semibold text-cyan-400 font-mono block pt-1">
                      {d.type}
                    </span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-cyan-300 group-hover:bg-cyan-950/60 transition-colors shrink-0">
                  <Download className="w-4 h-4" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
