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

export const MINI_GAME_PACKS: Record<string, MiniGameQuestion[]> = {
  // Level 1: Dart Foundations
  'game-1-1': [ // Type Detective
    {
      id: 'td-1',
      codeSnippet: `const List<int> numbers = [1, 2, 3];
numbers.add(4);`,
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
      codeSnippet: `int result = 9 / 3;
print(result);`,
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
      codeSnippet: `class Student {
  static int count = 0;
  String name;
  Student(this.name);
}

void main() {
  var s = Student("Sara");
  print(s.count);
}`,
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
      codeSnippet: `late String message;
print(message.length);`,
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
      codeSnippet: `final List<int> items = [10, 20];
items.add(30);
print(items.length);`,
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

  'game-1-2': [ // Null Safety Labyrinth
    {
      id: 'ns-1',
      codeSnippet: `String? name;
int len = name?.length ?? -1;`,
      prompt: 'What is the evaluated value of len?',
      options: [
        { key: 'null', label: 'null' },
        { key: '-1', label: '-1' },
        { key: '0', label: '0' },
        { key: 'error', label: 'Compilation Error' },
      ],
      correctAnswer: '-1',
      explanation: 'name is null, so name?.length evaluates to null. The if-null operator (??) then catches the null and evaluates the fallback expression, yielding -1.',
    },
    {
      id: 'ns-2',
      codeSnippet: `String? text;
print(text!.toUpperCase());`,
      prompt: 'What happens when executing the null assertion operator (!) on a null reference?',
      options: [
        { key: 'null', label: 'Prints null' },
        { key: 'crash', label: 'Throws NullCheckError at runtime' },
        { key: 'compile', label: 'Compile error' },
      ],
      correctAnswer: 'crash',
      explanation: 'The null assertion operator (!) forcibly casts a nullable variable (T?) to non-nullable (T). If the target is null at runtime, it throws a NullCheckError exception.',
      trapNote: 'Never use ! unless you are 100% certain the value cannot be null; prefer ?? or if (val != null).'
    },
    {
      id: 'ns-3',
      codeSnippet: `int? a;
int b = 10;
a ??= b;
a ??= 20;
print(a);`,
      prompt: 'What will be printed to the console?',
      options: [
        { key: '10', label: '10' },
        { key: '20', label: '20' },
        { key: 'null', label: 'null' },
        { key: '30', label: '30' },
      ],
      correctAnswer: '10',
      explanation: 'The null-aware assignment operator (??=) only assigns if the target variable is currently null. Initially a is null, so a ??= 10 assigns 10. In the second statement, a is 10 (not null), so a ??= 20 does nothing!',
    },
  ],

  'game-1-3': [ // Collection Commander
    {
      id: 'cc-1',
      codeSnippet: `var list1 = [1, 2];
var list2 = [0, ...list1, 3];
print(list2);`,
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
      codeSnippet: `bool isLoggedIn = false;
var navItems = [
  'Home',
  if (isLoggedIn) 'Profile' else 'Login',
  'Settings'
];
print(navItems);`,
      prompt: 'What does the collection-if expression evaluate to when isLoggedIn is false?',
      options: [
        { key: 'a', label: '[Home, Login, Settings]' },
        { key: 'b', label: '[Home, Profile, Settings]' },
        { key: 'c', label: '[Home, null, Settings]' },
      ],
      correctAnswer: 'a',
      explanation: 'Dart supports collection-if with optional else branches. When isLoggedIn is false, the else branch evaluates to "Login", giving [Home, Login, Settings].',
    },
  ],

  // Level 2: Test Driven Development
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
      explanation: 'In TDD (Red-Green-Refactor), you MUST write a failing test first (RED) before writing any implementation code. This ensures the test is actually testing the requirement and cannot pass spuriously.',
    },
    {
      id: 'tfa-2',
      codeSnippet: `test('calculates discount correctly', () => {
  // Test passes without writing any code!
});`,
      prompt: 'What dangerous anti-pattern occurs if a new unit test passes before the code is implemented?',
      options: [
        { key: 'good', label: 'High Developer Productivity' },
        { key: 'trap', label: 'False Confidence Trap (Test is not actually testing the code)' },
        { key: 'mock', label: 'Over-Mocking' },
      ],
      correctAnswer: 'trap',
      explanation: 'If a test passes before writing code, it is either testing a tautology, missing assertions, or testing the wrong target. A test must fail for the right reason before production code is written.',
    },
  ],

  // Level 3: OOP Dart
  'game-3-1': [ // Constructor Crafter
    {
      id: 'ccr-1',
      codeSnippet: `class Point {
  final int x;
  final int y;
  Point(int x, int y) {
    this.x = x; // Error!
    this.y = y;
  }
}`,
      prompt: 'Why does this generative constructor produce a compilation error?',
      options: [
        { key: 'final', label: 'final fields cannot be assigned inside the constructor body' },
        { key: 'this', label: 'this cannot be used inside constructor bodies' },
        { key: 'semicolon', label: 'Constructor body is missing return statement' },
      ],
      correctAnswer: 'final',
      explanation: 'In Dart, final fields must be initialized before the constructor body executes! You must use initializing formals (Point(this.x, this.y);) or an initializer list (Point(x, y) : x = x, y = y;).',
      trapNote: 'Initializing formals (this.field) or initializer lists (: field = val) run BEFORE constructor bodies.'
    },
    {
      id: 'ccr-2',
      codeSnippet: `class ImmutableConfig {
  final String apiKey;
  const ImmutableConfig(this.apiKey);
}

void main() {
  var c1 = const ImmutableConfig("SECRET");
  var c2 = const ImmutableConfig("SECRET");
  print(identical(c1, c2));
}`,
      prompt: 'What will print to the console when comparing two identical const object instances?',
      options: [
        { key: 'true', label: 'true (Canonicalized into exact same in-memory instance)' },
        { key: 'false', label: 'false (Different object allocations)' },
        { key: 'error', label: 'Compilation Error' },
      ],
      correctAnswer: 'true',
      explanation: 'Dart compiler canonicalizes const objects! Any two const instances constructed with the exact same values point to the exact same canonical memory address, so identical(c1, c2) is true.',
    },
  ],

  // Level 4: Design Patterns
  'game-4-1': [ // Singleton Sentry
    {
      id: 'ss-1',
      codeSnippet: `class AppSession {
  static final AppSession _instance = AppSession._internal();
  AppSession._internal();
  factory AppSession() => _instance;
}`,
      prompt: 'Which component ensures that "AppSession()" does not allocate a new instance on every call?',
      options: [
        { key: 'factory', label: 'The factory constructor returning the cached static _instance' },
        { key: 'private', label: 'The private constructor _internal' },
        { key: 'final', label: 'The final keyword on _instance' },
      ],
      correctAnswer: 'factory',
      explanation: 'Unlike generative constructors which always allocate a brand-new object instance, a Dart factory constructor can return an existing cached instance from memory or a subclass instance.',
    },
  ],

  // Level 5: Flutter Foundations
  'game-5-1': [ // Layout Labyrinth
    {
      id: 'll-1',
      codeSnippet: `Row(
  children: [
    Text("Title"),
    Expanded(
      child: Container(color: Colors.blue),
    ),
  ],
)`,
      prompt: 'What is the role of Expanded when placed inside a Row?',
      options: [
        { key: 'fill', label: 'Forces the child to fill all remaining horizontal flex space' },
        { key: 'vertical', label: 'Forces the child to fill the full vertical screen height' },
        { key: 'wrap', label: 'Causes children to wrap onto multiple lines' },
      ],
      correctAnswer: 'fill',
      explanation: 'Inside a Row (horizontal main axis), Expanded assigns the child a flex factor (default 1) that consumes all available unoccupied horizontal space, preventing overflow.',
    },
  ],

  // Level 7: Navigation & Storage
  'game-7-1': [ // Route Runner
    {
      id: 'rr-1',
      codeSnippet: `Navigator.pushAndRemoveUntil(
  context,
  MaterialPageRoute(builder: (_) => LoginScreen()),
  (route) => false,
);`,
      prompt: 'What does the predicate "(route) => false" accomplish during navigation?',
      options: [
        { key: 'clear', label: 'Destroys every existing route in the navigation stack (cannot go back)' },
        { key: 'keep', label: 'Keeps all routes in history' },
        { key: 'cancel', label: 'Cancels the navigation transition' },
      ],
      correctAnswer: 'clear',
      explanation: 'pushAndRemoveUntil pops routes backwards through the stack as long as the predicate returns false. Returning (route) => false clears the ENTIRE stack, ideal for user logout.',
    },
  ],

  // Level 8: Asynchronous Programming
  'game-8-1': [ // Event Loop Enigma
    {
      id: 'el-1',
      codeSnippet: `void main() {
  print('1');
  Future(() => print('2'));
  scheduleMicrotask(() => print('3'));
  print('4');
}`,
      prompt: 'What is the exact printed sequence of this Dart program?',
      options: [
        { key: '1-4-3-2', label: '1, 4, 3, 2' },
        { key: '1-2-3-4', label: '1, 2, 3, 4' },
        { key: '1-3-4-2', label: '1, 3, 4, 2' },
        { key: '3-1-4-2', label: '3, 1, 4, 2' },
      ],
      correctAnswer: '1-4-3-2',
      explanation: 'Dart event loop priority rule: 1) Synchronous code executes first to completion (1, 4). 2) Microtask queue executes next to completion (3). 3) Event queue tasks execute last (2). Therefore, order is 1, 4, 3, 2.',
      trapNote: 'Prof. Bouchrika loves testing the Event Loop order: Synchronous > Microtask Queue > Event Queue!'
    },
    {
      id: 'el-2',
      codeSnippet: `Future<void> demo() async {
  print('A');
  await Future.delayed(Duration.zero);
  print('B');
}

void main() {
  demo();
  print('C');
}`,
      prompt: 'What is the order of execution between demo() and main()?',
      options: [
        { key: 'A-C-B', label: 'A, C, B' },
        { key: 'A-B-C', label: 'A, B, C' },
        { key: 'C-A-B', label: 'C, A, B' },
      ],
      correctAnswer: 'A-C-B',
      explanation: 'An async function executes synchronously until the first "await" expression! "A" is printed synchronously. At "await Future.delayed", execution pauses and yields to main(), which prints "C". After the event loop ticks, demo() resumes and prints "B".',
      trapNote: 'Async functions DO NOT run on a background thread. They run on the main isolate and execute synchronously up to the first await!'
    },
  ],
};
