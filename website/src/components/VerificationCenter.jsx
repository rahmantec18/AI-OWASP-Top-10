import React, { useState } from 'react';
import { CLAIMS_DATA, ERROR_LOG } from '../data/tutorData';
import { CheckCircle2, AlertTriangle, AlertOctagon, HelpCircle, Search, Filter, RefreshCw, ExternalLink } from 'lucide-react';

export default function VerificationCenter() {
  const [activeSubTab, setActiveSubTab] = useState('claims'); // 'claims' | 'errors'
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [toolFilter, setToolFilter] = useState('ALL');
  const [strategyFilter, setStrategyFilter] = useState('ALL');
  const [selectedClaim, setSelectedClaim] = useState(null);

  // Filtered claims
  const filteredClaims = CLAIMS_DATA.filter(c => {
    const matchesSearch = c.claim.toLowerCase().includes(search.toLowerCase()) ||
                          c.evidence.toLowerCase().includes(search.toLowerCase()) ||
                          c.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    const matchesTool = toolFilter === 'ALL' || c.tool === toolFilter;
    const matchesStrategy = strategyFilter === 'ALL' || c.strategy === strategyFilter;
    return matchesSearch && matchesStatus && matchesTool && matchesStrategy;
  });

  // Calculate dynamic stats
  const verifiedCount = filteredClaims.filter(c => c.status === 'Verified').length;
  const partialCount = filteredClaims.filter(c => c.status === 'Partially verified').length;
  const incorrectCount = filteredClaims.filter(c => c.status === 'Incorrect').length;
  const outdatedCount = filteredClaims.filter(c => c.status === 'Outdated').length;
  const unsupportedCount = filteredClaims.filter(c => c.status === 'Unsupported by source').length;

  const totalAssessed = verifiedCount + partialCount + incorrectCount + outdatedCount;
  const accuracyPct = totalAssessed > 0 ? (((verifiedCount + 0.5 * partialCount) / totalAssessed) * 100).toFixed(1) : 0;
  const totalAll = totalAssessed + unsupportedCount;
  const groundingPct = totalAll > 0 ? (((verifiedCount + partialCount) / totalAll) * 100).toFixed(1) : 0;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Verified':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800">Verified</span>;
      case 'Partially verified':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-950/80 text-amber-400 border border-amber-800">Partially Verified</span>;
      case 'Incorrect':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-950/80 text-rose-400 border border-rose-800">Incorrect</span>;
      case 'Outdated':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-950/80 text-orange-400 border border-orange-800">Outdated (2021)</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-slate-400">Unsupported</span>;
    }
  };

  return (
    <div className="space-y-8 py-6">
      {/* Header and Sub-Tab Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-xs font-mono mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            Audit Ledger · OWASP Top 10:2025 Evidence
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Verification & Error Center</h1>
          <p className="text-xs md:text-sm text-slate-400">
            Systematic evidence check of AI claims against official documentation with formula calculation.
          </p>
        </div>

        {/* Sub-tab pills */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveSubTab('claims')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'claims'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Claim Ledger ({CLAIMS_DATA.length})
          </button>
          <button
            onClick={() => setActiveSubTab('errors')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'errors'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Observed Error Log ({ERROR_LOG.length})
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase font-mono block">Metric A (Accuracy)</span>
          <span className="text-2xl font-extrabold text-emerald-400 font-mono">{accuracyPct}%</span>
          <span className="text-[10px] text-slate-500 block mt-1">(V + 0.5P) / (V + P + I + O)</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase font-mono block">Metric B (Grounding)</span>
          <span className="text-2xl font-extrabold text-cyan-400 font-mono">{groundingPct}%</span>
          <span className="text-[10px] text-slate-500 block mt-1">(V + P) / Total Claims</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase font-mono block">Verified Claims</span>
          <span className="text-2xl font-extrabold text-white font-mono">{verifiedCount}</span>
          <span className="text-[10px] text-emerald-400 block mt-1">100% Traceable</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 uppercase font-mono block">Flagged Errors</span>
          <span className="text-2xl font-extrabold text-rose-400 font-mono">{incorrectCount + outdatedCount}</span>
          <span className="text-[10px] text-rose-400 block mt-1">Logged with Resolutions</span>
        </div>
      </div>

      {activeSubTab === 'claims' ? (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search claims, evidence citations, or claim IDs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="ALL">All Statuses</option>
                <option value="Verified">Verified</option>
                <option value="Partially verified">Partially Verified</option>
                <option value="Incorrect">Incorrect</option>
                <option value="Outdated">Outdated</option>
              </select>

              <select
                value={toolFilter}
                onChange={(e) => setToolFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="ALL">All AI Engines</option>
                <option value="ChatGPT">ChatGPT</option>
                <option value="Gemini">Gemini</option>
                <option value="Claude">Claude</option>
              </select>

              <select
                value={strategyFilter}
                onChange={(e) => setStrategyFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="ALL">All Strategies</option>
                <option value="A-Basic">Strategy A (Basic)</option>
                <option value="B-Evidence">Strategy B (Evidence)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-mono">
                  <th className="p-3.5">ID</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">AI Engine</th>
                  <th className="p-3.5">Strategy</th>
                  <th className="p-3.5">Extracted AI Claim</th>
                  <th className="p-3.5">Official OWASP 2025 Evidence</th>
                  <th className="p-3.5">Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredClaims.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedClaim(selectedClaim?.id === c.id ? null : c)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <td className="p-3.5 font-mono font-bold text-cyan-400">{c.id}</td>
                    <td className="p-3.5 font-mono text-slate-300">{c.source}</td>
                    <td className="p-3.5 text-white font-medium">{c.tool}</td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-400">{c.strategy}</td>
                    <td className="p-3.5 text-slate-200 max-w-xs">{c.claim}</td>
                    <td className="p-3.5 text-slate-400 max-w-xs font-mono text-[11px] italic">{c.evidence}</td>
                    <td className="p-3.5">{getStatusBadge(c.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Selected Claim Drawer / Modal */}
          {selectedClaim && (
            <div className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-cyan-400 font-bold">{selectedClaim.id}</span>
                  <span className="text-white font-semibold">Audit Record Details</span>
                  {getStatusBadge(selectedClaim.status)}
                </div>
                <button
                  onClick={() => setSelectedClaim(null)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-slate-400 uppercase">Extracted AI Claim</span>
                  <p className="text-slate-200 leading-relaxed">{selectedClaim.claim}</p>
                </div>
                <div className="space-y-1 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-cyan-400 uppercase">Authoritative OWASP Evidence</span>
                  <p className="text-slate-300 italic font-mono leading-relaxed">"{selectedClaim.evidence}"</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <span className="font-bold text-slate-400 uppercase">Reviewer Audit Notes</span>
                <p className="text-slate-300">{selectedClaim.note}</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Observed Error Log */
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-800/40 text-xs text-rose-200">
            <strong>Audit Note: </strong>
            These represent actual observed errors caught during evaluation of unconstrained (Strategy A) generation.
            Strategy B eliminated 100% of these severe errors.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ERROR_LOG.map((err) => (
              <div key={err.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-rose-400 font-bold text-xs">{err.id}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-950 text-rose-400 border border-rose-800">
                    Severity: {err.severity}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-sm">{err.errorType}</h3>
                  <span className="text-xs text-slate-400 font-mono">{err.category} · {err.tool}</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="p-2.5 rounded bg-rose-950/20 border border-rose-900/40 text-rose-200">
                    <strong>Observed Flaw: </strong> {err.description}
                  </div>
                  <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-900/40 text-emerald-200">
                    <strong>Expected Standard: </strong> {err.expected}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                  <strong>Resolution: </strong> {err.resolution}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
