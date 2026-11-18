import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LEVELS } from '../data/levels/levelsData';
import { MINI_GAME_PACKS, MiniGameQuestion } from '../data/miniGamesData';
import { useProgressionStore } from '../store/progressionStore';
import { sound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { 
  Gamepad2, 
  ArrowLeft, 
  Trophy, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Sparkles,
  Zap,
  Timer,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  HelpCircle
} from 'lucide-react';

export const GameView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const levelId = parseInt(id || '1', 10);
  
  const { levels, completeMiniGame } = useProgressionStore();
  const level = LEVELS.find((l) => l.id === levelId) || LEVELS[0];
  const miniGames = level.miniGames || [];

  const [selectedGameId, setSelectedGameId] = useState<string>(miniGames[0]?.id || '');
  const activeGame = miniGames.find((g) => g.id === selectedGameId) || miniGames[0];

  // Specific mini-game state
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'won' | 'lost'>('intro');
  const [currentScore, setCurrentScore] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(60);

  // Active question pack for choice-based mini-games
  const currentPack: MiniGameQuestion[] = MINI_GAME_PACKS[activeGame?.id] 
    || MINI_GAME_PACKS[`game-${levelId}-1`] 
    || MINI_GAME_PACKS['game-1-1'];

  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  // Tic-Tac-Toe State
  const [tttBoard, setTttBoard] = useState<string[]>(Array(9).fill(''));
  const [tttTurn, setTttTurn] = useState<'X' | 'O'>('X');
  const [tttWinner, setTttWinner] = useState<string | null>(null);

  // Water Sort Puzzle State
  const [tubes, setTubes] = useState<string[][]>([
    ['#3B82F6', '#EF4444', '#10B981', '#3B82F6'], // Tube 1
    ['#EF4444', '#10B981', '#3B82F6', '#EF4444'], // Tube 2
    ['#10B981', '#3B82F6', '#EF4444', '#10B981'], // Tube 3
    [], // Tube 4 (empty)
  ]);
  const [selectedTube, setSelectedTube] = useState<number | null>(null);

  // Timer countdown when playing
  useEffect(() => {
    let interval: any = null;
    if (gameState === 'playing' && timerSeconds > 0 && !isAnswerSubmitted) {
      interval = setInterval(() => {
        setTimerSeconds((t) => t - 1);
      }, 1000);
    } else if (timerSeconds === 0 && gameState === 'playing' && !isAnswerSubmitted) {
      setGameState('lost');
      sound.playError();
    }
    return () => clearInterval(interval);
  }, [gameState, timerSeconds, isAnswerSubmitted]);

  const handleStartGame = () => {
    setGameState('playing');
    setCurrentScore(0);
    setTimerSeconds(90); // 90 seconds
    setCurrentRoundIndex(0);
    setUserChoice(null);
    setIsAnswerSubmitted(false);
    setTttBoard(Array(9).fill(''));
    setTttTurn('X');
    setTttWinner(null);
    sound.playClick();
  };

  const handleWinGame = () => {
    setGameState('won');
    completeMiniGame(levelId, activeGame.id, activeGame.xpReward);
    sound.playFanfare();
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Choice-based Game Handler (Type Detective, Layout, Null Safety, Event Loop, etc.)
  const handleSelectChoice = (choiceKey: string) => {
    if (isAnswerSubmitted) return; // Prevent multiple clicks

    setUserChoice(choiceKey);
    setIsAnswerSubmitted(true);

    const currentQuestion = currentPack[currentRoundIndex];
    const isCorrect = choiceKey === currentQuestion.correctAnswer;

    if (isCorrect) {
      sound.playSuccess();
      setCurrentScore((s) => s + 25);
    } else {
      sound.playError();
    }
  };

  const handleContinueNextRound = () => {
    sound.playClick();
    if (currentRoundIndex < currentPack.length - 1) {
      setCurrentRoundIndex((r) => r + 1);
      setUserChoice(null);
      setIsAnswerSubmitted(false);
    } else {
      // Completed all rounds in this mini-game pack!
      handleWinGame();
    }
  };

  // Tic-Tac-Toe Handler
  const handleTttClick = (idx: number) => {
    if (tttBoard[idx] !== '' || tttWinner || gameState !== 'playing') return;

    sound.playClick();
    const nextBoard = [...tttBoard];
    nextBoard[idx] = tttTurn;
    setTttBoard(nextBoard);

    const winner = checkTttWinner(nextBoard);
    if (winner) {
      setTttWinner(winner);
      handleWinGame();
    } else if (!nextBoard.includes('')) {
      setTttWinner('Draw');
      sound.playSuccess();
    } else {
      setTttTurn(tttTurn === 'X' ? 'O' : 'X');
    }
  };

  const checkTttWinner = (b: string[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
      if (b[line[0]] && b[line[0]] === b[line[1]] && b[line[0]] === b[line[2]]) {
        return b[line[0]];
      }
    }
    return null;
  };

  // Water Sort Tube Click Handler
  const handleTubeClick = (tubeIdx: number) => {
    if (gameState !== 'playing') return;
    sound.playClick();

    if (selectedTube === null) {
      if (tubes[tubeIdx].length > 0) {
        setSelectedTube(tubeIdx);
      }
    } else if (selectedTube === tubeIdx) {
      setSelectedTube(null);
    } else {
      const from = [...tubes[selectedTube]];
      const to = [...tubes[tubeIdx]];

      if (to.length < 4) {
        const topColor = from[from.length - 1];
        if (to.length === 0 || to[to.length - 1] === topColor) {
          to.push(from.pop()!);
          const nextTubes = [...tubes];
          nextTubes[selectedTube] = from;
          nextTubes[tubeIdx] = to;
          setTubes(nextTubes);
          setSelectedTube(null);

          const isAllUniform = nextTubes.every((t) => t.length === 0 || (t.length === 4 && t.every((c) => c === t[0])));
          if (isAllUniform) {
            handleWinGame();
          }
        } else {
          sound.playError();
          setSelectedTube(null);
        }
      } else {
        sound.playError();
        setSelectedTube(null);
      }
    }
  };

  const currentQ = currentPack[currentRoundIndex] || currentPack[0];
  const isCurrentCorrect = userChoice === currentQ?.correctAnswer;
  const correctOptionObj = currentQ?.options?.find((o) => o.key === currentQ.correctAnswer);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-16">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/levels"
          onClick={() => sound.playClick()}
          className="inline-flex items-center gap-1.5 text-xs text-quest-muted hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Level Map</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-quest-primary/20 text-quest-primary border border-quest-primary/30">
          <Gamepad2 className="w-4 h-4" />
          <span>Interactive Mini-Game Arena</span>
        </div>
      </div>

      {/* Mini-Games Selector Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {miniGames.map((game) => {
          const isSelected = game.id === selectedGameId;
          const isCompleted = levels[levelId]?.completedGames?.includes(game.id);

          return (
            <button
              key={game.id}
              onClick={() => {
                setSelectedGameId(game.id);
                setGameState('intro');
                setUserChoice(null);
                setIsAnswerSubmitted(false);
                sound.playClick();
              }}
              className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                isSelected
                  ? 'glass-panel-glow border-quest-primary ring-1 ring-quest-primary/40'
                  : 'glass-panel border-quest-border/60 hover:border-quest-border'
              }`}
            >
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{game.title}</span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div className="text-[11px] text-quest-muted mt-0.5">{game.subtitle}</div>
              </div>
              <span className="font-mono text-xs font-bold text-amber-400">+{game.xpReward} XP</span>
            </button>
          );
        })}
      </div>

      {/* Active Game Canvas */}
      <div className="glass-panel p-6 lg:p-8 rounded-3xl border border-quest-border/60 space-y-6">
        
        {/* Game Title & HUD */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-quest-border/40 pb-4">
          <div>
            <span className="text-xs font-bold text-quest-primary uppercase tracking-wider font-mono">
              Mechanic: {activeGame.mechanic}
            </span>
            <h2 className="text-2xl font-bold text-white mt-0.5">{activeGame.title}</h2>
            <p className="text-xs text-quest-muted">{activeGame.description}</p>
          </div>

          {gameState === 'playing' && (
            <div className="flex items-center gap-4 bg-quest-surface px-4 py-2 rounded-2xl border border-quest-border/40 font-mono text-xs">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Timer className="w-4 h-4" />
                <span>{timerSeconds}s</span>
              </div>
              <div className="w-px h-4 bg-quest-border" />
              <div className="text-emerald-400 font-bold">Score: {currentScore} XP</div>
            </div>
          )}
        </div>

        {/* Intro View */}
        {gameState === 'intro' && (
          <div className="py-10 text-center space-y-5 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-quest-primary/20 text-quest-primary flex items-center justify-center mx-auto shadow-lg shadow-quest-primary/20">
              <Gamepad2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Objective & Rules</h3>
              <ul className="text-xs text-quest-muted space-y-1 list-disc list-inside text-left bg-quest-surface p-4 rounded-xl border border-quest-border/40">
                {activeGame.instructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleStartGame}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-quest-primary to-quest-secondary hover:from-indigo-600 hover:to-violet-600 text-white shadow-lg shadow-quest-primary/30 transition hover:scale-105"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Game</span>
            </button>
          </div>
        )}

        {/* Playing View: Dynamic Game Mechanics */}
        {gameState === 'playing' && (
          <div className="py-2">
            
            {/* Mechanic 1: Tic-Tac-Toe Game */}
            {activeGame.mechanic.includes('tic-tac-toe') ? (
              <div className="max-w-xs mx-auto space-y-4 text-center">
                <div className="text-xs font-bold text-white">Current Turn: Player {tttTurn}</div>
                <div className="grid grid-cols-3 gap-2 aspect-square">
                  {tttBoard.map((cell, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTttClick(idx)}
                      className="bg-quest-card/80 hover:bg-quest-border/80 border border-quest-border/60 rounded-xl flex items-center justify-center text-3xl font-black transition text-white"
                    >
                      {cell}
                    </button>
                  ))}
                </div>
                {tttWinner && (
                  <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                    {tttWinner === 'Draw' ? 'Game ended in a draw!' : `Player ${tttWinner} Wins!`}
                  </div>
                )}
              </div>
            ) : activeGame.mechanic.includes('water-sort') ? (
              /* Mechanic 2: Water Sort Puzzle */
              <div className="max-w-md mx-auto space-y-6 text-center">
                <div className="text-xs text-quest-muted">Tap a tube to select top color, then tap another tube with room to pour.</div>
                <div className="flex justify-around items-end h-48">
                  {tubes.map((tube, tIdx) => (
                    <button
                      key={tIdx}
                      onClick={() => handleTubeClick(tIdx)}
                      className={`w-14 h-40 border-2 rounded-b-2xl p-1 flex flex-col-reverse gap-1 transition ${
                        selectedTube === tIdx ? 'border-quest-primary ring-2 ring-quest-primary/50' : 'border-quest-border/60 bg-quest-surface/50'
                      }`}
                    >
                      {tube.map((color, cIdx) => (
                        <div
                          key={cIdx}
                          className="w-full h-8 rounded-md transition-all"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Mechanic 3: Interactive Choice & Inspection Challenge (All Other Mini-Games) */
              <div className="max-w-xl mx-auto space-y-5">
                
                {/* Round Progress Indicator */}
                <div className="flex items-center justify-between text-xs text-quest-muted font-mono">
                  <span>Round {currentRoundIndex + 1} of {currentPack.length}</span>
                  <span>{currentRoundIndex + 1}/{currentPack.length} Completed</span>
                </div>

                {/* Question Prompt */}
                <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                  {currentQ.prompt}
                </h3>

                {/* Code Snippet if present */}
                {currentQ.codeSnippet && (
                  <div className="rounded-2xl overflow-hidden border border-quest-border/60 bg-[#0B0F19]">
                    <pre className="p-4 font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto leading-relaxed whitespace-pre">
                      <code>{currentQ.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                {/* Interactive Option Buttons */}
                <div className="space-y-2.5">
                  {currentQ.options.map((opt) => {
                    const isChosen = userChoice === opt.key;
                    const isCorrect = opt.key === currentQ.correctAnswer;

                    // Compute dynamic button styling based on submission state
                    let btnStyle = 'bg-quest-card/60 border-quest-border/60 hover:bg-quest-border/60 text-white';

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        // The correct answer is always highlighted in green
                        btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40 font-bold';
                      } else if (isChosen && !isCorrect) {
                        // The user's incorrect choice is highlighted in red
                        btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-200 ring-2 ring-rose-500/40 line-through';
                      } else {
                        // Other options dimmed
                        btnStyle = 'opacity-40 border-quest-border/40 text-quest-muted';
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectChoice(opt.key)}
                        disabled={isAnswerSubmitted}
                        className={`w-full p-4 rounded-2xl border text-xs sm:text-sm transition flex items-center justify-between text-left ${btnStyle}`}
                      >
                        <span className="font-medium">{opt.label}</span>

                        {isAnswerSubmitted && (
                          <span className="shrink-0 ml-3">
                            {isCorrect && (
                              <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Correct Answer</span>
                              </span>
                            )}
                            {isChosen && !isCorrect && (
                              <span className="flex items-center gap-1 text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/30">
                                <XCircle className="w-3.5 h-3.5" />
                                <span>Your Choice</span>
                              </span>
                            )}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Educational Feedback Banner (Shows whether correct or not + why) */}
                {isAnswerSubmitted && (
                  <div className={`p-5 rounded-2xl border animate-fadeIn space-y-3 ${
                    isCurrentCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-950/20'
                      : 'bg-rose-950/40 border-rose-500/50 shadow-lg shadow-rose-950/20'
                  }`}>
                    
                    {/* Status Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isCurrentCorrect ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            <span className="text-sm font-bold text-emerald-300">
                              ✓ Correct! Excellent analysis.
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-rose-400" />
                            <span className="text-sm font-bold text-rose-300">
                              ✗ Incorrect Choice
                            </span>
                          </>
                        )}
                      </div>

                      <span className="text-xs font-mono font-bold text-amber-400">
                        {isCurrentCorrect ? '+25 XP' : '+0 XP'}
                      </span>
                    </div>

                    {/* What is the correct answer */}
                    {!isCurrentCorrect && correctOptionObj && (
                      <div className="text-xs font-semibold text-emerald-300 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>The correct answer is: <strong>{correctOptionObj.label}</strong></span>
                      </div>
                    )}

                    {/* Detailed Technical Explanation */}
                    <div className="text-xs text-gray-200 leading-relaxed bg-quest-surface/60 p-3 rounded-xl border border-quest-border/40">
                      <div className="font-semibold text-quest-primary flex items-center gap-1.5 mb-1">
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Concept Explanation:</span>
                      </div>
                      <p>{currentQ.explanation}</p>
                    </div>

                    {/* Exam Trap Warning (if present) */}
                    {currentQ.trapNote && (
                      <div className="text-xs text-amber-300 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/30 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <strong>Exam Trap Warning:</strong> {currentQ.trapNote}
                        </div>
                      </div>
                    )}

                    {/* Advance to Next Round Button */}
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={handleContinueNextRound}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-quest-primary to-quest-secondary hover:from-indigo-600 hover:to-violet-600 text-white shadow-lg shadow-quest-primary/30 transition hover:scale-105"
                      >
                        <span>{currentRoundIndex < currentPack.length - 1 ? 'Next Round' : 'Complete Challenge'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                )}

              </div>
            )}

          </div>
        )}

        {/* Won State */}
        {gameState === 'won' && (
          <div className="py-10 text-center space-y-4 max-w-sm mx-auto animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">Challenge Completed!</h3>
            <p className="text-xs text-quest-muted">
              You mastered the {activeGame.title} mini-game and earned <strong>+{activeGame.xpReward} XP</strong>!
            </p>
            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={handleStartGame}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold glass-card hover:bg-quest-border text-white border border-quest-border/60 transition"
              >
                Play Again
              </button>
              <Link
                to="/levels"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-quest-primary text-white transition shadow-md"
              >
                Level Map
              </Link>
            </div>
          </div>
        )}

        {/* Lost / Timeout State */}
        {gameState === 'lost' && (
          <div className="py-10 text-center space-y-4 max-w-sm mx-auto">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <XCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white">Time Expired!</h3>
            <p className="text-xs text-quest-muted">
              The clock ran out before completing all rounds. Try again to sharpen your speed!
            </p>
            <button
              onClick={handleStartGame}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-rose-600 text-white transition shadow-md hover:bg-rose-700"
            >
              Retry Challenge
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
