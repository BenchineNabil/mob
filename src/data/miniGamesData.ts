import { Question } from '../types';
import { QUESTIONS_BY_LEVEL } from './questions';

export interface MiniGameQuestion {
  id: string;
  codeSnippet?: string;
  prompt: string;
  options: { key: string; label: string }[];
  correctAnswer: string;
  explanation: string;
  trapNote?: string;
}

export interface MiniGamePack {
  gameId: string;
  mechanic: string;
  title: string;
  rounds: MiniGameQuestion[];
}

export function convertQuestionToMiniGame(q: Question): MiniGameQuestion {
  let options: { key: string; label: string }[] = [];
  let correctAnswer = '';

  if (q.options && q.options.length > 0) {
    options = q.options.map((opt, idx) => ({
      key: `opt_${idx}`,
      label: opt,
    }));

    if (typeof q.correctAnswer === 'number') {
      correctAnswer = `opt_${q.correctAnswer}`;
    } else {
      const idx = q.options.findIndex((o) => o === q.correctAnswer);
      correctAnswer = idx !== -1 ? `opt_${idx}` : `opt_0`;
    }
  } else if (q.type === 'true-false') {
    options = [
      { key: 'opt_true', label: 'True' },
      { key: 'opt_false', label: 'False' },
    ];
    correctAnswer = q.correctAnswer === true || q.correctAnswer === 'true' ? 'opt_true' : 'opt_false';
  }

  return {
    id: q.id,
    prompt: q.prompt,
    codeSnippet: q.codeSnippet,
    options,
    correctAnswer,
    explanation: q.explanation,
    trapNote: q.trapWarning,
  };
}

export const MINI_GAME_PACKS: Record<string, MiniGameQuestion[]> = {
  // ==========================================
  // LEVEL 1: DART FOUNDATIONS
  // ==========================================
  'game-1-1': [ // Type Detective
    {
      id: 'td-1',
      codeSnippet: `const List<int> numbers = [1, 2, 3];\nnumbers.add(4);`,
      prompt: 'What happens when this Dart code is compiled and executed?',
      options: [
        { key: 'compile_error', label: 'Compilation Error' },
        { key: 'runtime_crash', label: 'Runtime Crash (UnsupportedOperation)' },
        { key: 'success', label: 'Executes Cleanly' },
      ],
      correctAnswer: 'runtime_crash',
      explanation: 'In Dart, const collections are deeply immutable at runtime. The .add() method exists on the List interface so it compiles fine, but executing it throws an UnsupportedError at runtime.',
      trapNote: 'Prof. Bouchrika loves contrasting compile-time checks vs runtime immutability on const vs final lists!'
    },
    {
      id: 'td-2',
      codeSnippet: `int result = 9 / 3;\nprint(result);`,
      prompt: 'What is the outcome of compiling and executing this division?',
      options: [
        { key: 'compile_error', label: 'Compilation Error' },
        { key: 'runtime_crash', label: 'Runtime Crash' },
        { key: 'success', label: 'Prints 3' },
      ],
      correctAnswer: 'compile_error',
      explanation: 'In Dart, standard division (/) ALWAYS produces a double (3.0), even when the division is exact! Assigning double to int causes a compile-time type mismatch. To get an int, use the ~/ operator.',
      trapNote: 'Always remember: ~/ is integer division (truncating), / always yields a double.'
    },
    {
      id: 'td-3',
      codeSnippet: `class Student {\n  static int count = 0;\n  String name;\n  Student(this.name);\n}\n\nvoid main() {\n  var s = Student("Sara");\n  print(s.count);\n}`,
      prompt: 'Can a static class variable be accessed through an instance in Dart?',
      options: [
        { key: 'compile_error', label: 'Compilation Error' },
        { key: 'runtime_crash', label: 'Runtime Crash' },
        { key: 'success', label: 'Prints 0' },
      ],
      correctAnswer: 'compile_error',
      explanation: 'Unlike Java or C++, Dart strictly forbids accessing static members through instance references (s.count). You MUST access static members via the class name directly: Student.count.',
      trapNote: 'Classic exam trap: accessing ClassName.staticMember is valid, instance.staticMember is a compile error.'
    },
    {
      id: 'td-4',
      codeSnippet: `late String message;\nprint(message.length);`,
      prompt: 'What happens when reading a late variable before initializing it?',
      options: [
        { key: 'compile_error', label: 'Compilation Error' },
        { key: 'runtime_crash', label: 'Runtime Crash (LateInitializationError)' },
        { key: 'success', label: 'Prints null' },
      ],
      correctAnswer: 'runtime_crash',
      explanation: 'The "late" keyword tells the Dart analyzer "trust me, this non-nullable variable will be initialized before read". Because the analyzer trusts you, it compiles cleanly, but crashes at runtime with LateInitializationError.',
      trapNote: 'late variables bypass compile-time null checks; reading an unassigned late variable throws LateInitializationError.'
    },
    {
      id: 'td-5',
      codeSnippet: `final List<int> items = [10, 20];\nitems.add(30);\nprint(items.length);`,
      prompt: 'Can a final List undergo in-place mutation?',
      options: [
        { key: 'compile_error', label: 'Compilation Error' },
        { key: 'runtime_crash', label: 'Runtime Crash' },
        { key: 'success', label: 'Executes Cleanly (Prints 3)' },
      ],
      correctAnswer: 'success',
      explanation: 'final creates an immutable variable reference, NOT an immutable collection! You cannot reassign "items = [1, 2]", but you CAN mutate the contents of the existing list.',
      trapNote: 'final = cannot reassign variable. const = both the variable and the underlying collection are immutable.'
    },
  ],

  'game-1-2': [ // Collection Crusher
    {
      id: 'cc-1',
      codeSnippet: `var list1 = [1, 2];\nvar list2 = [0, ...list1, 3];\nprint(list2);`,
      prompt: 'What is the content of list2 using the spread operator (...) ?',
      options: [
        { key: 'nested', label: '[0, [1, 2], 3]' },
        { key: 'flattened', label: '[0, 1, 2, 3]' },
        { key: 'error', label: 'Compilation Error' },
      ],
      correctAnswer: 'flattened',
      explanation: 'The spread operator (...) unpacks all elements of list1 into list2 individually, resulting in a single flat list: [0, 1, 2, 3].',
    },
    {
      id: 'cc-2',
      codeSnippet: `bool isLoggedIn = false;\nvar navItems = [\n  'Home',\n  if (isLoggedIn) 'Profile' else 'Login',\n  'Settings'\n];\nprint(navItems);`,
      prompt: 'What does the collection-if expression evaluate to when isLoggedIn is false?',
      options: [
        { key: 'a', label: '[Home, Login, Settings]' },
        { key: 'b', label: '[Home, Profile, Settings]' },
        { key: 'c', label: '[Home, null, Settings]' },
      ],
      correctAnswer: 'a',
      explanation: 'Dart supports collection-if with optional else branches. When isLoggedIn is false, the else branch evaluates to "Login", giving [Home, Login, Settings].',
    },
    {
      id: 'cc-3',
      codeSnippet: `var numbers = [1, 2, 2, 3, 3, 4];\nvar unique = numbers.toSet().toList();\nprint(unique.length);`,
      prompt: 'What is the length of unique after converting to a Set and back to List?',
      options: [
        { key: '4', label: '4' },
        { key: '6', label: '6' },
        { key: 'error', label: 'Error' },
      ],
      correctAnswer: '4',
      explanation: 'Converting to a Set strips duplicate elements (2 and 3), leaving 4 unique values: [1, 2, 3, 4].',
    },
    {
      id: 'cc-4',
      codeSnippet: `var map = {'a': 1, 'b': 2};\nprint(map['c'] ?? 0);`,
      prompt: 'What value is printed when accessing a missing Map key with ?? 0 ?',
      options: [
        { key: '0', label: '0' },
        { key: 'null', label: 'null' },
        { key: 'crash', label: 'Throws NoSuchKeyException' },
      ],
      correctAnswer: '0',
      explanation: 'Accessing a missing key in a Dart Map safely returns null. The ?? operator provides 0 as fallback.',
    },
  ],

  'game-1-3': [ // Operator Overdrive
    {
      id: 'oo-1',
      codeSnippet: `int a = 11 ~/ 4;\nprint(a);`,
      prompt: 'What is the value of 11 ~/ 4 in Dart?',
      options: [
        { key: '2', label: '2' },
        { key: '2.75', label: '2.75' },
        { key: '3', label: '3' },
      ],
      correctAnswer: '2',
      explanation: 'The ~/ operator performs integer truncating division, returning 2 (11 divided by 4 truncated).',
    },
    {
      id: 'oo-2',
      codeSnippet: `String? text;\nprint(text?.length ?? 0);`,
      prompt: 'What is printed when evaluating null-aware navigation on null text?',
      options: [
        { key: '0', label: '0' },
        { key: 'null', label: 'null' },
        { key: 'crash', label: 'NullCheckError' },
      ],
      correctAnswer: '0',
      explanation: 'text is null so text?.length returns null; the fallback ?? operator resolves to 0.',
    },
    {
      id: 'oo-3',
      codeSnippet: `var buffer = StringBuffer()\n  ..write('Dart')\n  ..write(' ')\n  ..write('Quest');\nprint(buffer.toString());`,
      prompt: 'What does the cascade operator (..) return on each method invocation?',
      options: [
        { key: 'target', label: 'The original target object (StringBuffer)' },
        { key: 'void', label: 'void' },
        { key: 'result', label: 'The result of write()' },
      ],
      correctAnswer: 'target',
      explanation: 'The cascade operator (..) performs an operation on an object and returns the original target object itself, enabling fluent method chaining.',
    },
  ],

  // ==========================================
  // LEVEL 2: TDD & CLEAN CODE
  // ==========================================
  'game-2-1': [ // Test-First Architect
    {
      id: 'tfa-1',
      prompt: 'What is the mandatory first step in strict Test-Driven Development (TDD)?',
      options: [
        { key: 'code', label: 'Write the simplest working production code' },
        { key: 'test', label: 'Write a failing unit test that verifies a requirement (RED)' },
        { key: 'refactor', label: 'Design the database schema and class hierarchy' },
      ],
      correctAnswer: 'test',
      explanation: 'In TDD (Red-Green-Refactor), you MUST write a failing test first (RED) before writing any implementation code. This ensures the test is actually testing the requirement.',
    },
    {
      id: 'tfa-2',
      codeSnippet: `test('calculates discount correctly', () => {\n  // Test passes without writing any code!\n});`,
      prompt: 'What dangerous anti-pattern occurs if a new unit test passes before the code is implemented?',
      options: [
        { key: 'good', label: 'High Developer Productivity' },
        { key: 'trap', label: 'False Confidence Trap (Test is not actually testing the code)' },
        { key: 'mock', label: 'Over-Mocking' },
      ],
      correctAnswer: 'trap',
      explanation: 'If a test passes before writing code, it is either testing a tautology or testing the wrong target. A test must fail for the right reason first.',
    },
    {
      id: 'tfa-3',
      prompt: 'In TDD, once the test passes (GREEN), what is the immediate next step?',
      options: [
        { key: 'refactor', label: 'Refactor to clean code while keeping tests green' },
        { key: 'next', label: 'Immediately write the next feature without refactoring' },
        { key: 'delete', label: 'Delete the test to save execution time' },
      ],
      correctAnswer: 'refactor',
      explanation: 'The third phase of TDD is REFACTOR: clean up duplication, improve naming, and simplify logic while ensuring tests stay green.',
    },
  ],

  'game-2-2': [ // Assertion Assailant
    {
      id: 'aa-1',
      codeSnippet: `expect(() => parseAge(-5), throwsA(isA<ArgumentError>()));`,
      prompt: 'Why must the target expression inside expect() be wrapped in an anonymous function closure () => ...?',
      options: [
        { key: 'closure', label: 'To allow expect() to catch the thrown exception during execution' },
        { key: 'async', label: 'Because all tests in Dart must be asynchronous' },
        { key: 'type', label: 'Because Dart does not allow calling functions directly' },
      ],
      correctAnswer: 'closure',
      explanation: 'If you evaluate parseAge(-5) directly, the exception throws before expect() can intercept it! Passing a closure lets expect() run the code inside a try-catch block.',
    },
    {
      id: 'aa-2',
      codeSnippet: `expect(items, hasLength(3));\nexpect(items, contains('Admin'));`,
      prompt: 'Which matcher verifies both collection size and element presence in package:test?',
      options: [
        { key: 'valid', label: 'hasLength and contains matchers' },
        { key: 'equals', label: 'equalsExact matcher' },
        { key: 'none', label: 'Dart does not support matchers' },
      ],
      correctAnswer: 'valid',
      explanation: 'package:test provides composable matchers like hasLength(), contains(), equals(), and isNot().',
    },
    {
      id: 'aa-3',
      codeSnippet: `var a = [1, 2];\nvar b = [1, 2];\nexpect(a, equals(b)); // check 1\nexpect(identical(a, b), isFalse); // check 2`,
      prompt: 'In package:test, does equals() perform value equality or reference identity on collections?',
      options: [
        { key: 'value', label: 'Value equality (deep element comparison)' },
        { key: 'reference', label: 'Reference identity (memory address)' },
        { key: 'hash', label: 'Memory hash equality only' },
      ],
      correctAnswer: 'value',
      explanation: 'equals() compares collection elements deeply for value equivalence, whereas identical() checks memory identity.',
    },
  ],

  'game-2-3': [ // Clean Code Refactorer
    {
      id: 'ccr-1',
      prompt: 'Why is using print() in production Flutter apps considered a serious code smell?',
      options: [
        { key: 'leak', label: 'Exposes sensitive debug logs in release logs and blocks synchronous I/O' },
        { key: 'crash', label: 'print() crashes Android devices in release mode' },
        { key: 'memory', label: 'print() causes fatal out-of-memory errors' },
      ],
      correctAnswer: 'leak',
      explanation: 'print() statements pollute system logcat in release builds and lack log levels (info, warning, error). A structured logger should always be used.',
    },
    {
      id: 'ccr-2',
      prompt: 'According to Clean Code standards for Dart/Flutter, what is the maximum recommended file size?',
      options: [
        { key: '200', label: 'Around 200 lines (single responsibility per file)' },
        { key: '1000', label: 'At least 1,000 lines' },
        { key: 'nolimit', label: 'Dart has no recommended file size limit' },
      ],
      correctAnswer: '200',
      explanation: 'Files exceeding 200–300 lines typically violate the Single Responsibility Principle and should be modularized.',
    },
  ],

  // ==========================================
  // LEVEL 3: OOP DART
  // ==========================================
  'game-3-1': [ // Constructor Crafter
    {
      id: 'crafter-1',
      codeSnippet: `class Point {\n  final int x;\n  final int y;\n  Point(int x, int y) {\n    this.x = x; // Error!\n    this.y = y;\n  }\n}`,
      prompt: 'Why does this generative constructor produce a compilation error?',
      options: [
        { key: 'final', label: 'final fields cannot be assigned inside constructor bodies' },
        { key: 'this', label: 'this cannot be used inside constructor bodies' },
        { key: 'return', label: 'Constructor body is missing a return statement' },
      ],
      correctAnswer: 'final',
      explanation: 'In Dart, final fields must be initialized before the constructor body runs! Use initializing formals: Point(this.x, this.y);',
    },
    {
      id: 'crafter-2',
      codeSnippet: `class ImmutableConfig {\n  final String apiKey;\n  const ImmutableConfig(this.apiKey);\n}\n\nvoid main() {\n  var c1 = const ImmutableConfig("SECRET");\n  var c2 = const ImmutableConfig("SECRET");\n  print(identical(c1, c2));\n}`,
      prompt: 'What will print to the console when comparing two identical const object instances?',
      options: [
        { key: 'true', label: 'true (Canonicalized into exact same in-memory instance)' },
        { key: 'false', label: 'false (Different object allocations)' },
        { key: 'error', label: 'Compilation Error' },
      ],
      correctAnswer: 'true',
      explanation: 'Dart canonicalizes const objects! Identical const instances constructed with the exact same values share the exact same memory address.',
    },
  ],

  'game-3-2': [ // Inheritance Inspector
    {
      id: 'ii-1',
      codeSnippet: `class Animal {\n  void makeSound() => print('Generic sound');\n}\n\nclass Dog implements Animal {\n  // Missing makeSound override!\n}`,
      prompt: 'What happens when using "implements" instead of "extends" without overriding makeSound()?',
      options: [
        { key: 'error', label: 'Compilation Error (Missing concrete implementation)' },
        { key: 'inherit', label: 'Inherits makeSound() from Animal automatically' },
        { key: 'crash', label: 'Runtime NoSuchMethodError' },
      ],
      correctAnswer: 'error',
      explanation: 'In Dart, every class defines an implicit interface. "implements" treats the superclass as an interface, requiring you to implement EVERY method from scratch!',
    },
    {
      id: 'ii-2',
      prompt: 'What is the key difference between "extends" and "with" (Mixins) in Dart?',
      options: [
        { key: 'mixin', label: 'extends allows single inheritance; mixins allow code reuse across multiple class hierarchies' },
        { key: 'same', label: 'There is no difference; they are exact aliases' },
        { key: 'speed', label: 'Mixins run on background threads' },
      ],
      correctAnswer: 'mixin',
      explanation: 'Dart is single-inheritance (extends). Mixins (with) allow you to inject reusable methods and state into multiple unrelated classes.',
    },
  ],

  'game-3-3': [ // Abstract Arena
    {
      id: 'aa3-1',
      codeSnippet: `abstract class Database {\n  void connect();\n}\n\nvoid main() {\n  var db = Database();\n}`,
      prompt: 'Can an abstract class with unimplemented methods be directly instantiated?',
      options: [
        { key: 'cannot', label: 'No, abstract classes cannot be directly instantiated' },
        { key: 'can', label: 'Yes, it initializes with null methods' },
        { key: 'warning', label: 'Yes, but with a runtime warning' },
      ],
      correctAnswer: 'cannot',
      explanation: 'Abstract classes cannot be instantiated with default constructors because they may contain abstract (unimplemented) members.',
    },
  ],

  // ==========================================
  // LEVEL 4: DESIGN PATTERNS
  // ==========================================
  'game-4-1': [ // Singleton Sentry
    {
      id: 'ss-1',
      codeSnippet: `class AppSession {\n  static final AppSession _instance = AppSession._internal();\n  AppSession._internal();\n  factory AppSession() => _instance;\n}`,
      prompt: 'Which component ensures that "AppSession()" returns the cached static _instance?',
      options: [
        { key: 'factory', label: 'The factory constructor returning the cached static _instance' },
        { key: 'private', label: 'The private constructor _internal' },
        { key: 'final', label: 'The final keyword on _instance' },
      ],
      correctAnswer: 'factory',
      explanation: 'A Dart factory constructor can return an existing cached instance from memory instead of allocating a new object.',
    },
    {
      id: 'ss-2',
      prompt: 'Why is the constructor "_internal()" marked with a leading underscore in Dart?',
      options: [
        { key: 'private', label: 'To make it library-private, preventing direct external instantiation' },
        { key: 'async', label: 'To make it asynchronous' },
        { key: 'static', label: 'To mark it as a static function' },
      ],
      correctAnswer: 'private',
      explanation: 'In Dart, leading underscores define library-private visibility. This prevents other files from calling AppSession._internal() directly.',
    },
  ],

  'game-4-2': [ // Factory Forge
    {
      id: 'ff-1',
      codeSnippet: `abstract class Dialog {\n  void show();\n  factory Dialog(String platform) {\n    if (platform == 'ios') return CupertinoDialog();\n    return MaterialDialog();\n  }\n}`,
      prompt: 'What pattern allows an abstract class to return different subclass instances through its factory?',
      options: [
        { key: 'factory', label: 'Factory Method Pattern' },
        { key: 'observer', label: 'Observer Pattern' },
        { key: 'singleton', label: 'Singleton Pattern' },
      ],
      correctAnswer: 'factory',
      explanation: 'Factory constructors allow abstract classes to instantiate concrete subclass implementations based on runtime parameters.',
    },
    {
      id: 'ff-2',
      prompt: 'Can a factory constructor contain asynchronous code (async)?',
      options: [
        { key: 'no', label: 'No, constructors in Dart can never be marked async' },
        { key: 'yes', label: 'Yes, factory constructors return Future<T>' },
        { key: 'sometimes', label: 'Only if the class extends Future' },
      ],
      correctAnswer: 'no',
      explanation: 'Constructors in Dart can NEVER be marked async. To perform asynchronous initialization, use a static async method (e.g., AppConfig.create()).',
    },
  ],

  'game-4-3': [ // Decorator Duel
    {
      id: 'dd-1',
      prompt: 'What is the primary benefit of the Repository Pattern in Flutter architecture?',
      options: [
        { key: 'decouple', label: 'Decouples UI and business logic from data sources (network vs local cache)' },
        { key: 'speed', label: 'Makes HTTP network requests 10x faster' },
        { key: 'widget', label: 'Replaces StatefulWidget with StatelessWidget' },
      ],
      correctAnswer: 'decouple',
      explanation: 'Repositories abstract data access behind clean interfaces, allowing UI and view-models to consume data without knowing if it comes from SQLite, Hive, or REST APIs.',
    },
  ],

  // ==========================================
  // LEVEL 5: FLUTTER FOUNDATIONS & LAYOUT
  // ==========================================
  'game-5-1': [ // Layout Labyrinth
    {
      id: 'll-1',
      codeSnippet: `Row(\n  children: [\n    Text("Title"),\n    Expanded(\n      child: Container(color: Colors.blue),\n    ),\n  ],\n)`,
      prompt: 'What is the role of Expanded when placed inside a Row?',
      options: [
        { key: 'fill', label: 'Forces the child to fill all remaining horizontal flex space' },
        { key: 'vertical', label: 'Forces the child to fill the full vertical screen height' },
        { key: 'wrap', label: 'Causes children to wrap onto multiple lines' },
      ],
      correctAnswer: 'fill',
      explanation: 'Inside a Row, Expanded consumes all remaining unoccupied horizontal space along the main axis.',
    },
    {
      id: 'll-2',
      codeSnippet: `Column(\n  children: [\n    ListView(\n      children: [Text("Item 1")],\n    ),\n  ],\n)`,
      prompt: 'What notorious layout error occurs when placing an unconstrained ListView inside a Column?',
      options: [
        { key: 'unbounded', label: 'Vertical viewport was given unbounded height error' },
        { key: 'null', label: 'NullPointer crash' },
        { key: 'clean', label: 'Executes cleanly' },
      ],
      correctAnswer: 'unbounded',
      explanation: 'A Column gives its children infinite vertical space, but a ListView tries to expand infinitely along its scroll axis, causing an unbounded height error! Wrap the ListView in Expanded.',
    },
  ],

  'game-5-2': [ // Widget Wizard
    {
      id: 'ww-1',
      prompt: 'Why are fields in a StatelessWidget declared final?',
      options: [
        { key: 'immutable', label: 'StatelessWidgets are immutable; their configurations cannot change after construction' },
        { key: 'static', label: 'Because all Flutter widgets are static singletons' },
        { key: 'speed', label: 'To prevent Flutter from garbage collecting the widget' },
      ],
      correctAnswer: 'immutable',
      explanation: 'Flutter widgets are lightweight configuration descriptions. StatelessWidget instances are strictly immutable, so all member fields must be final.',
    },
    {
      id: 'ww-2',
      codeSnippet: `Scaffold(\n  appBar: AppBar(title: Text("Home")),\n  body: Center(child: Text("Hello")),\n)`,
      prompt: 'Which widget provides the default visual structure (appBar, drawer, body, floatingActionButton) in Flutter?',
      options: [
        { key: 'scaffold', label: 'Scaffold' },
        { key: 'container', label: 'Container' },
        { key: 'material', label: 'MaterialApp' },
      ],
      correctAnswer: 'scaffold',
      explanation: 'Scaffold implements the basic Material Design visual layout structure for a screen.',
    },
  ],

  'game-5-3': [ // State Switcher
    {
      id: 'ss3-1',
      codeSnippet: `Stack(\n  children: [\n    Image.asset('bg.png'),\n    Positioned(\n      bottom: 20,\n      left: 20,\n      child: Text('Overlay'),\n    ),\n  ],\n)`,
      prompt: 'In a Stack widget, in what order are child widgets painted on the screen?',
      options: [
        { key: 'backtofront', label: 'Back to front: the first child is at the bottom, last child is on top' },
        { key: 'fronttoback', label: 'Front to back: the first child is on top' },
        { key: 'random', label: 'Asynchronously in random order' },
      ],
      correctAnswer: 'backtofront',
      explanation: 'Stack paints children in list order: children[0] is painted first (bottom layer), and subsequent children are layered on top.',
    },
  ],

  // ==========================================
  // LEVEL 6: STATEFUL WIDGETS & INTERACTIVITY
  // ==========================================
  'game-6-1': [ // Reactive Runner
    {
      id: 'rr6-1',
      codeSnippet: `int counter = 0;\nvoid increment() {\n  counter++;\n  // Missing setState!\n}`,
      prompt: 'What occurs when mutating a state variable in a StatefulWidget without calling setState()?',
      options: [
        { key: 'norebuild', label: 'The variable updates in memory, but Flutter does not rebuild the UI' },
        { key: 'crash', label: 'The app throws a StateError' },
        { key: 'rebuild', label: 'Flutter detects the variable change automatically and rebuilds' },
      ],
      correctAnswer: 'norebuild',
      explanation: 'setState() notifies the Flutter framework that the internal state of this object has changed, scheduling a build() for this State object.',
    },
    {
      id: 'rr6-2',
      prompt: 'Can setState() be called inside the build() method?',
      options: [
        { key: 'no', label: 'No, calling setState() during build causes an infinite recursive rebuild crash' },
        { key: 'yes', label: 'Yes, it is standard practice' },
        { key: 'warning', label: 'Only inside an if condition' },
      ],
      correctAnswer: 'no',
      explanation: 'Calling setState() during build() throws "!_dirty: setState() or markNeedsBuild() called during build". Build must be pure and idempotent.',
    },
  ],

  'game-6-2': [ // Stream Striker
    {
      id: 'str-1',
      prompt: 'Where should one-time resource initialization (like TextEditingController or AnimationController) occur in a StatefulWidget?',
      options: [
        { key: 'initState', label: 'initState()' },
        { key: 'build', label: 'build()' },
        { key: 'createState', label: 'createState()' },
      ],
      correctAnswer: 'initState',
      explanation: 'initState() is called exactly once when the State object is inserted into the tree, making it the proper place for one-time initializations.',
    },
    {
      id: 'str-2',
      prompt: 'Where must listeners, streams, and animation controllers be cleaned up to prevent memory leaks?',
      options: [
        { key: 'dispose', label: 'dispose()' },
        { key: 'deactivate', label: 'deactivate()' },
        { key: 'build', label: 'build()' },
      ],
      correctAnswer: 'dispose',
      explanation: 'dispose() is called when the State object is permanently removed from the tree. Controllers and subscriptions MUST be cancelled here.',
    },
  ],

  'game-6-3': [ // Bloc Bouncer
    {
      id: 'bb-1',
      codeSnippet: `Switch(\n  value: false,\n  onChanged: (val) {\n    setState(() { isChecked = val; });\n  },\n)`,
      prompt: 'Why does this Switch never visually toggle to true when tapped?',
      options: [
        { key: 'hardcoded', label: 'Because "value: false" is hardcoded instead of bound to "value: isChecked"' },
        { key: 'disabled', label: 'The switch is disabled' },
        { key: 'type', label: 'onChanged requires an integer' },
      ],
      correctAnswer: 'hardcoded',
      explanation: 'Switch is a controlled widget. Because "value: false" is hardcoded, every time setState rebuilds, the switch renders with false!',
    },
  ],

  // ==========================================
  // LEVEL 7: NAVIGATION, FORMS & PERSISTENCE
  // ==========================================
  'game-7-1': [ // Route Runner
    {
      id: 'rr-1',
      codeSnippet: `Navigator.pushAndRemoveUntil(\n  context,\n  MaterialPageRoute(builder: (_) => LoginScreen()),\n  (route) => false,\n);`,
      prompt: 'What does the predicate "(route) => false" accomplish during navigation?',
      options: [
        { key: 'clear', label: 'Destroys every existing route in the navigation stack (cannot go back)' },
        { key: 'keep', label: 'Keeps all routes in history' },
        { key: 'cancel', label: 'Cancels the navigation transition' },
      ],
      correctAnswer: 'clear',
      explanation: 'pushAndRemoveUntil pops routes backwards through the stack as long as the predicate returns false. Returning (route) => false clears the ENTIRE stack.',
    },
    {
      id: 'rr-2',
      codeSnippet: `final result = await Navigator.push(\n  context,\n  MaterialPageRoute(builder: (_) => SelectionScreen()),\n);`,
      prompt: 'How can a child screen pass data back to the awaiting Navigator.push caller?',
      options: [
        { key: 'pop', label: 'Navigator.pop(context, selectedData)' },
        { key: 'return', label: 'return selectedData from build()' },
        { key: 'state', label: 'Save data to a static variable' },
      ],
      correctAnswer: 'pop',
      explanation: 'Calling Navigator.pop(context, value) passes "value" back as the resolved result of the Future returned by Navigator.push.',
    },
  ],

  'game-7-2': [ // Storage Sentry
    {
      id: 'ss7-1',
      codeSnippet: `final prefs = await SharedPreferences.getInstance();\nawait prefs.setString('token', 'xyz123');`,
      prompt: 'What types of data can SharedPreferences store natively?',
      options: [
        { key: 'primitives', label: 'Primitives only: int, double, bool, String, and List<String>' },
        { key: 'objects', label: 'Any arbitrary Dart object instance without serialization' },
        { key: 'sql', label: 'Relational database tables' },
      ],
      correctAnswer: 'primitives',
      explanation: 'SharedPreferences only stores simple primitive key-value pairs. Complex objects must first be serialized to a JSON string using jsonEncode().',
    },
    {
      id: 'ss7-2',
      codeSnippet: `String jsonStr = jsonEncode(user.toMap());\nMap<String, dynamic> data = jsonDecode(jsonStr);`,
      prompt: 'Which library from the Dart SDK provides jsonEncode and jsonDecode?',
      options: [
        { key: 'convert', label: 'dart:convert' },
        { key: 'io', label: 'dart:io' },
        { key: 'core', label: 'dart:core' },
      ],
      correctAnswer: 'convert',
      explanation: 'dart:convert exports jsonEncode and jsonDecode for converting between Dart objects and JSON strings.',
    },
  ],

  'game-7-3': [ // Deep Linker
    {
      id: 'dl-1',
      codeSnippet: `final _formKey = GlobalKey<FormState>();\nif (_formKey.currentState!.validate()) {\n  // form is valid\n}`,
      prompt: 'What does _formKey.currentState!.validate() do?',
      options: [
        { key: 'validate', label: 'Executes the validator callback of every FormField in the Form' },
        { key: 'submit', label: 'Submits an HTTP POST request automatically' },
        { key: 'clear', label: 'Clears all input fields in the form' },
      ],
      correctAnswer: 'validate',
      explanation: 'validate() iterates through each FormField child in the tree, executes its validator callback, and returns true only if all return null (no errors).',
    },
  ],

  // ==========================================
  // LEVEL 8: ASYNCHRONOUS PROGRAMMING
  // ==========================================
  'game-8-1': [ // Event Loop Enigma
    {
      id: 'el-1',
      codeSnippet: `void main() {\n  print('1');\n  Future(() => print('2'));\n  scheduleMicrotask(() => print('3'));\n  print('4');\n}`,
      prompt: 'What is the exact printed sequence of this Dart program?',
      options: [
        { key: '1-4-3-2', label: '1, 4, 3, 2' },
        { key: '1-2-3-4', label: '1, 2, 3, 4' },
        { key: '1-3-4-2', label: '1, 3, 4, 2' },
        { key: '3-1-4-2', label: '3, 1, 4, 2' },
      ],
      correctAnswer: '1-4-3-2',
      explanation: 'Dart event loop priority: 1) Synchronous code executes first (1, 4). 2) Microtask queue executes next (3). 3) Event queue tasks execute last (2). Order is 1, 4, 3, 2.',
      trapNote: 'Prof. Bouchrika loves testing Event Loop order: Synchronous > Microtask Queue > Event Queue!'
    },
    {
      id: 'el-2',
      codeSnippet: `Future<void> demo() async {\n  print('A');\n  await Future.delayed(Duration.zero);\n  print('B');\n}\n\nvoid main() {\n  demo();\n  print('C');\n}`,
      prompt: 'What is the order of execution between demo() and main()?',
      options: [
        { key: 'A-C-B', label: 'A, C, B' },
        { key: 'A-B-C', label: 'A, B, C' },
        { key: 'C-A-B', label: 'C, A, B' },
      ],
      correctAnswer: 'A-C-B',
      explanation: 'An async function executes synchronously until the first "await"! "A" is printed synchronously. At "await Future.delayed", execution yields to main(), which prints "C". After the event loop ticks, demo() resumes and prints "B".',
      trapNote: 'Async functions DO NOT run on a background thread. They run on the main isolate and execute synchronously up to the first await!'
    },
  ],

  'game-8-2': [ // Async Assailant
    {
      id: 'aa8-1',
      codeSnippet: `try {\n  final res = await http.get(Uri.parse('https://api.example.com'));\n} catch (e) {\n  print('Caught error: $e');\n}`,
      prompt: 'How are unhandled exceptions in async/await code properly caught in Dart?',
      options: [
        { key: 'trycatch', label: 'Using standard try/catch blocks around the await expression' },
        { key: 'catchError', label: 'Only using Future.onError callbacks' },
        { key: 'impossible', label: 'Async exceptions cannot be caught in Dart' },
      ],
      correctAnswer: 'trycatch',
      explanation: 'await unwraps the Future; if the Future completes with an error, it is re-thrown as a standard Dart exception that standard try/catch blocks catch.',
    },
    {
      id: 'aa8-2',
      codeSnippet: `final results = await Future.wait([\n  fetchUserProfile(),\n  fetchUserPosts(),\n]);`,
      prompt: 'What is the behavior of Future.wait()?',
      options: [
        { key: 'parallel', label: 'Fires both futures concurrently and completes when all have completed' },
        { key: 'serial', label: 'Executes futures strictly sequentially one after another' },
        { key: 'first', label: 'Returns as soon as the first future completes and cancels the rest' },
      ],
      correctAnswer: 'parallel',
      explanation: 'Future.wait() waits for multiple futures to complete concurrently and returns a list of their results.',
    },
  ],

  'game-8-3': [ // Isolate Invader
    {
      id: 'ii8-1',
      codeSnippet: `FutureBuilder<String>(\n  future: fetchData(), // Error if instantiated directly in build!\n  builder: (context, snapshot) { ... },\n)`,
      prompt: 'Why should the future passed to FutureBuilder NOT be created directly inside the build() method?',
      options: [
        { key: 'rebuild', label: 'Every time the widget rebuilds, a brand-new Future is created, causing infinite refetch loops' },
        { key: 'crash', label: 'FutureBuilder cannot accept Futures' },
        { key: 'syntax', label: 'It causes a syntax error' },
      ],
      correctAnswer: 'rebuild',
      explanation: 'Calling fetchData() inside build() creates a new Future on every build, triggering snapshot reloading and infinite rebuild loops. The Future should be stored in a variable in initState()!',
      trapNote: 'Classic Bouchrika trap: Always initialize your Future in initState() or a state variable, NEVER in build()!'
    },
    {
      id: 'ii8-2',
      prompt: 'In Flutter, do Dart Isolates share memory with each other?',
      options: [
        { key: 'noshare', label: 'No, each Isolate has its own private heap memory and event loop' },
        { key: 'share', label: 'Yes, all Isolates share heap memory via mutex locks' },
        { key: 'sharednull', label: 'Only primitive variables are shared' },
      ],
      correctAnswer: 'noshare',
      explanation: 'Dart Isolates do not share memory! They communicate strictly by passing messages via SendPort and ReceivePort, eliminating thread concurrency locks and race conditions.',
    },
  ],
};

/**
 * Returns a randomized set of diverse, non-repeating questions for a mini-game.
 * Combines the mini-game's custom questions with questions from the level question bank,
 * shuffles them, and returns the requested number of unique rounds.
 */
export function getMiniGameRounds(gameId: string, levelId: number, count: number = 5): MiniGameQuestion[] {
  const customQuestions = MINI_GAME_PACKS[gameId] || [];

  // Also extract MCQs and error-analysis questions from the level bank
  const levelQuestions = QUESTIONS_BY_LEVEL[levelId] || [];
  const converted = levelQuestions
    .filter((q) => q.type === 'mcq' || q.type === 'output-prediction' || q.type === 'runtime-error-analysis' || q.type === 'compile-or-fail' || q.type === 'true-false')
    .map(convertQuestionToMiniGame)
    .filter((q) => q.options.length > 0 && q.correctAnswer);

  // Combine and deduplicate by prompt snippet
  const pool: MiniGameQuestion[] = [];
  const seen = new Set<string>();

  for (const q of [...customQuestions, ...converted]) {
    const key = q.prompt.trim().slice(0, 70);
    if (!seen.has(key)) {
      seen.add(key);
      pool.push(q);
    }
  }

  // Shuffle using Fisher-Yates
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Return requested count (default 5, or pool size if smaller)
  const targetCount = Math.min(count > 0 ? count : 5, shuffled.length);
  return shuffled.slice(0, targetCount);
}
