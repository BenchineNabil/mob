import React, { useState } from 'react';
import { sound } from '../utils/soundEffects';
import { AlertTriangle, Sparkles, CheckCircle2, XCircle, Search, BookOpen } from 'lucide-react';

interface TrapItem {
  id: string;
  title: string;
  level: string;
  sourceRef: string;
  buggyCode: string;
  fixedCode: string;
  explanation: string;
  examRisk: string;
}

const PROFESSOR_TRAPS: TrapItem[] = [
  {
    id: 'TRAP-01',
    title: 'The Infinite FutureBuilder Refetch Storm',
    level: 'Level 8 (Async)',
    sourceRef: 'Quiz Q-05 & Slide 415',
    buggyCode: `// FATAL ERROR: Instantiating Future inside build()!
@override
Widget build(BuildContext context) {
  return FutureBuilder<List<News>>(
    future: getNews(), // Recreates new Future on every frame!
    builder: (ctx, snapshot) => ...
  );
}`,
    fixedCode: `// CORRECT: Initialize once in initState()!
late Future<List<News>> _newsFuture;

@override
void initState() {
  super.initState();
  _newsFuture = getNews(); // Cached once!
}

@override
Widget build(BuildContext context) {
  return FutureBuilder<List<News>>(
    future: _newsFuture, // Pass cached member!
    builder: (ctx, snapshot) => ...
  );
}`,
    explanation: 'Placing future: getNews() directly in build() triggers an infinite recursion: Future resolves -> setState rebuilds widget -> build() runs -> new Future is created -> resolves -> rebuilds forever.',
    examRisk: 'Highest frequency exam trap. Students assume build() only runs once.'
  },
  {
    id: 'TRAP-02',
    title: 'Calling setState() Synchronously in Builder',
    level: 'Level 8 (Async)',
    sourceRef: 'Quiz Q-06',
    buggyCode: `FutureBuilder(
  future: _future,
  builder: (context, snapshot) {
    if (snapshot.hasData) {
      setState(() { _data = snapshot.data; }); // CRASH!
    }
    return Text("Data");
  },
)`,
    fixedCode: `// CORRECT: Let snapshot hold the data directly!
FutureBuilder<MyData>(
  future: _future,
  builder: (context, snapshot) {
    if (snapshot.hasData) {
      return Text(snapshot.data!.title); // Use snapshot.data directly!
    }
    return CircularProgressIndicator();
  },
)`,
    explanation: 'Calling setState() synchronously during the build phase throws "setState() or markNeedsBuild() called during build". Rebuilds cannot be requested while a build pass is currently in flight.',
    examRisk: 'Tested directly in Moodle quiz Q-06.'
  },
  {
    id: 'TRAP-03',
    title: 'Static Member Access via Instance Identifier',
    level: 'Level 3 (OOP)',
    sourceRef: 'Quiz Q-19 & Slide 82',
    buggyCode: `class Student {
  static int count = 0;
  String name;
  Student(this.name) { count++; }
}

void main() {
  Student sara = Student("Sara");
  print(sara.count); // COMPILE ERROR in Dart!
}`,
    fixedCode: `void main() {
  Student sara = Student("Sara");
  // CORRECT: Access exclusively via the class identifier!
  print(Student.count); 
}`,
    explanation: 'Unlike Java, C++, and C#, Dart completely forbids accessing static members through an instance variable. The compiler throws "The getter \'count\' isn\'t defined for the type \'Student\'".',
    examRisk: 'Traps students coming from Java or C++ backgrounds.'
  },
  {
    id: 'TRAP-04',
    title: 'final vs const Collection Immutability',
    level: 'Level 1 (Foundations)',
    sourceRef: 'Quiz Q-21 & Slide 15',
    buggyCode: `const List<int> list = [1, 2];
list.add(3); // Compiles cleanly, but CRASHES at runtime!`,
    fixedCode: `// If in-place mutation is needed:
final List<int> list = [1, 2];
list.add(3); // Succeeded! final allows in-place mutation.`,
    explanation: 'final locks variable rebinding, but the heap object is mutable. const creates an unmodifiable object in memory; calling mutating methods compiles (since add() is on List), but throws Unsupported operation at runtime.',
    examRisk: 'Tested in Quiz Q-21. Students assume const is checked entirely at compile time.'
  },
  {
    id: 'TRAP-05',
    title: 'SharedPreferences Map.toString() Deserialization',
    level: 'Level 7 (Persistence)',
    sourceRef: 'Quiz Q-08 & Slide 380',
    buggyCode: `// SAVING:
prefs.setString('user', myMap.toString()); // Stores {name: Ali}

// READING:
json.decode(prefs.getString('user')!); // FATAL FormatException!`,
    fixedCode: `import 'dart:convert';

// SAVING: Use json.encode!
prefs.setString('user', json.encode(myMap)); // Stores {"name":"Ali"}

// READING:
final map = json.decode(prefs.getString('user')!); // Succeeded!`,
    explanation: 'Dart Map.toString() produces unquoted keys with single quotes ({name: Ali}). Standard JSON parsers strictly require double-quoted keys. Calling json.decode() throws a fatal FormatException.',
    examRisk: 'Appears in both lab tests and online quizzes.'
  },
  {
    id: 'TRAP-06',
    title: 'Integer Division Operator (~/ vs /)',
    level: 'Level 1 (Foundations)',
    sourceRef: 'Quiz Q-20 & Slide 20',
    buggyCode: `// COMPILE ERROR!
int result = 7 / 2; // / operator always returns double 3.5!`,
    fixedCode: `// CORRECT: Use truncating integer division ~/
int result = 7 ~/ 2; // Evaluates to int 3!
// Or:
double floatResult = 7 / 2; // 3.5`,
    explanation: 'In Dart, the / operator is floating-point division and always yields double. For integer division resulting in int, the ~/ operator is mandatory.',
    examRisk: 'A signature Dart language difference from C/C++/Java.'
  },
  {
    id: 'TRAP-07',
    title: 'Hardcoded Switch Property in Declarative UI',
    level: 'Level 6 (State)',
    sourceRef: 'Quiz Q-12',
    buggyCode: `Switch(
  value: false, // HARDCODED!
  onChanged: (val) {
    setState(() { isChecked = val; });
  },
)`,
    fixedCode: `Switch(
  value: isChecked, // BOUND TO STATE VARIABLE!
  onChanged: (val) {
    setState(() { isChecked = val; });
  },
)`,
    explanation: 'Controlled widgets like Switch, Checkbox, and Slider mirror their value property. If value: false is hardcoded, the switch immediately snaps back to OFF on every rebuild, never staying ON.',
    examRisk: 'Tested directly in Quiz Q-12.'
  },
  {
    id: 'TRAP-08',
    title: 'Omitting setState() During State Mutation',
    level: 'Level 6 (State)',
    sourceRef: 'Quiz Q-13',
    buggyCode: `onPressed: () {
  score++; // In-memory update, but screen text stays stale!
}`,
    fixedCode: `onPressed: () {
  setState(() {
    score++; // Marks Element dirty and schedules repaint!
  });
}`,
    explanation: 'In Flutter, variables are not reactive by default. Mutating a variable in RAM does not notify the framework. Wrapping in setState(() {}) schedules a build pass.',
    examRisk: 'Novices expect variables to be auto-reactive like in Vue.'
  },
  {
    id: 'TRAP-09',
    title: 'Validator on Raw TextField',
    level: 'Level 7 (Forms)',
    sourceRef: 'Quiz Q-23',
    buggyCode: `// DOES NOT WORK:
Form(
  child: TextField(
    validator: (v) => v!.isEmpty ? "Error" : null, // Ignored by FormState!
  ),
)`,
    fixedCode: `// CORRECT: Use TextFormField!
Form(
  child: TextFormField(
    validator: (v) => v == null || v.isEmpty ? "Error" : null,
  ),
)`,
    explanation: 'Standard TextField is a low-level widget that does not interact with FormState. Form validation requires TextFormField.',
    examRisk: 'Tested in Quiz Q-23.'
  },
  {
    id: 'TRAP-10',
    title: 'Periodic Timer Leaks in dispose()',
    level: 'Level 8 (Async)',
    sourceRef: 'Quiz Q-24 & Slide 425',
    buggyCode: `class _State extends State<Screen> {
  @override
  void initState() {
    super.initState();
    Timer.periodic(Duration(seconds: 5), (t) => setState(() {}));
  }
  // Forgot dispose() override! Memory leak!
}`,
    fixedCode: `Timer? _timer;

@override
void initState() {
  super.initState();
  _timer = Timer.periodic(Duration(seconds: 5), (t) {
    if (mounted) setState(() {});
  });
}

@override
void dispose() {
  _timer?.cancel(); // CANCEL MANDATORY!
  super.dispose();
}`,
    explanation: 'Timers belong to the Dart event loop. When a screen pops, the timer keeps firing and calling setState() on an unmounted element, throwing exceptions and leaking memory.',
    examRisk: 'Tested in Quiz Q-24.'
  },
  {
    id: 'TRAP-11',
    title: 'Polymorphic Method Call on Base Type Reference',
    level: 'Level 3 (OOP)',
    sourceRef: 'Quiz Q-16',
    buggyCode: `Animal pet = Dog();
pet.fetch(); // COMPILE ERROR! Animal has no fetch() method!`,
    fixedCode: `Animal pet = Dog();
// CORRECT: Cast or smart-check first!
if (pet is Dog) {
  pet.fetch(); // Smart cast by Dart compiler!
}`,
    explanation: 'Dart compiler enforces static typing based on the declared reference type (Animal), not the runtime object (Dog).',
    examRisk: 'Tested in Quiz Q-16.'
  },
  {
    id: 'TRAP-12',
    title: 'Container Color and Decoration Collision',
    level: 'Level 5 (Layout)',
    sourceRef: 'Slide 224',
    buggyCode: `Container(
  color: Colors.blue,
  decoration: BoxDecoration(borderRadius: BorderRadius.circular(8)), // CRASH!
)`,
    fixedCode: `Container(
  decoration: BoxDecoration(
    color: Colors.blue, // PUT COLOR INSIDE DECORATION!
    borderRadius: BorderRadius.circular(8),
  ),
)`,
    explanation: 'Flutter has an assertion that throws: "Cannot provide both a color and a decoration". Color must be moved inside BoxDecoration.',
    examRisk: 'Common student layout crash.'
  },
  {
    id: 'TRAP-13',
    title: 'Unbounded Height ListView Inside Column',
    level: 'Level 5 (Layout)',
    sourceRef: 'Slide 245',
    buggyCode: `Column(
  children: [
    Text("Header"),
    ListView.builder(...), // CRASH: Vertical viewport was given unbounded height!
  ],
)`,
    fixedCode: `Column(
  children: [
    Text("Header"),
    Expanded( // WRAP IN EXPANDED!
      child: ListView.builder(...),
    ),
  ],
)`,
    explanation: 'A Column allows infinite height; a ListView attempts to expand infinitely, creating an unbounded height assertion failure.',
    examRisk: 'Most frequent Flutter layout bug.'
  },
  {
    id: 'TRAP-14',
    title: 'State Initialization Inside build()',
    level: 'Level 6 (State)',
    sourceRef: 'Quiz Q-11',
    buggyCode: `Widget build(BuildContext context) {
  int startingPlayer = Random().nextInt(2); // RE-RANDOMIZES EVERY FRAME!
  return ...
}`,
    fixedCode: `int startingPlayer = 0;

@override
void initState() {
  super.initState();
  startingPlayer = Random().nextInt(2); // INITIALIZED ONCE!
}`,
    explanation: 'The build() method must be pure and idempotent. Declaring or randomizing variables inside build() resets state on every rebuild.',
    examRisk: 'Tested in Quiz Q-11.'
  },
  {
    id: 'TRAP-15',
    title: 'pubspec.yaml Asset Indentation',
    level: 'Level 5 (Layout)',
    sourceRef: 'Quiz Q-25',
    buggyCode: `flutter:
  uses-material-design: true
assets: // WRONG: Root level indentation!
  - assets/images/logo.png`,
    fixedCode: `flutter:
  uses-material-design: true
  assets: // CORRECT: Nested under flutter with 2 spaces!
    - assets/images/logo.png`,
    explanation: 'YAML is indentation-sensitive. Flutter only parses asset paths if they are nested 2 spaces under the flutter: configuration key.',
    examRisk: 'Tested in Quiz Q-25.'
  }
];

export const TrapCompendiumView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrap, setSelectedTrap] = useState<TrapItem>(PROFESSOR_TRAPS[0]);

  const filteredTraps = PROFESSOR_TRAPS.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.explanation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <AlertTriangle className="w-8 h-8 text-amber-400" />
          <span>Professor's Exam Trap Compendium</span>
        </h1>
        <p className="text-sm text-quest-muted mt-1">
          Catalog of 15 signature cognitive traps and anti-patterns extracted from Prof. Imed Bouchrika's lectures and exam questions.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-quest-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search traps by concept (e.g. FutureBuilder, static, const)..."
          className="w-full bg-quest-surface/90 border border-quest-border/60 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-quest-muted focus:outline-none focus:border-quest-primary transition"
        />
      </div>

      {/* Main Grid: Trap List + Side-by-Side Code Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Trap Selector List */}
        <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
          {filteredTraps.map((trap) => {
            const isSelected = trap.id === selectedTrap.id;
            return (
              <button
                key={trap.id}
                onClick={() => {
                  setSelectedTrap(trap);
                  sound.playClick();
                }}
                className={`w-full text-left p-3.5 rounded-2xl transition border text-xs ${
                  isSelected
                    ? 'glass-panel-glow border-amber-500/60 text-white font-semibold'
                    : 'glass-card border-quest-border/40 text-quest-muted hover:text-white hover:bg-quest-border/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-amber-400 font-mono text-[10px]">{trap.id}</span>
                  <span className="text-[10px] text-quest-muted font-mono">{trap.sourceRef}</span>
                </div>
                <h4 className="font-bold text-white text-xs">{trap.title}</h4>
                <div className="text-[10px] text-quest-primary mt-1 font-mono">{trap.level}</div>
              </button>
            );
          })}
        </div>

        {/* Right: Detailed Deep Dive & Side-by-Side Comparison (2 cols) */}
        <div className="lg:col-span-2 glass-panel p-6 lg:p-8 rounded-3xl border border-quest-border/60 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-quest-border/50 pb-4">
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold">{selectedTrap.id} • {selectedTrap.level}</span>
              <h2 className="text-xl font-bold text-white mt-0.5">{selectedTrap.title}</h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-quest-card text-quest-muted border border-quest-border/40 font-mono">
              Source: {selectedTrap.sourceRef}
            </span>
          </div>

          {/* Explanation */}
          <div className="bg-quest-surface p-4 rounded-2xl border border-quest-border/40 space-y-1.5">
            <div className="text-xs font-bold text-quest-cyan uppercase tracking-wider">The Trap Mechanism:</div>
            <p className="text-xs text-gray-300 leading-relaxed">{selectedTrap.explanation}</p>
          </div>

          {/* Side by Side Buggy vs Fixed */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Buggy Snippet */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                <XCircle className="w-4 h-4" />
                <span>Buggy Anti-Pattern (Fails Exam)</span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-rose-500/30 bg-[#0B0F19]">
                <pre className="p-3.5 font-mono text-[11px] text-rose-300 overflow-x-auto leading-relaxed">
                  <code>{selectedTrap.buggyCode}</code>
                </pre>
              </div>
            </div>

            {/* Fixed Snippet */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Certified Fix (Prof. Approved)</span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-emerald-500/30 bg-[#0B0F19]">
                <pre className="p-3.5 font-mono text-[11px] text-emerald-300 overflow-x-auto leading-relaxed">
                  <code>{selectedTrap.fixedCode}</code>
                </pre>
              </div>
            </div>

          </div>

          {/* Exam Risk Warning Callout */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-400 mt-0.5" />
            <div>
              <strong className="block font-bold mb-0.5">Examination Context:</strong>
              {selectedTrap.examRisk}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
