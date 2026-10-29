import React, { useState } from 'react';
import {
  Shield,
  BookOpen,
  GitCompare,
  CheckCircle2,
  Code2,
  HelpCircle,
  FileText,
  Download,
  Menu,
  X,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Shield,
      tag: 'Overview',
      desc: 'Executive summary, empirical metrics & system status'
    },
    {
      id: 'library',
      label: 'OWASP Library',
      icon: BookOpen,
      tag: 'Top 10:2025',
      desc: '6 verified categories, dual-tier lessons & 18 real-world breach scenarios'
    },
    {
      id: 'comparison',
      label: 'AI Comparison Lab',
      icon: GitCompare,
      tag: 'Benchmarking',
      desc: 'Side-by-side ChatGPT, Gemini & Claude accuracy evaluation'
    },
    {
      id: 'verification',
      label: 'Verification Center',
      icon: CheckCircle2,
      tag: 'Audit Logs',
      desc: 'Full audit claims ledger, hallucination flags & evidence links'
    },
    {
      id: 'codelab',
      label: 'Secure Code Lab',
      icon: Code2,
      tag: '12 Scenarios',
      desc: 'Hands-on vulnerable vs hardened code reviews with live attack simulator'
    },
    {
      id: 'quiz',
      label: 'Quiz & Glossary',
      icon: HelpCircle,
      tag: 'Evaluation',
      desc: '3 sets of 15 questions with option jumbling & everyday term examples'
    },
    {
      id: 'report',
      label: 'Research & Slides',
      icon: FileText,
      tag: 'Defense Deck',
      desc: 'Interactive 7-slide academic defense presentation & methodology report'
    },
    {
      id: 'downloads',
      label: 'Automation & Downloads',
      icon: Download,
      tag: 'Deliverables',
      desc: 'Download verification Excel workbooks, slide deck & live CSV exports'
    },
  ];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const activeItem = navItems.find(item => item.id === activeTab) || navItems[0];
  const ActiveIcon = activeItem.icon;

  return (
    <header className="sticky top-0 z-50 bg-[#070b14]/90 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div className="max-w-[1536px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Brand Identity */}
          <div
            className="flex items-center gap-3 cursor-pointer shrink-0 group select-none"
            onClick={() => handleSelectTab('dashboard')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/40 group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-5 h-5 text-white" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent">
                  OWASP AI TUTOR
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 rounded-full shrink-0">
                  Top 10:2025
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  96.8% Verified
                </span>
                <span className="text-slate-600 hidden sm:inline">·</span>
                <span className="hidden sm:inline text-slate-400">CAPSTONE 9</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Ribbon (Visible on xl and larger screens) */}
          <nav className="hidden xl:flex items-center gap-1 p-1 rounded-xl bg-slate-900/60 border border-slate-800/80 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap relative ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-500/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/70 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 transition-transform ${isActive ? 'text-cyan-400 scale-110' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Compact / Mobile Actions */}
          <div className="flex items-center gap-2">
            {/* Quick module indicator on medium screens */}
            <div className="hidden md:flex xl:hidden items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
              <ActiveIcon className="w-4 h-4 text-cyan-400" />
              <span className="text-white font-semibold">{activeItem.label}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 font-mono">Active</span>
            </div>

            {/* Mobile/Tablet Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors text-xs font-semibold"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-4 h-4 text-rose-400" />
                  <span>Close</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 text-cyan-400" />
                  <span className="hidden sm:inline">Modules (8)</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Medium screens horizontal quick scroll bar (when between md and xl) */}
        <div className="hidden md:flex xl:hidden overflow-x-auto pb-2 pt-1 gap-1 border-t border-slate-850 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                    : 'text-slate-400 hover:text-white border-transparent'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Full Dropdown / Drawer (When mobileMenuOpen is true) */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Interactive Learning Modules & Deliverables
              </span>
              <span className="text-xs text-slate-500 font-mono">8 Sections Available</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-150 flex items-start gap-3 ${
                      isActive
                        ? 'bg-cyan-950/50 border-cyan-500/60 text-white shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                        : 'bg-slate-900/60 border-slate-850 text-slate-300 hover:bg-slate-850 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isActive ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-xs truncate">{item.label}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800/80 text-cyan-400 shrink-0">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
