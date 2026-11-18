import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { LEVELS } from '../data/levels/levelsData';
import { useProgressionStore } from '../store/progressionStore';
import { MonacoCodeEditor } from '../components/code/MonacoCodeEditor';
import { sound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowLeft, 
  Clock, 
  Sparkles,
  Lock,
  ChevronRight
} from 'lucide-react';

export const BossFightView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const levelId = parseInt(id || '1', 10);
  
  const { canFightBoss, defeatBoss, levels } = useProgressionStore();
  const level = LEVELS.find((l) => l.id === levelId);
  const boss = level?.bossChallenge;
  const isAlreadyDefeated = levels[levelId]?.isBossDefeated;

  const [hasWon, setHasWon] = useState(false);

  // Route Guard: Boss unlocks only after passing level quiz
  if (!canFightBoss(levelId)) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Boss Encounter Locked</h2>
        <p className="text-sm text-quest-muted">
          You must score &ge;{level?.passingScorePercent}% on the Level {levelId} Quiz to earn the right to challenge {boss?.bossName || 'the Boss'}.
        </p>
        <Link
          to={`/levels/${levelId}/quiz`}
          className="inline-block px-5 py-2.5 rounded-xl bg-quest-primary text-white font-semibold text-xs"
        >
          Go to Level {levelId} Quiz
        </Link>
      </div>
    );
  }

  if (!level || !boss) return <div>Boss encounter not found.</div>;

  const handleBossVictory = () => {
    defeatBoss(levelId, 300);
    setHasWon(true);
    sound.playFanfare();
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.5 },
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn pb-16">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/levels"
          onClick={() => sound.playClick()}
          className="inline-flex items-center gap-1.5 text-xs text-quest-muted hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Level Map</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400">
          <ShieldAlert className="w-4 h-4" />
          <span>Boss Trial Encounter</span>
        </div>
      </div>

      {/* Boss Intro Lore Card */}
      <div className="glass-panel-glow p-6 lg:p-8 rounded-3xl border border-rose-500/40 relative overflow-hidden space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Level {levelId} Boss Encounter
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-white mt-1">
              {boss.title}: {boss.bossName}
            </h1>
            <p className="text-xs font-mono text-quest-muted mt-0.5">
              {boss.bossTitle}
            </p>
          </div>

          {(isAlreadyDefeated || hasWon) && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Boss Defeated! Next Level Unlocked</span>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-300 italic border-l-2 border-rose-500 pl-3">
          "{boss.lore}"
        </p>

        {/* Requirements */}
        <div className="bg-quest-surface/90 p-4 rounded-2xl border border-quest-border/40 space-y-2">
          <div className="text-xs font-bold text-white uppercase tracking-wider">
            Boss Trial Requirements:
          </div>
          <ul className="text-xs text-gray-300 space-y-1 list-disc list-inside">
            {boss.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Code Editor Arena */}
      <div className="h-[620px]">
        <MonacoCodeEditor
          initialCode={boss.starterCode}
          solutionCode={boss.solutionCode}
          testCases={boss.testCases}
          title={`${boss.bossName} • Challenge Arena`}
          subtitle="Implement the requirements and pass all unit tests to conquer this level."
          onSuccess={handleBossVictory}
        />
      </div>

      {/* Victory Celebration Modal */}
      {hasWon && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-panel-glow max-w-md w-full p-8 rounded-3xl border border-emerald-500/50 text-center space-y-5 animate-scaleUp">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <Trophy className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Victory!</span>
              <h3 className="text-2xl font-black text-white">{boss.bossName} Defeated!</h3>
              <p className="text-xs text-quest-muted">
                You proved your mastery of Level {levelId}. Next level has been unlocked on your Level Map!
              </p>
            </div>

            <div className="p-3 bg-quest-surface rounded-xl border border-quest-border/40 flex items-center justify-around font-mono text-xs">
              <div>
                <div className="text-quest-muted">Reward</div>
                <div className="text-amber-400 font-bold">+300 XP</div>
              </div>
              <div className="w-px h-6 bg-quest-border" />
              <div>
                <div className="text-quest-muted">Status</div>
                <div className="text-emerald-400 font-bold">Level {levelId + 1} Unlocked</div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Link
                to="/levels"
                onClick={() => sound.playClick()}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold glass-card hover:bg-quest-border text-white border border-quest-border/60 transition"
              >
                Level Map
              </Link>
              {levelId < 8 ? (
                <Link
                  to={`/levels/${levelId + 1}/lesson`}
                  onClick={() => sound.playClick()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-quest-primary to-quest-secondary hover:from-indigo-600 hover:to-violet-600 text-white shadow-lg shadow-quest-primary/30 transition"
                >
                  <span>Advance to Level {levelId + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <Link
                  to="/exam"
                  onClick={() => sound.playClick()}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-quest-primary to-quest-secondary text-white shadow-lg transition"
                >
                  <span>Enter Final Exam</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
