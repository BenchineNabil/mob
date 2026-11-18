import React, { useState } from 'react';
import { MonacoCodeEditor } from '../components/code/MonacoCodeEditor';
import { sound } from '../utils/soundEffects';
import { Code2, Terminal, BookOpen, CheckCircle2, ChevronRight } from 'lucide-react';

interface ChallengeItem {
  id: string;
  title: string;
  level: string;
  description: string;
  starterCode: string;
  testCases: { id: string; description: string; expectedOutput: any }[];
}

const ARENA_CHALLENGES: ChallengeItem[] = [
  {
    id: 'chal-1',
    title: 'LAB-01: Palindrome & Binary Converter',
    level: 'Level 1-2',
    description: 'Implement isPalindrome(String input) and decimalTobinary(int n) in pure Dart.',
    starterCode: `// LAB-01: Implement the functions below
bool isPalindrome(String input) {
  // TODO: Case-insensitive palindrome check
  return false;
}

String decimalTobinary(int input) {
  // TODO: Convert decimal integer to binary string
  return "";
}

void main() {
  print("isPalindrome('radar'): \${isPalindrome('radar')}");
  print("decimalTobinary(10): \${decimalTobinary(10)}");
}
`,
    testCases: [
      { id: 't1', description: 'isPalindrome("radar") returns true', expectedOutput: true },
      { id: 't2', description: 'isPalindrome("hello") returns false', expectedOutput: false },
      { id: 't3', description: 'decimalTobinary(10) returns "1010"', expectedOutput: '1010' },
      { id: 't4', description: 'decimalTobinary(0) returns "0"', expectedOutput: '0' },
    ],
  },
  {
    id: 'chal-2',
    title: 'LAB-03: Phrase Class Encapsulation',
    level: 'Level 3',
    description: 'Implement Phrase class with private field _text, getters text, isPalindrome, and capitalized.',
    starterCode: `class Phrase {
  final String _text;
  Phrase(this._text);
  Phrase.empty() : _text = "";

  String get text => _text;
  
  // TODO: Getter isPalindrome
  bool get isPalindrome => false;

  // TODO: Getter capitalized
  String get capitalized => "";

  @override
  String toString() => _text;
}

void main() {
  var p = Phrase("radar");
  print("\${p.text}: isPalindrome=\${p.isPalindrome}");
}
`,
    testCases: [
      { id: 't1', description: 'Phrase("level").isPalindrome returns true', expectedOutput: true },
      { id: 't2', description: 'Phrase("dart").capitalized returns "Dart"', expectedOutput: 'Dart' },
    ],
  },
  {
    id: 'chal-3',
    title: 'LAB-04: CounterStore Singleton Pattern',
    level: 'Level 4',
    description: 'Implement a thread-safe Singleton CounterStore with private constructor and factory constructor.',
    starterCode: `class CounterStore {
  // TODO: Implement static _instance, private constructor, and factory constructor
  int count = 0;
  void increment() => count++;
}

void main() {
  var s1 = CounterStore();
  var s2 = CounterStore();
  s1.increment();
  print("s1: \${s1.count}, s2: \${s2.count}, identical: \${identical(s1, s2)}");
}
`,
    testCases: [
      { id: 't1', description: 'CounterStore() returns identical instance', expectedOutput: true },
      { id: 't2', description: 'State increment is synchronized', expectedOutput: 1 },
    ],
  },
  {
    id: 'chal-4',
    title: 'Freeform Dart Playground',
    level: 'Sandbox',
    description: 'Freeform scratchpad to test arbitrary Dart 3 code, async loops, event loops, and algorithms.',
    starterCode: `import 'dart:async';

void main() async {
  print("Hello ENSIA Mobile Developers!");
  
  // Test Event Loop queue priority:
  scheduleMicrotask(() => print("Microtask executed!"));
  Future(() => print("Event queue future executed!"));
  print("Synchronous main finished.");
}
`,
    testCases: [],
  },
];

export const CodingArenaView: React.FC = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeItem>(ARENA_CHALLENGES[0]);

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Code2 className="w-8 h-8 text-quest-primary" />
            <span>Dart Coding Arena</span>
          </h1>
          <p className="text-sm text-quest-muted mt-1">
            Write, compile, and execute Dart code in real-time. Practice authentic laboratory assignments with instant automated test feedback.
          </p>
        </div>
      </div>

      {/* Main Grid: Challenge Selector Sidebar + Monaco Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left: Challenge Selector List */}
        <div className="glass-panel p-4 rounded-3xl border border-quest-border/60 space-y-2 h-fit">
          <div className="text-xs font-bold uppercase tracking-wider text-quest-muted px-2 py-1">
            Lab Challenges
          </div>

          {ARENA_CHALLENGES.map((chal) => {
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
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white">{chal.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-quest-surface text-quest-primary font-mono">
                    {chal.level}
                  </span>
                </div>
                <p className="text-[11px] text-quest-muted line-clamp-2">
                  {chal.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right: Monaco Editor Arena (3 cols) */}
        <div className="lg:col-span-3 h-[680px]">
          <MonacoCodeEditor
            key={selectedChallenge.id}
            initialCode={selectedChallenge.starterCode}
            testCases={selectedChallenge.testCases}
            title={selectedChallenge.title}
            subtitle={selectedChallenge.description}
          />
        </div>

      </div>

    </div>
  );
};
