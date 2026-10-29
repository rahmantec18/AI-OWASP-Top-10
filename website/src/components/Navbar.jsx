import React from 'react';
import { Shield, BookOpen, GitCompare, CheckCircle2, Code2, HelpCircle, FileText, Download, Terminal } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'library', label: 'OWASP Library', icon: BookOpen },
    { id: 'comparison', label: 'AI Comparison Lab', icon: GitCompare },
    { id: 'verification', label: 'Verification Center', icon: CheckCircle2 },
    { id: 'codelab', label: 'Secure Code Lab', icon: Code2 },
    { id: 'quiz', label: 'Quiz & Glossary', icon: HelpCircle },
    { id: 'report', label: 'Research & Slides', icon: FileText },
    { id: 'downloads', label: 'Automation & Downloads', icon: Download },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo and project identity */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/40">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                OWASP AI TUTOR
              </span>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 rounded-full">
                Top 10:2025
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono tracking-wide">
              CAPSTONE 9 · LEARN · VERIFY · SECURE
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
