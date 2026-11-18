# Content Audit & Source Material Inventory
**Module:** Mobile Development (Dart & Flutter) — ENSIA  
**Instructor:** Prof. Imed Bouchrika  
**Project:** Mobile Dev Quest (Gamified Interactive Learning Platform)  
**Date of Audit:** November 2026  
**Auditor:** Antigravity AI Assistant  

---

## 1. Executive Summary & Audit Scope

This document provides a comprehensive inventory, gap analysis, and structural audit of all educational assets supplied for the Mobile Development course. The target system is **Mobile Dev Quest**, a high-fidelity, interactive, gamified learning platform engineered to help ENSIA students master Dart and Flutter while preparing specifically for the rigorous, trap-heavy examination style of Professor Imed Bouchrika.

### Primary Source Artifacts Audited:
1. **`Docs/Dart_Essentials_merged.pdf`** (438 pages): Five merged lecture slide decks delivered by Prof. Imed Bouchrika. This serves as the **exclusive canonical source** for topic sequencing, terminology, conceptual depth, code conventions, and architectural metaphors.
2. **`Docs/mobile.pdf`** (41 pages): Authentic assessment artifacts, including screenshots of 26 online quiz questions (Moodle/Canvas), 3 major interactive challenge specifications, and 14 laboratory assignments with unit tests. This serves as the **primary authority on question difficulty, distractor construction, and practical coding scope**.
3. **`Docs/technical-specification.md`** (1,100 lines): Comprehensive product requirement document (PRD) detailing the platform's vision, persona, 8-level progression, 24 mini-games, 8 boss encounters, technical architecture, and browser execution model.

---

## 2. Detailed Source Material Inventory

### 2.1 Lecture Slides (`Dart_Essentials_merged.pdf`)

The 438 slides span five major pedagogical modules:

| Deck | Slide Range | Title & Primary Domain | Core Concepts Covered | Code Examples & Metaphors |
| :--- | :--- | :--- | :--- | :--- |
| **L2** | pp. 1–62 | **Dart Programming Language & TDD** | History (2011, JS replacement), Typing (`var`, `dynamic`, `final`, `const`, `late`), Built-in types (`num`, `int`, `double`, `bool`, `String`), String interpolation & multiline, Parsing (`parse` vs `tryParse`), Operators (`~/`, `%`, `is`, `is!`), Collections (`List` growable vs `List.filled`, `Set`, `Map`), Iterables (`where`, `map`, `any`, `every`, spread `...`), Functions (arrow, named/optional parameters, defaults, first-class callbacks), Control flow (`switch`, `for-in`), Exceptions (`try/catch(e, s)/finally`), `dart:io` (`stdin.readLineSync`, `stdout.write`), Test-Driven Development (Red-Green-Refactor, `package:test`, `group`, `test`, `expect`, Matchers). | "False Confidence" warning in TDD; "Satisfying tests vs satisfying requirements"; String reverse & Palindrome; Calculator CLI; Exam rule: *"No LLM, NO VS CODE, USE OF LLMS => -1 POINT FROM CC"*. |
| **L3** | pp. 63–156 | **Object-Oriented Dart, Design Patterns & Async** | Classes, instance fields, methods, constructors (default, named, redirecting, initializer list), `const` constructors (`identical()` object pooling), `required` parameters, private encapsulation (`_`), getters/setters with validation, static members (instance access prohibited!), `@override toString()`, cascade operator (`..`), Inheritance (`extends`, `super`), Abstract classes, `extends` vs `implements` (implicit interface — must implement all getters/setters!), Generics (`Box<T>`, covariant type assignability), Mixins (`mixin`, `with`, `on`, `is`). **Design Patterns:** Spaghetti PHP anti-pattern, Factory pattern (static method, abstract class factory, `fromJson`), Singleton pattern (private constructor `Database._internal()`, static `_instance`, factory constructor), Repository pattern (`AbstractNewsRepo`, dummy vs backend), Observer vs Pub-Sub (central broker, temporal/spatial decoupling). **Asynchronous Dart:** Event Loop (microtask vs event queue), `Future<T>`, `async`/`await`, return types, Isolates (`Isolate.run` for CPU vs `async` for I/O). | "Recipe vs Cake" class metaphor; Spaghetti PHP website refactoring scenario; News dummy vs backend repository; Event loop cafeteria queue metaphor. |
| **L4** | pp. 157–261 | **Flutter Foundations: Clean Code, Architecture & Widgets** | Clean code philosophy (1 min coding = 9 min reading), naming rules (lowerCamelCase, verb prefix, avoiding void), file size constraints (<200 lines, no horizontal scroll), domain vs technical folder structure, SOLID, DRY, KISS, Logging (`package:logger` levels vs `print`). Flutter compilation (AOT native ARM/x86 + Skia/Impeller engine), hot reload (`r`), `MaterialApp` vs `CupertinoApp`, `main() -> runApp()`, `pubspec.yaml`, Android 5-layer OS architecture (Linux Kernel, HAL, Native Libraries + ART, Java API Framework, Apps), SDK vs NDK vs Emulator. Widget tree concept, `StatelessWidget` immutability, `Scaffold`, `AppBar`, `Container` (`BoxDecoration`, radius, border, shadow, gradient), `Card`, `ListTile`, `Row`, `Column`, `Center`, `SizedBox`, `Spacer`, `Expanded`, `Stack`, `Positioned`, `Image.asset` (with yaml declaration) vs `Image.network`, `ListView.builder`. | "Clean code reading ratio"; Box decoration layout diagrams; Widget tree hierarchies; Android architectural stack breakdown. |
| **L5** | pp. 262–364 | **Stateful Widgets, Interactivity & Navigation** | `StatefulWidget` and `State<T>`, lifecycle (`createState`, `initState`, `build`, `setState`, `dispose`), accessing widget fields via `widget.property`, `setState(() {})` mechanics (dirty marking, rebuild scheduling, omitting `setState` silently fails to repaint), Interactive Apps: Counter App, Move Colored Square (2D grid matrix navigation), Water Sort Puzzle (color tube state via `List<List<Color>>`), Tic-Tac-Toe (3x3 grid, turn tracking, win/draw detection), Dynamic To-Do List (`List<Map<String, dynamic>>`). Strict warning against business logic in widget build trees. **Navigation:** Navigation stack (LIFO, push/pop), Named routes (`MaterialApp.routes`), `onGenerateRoute` with guards, parameter passing (constructor vs `ModalRoute.of(context)!.settings.arguments`), returning data via `Navigator.pop(context, result)`, `pushReplacement`, `pushAndRemoveUntil`. | Water Sort puzzle vessels; Tic-Tac-Toe win matrix checks; Navigation push/pop stack diagrams; Screen transition parameter passing. |
| **L6** | pp. 365–438 | **Data Persistence, Forms, HTTP & FutureBuilder** | Data persistence spectrum (SharedPreferences vs Local SQLite/Sembast vs Filesystem vs Backend API). Form validation: `Form`, `GlobalKey<FormState>()`, `TextFormField` vs plain `TextField`, `validator: (v) => ...`, `_formKey.currentState!.validate()`. `TextEditingController`. SharedPreferences: singleton `SharedPreferences.getInstance()`, device-local scope, JSON serialization (`json.encode`/`json.decode` vs broken `.toString()`). Asynchronous UI with `FutureBuilder`: **The Cafeteria Buzzer Metaphor**; `AsyncSnapshot` (`ConnectionState`, `hasData`, `hasError`, loading states); **Critical Anti-Pattern Trap:** Calling async fetch inside `build()` causes infinite loops on rebuild; proper initialization in `initState()`. `RefreshIndicator`, `Timer.periodic`, and mandatory cancellation in `dispose()` to prevent memory leaks and zombie rebuilds. `package:http/http.dart`, REST endpoints, JSON parsing. | Cafeteria buzzer metaphor (order placed = Future created, buzzer vibrates = Future resolved, meal collected = snapshot data rendered); Infinite rebuild hazard diagram; Timer memory leak warning. |

---

### 2.2 Assessment & Exam Artifacts (`mobile.pdf`)

`mobile.pdf` contains 41 pages of authentic exam, quiz, and lab materials:

#### 1. Quiz Questions Catalog (Pages 1–24, 26–27) — 26 Distinct Questions
The questions specifically probe edge cases, compiler errors, runtime exceptions, and subtle Flutter lifecycle bugs:
- **Q-01 (Asset vs File System):** Difference between assets (bundled at build time, read-only) vs runtime filesystem files (writable, created on device).
- **Q-02 (SharedPreferences Scope):** Stored per application install locally on device; not accessible by other apps or synced across devices automatically.
- **Q-03 (GlobalKey<FormState> Role):** Acts as a handle for outside widgets (like an `ElevatedButton`) to trigger `validate()` on all descendant `TextFormField`s.
- **Q-04 (Form Validation Triggering):** `validate()` runs all field validators, displays error text on invalid fields, and returns `false` if any validator fails.
- **Q-05 (FutureBuilder Build Anti-Pattern):** Instantiating `future: getNews()` directly in `build()` forces an infinite refetch on every widget repaint.
- **Q-06 (setState inside FutureBuilder builder):** Calling `setState()` synchronously inside `FutureBuilder`'s builder parameter throws a runtime framework error ("setState() or markNeedsBuild() called during build").
- **Q-07 (Repository Pattern Advantage):** Decouples UI from the concrete data source; allows switching between mock (`NewsDummy`) and live backend (`NewsBackend`) without modifying UI code.
- **Q-08 (SharedPreferences JSON Serialization):** Storing `List<Map>.toString()` saves an unparseable literal string; must use `json.encode(data)` to enable subsequent `json.decode()`.
- **Q-09 (SharedPreferences Singleton):** `await SharedPreferences.getInstance()` returns the exact same shared in-memory instance across different screens.
- **Q-10 (Separation of Concerns in UI):** Embedding raw business, HTTP, or persistence logic inside button `onPressed` callbacks prevents unit testing and code reusability.
- **Q-11 (State Initialization in build()):** Calling `Random().nextInt(2)` inside `build()` re-randomizes state on every rebuild/device rotation; must be initialized once in `initState()`.
- **Q-12 (Hardcoded Switch Property):** A Flutter `Switch` with `value: false` hardcoded will never visually toggle even if its `onChanged` triggers `setState()` on an internal variable.
- **Q-13 (Omission of setState):** Mutating state variables without wrapping in `setState(() {})` modifies memory but leaves the UI stale and unrendered.
- **Q-14 (Navigation Stack Clearing):** `Navigator.pushAndRemoveUntil(context, ..., (route) => false)` clears all previous routes from the stack.
- **Q-15 (Awaiting Navigator.push):** `await Navigator.pushNamed(context, '/screen')` halts execution until the pushed screen calls `Navigator.pop(context, value)` and yields that value.
- **Q-16 (OOP Polymorphic Method Invocation):** Declaring `Animal dog = Dog(); dog.fetch()` fails to compile if `fetch()` is only declared in `Dog` and not in `Animal`.
- **Q-17 (Interface Implementation Contract):** When `class A implements B`, class A must implement all concrete methods, getters, and setters of B (implicit interface).
- **Q-18 (Dart Generics Covariance):** Dart collections and generic classes are covariant: `Box<int>` is assignable to `Box<Object>` or `Box<num>`.
- **Q-19 (Static Member Access via Instance):** Attempting to access a static variable through an object instance (`student.count`) produces a compilation error in Dart.
- **Q-20 (Integer Division Operator):** Evaluating `7 / 2` yields `double 3.5`; integer division requires the `~/` operator (`7 ~/ 2 == 3`).
- **Q-21 (Const vs Final List Mutability):** `final list = [1]; list.add(2);` succeeds; `const list = [1]; list.add(2);` throws an `Unsupported operation: Cannot add to an unmodifiable list` exception at runtime.
- **Q-22 (Late Initialization Exception):** Accessing a `late String name;` before assigning a value throws a `LateInitializationError` at runtime.
- **Q-23 (TextField vs TextFormField):** Passing `validator:` to a raw `TextField` does nothing because `TextField` has no built-in validator property (requires `TextFormField`).
- **Q-24 (Timer Cancellation):** Forgetting `timer.cancel()` in `dispose()` keeps the timer firing in the event loop, triggering `setState` on unmounted widgets and causing memory leaks.
- **Q-25 (Pubspec Indentation Error):** Incorrect YAML indentation in `pubspec.yaml` assets section prevents assets from being recognized at build time.
- **Q-26 (Cascade Operator Evaluation):** Using `..` returns the original receiver instance, allowing fluent method chaining and property mutation.

#### 2. Practical Challenges & Labs Catalog (Pages 25, 28–41)
- **CHAL-01 (Rock-Paper-Scissors):** First-to-3 points game against device; state tracking, score counters, game over reset modal.
- **CHAL-02 (Dynamic Collection List):** `TextField` + "Add" button + dynamic counter badge + `ListView` of entries; disallows empty or whitespace-only inputs.
- **CHAL-03 (My Cart Widget Tree):** Pixel-perfect recreation of shopping cart UI (Notebook, Pen Pack, Backpack, Calculator) with item quantities, unit prices, dynamic DA total calculation, and Checkout action.
- **LAB-01 (Simple Functions & TDD):** Implement `bool isPalindrome(String s)` and `String decimalTobinary(int n)` in `functions.dart`, validated by 8 unit tests in `functions_test.dart`.
- **LAB-02 (Loops & String Processing):** Factorial computation via loop; title capitalization without helper methods; detecting adjacent `"00"` substring.
- **LAB-03 (Mastering OOP in Dart):** Implement `class Phrase` with private `_text`, named constructor `Phrase.empty()`, getters `text`, `isPalindrome`, `capitalized`, and `toString()`, validated via unit tests.
- **LAB-04 (Singleton Design Pattern):** Implement `CounterStore` singleton with private constructor `CounterStore._internal()`, static `_instance`, and `factory CounterStore() => _instance`, maintaining persistent state.
- **LAB-05 (Repository Design Pattern):** Abstract `CounterRepository` interface with `JsonCounterRepository` and `SembastCounterRepository` implementations; decoupled data operations.
- **LAB-06 (Static Login Screen):** Widget tree analysis and implementation of "TutorialKart" login screen (`ElevatedButton`, `TextField`, custom theme colors).
- **LAB-07 (Stateless Tic-Tac-Toe Board):** Widget tree design and clean implementation of 3x3 grid using nested `for` loops and `Row`/`Column` widgets without state.
- **LAB-08 (Complex Pricing Screen):** Multi-tier pricing table ($14 Basic, Free, $0 Open Source, $199 Enterprise) with custom badges, feature lists, and toggleable selection cards.
- **LAB-09 (Interactive Palindrome App):** Full Flutter UI with dynamic `TextField`, real-time reverse string calculation, palindrome status badge, and clear button.
- **LAB-10 (Navigation & Role-Based Routing):** Credentials form authenticating `student` vs `teacher` roles; routes to `StudentDashboard` or `TeacherDashboard`; invalid login displays `SnackBar`.
- **LAB-11 (Snake Game in Flutter):** 20x20 grid game using `Timer.periodic(200ms)`, snake body coordinate list, random food generator, directional controls, and collision detection.
- **LAB-12 (Form Validation Screen):** Username validator (minimum 4 characters, letters only, no special symbols/digits) + 4-digit PIN validator with visual error states.
- **LAB-13 (Async Login Flow without FutureBuilder):** Manual async management: loading spinner display, 5-second simulated network latency, error handling, and navigation upon success.
- **LAB-14 (FutureBuilder API Integration):** Empirical comparison: (1) Future in `build()`, (2) Future in `initState()`, (3) Future in `initState()` with refresh trigger; fetching JSON from REST endpoint.

---

## 3. Gap Analysis & Missing / Unextractable Items

During visual inspection and OCR analysis of `Dart_Essentials_merged.pdf` and `mobile.pdf`, the following specific gaps, ambiguities, and unextractable items were identified:

| Item ID | Source Location | Description | Impact on Implementation | Resolution / Recommended Handling |
| :--- | :--- | :--- | :--- | :--- |
| **GAP-01** | L3, Slide 102 & 103 | External hyperlinks to Google Drive and Dropbox for live video demos of Design Patterns. | Students cannot access live videos if links expire or require ENSIA credentials. | Implement fully functional, interactive visual animations directly inside Level 4 (Singleton & Factory interactive sandboxes) in the web app. |
| **GAP-02** | L6, Slide 418 | Ephemeral REST API endpoint URL (`https://...leapcell.dev/...`) used for student JSON news fetching. | External demo servers hosted on free-tier cloud platforms (Leapcell) often shut down or rate-limit. | Provide an embedded, high-reliability mock REST API service within the web application worker with identical JSON payloads. |
| **GAP-03** | `mobile.pdf`, Page 35 | Lab 9 UI screenshot is low-resolution and slightly cropped around the input border. | Minor visual ambiguity regarding exact padding and border radius. | Standardize to standard Material 3 specifications (`OutlineInputBorder`, 12px border radius, 16px padding) consistent with professor's other labs. |
| **GAP-04** | `mobile.pdf`, Page 39 | Lab 13 loading indicator screenshot has dark contrast obscuring text below spinner. | Text prompt below spinner is partially unreadable. | Reconstruct label as standard `"Authenticating credentials, please wait..."` based on lecture slide 425 template. |
| **GAP-05** | `mobile.pdf`, Page 30 | Lab 5 refers to `SembastCounterRepository` without specifying Sembast web database factory setup. | Sembast requires `sembast_web` on web platforms, which differs from mobile VM file-path initializers. | In the browser learning environment, provide a web-compatible in-memory / IndexedDB Sembast factory mock that preserves identical repository semantics. |
| **GAP-06** | PRD vs Source Volume | Technical spec mandates 240+ MCQs and 60+ challenges, whereas `mobile.pdf` provides 26 quiz questions and 14 labs. | Direct 1:1 mapping covers ~30% of the required high-volume question bank. | Synthesize additional questions adhering strictly to Prof. Bouchrika's verified question patterns, with explicit `synthetic_extension` tagging so no synthetic question is falsely attributed to the professor. |

---

## 4. Syllabus Alignment Matrix (Lectures vs PRD Levels)

The curriculum aligns cleanly between the 5 lecture decks and the 8 PRD levels:

```
[Lecture 2: Dart & TDD] ──┬──> Level 1: Dart Foundations (Language, Types, Control Flow)
                          └──> Level 2: Test-Driven Development (TDD, package:test, Clean Code)

[Lecture 3: OOP, Patterns, Async] ──┬──> Level 3: Object-Oriented Dart (Classes, Inheritance, Mixins)
                                    ├──> Level 4: Software Design Patterns (Factory, Singleton, Repository)
                                    └──> (Async concepts fed forward into Level 8)

[Lecture 4: Flutter Foundations] ──> Level 5: Flutter Foundations & Layouts (Widgets, Trees, Layout)

[Lecture 5: Interactivity & Games] ──> Level 6: Stateful Widgets & Interactivity (State, Lifecycle, Games)

[Lecture 5 Navigation + Lecture 6 Persistence] ──> Level 7: Navigation, Forms & Data Persistence (Routes, Forms, SharedPreferences)

[Lecture 3 Async + Lecture 6 FutureBuilder] ──> Level 8: Asynchronous Flutter & Data Integration (Event Loop, HTTP, FutureBuilder)

[All Sources + Exam Quirks] ──> Comprehensive Exam Simulator: "The Bouchrika Boss Trial"
```

### Detailed Alignment Summary:

| Level | PRD Title | Primary Lecture Source | Authentic Exam Questions in `mobile.pdf` | Lab / Challenge in `mobile.pdf` |
| :---: | :--- | :--- | :--- | :--- |
| **L1** | Dart Foundations | Lecture 2 (pp. 1–45) | Q-20, Q-21, Q-22, Q-26 | LAB-01 (Binary), LAB-02 (Factorial/Strings) |
| **L2** | TDD & Clean Code | Lecture 2 (pp. 46–62) & L4 (pp. 159–176) | Exam policy trap, test matchers | LAB-01 (Unit tests), LAB-03 (Phrase tests) |
| **L3** | Object-Oriented Dart | Lecture 3 (pp. 63–105) | Q-16, Q-17, Q-18, Q-19 | LAB-03 (`Phrase` class & getters) |
| **L4** | Design Patterns | Lecture 3 (pp. 106–134) | Q-07, Q-09 | LAB-04 (Singleton), LAB-05 (Repository) |
| **L5** | Flutter Foundations & Layouts | Lecture 4 (pp. 177–261) | Q-01, Q-25 | CHAL-03 (Cart UI), LAB-06 (Login), LAB-07 (Board), LAB-08 (Pricing) |
| **L6** | Stateful Widgets & Interactivity | Lecture 4 (pp. 200–215) & L5 (pp. 262–329) | Q-11, Q-12, Q-13 | CHAL-01 (RPS), CHAL-02 (Add Item), LAB-09 (Palindrome UI), LAB-11 (Snake) |
| **L7** | Navigation, Forms & Persistence | Lecture 5 (pp. 330–364) & L6 (pp. 365–400) | Q-02, Q-03, Q-04, Q-08, Q-10, Q-14, Q-15, Q-23 | LAB-10 (Nav/Role Check), LAB-12 (Form Validation) |
| **L8** | Asynchronous Flutter & Data | Lecture 3 (pp. 135–156) & L6 (pp. 401–438) | Q-05, Q-06, Q-24 | LAB-13 (Async Login), LAB-14 (FutureBuilder API) |
| **Exam** | The Bouchrika Boss Trial | All Lectures & Exam Bank | All 26 questions randomized with trap variations | Full 30-minute timed simulation with penalty deductions |

---

## 5. Audit Recommendations & Guardrails

1. **Strict Provenance Labeling:** Every question in the system must explicitly carry a metadata tag:
   - `[ORIGINAL_QUIZ]`: Directly extracted from `mobile.pdf` quiz screenshots.
   - `[ORIGINAL_LAB]`: Directly derived from `mobile.pdf` lab tasks.
   - `[LECTURE_CORE]`: Directly adapted from code listings in `Dart_Essentials_merged.pdf`.
   - `[SYNTHETIC_EXTENSION]`: Newly designed question matching the professor's style to reach the target quota.
2. **Never Claim AI-Created Questions are Professor Material:** The UI must display a clear source badge on every challenge card.
3. **Preserve Exact Exam Traps:** The professor's favorite traps (e.g. `sara.count` compilation error, `future: getNews()` in `build()`, `final` vs `const` list modification, covariant generics) must be highlighted with dedicated "Professor's Trap" callout boxes.
4. **Offline Resilience:** The browser runtime must operate completely self-contained without relying on external APIs (such as Leapcell or remote video links).
