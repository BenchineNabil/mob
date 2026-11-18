import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LEVELS } from '../data/levels/levelsData';
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
  Timer
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

  // Tic-Tac-Toe State
  const [tttBoard, setTttBoard] = useState<string[]>(ListFilled(9, ''));
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

  // Event Loop Enigma State
  const [eventSequence, setEventSequence] = useState<string[]>([]);
  const targetEventSequence = ['sync1', 'sync2', 'microtask', 'timer'];

  // Type Detective Round
  const [detectiveRound, setDetectiveRound] = useState(0);
  const detectiveQuestions = [
    { code: 'const List<int> a = [1];\na.add(2);', answer: 'runtime_crash', explanation: 'const lists are deeply immutable. add() compiles but throws Unsupported operation at runtime.' },
    { code: 'int x = 8 / 2;', answer: 'compile_error', explanation: 'Dart / division always returns double. Assigning to int fails compilation.' },
    { code: 'Student s = Student("Sara");\nprint(s.count);', answer: 'compile_error', explanation: 'Static members cannot be accessed via instance variables in Dart.' },
    { code: 'late String s;\nprint(s);', answer: 'runtime_crash', explanation: 'Reading late variables before assignment throws LateInitializationError at runtime.' },
    { code: 'final List<int> b = [1];\nb.add(2);', answer: 'success', explanation: 'final only prevents rebinding the variable; in-place mutation succeeds.' },
  ];

  function ListFilled<T>(length: number, val: T): T[] {
    return Array.from({ length }, () => val);
  }

  // Timer countdown when playing
  useEffect(() => {
    let interval: any = null;
    if (gameState === 'playing' && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((t) => t - 1);
      }, 1000);
    } else if (timerSeconds === 0 && gameState === 'playing') {
      setGameState('lost');
      sound.playError();
    }
    return () => clearInterval(interval);
  }, [gameState, timerSeconds]);

  const handleStartGame = () => {
    setGameState('playing');
    setCurrentScore(0);
    setTimerSeconds(60);
    setTttBoard(ListFilled(9, ''));
    setTttTurn('X');
    setTttWinner(null);
    setDetectiveRound(0);
    setEventSequence([]);
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
      // Attempt transfer from selectedTube to tubeIdx
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

          // Check win condition
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

  // Detective Handler
  const handleDetectiveAnswer = (choice: string) => {
    sound.playClick();
    const curr = detectiveQuestions[detectiveRound];
    if (choice === curr.answer) {
      sound.playSuccess();
      if (detectiveRound < detectiveQuestions.length - 1) {
        setDetectiveRound((r) => r + 1);
        setCurrentScore((s) => s + 20);
      } else {
        handleWinGame();
      }
    } else {
      sound.playError();
    }
  };

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
                sound.playClick();
              }}
              className={`p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                isSelected
                  ? 'glass-panel-glow border-quest-primary'
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
              <div className="text-emerald-400 font-bold">Score: {currentScore}</div>
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
          <div className="py-4">
            
            {/* Mechanic 1: Tic-Tac-Toe Game */}
            {activeGame.mechanic.includes('tic-tac-toe') || levelId === 6 ? (
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
                {tttWinner && <div className="text-xs font-bold text-emerald-400">Winner: {tttWinner}!</div>}
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
              /* Mechanic 3: Type Detective / Code Inspection Challenge */
              <div className="max-w-xl mx-auto space-y-6">
                <div className="text-xs text-quest-muted text-center">
                  Round {detectiveRound + 1} of {detectiveQuestions.length}: Classify this snippet\'s execution outcome!
                </div>

                <div className="rounded-2xl overflow-hidden border border-quest-border/60 bg-[#0B0F19]">
                  <pre className="p-4 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                    <code>{detectiveQuestions[detectiveRound].code}</code>
                  </pre>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => handleDetectiveAnswer('compile_error')}
                    className="p-3.5 rounded-xl border border-quest-border/60 bg-quest-card/50 hover:bg-quest-border text-white text-xs font-bold transition text-center"
                  >
                    Compile Error
                  </button>
                  <button
                    onClick={() => handleDetectiveAnswer('runtime_crash')}
                    className="p-3.5 rounded-xl border border-quest-border/60 bg-quest-card/50 hover:bg-quest-border text-white text-xs font-bold transition text-center"
                  >
                    Runtime Crash
                  </button>
                  <button
                    onClick={() => handleDetectiveAnswer('success')}
                    className="p-3.5 rounded-xl border border-quest-border/60 bg-quest-card/50 hover:bg-quest-border text-white text-xs font-bold transition text-center"
                  >
                    Runs Cleanly
                  </button>
                </div>
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
              The clock ran out before completing all requirements. Try again to sharpen your speed!
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
