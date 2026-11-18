import React, { useState, useEffect } from 'react';
import { useExamStore } from '../store/examStore';
import { getRandomExamQuestions } from '../data/questions';
import { MonacoCodeEditor } from '../components/code/MonacoCodeEditor';
import { sound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  Timer, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ChevronRight, 
  Send, 
  RotateCcw,
  ShieldAlert,
  Trophy,
  FileText,
  Code2
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
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Coding challenge for the exam (LAB-01 + LAB-03 + LAB-04)
  const examCodingChallenges = [
    {
      id: 'exam-c1',
      title: 'Practical Coding Part 1: Palindrome & Binary Converter',
      description: 'Implement isPalindrome(String s) and decimalTobinary(int n) satisfying all test cases.',
      starterCode: `bool isPalindrome(String s) {
  // TODO: Case-insensitive palindrome check
  return false;
}

String decimalTobinary(int n) {
  // TODO: Convert decimal integer to binary string
  return "";
}
`,
      testCases: [
        { id: 't1', description: 'isPalindrome("radar") returns true', expectedOutput: true },
        { id: 't2', description: 'isPalindrome("flutter") returns false', expectedOutput: false },
        { id: 't3', description: 'decimalTobinary(10) returns "1010"', expectedOutput: '1010' },
      ],
    },
    {
      id: 'exam-c2',
      title: 'Practical Coding Part 2: Singleton CounterStore',
      description: 'Implement CounterStore with private constructor, static _instance, and factory constructor.',
      starterCode: `class CounterStore {
  // TODO: Implement Singleton pattern
  int count = 0;
  void increment() => count++;
}
`,
      testCases: [
        { id: 't1', description: 'CounterStore() returns identical instance', expectedOutput: true },
      ],
    },
  ];

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
    setSelectedOption(null);
    sound.playClick();
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
            <li><strong>No LLMs or Cheat Sheets:</strong> Hints and lesson previews are locked during the exam.</li>
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
      <div className="flex items-center gap-3 border-b border-quest-border/50 pb-2">
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'quiz'
              ? 'bg-quest-primary text-white shadow-lg shadow-quest-primary/20'
              : 'text-quest-muted hover:text-white hover:bg-quest-card'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Section 1: Quiz Questions ({selectedQuestionIds.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('coding')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'coding'
              ? 'bg-quest-primary text-white shadow-lg shadow-quest-primary/20'
              : 'text-quest-muted hover:text-white hover:bg-quest-card'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Section 2: Practical Coding ({examCodingChallenges.length})</span>
        </button>
      </div>

      {/* Tab 1: Quiz Section */}
      {activeTab === 'quiz' && (
        <div className="glass-panel p-6 lg:p-8 rounded-3xl border border-quest-border/60 space-y-6">
          <div className="flex items-center justify-between text-xs text-quest-muted font-mono">
            <span>Question {currentQuizIndex + 1} of {selectedQuestionIds.length}</span>
            <span>Weight: 45% of Final Grade</span>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">
              Which statement accurately reflects the behavior of Dart\'s Integer Division operator (~/)?
            </h3>

            <div className="space-y-2.5">
              {[
                'It truncates fractional parts and always returns an integer.',
                'It returns a double like standard division.',
                'It rounds to the nearest floating point number.',
                'It throws an exception if the result is negative.'
              ].map((opt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedOption(i);
                    recordAnswer(selectedQuestionIds[currentQuizIndex] || `q-${currentQuizIndex}`, i, 20);
                    sound.playClick();
                  }}
                  className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition flex items-center gap-3 ${
                    selectedOption === i
                      ? 'bg-quest-primary/20 border-quest-primary text-white font-semibold'
                      : 'bg-quest-card/40 border-quest-border/60 hover:bg-quest-border/60 text-gray-200'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-quest-surface flex items-center justify-center font-bold text-xs">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quiz Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-quest-border/40">
            <button
              onClick={() => {
                if (currentQuizIndex > 0) {
                  setCurrentQuizIndex((i) => i - 1);
                  sound.playClick();
                }
              }}
              disabled={currentQuizIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-semibold glass-card text-white disabled:opacity-40"
            >
              Previous
            </button>

            <button
              onClick={() => {
                if (currentQuizIndex < selectedQuestionIds.length - 1) {
                  setCurrentQuizIndex((i) => i + 1);
                  sound.playClick();
                }
              }}
              disabled={currentQuizIndex === selectedQuestionIds.length - 1}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-quest-primary text-white disabled:opacity-40"
            >
              Next Question
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Practical Coding Section */}
      {activeTab === 'coding' && (
        <div className="space-y-6">
          {examCodingChallenges.map((chal) => (
            <div key={chal.id} className="h-[540px]">
              <MonacoCodeEditor
                initialCode={chal.starterCode}
                testCases={chal.testCases}
                title={chal.title}
                subtitle={chal.description}
                onSuccess={() => {
                  recordCodingSubmission(chal.id, chal.starterCode, chal.testCases.length, chal.testCases.length);
                }}
              />
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
