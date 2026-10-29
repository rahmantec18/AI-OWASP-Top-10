import React, { useState } from 'react';
import { QUESTION_SETS, GLOSSARY_TERMS } from '../data/tutorData';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ExternalLink,
  BookOpen,
  Search,
  Shuffle,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';

// Fisher-Yates shuffle algorithm that randomizes options and tracks the new correct answer index
function jumbleQuestions(questions) {
  return questions.map(q => {
    const correctAnswerText = q.options[q.answer];
    const shuffledOptions = [...q.options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }
    const newAnswerIndex = shuffledOptions.indexOf(correctAnswerText);
    return {
      ...q,
      options: shuffledOptions,
      answer: newAnswerIndex
    };
  });
}

export default function QuizSection() {
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' | 'glossary'
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState(() =>
    jumbleQuestions(QUESTION_SETS[0].questions)
  );
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [searchGlossary, setSearchGlossary] = useState('');
  const [glossaryFilter, setGlossaryFilter] = useState('ALL');
  const [jumbleNotice, setJumbleNotice] = useState('Set 1 Active • 15 Questions • Options Jumbled');

  const flashNotice = (msg) => {
    setJumbleNotice(msg);
    setTimeout(() => {
      setJumbleNotice(null);
    }, 3500);
  };

  const handleSelectOption = (qId, optionIdx) => {
    if (selectedAnswers[qId] !== undefined) return; // Prevent re-answering
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  // Cycles to the next 15-question set with jumbled options
  const cycleToNextSet = () => {
    const nextIdx = (currentSetIndex + 1) % QUESTION_SETS.length;
    setCurrentSetIndex(nextIdx);
    setCurrentQuestions(jumbleQuestions(QUESTION_SETS[nextIdx].questions));
    setSelectedAnswers({});
    flashNotice(`Cycled to Set ${nextIdx + 1} of ${QUESTION_SETS.length}: "${QUESTION_SETS[nextIdx].name}" • Options freshly jumbled!`);
  };

  // Switch to a chosen set directly with jumbled options
  const selectSpecificSet = (idx) => {
    setCurrentSetIndex(idx);
    setCurrentQuestions(jumbleQuestions(QUESTION_SETS[idx].questions));
    setSelectedAnswers({});
    flashNotice(`Switched to Set ${idx + 1}: "${QUESTION_SETS[idx].name}" • Options freshly jumbled!`);
  };

  // Re-jumble current set's options & clear answers
  const reJumbleCurrent = () => {
    setCurrentQuestions(jumbleQuestions(QUESTION_SETS[currentSetIndex].questions));
    setSelectedAnswers({});
    flashNotice(`Set ${currentSetIndex + 1} options re-jumbled and answers reset!`);
  };

  // Universal reset handler: clicking Reset Questions or Reset Answers cycles through sets as requested
  const handleReset = () => {
    cycleToNextSet();
  };

  // Score calculation
  const totalAnswered = Object.keys(selectedAnswers).length;
  const correctCount = currentQuestions.filter(q => selectedAnswers[q.id] === q.answer).length;
  const scorePct = totalAnswered > 0 ? Math.round((correctCount / currentQuestions.length) * 100) : 0;
  const activeSet = QUESTION_SETS[currentSetIndex];

  // Filtered glossary
  const filteredGlossary = GLOSSARY_TERMS.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchGlossary.toLowerCase()) ||
                          term.simple.toLowerCase().includes(searchGlossary.toLowerCase()) ||
                          term.technical.toLowerCase().includes(searchGlossary.toLowerCase());
    const matchesCategory = glossaryFilter === 'ALL' || term.owasp === glossaryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 py-6">
      {/* Header & Sub-Tab */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-800 text-cyan-300 text-xs font-mono mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            Verified Knowledge Evaluation
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Interactive Quiz & Glossary</h1>
          <p className="text-xs md:text-sm text-slate-400">
            3 sets of 15 evidence-verified questions (45 questions total) with rotating cycle & randomized option jumbling.
          </p>
        </div>

        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'quiz'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            15-Question Quiz ({totalAnswered}/15)
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'glossary'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Glossary (12 Terms)
          </button>
        </div>
      </div>

      {activeTab === 'quiz' ? (
        <div className="space-y-6">
          {/* Active Set Selector & Jumble Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 space-y-4 shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-500 text-slate-950">
                    SET {currentSetIndex + 1} OF {QUESTION_SETS.length}
                  </span>
                  <span className="text-base font-bold text-white">
                    {activeSet.name}
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {activeSet.description}
                </p>
              </div>

              {/* Set Navigation Tabs */}
              <div className="flex flex-wrap items-center gap-2">
                {QUESTION_SETS.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => selectSpecificSet(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border ${
                      currentSetIndex === idx
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-sm'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3 h-3" />
                    <span>Set {idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notification alert on cycle/jumble */}
            {jumbleNotice && (
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-850 rounded-xl px-3 py-2 animate-in fade-in">
                <Shuffle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{jumbleNotice}</span>
              </div>
            )}
          </div>

          {/* Quiz Score Tracker & Controls */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Active Set Progress & Score (Set {currentSetIndex + 1}/3)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white">{correctCount}</span>
                <span className="text-slate-400 font-mono text-sm">/ {currentQuestions.length} Correct ({scorePct}%)</span>
              </div>
              <p className="text-xs text-slate-400">
                {totalAnswered === 0
                  ? 'Select an answer to see instant feedback and evidence citations. Options are randomized on every cycle.'
                  : `Answered ${totalAnswered} of ${currentQuestions.length} questions in this set.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleReset}
                title="Cycles to the next 15-question set with jumbled options"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                Reset Questions (Next Set)
              </button>

              <button
                onClick={handleReset}
                title="Clears answers and cycles to the next set with jumbled options"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Answers
              </button>

              <button
                onClick={reJumbleCurrent}
                title="Randomizes option order (A, B, C, D) for the current set and resets answers"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-cyan-300 text-xs font-semibold border border-cyan-900/60 transition-all"
              >
                <Shuffle className="w-3.5 h-3.5" />
                Re-Jumble Options
              </button>
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-6">
            {currentQuestions.map((q, idx) => {
              const selectedIdx = selectedAnswers[q.id];
              const isAnswered = selectedIdx !== undefined;
              const isCorrect = isAnswered && selectedIdx === q.answer;

              return (
                <div
                  key={`${q.id}-${idx}`}
                  className={`p-6 rounded-2xl border transition-all duration-200 bg-slate-900/70 ${
                    isAnswered
                      ? isCorrect
                        ? 'border-emerald-800/60 bg-emerald-950/10'
                        : 'border-rose-800/60 bg-rose-950/10'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Question Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded bg-slate-800 text-cyan-400 font-mono font-bold text-xs">
                          {q.id}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {q.owasp}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                          Set {currentSetIndex + 1}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50 flex items-center gap-1">
                          <Shuffle className="w-2.5 h-2.5" />
                          Jumbled
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
                          Verified
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">
                      {idx + 1}. {q.question}
                    </h3>

                    {/* 4 Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                      {q.options.map((opt, oIdx) => {
                        const isThisSelected = selectedIdx === oIdx;
                        const isThisCorrectAnswer = oIdx === q.answer;

                        let btnStyle = "bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white";

                        if (isAnswered) {
                          if (isThisCorrectAnswer) {
                            btnStyle = "bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold";
                          } else if (isThisSelected && !isCorrect) {
                            btnStyle = "bg-rose-950/60 border-rose-500 text-rose-200";
                          } else {
                            btnStyle = "bg-slate-950/40 border-slate-900 text-slate-600 opacity-60";
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={isAnswered}
                            onClick={() => handleSelectOption(q.id, oIdx)}
                            className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-start gap-3 ${btnStyle}`}
                          >
                            <span className="w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-[10px] shrink-0 border border-current">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span className="leading-relaxed">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Post-answer feedback */}
                    {isAnswered && (
                      <div className={`p-4 rounded-xl border space-y-2 animate-in fade-in duration-200 ${
                        isCorrect
                          ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                          : 'bg-rose-950/30 border-rose-800/60 text-rose-200'
                      }`}>
                        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide">
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              Correct Answer
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-rose-400" />
                              Incorrect Answer
                            </>
                          )}
                        </div>

                        <p className="text-xs text-slate-200 leading-relaxed font-sans">
                          {q.explanation}
                        </p>

                        <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-cyan-300">
                          <a
                            href={q.evidenceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 hover:underline"
                          >
                            <span>Verify against official OWASP source</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Glossary Sub-tab */
        <div className="space-y-6">
          {/* Glossary Filter */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search glossary terms or definitions..."
                value={searchGlossary}
                onChange={(e) => setSearchGlossary(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
              />
            </div>

            <select
              value={glossaryFilter}
              onChange={(e) => setGlossaryFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 text-xs focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="ALL">All Categories</option>
              <option value="A01:2025">A01:2025 Broken Access Control</option>
              <option value="A02:2025">A02:2025 Security Misconfiguration</option>
              <option value="A03:2025">A03:2025 Supply Chain Failures</option>
              <option value="A04:2025">A04:2025 Cryptographic Failures</option>
              <option value="A05:2025">A05:2025 Injection</option>
              <option value="A07:2025">A07:2025 Authentication Failures</option>
            </select>
          </div>

          {/* Glossary Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGlossary.map((g) => (
              <div key={g.id} className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-cyan-400 font-bold text-xs">{g.id}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {g.owasp}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base">{g.term}</h3>

                  <div className="space-y-1.5 text-xs">
                    <div className="p-2.5 rounded bg-slate-950/60 border border-slate-850">
                      <span className="text-[10px] text-cyan-400 font-bold uppercase block mb-0.5">Simple Concept</span>
                      <p className="text-slate-300">{g.simple}</p>
                    </div>

                    <div className="p-2.5 rounded bg-slate-950/60 border border-slate-850">
                      <span className="text-[10px] text-indigo-400 font-bold uppercase block mb-0.5">Technical Definition</span>
                      <p className="text-slate-300 font-mono text-[11px]">{g.technical}</p>
                    </div>

                    {g.realWorldExample && (
                      <div className="p-2.5 rounded bg-cyan-950/30 border border-cyan-800/40 space-y-0.5">
                        <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          Everyday Relatable Example
                        </span>
                        <p className="text-slate-300 text-xs italic leading-relaxed">
                          "{g.realWorldExample}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Definition
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
