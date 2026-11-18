import { Lesson } from '../../types';

export const LESSONS: Record<number, Lesson> = {
  1: {
    id: 'lesson-1',
    levelId: 1,
    title: 'Dart Foundations: Variables, Types, Immutability & Operators',
    description: 'Learn how Dart enforces static type safety, why int / int returns double, the difference between final and const, and how to manipulate collections cleanly.',
    sections: [
      {
        id: 'sec-1-1',
        title: 'Variables, Types & The Immutability Spectrum',
        conceptProblem: 'Dynamic languages like JavaScript allow accidental variable reassignment and type mutation, leading to catastrophic runtime crashes in mobile apps.',
        explanation: 'Dart is a statically typed language that supports both explicit type annotations and type inference via var. However, Dart provides three distinct immutability modifiers: final, const, and late. Understanding their exact lifecycle is critical.',
        syntax: `var inferred = "Inferred as String";
final String runtimeConst = DateTime.now().toString(); // Evaluated at runtime
const double PI = 3.14159; // Compile-time constant, canonicalized in memory
late String deferred; // Initialized later, checked at runtime`,
        codeExample: `void main() {
  final List<int> numbers = [1, 2, 3];
  numbers.add(4); // LEGAL: final only prevents rebinding 'numbers = [5]'

  const List<int> constantList = [1, 2, 3];
  // constantList.add(4); // COMPILER ALLOWS IT, BUT CRASHES AT RUNTIME!
}`,
        outputPreview: 'numbers: [1, 2, 3, 4]',
        commonMistakes: [
          'Confusing final with const: final lists are mutable in-place; const lists are deeply immutable.',
          'Reading a late variable before assigning it, causing LateInitializationError.',
          'Using dynamic when Object? or generics would provide compile-time safety.'
        ],
        examTraps: [
          'PROFESSOR TRAP: "const List a = [1]; a.add(2);" - this compiles without warning because add() exists on List interface, but throws Unsupported operation: Cannot add to an unmodifiable list at runtime!',
          'PROFESSOR TRAP: Accessing uninitialized late variables does NOT produce compile errors, but causes fatal runtime crashes.'
        ],
        quickCheck: {
          question: 'What happens if you run "const List<int> nums = [1, 2]; nums.add(3);"?',
          options: [
            'It appends 3 successfully.',
            'It fails to compile because add() cannot be called on const variables.',
            'It compiles cleanly, but throws Unsupported operation: Cannot add to an unmodifiable list at runtime.',
            'It creates a new copy of the list with 3 appended.'
          ],
          correctIndex: 2,
          explanation: 'In Dart, const creates a deeply unmodifiable collection in memory. Because List declares the add() method, the compiler accepts the call, but the runtime object rejects mutation by throwing an exception.'
        }
      },
      {
        id: 'sec-1-2',
        title: 'Operators: Division (~/ vs /), Cascades & Spreads',
        conceptProblem: 'Programmers coming from C/C++/Java assume integer division 7 / 2 equals 3. In Dart, this causes unexpected type errors.',
        explanation: 'In Dart, the standard division operator / ALWAYS returns a double, even if both operands are integers. To perform truncating integer division, Dart introduces the ~/ operator. Additionally, the cascade operator (..) allows chaining multiple operations on the same object.',
        syntax: `double d = 7 / 2;   // 3.5
int i = 7 ~/ 2;     // 3 (truncating integer division)
var list = [1, 2, ..?[3, 4]]; // null-aware spread
button..text = 'Click'..style.color = 'blue'; // cascade returning receiver`,
        codeExample: `void main() {
  int a = 9;
  int b = 2;
  double floatResult = a / b;  // 4.5
  int intResult = a ~/ b;       // 4

  var buffer = StringBuffer()
    ..write('ENSIA ')
    ..write('Mobile ')
    ..write('Development');
  print(buffer.toString());
}`,
        outputPreview: 'ENSIA Mobile Development',
        commonMistakes: [
          'Writing "int result = 4 / 2;" - this fails compilation because 4 / 2 evaluates to double 2.0.',
          'Confusing cascade operator (..) with method chaining; cascade returns the original receiver instance, not the result of the method call.'
        ],
        examTraps: [
          'PROFESSOR TRAP: "int x = 8 / 2;" -> Compilation Error! Must be "int x = 8 ~/ 2;" or "double x = 8 / 2;".',
          'PROFESSOR TRAP: Chaining methods with single dot (.) evaluates to method return value; chaining with double dot (..) evaluates to the receiver.'
        ],
        quickCheck: {
          question: 'What is the type and value of the expression (7 / 2) in Dart?',
          options: [
            'int with value 3',
            'double with value 3.5',
            'Compilation error (must use ~/)',
            'num with value 3'
          ],
          correctIndex: 1,
          explanation: 'In Dart, the / operator is floating-point division and always yields a double (3.5). For integer division resulting in int 3, the ~/ operator is required.'
        }
      }
    ]
  },
  2: {
    id: 'lesson-2',
    levelId: 2,
    title: 'Test-Driven Development & Clean Code Principles',
    description: 'Learn the Red-Green-Refactor discipline, master package:test matchers, avoid false confidence, and apply clean code rules.',
    sections: [
      {
        id: 'sec-2-1',
        title: 'The TDD Cycle & package:test Matchers',
        conceptProblem: 'Writing code before tests leads to untestable monolithic functions, untested edge cases, and regression bugs.',
        explanation: 'TDD enforces a strict 3-phase cycle: (1) Red: Write a failing test specifying the requirement, (2) Green: Write minimal code to pass the test, (3) Refactor: Clean up structure without altering test outcomes. Tests are written in test/*_test.dart files using package:test.',
        syntax: `import 'package:test/test.dart';

void main() {
  group('String Utilities', () {
    test('detects palindrome correctly', () {
      expect(isPalindrome('radar'), isTrue);
      expect(isPalindrome('hello'), isFalse);
    });
  });
}`,
        codeExample: `bool isPalindrome(String input) {
  if (input.isEmpty) return true;
  String clean = input.toLowerCase().replaceAll(RegExp(r'[^a-z0-9]'), '');
  return clean == clean.split('').reversed.join('');
}`,
        outputPreview: 'All tests passed!',
        commonMistakes: [
          'Writing tests after implementation, resulting in tests that only verify what the code does rather than what was specified.',
          'Falling into the "False Confidence" trap by only testing happy paths and omitting boundary/null tests.'
        ],
        examTraps: [
          'PROFESSOR TRAP: "Satisfying tests vs satisfying requirements" - writing "return true;" satisfies one test assertion but fails the true requirement.',
          'PROFESSOR TRAP: Test files must reside in test/ and end with _test.dart to be auto-discovered by the Dart test runner.'
        ],
        quickCheck: {
          question: 'In TDD, what is the "False Confidence" anti-pattern warned about by Prof. Bouchrika?',
          options: [
            'Running tests too frequently in the terminal.',
            'Believing an app is defect-free because 100% of tests pass, despite tests only covering trivial happy paths.',
            'Writing unit tests using VS Code instead of Dart CLI.',
            'Using mock repositories instead of real database connections.'
          ],
          correctIndex: 1,
          explanation: 'False confidence occurs when a green test suite gives developers a false sense of security because tests fail to challenge edge cases, null values, or complex boundaries.'
        }
      },
      {
        id: 'sec-2-2',
        title: 'Clean Code: The 1:9 Ratio, Naming & Leveled Logging',
        conceptProblem: 'Spaghetti code filled with print() statements, 500-line files, and cryptic abbreviations takes 10x longer to debug and maintain.',
        explanation: 'Prof. Bouchrika highlights the Reading Ratio: 1 minute of writing code requires 9 minutes of reading code. Professional code follows strict file size limits (<200 lines), descriptive identifiers with verb prefixes (e.g. isPalindrome), and deprecates print() in favor of package:logger with levels (debug, info, warning, error, fatal).',
        syntax: `import 'package:logger/logger.dart';

final logger = Logger();
logger.d("Debug message");
logger.i("Info message");
logger.w("Warning: slow response");
logger.e("Error caught", error: e, stackTrace: s);`,
        codeExample: `// Clean function: concise, verb-prefixed, typed, single-responsibility
bool hasConsecutiveZeros(String text) {
  return text.contains("00");
}`,
        outputPreview: 'true',
        commonMistakes: [
          'Using print() in production mobile code instead of leveled loggers.',
          'Writing giant functions (>50 lines) doing multiple unrelated tasks.',
          'Violating lowerCamelCase or using SCREAMING_SNAKE_CASE for variables.'
        ],
        examTraps: [
          'PROFESSOR TRAP: The professor penalizes student code that litters Flutter applications with raw debug print() calls in production.',
          'PROFESSOR TRAP: File size discipline - keeping files under ~200 lines and zero horizontal scrolling.'
        ],
        quickCheck: {
          question: 'Why does Prof. Bouchrika mandate replacing print() with package:logger?',
          options: [
            'print() is deprecated in Dart 3 and produces a compiler warning.',
            'package:logger allows filtering messages by severity levels (debug, info, warning, error) without polluting production output.',
            'print() can only output strings shorter than 10 characters.',
            'Logger automatically saves logs to a cloud Firestore database.'
          ],
          correctIndex: 1,
          explanation: 'Leveled logging allows developers to control log verbosity across environments (debug vs release) and capture structured stack traces, whereas raw print() dumps unstructured text indiscriminately.'
        }
      }
    ]
  },
  3: {
    id: 'lesson-3',
    levelId: 3,
    title: 'Object-Oriented Dart: Constructors, Interfaces & Mixins',
    description: 'Master generative and const constructors, identical() object pooling, static member restrictions, implicit interfaces, and covariant generics.',
    sections: [
      {
        id: 'sec-3-1',
        title: 'Constructors, const Pooling & Static Member Rules',
        conceptProblem: 'Creating identical immutable objects repeatedly in a mobile app wastes precious device RAM and garbage-collection cycles.',
        explanation: 'Dart classes support generative, named, redirecting, and const constructors. When all fields are final, a constructor can be marked const. Dart canonicalizes const objects in memory, meaning identical(const Point(1, 1), const Point(1, 1)) evaluates to true. Crucially, Dart static members belong strictly to the class declaration and cannot be accessed through instances.',
        syntax: `class Student {
  static int count = 0;
  final String name;

  const Student(this.name); // const constructor requires all fields final
  Student.guest() : this('Guest'); // redirecting constructor
}`,
        codeExample: `void main() {
  const s1 = Student('Ali');
  const s2 = Student('Ali');
  print(identical(s1, s2)); // true! Shared memory instance

  // print(s1.count); // COMPILATION ERROR! Cannot access static via instance!
  print(Student.count); // Legal: accessed via class identifier
}`,
        outputPreview: 'true\n0',
        commonMistakes: [
          'Attempting to access static fields through an instance variable (sara.count).',
          'Declaring a non-final field inside a class with a const constructor.'
        ],
        examTraps: [
          'PROFESSOR TRAP (Q-19): "Student sara = Student(\'Sara\'); print(sara.count);" -> Compilation error! Unlike Java/C++, Dart strictly forbids instance-based static member lookup.',
          'PROFESSOR TRAP: const objects with identical arguments share the exact same memory address (identical() returns true).'
        ],
        quickCheck: {
          question: 'What is the result of running "Student s = Student(\'Ali\'); print(s.count);" if count is a static variable of Student?',
          options: [
            'It prints the value of count.',
            'It fails to compile with an error: The getter \'count\' isn\'t defined for the type \'Student\'.',
            'It throws a NoSuchMethodError at runtime.',
            'It prints null.'
          ],
          correctIndex: 1,
          explanation: 'In Dart, static members can ONLY be referenced through the class name (Student.count). Instance access produces an immediate compilation error.'
        }
      },
      {
        id: 'sec-3-2',
        title: 'extends vs implements: The Implicit Interface Rule',
        conceptProblem: 'Confusing class inheritance with interface implementation leads to missing member errors and broken polymorphic architecture.',
        explanation: 'In Dart, every class implicitly defines an interface containing all its instance members. When you use "extends", you inherit code and implementation bodies. When you use "implements", you inherit ONLY the type contract and ZERO code bodies. You must implement every method, getter, and setter declared by the target class!',
        syntax: `abstract class Vehicle {
  int get wheels;
  void drive();
}

class Car implements Vehicle {
  @override
  final int wheels = 4; // Must implement getter!

  @override
  void drive() => print('Driving car');
}`,
        codeExample: `class Animal {
  void sound() => print('Generic sound');
}

// implements inherits ZERO code bodies!
class Dog implements Animal {
  @override
  void sound() => print('Bark');
}`,
        outputPreview: 'Bark',
        commonMistakes: [
          'Using implements expecting to inherit concrete methods from the parent class.',
          'Forgetting that getters and setters are part of the implicit interface that must be implemented.'
        ],
        examTraps: [
          'PROFESSOR TRAP (Q-16): Declaring "Animal dog = Dog(); dog.fetch();" fails compilation because the static compile-time type Animal does not declare fetch(), even if Dog defines it.',
          'PROFESSOR TRAP (Q-17): When class A implements B, class A must implement ALL concrete methods, getters, and setters of B.'
        ],
        quickCheck: {
          question: 'If class B implements class A, what code implementation does class B inherit from class A?',
          options: [
            'All public and protected methods.',
            'Only concrete non-abstract methods.',
            'Zero code implementations; B inherits only the interface contract.',
            'Only constructors and static fields.'
          ],
          correctIndex: 2,
          explanation: 'In Dart, implements treats the target class strictly as an implicit interface. The implementing class receives zero implementation code and must define all members itself.'
        }
      }
    ]
  },
  4: {
    id: 'lesson-4',
    levelId: 4,
    title: 'Software Design Patterns: Factory, Singleton & Repository',
    description: 'Learn why design patterns prevent messy spaghetti code, master Dart singletons with factory constructors, and decouple UI from data sources using the Repository pattern.',
    sections: [
      {
        id: 'sec-4-1',
        title: 'The Singleton Pattern: Shared In-Memory State',
        conceptProblem: 'Creating multiple instances of a database manager or state store desynchronizes state and wastes resources.',
        explanation: 'A Singleton guarantees that exactly one instance of a class exists across the application lifecycle. In Dart, this is implemented idiomatically using a private named constructor (_internal) and a factory constructor returning a cached static instance.',
        syntax: `class CounterStore {
  static final CounterStore _instance = CounterStore._internal();
  int count = 0;

  CounterStore._internal(); // Private constructor
  factory CounterStore() => _instance; // Factory returns cached instance
}`,
        codeExample: `void main() {
  final s1 = CounterStore();
  final s2 = CounterStore();
  s1.count = 42;
  print(s2.count); // 42! Shared state
  print(identical(s1, s2)); // true!
}`,
        outputPreview: '42\ntrue',
        commonMistakes: [
          'Writing "factory CounterStore() => CounterStore._internal();" which creates a new instance on every call, defeating the pattern!',
          'Forgetting the private constructor, allowing callers to instantiate fresh unshared instances.'
        ],
        examTraps: [
          'PROFESSOR TRAP (Q-09): If CounterStore is a proper singleton, calling CounterStore() from two independent screens yields the exact same in-memory object (identical() is true).',
          'PROFESSOR TRAP: SharedPreferences.getInstance() is also an asynchronous singleton providing shared access across screens.'
        ],
        quickCheck: {
          question: 'What is wrong with this singleton factory implementation: "factory Database() => Database._internal();"?',
          options: [
            'factory constructors cannot call private constructors.',
            'It instantiates a brand new object on every call instead of returning a cached static instance.',
            'Database must extend ChangeNotifier.',
            'The factory keyword is only allowed on abstract classes.'
          ],
          correctIndex: 1,
          explanation: 'The factory constructor must return the cached static instance (e.g. => _instance). Calling Database._internal() inside the factory instantiates a fresh object on every invocation, defeating the Singleton pattern.'
        }
      },
      {
        id: 'sec-4-2',
        title: 'The Repository Pattern & Decoupling',
        conceptProblem: 'Embedding raw SQL queries or http.get calls inside button onPressed handlers creates untestable spaghetti code.',
        explanation: 'The Repository Pattern acts as an abstraction boundary between UI/business logic and concrete data sources. The UI only talks to an abstract interface (e.g. AbstractNewsRepo). During testing or offline development, a Mock/Dummy repository is injected; in production, a Backend repository is injected, requiring zero UI modifications.',
        syntax: `abstract class NewsRepository {
  Future<List<String>> getHeadlines();
}

class NewsDummyRepository implements NewsRepository {
  @override
  Future<List<String>> getHeadlines() async => ['Dummy 1', 'Dummy 2'];
}`,
        codeExample: `// UI depends strictly on the abstraction!
class NewsController {
  final NewsRepository repository;
  NewsController(this.repository);

  Future<void> display() async {
    final list = await repository.getHeadlines();
    print('Fetched \${list.length} headlines');
  }
}`,
        outputPreview: 'Fetched 2 headlines',
        commonMistakes: [
          'Writing HTTP requests or database operations directly in UI widget build trees or button callbacks.',
          'Coupling presentation controllers directly to concrete network implementation classes.'
        ],
        examTraps: [
          'PROFESSOR TRAP (Q-07): The primary advantage of the Repository Pattern is decoupling the UI from data sources, enabling simple swapping of dummy/mock sources without altering UI code.',
          'PROFESSOR TRAP (Q-10): Writing persistence or networking directly in onPressed breaks Separation of Concerns and prevents automated unit testing.'
        ],
        quickCheck: {
          question: 'Why does Prof. Bouchrika insist on using the Repository Pattern in mobile applications?',
          options: [
            'It increases the network download speed of JSON data.',
            'It decouples the presentation UI from the data source, allowing data implementations (mock vs backend) to be swapped without modifying UI code.',
            'It replaces StatefulWidget with StatelessWidget.',
            'It automatically validates user form inputs.'
          ],
          correctIndex: 1,
          explanation: 'The Repository Pattern encapsulates data access logic behind an abstract interface, isolating the UI from network or database details and enabling effortless testing with mock data.'
        }
      }
    ]
  },
  5: {
    id: 'lesson-5',
    levelId: 5,
    title: 'Flutter Foundations & The Layout Engine',
    description: 'Learn the Flutter architecture, StatelessWidget immutability, the Box Model, Row/Column flex alignment, and virtualized ListView.builder.',
    sections: [
      {
        id: 'sec-5-1',
        title: 'The Widget Tree & StatelessWidget Immutability',
        conceptProblem: 'Attempting to declare mutable variables inside a StatelessWidget causes confusing bugs because the widget cannot re-render itself.',
        explanation: 'In Flutter, "Everything is a Widget". The UI is declarative: UI = f(state). A StatelessWidget represents an immutable configuration. All of its member fields MUST be marked final. It has no internal state and rebuilds only when its parent passes new configuration properties.',
        syntax: `import 'package:flutter/material.dart';

class GreetingCard extends StatelessWidget {
  final String username; // Must be final!

  const GreetingCard({super.key, required this.username});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Text('Welcome, $username!'),
      ),
    );
  }
}`,
        codeExample: `void main() => runApp(const MaterialApp(
  home: Scaffold(
    body: Center(
      child: GreetingCard(username: 'ENSIA Student'),
    ),
  ),
));`,
        outputPreview: 'Card rendering: Welcome, ENSIA Student!',
        commonMistakes: [
          'Declaring non-final fields in a StatelessWidget, triggering compiler warnings.',
          'Failing to declare assets in pubspec.yaml with proper 2-space indentation under flutter:.'
        ],
        examTraps: [
          'PROFESSOR TRAP (Q-01): Assets are bundled into the binary at build time and are strictly read-only; runtime file writing must use the device filesystem.',
          'PROFESSOR TRAP (Q-25): Indenting "assets:" as a root key instead of nesting it under "flutter:" causes asset resolution failures.'
        ],
        quickCheck: {
          question: 'What is true regarding a file bundled as an asset in Flutter?',
          options: [
            'It can be edited and saved to disk by the app at runtime.',
            'It is bundled at build time and is strictly read-only at runtime.',
            'It is automatically deleted when the user logs out.',
            'It can only be an image file.'
          ],
          correctIndex: 1,
          explanation: 'Assets registered in pubspec.yaml are compiled into the application bundle. The operating system treats the app bundle as immutable and read-only. Runtime modifications require saving to the local filesystem.'
        }
      },
      {
        id: 'sec-5-2',
        title: 'The Box Model, Flex Layouts & Unbounded Viewports',
        conceptProblem: 'Placing a ListView directly inside a Column causes a dreaded red-screen crash: "Vertical viewport was given unbounded height".',
        explanation: 'Flutter layout operates on constraints passed down by parents. A Column gives its children infinite vertical height. A ListView wants to be as tall as possible. Putting an unconstrained ListView inside a Column creates an infinite height conflict! The solution is wrapping the ListView in Expanded or giving it a fixed SizedBox height.',
        syntax: `Column(
  children: [
    Text('Header'),
    Expanded( // Takes up remaining vertical space safely!
      child: ListView.builder(
        itemCount: 10,
        itemBuilder: (ctx, i) => ListTile(title: Text('Item $i')),
      ),
    ),
  ],
)`,
        codeExample: `// Container styling rules:
Container(
  padding: const EdgeInsets.all(12),
  margin: const EdgeInsets.symmetric(horizontal: 16),
  decoration: BoxDecoration(
    color: Colors.blue, // Put color INSIDE decoration!
    borderRadius: BorderRadius.circular(8),
  ),
  child: const Text('Styled Box'),
)`,
        outputPreview: 'Styled Box with blue background and rounded corners',
        commonMistakes: [
          'Providing both "color" and "decoration" to the same Container, causing an assertion error.',
          'Placing ListView inside Column without Expanded or SizedBox.'
        ],
        examTraps: [
          'PROFESSOR TRAP: "Container(color: Colors.red, decoration: BoxDecoration(...))" throws "Cannot provide both a color and a decoration".',
          'PROFESSOR TRAP: Unbounded height crash when scrollable views are placed directly in Column/Row without Expanded.'
        ],
        quickCheck: {
          question: 'What error occurs if you provide both "color: Colors.red" and "decoration: BoxDecoration(...)" to a Container?',
          options: [
            'The color overrides the decoration color.',
            'It throws an immediate runtime assertion error: Cannot provide both a color and a decoration.',
            'The decoration border disappears.',
            'It compiles and blends the two colors.'
          ],
          correctIndex: 1,
          explanation: 'Flutter requires color to be specified inside BoxDecoration when decoration is used. Providing both properties directly on Container triggers an assertion failure.'
        }
      }
    ]
  },
  6: {
    id: 'lesson-6',
    levelId: 6,
    title: 'Stateful Widgets & Reactive Interactivity',
    description: 'Learn the StatefulWidget lifecycle, setState() dirty-marking mechanics, and how to avoid state initialization bugs in interactive games.',
    sections: [
      {
        id: 'sec-6-1',
        title: 'The StatefulWidget Lifecycle & setState Mechanics',
        conceptProblem: 'Mutating variables in memory does not update the screen because Flutter has no way of knowing a repaint is required.',
        explanation: 'A StatefulWidget pairs an immutable widget configuration with a mutable State object. The lifecycle stages are: (1) createState(), (2) initState() [one-time initialization], (3) didChangeDependencies(), (4) build() [declarative rendering], (5) setState() [marks element dirty], and (6) dispose() [cleanup]. Mutating variables without calling setState(() {}) leaves the UI stale.',
        syntax: `class CounterScreen extends StatefulWidget {
  const CounterScreen({super.key});

  @override
  State<CounterScreen> createState() => _CounterScreenState();
}

class _CounterScreenState extends State<CounterScreen> {
  int _counter = 0;

  void _increment() {
    setState(() {
      _counter++; // Framework marks element dirty and schedules rebuild
    });
  }

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: _increment,
      child: Text('Count: $_counter'),
    );
  }
}`,
        codeExample: `// Omitting setState updates variable but leaves UI unchanged!
void _buggyIncrement() {
  _counter++; // In-memory update, but screen remains stale!
}`,
        outputPreview: 'Count: 1',
        commonMistakes: [
          'Mutating state variables directly without setState().',
          'Initializing state variables inside build() instead of initState().'
        ],
        examTraps: [
          'PROFESSOR TRAP (Q-11): Declaring "int activePlayer = Random().nextInt(2);" inside build() re-rolls the starting player every time the widget rebuilds!',
          'PROFESSOR TRAP (Q-12): Hardcoding "Switch(value: false, onChanged: ...)" prevents the switch from ever staying ON because build() re-renders false every frame.',
          'PROFESSOR TRAP (Q-13): Incrementing counter++ without setState() updates RAM but leaves screen text showing the old value.'
        ],
        quickCheck: {
          question: 'What occurs if you declare "int player = Random().nextInt(2);" inside the build() method of a game screen?',
          options: [
            'The player is randomly chosen once when the screen loads and remains constant.',
            'Every time the widget rebuilds (e.g. keyboard opens or setState runs), player is re-randomized unpredictably.',
            'Flutter throws a RandomAccessException.',
            'The build method fails compilation.'
          ],
          correctIndex: 1,
          explanation: 'The build() method must be pure and idempotent. Code inside build() executes on every single frame rebuild. Variable initializations that must run once belong in initState().'
        }
      }
    ]
  },
  7: {
    id: 'lesson-7',
    levelId: 7,
    title: 'Navigation, Forms & Local Data Persistence',
    description: 'Master the Navigator route stack, GlobalKey<FormState> validation, and persistent key-value storage with SharedPreferences.',
    sections: [
      {
        id: 'sec-7-1',
        title: 'Navigator Stack Operations & Awaiting Results',
        conceptProblem: 'Improper screen transitions leave duplicate screens in memory or allow users to navigate back to authenticated screens after logout.',
        explanation: 'Flutter models screens as a Last-In, First-Out (LIFO) stack. Navigator.push() pushes a route; Navigator.pop() removes it. Importantly, Navigator.push returns a Future that resolves when the pushed screen pops and returns data. To clear history upon logout, Navigator.pushAndRemoveUntil() pops routes until a predicate returns true.',
        syntax: `// Awaiting result from pushed screen
final result = await Navigator.push(
  context,
  MaterialPageRoute(builder: (ctx) => SelectionScreen()),
);

// Returning data from child screen
Navigator.pop(context, 'selected_item');

// Clearing stack on logout
Navigator.pushAndRemoveUntil(
  context,
  MaterialPageRoute(builder: (ctx) => LoginScreen()),
  (route) => false, // Remove all previous routes!
);`,
        codeExample: `void logout(BuildContext context) {
  Navigator.pushAndRemoveUntil(
    context,
    MaterialPageRoute(builder: (c) => const LoginScreen()),
    (route) => false,
  );
}`,
        outputPreview: 'User logged out; history stack cleared',
        commonMistakes: [
          'Using pushReplacement on logout, which leaves older screens on the stack.',
          'Forgetting to await Navigator.push when expecting return data from the pushed screen.'
        ],
        examTraps: [
          'PROFESSOR TRAP (Q-14): Clearing the entire navigation stack requires pushAndRemoveUntil with predicate (route) => false.',
          'PROFESSOR TRAP (Q-15): Awaiting Navigator.push yields the value passed into the second argument of Navigator.pop(context, value).'
        ],
        quickCheck: {
          question: 'How do you navigate to LoginScreen and ensure the user CANNOT press the Android back button to return to previous screens?',
          options: [
            'Navigator.push(context, LoginScreen())',
            'Navigator.pop(context)',
            'Navigator.pushAndRemoveUntil(context, MaterialPageRoute(builder: (c) => LoginScreen()), (route) => false)',
            'Navigator.replace(context, LoginScreen())'
          ],
          correctIndex: 2,
          explanation: 'pushAndRemoveUntil with (route) => false removes every single route from the navigation history stack, leaving only the newly pushed LoginScreen.'
        }
      },
      {
        id: 'sec-7-2',
        title: 'Form Validation & SharedPreferences JSON Persistence',
        conceptProblem: 'Saving Dart objects using .toString() stores unparseable text, corrupting local user data.',
        explanation: 'Forms group FormFields using a GlobalKey<FormState>. Calling _formKey.currentState!.validate() triggers all field validators. For persistence, SharedPreferences provides an app-local key-value store. Because SharedPreferences only supports primitives, complex objects MUST be serialized using json.encode() and deserialized with json.decode().',
        syntax: `final _formKey = GlobalKey<FormState>();

TextFormField(
  validator: (val) => val == null || val.isEmpty ? 'Required' : null,
)

// Persistence:
final prefs = await SharedPreferences.getInstance();
prefs.setString('user', json.encode({'name': 'Ali', 'score': 95}));
final map = json.decode(prefs.getString('user')!);`,
        codeExample: `void saveUser(Map<String, dynamic> user) async {
  final prefs = await SharedPreferences.getInstance();
  // Safe JSON serialization:
  await prefs.setString('userData', json.encode(user));
}`,
        outputPreview: '{"name":"Ali","score":95}',
        commonMistakes: [
          'Using raw TextField instead of TextFormField, which ignores FormState validators.',
          'Saving map.toString() instead of json.encode(map), causing json.decode to crash with FormatException.'
        ],
        examTraps: [
          'PROFESSOR TRAP (Q-08): Writing "prefs.setString(\'users\', userMap.toString());" saves "{name: Ali}", which is NOT valid JSON and crashes json.decode()!',
          'PROFESSOR TRAP (Q-02): SharedPreferences data is private to the local application install and does NOT automatically sync to cloud accounts.'
        ],
        quickCheck: {
          question: 'What occurs when you save a Map to SharedPreferences using userMap.toString() and later call json.decode() on it?',
          options: [
            'It decodes successfully into a Map.',
            'json.decode throws a FormatException because userMap.toString() produces Dart syntax, not valid JSON.',
            'SharedPreferences automatically converts it to JSON format.',
            'The key is deleted automatically.'
          ],
          correctIndex: 1,
          explanation: 'Dart Map.toString() outputs {key: value} with unquoted keys and single quotes, which violates JSON syntax. Standard parsers require double-quoted keys, so json.decode() throws a FormatException.'
        }
      }
    ]
  },
  8: {
    id: 'lesson-8',
    levelId: 8,
    title: 'Asynchronous Programming & Data Loading in Flutter',
    description: 'Master the Dart Event Loop, FutureBuilder (The Cafeteria Buzzer), avoiding infinite refetch loops, pull-to-refresh, and timer cleanup.',
    sections: [
      {
        id: 'sec-8-1',
        title: 'The Event Loop & FutureBuilder (The Cafeteria Buzzer)',
        conceptProblem: 'Calling async functions inside build() causes runaway infinite network requests that freeze the phone.',
        explanation: 'Dart runs on a single thread managed by an Event Loop with two queues: Microtask Queue (internal high priority) and Event Queue (I/O, timers, gestures). FutureBuilder maps asynchronous state to UI using The Cafeteria Buzzer metaphor: (1) Ordering = creating Future, (2) Waiting at table = snapshot.connectionState == waiting (spinner), (3) Buzzer vibrates = Future resolves, (4) Eating = snapshot.hasData (data view). The Future MUST be cached in initState() to prevent infinite refetches!',
        syntax: `class _NewsState extends State<NewsScreen> {
  late Future<List<News>> _newsFuture;

  @override
  void initState() {
    super.initState();
    _newsFuture = fetchNews(); // Initialized ONCE!
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<List<News>>(
      future: _newsFuture, // Pass cached member variable!
      builder: (ctx, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const CircularProgressIndicator();
        }
        if (snapshot.hasError) return Text('Error: \${snapshot.error}');
        return ListView(...);
      },
    );
  }
}`,
        codeExample: `// CRITICAL ANTI-PATTERN: Calling fetch inside build!
// FutureBuilder(future: fetchNews(), ...) -> INFINITE REBUILD STORM!`,
        outputPreview: 'Data rendered smoothly without loops',
        commonMistakes: [
          'Passing a new Future directly in build(), causing infinite network loops.',
          'Calling setState() synchronously inside FutureBuilder builder.',
          'Forgetting to cancel Timer.periodic in dispose(), causing memory leaks.'
        ],
        examTraps: [
          'PROFESSOR TRAP (Q-05): "FutureBuilder(future: getNews(), ...)" in build() causes an infinite loop: Future resolves -> setState rebuilds -> build() runs -> new Future created -> loop repeats!',
          'PROFESSOR TRAP (Q-06): Calling setState() inside FutureBuilder builder throws "setState() or markNeedsBuild() called during build".',
          'PROFESSOR TRAP (Q-24): Forgetting timer.cancel() in dispose() keeps the timer firing in the event loop, calling setState on unmounted widgets.'
        ],
        quickCheck: {
          question: 'What catastrophic bug occurs if you pass "future: getNews()" directly to FutureBuilder inside the build() method?',
          options: [
            'The future never resolves.',
            'Every time the future resolves, FutureBuilder triggers a rebuild, which invokes build(), creating a new future and an infinite network refetch loop.',
            'Flutter crashes with an OutOfMemoryError immediately upon compilation.',
            'FutureBuilder cannot accept generic types.'
          ],
          correctIndex: 1,
          explanation: 'Because build() runs whenever the widget rebuilds, instantiating a new Future inside build() forces FutureBuilder to listen to a brand new Future every frame, triggering endless rebuilds and network spam.'
        }
      }
    ]
  }
};
