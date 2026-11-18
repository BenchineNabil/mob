import React from 'react';
import { Link } from 'react-router-dom';
import { useProgressionStore } from '../store/progressionStore';
import { LEVELS } from '../data/levels/levelsData';
import { sound } from '../utils/soundEffects';
import { 
  Lock, 
  CheckCircle2, 
  Trophy, 
  BookOpen, 
  HelpCircle, 
  Gamepad2, 
  ChevronRight,
  Flame,
  Zap,
  Sparkles
} from 'lucide-react';

export const LevelMapView: React.FC = () => {
  const { levels, currentLevelId, isLevelUnlocked } = useProgressionStore();

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Curriculum Level Map</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-quest-primary/20 text-quest-primary border border-quest-primary/30">
              8 Progressive Stages
            </span>
          </h1>
          <p className="text-sm text-quest-muted mt-1">
            Complete the theory lessons, score &ge;70% on the level quiz, and defeat the boss challenge to unlock each subsequent level.
          </p>
        </div>
      </div>

      {/* Level Cards Progression Path */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {LEVELS.map((level) => {
          const unlocked = isLevelUnlocked(level.id);
          const status = levels[level.id];
          const isCompleted = status?.isBossDefeated;
          const isCurrent = level.id === currentLevelId;

          return (
            <div
              key={level.id}
              className={`rounded-3xl p-6 transition-all relative overflow-hidden border ${
                isCompleted
                  ? 'glass-panel border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                  : unlocked
                  ? isCurrent
                    ? 'glass-panel-glow border-quest-primary'
                    : 'glass-panel border-quest-border/60 hover:border-quest-border'
                  : 'bg-quest-surface/40 border-quest-border/20 opacity-60'
              }`}
            >
              {/* Top Row: Badge & Status */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : unlocked
                      ? 'bg-quest-primary/20 text-quest-primary'
                      : 'bg-quest-card text-quest-muted'
                  }`}>
                    {level.id}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      {level.title}
                      {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </h3>
                    <p className="text-xs text-quest-muted">{level.subtitle}</p>
                  </div>
                </div>

                {!unlocked ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-quest-card text-quest-muted text-xs border border-quest-border/40">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Locked</span>
                  </div>
                ) : isCompleted ? (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Done</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Active Level</span>
                  </div>
                )}
              </div>

              {/* Lecture Reference & Description */}
              <div className="space-y-3 mb-5">
                <div className="text-[11px] font-mono text-quest-primary bg-quest-surface px-2.5 py-1 rounded-md inline-block border border-quest-border/40">
                  {level.lectureRef}
                </div>
                <p className="text-xs text-quest-muted leading-relaxed">
                  {level.description}
                </p>
              </div>

              {/* Topics Tag List */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {level.topics.slice(0, 4).map((topic, i) => (
                  <span 
                    key={i} 
                    className="text-[10px] px-2 py-0.5 rounded bg-quest-card text-gray-300 border border-quest-border/30 font-mono"
                  >
                    {topic}
                  </span>
                ))}
                {level.topics.length > 4 && (
                  <span className="text-[10px] px-1.5 py-0.5 text-quest-muted">
                    +{level.topics.length - 4} more
                  </span>
                )}
              </div>

              {/* Action Buttons Hub */}
              {unlocked ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-quest-border/40">
                  <Link
                    to={`/levels/${level.id}/lesson`}
                    onClick={() => sound.playClick()}
                    className={`py-2 px-2.5 rounded-xl text-center text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                      status?.isLessonsCompleted
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                        : 'bg-quest-card hover:bg-quest-border text-white border border-quest-border/50'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Lessons</span>
                  </Link>

                  <Link
                    to={`/levels/${level.id}/quiz`}
                    onClick={() => sound.playClick()}
                    className={`py-2 px-2.5 rounded-xl text-center text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                      status?.isQuizPassed
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                        : status?.isLessonsCompleted
                        ? 'bg-quest-card hover:bg-quest-border text-white border border-quest-border/50'
                        : 'opacity-50 pointer-events-none bg-quest-surface text-quest-muted'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Quiz</span>
                  </Link>

                  <Link
                    to={`/levels/${level.id}/games`}
                    onClick={() => sound.playClick()}
                    className="py-2 px-2.5 rounded-xl text-center text-xs font-semibold bg-quest-card hover:bg-quest-border text-white border border-quest-border/50 transition flex items-center justify-center gap-1.5"
                  >
                    <Gamepad2 className="w-3.5 h-3.5" />
                    <span>Games (3)</span>
                  </Link>

                  <Link
                    to={`/levels/${level.id}/boss`}
                    onClick={() => sound.playClick()}
                    className={`py-2 px-2.5 rounded-xl text-center text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                      status?.isBossDefeated
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                        : status?.isQuizPassed
                        ? 'bg-gradient-to-r from-quest-primary to-quest-secondary text-white shadow-md'
                        : 'opacity-50 pointer-events-none bg-quest-surface text-quest-muted'
                    }`}
                  >
                    {status?.isBossDefeated ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Trophy className="w-3.5 h-3.5" />
                    )}
                    <span>{status?.isBossDefeated ? 'Boss (Done)' : 'Boss'}</span>
                  </Link>
                </div>
              ) : (
                <div className="py-2 text-center text-xs text-quest-muted border-t border-quest-border/20 flex items-center justify-center gap-2">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Defeat Level {level.id - 1} Boss to unlock</span>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
