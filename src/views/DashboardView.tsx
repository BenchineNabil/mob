import React from 'react';
import { Link } from 'react-router-dom';
import { useProgressionStore } from '../store/progressionStore';
import { LEVELS } from '../data/levels/levelsData';
import { sound } from '../utils/soundEffects';
import { 
  Play, 
  Map, 
  Trophy, 
  Zap, 
  Flame, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight,
  BookOpen,
  HelpCircle,
  GraduationCap
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { currentLevelId, stats, levels } = useProgressionStore();
  const currentLevel = LEVELS.find((l) => l.id === currentLevelId) || LEVELS[0];
  const currentStatus = levels[currentLevelId];

  // Calculate weak topics (accuracy < 60%)
  const weakTopics = Object.entries(stats.topicAccuracies)
    .filter(([_, data]) => data.total >= 2 && (data.correct / data.total) < 0.6)
    .map(([topic, data]) => ({
      topic,
      accuracy: Math.round((data.correct / data.total) * 100),
      total: data.total,
    }));

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl glass-panel-glow p-6 lg:p-8 overflow-hidden border border-quest-primary/30">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-gradient-to-br from-quest-primary/20 to-quest-secondary/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-quest-primary/20 text-quest-primary text-xs font-semibold border border-quest-primary/30">
              <Zap className="w-3.5 h-3.5" />
              <span>ENSIA Mobile Development • Prof. Imed Bouchrika</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Ready to Beat the Bouchrika Exam?
            </h1>
            <p className="text-sm text-quest-muted leading-relaxed">
              Master Dart and Flutter through 8 progressive levels, 24 interactive mini-games, and authentic exam trap simulations. No LLM, no cheat sheets — pure mastery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Link
              to={`/levels/${currentLevelId}/lesson`}
              onClick={() => sound.playClick()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-quest-primary to-quest-secondary hover:from-indigo-600 hover:to-violet-600 text-white shadow-lg shadow-quest-primary/30 hover:scale-[1.02] transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Continue Quest: Level {currentLevelId}</span>
            </Link>

            <Link
              to="/levels"
              onClick={() => sound.playClick()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm glass-card hover:bg-quest-border text-white border border-quest-border/60 transition"
            >
              <Map className="w-4 h-4" />
              <span>Level Map</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-2xl border border-quest-border/50 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{stats.totalXp.toLocaleString()}</div>
            <div className="text-xs text-quest-muted">Total XP Earned</div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-quest-border/50 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{stats.completedLevelIds.length} / 8</div>
            <div className="text-xs text-quest-muted">Levels Conquered</div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-quest-border/50 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center flex-shrink-0">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{stats.streakDays} Days</div>
            <div className="text-xs text-quest-muted">Active Streak</div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-quest-border/50 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">
              {stats.totalQuestionsAnswered > 0
                ? `${Math.round((stats.correctAnswersCount / stats.totalQuestionsAnswered) * 100)}%`
                : '100%'}
            </div>
            <div className="text-xs text-quest-muted">Overall Accuracy</div>
          </div>
        </div>

      </div>

      {/* Main Content Layout: Active Quest Card + Weak Topics + Daily Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Level Deep Dive (2 cols) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-quest-border/60 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-quest-primary uppercase tracking-wider">Current Objective</span>
              <h2 className="text-xl font-bold text-white">
                Level {currentLevel.id}: {currentLevel.title}
              </h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-quest-card text-quest-muted border border-quest-border/50">
              {currentLevel.lectureRef}
            </span>
          </div>

          <p className="text-sm text-quest-muted">
            {currentLevel.description}
          </p>

          {/* Level Topics Pills */}
          <div className="flex flex-wrap gap-2">
            {currentLevel.topics.map((topic, i) => (
              <span 
                key={i} 
                className="text-xs px-2.5 py-1 rounded-lg bg-quest-surface text-gray-300 border border-quest-border/40 font-mono"
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Level Progression Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            
            {/* Step 1: Lessons */}
            <Link
              to={`/levels/${currentLevel.id}/lesson`}
              onClick={() => sound.playClick()}
              className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                currentStatus?.isLessonsCompleted
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : 'bg-quest-card/50 border-quest-border/60 hover:border-quest-primary'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-5 h-5 text-quest-primary" />
                {currentStatus?.isLessonsCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <div>
                <div className="text-xs font-bold text-white">1. Theory & Traps</div>
                <div className="text-[11px] text-quest-muted">
                  {currentStatus?.isLessonsCompleted ? 'Completed' : 'Mandatory First Step'}
                </div>
              </div>
            </Link>

            {/* Step 2: Level Quiz */}
            <Link
              to={`/levels/${currentLevel.id}/quiz`}
              onClick={() => sound.playClick()}
              className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                currentStatus?.isQuizPassed
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : currentStatus?.isLessonsCompleted
                  ? 'bg-quest-card/50 border-quest-border/60 hover:border-quest-primary'
                  : 'opacity-50 cursor-not-allowed bg-quest-surface border-quest-border/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <HelpCircle className="w-5 h-5 text-quest-secondary" />
                {currentStatus?.isQuizPassed && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <div>
                <div className="text-xs font-bold text-white">2. Level Quiz</div>
                <div className="text-[11px] text-quest-muted">
                  {currentStatus?.isQuizPassed
                    ? `Passed (${currentStatus.quizScorePercent}%)`
                    : currentStatus?.isLessonsCompleted
                    ? 'Requires 70% to pass'
                    : 'Complete lessons first'}
                </div>
              </div>
            </Link>

            {/* Step 3: Boss Encounter */}
            <Link
              to={`/levels/${currentLevel.id}/boss`}
              onClick={() => sound.playClick()}
              className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                currentStatus?.isBossDefeated
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : currentStatus?.isQuizPassed
                  ? 'bg-quest-card/50 border-quest-accent/50 hover:border-quest-accent'
                  : 'opacity-50 cursor-not-allowed bg-quest-surface border-quest-border/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-5 h-5 text-quest-accent" />
                {currentStatus?.isBossDefeated && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
              <div>
                <div className="text-xs font-bold text-white">3. Boss Battle</div>
                <div className="text-[11px] text-quest-muted">
                  {currentStatus?.isBossDefeated
                    ? 'Boss Defeated!'
                    : currentStatus?.isQuizPassed
                    ? 'Unlocks Next Level'
                    : 'Pass quiz to unlock'}
                </div>
              </div>
            </Link>

          </div>
        </div>

        {/* Right Column: Weak Topics & Exam Quick Prep */}
        <div className="space-y-6">
          
          {/* Weak Topics Analysis Card */}
          <div className="glass-panel p-6 rounded-3xl border border-quest-border/60 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Focus Areas</span>
              </h3>
              <Link to="/traps" className="text-xs text-quest-primary hover:underline flex items-center gap-0.5">
                <span>View Traps</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {weakTopics.length === 0 ? (
              <div className="text-center py-4 space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-xs text-quest-muted">No weak topics detected yet! Keep practicing to calibrate your diagnostic scores.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {weakTopics.slice(0, 3).map((w, i) => (
                  <div key={i} className="glass-card p-3 rounded-xl border border-quest-border/40 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-white">{w.topic}</span>
                      <span className="font-mono text-rose-400 font-bold">{w.accuracy}%</span>
                    </div>
                    <div className="w-full h-1 bg-quest-surface rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 rounded-full" style={{ width: `${w.accuracy}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Exam Hall Callout */}
          <div className="glass-panel-glow p-6 rounded-3xl border border-quest-secondary/40 space-y-3 relative overflow-hidden">
            <div className="flex items-center gap-2 text-quest-secondary text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>Final Exam Ready?</span>
            </div>
            <h4 className="text-base font-bold text-white">90-Minute Timed Simulation</h4>
            <p className="text-xs text-quest-muted">
              40 min quiz + 50 min coding. 45% / 55% exam weighting. Strict negative marking on high-confidence trap errors.
            </p>
            <Link
              to="/exam"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 text-xs font-bold text-white bg-quest-secondary hover:bg-violet-600 px-4 py-2 rounded-xl transition shadow-md shadow-quest-secondary/30"
            >
              <span>Enter Exam Hall</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};
