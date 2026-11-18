import React, { useState } from 'react';
import { MonacoCodeEditor } from '../components/code/MonacoCodeEditor';
import { ALL_CODING_CHALLENGES, CodingChallenge } from '../data/codingChallenges';
import { sound } from '../utils/soundEffects';
import { 
  Code2, 
  Terminal, 
  Sparkles, 
  Zap, 
  Flame, 
  Filter, 
  Layers, 
  Cpu, 
  PenTool, 
  CheckCircle2, 
  BookOpen,
  HelpCircle
} from 'lucide-react';

export const CodingArenaView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedChallenge, setSelectedChallenge] = useState<CodingChallenge>(ALL_CODING_CHALLENGES[0]);
  const [isScratchMode, setIsScratchMode] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);

  const categories = [
    { id: 'all', label: 'All Labs', icon: Layers },
    { id: 'flutter-widgets', label: 'Flutter Widgets & Layout', icon: Code2 },
    { id: 'flutter-stateful', label: 'Flutter State & Forms', icon: Flame },
    { id: 'flutter-async-nav', label: 'Async & Navigation', icon: Sparkles },
    { id: 'scratch', label: 'Code From Zero 🔥', icon: PenTool },
    { id: 'foundations', label: 'Core Dart Revision', icon: Cpu },
    { id: 'patterns', label: 'Design Patterns', icon: Layers },
    { id: 'sandbox', label: 'Free Playground', icon: Terminal },
  ];

  const filteredChallenges = ALL_CODING_CHALLENGES.filter((c) => {
    if (selectedCategory === 'all') return true;
    return c.category === selectedCategory;
  });

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Intermediate':
        return 'text-sky-400 bg-sky-500/10 border-sky-500/30';
      case 'Advanced':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Hard':
        return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      default:
        return 'text-quest-muted bg-quest-card border-quest-border';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Code2 className="w-8 h-8 text-quest-primary" />
            <span>Dart Coding Arena & Zero Lab</span>
          </h1>
          <p className="text-sm text-quest-muted mt-1">
            Write, compile, and execute pure Dart 3 code with real-time test feedback. Challenge yourself with long enterprise tasks or code completely from zero.
          </p>
        </div>

        {/* Global Scratch Mode Toggle */}
        <div className="flex items-center gap-3 glass-card px-4 py-2 rounded-2xl border border-quest-border/60">
          <div className="flex items-center gap-2">
            <PenTool className="w-4 h-4 text-quest-accent" />
            <span className="text-xs font-bold text-white">Code From Zero Mode:</span>
          </div>
          <button
            onClick={() => {
              setIsScratchMode(!isScratchMode);
              sound.playClick();
            }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              isScratchMode ? 'bg-quest-accent' : 'bg-quest-card border border-quest-border'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isScratchMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                sound.playClick();
                // Select first challenge in this category if current doesn't match
                const match = ALL_CODING_CHALLENGES.find((c) => cat.id === 'all' || c.category === cat.id);
                if (match) setSelectedChallenge(match);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                isActive
                  ? 'bg-quest-primary text-white shadow-lg shadow-quest-primary/20'
                  : 'glass-card text-quest-muted hover:text-white hover:bg-quest-border/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Challenge Selector (1 col) + Monaco Editor (3 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left: Challenge Selector List */}
        <div className="glass-panel p-4 rounded-3xl border border-quest-border/60 space-y-2 h-[720px] overflow-y-auto">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-quest-muted px-2 py-1">
            <span>Challenges ({filteredChallenges.length})</span>
            {isScratchMode && <span className="text-amber-400 text-[10px]">Zero Scaffold</span>}
          </div>

          {filteredChallenges.map((chal) => {
            const isSelected = chal.id === selectedChallenge.id;
            return (
              <button
                key={chal.id}
                onClick={() => {
                  setSelectedChallenge(chal);
                  sound.playClick();
                }}
                className={`w-full text-left p-3.5 rounded-2xl transition border text-xs ${
                  isSelected
                    ? 'glass-panel-glow border-quest-primary text-white font-semibold'
                    : 'glass-card border-quest-border/40 text-quest-muted hover:text-white hover:bg-quest-border/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white line-clamp-1">{chal.title}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${getDifficultyColor(chal.difficulty)}`}>
                    {chal.difficulty}
                  </span>
                </div>
                <p className="text-[11px] text-quest-muted line-clamp-2">
                  {chal.description}
                </p>
                <div className="mt-2 flex items-center gap-2 text-[10px] text-quest-primary font-mono">
                  <span>{chal.testCases.length} unit tests</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Monaco Editor Arena & Instructions */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Challenge Requirements Header Banner */}
          <div className="glass-panel p-4 rounded-2xl border border-quest-border/60 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-mono font-bold ${getDifficultyColor(selectedChallenge.difficulty)}`}>
                  {selectedChallenge.difficulty}
                </span>
                <span className="text-xs text-quest-muted uppercase tracking-wider font-mono">
                  Category: {selectedChallenge.category}
                </span>
                {isScratchMode && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                    Code From Zero Active
                  </span>
                )}
              </div>
              <h2 className="text-lg font-bold text-white">{selectedChallenge.title}</h2>
              <p className="text-xs text-quest-muted">{selectedChallenge.description}</p>
            </div>

            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="px-3 py-1.5 rounded-xl glass-card text-xs text-quest-muted hover:text-white transition flex items-center gap-1.5 whitespace-nowrap"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showInstructions ? 'Hide Specs' : 'View Specs'}</span>
            </button>
          </div>

          {/* Collapsible Requirements Checklist */}
          {showInstructions && selectedChallenge.instructions.length > 0 && (
            <div className="glass-panel p-4 rounded-2xl border border-quest-border/50 bg-quest-card/30 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-quest-primary flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Technical Requirements & Assertions</span>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-300">
                {selectedChallenge.instructions.map((inst, i) => (
                  <li key={i} className="flex items-start gap-2 bg-quest-surface/40 p-2 rounded-xl border border-quest-border/30">
                    <CheckCircle2 className="w-3.5 h-3.5 text-quest-primary shrink-0 mt-0.5" />
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Monaco Editor Component */}
          <div className="h-[620px]">
            <MonacoCodeEditor
              key={`${selectedChallenge.id}-${isScratchMode ? 'zero' : 'scaffold'}`}
              initialCode={isScratchMode ? selectedChallenge.zeroScratchCode : selectedChallenge.starterCode}
              testCases={selectedChallenge.testCases}
              title={`${selectedChallenge.title} ${isScratchMode ? '(From Zero)' : ''}`}
              subtitle={selectedChallenge.description}
            />
          </div>

        </div>

      </div>

    </div>
  );
};
