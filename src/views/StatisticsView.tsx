import React from 'react';
import { useProgressionStore } from '../store/progressionStore';
import { useExamStore } from '../store/examStore';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  BarChart3, 
  Trophy, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Zap, 
  Target 
} from 'lucide-react';

export const StatisticsView: React.FC = () => {
  const { stats } = useProgressionStore();
  const { examHistory } = useExamStore();

  // Prepare topic accuracy data for Recharts
  const topicData = Object.entries(stats.topicAccuracies).map(([topic, data]) => ({
    name: topic.length > 14 ? topic.substring(0, 12) + '...' : topic,
    fullName: topic,
    accuracy: Math.round((data.correct / (data.total || 1)) * 100),
    total: data.total,
  }));

  // Fallback demo data if no questions answered yet
  const displayTopicData = topicData.length > 0 ? topicData : [
    { name: 'Operators', fullName: 'Operators', accuracy: 85, total: 10 },
    { name: 'final/const', fullName: 'final vs const', accuracy: 60, total: 8 },
    { name: 'late Keyword', fullName: 'late Keyword', accuracy: 75, total: 6 },
    { name: 'TDD Matchers', fullName: 'TDD Matchers', accuracy: 90, total: 7 },
    { name: 'Singleton', fullName: 'Singleton Pattern', accuracy: 70, total: 5 },
    { name: 'FutureBuilder', fullName: 'FutureBuilder', accuracy: 50, total: 6 },
  ];

  const overallAccuracy = stats.totalQuestionsAnswered > 0
    ? Math.round((stats.correctAnswersCount / stats.totalQuestionsAnswered) * 100)
    : 78;

  const pieData = [
    { name: 'Correct', value: stats.correctAnswersCount || 35, color: '#10B981' },
    { name: 'Incorrect', value: (stats.totalQuestionsAnswered - stats.correctAnswersCount) || 10, color: '#EF4444' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-quest-primary" />
          <span>Performance Analytics & Metrics</span>
        </h1>
        <p className="text-sm text-quest-muted mt-1">
          Track your question accuracy, topic proficiencies, exam readiness, and diagnostic trends.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-2xl border border-quest-border/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-quest-muted mb-1">
            <Target className="w-4 h-4 text-quest-primary" />
            <span>Overall Accuracy</span>
          </div>
          <div className="text-3xl font-black text-white">{overallAccuracy}%</div>
          <div className="text-[11px] text-emerald-400 mt-1">
            {stats.correctAnswersCount} correct of {stats.totalQuestionsAnswered || 45}
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-quest-border/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-quest-muted mb-1">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Coding Challenges</span>
          </div>
          <div className="text-3xl font-black text-white">{stats.codeChallengesPassed}</div>
          <div className="text-[11px] text-quest-muted mt-1">Boss & Lab Trials Passed</div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-quest-border/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-quest-muted mb-1">
            <Clock className="w-4 h-4 text-quest-cyan" />
            <span>Exam Attempts</span>
          </div>
          <div className="text-3xl font-black text-white">{examHistory.length}</div>
          <div className="text-[11px] text-quest-muted mt-1">
            {examHistory.filter((e) => e.passed).length} Passed (&ge;70%)
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-quest-border/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-quest-muted mb-1">
            <Zap className="w-4 h-4 text-quest-secondary" />
            <span>Total XP Score</span>
          </div>
          <div className="text-3xl font-black text-white">{stats.totalXp.toLocaleString()}</div>
          <div className="text-[11px] text-quest-primary mt-1">Experience Points</div>
        </div>

      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Bar Chart: Accuracy by Topic (2 cols) */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-quest-border/60 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">Accuracy by Topic Domain</h3>
            <span className="text-xs text-quest-muted font-mono">Percentage (%)</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={displayTopicData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#9CA3AF" fontSize={11} tickLine={false} />
                <YAxis stroke="#9CA3AF" fontSize={11} domain={[0, 100]} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    borderColor: '#374151',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="accuracy" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Answer Ratio */}
        <div className="glass-panel p-6 rounded-3xl border border-quest-border/60 space-y-4 flex flex-col justify-between">
          <h3 className="text-base font-bold text-white">Answer Distribution</h3>

          <div className="h-52 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111827', 
                    borderColor: '#374151',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-around text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span>Correct ({pieData[0].value})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Incorrect ({pieData[1].value})</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
