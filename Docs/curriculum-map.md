# Source-Based Curriculum Map: Mobile Dev Quest
**Module:** Mobile Development (Dart & Flutter) — ENSIA  
**Instructor:** Prof. Imed Bouchrika  
**Structure:** 8 Progressive Levels + Comprehensive Exam Simulator  
**Last Updated:** November 2026  

---

## Pedagogical Philosophy & Blueprint

The curriculum is structured around Professor Imed Bouchrika's core pedagogical ethos:
1. **Mental Models Over Syntax Memorization:** Every core concept is anchored by an authentic mental model (e.g., *The Cafeteria Buzzer* for `FutureBuilder`, *Recipe vs Cake* for Classes, *Spilt Paint* for `Set` uniqueness, *Spaghetti Code* for design patterns).
2. **Defensive Programming & Trap Detection:** In examinations, students are evaluated not just on whether they can write code that runs, but whether they can spot code that looks plausible but fails at compile time, throws at runtime, causes memory leaks, or triggers infinite UI repainting.
3. **Red-Green-Refactor Discipline:** Tests are not an afterthought; TDD is introduced in Level 2 and applied across all subsequent challenges.
4. **Separation of Concerns:** Business logic, storage, and networking must never pollute the Flutter widget build tree.

---

```
                                  CURRICULUM FLOW
                                  
  ┌───────────────────────────┐         ┌───────────────────────────┐
  │   LEVEL 1: DART CORE      │  ───>   │    LEVEL 2: TDD & CODE    │
  │  Variables, Types, Loops  │         │  Red-Green-Refactor, Test │
  └───────────────────────────┘         └───────────────────────────┘
                │                                     │
                ▼                                     ▼
  ┌───────────────────────────┐         ┌───────────────────────────┐
  │     LEVEL 3: OOP DART     │  ───>   │  LEVEL 4: DESIGN PATTERNS │
  │ Const, Mixins, Interfaces │         │ Factory, Singleton, Repo  │
  └───────────────────────────┘         └───────────────────────────┘
                │                                     │
                ▼                                     ▼
  ┌───────────────────────────┐         ┌───────────────────────────┐
  │   LEVEL 5: FLUTTER TREE   │  ───>   │  LEVEL 6: STATE & GAMES   │
  │ Widgets, Layouts, Box Mod │         │ State Lifecycle, TicTacToe│
  └───────────────────────────┘         └───────────────────────────┘
                │                                     │
                ▼                                     ▼
  ┌───────────────────────────┐         ┌───────────────────────────┐
  │   LEVEL 7: NAV & DATA     │  ───>   │   LEVEL 8: ASYNC FLUTTER  │
  │  Routes, Forms, SharedPreferences   │  Event Loop, FutureBuilder│
  └───────────────────────────┘         └───────────────────────────┘
                                                      │
                                                      ▼
                                        ┌───────────────────────────┐
                                        │  BOUCHRIKA BOSS TRIAL     │
                                        │  30-Min Real Exam Engine  │
                                        └───────────────────────────┘
```

---

## LEVEL 1: Dart Foundations (The Syntax Sentry)

### 1. Source Mapping
- **Primary Source:** `Dart_Essentials_merged.pdf`, Lecture 2 (Slides 1–45)
- **Authentic Exam Questions:** Q-20 (`~/` vs `/`), Q-21 (`const` vs `final` list mutation), Q-22 (`late` initialization error), Q-26 (cascade operator `..`)
- **Authentic Labs:** LAB-01 (Binary converter), LAB-02 (Factorial & String manipulation)

### 2. Core Concepts & Progression
- **Dart Origins & Ecosystem:** Google 2011, created to replace JavaScript, modernized with Flutter; ahead-of-time (AOT) and just-in-time (JIT) compilation.
- **Type System & Variables:**
  - Explicit vs Inferred: `int`, `double`, `num`, `bool`, `String`, `var`, `dynamic`, `Object?`.
  - Immutability semantics: `final` (runtime single assignment) vs `const` (compile-time constant, canonicalized memory allocation).
  - Safety & Modifiers: `late` keyword (deferred initialization with runtime safety checks).
- **Strings & Operators:**
  - String interpolation (`${expr}`), multiline strings (`'''...'''`), raw strings (`r'...'`).
  - Parsing: `int.parse(str)` vs `int.tryParse(str)` returning `null`.
  - Arithmetic operators: division `/` always returns `double` (e.g. `7 / 2 == 3.5`); integer division uses `~/` (`7 ~/ 2 == 3`); remainder `%`.
  - Type test operators: `is`, `is!`, and type cast `as`.
  - Cascade operator: `..` (invoking operations on the same object without re-evaluating receiver) and null-shorting cascade `?..`.
- **Collections & Functional Iterables:**
  - `List`: Growable (`<int>[]`) vs Fixed-length (`List.filled(5, 0)`).
  - `Set`: Unique elements, hash set behavior, set operations (`union`, `intersection`).
  - `Map`: Key-value pairs, `containsKey`, `containsValue`, `.keys`, `.values`.
  - Higher-Order Methods: `where()`, `map()`, `any()`, `every()`, `reduce()`, `fold()`, spread operator `...`, null-aware spread `...?`.
- **Control Flow & Functions:**
  - `if`/`else`, ternary `?:`, `switch`/`case` with pattern matching.
  - Loops: `for`, `for-in`, `while`, `do-while`.
  - Function signatures: Positional parameters, optional positional `[int b = 0]`, named parameters `{required String name, int age = 18}`, first-class functions, anonymous closures.
- **Exception Handling & CLI I/O:**
  - `try`, `on SpecificException`, `catch(e, stackTrace)`, `finally`.
  - `dart:io`: `stdin.readLineSync()`, `stdout.write()`.

### 3. Professor's Traps & Exam Emphasis
> [!WARNING]
> - **Division Trap:** Writing `int result = 4 / 2;` causes a compilation error! Dart's `/` operator always returns `double`. The programmer must use `4 ~/ 2`.
> - **Collection Immutability Trap:** `final List<int> a = [1]; a.add(2);` is completely legal and succeeds. But `const List<int> b = [1]; b.add(2);` compiles cleanly but throws `Unsupported operation: Cannot add to an unmodifiable list` at runtime!
> - **Late Variable Trap:** Declaring `late String x;` and printing `x` before assignment compiles without warning, but crashes at runtime with `LateInitializationError`.
> - **tryParse Null Trap:** Expecting `int.parse("abc")` to return `null` causes an unhandled `FormatException`. Only `int.tryParse("abc")` safely returns `null`.

### 4. Mini-Games & Boss Encounter
- **Mini-Game 1.1: Type Detective:** Analyze 10 tricky Dart variable declarations and identify whether each causes a compile error, runtime crash, or succeeds.
- **Mini-Game 1.2: Collection Crusher:** Manipulate `List`, `Set`, and `Map` collections using `where`, `map`, and spread operators to match target outputs.
- **Mini-Game 1.3: Operator Overdrive:** Fast-paced calculation duel mastering `~/`, `%`, `is!`, and cascade `..`.
- **Boss Encounter 1: The Syntax Sentinel:**
  - *Challenge:* Implement a complete CLI parser that processes raw user inputs, sanitizes strings, converts decimal to binary (LAB-01), and handles malformed data defensively without crashing.

---

## LEVEL 2: Test-Driven Development & Clean Code (The Quality Guardian)

### 1. Source Mapping
- **Primary Source:** `Dart_Essentials_merged.pdf`, Lecture 2 (Slides 46–62) & Lecture 4 (Slides 159–176)
- **Authentic Labs:** LAB-01 (`functions_test.dart`), LAB-03 (`phrase_test.dart`)
- **Exam Policy Note:** Slide 48: *"No LLM, NO VS CODE, USE OF LLMS => -1 POINT FROM CC"*

### 2. Core Concepts & Progression
- **The TDD Cycle (Red-Green-Refactor):**
  - **Red:** Write a failing test specifying the desired behavior before writing production code.
  - **Green:** Write the minimal viable code to make the test pass.
  - **Refactor:** Clean up code, remove duplication, and optimize structure while maintaining passing tests.
- **Dart Testing Framework (`package:test`):**
  - Structure: `main()`, `group('Description', () { ... })`, `test('Feature description', () { ... })`.
  - Assertions: `expect(actual, matcher)`.
  - Built-in Matchers: `equals()`, `isNot()`, `isNull`, `isNotNull`, `isEmpty`, `isNotEmpty`, `hasLength()`, `contains()`, `greaterThan()`, `lessThan()`, `closeTo()`, `startsWith()`, `endsWith()`, `throwsA(isA<FormatException>())`.
- **Project Structure & Conventions:**
  - `pubspec.yaml` dependencies: `dev_dependencies: test: ^1.24.0`.
  - File naming: Test files must reside in `test/` and end with `_test.dart`.
  - Separation: Production code in `lib/`, executable entry points in `bin/`.
- **Clean Code Principles & Coding Standards:**
  - **The Reading Ratio:** "1 minute of writing code equals 9 minutes of reading code."
  - **Naming Rules:** Descriptive identifiers, lowerCamelCase for variables/functions, UpperCamelCase for classes/enums, SCREAMING_SNAKE_CASE avoided.
  - **Function Design:** Functions must do one thing well; avoid `void` where meaningful return values exist; use verb prefixes (`isPalindrome`, `computeTotal`).
  - **File Size Discipline:** Maximum ~200 lines per file; zero horizontal scrolling.
  - **Logging Standards:** Deprecate `print()` in production; employ `package:logger` with explicit levels: `logger.d()` (debug), `logger.i()` (info), `logger.w()` (warning), `logger.e()` (error), `logger.f()` (fatal).
  - **Core Philosophies:** DRY (Don't Repeat Yourself), KISS (Keep It Simple, Stupid), SOLID foundations.

### 3. Professor's Traps & Exam Emphasis
> [!WARNING]
> - **The "False Confidence" Anti-Pattern:** A test suite that passes 100% of tests can still be completely defective if tests only cover happy paths or test trivial assertions.
> - **Satisfying Tests vs Satisfying Requirements:** Hardcoding a return value (e.g. `return true;`) satisfies one test case but fails the business requirement.
> - **Print vs Logger Trap:** Submitting Flutter apps filled with debug `print()` statements violates clean code grading criteria.
> - **Missing Test Suffix:** Naming a test `my_test_case.dart` instead of `something_test.dart` prevents `dart test` from discovering the file automatically.

### 4. Mini-Games & Boss Encounter
- **Mini-Game 2.1: Test-First Architect:** Given a business requirement, arrange matcher assertions into the correct Red test before viewing the solution.
- **Mini-Game 2.2: Assertion Assailant:** Pair buggy function outputs with the precise matcher that exposes their failure (`closeTo`, `throwsA`, `hasLength`).
- **Mini-Game 2.3: Clean Code Refactorer:** Identify code smells (deep nesting, magic numbers, 500-line files, `print()` spam) and refactor them against the timer.
- **Boss Encounter 2: The Red-Green Titan:**
  - *Challenge:* Implement a complete, fully tested String Analysis Engine (`isPalindrome`, `capitalizeWords`, `hasConsecutiveZeros`) satisfying 12 strict edge-case unit tests using TDD principles.

---

## LEVEL 3: Object-Oriented Dart (The Class Colossus)

### 1. Source Mapping
- **Primary Source:** `Dart_Essentials_merged.pdf`, Lecture 3 (Slides 63–105)
- **Authentic Exam Questions:** Q-16 (Subclass vs base reference), Q-17 (`implements` implicit interface), Q-18 (Covariant generics), Q-19 (Static member instance access)
- **Authentic Labs:** LAB-03 (`Phrase` class with encapsulation and getters)

### 2. Core Concepts & Progression
- **Classes & Encapsulation:**
  - Classes as blueprints ("Recipe vs Cake" mental model).
  - Instance variables, private fields with leading underscore `_name` (library-private, not file-private!).
  - Getters and setters with validation logic (`set width(double v) => v > 0 ? _w = v : throw ...`).
  - Instance methods and `@override String toString()`.
- **Constructors Mastery:**
  - Generative constructors with syntactic sugar (`Point(this.x, this.y);`).
  - Named constructors (`Point.origin() : x = 0, y = 0;`).
  - Initializer lists (executing before constructor body, initializing final fields).
  - Redirecting constructors (`Point.alongX(double x) : this(x, 0);`).
  - **`const` Constructors:** All instance fields must be `final`. Dart canonicalizes instances: `identical(const Point(1, 2), const Point(1, 2)) == true`.
  - Named parameters with `required` and default values.
- **Static Members & Constants:**
  - `static const`, static methods (`Class.helper()`).
  - **Critical Rule:** In Dart, static members belong strictly to the class declaration. Calling `instance.staticField` is an immediate compile error.
- **Inheritance & Polymorphism:**
  - Single inheritance via `extends`, `super()`, `super.named()`.
  - Abstract classes (`abstract class Shape`), abstract methods.
  - **`extends` vs `implements`:**
    - `extends` inherits implementation and method bodies.
    - `implements` treats the target class as an **implicit interface**. The implementing class inherits *nothing* except the type signature and must implement every method, getter, and setter!
- **Generics & Covariance:**
  - Generic classes `Box<T>`, type parameter bounds `Box<T extends num>`.
  - **Dart Covariance:** `List<int>` is a subtype of `List<Object>`. Assigning `List<Object> objList = <int>[1, 2];` compiles, but calling `objList.add("str")` throws a runtime type error!
- **Mixins:**
  - `mixin Swimmer on Animal { void swim() => ... }`.
  - Composition via `with`, linearization order, type checking with `is Swimmer`.

### 3. Professor's Traps & Exam Emphasis
> [!WARNING]
> - **Static Member Instance Access (Q-19):** Writing `Student sara = Student('Sara'); print(sara.count);` fails to compile with `"The getter 'count' isn't defined for the type 'Student'"`. Must be `Student.count`.
> - **Polymorphism Base Reference Trap (Q-16):** Declaring `Animal dog = Dog(); dog.fetch();` fails at compile time because the compiler type of `dog` is `Animal`, which lacks the `fetch` method, even if `Dog` defines it.
> - **Implicit Interface Trap (Q-17):** When writing `class Car implements Vehicle`, if `Vehicle` defines a getter `int get wheels;`, `Car` MUST declare `int get wheels;` or an instance field `int wheels;`. Missing any member causes compilation failure.
> - **Const Constructor Field Rule:** Adding a non-final field to a class containing a `const` constructor produces an immediate compile-time error.

### 4. Mini-Games & Boss Encounter
- **Mini-Game 3.1: Constructor Crafter:** Construct objects across 5 variations (named, redirecting, const, initializer list) to match memory equality assertions.
- **Mini-Game 3.2: Interface Infiltrator:** Fix 8 broken classes where `implements` was used instead of `extends` or where implicit interface contracts were breached.
- **Mini-Game 3.3: Mixin Matrix:** Compose complex behavioral classes by ordering mixins with constraints (`on`, `with`).
- **Boss Encounter 3: The Class Colossus:**
  - *Challenge:* Implement the comprehensive `Phrase` class (LAB-03) and an object hierarchy supporting immutability, const constructors, encapsulation, and interface contracts validated by 15 rigorous test cases.

---

## LEVEL 4: Software Design Patterns (The Architectural Overlord)

### 1. Source Mapping
- **Primary Source:** `Dart_Essentials_merged.pdf`, Lecture 3 (Slides 106–134) & Lecture 6 (Slides 367–374)
- **Authentic Exam Questions:** Q-07 (Repository pattern decoupling), Q-09 (Singleton instance sharing)
- **Authentic Labs:** LAB-04 (Singleton `CounterStore`), LAB-05 (Repository `CounterRepository`)

### 2. Core Concepts & Progression
- **The Rationale for Design Patterns:**
  - The "Messy PHP Spaghetti Code" anti-pattern: tightly coupled DB queries inside presentation templates, duplicated logic, editing 40 files to change one column name.
  - Maintainability, testability, decoupling, and code reuse.
- **The Factory Pattern:**
  - Decoupling object creation from object usage.
  - Static factory methods.
  - Abstract class factory constructors: `factory Shape(String type) { if (type == 'circle') return Circle(); ... }`.
  - Deserialization factory: `factory User.fromJson(Map<String, dynamic> json)`.
- **The Singleton Pattern:**
  - Ensuring exactly one instance of a class exists across the entire app lifecycle.
  - Idiomatic Dart implementation:
    ```dart
    class Database {
      static final Database _instance = Database._internal();
      Database._internal(); // Private constructor
      factory Database() => _instance; // Factory constructor returning cached instance
    }
    ```
  - State sharing across independent widgets and screens without global variables.
- **The Repository Pattern:**
  - Creating an abstraction layer between the domain logic / UI and the concrete data source.
  - Architecture: UI $\leftrightarrow$ `AbstractRepository` $\leftrightarrow$ (`LocalDbRepo` / `DummyRepo` / `RemoteApiRepo`).
  - Swapping mock data (`NewsDummy`) for live production backends (`NewsBackend`) without altering a single line of UI code.
- **Messaging Patterns: Observer vs Publish-Subscribe:**
  - **Observer Pattern:** Direct coupling between subject and observers; subject maintains an internal list of subscribers and notifies them directly.
  - **Publish-Subscribe Pattern:** Complete decoupling via an intermediary **Event Broker / Bus**; publishers emit events without knowing subscribers; subscribers listen without knowing publishers; supports temporal and spatial decoupling.

### 3. Professor's Traps & Exam Emphasis
> [!WARNING]
> - **Singleton Factory Return Trap:** A common student mistake is writing `factory Database() => Database._internal();`, which instantiates a brand new object on every call, completely defeating the Singleton pattern! It must return the cached `_instance`.
> - **Repository Direct DB Access Trap (Q-07 & Q-10):** Writing database queries or raw `http.get` calls inside a button's `onPressed` violates the Repository pattern, breaks separation of concerns, and prevents automated testing.
> - **Observer vs Pub-Sub Confusion:** In exam multiple-choice questions, confusing direct Observer notifications with decoupled Broker Pub-Sub is a frequent student trap.

### 4. Mini-Games & Boss Encounter
- **Mini-Game 4.1: Singleton Sentry:** Spot broken Singleton implementations (missing private constructor, creating new instances in factory, missing static cache).
- **Mini-Game 4.2: Factory Foundry:** Build dynamic deserializers and shape factories using abstract class factory constructors.
- **Mini-Game 4.3: Decoupling Duel:** Refactor tightly coupled spaghetti code by slotting in a repository interface to isolate UI from data storage.
- **Boss Encounter 4: The Architectural Overlord:**
  - *Challenge:* Implement the complete `CounterStore` Singleton (LAB-04) alongside an abstract `CounterRepository` with both `JsonCounterRepository` and mock storage (LAB-05), verified by behavioral unit tests.

---

## LEVEL 5: Flutter Foundations & Layout Engine (The Layout Leviathan)

### 1. Source Mapping
- **Primary Source:** `Dart_Essentials_merged.pdf`, Lecture 4 (Slides 177–261)
- **Authentic Exam Questions:** Q-01 (Asset vs File system), Q-25 (Pubspec asset indentation)
- **Authentic Labs:** CHAL-03 (Shopping Cart UI), LAB-06 (Login Screen), LAB-07 (Stateless Tic-Tac-Toe Board), LAB-08 (Pricing Screen)

### 2. Core Concepts & Progression
- **Flutter Framework Architecture:**
  - Cross-platform engine: Dart Framework $\rightarrow$ Engine (C/C++, Skia / Impeller) $\rightarrow$ Platform Embedder (Android, iOS, Web).
  - Android 5-Layer OS: Linux Kernel $\rightarrow$ Hardware Abstraction Layer (HAL) $\rightarrow$ Native Libraries & Android Runtime (ART) $\rightarrow$ Java API Framework $\rightarrow$ System & User Apps.
  - SDK, NDK, AVD Emulator.
  - Ahead-of-Time (AOT) native machine code vs Hot Reload (`r` in terminal).
- **The Widget Tree & Immutability:**
  - "Everything is a Widget": Structural, stylistic, layout, and interactive components.
  - Immutability of `StatelessWidget`: all member fields must be `final`; UI is a pure function of configuration: $UI = f(state)$.
  - `MaterialApp` vs `CupertinoApp`; `home`, `theme`.
  - Application entry point: `void main() => runApp(const MyApp());`.
- **Core Layout Widgets:**
  - `Scaffold`: `appBar`, `body`, `floatingActionButton`, `bottomNavigationBar`, `drawer`.
  - Box Model: `Container` (`padding`, `margin`, `color`, `BoxDecoration`: `borderRadius`, `border`, `boxShadow`, `gradient`).
  - Layout axes: `Row` and `Column` (`mainAxisAlignment`, `crossAxisAlignment`, `mainAxisSize`).
  - Flexibility & Sizing: `SizedBox`, `Spacer`, `Expanded` (`flex`), `Flexible`.
  - Stacking: `Stack` (`alignment`), `Positioned` (`top`, `bottom`, `left`, `right`).
  - Lists: `ListView`, `ListView.builder` (virtualized scrolling, `itemCount`, `itemBuilder`).
  - Content Presentation: `Card`, `ListTile`, `Text`, `Icon`, `Divider`.
  - Images & Assets: `Image.asset` (requires registration in `pubspec.yaml`) vs `Image.network`.

### 3. Professor's Traps & Exam Emphasis
> [!WARNING]
> - **Asset Immutability vs File System (Q-01):** Assets declared in `pubspec.yaml` are bundled into the compiled binary at build time and are strictly read-only. Apps cannot write to or modify assets at runtime; runtime writes must go to the device filesystem.
> - **Pubspec Indentation Trap (Q-25):** Misaligning spaces under `flutter:` $\rightarrow$ `assets:` causes build failures where Flutter cannot resolve image assets.
> - **Unbounded Height / Width Trap:** Placing a `ListView` directly inside a `Column` without wrapping it in `Expanded` or giving it a fixed `SizedBox` height causes an unbounded height runtime crash (`Vertical viewport was given unbounded height`).
> - **Container Color vs Decoration Color:** Supplying both `color: Colors.blue` and `decoration: BoxDecoration(...)` to the same `Container` throws an immediate assertion failure (`Cannot provide both a color and a decoration`).

### 4. Mini-Games & Boss Encounter
- **Mini-Game 5.1: Layout Labyrinth:** Arrange nested `Row`, `Column`, `Expanded`, and `Stack` widgets into matching visual targets.
- **Mini-Game 5.2: Box Model Buster:** Adjust padding, margin, border radius, and box shadows to replicate given UI cards pixel-for-pixel.
- **Mini-Game 5.3: Widget Tree Inspector:** Given a target wireframe, determine the most efficient, minimal widget hierarchy without unnecessary nesting.
- **Boss Encounter 5: The Layout Leviathan:**
  - *Challenge:* Recreate the authentic **My Cart Widget Tree (CHAL-03)** or **Pricing Screen (LAB-08)** with responsive layout, dynamic counters, badge styling, and checkout layout matching design specs.

---

## LEVEL 6: Stateful Widgets & Interactivity (The Reactive Reaper)

### 1. Source Mapping
- **Primary Source:** `Dart_Essentials_merged.pdf`, Lecture 4 (Slides 200–215) & Lecture 5 (Slides 262–329)
- **Authentic Exam Questions:** Q-11 (`Random()` in `build()`), Q-12 (Hardcoded Switch property), Q-13 (Omission of `setState`)
- **Authentic Labs:** CHAL-01 (Rock-Paper-Scissors), CHAL-02 (Dynamic Add Item List), LAB-09 (Interactive Palindrome UI), LAB-11 (Snake Game in Flutter)

### 2. Core Concepts & Progression
- **The State Architecture:**
  - `StatefulWidget` (immutable configuration) vs `State<T>` (mutable state object).
  - Accessing widget parameters from the state object via `widget.fieldName`.
  - The State Lifecycle:
    1. `createState()`: Creates the mutable state instance.
    2. `initState()`: One-time initialization, subscribing to controllers/timers (cannot access `context` dependently).
    3. `didChangeDependencies()`: Called when inherited widgets update.
    4. `build()`: Pure declarative rendering method; called frequently!
    5. `setState(() {})`: Notifies framework of state change and schedules rebuild.
    6. `dispose()`: Cleanup, canceling timers, disposing controllers, unsubscribing streams.
- **Mechanics of `setState`:**
  - Marks the element as "dirty".
  - Omitting `setState` updates the variable in memory, but the Flutter framework has no way of knowing a repaint is required (UI remains stale!).
  - Never put slow computations, network calls, or side effects inside `setState` callbacks.
- **Practical Interactive Game Development:**
  - **Counter App:** Increment, decrement, and reset states.
  - **Move Colored Square:** 2D matrix coordinates `(row, col)`; directional button handlers with boundary checks.
  - **Water Sort Puzzle:** Multi-tube state modeled as `List<List<Color>>`; validating pour rules (top colors match, recipient tube not full).
  - **Tic-Tac-Toe:** 3x3 board representation (`List<String>`), alternating player turns (`X` vs `O`), win evaluation algorithms, draw detection.
  - **Snake Game:** Grid coordinate list `List<Point<int>>`, timer-driven tick loop (`Timer.periodic`), direction queue, food spawning, boundary/self collision.

### 3. Professor's Traps & Exam Emphasis
> [!WARNING]
> - **State Initialization in `build()` (Q-11):** Placing `int startingPlayer = Random().nextInt(2);` inside the `build()` method re-rolls the starting player on every single widget rebuild (keyboard open, orientation change, parent rebuild)! It must be set once in `initState()`.
> - **Hardcoded Switch Property (Q-12):** Writing `Switch(value: false, onChanged: (v) { setState(() { isChecked = v; }); })` will NEVER toggle visually because `value: false` is hardcoded instead of bound to `value: isChecked`.
> - **Missing `setState()` (Q-13):** Writing `onPressed: () { score++; }` updates `score` in RAM, but the screen will not update until another trigger calls `setState`.
> - **Calling `setState` in `dispose()`:** Calling `setState` after a widget is unmounted throws an exception (`setState() called after dispose()`). Always guard with `if (mounted)`.

### 4. Mini-Games & Boss Encounter
- **Mini-Game 6.1: State Matrix:** Trace widget rebuilds across complex state interactions and predict when variables desynchronize from UI.
- **Mini-Game 6.2: Lifecycle Sentry:** Order widget lifecycle methods (`createState`, `initState`, `build`, `dispose`) and place cleanup routines in their correct lifecycle homes.
- **Mini-Game 6.3: Event Horizon:** Debug interactive UI buttons where state is mutated but not visually reflected.
- **Boss Encounter 6: The Reactive Reaper:**
  - *Challenge:* Implement the complete interactive **Rock-Paper-Scissors Game (CHAL-01)** or **Snake Game (LAB-11)** with scoring, timer-driven state ticks, win condition checks, and reset modals.

---

## LEVEL 7: Navigation, Forms & Data Persistence (The Navigation Nemesis)

### 1. Source Mapping
- **Primary Source:** `Dart_Essentials_merged.pdf`, Lecture 5 (Slides 330–364) & Lecture 6 (Slides 365–400)
- **Authentic Exam Questions:** Q-02 (SharedPreferences scope), Q-03 (`GlobalKey<FormState>`), Q-04 (Form validation triggering), Q-08 (SharedPreferences JSON serialization), Q-10 (Separation of concerns in UI), Q-14 (Navigation stack clearing), Q-15 (Awaiting Navigator.push), Q-23 (`TextField` vs `TextFormField`)
- **Authentic Labs:** LAB-10 (Navigation & Role-based routing), LAB-12 (Form validation UI)

### 2. Core Concepts & Progression
- **Navigation & Routing:**
  - The Route Stack: LIFO (Last-In, First-Out) stack abstraction.
  - Direct routes: `Navigator.push(context, MaterialPageRoute(builder: (context) => ScreenB()))`.
  - Popping routes: `Navigator.pop(context)` and returning data `Navigator.pop(context, 'result_data')`.
  - **Awaiting Navigation Results:** `final result = await Navigator.push(...)` pauses execution until destination screen pops.
  - Replacement: `Navigator.pushReplacement()`.
  - Stack clearing: `Navigator.pushAndRemoveUntil(context, ..., (route) => false)` clears history back to root.
  - Named Routes: `MaterialApp(routes: { '/': (ctx) => Home(), '/login': (ctx) => Login() })`.
  - `onGenerateRoute` for dynamic arguments and authentication route guards.
- **Form Architecture & Validation:**
  - `Form` widget as an umbrella container for input fields.
  - **`GlobalKey<FormState>`:** Provides an external handle (e.g. from an `ElevatedButton`) to trigger `validate()`, `save()`, or `reset()`.
  - **`TextFormField` vs `TextField`:** `TextFormField` integrates with `FormState` and supports `validator: (value) => ...`; plain `TextField` ignores form validators.
  - Validator mechanics: Returns `null` if valid, returns error string message if invalid.
  - `_formKey.currentState!.validate()` iterates through all fields, displays inline error text, and returns boolean `false` if any field fails.
  - Input management: `TextEditingController` (`addListener`, `dispose`).
- **Data Persistence with SharedPreferences:**
  - Key-value local storage on device.
  - Singleton pattern: `final prefs = await SharedPreferences.getInstance();`.
  - Scope: App-local, sandboxed to application install, inaccessible to external apps.
  - Supported primitive types: `int`, `double`, `bool`, `String`, `List<String>`.
  - **Object & Map Persistence:** Must serialize complex structures using `json.encode(data)` and deserialize using `json.decode(jsonString)`.

### 3. Professor's Traps & Exam Emphasis
> [!WARNING]
> - **The `.toString()` JSON Storage Trap (Q-08):** Writing `prefs.setString('data', myMap.toString())` saves Dart's string representation (e.g. `{name: John}` without valid JSON quotes). Calling `json.decode()` on this string later throws a fatal `FormatException`! You must use `json.encode(myMap)`.
> - **TextField Validator Trap (Q-23):** Attaching a `validator:` function to a raw `TextField` does nothing because `TextField` has no `validator` property and does not talk to `FormState`. Must use `TextFormField`.
> - **SharedPreferences Scope Trap (Q-02):** Believing `SharedPreferences` automatically syncs across the user's multiple devices or across different applications on the same phone. It is strictly app-local storage.
> - **Unawaited Navigation Pop Result (Q-15):** Expecting `Navigator.push()` to yield returned pop data synchronously without using `await`.

### 4. Mini-Games & Boss Encounter
- **Mini-Game 7.1: Route Runner:** Navigate a multi-screen stack using push, pop, replacement, and clear-until commands without causing dead-ends.
- **Mini-Game 7.2: Form Fortress:** Wire up a `GlobalKey<FormState>`, assemble regex validators for username/PIN, and trigger validation checks.
- **Mini-Game 7.3: Serialization Sanctuary:** Store and retrieve complex nested collections into `SharedPreferences` using safe JSON encoding/decoding.
- **Boss Encounter 7: The Navigation Nemesis:**
  - *Challenge:* Build the complete **Role-Based Navigation & Validation Engine (LAB-10 + LAB-12)** with role checking (Student vs Teacher), credential validators, persistent session flags in `SharedPreferences`, and route guard transitions.

---

## LEVEL 8: Asynchronous Flutter & Data Integration (The Asynchronous Apex)

### 1. Source Mapping
- **Primary Source:** `Dart_Essentials_merged.pdf`, Lecture 3 (Slides 135–156) & Lecture 6 (Slides 401–438)
- **Authentic Exam Questions:** Q-05 (`FutureBuilder` in `build()`), Q-06 (`setState` in `builder`), Q-24 (Timer cancellation in `dispose`)
- **Authentic Labs:** LAB-13 (Async Login without `FutureBuilder`), LAB-14 (`FutureBuilder` REST API Integration)

### 2. Core Concepts & Progression
- **The Dart Asynchronous Model:**
  - Single-threaded execution thread with the **Event Loop**.
  - Queues: **Microtask Queue** (higher priority, internal actions) and **Event Queue** (I/O, gestures, timers, HTTP).
  - `Future<T>` representing an uncompleted computation.
  - `async` / `await` syntactic sugar; return types must always be `Future<T>` (never `void async` except in top-level event handlers).
  - `Future.delayed()`, `Future.wait()`.
  - **Isolates:** Separate memory heaps for CPU-intensive background tasks (`Isolate.run()`) vs `async` for non-blocking I/O waiting.
- **HTTP Networking & JSON Parsing:**
  - `package:http/http.dart as http`.
  - Methods: `http.get()`, `http.post()`.
  - Response handling: `response.statusCode == 200`, `json.decode(response.body)`.
- **The `FutureBuilder` Widget & The Cafeteria Buzzer Metaphor:**
  - **The Metaphor:**
    1. *Placing Order at Cashier:* Creating the `Future` (cashier gives you a vibrating buzzer).
    2. *Waiting at the Table:* `FutureBuilder` checks `snapshot.connectionState == ConnectionState.waiting` (showing `CircularProgressIndicator`).
    3. *Buzzer Vibrates:* The `Future` completes.
    4. *Picking Up Meal:* `snapshot.hasData` becomes `true` (rendering data UI) or `snapshot.hasError` occurs (rendering error UI).
  - Snapshot properties: `snapshot.connectionState`, `snapshot.hasData`, `snapshot.data`, `snapshot.hasError`, `snapshot.error`.
- **Dynamic Data Refresh & Timers:**
  - Pull-to-refresh: `RefreshIndicator(onRefresh: () async => ...)` wrapping scrollable views.
  - Periodic polling: `Timer.periodic(Duration(seconds: 5), (timer) { ... })`.
  - **Mandatory Lifecycle Cleanup:** Canceling all active timers and stream subscriptions inside `dispose()` to prevent memory leaks and exceptions.

### 3. Professor's Traps & Exam Emphasis
> [!WARNING]
> - **The Infinite FutureBuilder Loop (Q-05):** Writing `FutureBuilder(future: fetchNews(), ...)` directly inside the `build()` method creates a fatal recursion! Every time the Future completes, `FutureBuilder` triggers a rebuild. Rebuilding calls `build()`, which calls `fetchNews()` again, instantiating a new Future, which completes and rebuilds again in an infinite network loop!
>   *The Fix:* Initialize the `Future` variable once in `initState()` (`_newsFuture = fetchNews();`) and pass `future: _newsFuture`.
> - **`setState` Inside `builder` Callback (Q-06):** Calling `setState()` synchronously inside `FutureBuilder`'s builder parameter throws a fatal framework exception: `setState() or markNeedsBuild() called during build`.
> - **Uncancelled Timer Memory Leak (Q-24):** Failing to call `_timer.cancel()` in `dispose()` keeps the timer alive indefinitely in the Dart event loop, continuing to execute callbacks and calling `setState()` on disposed widgets.
> - **Ignoring Snapshot ConnectionState:** Attempting to render `Text(snapshot.data!.title)` without checking `if (snapshot.hasData)` crashes with a null check error while the request is in flight.

### 4. Mini-Games & Boss Encounter
- **Mini-Game 8.1: Event Loop Enigma:** Predict the exact console output order of interleaved synchronous prints, `scheduleMicrotask`, `Future.delayed`, and `Future.value`.
- **Mini-Game 8.2: FutureBuilder Fixer:** Diagnose 6 broken `FutureBuilder` snippets (re-triggering in build, missing connection checks, calling setState in builder).
- **Mini-Game 8.3: Stream & Polling Patrol:** Wire periodic polling with `RefreshIndicator` and safeguard with `dispose()` timer cancellation.
- **Boss Encounter 8: The Asynchronous Apex:**
  - *Challenge:* Implement the complete **FutureBuilder API Integration (LAB-14)** and an empirical test bench demonstrating: (1) correct Future caching in `initState`, (2) pull-to-refresh mechanics, (3) safe error handling, and (4) cancellation on widget teardown.

---

## THE COMPREHENSIVE EXAM SIMULATOR: "The Bouchrika Boss Trial"

### 1. Specification & Philosophy
- **Authentic Exam Emulation:** Replicates the exact format, psychological tension, and difficulty of Prof. Bouchrika's ENSIA Mobile Development final examination.
- **Strict Anti-LLM & Anti-Cheating Protocol:** Enforces the professor's strict classroom policy: *"No LLM, NO VS CODE, USE OF LLMS => -1 POINT FROM CC"*.
- **Timer & Scoring Engine:**
  - 30-minute hard countdown timer.
  - 25 randomly drawn questions from the verified question bank:
    - 15 Multiple-Choice Questions (trap-heavy, testing compilation vs runtime failure).
    - 5 Code-Reading & Execution Prediction Questions (tracing lifecycle, event loops, and widget rebuilds).
    - 5 Live Code Correction / Snippet Bug-Fix Challenges.
  - **Negative Marking Mode:** Incorrect answers on high-confidence questions incur a penalty deduction (-0.25 to -0.5 points) to punish guessing and replicate strict ENSIA grading.
- **Detailed Diagnostic Debrief:**
  - Upon submission, generates an itemized score report.
  - Explains the exact mechanism behind every trap, citing the specific lecture slide and mental model.
  - Awards the prestigious **"Bouchrika Beater"** certified digital badge upon scoring $\ge 80\%$.
