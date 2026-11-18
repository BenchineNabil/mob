export interface TestCase {
  id: string;
  description: string;
  expectedOutput: any;
}

export interface CodingChallenge {
  id: string;
  title: string;
  category: 'foundations' | 'oop' | 'patterns' | 'advanced' | 'scratch' | 'sandbox';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Hard';
  description: string;
  instructions: string[];
  starterCode: string;
  zeroScratchCode: string;
  testCases: TestCase[];
}

export const ALL_CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: 'chal-algo-1',
    title: 'LAB-01: Palindrome & Binary Converter',
    category: 'foundations',
    difficulty: 'Beginner',
    description: 'Implement core string inspection and numeral system conversion in pure Dart.',
    instructions: [
      'Implement bool isPalindrome(String input) - return true if input reads the same forward and backwards (case-insensitive).',
      'Implement String decimalTobinary(int input) - convert any non-negative integer into its binary string representation.',
    ],
    starterCode: `// LAB-01: Implement the functions below

bool isPalindrome(String input) {
  // TODO: Implement case-insensitive palindrome checker
  return false;
}

String decimalTobinary(int input) {
  // TODO: Convert decimal integer into binary string
  return "";
}

void main() {
  print("radar is palindrome: \${isPalindrome('radar')}");
  print("10 in binary: \${decimalTobinary(10)}");
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Implement both functions completely from scratch
// bool isPalindrome(String input)
// String decimalTobinary(int input)

void main() {
  
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
    id: 'chal-oop-1',
    title: 'LAB-03: Phrase Class Encapsulation & Getters',
    category: 'oop',
    difficulty: 'Intermediate',
    description: 'Construct a robust Dart model class with private fields, named constructors, and custom computed getters.',
    instructions: [
      'Encapsulate private field final String _text.',
      'Provide default constructor Phrase(this._text) and named constructor Phrase.empty() : _text = "".',
      'Implement getter text returning _text.',
      'Implement getter isPalindrome returning boolean check.',
      'Implement getter capitalized returning the text with its first letter uppercase.',
      'Implement getter vowelCount returning the number of vowels (a, e, i, o, u).',
    ],
    starterCode: `class Phrase {
  final String _text;

  // Constructors
  Phrase(this._text);
  Phrase.empty() : _text = "";

  String get text => _text;

  // TODO: Getter isPalindrome
  bool get isPalindrome => false;

  // TODO: Getter capitalized
  String get capitalized => "";

  // TODO: Getter vowelCount
  int get vowelCount => 0;

  @override
  String toString() => _text;
}

void main() {
  final p = Phrase("flutter");
  print("\${p.text} capitalized: \${p.capitalized}, vowels: \${p.vowelCount}");
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Write the complete Phrase class from line 1
// Requirements: _text private field, Phrase(this._text), Phrase.empty(),
// getters: text, isPalindrome, capitalized, vowelCount

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'Phrase("level").isPalindrome returns true', expectedOutput: true },
      { id: 't2', description: 'Phrase("dart").capitalized returns "Dart"', expectedOutput: 'Dart' },
      { id: 't3', description: 'Phrase("education").vowelCount returns 5', expectedOutput: 5 },
    ],
  },
  {
    id: 'chal-pat-1',
    title: 'LAB-04: CounterStore Singleton Pattern',
    category: 'patterns',
    difficulty: 'Intermediate',
    description: 'Implement a thread-safe Singleton store in Dart with factory constructor and state synchronization.',
    instructions: [
      'Declare private constructor CounterStore._internal().',
      'Declare static final CounterStore _instance = CounterStore._internal().',
      'Declare factory constructor CounterStore() => _instance.',
      'Manage integer count with increment(), decrement(), and reset().',
    ],
    starterCode: `class CounterStore {
  // TODO: Declare private constructor CounterStore._internal()
  // TODO: Declare static final _instance
  // TODO: Declare factory constructor CounterStore()

  int _count = 0;
  int get count => _count;

  void increment() => _count++;
  void decrement() => _count--;
  void reset() => _count = 0;
}

void main() {
  var s1 = CounterStore();
  var s2 = CounterStore();
  s1.increment();
  print("Identical: \${identical(s1, s2)}, count: \${s2.count}");
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Implement the CounterStore Singleton from scratch
// Private constructor, static instance, factory constructor, increment/reset

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'CounterStore() returns identical instance', expectedOutput: true },
      { id: 't2', description: 'State increment is synchronized across references', expectedOutput: 1 },
    ],
  },
  {
    id: 'chal-math-1',
    title: 'Vector3D Operator Overloading Engine',
    category: 'oop',
    difficulty: 'Intermediate',
    description: 'Build a 3D Vector mathematical engine utilizing Dart operator overloading and getters.',
    instructions: [
      'Create immutable class Vector3D with final double x, y, z.',
      'Overload operator + (Vector3D other) returning new Vector3D.',
      'Overload operator - (Vector3D other) returning new Vector3D.',
      'Overload operator * (double scalar) returning new scaled Vector3D.',
      'Implement double dot(Vector3D other) computing the dot product.',
      'Implement double get magnitude computing sqrt(x*x + y*y + z*z).',
    ],
    starterCode: `import 'dart:math';

class Vector3D {
  final double x;
  final double y;
  final double z;

  const Vector3D(this.x, this.y, this.z);

  // TODO: operator +
  // TODO: operator -
  // TODO: operator *
  // TODO: dot()
  // TODO: magnitude
  
  double get magnitude => 0.0;
}

void main() {
  const v1 = Vector3D(1.0, 2.0, 3.0);
  const v2 = Vector3D(4.0, 5.0, 6.0);
  print("v1 magnitude: \${v1.magnitude}");
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Build the complete Vector3D mathematical library from scratch
// Operators: +, -, *, dot product, magnitude

import 'dart:math';

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'Vector3D operator + adds components correctly', expectedOutput: true },
      { id: 't2', description: 'Vector3D dot product calculates x1*x2 + y1*y2 + z1*z2', expectedOutput: true },
      { id: 't3', description: 'Vector3D magnitude returns vector Euclidean length', expectedOutput: true },
    ],
  },
  {
    id: 'chal-pat-2',
    title: 'Enterprise AuthRepository & Custom Exception',
    category: 'patterns',
    difficulty: 'Hard',
    description: 'Implement a comprehensive repository layer with interface segregation, custom exceptions, and token state.',
    instructions: [
      'Define abstract class AuthRepository with methods login, logout, and getters isAuthenticated, currentToken.',
      'Define custom exception AuthException implements Exception with String message.',
      'Implement MockAuthRepository implements AuthRepository.',
      'login throws AuthException if password length < 6.',
      'login sets currentToken to "token_123" and isAuthenticated = true.',
      'logout clears token and sets isAuthenticated = false.',
    ],
    starterCode: `class AuthException implements Exception {
  final String message;
  AuthException(this.message);
  @override
  String toString() => "AuthException: $message";
}

class User {
  final String id;
  final String email;
  User(this.id, this.email);
}

abstract class AuthRepository {
  Future<User> login(String email, String password);
  Future<void> logout();
  bool get isAuthenticated;
  String? get currentToken;
}

class MockAuthRepository implements AuthRepository {
  String? _token;
  User? _currentUser;

  @override
  bool get isAuthenticated => _token != null;

  @override
  String? get currentToken => _token;

  @override
  Future<User> login(String email, String password) async {
    // TODO: Validate password length >= 6, throw AuthException if invalid
    // Set _token and _currentUser
    throw UnimplementedError();
  }

  @override
  Future<void> logout() async {
    // TODO: Clear _token and _currentUser
  }
}

void main() async {
  final repo = MockAuthRepository();
  print("Authenticated: \${repo.isAuthenticated}");
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Implement AuthException, AuthRepository interface, and MockAuthRepository
// Must support login, logout, token state, and password length validation

void main() async {

}
`,
    testCases: [
      { id: 't1', description: 'MockAuthRepository implements AuthRepository properly', expectedOutput: true },
      { id: 't2', description: 'AuthException thrown when password is under 6 characters', expectedOutput: true },
      { id: 't3', description: 'logout clears token and sets isAuthenticated to false', expectedOutput: false },
    ],
  },
  {
    id: 'chal-game-1',
    title: 'Tic-Tac-Toe Game Engine (Full State Machine)',
    category: 'advanced',
    difficulty: 'Hard',
    description: 'Create an authentic 3x3 Tic-Tac-Toe game engine that validates moves, alternates players, and detects wins and draws.',
    instructions: [
      'Maintain 3x3 grid List<List<String>> initialized with " " (spaces).',
      'Track currentPlayer: starts as "X", alternates between "X" and "O".',
      'Implement bool makeMove(int row, int col): returns false if cell occupied or out of bounds.',
      'Implement String? checkWinner(): checks all 3 rows, 3 columns, and 2 diagonals. Returns "X", "O", or null.',
      'Implement bool isBoardFull(): returns true if no empty spaces remain.',
      'Implement bool get isGameOver: returns true if winner exists or board is full.',
      'Implement void resetBoard(): clears board and sets currentPlayer back to "X".',
    ],
    starterCode: `class TicTacToeEngine {
  late List<List<String>> board;
  String currentPlayer = 'X';
  String? winner;

  TicTacToeEngine() {
    resetBoard();
  }

  void resetBoard() {
    board = List.generate(3, (_) => List.filled(3, ' '));
    currentPlayer = 'X';
    winner = null;
  }

  bool makeMove(int row, int col) {
    // TODO: Validate coordinates (0..2), ensure cell is ' '
    // Place current player symbol, check winner, alternate currentPlayer
    return false;
  }

  String? checkWinner() {
    // TODO: Check 3 rows, 3 cols, and 2 diagonals
    return null;
  }

  bool isBoardFull() {
    // TODO: Return true if no ' ' remains
    return false;
  }

  bool get isGameOver => winner != null || isBoardFull();
}

void main() {
  final game = TicTacToeEngine();
  game.makeMove(0, 0); // X
  game.makeMove(1, 0); // O
  game.makeMove(0, 1); // X
  game.makeMove(1, 1); // O
  game.makeMove(0, 2); // X wins!
  print("Winner: \${game.winner}");
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Build the complete TicTacToeEngine class from scratch
// Must implement makeMove(row, col), checkWinner(), isBoardFull(), resetBoard()

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'TicTacToeEngine detects horizontal row win', expectedOutput: 'X' },
      { id: 't2', description: 'TicTacToeEngine detects diagonal win', expectedOutput: 'O' },
      { id: 't3', description: 'makeMove rejects occupied cells and invalid coordinates', expectedOutput: false },
    ],
  },
  {
    id: 'chal-data-1',
    title: 'Generic LRU Cache with Eviction Policy',
    category: 'advanced',
    difficulty: 'Hard',
    description: 'Implement a high-performance Generic Least Recently Used (LRU) Cache data structure.',
    instructions: [
      'Create class LRUCache<K, V> with constructor LRUCache(this.capacity).',
      'Implement V? get(K key): returns cached value and marks key as most recently used.',
      'Implement void put(K key, V value): inserts or updates key-value pair. If capacity exceeded, evicts least recently used entry.',
      'Implement int get size returning current count of items.',
      'Implement void clear() resetting the cache.',
    ],
    starterCode: `class LRUCache<K, V> {
  final int capacity;
  final Map<K, V> _cache = {};

  LRUCache(this.capacity) {
    if (capacity <= 0) throw ArgumentError("Capacity must be > 0");
  }

  V? get(K key) {
    // TODO: Return value if present and refresh key to most-recently-used
    return null;
  }

  void put(K key, V value) {
    // TODO: Insert/update. If size exceeds capacity, evict oldest entry
  }

  int get size => _cache.length;
  void clear() => _cache.clear();
}

void main() {
  final cache = LRUCache<String, int>(2);
  cache.put("a", 1);
  cache.put("b", 2);
  cache.get("a"); // "a" is now most recent
  cache.put("c", 3); // "b" should be evicted
  print("a in cache: \${cache.get('a')}, b in cache: \${cache.get('b')}");
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Implement Generic LRUCache<K, V> completely from scratch
// Must support capacity, get(K), put(K, V), and automatic LRU eviction

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'LRUCache stores and retrieves elements by key', expectedOutput: true },
      { id: 't2', description: 'LRUCache evicts oldest accessed item when capacity is exceeded', expectedOutput: true },
      { id: 't3', description: 'get(key) refreshes access order to prevent premature eviction', expectedOutput: true },
    ],
  },
  {
    id: 'chal-async-1',
    title: 'Async Stream Sieve & Exponential Retry Fetcher',
    category: 'advanced',
    difficulty: 'Hard',
    description: 'Master Dart asynchronous streams, stream transformers, and fault-tolerant retry mechanisms.',
    instructions: [
      'Implement Stream<int> filterAndTransformStream(Stream<int> stream): filter only positive even numbers and yield their squares.',
      'Implement Future<T> retryOperation<T>(Future<T> Function() action, int maxAttempts): retry action on failure up to maxAttempts.',
    ],
    starterCode: `import 'dart:async';

Stream<int> filterAndTransformStream(Stream<int> stream) async* {
  // TODO: Yield squared value for each positive even integer
  // Ignore odd numbers and non-positive numbers
}

Future<T> retryOperation<T>(Future<T> Function() action, int maxAttempts) async {
  // TODO: Execute action. If it throws, retry until maxAttempts is reached.
  // Re-throw last exception if all attempts fail.
  throw UnimplementedError();
}

void main() async {
  final stream = Stream.fromIterable([1, 2, 3, 4, -2, 6]);
  await for (var val in filterAndTransformStream(stream)) {
    print("Transformed: $val");
  }
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Implement async* stream processor and retryOperation from scratch

import 'dart:async';

void main() async {

}
`,
    testCases: [
      { id: 't1', description: 'filterAndTransformStream filters evens and yields squares', expectedOutput: true },
      { id: 't2', description: 'retryOperation succeeds on retry after initial failure', expectedOutput: true },
    ],
  },
  {
    id: 'chal-state-1',
    title: 'Stateful Undo/Redo History Store Stack',
    category: 'advanced',
    difficulty: 'Hard',
    description: 'Implement an immutable state management history store with bidirectional undo and redo navigation.',
    instructions: [
      'Create class HistoryStore<T> with constructor HistoryStore(T initial).',
      'Implement void execute(T nextState): pushes to undo stack and clears redo stack.',
      'Implement bool get canUndo and bool get canRedo.',
      'Implement T undo(): moves current state to redo stack, returns previous state.',
      'Implement T redo(): moves redo state back to current state.',
      'Implement T get currentState.',
    ],
    starterCode: `class HistoryStore<T> {
  T _current;
  final List<T> _undoStack = [];
  final List<T> _redoStack = [];

  HistoryStore(this._current);

  T get currentState => _current;
  bool get canUndo => _undoStack.isNotEmpty;
  bool get canRedo => _redoStack.isNotEmpty;

  void execute(T nextState) {
    // TODO: Push current to undoStack, set _current = nextState, clear redoStack
  }

  T undo() {
    // TODO: Pop from undoStack, push current to redoStack, update _current
    return _current;
  }

  T redo() {
    // TODO: Pop from redoStack, push current to undoStack, update _current
    return _current;
  }
}

void main() {
  final history = HistoryStore<String>("Page 1");
  history.execute("Page 2");
  history.execute("Page 3");
  print("Current: \${history.currentState}");
  history.undo();
  print("After undo: \${history.currentState}");
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Implement HistoryStore<T> from scratch with full undo/redo stack

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'HistoryStore executes and tracks currentState updates', expectedOutput: true },
      { id: 't2', description: 'HistoryStore correctly undoes to previous state', expectedOutput: true },
      { id: 't3', description: 'HistoryStore redos previously undone states', expectedOutput: true },
    ],
  },
  {
    id: 'chal-scratch-1',
    title: '[FROM ZERO] Prime Sieve & Math Utilities',
    category: 'scratch',
    difficulty: 'Hard',
    description: 'Write an entire mathematical utility class from zero lines of starter code.',
    instructions: [
      'Write class MathUtils from scratch.',
      'Add static bool isPrime(int n): returns true if n is prime (n >= 2).',
      'Add static List<int> sieveOfEratosthenes(int max): returns all primes <= max.',
      'Add static int gcd(int a, int b): computes greatest common divisor via Euclidean algorithm.',
    ],
    starterCode: `// Blank canvas: Write class MathUtils completely from scratch
// Static methods required:
// - static bool isPrime(int n)
// - static List<int> sieveOfEratosthenes(int max)
// - static int gcd(int a, int b)

class MathUtils {
  // Write your code here:
}

void main() {
  print("Is 17 prime? \${MathUtils.isPrime(17)}");
  print("Primes up to 20: \${MathUtils.sieveOfEratosthenes(20)}");
  print("GCD(48, 18): \${MathUtils.gcd(48, 18)}");
}
`,
    zeroScratchCode: `// WRITE COMPLETELY FROM SCRATCH (NO SCAFFOLDING):
// class MathUtils with isPrime, sieveOfEratosthenes, and gcd

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'MathUtils.isPrime(17) returns true and isPrime(4) returns false', expectedOutput: true },
      { id: 't2', description: 'MathUtils.sieveOfEratosthenes(10) returns [2, 3, 5, 7]', expectedOutput: true },
      { id: 't3', description: 'MathUtils.gcd(48, 18) returns 6', expectedOutput: 6 },
    ],
  },
  {
    id: 'chal-scratch-2',
    title: '[FROM ZERO] Custom Generic Stack Data Structure',
    category: 'scratch',
    difficulty: 'Hard',
    description: 'Construct a Generic Stack<T> collection entirely from scratch with boundary safety checks.',
    instructions: [
      'Implement class CustomStack<T>.',
      'Implement void push(T item).',
      'Implement T pop(): throws StateError if stack is empty.',
      'Implement T peek(): returns top element without removing, throws StateError if empty.',
      'Implement bool get isEmpty and int get size.',
    ],
    starterCode: `// Blank canvas: Implement CustomStack<T> completely from scratch
// Methods required: push(item), pop(), peek(), isEmpty, size

class CustomStack<T> {
  // Write your code here
}

void main() {
  final s = CustomStack<int>();
  s.push(10);
  s.push(20);
  print("Top: \${s.peek()}, popped: \${s.pop()}");
}
`,
    zeroScratchCode: `// WRITE COMPLETELY FROM ZERO:
// class CustomStack<T> with push, pop, peek, isEmpty, size

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'CustomStack pushes and pops elements in LIFO order', expectedOutput: true },
      { id: 't2', description: 'CustomStack peek returns top without removing', expectedOutput: true },
      { id: 't3', description: 'CustomStack pop on empty stack throws StateError', expectedOutput: true },
    ],
  },
  {
    id: 'chal-sandbox',
    title: 'Freeform Pure Dart 3 Sandbox',
    category: 'sandbox',
    difficulty: 'Beginner',
    description: 'Freeform scratchpad to write and test arbitrary Dart 3 algorithms, async code, records, and patterns.',
    instructions: [
      'Write any valid Dart 3 code.',
      'Use the Run button to execute and inspect the console output.',
    ],
    starterCode: `import 'dart:async';

void main() async {
  print("🚀 Welcome to the ENSIA Dart Coding Sandbox!");
  
  // Test Event Loop queue priority:
  scheduleMicrotask(() => print("1. Microtask executed"));
  Future(() => print("2. Event queue Future executed"));
  print("3. Synchronous main completed");
  
  // Dart 3 Record pattern test:
  var (name, score) = ("Bouchrika Beater", 100);
  print("Record: $name reached $score% accuracy");
}
`,
    zeroScratchCode: `void main() {
  
}
`,
    testCases: [],
  },
];
