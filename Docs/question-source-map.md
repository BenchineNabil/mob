# Question Source Map & Provenance Catalog
**Module:** Mobile Development (Dart & Flutter) — ENSIA  
**Instructor:** Prof. Imed Bouchrika  
**System:** Mobile Dev Quest  
**Last Updated:** November 2026  

---

## 1. Provenance Taxonomy & Attribution Guidelines

To ensure academic honesty, complete transparency, and zero confusion between authentic professor material and platform-generated practice items, every question and exercise in the Mobile Dev Quest platform is tagged with one of four immutable provenance labels:

| Provenance Tag | Source Artifact | Description & Attribution Policy |
| :--- | :--- | :--- |
| `[ORIGINAL_QUIZ]` | `Docs/mobile.pdf` (pp. 1–24, 26–27) | **Authentic exam/quiz question** directly extracted from Prof. Bouchrika's actual Canvas/Moodle quizzes. Options, question phrasing, and core traps are preserved word-for-word. |
| `[ORIGINAL_LAB]` | `Docs/mobile.pdf` (pp. 25, 28–41) | **Authentic lab assignment or challenge** given by Prof. Bouchrika in practical sessions, including test specifications and requirements. |
| `[LECTURE_CORE]` | `Docs/Dart_Essentials_merged.pdf` | **Lecture-derived exercise** constructed directly from code snippets, diagrams, and warnings presented in Prof. Bouchrika's lecture slides. |
| `[SYNTHETIC_EXTENSION]` | Platform Generated | **Supplemental practice item** engineered to match Prof. Bouchrika's examination style, distractor design, and difficulty to reach the target question quota (240+ MCQs, 60+ challenges). **Must never be represented as the professor's own question.** |

---

## 2. Complete Catalog of Original Quiz Questions (`[ORIGINAL_QUIZ]`)

The following 26 questions were transcribed and verified from the visual screenshots of Prof. Imed Bouchrika's real quizzes in `Docs/mobile.pdf`:

---

### Q-01: Asset vs Runtime File Storage
- **ID:** `Q-01`
- **Source:** `mobile.pdf`, Page 1
- **Curriculum Level:** Level 5 (Flutter Foundations & Layouts)
- **Question:** What is the primary difference between a file stored as an asset in Flutter and a file stored in the device's file system?
- **Options:**
  - A) Assets can be modified by the app at runtime, whereas file system files are read-only.
  - B) Assets are bundled with the app at build time and are read-only at runtime, whereas file system files can be created, updated, and deleted by the app at runtime.
  - C) Assets can only store text files, while the file system can only store images and binary files.
  - D) Assets are automatically synchronized with a remote cloud database, while file system files remain local.
- **Correct Answer:** **B**
- **Professor's Rationale:** Assets declared in `pubspec.yaml` are packaged into the application binary upon compilation. Because the bundle is signed and sealed by the OS, it is strictly immutable and read-only. Dynamic application data that must be written or mutated must be stored in the device filesystem or databases.
- **Trap / Distractor Analysis:** Distractor A reverses the fundamental principle. Distractor D falsely promises automatic cloud synchronization.

---

### Q-02: Scope of SharedPreferences
- **ID:** `Q-02`
- **Source:** `mobile.pdf`, Page 2
- **Curriculum Level:** Level 7 (Navigation, Forms & Persistence)
- **Question:** What is the scope and availability of data saved using `SharedPreferences` in Flutter?
- **Options:**
  - A) Data is available across all applications installed on the device and is globally readable.
  - B) Data is automatically synced to the user's Google account and accessible on any device they log into.
  - C) Data is persistent across app launches, but is private to the specific application install on the local device.
  - D) Data only persists in memory while the current screen is mounted, and is lost on screen pop.
- **Correct Answer:** **C**
- **Professor's Rationale:** `SharedPreferences` provides persistent key-value storage backed by platform-specific mechanisms (XML on Android, `NSUserDefaults` on iOS). It survives app restarts but is strictly sandboxed to the local app install. It does not sync across devices and is not accessible to other installed apps without specific OS IPC mechanisms.
- **Trap / Distractor Analysis:** Students often mistake local storage for cloud-synced storage (Distractor B) or confuse it with in-memory state (Distractor D).

---

### Q-03: Purpose of `GlobalKey<FormState>`
- **ID:** `Q-03`
- **Source:** `mobile.pdf`, Page 3
- **Curriculum Level:** Level 7 (Navigation, Forms & Persistence)
- **Question:** In Flutter form handling, why is a `GlobalKey<FormState>` typically declared and assigned to a `Form` widget?
- **Options:**
  - A) To globally register the form with the backend REST API server.
  - B) To provide external widgets (such as an `ElevatedButton` outside the form) access to trigger `FormState` methods like `validate()`, `save()`, and `reset()`.
  - C) To automatically encrypt all user inputs stored in the form fields.
  - D) To prevent the keyboard from obscuring the input fields when focused.
- **Correct Answer:** **B**
- **Professor's Rationale:** In Flutter's declarative tree, a widget cannot directly call methods on another widget without a handle. The `GlobalKey<FormState>` provides a unique global reference allowing sibling or ancestor widgets (like a submit button in an AppBar or bottom bar) to call `_formKey.currentState!.validate()`.
- **Trap / Distractor Analysis:** Distractors A and C invent non-existent enterprise/security features that appeal to students guessing.

---

### Q-04: Mechanics of `FormState.validate()`
- **ID:** `Q-04`
- **Source:** `mobile.pdf`, Page 4
- **Curriculum Level:** Level 7 (Navigation, Forms & Persistence)
- **Question:** What happens when `_formKey.currentState!.validate()` is executed?
- **Options:**
  - A) It sends an HTTP POST request to the server to check for username uniqueness.
  - B) It executes the `validator` callback of each descendant `FormField` in the widget tree, displays inline error text on fields that return an error string, and returns `false` if any validator fails (or `true` if all pass).
  - C) It clears all form fields and resets their text controllers to empty strings.
  - D) It locks all form inputs and makes them read-only until the app restarts.
- **Correct Answer:** **B**
- **Professor's Rationale:** Calling `validate()` triggers a tree traversal over every registered `FormFieldState`. Each executes its assigned validator callback. If any callback returns a non-null string, the field updates its UI to display the error and the aggregate call returns `false`.
- **Trap / Distractor Analysis:** Distractor C describes `reset()`, not `validate()`. Distractor A confuses client-side validation with backend verification.

---

### Q-05: The Infinite FutureBuilder Anti-Pattern
- **ID:** `Q-05`
- **Source:** `mobile.pdf`, Page 5
- **Curriculum Level:** Level 8 (Asynchronous Flutter & Data Integration)
- **Question:** Consider the following Flutter widget code:
  ```dart
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder<List<News>>(
        future: getNews(), // Note: getNews() returns a new Future<List<News>>
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return ListView(...);
          }
          return CircularProgressIndicator();
        },
      ),
    );
  }
  ```
  What critical architectural issue is present in this implementation?
- **Options:**
  - A) `FutureBuilder` cannot accept generic type parameters like `<List<News>>`.
  - B) Calling `getNews()` directly inside the `build()` method creates a new `Future` on every widget rebuild, causing repeated redundant network requests and an infinite refetch loop when the widget rebuilds.
  - C) `ListView` cannot be returned inside a `FutureBuilder` builder.
  - D) The code fails to compile because `snapshot.data` must be checked before `snapshot.hasData`.
- **Correct Answer:** **B**
- **Professor's Rationale:** The `build()` method is called frequently by the Flutter framework (on keyboard appearance, screen rotation, parent rebuilds, or animation frames). Placing `future: getNews()` directly in `build()` creates a new `Future` every time. When that Future resolves, `FutureBuilder` triggers a rebuild, which calls `build()`, creating *another* Future, triggering an infinite network storm! The Future must be initialized once in `initState()` and assigned to a member variable.
- **Trap / Distractor Analysis:** This is Prof. Bouchrika's signature trap. Students who only test happy-path rendering miss the infinite rebuild lifecycle hazard.

---

### Q-06: `setState()` Inside `FutureBuilder` Builder
- **ID:** `Q-06`
- **Source:** `mobile.pdf`, Page 6
- **Curriculum Level:** Level 8 (Asynchronous Flutter & Data Integration)
- **Question:** What occurs if a developer calls `setState(() { ... })` synchronously inside the `builder` callback function of a `FutureBuilder`?
- **Options:**
  - A) The widget re-renders smoothly with the newly updated state.
  - B) Flutter ignores the `setState` call without warning.
  - C) Flutter throws a runtime framework exception: `setState() or markNeedsBuild() called during build`.
  - D) The application terminates immediately with an unhandled `OutOfMemoryError`.
- **Correct Answer:** **C**
- **Professor's Rationale:** In Flutter, the framework is in the middle of executing the layout/build phase when running the `builder` callback. Calling `setState()` requests the framework to mark the widget element as dirty and schedule a new build pass while the current build pass is already executing, violating the framework contract.
- **Trap / Distractor Analysis:** Many students assume `setState` can be called anywhere in Flutter without restriction.

---

### Q-07: Architectural Benefit of Repository Pattern
- **ID:** `Q-07`
- **Source:** `mobile.pdf`, Page 7
- **Curriculum Level:** Level 4 (Software Design Patterns)
- **Question:** In mobile software architecture, what is the primary advantage of employing the Repository Pattern (e.g. `NewsRepository` with `NewsDummyRepository` and `NewsBackendRepository`)?
- **Options:**
  - A) It speeds up the CPU compilation time of Dart code.
  - B) It decouples the UI layer from the data source, allowing the backend or mock data source to be swapped without modifying the UI layer, and enables straightforward unit testing with mock implementations.
  - C) It guarantees that all network requests bypass the device's internet connection.
  - D) It eliminates the need for `StatelessWidget` and `StatefulWidget`.
- **Correct Answer:** **B**
- **Professor's Rationale:** The Repository Pattern provides an abstraction boundary between the data layer and presentation. The UI interacts only with the abstract contract (`AbstractNewsRepo`). During development or testing, a dummy repo (`NewsDummy`) is injected; in production, `NewsBackend` is injected. The UI requires zero changes.
- **Trap / Distractor Analysis:** Distractors A and D are nonsensical architectural claims designed to catch unprepared students.

---

### Q-08: SharedPreferences Serialization Anti-Pattern
- **ID:** `Q-08`
- **Source:** `mobile.pdf`, Page 8
- **Curriculum Level:** Level 7 (Navigation, Forms & Persistence)
- **Question:** A student attempts to persist a list of user maps to `SharedPreferences` using the following code:
  ```dart
  List<Map<String, dynamic>> userList = [{'name': 'Ali', 'score': 95}];
  prefs.setString('users', userList.toString());
  ```
  What problem occurs when the student later attempts to read and decode this data using `json.decode(prefs.getString('users')!)`?
- **Options:**
  - A) The data saves and decodes successfully without issues.
  - B) `userList.toString()` outputs Dart's human-readable string representation (using single quotes and unquoted keys), which is NOT valid JSON format, causing `json.decode` to throw a `FormatException`.
  - C) `prefs.setString` automatically converts any object to JSON, so no issue occurs.
  - D) `SharedPreferences` deletes the key immediately because lists cannot be converted to strings.
- **Correct Answer:** **B**
- **Professor's Rationale:** In Dart, calling `.toString()` on a `Map` produces `{name: Ali, score: 95}`, which violates JSON specifications (keys must be double-quoted strings). Standard JSON parsers reject this. The developer must use `json.encode(userList)` from `dart:convert`.
- **Trap / Distractor Analysis:** This is an authentic student bug seen repeatedly in lab sessions.

---

### Q-09: Singleton In-Memory Guarantee
- **ID:** `Q-09`
- **Source:** `mobile.pdf`, Page 9
- **Curriculum Level:** Level 4 (Software Design Patterns)
- **Question:** If a class `CounterStore` is properly implemented as a Singleton in Dart, what is guaranteed when `CounterStore()` is invoked from two separate screens in the app?
- **Options:**
  - A) Two distinct objects are allocated with separate counters.
  - B) Both screens receive a reference to the exact same cached instance in memory, sharing the identical counter state.
  - C) The second screen call throws a `DuplicateInstanceException`.
  - D) The first instance is deleted and garbage collected to make room for the second.
- **Correct Answer:** **B**
- **Professor's Rationale:** A Dart singleton uses a factory constructor returning a private static instance (`factory CounterStore() => _instance;`). Every invocation evaluates to the same reference in the VM heap.
- **Trap / Distractor Analysis:** Distractor C reflects Java-style singletons that throw exceptions if re-instantiated without factory methods.

---

### Q-10: Separation of Concerns in Button Callbacks
- **ID:** `Q-10`
- **Source:** `mobile.pdf`, Page 10
- **Curriculum Level:** Level 7 (Navigation, Forms & Persistence)
- **Question:** Why does Prof. Bouchrika strongly advise against writing raw HTTP requests, file I/O, and complex database transactions directly inside a button's `onPressed` callback?
- **Options:**
  - A) Flutter's compiler refuses to compile anonymous functions containing more than 3 lines of code.
  - B) Mixing business and storage logic directly inside presentation code violates Separation of Concerns, makes the logic untestable by unit tests, prevents code reuse across screens, and clutters the UI widget tree.
  - C) The `onPressed` callback cannot be marked `async`.
  - D) Running async code in `onPressed` automatically crashes the Flutter engine.
- **Correct Answer:** **B**
- **Professor's Rationale:** The presentation layer should only handle user interactions and render state. Mixing domain logic and I/O into UI event handlers prevents headless unit testing and creates spaghetti code.
- **Trap / Distractor Analysis:** Distractor C is false; `onPressed` can easily take an `async () async { ... }` closure.

---

### Q-11: State Initialization Inside `build()`
- **ID:** `Q-11`
- **Source:** `mobile.pdf`, Page 11
- **Curriculum Level:** Level 6 (Stateful Widgets & Interactivity)
- **Question:** In a two-player game widget, the developer writes:
  ```dart
  class _GameState extends State<GameScreen> {
    @override
    Widget build(BuildContext context) {
      int activePlayer = Random().nextInt(2); // 0 or 1
      return Scaffold(
        body: Center(child: Text('Player $activePlayer turn')),
      );
    }
  }
  ```
  What bug does this produce?
- **Options:**
  - A) The game works properly because `activePlayer` is randomly chosen.
  - B) Every time the widget rebuilds (e.g. on orientation change or any `setState`), `activePlayer` is re-randomized, causing the current turn to randomly switch unpredictably.
  - C) `Random()` cannot be called inside a Flutter class.
  - D) `Text` widget cannot interpolate integer variables.
- **Correct Answer:** **B**
- **Professor's Rationale:** The `build()` method must remain pure and idempotent. Any variable declared or initialized inside `build()` is recreated every time Flutter repaints the widget. One-time initialization must happen in `initState()`.
- **Trap / Distractor Analysis:** Distractor A tempts students who only think about the initial screen load and forget about the reactive lifecycle.

---

### Q-12: The Hardcoded Switch Property
- **ID:** `Q-12`
- **Source:** `mobile.pdf`, Page 12
- **Curriculum Level:** Level 6 (Stateful Widgets & Interactivity)
- **Question:** Consider the following snippet:
  ```dart
  bool isNotificationsEnabled = false;

  Switch(
    value: false,
    onChanged: (bool newValue) {
      setState(() {
        isNotificationsEnabled = newValue;
      });
    },
  )
  ```
  What behavior will the user observe when tapping this `Switch` widget?
- **Options:**
  - A) The switch toggles smoothly between ON and OFF states.
  - B) The switch animates momentarily but immediately snaps back to OFF, never visually changing state.
  - C) The app crashes with an invalid property error.
  - D) The switch permanently disables itself after one tap.
- **Correct Answer:** **B**
- **Professor's Rationale:** The `Switch` widget is controlled: its visual state reflects the `value` property passed into it. Because `value: false` is hardcoded instead of being bound to `value: isNotificationsEnabled`, even though `setState` runs and mutates `isNotificationsEnabled`, Flutter rebuilds the `Switch` with `value: false`, leaving it visually off!
- **Trap / Distractor Analysis:** A classic Flutter declarative UI trap. Students expect the widget to hold its own internal visual state independently.

---

### Q-13: Omitting `setState()` During Mutation
- **ID:** `Q-13`
- **Source:** `mobile.pdf`, Page 13
- **Curriculum Level:** Level 6 (Stateful Widgets & Interactivity)
- **Question:** A developer has an integer `int counter = 0;` in a `StatefulWidget`. In a button callback, they write:
  ```dart
  onPressed: () {
    counter++;
  }
  ```
  What happens to the application when the button is clicked?
- **Options:**
  - A) The text displaying `counter` on screen increments immediately.
  - B) `counter` is incremented in memory, but Flutter does not schedule a build pass, so the screen continues displaying the old value until some other event triggers a rebuild.
  - C) The Dart VM throws a `StateMutationException`.
  - D) The button automatically disables itself.
- **Correct Answer:** **B**
- **Professor's Rationale:** In Flutter, the framework does not watch plain variables for changes. Mutating a field in memory does not notify the framework. Wrapping the mutation in `setState(() { counter++; })` marks the `Element` dirty and schedules a frame repaint.
- **Trap / Distractor Analysis:** Novices often assume variables are automatically reactive like in Vue or Svelte.

---

### Q-14: Navigation Stack Clearing
- **ID:** `Q-14`
- **Source:** `mobile.pdf`, Page 14
- **Curriculum Level:** Level 7 (Navigation, Forms & Persistence)
- **Question:** When logging out a user, which `Navigator` method should be called to navigate to `/login` and prevent the user from pressing the device back button to return to protected screens?
- **Options:**
  - A) `Navigator.push(context, '/login')`
  - B) `Navigator.pop(context)`
  - C) `Navigator.pushAndRemoveUntil(context, MaterialPageRoute(builder: (c) => LoginScreen()), (Route<dynamic> route) => false)`
  - D) `Navigator.replace(context, '/login')`
- **Correct Answer:** **C**
- **Professor's Rationale:** Passing a predicate `(route) => false` instructs the navigator to pop and remove every single route in the history stack until none remain, leaving only the newly pushed route.
- **Trap / Distractor Analysis:** `pushReplacement` only replaces the topmost route, leaving prior screens accessible on back navigation.

---

### Q-15: Awaiting `Navigator.push` Return Values
- **ID:** `Q-15`
- **Source:** `mobile.pdf`, Page 15
- **Curriculum Level:** Level 7 (Navigation, Forms & Persistence)
- **Question:** In Screen A, a developer writes:
  ```dart
  final selectedOption = await Navigator.push(
    context,
    MaterialPageRoute(builder: (context) => SelectionScreen()),
  );
  ```
  How can `SelectionScreen` send a value back to Screen A?
- **Options:**
  - A) By saving the value in a global static variable.
  - B) By calling `Navigator.pop(context, 'chosen_value');`.
  - C) By invoking `Navigator.returnData(context, 'chosen_value');`.
  - D) By calling `Navigator.push(context, ScreenA(data: 'chosen_value'));`.
- **Correct Answer:** **B**
- **Professor's Rationale:** `Navigator.push` returns a `Future<T?>` that completes when the pushed route is popped. The optional second parameter of `Navigator.pop(context, result)` delivers that result back to the awaiting caller.
- **Trap / Distractor Analysis:** Distractor D causes infinite stack growth by pushing a duplicate Screen A on top.

---

### Q-16: OOP Polymorphic Reference vs Subclass Methods
- **ID:** `Q-16`
- **Source:** `mobile.pdf`, Page 16
- **Curriculum Level:** Level 3 (Object-Oriented Dart)
- **Question:** Consider the following Dart code:
  ```dart
  class Animal {
    void makeSound() => print('Animal sound');
  }

  class Dog extends Animal {
    void fetch() => print('Fetching ball');
  }

  void main() {
    Animal pet = Dog();
    pet.fetch();
  }
  ```
  What is the result of attempting to compile and run this code?
- **Options:**
  - A) It compiles and prints `"Fetching ball"`.
  - B) It produces a compilation error because the static type of `pet` is `Animal`, which does not declare the method `fetch()`.
  - C) It compiles cleanly but throws an `AbstractMethodError` at runtime.
  - D) It prints `"Animal sound"`.
- **Correct Answer:** **B**
- **Professor's Rationale:** Dart enforces static type checking. Even though the runtime object in memory is an instance of `Dog`, the variable `pet` is typed as `Animal`. The compiler only allows invocations of methods defined on the declared static type. To call `fetch()`, the developer must cast `(pet as Dog).fetch()`.
- **Trap / Distractor Analysis:** Students accustomed to dynamically typed languages (Python, JavaScript) expect method lookup to succeed based on the runtime instance.

---

### Q-17: Implicit Interfaces via `implements`
- **ID:** `Q-17`
- **Source:** `mobile.pdf`, Page 17
- **Curriculum Level:** Level 3 (Object-Oriented Dart)
- **Question:** In Dart, every class implicitly defines an interface. What is required when `class B implements A`?
- **Options:**
  - A) `B` only needs to implement abstract methods defined in `A`.
  - B) `B` inherits all concrete method implementations from `A` automatically.
  - C) `B` must provide implementations for ALL methods, getters, and setters declared in `A`, including those that had concrete implementations in `A`.
  - D) `B` cannot declare any constructors.
- **Correct Answer:** **C**
- **Professor's Rationale:** Unlike `extends`, which inherits code, `implements` treats `A` strictly as an interface contract. Dart's implicit interface includes every single member (methods, fields, getters, setters). The implementing class receives zero implementation code and must define all of them.
- **Trap / Distractor Analysis:** Distractor B describes `extends`, not `implements`.

---

### Q-18: Dart Covariant Generics
- **ID:** `Q-18`
- **Source:** `mobile.pdf`, Page 18
- **Curriculum Level:** Level 3 (Object-Oriented Dart)
- **Question:** In Dart, generic types are covariant. What does this mean for the assignment:
  ```dart
  List<Object> items = <int>[1, 2, 3];
  ```
- **Options:**
  - A) The code fails to compile because `List<int>` is invariant with `List<Object>`.
  - B) The assignment compiles successfully because `int` is a subtype of `Object`, making `List<int>` a subtype of `List<Object>`. However, attempting to call `items.add("text")` will throw a runtime `TypeError`.
  - C) The code compiles and allows any object to be added without runtime errors.
  - D) Generics only work with primitive types in Dart.
- **Correct Answer:** **B**
- **Professor's Rationale:** Dart's type system treats generic types as covariant by default. While this provides flexibility, it can lead to runtime unsoundness if a caller attempts to write an incompatible type into a covariant container.
- **Trap / Distractor Analysis:** Distractor A describes Java/C#'s default invariant generic behavior.

---

### Q-19: Instance Access to Static Members
- **ID:** `Q-19`
- **Source:** `mobile.pdf`, Page 19
- **Curriculum Level:** Level 3 (Object-Oriented Dart)
- **Question:** Given the following class:
  ```dart
  class Student {
    static int count = 0;
    String name;
    Student(this.name) {
      count++;
    }
  }

  void main() {
    Student sara = Student('Sara');
    print(sara.count);
  }
  ```
  What is the output when running this program?
- **Options:**
  - A) It prints `1`.
  - B) It prints `0`.
  - C) It fails to compile with an error: `"The getter 'count' isn't defined for the type 'Student'"`.
  - D) It throws a `NoSuchMethodError` at runtime.
- **Correct Answer:** **C**
- **Professor's Rationale:** In Dart, static members can ONLY be accessed through the class identifier (`Student.count`). Unlike Java or C++, Dart explicitly forbids accessing static members through an instance variable.
- **Trap / Distractor Analysis:** This is one of Prof. Bouchrika's absolute favorite exam questions. Students from a Java or C++ background almost always select A.

---

### Q-20: Integer Division vs Floating-Point Division
- **ID:** `Q-20`
- **Source:** `mobile.pdf`, Page 20
- **Curriculum Level:** Level 1 (Dart Foundations)
- **Question:** What is the result and type of evaluating `7 / 2` versus `7 ~/ 2` in Dart?
- **Options:**
  - A) Both evaluate to integer `3`.
  - B) `7 / 2` evaluates to `3.5` (double), while `7 ~/ 2` evaluates to `3` (int).
  - C) `7 / 2` causes a compilation error because division must use `~/`.
  - D) `7 ~/ 2` rounds to the nearest even number (`4`).
- **Correct Answer:** **B**
- **Professor's Rationale:** In Dart, `/` is the standard division operator and always returns a `double`. The `~/` operator performs truncating integer division, discarding fractional parts and returning an `int`.
- **Trap / Distractor Analysis:** In C, C++, and Java, integer division `7 / 2` evaluates to `3`. In Dart, it evaluates to `3.5`.

---

### Q-21: `final` vs `const` List Mutation
- **ID:** `Q-21`
- **Source:** `mobile.pdf`, Page 21
- **Curriculum Level:** Level 1 (Dart Foundations)
- **Question:** Consider the following two lines of code executed independently:
  ```dart
  // Case 1
  final List<int> list1 = [1, 2];
  list1.add(3);

  // Case 2
  const List<int> list2 = [1, 2];
  list2.add(3);
  ```
  What occurs in each case?
- **Options:**
  - A) Both cases succeed and append `3`.
  - B) Case 1 succeeds; Case 2 throws an `Unsupported operation: Cannot add to an unmodifiable list` exception at runtime.
  - C) Both cases produce compilation errors because `final` and `const` variables cannot be modified.
  - D) Case 1 fails to compile; Case 2 succeeds.
- **Correct Answer:** **B**
- **Professor's Rationale:** `final` means the variable binding cannot be reassigned to a new list reference (`list1 = [5]` fails), but the list object itself in memory remains mutable. `const` creates a compile-time constant object that is deeply immutable; calling mutating methods on it compiles (since `List` defines `add`), but throws at runtime!
- **Trap / Distractor Analysis:** Students confuse shallow variable rebinding with deep object immutability.

---

### Q-22: `late` Initialization Error
- **ID:** `Q-22`
- **Source:** `mobile.pdf`, Page 22
- **Curriculum Level:** Level 1 (Dart Foundations)
- **Question:** What happens when the following Dart code executes?
  ```dart
  late String title;
  print(title);
  ```
- **Options:**
  - A) It prints `null`.
  - B) It prints an empty string `""`.
  - C) It produces a compilation error: `"Variable title must be initialized"`.
  - D) It compiles without errors, but throws a `LateInitializationError` at runtime when `title` is accessed.
- **Correct Answer:** **D**
- **Professor's Rationale:** The `late` keyword instructs the Dart compiler to bypass compile-time definite assignment checks, promising that the variable will be initialized before its first read. If it is read before assignment, the Dart runtime catches the contract breach and throws `LateInitializationError: Field 'title' has not been initialized`.
- **Trap / Distractor Analysis:** Students confuse non-nullable `late` with nullable types (`String?`), expecting `null`.

---

### Q-23: `TextField` vs `TextFormField` in Forms
- **ID:** `Q-23`
- **Source:** `mobile.pdf`, Page 23
- **Curriculum Level:** Level 7 (Navigation, Forms & Persistence)
- **Question:** A developer places a standard `TextField` inside a `Form` widget and supplies a `validator:` parameter. Why does form validation fail to work?
- **Options:**
  - A) `TextField` does not have a `validator` property and does not interact with `FormState`. The developer must use `TextFormField`.
  - B) `Form` only accepts `ElevatedButton` widgets.
  - C) The `TextField` must have its `obscureText` property set to `true`.
  - D) `TextField` requires a `GlobalKey` for each individual character typed.
- **Correct Answer:** **A**
- **Professor's Rationale:** `TextField` is a low-level text input widget. `TextFormField` is a convenience wrapper that integrates a `TextField` into Flutter's `FormField` architecture, exposing `validator`, `onSaved`, and automatic integration with `FormState`.
- **Trap / Distractor Analysis:** A very common beginner mistake that leads to confusion when `_formKey.currentState!.validate()` does nothing.

---

### Q-24: Periodic Timer Lifecycle Leak
- **ID:** `Q-24`
- **Source:** `mobile.pdf`, Page 24
- **Curriculum Level:** Level 8 (Asynchronous Flutter & Data Integration)
- **Question:** A developer initiates a `Timer.periodic` inside `initState()` of a `StatefulWidget` to poll a server every 5 seconds. What happens if they forget to cancel the timer in the `dispose()` method when the user navigates away from the screen?
- **Options:**
  - A) Flutter automatically cancels all active timers when a screen is popped.
  - B) The timer continues firing in the background Dart event loop, wasting CPU/network resources and triggering `setState()` on an unmounted widget, causing runtime exceptions and memory leaks.
  - C) The app crashes immediately upon calling `Navigator.pop()`.
  - D) The timer pauses and resumes when the screen is revisited.
- **Correct Answer:** **B**
- **Professor's Rationale:** Timers belong to the Dart runtime event loop, not the Flutter widget tree. Popping a widget destroys the widget element, but does NOT stop independent event loop timers. If the timer callback invokes `setState()`, Flutter throws `setState() called after dispose()`.
- **Trap / Distractor Analysis:** Many students expect the garbage collector or Flutter framework to clean up asynchronous timers automatically.

---

### Q-25: `pubspec.yaml` Asset Indentation Trap
- **ID:** `Q-25`
- **Source:** `mobile.pdf`, Page 26
- **Curriculum Level:** Level 5 (Flutter Foundations & Layouts)
- **Question:** A student adds an image to their project and updates `pubspec.yaml` as follows:
  ```yaml
  flutter:
    uses-material-design: true
  assets:
    - assets/images/logo.png
  ```
  Why does the app fail with `Unable to load asset: assets/images/logo.png`?
- **Options:**
  - A) Images must have a `.jpg` extension only.
  - B) `assets:` is improperly indented as a root key instead of being nested under the `flutter:` configuration section (2 spaces indentation).
  - C) Assets cannot be placed in subdirectories.
  - D) The image filename must be capitalized.
- **Correct Answer:** **B**
- **Professor's Rationale:** YAML is indentation-sensitive. Flutter only parses asset declarations if they are indented under the `flutter:` block:
  ```yaml
  flutter:
    uses-material-design: true
    assets:
      - assets/images/logo.png
  ```
- **Trap / Distractor Analysis:** A frequent student roadblock during initial Flutter lab setups.

---

### Q-26: The Cascade Operator Return Value
- **ID:** `Q-26`
- **Source:** `mobile.pdf`, Page 27
- **Curriculum Level:** Level 1 (Dart Foundations)
- **Question:** What does the cascade operator (`..`) return when chained to an object expression?
- **Options:**
  - A) It returns the value returned by the last method called in the chain.
  - B) It returns `void`.
  - C) It returns the original receiver object itself, allowing successive operations on the same instance.
  - D) It returns a boolean indicating whether all chained operations succeeded.
- **Correct Answer:** **C**
- **Professor's Rationale:** The cascade notation `..` allows you to perform a sequence of operations on the same object. While `querySelector('#button').text = 'Click'` evaluates to the string assigned, `querySelector('#button')..text = 'Click'..classes.add('btn')` evaluates to the receiver (`#button`).
- **Trap / Distractor Analysis:** Students often confuse cascade notation with fluent interfaces where methods return `this`.

---

## 3. Complete Catalog of Original Labs & Challenges (`[ORIGINAL_LAB]`)

The 14 labs and 3 challenges extracted from `Docs/mobile.pdf` (pp. 25, 28–41):

---

### LAB-01: Simple Functions & TDD (Functions and Binary Conversion)
- **ID:** `LAB-01`
- **Source:** `mobile.pdf`, Page 28
- **Curriculum Level:** Level 2 (Test-Driven Development)
- **Estimated Duration:** 60 Minutes
- **Objective:** Implement pure utility functions in `lib/functions.dart` validated against `test/functions_test.dart` using Red-Green-Refactor.
- **Requirements:**
  1. `bool isPalindrome(String input)`: Returns `true` if input reads identically backwards and forwards, ignoring case and whitespace.
  2. `String decimalTobinary(int input)`: Returns the binary representation of a non-negative decimal integer as a string (e.g. `10 -> "1010"`, `0 -> "0"`).
- **Test Suite Specification:**
  ```dart
  test('isPalindrome handles simple palindromes', () {
    expect(isPalindrome('radar'), isTrue);
    expect(isPalindrome('hello'), isFalse);
  });
  test('decimalTobinary converts integers accurately', () {
    expect(decimalTobinary(10), equals('1010'));
    expect(decimalTobinary(0), equals('0'));
    expect(decimalTobinary(255), equals('11111111'));
  });
  ```

---

### LAB-02: Loops, Logic & String Processing
- **ID:** `LAB-02`
- **Source:** `mobile.pdf`, Page 29
- **Curriculum Level:** Level 1 (Dart Foundations)
- **Estimated Duration:** 45 Minutes
- **Objective:** Practice algorithmic control flow without high-level library shortcuts.
- **Requirements:**
  1. Factorial calculation using a manual `for` loop; handle edge cases `0! = 1`.
  2. Capitalize the first letter of each word in a string without using external helper libraries.
  3. Detect whether a string contains an isolated `"00"` substring.

---

### LAB-03: Mastering OOP in Dart (`class Phrase`)
- **ID:** `LAB-03`
- **Source:** `mobile.pdf`, Page 30
- **Curriculum Level:** Level 3 (Object-Oriented Dart)
- **Estimated Duration:** 45 Minutes
- **Objective:** Implement an encapsulated domain model class with constructors, getters, and unit test validation.
- **Requirements:**
  1. Class `Phrase` with private field `String _text`.
  2. Standard constructor `Phrase(this._text);`.
  3. Named constructor `Phrase.empty() : _text = '';`.
  4. Getter `String get text => _text;`.
  5. Getter `bool get isPalindrome`: Analyzes `_text`.
  6. Getter `String get capitalized`: Returns title-cased string.
  7. `@override String toString() => _text;`.

---

### LAB-04: The Singleton Design Pattern (`CounterStore`)
- **ID:** `LAB-04`
- **Source:** `mobile.pdf`, Page 31
- **Curriculum Level:** Level 4 (Software Design Patterns)
- **Estimated Duration:** 45 Minutes
- **Objective:** Implement a thread-safe in-memory state store adhering to the Singleton pattern.
- **Requirements:**
  1. Private constructor `CounterStore._internal();`.
  2. Static cached instance `static final CounterStore _instance = CounterStore._internal();`.
  3. Factory constructor `factory CounterStore() => _instance;`.
  4. Public methods `increment()`, `decrement()`, getter `int get count`.
  5. Verify that `identical(CounterStore(), CounterStore())` is `true`.

---

### LAB-05: The Repository Design Pattern
- **ID:** `LAB-05`
- **Source:** `mobile.pdf`, Page 32
- **Curriculum Level:** Level 4 (Software Design Patterns)
- **Estimated Duration:** 60 Minutes
- **Objective:** Implement an abstract data layer decoupling business models from storage engines.
- **Requirements:**
  1. `abstract class CounterRepository { Future<int> loadCount(); Future<void> saveCount(int count); }`.
  2. `class JsonCounterRepository implements CounterRepository`: Persists count as JSON.
  3. `class MemoryCounterRepository implements CounterRepository`: Mock in-memory storage for unit testing.
  4. Write unit tests proving the repository consumer functions identically regardless of storage engine.

---

### LAB-06: Static Login Screen Widget Tree
- **ID:** `LAB-06`
- **Source:** `mobile.pdf`, Page 33
- **Curriculum Level:** Level 5 (Flutter Foundations & Layouts)
- **Estimated Duration:** 45 Minutes
- **Objective:** Build a pixel-accurate static login interface ("TutorialKart") matching provided wireframe.
- **Requirements:**
  1. `AppBar` with title and custom background color.
  2. Centered logo/header text with 24pt bold typography.
  3. Two input fields (`UserName` and `Password`) with outline borders.
  4. "Forgot Password" flat text button aligned right.
  5. Full-width blue `ElevatedButton` for "Login".
  6. Row with "Does not have account?" text and "Sign in" link.

---

### LAB-07: Stateless Tic-Tac-Toe Board
- **ID:** `LAB-07`
- **Source:** `mobile.pdf`, Page 34
- **Curriculum Level:** Level 5 (Flutter Foundations & Layouts)
- **Estimated Duration:** 45 Minutes
- **Objective:** Recreate a 3x3 game board UI using clean nested loops and layout widgets without state.
- **Requirements:**
  1. `StatelessWidget` building 9 uniform grid cells.
  2. Use nested `Row` and `Column` widgets or `GridView`.
  3. Uniform padding, borders between cells, and responsive sizing.

---

### LAB-08: Complex Pricing Screen
- **ID:** `LAB-08`
- **Source:** `mobile.pdf`, Page 35
- **Curriculum Level:** Level 5 (Flutter Foundations & Layouts)
- **Estimated Duration:** 60 Minutes
- **Objective:** Implement a multi-card pricing tier screen with badges and borders.
- **Requirements:**
  1. 4 pricing tiers: Basic ($14/mo), Free ($0/mo), Open Source ($0), Enterprise ($199/mo).
  2. Distinct visual styling for recommended plan (highlighted border, badge).
  3. Feature checkmark lists inside each card.

---

### LAB-09: Interactive Palindrome App
- **ID:** `LAB-09`
- **Source:** `mobile.pdf`, Page 36
- **Curriculum Level:** Level 6 (Stateful Widgets & Interactivity)
- **Estimated Duration:** 45 Minutes
- **Objective:** Build an interactive Flutter app that performs real-time string analysis as the user types.
- **Requirements:**
  1. `StatefulWidget` with `TextEditingController`.
  2. Input field with label "Enter word or phrase".
  3. Live preview displaying the reversed string.
  4. Dynamic status chip: Green "Palindrome" or Grey "Not a Palindrome".
  5. Clear button resetting the field and state.

---

### LAB-10: Role-Based Navigation & Route Guards
- **ID:** `LAB-10`
- **Source:** `mobile.pdf`, Page 37
- **Curriculum Level:** Level 7 (Navigation, Forms & Persistence)
- **Estimated Duration:** 60 Minutes
- **Objective:** Implement credential-based screen redirection with snackbar feedback.
- **Requirements:**
  1. Login screen with role selector (`student` or `teacher`).
  2. Valid credentials navigate to `StudentDashboard` or `TeacherDashboard`.
  3. Invalid credentials trigger a red `SnackBar` ("Invalid credentials").
  4. Prevent back navigation from dashboard to login using `pushReplacement`.

---

### LAB-11: Snake Game in Flutter
- **ID:** `LAB-11`
- **Source:** `mobile.pdf`, Page 38
- **Curriculum Level:** Level 6 (Stateful Widgets & Interactivity)
- **Estimated Duration:** 90 Minutes
- **Objective:** Build a complete 2D grid Snake game using `Timer.periodic`.
- **Requirements:**
  1. 20x20 cell coordinate grid.
  2. Snake body modeled as `List<int>` cell indices.
  3. Game tick running at 200ms intervals.
  4. Directional arrow buttons (Up, Down, Left, Right).
  5. Food item generation, collision detection with walls and self.
  6. Game Over dialog with score and restart button.

---

### LAB-12: Form Validation UI
- **ID:** `LAB-12`
- **Source:** `mobile.pdf`, Page 39
- **Curriculum Level:** Level 7 (Navigation, Forms & Persistence)
- **Estimated Duration:** 45 Minutes
- **Objective:** Implement strict client-side validation using `GlobalKey<FormState>`.
- **Requirements:**
  1. Username field: Required, minimum 4 characters, letters only (regex `^[a-zA-Z]+$`).
  2. PIN code field: Exactly 4 numeric digits.
  3. Submit button calling `_formKey.currentState!.validate()`.
  4. Success dialog displaying sanitized input on valid submission.

---

### LAB-13: Async Login Flow Without FutureBuilder
- **ID:** `LAB-13`
- **Source:** `mobile.pdf`, Page 40
- **Curriculum Level:** Level 8 (Asynchronous Flutter & Data Integration)
- **Estimated Duration:** 45 Minutes
- **Objective:** Manage asynchronous state manually using `setState` and booleans.
- **Requirements:**
  1. State variables: `bool _isLoading = false; String? _errorMessage;`.
  2. Clicking "Log In" sets `_isLoading = true` and shows `CircularProgressIndicator`.
  3. Simulate 3-second network delay with `Future.delayed`.
  4. On failure, update `_errorMessage` and show error banner.
  5. Ensure proper `mounted` check before calling `setState` after delay.

---

### LAB-14: FutureBuilder REST API Integration
- **ID:** `LAB-14`
- **Source:** `mobile.pdf`, Page 41
- **Curriculum Level:** Level 8 (Asynchronous Flutter & Data Integration)
- **Estimated Duration:** 60 Minutes
- **Objective:** Build a resilient async UI fetching JSON data via `package:http`.
- **Requirements:**
  1. Declare `Future<List<Article>>? _articlesFuture;` in State.
  2. Initialize `_articlesFuture` inside `initState()`.
  3. Implement `FutureBuilder` handling:
     - `ConnectionState.waiting`: Centered progress spinner.
     - `snapshot.hasError`: Error icon with retry button.
     - `snapshot.hasData`: `ListView.builder` displaying article cards.
  4. Wrap in `RefreshIndicator` allowing pull-to-refresh without memory leaks.

---

### CHAL-01: Rock-Paper-Scissors Interactive Game
- **ID:** `CHAL-01`
- **Source:** `mobile.pdf`, Page 25
- **Curriculum Level:** Level 6 (Stateful Widgets & Interactivity)
- **Requirements:** Interactive game against CPU; first to 3 points wins; state tracks player score, computer score, choices, and winner; Reset modal.

---

### CHAL-02: Dynamic Item Collection Screen
- **ID:** `CHAL-02`
- **Source:** `mobile.pdf`, Page 25
- **Curriculum Level:** Level 6 (Stateful Widgets & Interactivity)
- **Requirements:** `TextField` with "Add" button; validates input (rejects empty or whitespace strings); adds item to dynamic list; shows dynamic item count badge; item delete action.

---

### CHAL-03: Shopping Cart Widget Tree Recreation
- **ID:** `CHAL-03`
- **Source:** `mobile.pdf`, Page 25
- **Curriculum Level:** Level 5 (Flutter Foundations & Layouts)
- **Requirements:** Pixel-accurate replication of "My Cart" screen: Notebook ($250 DA), Pen Pack ($120 DA), Backpack ($3500 DA), Calculator ($1500 DA). Stepper quantity buttons, dynamic total DA calculation, and checkout button.

---

## 4. Lecture-Derived Practice Catalog (`[LECTURE_CORE]`)

The following 10 representative problems are drawn directly from code examples in `Dart_Essentials_merged.pdf`:

- **LEC-01 (L2, Slide 25):** Growable vs Fixed-Length List behavior (`List.filled(3, 0)` throwing on `add()`).
- **LEC-02 (L2, Slide 30):** Map iteration and checking keys using `containsKey` vs `[] == null`.
- **LEC-03 (L2, Slide 42):** Exception handling with specific `on IntegerDivisionByZeroException` blocks.
- **LEC-04 (L3, Slide 75):** `const` constructors and object identity using `identical()`.
- **LEC-05 (L3, Slide 92):** Abstract classes and method overriding constraints.
- **LEC-06 (L3, Slide 118):** Factory constructor pattern returning subtype instances (`Shape.create('circle')`).
- **LEC-07 (L4, Slide 210):** Widget tree rebuild propagation from parent to child widgets.
- **LEC-08 (L5, Slide 295):** Move Colored Square 2D grid matrix boundaries check.
- **LEC-09 (L5, Slide 310):** Water Sort Puzzle tube color stacking verification logic.
- **LEC-10 (L6, Slide 415):** The Cafeteria Buzzer metaphor: mapping `ConnectionState` to customer waiting states.

---

## 5. Specification for Synthetic Question Generation (`[SYNTHETIC_EXTENSION]`)

To scale the platform to the target **240+ MCQs** and **60+ coding challenges** required by the technical specification, additional questions must be generated following strict stylistic rules:

### Rules for Generating Authentic-Style Questions:
1. **Focus on Traps, Not Trivia:** Avoid asking for rote memorization of method names. Present a 6–10 line code snippet that looks almost correct and ask what happens (compile error, runtime error, or unexpected output).
2. **Four Plausible Distractors:**
   - One distractor must represent the "Happy Path Assumption" (what naive coders think happens).
   - One distractor must represent the "Language Cross-Contamination" (how Java/Python/C++ works).
   - One distractor must represent the "Framework Myth" (believing Flutter automatically fixes or catches the bug).
   - The correct answer must explain the exact underlying VM or framework mechanism.
3. **Distribution Target Across Levels:**
   - Level 1: 30 MCQs, 8 Challenges
   - Level 2: 25 MCQs, 6 Challenges
   - Level 3: 35 MCQs, 8 Challenges
   - Level 4: 25 MCQs, 6 Challenges
   - Level 5: 35 MCQs, 10 Challenges
   - Level 6: 35 MCQs, 10 Challenges
   - Level 7: 30 MCQs, 8 Challenges
   - Level 8: 30 MCQs, 8 Challenges
   - **Total:** 245 MCQs, 64 Challenges.
4. **Mandatory Tagging:** All generated items must carry the `provenance: "synthetic_extension"` JSON attribute and display the "Practice Extension" badge in the UI.
