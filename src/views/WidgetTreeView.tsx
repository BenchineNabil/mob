import React, { useState, useCallback } from 'react';
import { sound } from '../utils/soundEffects';
import {
  GitFork,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Eye,
  EyeOff,
  Lightbulb,
  ChevronDown,
  ChevronRight,
  Trophy,
  Target,
  BookOpen,
  Layers,
  Sparkles,
  Info,
  AlertTriangle,
} from 'lucide-react';

// ─────────────────────────── Types ───────────────────────────

interface WidgetNode {
  id: string;
  type: string;
  category: 'structure' | 'single-child' | 'multi-child' | 'leaf';
  properties: Record<string, string>;
  child?: WidgetNode;
  children?: WidgetNode[];
}

type SlotType = 'body' | 'appBar' | 'child' | 'children' | 'leading' | 'title';

interface UserRow {
  id: string;
  indent: number;    // 0-based indent level
  slot: string;      // e.g. "body:", "child:", "children:", "appBar:", "title:", "leading:"
  widget: string;    // e.g. "Scaffold", "AppBar", "Column", ...
  props: string;     // e.g. "mainAxisAlignment: MainAxisAlignment.spaceBetween"
}

interface ScreenExercise {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  imageUrl: string;
  description: string;
  hints: string[];
  keyConcepts: { label: string; color: string }[];
  solution: string; // canonical indented-format answer
}

// ─────────────────────────── Exercise Data ───────────────────────────

const EXERCISES: ScreenExercise[] = [
  {
    id: 'my-cart',
    title: 'My Cart Screen',
    difficulty: 'Intermediate',
    imageUrl: '/my_cart_screen.png',
    description:
      'Decompose the "My Cart" shopping screen into its Flutter widget tree. Focus on the layout: the blue AppBar, the list of items with quantity controls, the total row, and the Checkout button.',
    hints: [
      '🏗️ Hint 1 — The root: Every screen starts with Scaffold. It has an appBar: slot and a body: slot.',
      '🔵 Hint 2 — The blue bar at the top is an AppBar. AppBar has a leading: (back arrow IconButton) and a title: (Text).',
      '📋 Hint 3 — The body is a Column with several sections stacked vertically: a header Row, an item list, a Divider, a total Row, and a Checkout button.',
      '📌 Hint 4 — The "4 items / Clear all" header is a Row with mainAxisAlignment: MainAxisAlignment.spaceBetween. Its two children are Text and TextButton.',
      '📜 Hint 5 — The list of cart items needs to scroll, so it uses ListView.builder. To prevent it from taking infinite height inside a Column, wrap it in Expanded.',
      '🧩 Hint 6 — Each cart item row has 3 parts: a Container (blue icon), an Expanded Column (name + price text), and a Row (minus IconButton, quantity Text, plus IconButton).',
      '➗ Hint 7 — After the list comes a Divider, then a Row for Total with MainAxisAlignment.spaceBetween.',
      '🔘 Hint 8 — The Checkout button is a full-width ElevatedButton. Use SizedBox(width: double.infinity) wrapping the ElevatedButton to make it full width.',
    ],
    keyConcepts: [
      { label: 'Scaffold structure', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      { label: 'Expanded prevents overflow', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
      { label: 'ListView.builder in Column', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
      { label: 'Row spaceBetween layout', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
      { label: 'Full-width SizedBox trick', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
    ],
    solution: `Scaffold:
  appBar:
    AppBar:
      leading:
        IconButton (icon: Icons.arrow_back):
      title:
        Text (data: 'My Cart'):
  body:
    Column:
      children:
        Padding (padding: EdgeInsets.all(16)):
          child:
            Row (mainAxisAlignment: MainAxisAlignment.spaceBetween):
              children:
                Text (data: '4 items'):
                TextButton:
                  child:
                    Text (data: 'Clear all'):
        Expanded:
          child:
            ListView.builder:
              itemBuilder:
                Row:
                  children:
                    Container (color: Colors.blue[50]):
                      child:
                        Icon (icon: Icons.book):
                    Expanded:
                      child:
                        Column:
                          children:
                            Text (data: 'Notebook'):
                            Text (data: '250 DA'):
                    Row:
                      children:
                        IconButton (icon: Icons.remove):
                        Text (data: '2'):
                        IconButton (icon: Icons.add):
        Divider:
        Padding (padding: EdgeInsets.all(16)):
          child:
            Row (mainAxisAlignment: MainAxisAlignment.spaceBetween):
              children:
                Text (data: 'Total'):
                Text (data: '6 100 DA', style: bold):
        Padding (padding: EdgeInsets.all(16)):
          child:
            SizedBox (width: double.infinity):
              child:
                ElevatedButton:
                  child:
                    Text (data: 'Checkout'):`,
  },
];

// ─────────────────────────── Widget Catalog for autocomplete ───────────────────────────

const WIDGET_SUGGESTIONS = [
  'Scaffold', 'AppBar', 'Column', 'Row', 'Stack', 'ListView', 'ListView.builder',
  'GridView', 'Expanded', 'Flexible', 'Center', 'Container', 'SizedBox', 'Padding',
  'Card', 'Text', 'Icon', 'IconButton', 'ElevatedButton', 'TextButton', 'OutlinedButton',
  'FloatingActionButton', 'Image', 'Divider', 'CircularProgressIndicator',
  'TextField', 'DropdownButton', 'Checkbox', 'Switch', 'Slider',
  'GestureDetector', 'InkWell', 'SafeArea', 'Scaffold', 'FutureBuilder', 'StreamBuilder',
];

const SLOT_SUGGESTIONS = [
  'appBar:', 'body:', 'child:', 'children:', 'leading:', 'title:', 'trailing:',
  'floatingActionButton:', 'drawer:', 'itemBuilder:', 'actions:', 'style:', 'icon:',
];

// ─────────────────────────── Helper: score user answer ───────────────────────────

function scoreAnswer(userText: string, solution: string): {
  score: number;
  matched: string[];
  missed: string[];
  feedback: string;
} {
  const normalize = (s: string) =>
    s.toLowerCase().replace(/\s+/g, ' ').replace(/[()'"]/g, '').trim();

  const solutionLines = solution
    .split('\n')
    .map(l => normalize(l))
    .filter(Boolean);

  const userLines = userText
    .split('\n')
    .map(l => normalize(l))
    .filter(Boolean);

  const matched: string[] = [];
  const missed: string[] = [];

  for (const sol of solutionLines) {
    const found = userLines.some(u => u.includes(sol.split(' ')[0]) && sol.split(' ')[0].length > 2);
    if (found) matched.push(sol);
    else missed.push(sol);
  }

  const score = Math.round((matched.length / solutionLines.length) * 100);

  let feedback = '';
  if (score >= 90) feedback = '🏆 Excellent! You nailed the widget tree!';
  else if (score >= 70) feedback = '✅ Great work! A few widgets or slots are missing.';
  else if (score >= 50) feedback = '👍 Good start! Check the hints for the missing structure.';
  else feedback = '📚 Keep studying the hints. Try revealing them one by one!';

  return { score, matched, missed, feedback };
}

// ─────────────────────────── Main Component ───────────────────────────

export const WidgetTreeView: React.FC = () => {
  const [selectedExercise, setSelectedExercise] = useState<ScreenExercise | null>(null);
  const [mode, setMode] = useState<'browse' | 'learn' | 'practice' | 'result'>('browse');

  // Hints
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [showSolution, setShowSolution] = useState(false);

  // User answer (free-text editor)
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState<{ score: number; matched: string[]; missed: string[]; feedback: string } | null>(null);

  // Copy state
  const [copied, setCopied] = useState(false);

  const startExercise = (ex: ScreenExercise) => {
    setSelectedExercise(ex);
    setMode('learn');
    setRevealedHints(0);
    setShowSolution(false);
    setUserAnswer('');
    setResult(null);
    sound.playClick();
  };

  const goToPractice = () => {
    setMode('practice');
    sound.playClick();
  };

  const checkAnswer = () => {
    if (!selectedExercise) return;
    const r = scoreAnswer(userAnswer, selectedExercise.solution);
    setResult(r);
    setMode('result');
    if (r.score >= 70) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
  };

  const reset = () => {
    setUserAnswer('');
    setResult(null);
    setMode('practice');
    setShowSolution(false);
    sound.playClick();
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const revealNextHint = () => {
    if (!selectedExercise) return;
    if (revealedHints < selectedExercise.hints.length) {
      setRevealedHints(h => h + 1);
      sound.playClick();
    }
  };

  // ── Browse Screen ──────────────────────────────────────────────────────
  if (mode === 'browse') {
    return (
      <div className="min-h-screen p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3">
            <GitFork className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">Widget Tree Studio</h1>
          </div>
          <p className="text-gray-400 max-w-xl mx-auto">
            Learn to decompose real Flutter screens into their widget trees.
            Study the screen → read the hints → build the tree yourself.
          </p>
        </div>

        {/* How it works */}
        <div className="glass-panel rounded-xl p-5 max-w-3xl mx-auto">
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" /> How it works
          </h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { step: '1', icon: '👁️', title: 'Study the screen', desc: 'Look at the Flutter UI mockup' },
              { step: '2', icon: '💡', title: 'Read the hints', desc: 'Reveal hints one by one to guide your thinking' },
              { step: '3', icon: '✍️', title: 'Build the tree', desc: 'Write the widget tree and check your score' },
            ].map(s => (
              <div key={s.step} className="glass-card rounded-lg p-4 space-y-2">
                <div className="text-3xl">{s.icon}</div>
                <div className="text-purple-400 font-bold text-sm">Step {s.step}</div>
                <div className="text-white font-medium text-sm">{s.title}</div>
                <div className="text-gray-400 text-xs">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Exercise Cards */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-green-400" /> Exercises
          </h2>
          <div className="grid gap-4">
            {EXERCISES.map(ex => (
              <div key={ex.id} className="glass-panel rounded-xl overflow-hidden">
                <div className="flex gap-0">
                  {/* Screen preview */}
                  <div className="w-32 flex-shrink-0 bg-gray-900 flex items-center justify-center p-2">
                    <img
                      src={ex.imageUrl}
                      alt={ex.title}
                      className="max-h-40 object-contain rounded-md border border-gray-700"
                    />
                  </div>
                  {/* Info */}
                  <div className="flex-1 p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-bold text-lg">{ex.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                          ex.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300 border-green-500/30'
                          : ex.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                          : 'bg-red-500/20 text-red-300 border-red-500/30'
                        }`}>{ex.difficulty}</span>
                      </div>
                      <button
                        onClick={() => startExercise(ex)}
                        className="btn-primary px-5 py-2 rounded-lg flex items-center gap-2 font-medium"
                      >
                        <Sparkles className="w-4 h-4" /> Start Challenge
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm">{ex.description}</p>
                    {/* Key concepts */}
                    <div className="flex flex-wrap gap-2">
                      {ex.keyConcepts.map(c => (
                        <span key={c.label} className={`text-xs px-2 py-0.5 rounded-full border ${c.color}`}>
                          {c.label}
                        </span>
                      ))}
                    </div>
                    <div className="text-gray-500 text-xs">{ex.hints.length} guided hints • Free-text answer</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Exercise Modes (learn / practice / result) ─────────────────────────
  if (!selectedExercise) return null;

  return (
    <div className="min-h-screen p-4 space-y-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => { setMode('browse'); setSelectedExercise(null); }}
          className="text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors"
        >
          ← Back to exercises
        </button>
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold">{selectedExercise.title}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full border ${
            selectedExercise.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300 border-green-500/30'
            : selectedExercise.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
            : 'bg-red-500/20 text-red-300 border-red-500/30'
          }`}>{selectedExercise.difficulty}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setMode('learn')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${mode === 'learn' ? 'bg-blue-600 text-white' : 'glass-card text-gray-400 hover:text-white'}`}
          >
            <BookOpen className="w-4 h-4 inline mr-1" />Learn
          </button>
          <button
            onClick={() => setMode('practice')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${mode === 'practice' || mode === 'result' ? 'bg-purple-600 text-white' : 'glass-card text-gray-400 hover:text-white'}`}
          >
            <GitFork className="w-4 h-4 inline mr-1" />Practice
          </button>
        </div>
      </div>

      {/* ── LEARN MODE ─────────────────────────────────────────── */}
      {mode === 'learn' && (
        <div className="grid grid-cols-2 gap-4 h-[calc(100vh-10rem)]">
          {/* Left: Screen image */}
          <div className="glass-panel rounded-xl p-4 flex flex-col gap-4 overflow-auto">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-400" /> The Screen
            </h3>
            <div className="flex-1 flex items-start justify-center bg-gray-900/50 rounded-xl p-4">
              <img
                src={selectedExercise.imageUrl}
                alt={selectedExercise.title}
                className="max-h-full max-w-full object-contain rounded-xl shadow-2xl border border-gray-700"
              />
            </div>

            {/* Key concepts */}
            <div>
              <h4 className="text-gray-400 text-xs uppercase tracking-wider mb-2">Key Concepts</h4>
              <div className="flex flex-wrap gap-2">
                {selectedExercise.keyConcepts.map(c => (
                  <span key={c.label} className={`text-xs px-2 py-1 rounded-full border ${c.color}`}>
                    {c.label}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={goToPractice}
              className="btn-primary py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
            >
              <GitFork className="w-4 h-4" /> I'm ready — Build the tree!
            </button>
          </div>

          {/* Right: Hints */}
          <div className="glass-panel rounded-xl p-4 flex flex-col gap-4 overflow-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" /> Guided Hints
              </h3>
              <span className="text-gray-400 text-sm">
                {revealedHints}/{selectedExercise.hints.length} revealed
              </span>
            </div>

            <div className="text-gray-400 text-sm bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex gap-2">
              <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <span>Reveal hints one by one. Try to build as much as you can before reading the next hint!</span>
            </div>

            {/* Revealed hints */}
            <div className="flex-1 space-y-3 overflow-auto">
              {selectedExercise.hints.slice(0, revealedHints).map((hint, i) => (
                <div key={i} className="glass-card rounded-lg p-3 border border-yellow-500/20 animate-fadeIn">
                  <p className="text-yellow-100 text-sm">{hint}</p>
                </div>
              ))}

              {revealedHints === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <Lightbulb className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Press "Reveal Next Hint" when you're stuck</p>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="space-y-2">
              <button
                onClick={revealNextHint}
                disabled={revealedHints >= selectedExercise.hints.length}
                className="w-full py-2 rounded-lg bg-yellow-600/80 hover:bg-yellow-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                {revealedHints >= selectedExercise.hints.length ? 'All hints revealed!' : 'Reveal Next Hint'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PRACTICE MODE ──────────────────────────────────────── */}
      {mode === 'practice' && (
        <div className="grid grid-cols-2 gap-4 h-[calc(100vh-10rem)]">
          {/* Left: Reference image + mini hints */}
          <div className="glass-panel rounded-xl p-4 flex flex-col gap-3 overflow-auto">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-400" /> Reference Screen
            </h3>
            <div className="flex-1 flex items-start justify-center bg-gray-900/50 rounded-xl p-3">
              <img
                src={selectedExercise.imageUrl}
                alt={selectedExercise.title}
                className="max-h-full max-w-full object-contain rounded-xl border border-gray-700"
              />
            </div>
            <div className="text-gray-500 text-xs text-center">
              💡 Need help? Go back to Learn tab to reveal hints
            </div>
            <button
              onClick={() => setMode('learn')}
              className="text-yellow-400 hover:text-yellow-300 text-sm flex items-center gap-1 justify-center transition-colors"
            >
              <Lightbulb className="w-4 h-4" /> Go to hints
            </button>
          </div>

          {/* Right: Text editor */}
          <div className="glass-panel rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <GitFork className="w-5 h-5 text-purple-400" /> Write the Widget Tree
              </h3>
              <button
                onClick={() => setShowSolution(s => !s)}
                className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                {showSolution ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                {showSolution ? 'Hide' : 'Peek at'} solution
              </button>
            </div>

            {/* Format guide */}
            <div className="bg-gray-900/60 rounded-lg p-3 text-xs font-mono text-gray-400 border border-gray-700">
              <div className="text-gray-500 mb-1">// Format guide:</div>
              <div className="text-blue-300">Scaffold:</div>
              <div className="text-green-300 pl-2">appBar:</div>
              <div className="text-yellow-300 pl-4">AppBar:</div>
              <div className="text-green-300 pl-6">title:</div>
              <div className="text-purple-300 pl-8">Text (data: 'Hello'):</div>
              <div className="text-green-300 pl-2">body:</div>
              <div className="text-yellow-300 pl-4">Column:</div>
              <div className="text-green-300 pl-6">children:</div>
              <div className="text-purple-300 pl-8">Text (data: 'Item'):</div>
            </div>

            {/* Text area */}
            <textarea
              className="flex-1 bg-gray-900/80 border border-gray-700 rounded-lg p-3 font-mono text-sm text-green-300 resize-none focus:outline-none focus:border-purple-500 leading-relaxed"
              placeholder="Start writing your widget tree here...&#10;&#10;Scaffold:&#10;  appBar:&#10;    AppBar:&#10;  body:&#10;    ..."
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              spellCheck={false}
            />

            {showSolution && (
              <div className="bg-gray-950 border border-purple-500/30 rounded-lg p-3 max-h-48 overflow-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-purple-400 text-xs font-semibold">Reference Solution</span>
                  <button onClick={() => copyText(selectedExercise.solution)} className="text-gray-400 hover:text-white">
                    {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
                <pre className="font-mono text-xs text-gray-300 whitespace-pre-wrap">{selectedExercise.solution}</pre>
              </div>
            )}

            <button
              onClick={checkAnswer}
              disabled={userAnswer.trim().length < 10}
              className="py-2.5 rounded-lg bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <CheckCircle2 className="w-5 h-5" /> Check My Answer
            </button>
          </div>
        </div>
      )}

      {/* ── RESULT MODE ────────────────────────────────────────── */}
      {mode === 'result' && result && (
        <div className="grid grid-cols-2 gap-4 h-[calc(100vh-10rem)]">
          {/* Left: Score */}
          <div className="glass-panel rounded-xl p-6 flex flex-col gap-5 overflow-auto">
            {/* Score ring */}
            <div className="text-center space-y-2">
              <div className={`text-6xl font-black ${result.score >= 70 ? 'text-green-400' : result.score >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                {result.score}%
              </div>
              <div className="text-white font-semibold text-lg">{result.feedback}</div>
              {result.score >= 90 && (
                <div className="flex justify-center">
                  <Trophy className="w-8 h-8 text-yellow-400 animate-bounce" />
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-card rounded-lg p-3 text-center">
                <div className="text-green-400 text-2xl font-bold">{result.matched.length}</div>
                <div className="text-gray-400 text-xs mt-1">Widgets matched</div>
              </div>
              <div className="glass-card rounded-lg p-3 text-center">
                <div className="text-red-400 text-2xl font-bold">{result.missed.length}</div>
                <div className="text-gray-400 text-xs mt-1">Widgets missed</div>
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Completeness</span>
                <span>{result.score}%</span>
              </div>
              <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${result.score >= 70 ? 'bg-green-500' : result.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={reset}
                className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>
              <button
                onClick={() => { setMode('browse'); setSelectedExercise(null); }}
                className="w-full py-2 rounded-lg glass-card text-gray-300 hover:text-white text-sm transition-colors"
              >
                ← Back to Exercises
              </button>
            </div>
          </div>

          {/* Right: Side-by-side comparison */}
          <div className="glass-panel rounded-xl p-4 flex flex-col gap-3 overflow-auto">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" /> Your Answer vs. Solution
            </h3>

            <div className="grid grid-cols-2 gap-3 flex-1 overflow-auto">
              {/* User answer */}
              <div className="flex flex-col gap-2">
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Your Answer</div>
                <pre className="flex-1 bg-gray-900/80 rounded-lg p-3 font-mono text-xs text-gray-300 whitespace-pre-wrap overflow-auto border border-gray-700">
                  {userAnswer || '(empty)'}
                </pre>
              </div>
              {/* Solution */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-green-400 font-semibold uppercase tracking-wider">Reference Solution</div>
                  <button onClick={() => copyText(selectedExercise.solution)}>
                    {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3 text-gray-400" />}
                  </button>
                </div>
                <pre className="flex-1 bg-gray-900/80 rounded-lg p-3 font-mono text-xs text-green-300 whitespace-pre-wrap overflow-auto border border-green-800/30">
                  {selectedExercise.solution}
                </pre>
              </div>
            </div>

            {/* Key concept recap */}
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Key concepts in this exercise</div>
              <div className="flex flex-wrap gap-2">
                {selectedExercise.keyConcepts.map(c => (
                  <span key={c.label} className={`text-xs px-2 py-0.5 rounded-full border ${c.color}`}>
                    {c.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
