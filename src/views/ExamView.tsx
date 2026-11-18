import React, { useState, useEffect } from 'react';
import { useExamStore } from '../store/examStore';
import { getRandomExamQuestions, ALL_QUESTIONS } from '../data/questions';
import { MonacoCodeEditor } from '../components/code/MonacoCodeEditor';
import { EXAM_CODING_CHALLENGES } from '../data/codingChallenges';
import { sound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  Timer, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft,
  Send, 
  RotateCcw,
  ShieldAlert,
  Trophy,
  FileText,
  Code2,
  PenTool,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const ExamView: React.FC = () => {
  const {
    isActive,
    isCompleted,
    timeRemainingSeconds,
    selectedQuestionIds,
    quizAnswers,
    codingSubmissions,
    currentExamResult,
    startExam,
    tickTimer,
    recordAnswer,
    recordCodingSubmission,
    submitExam,
    resetExam,
  } = useExamStore();

  const [activeTab, setActiveTab] = useState<'quiz' | 'coding'>('quiz');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [activeChallengeIndex, setActiveChallengeIndex] = useState(0);
  const [isExamScratchMode, setIsExamScratchMode] = useState<boolean>(false);

  // Dedicated Examination Practical Tasks (Completely separate from practice arena labs!)
  const examCodingChallenges = EXAM_CODING_CHALLENGES;

  // Tick timer every second when active
  useEffect(() => {
    let interval: any = null;
    if (isActive && !isCompleted) {
      interval = setInterval(() => {
        tickTimer();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isCompleted, tickTimer]);

  const handleStartNewExam = () => {
    const questions = getRandomExamQuestions(20);
    startExam(
      questions.map((q) => q.id),
      examCodingChallenges.map((c) => c.id),
      90 * 60 // 90 minutes
    );
    setCurrentQuizIndex(0);
    setActiveChallengeIndex(0);
    sound.playClick();
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Find the active question from ALL_QUESTIONS
  const currentQuestionId = selectedQuestionIds[currentQuizIndex];
  const currentQuestion = ALL_QUESTIONS.find((q) => q.id === currentQuestionId) || ALL_QUESTIONS[0];
  const selectedOptionForCurrent = quizAnswers[currentQuestion?.id]?.userAnswer ?? null;

  // Exam Results View
  if (isCompleted && currentExamResult) {
    const passed = currentExamResult.passed;

    return (
      <div className="max-w-2xl mx-auto py-12 space-y-8 animate-fadeIn text-center">
        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-xl ${
          passed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-emerald-500/20' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-rose-500/20'
        }`}>
          {passed ? <Trophy className="w-12 h-12" /> : <ShieldAlert className="w-12 h-12" />}
        </div>

        <div className="space-y-2">
          <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
            passed ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
          }`}>
            {passed ? 'Bouchrika Beater Certified' : 'Exam Retake Required'}
          </span>
          <h1 className="text-3xl font-black text-white">
            {passed ? 'Congratulations! You Passed the Exam!' : 'Exam Score Below Threshold'}
          </h1>
          <p className="text-sm text-quest-muted">
            {passed
              ? 'You have demonstrated the rigor and precision required to conquer Prof. Bouchrika\'s Mobile Development exam.'
              : 'The exam requires a composite score of 70% or higher (45% Quiz + 55% Practical Coding).'}
          </p>
        </div>

        {/* Score Breakdown Cards */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="glass-panel p-4 rounded-2xl border border-quest-border/60">
            <div className="text-2xl font-black text-white">{currentExamResult.finalScorePercent}%</div>
            <div className="text-[11px] text-quest-primary font-bold uppercase tracking-wider mt-1">Final Score</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-quest-border/60">
            <div className="text-2xl font-black text-white">{currentExamResult.quizScorePercent}%</div>
            <div className="text-[11px] text-quest-muted font-semibold uppercase tracking-wider mt-1">Quiz (45%)</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-quest-border/60">
            <div className="text-2xl font-black text-white">{currentExamResult.codingScorePercent}%</div>
            <div className="text-[11px] text-quest-muted font-semibold uppercase tracking-wider mt-1">Coding (55%)</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center pt-4">
          <button
            onClick={handleStartNewExam}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-quest-primary to-quest-secondary hover:from-indigo-600 hover:to-violet-600 text-white shadow-lg shadow-quest-primary/30 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Exam (New Questions)</span>
          </button>
        </div>
      </div>
    );
  }

  // Pre-Exam Launch Pad
  if (!isActive) {
    return (
      <div className="max-w-2xl mx-auto py-12 space-y-8 animate-fadeIn text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-quest-primary to-quest-secondary flex items-center justify-center mx-auto shadow-xl shadow-quest-primary/20">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            The Bouchrika Final Exam Simulator
          </h1>
          <p className="text-sm text-quest-muted max-w-lg mx-auto">
            Simulate the authentic ENSIA university final exam under strict examination conditions.
          </p>
        </div>

        {/* Exam Regulations Card */}
        <div className="glass-panel p-6 rounded-3xl border border-quest-border/60 text-left space-y-4 max-w-lg mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-quest-primary flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Examination Protocol & Regulations</span>
          </div>

          <ul className="text-xs text-gray-300 space-y-2 list-disc list-inside">
            <li><strong>Duration:</strong> Exactly 90 minutes with live countdown.</li>
            <li><strong>Weighting:</strong> 45% Quiz Questions, 55% Practical Coding Tasks.</li>
            <li><strong>Quiz Questions:</strong> 20 rigorous conceptual and output prediction questions.</li>
            <li><strong>Practical Coding:</strong> 4 comprehensive coding challenges (Algorithms, OOP Singleton, Auth Architecture, and Game Engine).</li>
            <li><strong>Code From Zero:</strong> You can toggle between scaffolded starters and full scratch mode.</li>
            <li><strong>Auto-Submit:</strong> When the timer expires, all current answers are automatically finalized.</li>
            <li><strong>Passing Threshold:</strong> A composite score of <strong>70%</strong> is required to pass.</li>
          </ul>
        </div>

        <button
          onClick={handleStartNewExam}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-quest-primary to-quest-secondary hover:from-indigo-600 hover:to-violet-600 text-white shadow-xl shadow-quest-primary/30 transition hover:scale-105"
        >
          <Timer className="w-4 h-4" />
          <span>Begin 90-Minute Exam</span>
        </button>
      </div>
    );
  }

  const answeredQuizCount = Object.keys(quizAnswers).length;
  const activeCodingChal = examCodingChallenges[activeChallengeIndex];

  // Active Exam Hall View
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-16">
      
      {/* Exam Header HUD */}
      <div className="glass-panel p-4 rounded-2xl border border-quest-border/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <div>
            <h2 className="text-sm font-bold text-white">ENSIA Mobile Development Final Exam</h2>
            <p className="text-[11px] text-quest-muted">Official Examination in Progress</p>
          </div>
        </div>

        {/* Live Timer */}
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-xl border font-mono font-bold text-sm ${
          timeRemainingSeconds < 300
            ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
            : 'bg-quest-card border-quest-border/60 text-amber-400'
        }`}>
          <Timer className="w-4 h-4" />
          <span>{formatTimer(timeRemainingSeconds)}</span>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to finalize and submit your exam?')) {
              submitExam();
            }
          }}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition shadow-md"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Submit Exam</span>
        </button>
      </div>

      {/* Tabs: Quiz vs Practical Coding */}
      <div className="flex items-center justify-between border-b border-quest-border/50 pb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveTab('quiz');
              sound.playClick();
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'quiz'
                ? 'bg-quest-primary text-white shadow-lg shadow-quest-primary/20'
                : 'text-quest-muted hover:text-white hover:bg-quest-card'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Section 1: Quiz ({answeredQuizCount}/{selectedQuestionIds.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('coding');
              sound.playClick();
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
              activeTab === 'coding'
                ? 'bg-quest-primary text-white shadow-lg shadow-quest-primary/20'
                : 'text-quest-muted hover:text-white hover:bg-quest-card'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Section 2: Practical Coding ({examCodingChallenges.length} Tasks)</span>
          </button>
        </div>

        {/* Zero Scratch Mode toggle for coding section */}
        {activeTab === 'coding' && (
          <div className="flex items-center gap-2 glass-card px-3 py-1.5 rounded-xl border border-quest-border/40">
            <PenTool className="w-3.5 h-3.5 text-quest-accent" />
            <span className="text-[11px] font-bold text-white">Code From Zero:</span>
            <button
              onClick={() => {
                setIsExamScratchMode(!isExamScratchMode);
                sound.playClick();
              }}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                isExamScratchMode ? 'bg-quest-accent' : 'bg-quest-card border border-quest-border'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  isExamScratchMode ? 'translate-x-4' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        )}
      </div>

      {/* Tab 1: Quiz Section */}
      {activeTab === 'quiz' && currentQuestion && (
        <div className="space-y-4">
          
          {/* Question Navigation Matrix (Pills 1..20) */}
          <div className="glass-panel p-3.5 rounded-2xl border border-quest-border/60">
            <div className="text-[11px] text-quest-muted mb-2 font-mono flex items-center justify-between">
              <span>Question Navigator:</span>
              <span>{answeredQuizCount} of {selectedQuestionIds.length} answered</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedQuestionIds.map((qId, idx) => {
                const isCurrent = idx === currentQuizIndex;
                const isAnswered = quizAnswers[qId] !== undefined;
                return (
                  <button
                    key={qId}
                    onClick={() => {
                      setCurrentQuizIndex(idx);
                      sound.playClick();
                    }}
                    className={`w-8 h-8 rounded-xl text-xs font-bold transition flex items-center justify-center ${
                      isCurrent
                        ? 'bg-quest-primary text-white ring-2 ring-quest-accent shadow-lg shadow-quest-primary/30'
                        : isAnswered
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-quest-card text-quest-muted hover:text-white border border-quest-border/40'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Question Card */}
          <div className="glass-panel p-6 lg:p-8 rounded-3xl border border-quest-border/60 space-y-6">
            <div className="flex items-center justify-between text-xs text-quest-muted font-mono">
              <span className="px-2.5 py-1 rounded-full bg-quest-surface text-quest-primary font-bold">
                Question {currentQuizIndex + 1} of {selectedQuestionIds.length}
              </span>
              <span className="text-quest-muted">Topic: {currentQuestion.topic}</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {currentQuestion.prompt}
              </h3>

              {/* Code snippet if present */}
              {currentQuestion.codeSnippet && (
                <div className="p-4 rounded-2xl bg-quest-bg border border-quest-border/60 font-mono text-xs sm:text-sm text-quest-accent overflow-x-auto whitespace-pre">
                  {currentQuestion.codeSnippet}
                </div>
              )}

              {/* Answer options */}
              <div className="space-y-3">
                {(currentQuestion.options || []).map((opt, i) => {
                  const isSelected = selectedOptionForCurrent === i;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        const isCorrect = i === currentQuestion.correctAnswer;
                        recordAnswer(currentQuestion.id, i, isCorrect, 0);
                        sound.playClick();
                      }}
                      className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition flex items-center gap-3.5 ${
                        isSelected
                          ? 'bg-quest-primary/20 border-quest-primary text-white font-semibold ring-1 ring-quest-primary'
                          : 'bg-quest-card/50 border-quest-border/60 hover:bg-quest-border/60 text-gray-200'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? 'bg-quest-primary text-white' : 'bg-quest-surface text-quest-muted'
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quiz Navigation Bottom Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-quest-border/40">
              <button
                onClick={() => {
                  if (currentQuizIndex > 0) {
                    setCurrentQuizIndex((i) => i - 1);
                    sound.playClick();
                  }
                }}
                disabled={currentQuizIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold glass-card text-white hover:bg-quest-card disabled:opacity-30 disabled:pointer-events-none transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Question</span>
              </button>

              <button
                onClick={() => {
                  if (currentQuizIndex < selectedQuestionIds.length - 1) {
                    setCurrentQuizIndex((i) => i + 1);
                    sound.playClick();
                  }
                }}
                disabled={currentQuizIndex === selectedQuestionIds.length - 1}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-quest-primary hover:bg-quest-secondary text-white disabled:opacity-30 disabled:pointer-events-none transition shadow-lg shadow-quest-primary/20"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Practical Coding Section */}
      {activeTab === 'coding' && activeCodingChal && (
        <div className="space-y-6">
          
          {/* Coding Challenge Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {examCodingChallenges.map((chal, idx) => {
              const isSelected = idx === activeChallengeIndex;
              const sub = codingSubmissions[chal.id];
              const isDone = sub?.isCompleted;

              return (
                <button
                  key={chal.id}
                  onClick={() => {
                    setActiveChallengeIndex(idx);
                    sound.playClick();
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition ${
                    isSelected
                      ? 'bg-quest-primary text-white shadow-md'
                      : isDone
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      : 'glass-card text-quest-muted hover:text-white'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Code2 className="w-3.5 h-3.5" />}
                  <span>Part {idx + 1}: {chal.title.split(':')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Coding Challenge Specs */}
          <div className="glass-panel p-4 rounded-2xl border border-quest-border/60 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-quest-primary" />
                {activeCodingChal.title}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-quest-surface text-quest-primary font-mono">
                {activeCodingChal.difficulty}
              </span>
            </div>
            <p className="text-xs text-quest-muted">{activeCodingChal.description}</p>
            {activeCodingChal.instructions.length > 0 && (
              <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside pt-1">
                {activeCodingChal.instructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Monaco Code Editor */}
          <div className="h-[600px]">
            <MonacoCodeEditor
              key={`${activeCodingChal.id}-${isExamScratchMode ? 'zero' : 'scaffold'}`}
              initialCode={isExamScratchMode ? activeCodingChal.zeroScratchCode : activeCodingChal.starterCode}
              testCases={activeCodingChal.testCases}
              title={`${activeCodingChal.title} ${isExamScratchMode ? '(From Zero)' : ''}`}
              subtitle={activeCodingChal.description}
              onSuccess={() => {
                recordCodingSubmission(
                  activeCodingChal.id,
                  activeCodingChal.starterCode,
                  activeCodingChal.testCases.length,
                  activeCodingChal.testCases.length
                );
              }}
            />
          </div>

        </div>
      )}

    </div>
  );
};
