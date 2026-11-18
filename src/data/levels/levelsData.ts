import { Level } from '../../types';

export const LEVELS: Level[] = [
  {
    id: 1,
    slug: 'dart-foundations',
    title: 'Dart Foundations',
    subtitle: 'The Syntax Sentry',
    lectureRef: 'Lecture 2 (Slides 1–45)',
    description: 'Master variables, immutability, operators, division traps, collections, and higher-order iteration methods.',
    iconName: 'Terminal',
    topics: ['Variables & Types', 'final vs const', 'late Keyword', 'Integer Division (~/)', 'Collections (List, Set, Map)', 'Spread Operator', 'Functions & Lambdas', 'Exception Handling'],
    passingScorePercent: 70,
    bossChallenge: {
      id: 'boss-1',
      levelId: 1,
      title: 'Trial of the Syntax Sentinel',
      bossName: 'The Syntax Sentinel',
      bossTitle: 'Guardian of Type Soundness',
      lore: 'The Sentinel denies passage to any who confuse mutable references with constant memory, or who divide integers like JavaScript novices.',
      description: 'Implement a comprehensive Dart utility class `DataSanitizer` that safely processes raw input values, converts decimal to binary strings (LAB-01), calculates integer division and remainder, and cleanses data without throwing unhandled exceptions.',
      requirements: [
        'Implement `String decimalToBinary(int value)`: converts integer to binary string ("10" -> "1010", "0" -> "0")',
        'Implement `int safeIntegerDivision(int a, int b)`: uses ~/ operator; returns 0 if b == 0 instead of throwing',
        'Implement `List<int> filterEvens(List<int> numbers)`: uses .where() to filter even numbers',
        'Demonstrate proper defensive try/catch handling for invalid inputs'
      ],
      starterCode: `// Implement the DataSanitizer class
class DataSanitizer {
  // Converts non-negative integer to binary string
  static String decimalToBinary(int value) {
    // TODO: Implement conversion without built-in radix shortcuts
    return "";
  }

  // Performs truncating integer division, returns 0 if divisor is 0
  static int safeIntegerDivision(int a, int b) {
    // TODO: Use Dart's ~/ operator and handle division by zero
    return 0;
  }

  // Returns only the even numbers from the input list
  static List<int> filterEvens(List<int> numbers) {
    // TODO: Use .where() method
    return [];
  }
}
`,
      solutionCode: `class DataSanitizer {
  static String decimalToBinary(int value) {
    if (value == 0) return "0";
    String result = "";
    int current = value;
    while (current > 0) {
      result = (current % 2).toString() + result;
      current = current ~/ 2;
    }
    return result;
  }

  static int safeIntegerDivision(int a, int b) {
    if (b == 0) return 0;
    return a ~/ b;
  }

  static List<int> filterEvens(List<int> numbers) {
    return numbers.where((n) => n % 2 == 0).toList();
  }
}
`,
      timeLimitSeconds: 600,
      testCases: [
        { id: 'tc-1', description: 'decimalToBinary converts 10 to "1010"', expectedOutput: '1010' },
        { id: 'tc-2', description: 'decimalToBinary converts 0 to "0"', expectedOutput: '0' },
        { id: 'tc-3', description: 'safeIntegerDivision(7, 2) returns 3', expectedOutput: 3 },
        { id: 'tc-4', description: 'safeIntegerDivision(10, 0) handles zero safely and returns 0', expectedOutput: 0 },
        { id: 'tc-5', description: 'filterEvens([1, 2, 3, 4, 5, 6]) returns [2, 4, 6]', expectedOutput: [2, 4, 6] },
      ]
    },
    miniGames: [
      {
        id: 'game-1-1',
        levelId: 1,
        title: 'Type Detective',
        subtitle: 'Compile Error, Runtime Error, or Clean Execution?',
        mechanic: 'type-detective',
        description: 'Analyze tricky Dart variable declarations and expressions (including final vs const, late variables, and ~/ division) and classify their execution outcome.',
        instructions: ['Read the code snippet carefully', 'Identify if the bug is caught at compile time or crashes at runtime', 'Beat the clock for maximum XP'],
        estimatedMinutes: 5,
        xpReward: 100,
        config: { rounds: 8 }
      },
      {
        id: 'game-1-2',
        levelId: 1,
        title: 'Collection Crusher',
        subtitle: 'List, Set & Map Manipulation',
        mechanic: 'collection-crusher',
        description: 'Construct queries using where(), map(), spread operator (...), and set uniqueness to transform raw datasets into target structures.',
        instructions: ['Combine functional list operators', 'Filter and project items to match the expected collection', 'Maintain immutable patterns'],
        estimatedMinutes: 6,
        xpReward: 120,
        config: { targetSets: 5 }
      },
      {
        id: 'game-1-3',
        levelId: 1,
        title: 'Operator Overdrive',
        subtitle: 'Division, Cascades & Null-Awareness',
        mechanic: 'operator-overdrive',
        description: 'Calculate expressions under time pressure using Dart arithmetic (~/, %), type-test operators (is, is!), and cascade notation (..).',
        instructions: ['Evaluate expressions quickly', 'Differentiate between double and int division', 'Chain operations with the cascade operator'],
        estimatedMinutes: 4,
        xpReward: 90,
        config: { timeLimitSec: 120 }
      }
    ]
  },
  {
    id: 2,
    slug: 'tdd-clean-code',
    title: 'Test-Driven Development & Clean Code',
    subtitle: 'The Quality Guardian',
    lectureRef: 'Lecture 2 (Slides 46–62) & Lecture 4 (Slides 159–176)',
    description: 'Master the Red-Green-Refactor discipline, package:test matchers, avoiding false confidence, and applying clean code principles.',
    iconName: 'CheckCircle2',
    topics: ['Red-Green-Refactor', 'package:test matchers', 'False Confidence Trap', 'Clean Code 1:9 Ratio', 'Naming Conventions', 'File Size Discipline (<200 lines)', 'Logging vs print()'],
    passingScorePercent: 70,
    bossChallenge: {
      id: 'boss-2',
      levelId: 2,
      title: 'Duel with the Red-Green Titan',
      bossName: 'The Red-Green Titan',
      bossTitle: 'Avatar of Test Purity',
      lore: 'The Titan strikes down any code that produces false confidence or satisfies tests by hardcoding rather than implementing true requirements.',
      description: 'Implement a comprehensive String Analysis suite (`isPalindrome`, `capitalizeWords`, `hasConsecutiveZeros`) and verify it against a suite of 6 rigorous unit tests.',
      requirements: [
        'Implement `bool isPalindrome(String text)`: case-insensitive palindrome detection (LAB-01)',
        'Implement `String capitalizeWords(String input)`: capitalizes first letter of every word (LAB-02)',
        'Implement `bool hasConsecutiveZeros(String text)`: returns true if "00" appears (LAB-02)',
        'Pass all 6 strict unit tests without hardcoding'
      ],
      starterCode: `class StringAnalyzer {
  // Returns true if text reads the same backwards and forwards (case-insensitive)
  static bool isPalindrome(String text) {
    // TODO: Implement
    return false;
  }

  // Capitalizes the first letter of each word in a space-separated sentence
  static String capitalizeWords(String input) {
    // TODO: Implement
    return "";
  }

  // Returns true if the string contains adjacent zeros ("00")
  static bool hasConsecutiveZeros(String text) {
    // TODO: Implement
    return false;
  }
}
`,
      solutionCode: `class StringAnalyzer {
  static bool isPalindrome(String text) {
    if (text.isEmpty) return true;
    String clean = text.toLowerCase().replaceAll(RegExp(r'[^a-z0-9]'), '');
    return clean == clean.split('').reversed.join('');
  }

  static String capitalizeWords(String input) {
    if (input.isEmpty) return "";
    return input.split(' ').map((word) {
      if (word.isEmpty) return "";
      return word[0].toUpperCase() + word.substring(1).toLowerCase();
    }).join(' ');
  }

  static bool hasConsecutiveZeros(String text) {
    return text.contains("00");
  }
}
`,
      timeLimitSeconds: 600,
      testCases: [
        { id: 'tc-2-1', description: 'isPalindrome("Radar") returns true', expectedOutput: true },
        { id: 'tc-2-2', description: 'isPalindrome("Flutter") returns false', expectedOutput: false },
        { id: 'tc-2-3', description: 'capitalizeWords("hello world ensia") returns "Hello World Ensia"', expectedOutput: 'Hello World Ensia' },
        { id: 'tc-2-4', description: 'hasConsecutiveZeros("1002") returns true', expectedOutput: true },
        { id: 'tc-2-5', description: 'hasConsecutiveZeros("10101") returns false', expectedOutput: false },
      ]
    },
    miniGames: [
      {
        id: 'game-2-1',
        levelId: 2,
        title: 'Test-First Architect',
        subtitle: 'Red-Green-Refactor Sequencing',
        mechanic: 'test-first-architect',
        description: 'Given business specifications, arrange test definitions into correct Red tests before observing code solutions.',
        instructions: ['Order TDD phases', 'Match requirements with appropriate test assertions', 'Avoid the False Confidence trap'],
        estimatedMinutes: 5,
        xpReward: 100,
        config: { requirements: 4 }
      },
      {
        id: 'game-2-2',
        levelId: 2,
        title: 'Assertion Assailant',
        subtitle: 'Match the Matcher',
        mechanic: 'assertion-assailant',
        description: 'Pair failing outputs and exception throws with the exact Dart matcher (equals, isNot, hasLength, throwsA, closeTo).',
        instructions: ['Choose the precise package:test matcher', 'Distinguish between identity and value equality', 'Detect exception matchers'],
        estimatedMinutes: 5,
        xpReward: 110,
        config: { rounds: 6 }
      },
      {
        id: 'game-2-3',
        levelId: 2,
        title: 'Clean Code Refactorer',
        subtitle: 'Smash Code Smells',
        mechanic: 'clean-code-refactorer',
        description: 'Inspect 300-line spaghetti files, magic numbers, print() statements, and bad naming, and refactor them to clean standards.',
        instructions: ['Replace print() with logger levels', 'Rename identifiers to lowerCamelCase with verb prefixes', 'Break giant functions into concise units'],
        estimatedMinutes: 6,
        xpReward: 120,
        config: { smells: 5 }
      }
    ]
  },
  {
    id: 3,
    slug: 'object-oriented-dart',
    title: 'Object-Oriented Dart',
    subtitle: 'The Class Colossus',
    lectureRef: 'Lecture 3 (Slides 63–105)',
    description: 'Master constructors, const object pooling, getters/setters, static member restrictions, implicit interfaces, covariant generics, and mixins.',
    iconName: 'Boxes',
    topics: ['Classes & Constructors', 'const Constructors & identical()', 'Static Members (sara.count trap)', 'extends vs implements', 'Implicit Interfaces', 'Generics & Covariance', 'Mixins with "on"'],
    passingScorePercent: 70,
    bossChallenge: {
      id: 'boss-3',
      levelId: 3,
      title: 'Clash with the Class Colossus',
      bossName: 'The Class Colossus',
      bossTitle: 'Overlord of Encapsulation',
      lore: 'The Colossus crumbles those who invoke static members via instance references or forget that implements demands every getter and setter.',
      description: 'Implement the authentic `Phrase` class from LAB-03, featuring private encapsulation, named constructors, custom getters, and interface compliance.',
      requirements: [
        'Declare private field `String _text`',
        'Implement generative constructor `Phrase(this._text)`',
        'Implement named constructor `Phrase.empty() : _text = ""`',
        'Implement getter `String get text => _text`',
        'Implement getter `bool get isPalindrome`',
        'Implement getter `String get capitalized`',
        'Override `toString() => _text`'
      ],
      starterCode: `// Implement the Phrase class from LAB-03
class Phrase {
  // TODO: Add private field _text

  // TODO: Generative constructor

  // TODO: Named constructor Phrase.empty()

  // TODO: Getter text

  // TODO: Getter isPalindrome

  // TODO: Getter capitalized

  // TODO: Override toString()
}
`,
      solutionCode: `class Phrase {
  final String _text;

  Phrase(this._text);
  Phrase.empty() : _text = "";

  String get text => _text;

  bool get isPalindrome {
    if (_text.isEmpty) return true;
    String clean = _text.toLowerCase().replaceAll(RegExp(r'[^a-z0-9]'), '');
    return clean == clean.split('').reversed.join('');
  }

  String get capitalized {
    if (_text.isEmpty) return "";
    return _text[0].toUpperCase() + _text.substring(1).toLowerCase();
  }

  @override
  String toString() => _text;
}
`,
      timeLimitSeconds: 600,
      testCases: [
        { id: 'tc-3-1', description: 'Phrase("level").isPalindrome returns true', expectedOutput: true },
        { id: 'tc-3-2', description: 'Phrase.empty().text returns ""', expectedOutput: '' },
        { id: 'tc-3-3', description: 'Phrase("dart").capitalized returns "Dart"', expectedOutput: 'Dart' },
        { id: 'tc-3-4', description: 'Phrase("ENSIA").toString() returns "ENSIA"', expectedOutput: 'ENSIA' },
      ]
    },
    miniGames: [
      {
        id: 'game-3-1',
        levelId: 3,
        title: 'Constructor Crafter',
        subtitle: 'Generative, Named, Const & Redirecting',
        mechanic: 'constructor-crafter',
        description: 'Construct objects across 5 variations (initializer lists, const constructors, object identity checks with identical()).',
        instructions: ['Select the proper constructor syntax', 'Verify const canonicalization rules', 'Avoid instance field mutation in const classes'],
        estimatedMinutes: 5,
        xpReward: 110,
        config: { variants: 5 }
      },
      {
        id: 'game-3-2',
        levelId: 3,
        title: 'Interface Infiltrator',
        subtitle: 'extends vs implements Implicit Interface',
        mechanic: 'interface-infiltrator',
        description: 'Fix classes where implements was used instead of extends, ensuring all implicit getters, setters, and methods are implemented.',
        instructions: ['Implement missing members', 'Remember that implements inherits ZERO code bodies', 'Avoid polymorphism static type traps'],
        estimatedMinutes: 6,
        xpReward: 120,
        config: { challenges: 4 }
      },
      {
        id: 'game-3-3',
        levelId: 3,
        title: 'Mixin Matrix',
        subtitle: 'Composition with with & on',
        mechanic: 'mixin-matrix',
        description: 'Compose complex behaviors using mixin linearization, enforcing constraints with the "on" keyword.',
        instructions: ['Order mixins correctly', 'Satisfy base type constraints', 'Execute type checks with is'],
        estimatedMinutes: 5,
        xpReward: 100,
        config: { puzzles: 4 }
      }
    ]
  },
  {
    id: 4,
    slug: 'design-patterns',
    title: 'Software Design Patterns',
    subtitle: 'The Architectural Overlord',
    lectureRef: 'Lecture 3 (Slides 106–134) & Lecture 6 (Slides 367–374)',
    description: 'Master the Factory pattern, Singleton pattern with factory constructors, Repository pattern decoupling UI from storage, and Observer vs Pub-Sub.',
    iconName: 'Network',
    topics: ['Why Patterns Matter (PHP Spaghetti)', 'Factory Pattern', 'Singleton Pattern (_internal & static _instance)', 'Repository Pattern (AbstractRepo)', 'Observer Pattern vs Pub-Sub', 'Decoupled Testing'],
    passingScorePercent: 70,
    bossChallenge: {
      id: 'boss-4',
      levelId: 4,
      title: 'Trial of the Architectural Overlord',
      bossName: 'The Architectural Overlord',
      bossTitle: 'Master of Decoupled Systems',
      lore: 'The Overlord destroys apps that embed raw database calls inside presentation code, enforcing absolute separation of concerns.',
      description: 'Implement a complete Singleton `CounterStore` (LAB-04) and an abstract `CounterRepository` interface with a `MockCounterRepository` (LAB-05).',
      requirements: [
        'Implement Singleton `CounterStore` with private constructor `_internal()`, static `_instance`, and factory constructor',
        'Add `increment()`, `decrement()`, and getter `count`',
        'Implement `abstract class CounterRepository` with `Future<int> load()` and `Future<void> save(int val)`',
        'Implement `MockCounterRepository implements CounterRepository`'
      ],
      starterCode: `// 1. Implement Singleton CounterStore (LAB-04)
class CounterStore {
  // TODO: Add private constructor, static instance, factory constructor, and state
  int count = 0;
}

// 2. Implement Repository Contract & Mock (LAB-05)
abstract class CounterRepository {
  Future<int> loadCount();
  Future<void> saveCount(int count);
}

class MockCounterRepository implements CounterRepository {
  // TODO: Implement mock storage
}
`,
      solutionCode: `class CounterStore {
  static final CounterStore _instance = CounterStore._internal();
  int _count = 0;

  CounterStore._internal();
  factory CounterStore() => _instance;

  int get count => _count;
  void increment() => _count++;
  void decrement() => _count--;
}

abstract class CounterRepository {
  Future<int> loadCount();
  Future<void> saveCount(int count);
}

class MockCounterRepository implements CounterRepository {
  int _storage = 0;

  @override
  Future<int> loadCount() async => _storage;

  @override
  Future<void> saveCount(int count) async {
    _storage = count;
  }
}
`,
      timeLimitSeconds: 600,
      testCases: [
        { id: 'tc-4-1', description: 'CounterStore() returns identical instance across calls', expectedOutput: true },
        { id: 'tc-4-2', description: 'MockCounterRepository saves and loads count', expectedOutput: 42 },
      ]
    },
    miniGames: [
      {
        id: 'game-4-1',
        levelId: 4,
        title: 'Singleton Sentry',
        subtitle: 'Shared In-Memory State',
        mechanic: 'singleton-sentry',
        description: 'Diagnose broken Singleton implementations (missing private constructor, factory re-instantiating instead of returning cached instance).',
        instructions: ['Fix the constructor visibility', 'Ensure identical() evaluates to true for multiple calls', 'Safeguard state integrity'],
        estimatedMinutes: 5,
        xpReward: 110,
        config: { cases: 4 }
      },
      {
        id: 'game-4-2',
        levelId: 4,
        title: 'Factory Foundry',
        subtitle: 'Dynamic Deserialization & Creation',
        mechanic: 'factory-foundry',
        description: 'Build factories using abstract class factory constructors and User.fromJson() deserializers without exposing concrete subtypes.',
        instructions: ['Implement factory constructors', 'Route JSON payloads to proper subclasses', 'Preserve encapsulation'],
        estimatedMinutes: 5,
        xpReward: 110,
        config: { models: 4 }
      },
      {
        id: 'game-4-3',
        levelId: 4,
        title: 'Decoupling Duel',
        subtitle: 'Repository vs Spaghetti Architecture',
        mechanic: 'decoupling-duel',
        description: 'Refactor tightly-coupled UI code by inserting an abstract repository layer, allowing swap between mock and live backend.',
        instructions: ['Sever direct DB/HTTP calls from widgets', 'Inject repository interfaces into UI components', 'Verify testability'],
        estimatedMinutes: 6,
        xpReward: 130,
        config: { screens: 3 }
      }
    ]
  },
  {
    id: 5,
    slug: 'flutter-foundations',
    title: 'Flutter Foundations & Layout Engine',
    subtitle: 'The Layout Leviathan',
    lectureRef: 'Lecture 4 (Slides 177–261)',
    description: 'Master Flutter architecture, widget tree immutability, the Box Model, Row/Column layout axes, Expanded/Spacer, Stack/Positioned, and ListView.builder.',
    iconName: 'Layout',
    topics: ['Flutter & Android 5-Layer OS', 'StatelessWidget Immutability', 'Scaffold & AppBar', 'Container & BoxDecoration', 'Row & Column Alignment', 'Expanded vs Flexible vs Spacer', 'Stack & Positioned', 'ListView.builder'],
    passingScorePercent: 70,
    bossChallenge: {
      id: 'boss-5',
      levelId: 5,
      title: 'Confrontation with the Layout Leviathan',
      bossName: 'The Layout Leviathan',
      bossTitle: 'Ruler of Spatial Constraints',
      lore: 'The Leviathan crushes developers whose viewports exceed unbounded height or who misuse Container color and decoration simultaneously.',
      description: 'Construct the authentic My Cart Widget Tree (CHAL-03) or Pricing Screen (LAB-08) layout hierarchy, structuring Row, Column, Expanded, and Cards.',
      requirements: [
        'Structure a clean widget tree for a cart item (Image, Title, Quantity Stepper, Price)',
        'Ensure proper flex distribution using Expanded and Spacer',
        'Apply BoxDecoration with borderRadius and boxShadow',
        'Avoid unbounded height runtime exceptions inside scrollable areas'
      ],
      starterCode: `// Assemble the Cart Item Widget Tree hierarchy
class CartItemModel {
  final String title;
  final int price;
  final int quantity;
  CartItemModel(this.title, this.price, this.quantity);
}

// Return the tree structure represented as a clean layout schema
Map<String, dynamic> buildCartItemLayout(CartItemModel item) {
  // TODO: Return layout node dictionary matching Flutter specifications
  return {};
}
`,
      solutionCode: `class CartItemModel {
  final String title;
  final int price;
  final int quantity;
  CartItemModel(this.title, this.price, this.quantity);
}

Map<String, dynamic> buildCartItemLayout(CartItemModel item) {
  return {
    "widget": "Card",
    "child": {
      "widget": "Row",
      "children": [
        {"widget": "Container", "width": 60, "height": 60},
        {
          "widget": "Expanded",
          "child": {
            "widget": "Column",
            "crossAxisAlignment": "start",
            "children": [
              {"widget": "Text", "value": item.title},
              {"widget": "Text", "value": "\${item.price} DA"}
            ]
          }
        },
        {"widget": "Text", "value": "x\${item.quantity}"}
      ]
    }
  };
}
`,
      timeLimitSeconds: 600,
      testCases: [
        { id: 'tc-5-1', description: 'Cart item tree uses Expanded for title column', expectedOutput: 'Expanded' },
        { id: 'tc-5-2', description: 'Total price formatted in DA', expectedOutput: true },
      ]
    },
    miniGames: [
      {
        id: 'game-5-1',
        levelId: 5,
        title: 'Layout Labyrinth',
        subtitle: 'Row, Column & Flex Alignment',
        mechanic: 'layout-labyrinth',
        description: 'Align widgets along mainAxisAlignment and crossAxisAlignment axes to hit target coordinate zones.',
        instructions: ['Select correct alignment enum values', 'Distribute available space with Expanded and Spacer', 'Prevent layout overflows'],
        estimatedMinutes: 5,
        xpReward: 110,
        config: { stages: 4 }
      },
      {
        id: 'game-5-2',
        levelId: 5,
        title: 'Box Model Buster',
        subtitle: 'Padding, Margin & BoxDecoration',
        mechanic: 'box-model-buster',
        description: 'Style Container cards matching exact padding, margin, border radius, gradient, and shadow specs without triggering decoration conflict assertions.',
        instructions: ['Tune margin vs padding', 'Apply BoxDecoration properties', 'Never combine outer color with decoration!'],
        estimatedMinutes: 5,
        xpReward: 110,
        config: { cards: 3 }
      },
      {
        id: 'game-5-3',
        levelId: 5,
        title: 'Widget Tree Inspector',
        subtitle: 'Minimalist Tree Construction',
        mechanic: 'widget-tree-inspector',
        description: 'Given a visual wireframe, determine the most efficient, minimal widget hierarchy without unnecessary nesting.',
        instructions: ['Eliminate redundant containers', 'Structure parent-child relationships', 'Choose ListView.builder for dynamic lists'],
        estimatedMinutes: 5,
        xpReward: 120,
        config: { wireframes: 3 }
      }
    ]
  },
  {
    id: 6,
    slug: 'stateful-widgets-interactivity',
    title: 'Stateful Widgets & Interactivity',
    subtitle: 'The Reactive Reaper',
    lectureRef: 'Lecture 4 (Slides 200–215) & Lecture 5 (Slides 262–329)',
    description: 'Master StatefulWidget lifecycle, setState() mechanics, building interactive games (Counter, Colored Square, Water Sort, Tic-Tac-Toe, Snake).',
    iconName: 'Gamepad2',
    topics: ['StatefulWidget & State<T>', 'Lifecycle (createState, initState, build, dispose)', 'setState(() {}) Mechanics', 'State Initialization Trap (Random() in build)', 'Hardcoded Switch Trap', 'Game State Logic (Tic-Tac-Toe, Snake)'],
    passingScorePercent: 70,
    bossChallenge: {
      id: 'boss-6',
      levelId: 6,
      title: 'Duel with the Reactive Reaper',
      bossName: 'The Reactive Reaper',
      bossTitle: 'Executioner of Dead State',
      lore: 'The Reaper reaps developers who mutate variables without calling setState or who re-randomize game state inside the build method.',
      description: 'Implement the complete interactive game logic for Tic-Tac-Toe (LAB-07/Lecture 5) or Rock-Paper-Scissors (CHAL-01), with turn management and win detection.',
      requirements: [
        'Model 3x3 board state as `List<String>` of 9 items',
        'Implement `makeMove(int index)` alternating between "X" and "O"',
        'Prevent moves on already-occupied cells or after game over',
        'Implement `checkWinner()` detecting 3-in-a-row (rows, cols, diagonals) and draws'
      ],
      starterCode: `class TicTacToeLogic {
  List<String> board = List.filled(9, '');
  String currentTurn = 'X';
  String? winner;
  bool isGameOver = false;

  bool makeMove(int index) {
    // TODO: Implement move validation, turn alternation, and win checking
    return false;
  }

  String? checkWinner() {
    // TODO: Check rows, columns, and diagonals
    return null;
  }
}
`,
      solutionCode: `class TicTacToeLogic {
  List<String> board = List.filled(9, '');
  String currentTurn = 'X';
  String? winner;
  bool isGameOver = false;

  bool makeMove(int index) {
    if (index < 0 || index >= 9 || board[index].isNotEmpty || isGameOver) {
      return false;
    }
    board[index] = currentTurn;
    winner = checkWinner();
    if (winner != null || !board.contains('')) {
      isGameOver = true;
    } else {
      currentTurn = currentTurn == 'X' ? 'O' : 'X';
    }
    return true;
  }

  String? checkWinner() {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    for (var line in lines) {
      if (board[line[0]].isNotEmpty &&
          board[line[0]] == board[line[1]] &&
          board[line[0]] == board[line[2]]) {
        return board[line[0]];
      }
    }
    return null;
  }
}
`,
      timeLimitSeconds: 600,
      testCases: [
        { id: 'tc-6-1', description: 'Horizontal row win detected for X', expectedOutput: 'X' },
        { id: 'tc-6-2', description: 'Cannot play on occupied cell', expectedOutput: false },
        { id: 'tc-6-3', description: 'Diagonal win detected for O', expectedOutput: 'O' },
      ]
    },
    miniGames: [
      {
        id: 'game-6-1',
        levelId: 6,
        title: 'State Matrix',
        subtitle: 'Rebuild Tracking & Dirty Elements',
        mechanic: 'state-matrix',
        description: 'Trace widget rebuilds across parent-child interactions and spot when variables desynchronize from UI due to missing setState().',
        instructions: ['Trace framework repaint triggers', 'Spot state mutations executed outside setState()', 'Ensure UI reflects in-memory state'],
        estimatedMinutes: 5,
        xpReward: 110,
        config: { cycles: 4 }
      },
      {
        id: 'game-6-2',
        levelId: 6,
        title: 'Lifecycle Sentry',
        subtitle: 'initState, build & dispose Ordering',
        mechanic: 'lifecycle-sentry',
        description: 'Order widget lifecycle methods correctly and place controllers, timers, and animations in their proper lifecycle hooks.',
        instructions: ['Put initial state setup in initState()', 'Keep build() pure and idempotent', 'Cancel timers and controllers in dispose()'],
        estimatedMinutes: 5,
        xpReward: 110,
        config: { steps: 5 }
      },
      {
        id: 'game-6-3',
        levelId: 6,
        title: 'Water Sort Puzzle',
        subtitle: 'Multi-Tube Color Sorting Logic',
        mechanic: 'water-sort-puzzle',
        description: 'Implement the authentic Water Sort game mechanics from Lecture 5 (List<List<Color>>, pour validation rules, win condition).',
        instructions: ['Pour colors between tubes according to rules', 'Only matching top colors can be transferred', 'Complete all tubes with uniform colors'],
        estimatedMinutes: 6,
        xpReward: 130,
        config: { tubes: 4 }
      }
    ]
  },
  {
    id: 7,
    slug: 'navigation-forms-persistence',
    title: 'Navigation, Forms & Data Persistence',
    subtitle: 'The Navigation Nemesis',
    lectureRef: 'Lecture 5 (Slides 330–364) & Lecture 6 (Slides 365–400)',
    description: 'Master the Navigator stack, named routes, passing arguments, GlobalKey<FormState>, TextFormField validators, and SharedPreferences JSON persistence.',
    iconName: 'Compass',
    topics: ['Navigator Stack (push, pop, pushReplacement)', 'pushAndRemoveUntil (stack clearing)', 'Awaiting Navigator.push results', 'Form & GlobalKey<FormState>', 'TextFormField vs TextField', 'SharedPreferences (Singleton, Local Scope)', 'JSON Serialization (json.encode vs toString)'],
    passingScorePercent: 70,
    bossChallenge: {
      id: 'boss-7',
      levelId: 7,
      title: 'Trial of the Navigation Nemesis',
      bossName: 'The Navigation Nemesis',
      bossTitle: 'Warden of the Screen Stack',
      lore: 'The Nemesis traps developers in infinite route loops or invalidates sessions when unparseable Map.toString() data is saved to disk.',
      description: 'Implement the complete Role-Based Authentication & Form Validation Engine (LAB-10 & LAB-12), validating credentials and returning route paths.',
      requirements: [
        'Validate Username: required, at least 4 characters, letters only (regex `^[a-zA-Z]+$`)',
        'Validate PIN: required, exactly 4 digits (regex `^\\d{4}$`)',
        'Return route `/student-dashboard` for student credentials, `/teacher-dashboard` for teacher',
        'Serialize session data to valid JSON string for SharedPreferences persistence'
      ],
      starterCode: `class AuthValidator {
  static String? validateUsername(String? value) {
    // TODO: Minimum 4 characters, letters only
    return null;
  }

  static String? validatePin(String? value) {
    // TODO: Exactly 4 numeric digits
    return null;
  }

  static String serializeUserSession(String username, String role) {
    // TODO: Return valid JSON string (NOT toString())
    return "";
  }
}
`,
      solutionCode: `import 'dart:convert';

class AuthValidator {
  static String? validateUsername(String? value) {
    if (value == null || value.isEmpty) return "Username required";
    if (value.length < 4) return "Must be at least 4 characters";
    if (!RegExp(r'^[a-zA-Z]+$').hasMatch(value)) return "Letters only";
    return null;
  }

  static String? validatePin(String? value) {
    if (value == null || value.isEmpty) return "PIN required";
    if (!RegExp(r'^\\d{4}$').hasMatch(value)) return "Must be exactly 4 digits";
    return null;
  }

  static String serializeUserSession(String username, String role) {
    return json.encode({
      "username": username,
      "role": role,
      "timestamp": DateTime.now().toIso8601String()
    });
  }
}
`,
      timeLimitSeconds: 600,
      testCases: [
        { id: 'tc-7-1', description: 'validateUsername("ali") returns error (too short)', expectedOutput: 'Must be at least 4 characters' },
        { id: 'tc-7-2', description: 'validateUsername("Sarah") returns null (valid)', expectedOutput: null },
        { id: 'tc-7-3', description: 'validatePin("123") returns error', expectedOutput: 'Must be exactly 4 digits' },
        { id: 'tc-7-4', description: 'serializeUserSession produces decodable JSON', expectedOutput: true },
      ]
    },
    miniGames: [
      {
        id: 'game-7-1',
        levelId: 7,
        title: 'Route Runner',
        subtitle: 'Navigation Stack Mastery',
        mechanic: 'route-runner',
        description: 'Execute route transitions (push, pop, pushReplacement, pushAndRemoveUntil) to traverse application paths without leaving dead ends.',
        instructions: ['Navigate between screens', 'Clear stack on logout using (route) => false', 'Return data via Navigator.pop(context, result)'],
        estimatedMinutes: 5,
        xpReward: 110,
        config: { stackDepth: 5 }
      },
      {
        id: 'game-7-2',
        levelId: 7,
        title: 'Form Fortress',
        subtitle: 'GlobalKey<FormState> & Validators',
        mechanic: 'form-fortress',
        description: 'Wire up a GlobalKey<FormState>, write regex validators for username/password, and handle submit buttons that trigger validate().',
        instructions: ['Use TextFormField instead of raw TextField', 'Return error strings or null from validators', 'Trigger validate() from external button'],
        estimatedMinutes: 5,
        xpReward: 120,
        config: { fields: 3 }
      },
      {
        id: 'game-7-3',
        levelId: 7,
        title: 'Serialization Sanctuary',
        subtitle: 'Safe SharedPreferences Persistence',
        mechanic: 'serialization-sanctuary',
        description: 'Persist complex nested collections into local storage using json.encode() and json.decode(), avoiding the fatal .toString() trap.',
        instructions: ['Serialize data models to valid JSON', 'Parse retrieved strings defensively', 'Handle null when key does not exist'],
        estimatedMinutes: 5,
        xpReward: 110,
        config: { datasets: 4 }
      }
    ]
  },
  {
    id: 8,
    slug: 'asynchronous-flutter-data',
    title: 'Asynchronous Programming & Data Loading',
    subtitle: 'The Asynchronous Apex',
    lectureRef: 'Lecture 3 (Slides 135–156) & Lecture 6 (Slides 401–438)',
    description: 'Master the Dart Event Loop, Future<T>, async/await, FutureBuilder (The Cafeteria Buzzer), avoiding infinite rebuilds, pull-to-refresh, and timer cleanup.',
    iconName: 'Zap',
    topics: ['Dart Event Loop (Microtasks vs Events)', 'Future<T>, async & await', 'FutureBuilder & The Cafeteria Buzzer', 'Infinite FutureBuilder Rebuild Trap', 'setState() in builder Error', 'Timer.periodic & dispose() Cleanup', 'HTTP Networking & JSON Decoding'],
    passingScorePercent: 70,
    bossChallenge: {
      id: 'boss-8',
      levelId: 8,
      title: 'Summit of the Asynchronous Apex',
      bossName: 'The Asynchronous Apex',
      bossTitle: 'Titan of the Event Loop',
      lore: 'The Apex incinerates applications that launch new HTTP requests inside build passes or leak periodic timers after unmounting.',
      description: 'Implement the authentic FutureBuilder REST API Integration (LAB-14), demonstrating cached future initialization in initState(), snapshot state handling, and timer cleanup.',
      requirements: [
        'Declare future variable in State and initialize it inside initState()',
        'Handle all 3 snapshot states: waiting (spinner), error (retry message), and data (list)',
        'Demonstrate pull-to-refresh method returning a Future',
        'Cancel all periodic timers inside dispose()'
      ],
      starterCode: `// Implement the FutureBuilder state manager simulation
class AsyncDataEngine {
  bool isTimerRunning = false;
  bool isFutureCachedInInitState = false;

  void onInitState() {
    // TODO: Cache future
  }

  String evaluateSnapshot(bool isWaiting, bool hasError, dynamic data) {
    // TODO: Return "LOADING", "ERROR", or "DATA"
    return "";
  }

  void onDispose() {
    // TODO: Cancel timer
  }
}
`,
      solutionCode: `class AsyncDataEngine {
  bool isTimerRunning = true;
  bool isFutureCachedInInitState = false;

  void onInitState() {
    isFutureCachedInInitState = true;
  }

  String evaluateSnapshot(bool isWaiting, bool hasError, dynamic data) {
    if (isWaiting) return "LOADING";
    if (hasError) return "ERROR";
    if (data != null) return "DATA";
    return "EMPTY";
  }

  void onDispose() {
    isTimerRunning = false;
  }
}
`,
      timeLimitSeconds: 600,
      testCases: [
        { id: 'tc-8-1', description: 'Future cached in initState prevents infinite rebuilds', expectedOutput: true },
        { id: 'tc-8-2', description: 'Snapshot in waiting state displays loading', expectedOutput: 'LOADING' },
        { id: 'tc-8-3', description: 'Timer canceled in dispose prevents memory leaks', expectedOutput: false },
      ]
    },
    miniGames: [
      {
        id: 'game-8-1',
        levelId: 8,
        title: 'Event Loop Enigma',
        subtitle: 'Microtasks, Events & Execution Order',
        mechanic: 'event-loop-enigma',
        description: 'Predict the exact console output sequence of synchronous code, scheduleMicrotask, Future.delayed, and Future.value.',
        instructions: ['Prioritize synchronous execution first', 'Process microtask queue before event queue', 'Determine exact log order'],
        estimatedMinutes: 5,
        xpReward: 120,
        config: { puzzles: 5 }
      },
      {
        id: 'game-8-2',
        levelId: 8,
        title: 'FutureBuilder Fixer',
        subtitle: 'Repairing Async UI Anti-Patterns',
        mechanic: 'futurebuilder-fixer',
        description: 'Diagnose and fix broken FutureBuilder snippets (calling future in build, calling setState in builder, missing hasData checks).',
        instructions: ['Move Future instantiation to initState()', 'Eliminate setState() calls from builder callbacks', 'Safeguard null checks with snapshot.hasData'],
        estimatedMinutes: 6,
        xpReward: 130,
        config: { snippets: 4 }
      },
      {
        id: 'game-8-3',
        levelId: 8,
        title: 'Stream & Polling Patrol',
        subtitle: 'Periodic Timers & Lifecycle Safety',
        mechanic: 'stream-patrol',
        description: 'Implement live data polling with Timer.periodic and pull-to-refresh with RefreshIndicator, ensuring 100% cleanup in dispose().',
        instructions: ['Wire RefreshIndicator to async refresh', 'Maintain periodic polling cadence', 'Cancel all timers on screen unmount'],
        estimatedMinutes: 5,
        xpReward: 110,
        config: { scenarios: 3 }
      }
    ]
  }
];
