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
import { Shield, ExternalLink, Heart, Terminal } from 'lucide-react';

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
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
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
      </footer>
    </div>
  );
}
