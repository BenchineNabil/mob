import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { LESSONS } from '../data/lessons/lessonsData';
import { LEVELS } from '../data/levels/levelsData';
import { useProgressionStore } from '../store/progressionStore';
import { sound } from '../utils/soundEffects';
import { 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Terminal, 
  Sparkles,
  Lock,
  ChevronLeft
} from 'lucide-react';

export const LessonView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const levelId = parseInt(id || '1', 10);
  
  const { completeLesson, isLevelUnlocked, levels } = useProgressionStore();
  const lesson = LESSONS[levelId];
  const level = LEVELS.find((l) => l.id === levelId);

  // Track which quick checks the student answered correctly
  const [completedSectionChecks, setCompletedSectionChecks] = useState<Record<string, boolean>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});

  // Progression Route Guard
  if (!isLevelUnlocked(levelId)) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Level {levelId} is Locked</h2>
        <p className="text-sm text-quest-muted">
          You must defeat Level {levelId - 1}'s boss challenge before accessing these lessons.
        </p>
        <Link
          to="/levels"
          className="inline-block px-5 py-2.5 rounded-xl bg-quest-primary text-white font-semibold text-xs"
        >
          Return to Level Map
        </Link>
      </div>
    );
  }

  if (!lesson || !level) {
    return <div>Lesson not found.</div>;
  }

  const handleSelectAnswer = (sectionId: string, optionIndex: number, correctIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [sectionId]: optionIndex }));
    setShowFeedback((prev) => ({ ...prev, [sectionId]: true }));

    if (optionIndex === correctIndex) {
      sound.playSuccess();
      setCompletedSectionChecks((prev) => {
        const updated = { ...prev, [sectionId]: true };
        // Check if all sections completed
        const allCompleted = lesson.sections.every((s) => updated[s.id]);
        if (allCompleted) {
          completeLesson(levelId);
          sound.playFanfare();
        }
        return updated;
      });
    } else {
      sound.playError();
    }
  };

  const allSectionsComplete = lesson.sections.every((s) => completedSectionChecks[s.id]);
  const isLessonMarkedDone = levels[levelId]?.isLessonsCompleted || allSectionsComplete;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
      
      {/* Navigation Breadcrumb & Header */}
      <div>
        <Link
          to="/levels"
          onClick={() => sound.playClick()}
          className="inline-flex items-center gap-1.5 text-xs text-quest-muted hover:text-white mb-4 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Level Map</span>
        </Link>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-quest-primary uppercase tracking-wider">Level {levelId} Lessons</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-quest-card text-quest-muted border border-quest-border/40 font-mono">
                {level.lectureRef}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
              {lesson.title}
            </h1>
          </div>

          {isLessonMarkedDone && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Lessons Mastered • Quiz Unlocked</span>
            </div>
          )}
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-8">
        {lesson.sections.map((section, idx) => {
          const isCheckDone = completedSectionChecks[section.id];
          const selectedOption = selectedAnswers[section.id];
          const feedbackShown = showFeedback[section.id];
          const isCorrect = selectedOption === section.quickCheck.correctIndex;

          return (
            <div 
              key={section.id} 
              className="glass-panel p-6 lg:p-8 rounded-3xl border border-quest-border/60 space-y-6"
            >
              {/* Section Header */}
              <div className="flex items-center justify-between border-b border-quest-border/50 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-quest-primary/20 text-quest-primary text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h2 className="text-lg font-bold text-white">{section.title}</h2>
                </div>
                {isCheckDone && (
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              {/* 1. Problem Concept Solves */}
              <div className="bg-quest-card/50 p-4 rounded-2xl border border-quest-border/40">
                <div className="text-xs font-bold text-quest-cyan uppercase tracking-wider mb-1">
                  What Problem Does This Solve?
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {section.conceptProblem}
                </p>
              </div>

              {/* 2. Conceptual Explanation */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-white uppercase tracking-wider">Concept Breakdown</div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {section.explanation}
                </p>
              </div>

              {/* 3. Syntax & Code Example */}
              {section.codeExample && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-white uppercase tracking-wider">
                    <span>Executable Example</span>
                    <span className="font-mono text-[10px] text-quest-primary">Dart 3.x</span>
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-quest-border/60 bg-[#0B0F19]">
                    <pre className="p-4 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                      <code>{section.codeExample}</code>
                    </pre>
                    {section.outputPreview && (
                      <div className="px-4 py-2 bg-quest-surface/90 border-t border-quest-border/40 text-[11px] font-mono text-quest-muted flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-quest-primary" />
                        <span>Console Output: <strong className="text-white">{section.outputPreview}</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 4. Common Mistakes & Exam Traps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Common Mistakes */}
                <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Common Student Mistakes</span>
                  </div>
                  <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                    {section.commonMistakes.map((m, i) => (
                      <li key={i} className="leading-relaxed">{m}</li>
                    ))}
                  </ul>
                </div>

                {/* Professor's Traps */}
                <div className="bg-rose-500/5 border border-rose-500/20 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Professor Bouchrika's Exam Traps</span>
                  </div>
                  <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                    {section.examTraps.map((t, i) => (
                      <li key={i} className="leading-relaxed">{t}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* 5. Quick Understanding Check */}
              <div className="border-t border-quest-border/50 pt-5 space-y-4">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-quest-primary" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Quick Understanding Check</span>
                </div>

                <p className="text-sm font-medium text-white">
                  {section.quickCheck.question}
                </p>

                {/* Option Buttons */}
                <div className="grid grid-cols-1 gap-2.5">
                  {section.quickCheck.options.map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    const isCorrectOpt = optIdx === section.quickCheck.correctIndex;
                    
                    let btnStyle = 'bg-quest-card/50 border-quest-border/60 hover:bg-quest-border text-gray-200';
                    if (feedbackShown) {
                      if (isCorrectOpt) {
                        btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-semibold';
                      } else if (isSelected && !isCorrectOpt) {
                        btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 line-through';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(section.id, optIdx, section.quickCheck.correctIndex)}
                        className={`text-left p-3.5 rounded-xl border text-xs transition flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {feedbackShown && isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on answer */}
                {feedbackShown && (
                  <div className={`p-3.5 rounded-xl text-xs border ${
                    isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}>
                    <strong className="block mb-1">{isCorrect ? 'Correct!' : 'Incorrect — Try again!'}</strong>
                    {section.quickCheck.explanation}
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Completion CTA */}
      <div className="glass-panel-glow p-6 rounded-3xl border border-quest-primary/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Ready to Test Your Knowledge?</h3>
          <p className="text-xs text-quest-muted">
            {allSectionsComplete
              ? 'All understanding checks passed! The Level Quiz is now ready.'
              : 'Answer all understanding checks above to qualify for the Level Quiz.'}
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            navigate(`/levels/${levelId}/quiz`);
          }}
          disabled={!isLessonMarkedDone}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-quest-primary to-quest-secondary hover:from-indigo-600 hover:to-violet-600 text-white shadow-lg shadow-quest-primary/30 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>Take Level {levelId} Quiz</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
