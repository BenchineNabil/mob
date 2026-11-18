import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getQuestionsForLevel } from '../data/questions';
import { LEVELS } from '../data/levels/levelsData';
import { useProgressionStore } from '../store/progressionStore';
import { sound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ChevronRight, 
  RotateCcw, 
  Trophy, 
  ArrowLeft,
  Sparkles,
  Lock,
  BookOpen
} from 'lucide-react';

export const QuizView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const levelId = parseInt(id || '1', 10);
  
  const { canTakeQuiz, recordQuizScore, recordQuestionResult, stats } = useProgressionStore();
  const level = LEVELS.find((l) => l.id === levelId);
  const questions = getQuestionsForLevel(levelId);

  // Take a slice of 10 randomized questions per quiz attempt
  const [activeQuestions] = useState(() => {
    return [...questions].sort(() => 0.5 - Math.random()).slice(0, 10);
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [answersLog, setAnswersLog] = useState<{ questionId: string; isCorrect: boolean; selected: number }[]>([]);

  // Route Guard: Lessons must be completed before quiz
  if (!canTakeQuiz(levelId)) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Complete Lessons First</h2>
        <p className="text-sm text-quest-muted">
          Prof. Bouchrika requires students to review the lesson concepts and answer all understanding checks before challenging the Level {levelId} Quiz.
        </p>
        <Link
          to={`/levels/${levelId}/lesson`}
          className="inline-block px-5 py-2.5 rounded-xl bg-quest-primary text-white font-semibold text-xs"
        >
          Go to Level {levelId} Lessons
        </Link>
      </div>
    );
  }

  const currentQ = activeQuestions[currentIndex];
  if (!currentQ) return <div>No questions available.</div>;

  const handleSelect = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    sound.playClick();
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    const isCorrect = selectedOption === currentQ.correctAnswer;
    setIsAnswerSubmitted(true);
    recordQuestionResult(currentQ.topic, isCorrect);

    if (isCorrect) {
      setScore((s) => s + 1);
      sound.playSuccess();
    } else {
      sound.playError();
    }

    setAnswersLog((prev) => [
      ...prev,
      { questionId: currentQ.id, isCorrect, selected: selectedOption },
    ]);
  };

  const handleNext = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      sound.playClick();
    } else {
      // Quiz Finished
      const finalScorePercent = Math.round(((score + (selectedOption === currentQ.correctAnswer ? 0 : 0)) / activeQuestions.length) * 100);
      const passed = recordQuizScore(levelId, finalScorePercent, level?.passingScorePercent || 70);
      setIsQuizFinished(true);

      if (passed) {
        sound.playFanfare();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        sound.playError();
      }
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizFinished(false);
    setAnswersLog([]);
    sound.playClick();
  };

  const finalScorePercent = Math.round((score / activeQuestions.length) * 100);
  const isPassed = finalScorePercent >= (level?.passingScorePercent || 70);

  // Result Screen
  if (isQuizFinished) {
    return (
      <div className="max-w-xl mx-auto py-12 space-y-6 text-center animate-fadeIn">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${
          isPassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
        }`}>
          {isPassed ? <Trophy className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
        </div>

        <div>
          <h2 className="text-3xl font-extrabold text-white">
            {isPassed ? 'Level Quiz Passed!' : 'Quiz Needs Revision'}
          </h2>
          <p className="text-sm text-quest-muted mt-1">
            {isPassed
              ? `Outstanding! You scored ${finalScorePercent}%, unlocking the Level ${levelId} Boss Encounter.`
              : `You scored ${finalScorePercent}%. A minimum of ${level?.passingScorePercent}% is required to unlock the boss.`}
          </p>
        </div>

        {/* Score Badge Card */}
        <div className="glass-panel p-6 rounded-3xl border border-quest-border/60 max-w-sm mx-auto space-y-2">
          <div className="text-4xl font-black text-white">{score} / {activeQuestions.length}</div>
          <div className="text-xs text-quest-muted uppercase tracking-wider font-semibold">
            {finalScorePercent}% Accuracy
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <button
            onClick={handleRetake}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold glass-card hover:bg-quest-border text-white border border-quest-border/60 transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Quiz</span>
          </button>

          {isPassed ? (
            <button
              onClick={() => {
                sound.playClick();
                navigate(`/levels/${levelId}/boss`);
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-quest-primary to-quest-secondary hover:from-indigo-600 hover:to-violet-600 text-white shadow-lg shadow-quest-primary/30 transition"
            >
              <span>Challenge Boss Battle</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to={`/levels/${levelId}/lesson`}
              onClick={() => sound.playClick()}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-quest-primary hover:bg-indigo-600 text-white transition"
            >
              <BookOpen className="w-4 h-4" />
              <span>Review Lessons</span>
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn pb-16">
      
      {/* Quiz Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/levels"
          onClick={() => sound.playClick()}
          className="inline-flex items-center gap-1.5 text-xs text-quest-muted hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Quiz</span>
        </Link>

        {/* Progress Tracker */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-quest-muted">
            Question {currentIndex + 1} of {activeQuestions.length}
          </span>
          <div className="w-28 h-2 bg-quest-card rounded-full overflow-hidden border border-quest-border/40">
            <div 
              className="h-full bg-gradient-to-r from-quest-primary to-quest-secondary rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="glass-panel p-6 lg:p-8 rounded-3xl border border-quest-border/60 space-y-6">
        
        {/* Badges Bar: Source & Topic & Difficulty */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
              currentQ.source === 'original-quiz'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : currentQ.source === 'original-lab'
                ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                : currentQ.source === 'lecture-based'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-quest-card text-quest-muted border-quest-border/40'
            }`}>
              {currentQ.source === 'original-quiz' ? 'Authentic Exam Question' : currentQ.source === 'original-lab' ? 'Authentic Lab' : currentQ.source === 'lecture-based' ? 'Lecture Core' : 'Practice Extension'}
            </span>

            {currentQ.sourceRef && (
              <span className="text-[10px] text-quest-muted font-mono hidden sm:inline">
                {currentQ.sourceRef}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-quest-surface text-gray-300 border border-quest-border/30 font-mono">
              {currentQ.topic}
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${
              currentQ.difficulty === 'trap'
                ? 'bg-rose-500/20 text-rose-400'
                : currentQ.difficulty === 'hard'
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              {currentQ.difficulty}
            </span>
          </div>
        </div>

        {/* Prompt */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white whitespace-pre-wrap leading-relaxed">
            {currentQ.prompt}
          </h2>

          {/* Code Snippet if present */}
          {currentQ.codeSnippet && (
            <div className="rounded-2xl overflow-hidden border border-quest-border/60 bg-[#0B0F19]">
              <pre className="p-4 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                <code>{currentQ.codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Options Selection */}
        <div className="space-y-3 pt-2">
          {currentQ.options?.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctAnswer;
            
            let btnClasses = 'border-quest-border/60 bg-quest-card/50 text-gray-200 hover:bg-quest-border/70 hover:border-quest-primary/60';
            
            if (isAnswerSubmitted) {
              if (isCorrect) {
                btnClasses = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold shadow-md shadow-emerald-500/10';
              } else if (isSelected && !isCorrect) {
                btnClasses = 'bg-rose-500/20 border-rose-500 text-rose-200 line-through';
              } else {
                btnClasses = 'opacity-40 bg-quest-surface border-quest-border/30 text-quest-muted';
              }
            } else if (isSelected) {
              btnClasses = 'bg-quest-primary/20 border-quest-primary text-white font-semibold ring-1 ring-quest-primary';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswerSubmitted}
                className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition flex items-center justify-between gap-3 ${btnClasses}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 ${
                    isSelected ? 'bg-quest-primary text-white' : 'bg-quest-surface text-quest-muted'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>

                {isAnswerSubmitted && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                )}
                {isAnswerSubmitted && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Post-Answer Explanation Card */}
        {isAnswerSubmitted && (
          <div className="rounded-2xl p-5 border bg-quest-surface/90 border-quest-border/60 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold uppercase tracking-wider ${
                selectedOption === currentQ.correctAnswer ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {selectedOption === currentQ.correctAnswer ? '✓ Correct Answer' : '✗ Incorrect'}
              </span>
              <span className="text-[11px] text-quest-muted">Professor\'s Rationale</span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              {currentQ.explanation}
            </p>

            {currentQ.trapWarning && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-400 mt-0.5" />
                <span><strong>Exam Trap:</strong> {currentQ.trapWarning}</span>
              </div>
            )}
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-quest-border/50">
          <div className="text-xs text-quest-muted font-mono">
            Score: <strong className="text-white">{score}</strong> / {currentIndex + (isAnswerSubmitted ? 1 : 0)}
          </div>

          {!isAnswerSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-quest-primary hover:bg-indigo-600 text-white transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-quest-primary/20"
            >
              Confirm Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-quest-primary to-quest-secondary hover:from-indigo-600 hover:to-violet-600 text-white transition shadow-md shadow-quest-primary/30"
            >
              <span>{currentIndex < activeQuestions.length - 1 ? 'Next Question' : 'View Results'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
