import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import OwaspLibrary from './components/OwaspLibrary';
import AiComparisonLab from './components/AiComparisonLab';
import VerificationCenter from './components/VerificationCenter';
import SecureCodeLab from './components/SecureCodeLab';
import QuizSection from './components/QuizSection';
import ResearchReport from './components/ResearchReport';
import AutomationDownloads from './components/AutomationDownloads';
import { Shield, ExternalLink, Globe, Laptop, GitBranch, CheckCircle2, Terminal } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState('A01:2025');

  return (
    <div className="min-h-screen flex flex-col bg-[#070b14] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            setActiveTab={setActiveTab}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {activeTab === 'library' && (
          <OwaspLibrary
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'comparison' && (
          <AiComparisonLab setActiveTab={setActiveTab} />
        )}

        {activeTab === 'verification' && (
          <VerificationCenter />
        )}

        {activeTab === 'codelab' && (
          <SecureCodeLab />
        )}

        {activeTab === 'quiz' && (
          <QuizSection />
        )}

        {activeTab === 'report' && (
          <ResearchReport />
        )}

        {activeTab === 'downloads' && (
          <AutomationDownloads />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#090d19] py-8 px-4 lg:px-8 mt-16 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Connected Environments & Live Interlink Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-950 flex items-center justify-center text-cyan-400 border border-cyan-800/60 shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-xs sm:text-sm">Connected Environments Hub</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-semibold">
                    Live Synced
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Interlinked live production deployment and local development server
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs w-full sm:w-auto">
              <a
                href="https://rahmantec18.github.io/AI-OWASP-Top-10/"
                target="_blank"
                rel="noopener noreferrer"
                title="https://rahmantec18.github.io/AI-OWASP-Top-10/"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-emerald-300 border border-emerald-900/60 hover:border-emerald-700 transition-colors font-medium text-xs max-w-full"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">Live Site (GitHub Pages)</span>
                <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
              </a>

              <a
                href="http://localhost:5173/"
                target="_blank"
                rel="noopener noreferrer"
                title="http://localhost:5173/"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-cyan-300 border border-cyan-900/60 hover:border-cyan-700 transition-colors font-medium text-xs max-w-full"
              >
                <Laptop className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">Localhost (Port 5173)</span>
                <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
              </a>

              <a
                href="https://github.com/rahmantec18/AI-OWASP-Top-10"
                target="_blank"
                rel="noopener noreferrer"
                title="https://github.com/rahmantec18/AI-OWASP-Top-10"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-indigo-300 border border-indigo-900/60 hover:border-indigo-700 transition-colors font-medium text-xs max-w-full"
              >
                <GitBranch className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="truncate">GitHub Repo</span>
                <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
              </a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-400 border border-cyan-800">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-200">CAPSTONE 9 — AI OWASP Top 10 Tutor</span>
                <p className="text-[11px] text-slate-500">Official OWASP Top 10:2025 · Defensive Cybersecurity Education</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-slate-400">
              <button onClick={() => setActiveTab('library')} className="hover:text-cyan-300 transition-colors">OWASP Library</button>
              <button onClick={() => setActiveTab('comparison')} className="hover:text-cyan-300 transition-colors">AI Comparison</button>
              <button onClick={() => setActiveTab('verification')} className="hover:text-cyan-300 transition-colors">Verification Center</button>
              <button onClick={() => setActiveTab('codelab')} className="hover:text-cyan-300 transition-colors">Code Lab</button>
              <button onClick={() => setActiveTab('quiz')} className="hover:text-cyan-300 transition-colors">Quiz & Glossary</button>
              <button onClick={() => setActiveTab('downloads')} className="hover:text-cyan-300 transition-colors">Downloads</button>
            </div>

            <div className="text-slate-500 text-[11px] font-mono text-center md:text-right">
              Controlled Defensive Demonstrations Only · No Real Attacks
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
