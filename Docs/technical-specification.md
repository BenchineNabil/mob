# MOBILE DEV QUEST
## Technical Specification & Product Requirements Document

**Project:** Interactive Mobile Development Revision Platform  
**Subject:** Dart & Flutter  
**Frontend:** React + TypeScript  
**Target:** Personal exam preparation  
**Exam conditions:** 90 minutes, quiz + practical coding, no LLM, no cheat sheet  
**Difficulty:** Medium → Hard → Very Hard

---

# PART A — PRODUCT VISION

## 1. Product concept

Build a gamified learning website called **Mobile Dev Quest**.

The platform transforms the Mobile Development module into a progression-based learning experience.

The student starts at Level 1 and progressively unlocks harder levels. Each level teaches a set of concepts through short lessons, examples and interactive exercises.

At the end of every level, the student must win a mandatory mini-game to unlock the next level.

The objective is not to memorize lecture slides. It is to develop the ability to:
- Understand concepts deeply.
- Predict what code will do.
- Identify mistakes without running the code.
- Write Dart and Flutter code independently.
- Solve practical problems under time pressure.
- Recognize tricky exam questions.

## 2. Core learning loop

Every level must follow this sequence:

**STEP 1 — LEARN**

Teach the concepts before testing the student.

Each lesson contains:
- Simple explanation.
- Explanation of why the concept exists.
- Syntax and code examples.
- Step-by-step execution where appropriate.
- Visual diagrams when useful.
- Common mistakes.
- Exam traps.
- One or two quick understanding checks.

Do not present a wall of text. Break lessons into short, interactive sections.

**STEP 2 — PRACTICE**

Give the student smaller exercises before the main challenge.

Exercise types:
- Multiple choice.
- True or false.
- Predict the output.
- Find the bug.
- Complete missing code.
- Arrange code in the correct order.
- Match concepts.
- Write a function.
- Debug an implementation.

Provide explanations after answering.

**STEP 3 — LEVEL QUIZ**

A collection of medium-to-hard questions covering the entire level.

Include questions based on the professor's quizzes and newly generated questions following the same style.

**STEP 4 — BOSS MINI-GAME**

A mandatory interactive challenge.

The student must achieve the required score or complete the coding task successfully.

Failure means retrying the challenge, preferably with a different question variant.

Success unlocks the next level.

## 3. Progression rules

- Level 1 is unlocked by default.
- All subsequent levels are locked.
- A level becomes complete only after its mandatory mini-game is won.
- Completing lessons alone does not unlock levels.
- A student cannot skip levels by changing the URL or application state manually.
- Failed attempts do not erase previously completed levels.
- Progress survives page refreshes and browser restarts.
- Show the student's XP, completed levels, accuracy and streak.
- Provide a progress map showing locked, active and completed levels.

Recommended passing rules:

| Activity | Passing requirement |
|---|---|
| Quick practice | No mandatory score |
| Level quiz | 70% |
| Boss mini-game | 80% or explicit task completion |
| Final exam simulation | 60% overall, with separate quiz and coding scores |

Make passing thresholds configurable.

---

# PART B — CURRICULUM AND LEVEL DESIGN

## 4. Level structure

Create 8 main levels, containing at least 24 distinct mini-games.

The levels must increase in difficulty. Each should combine conceptual understanding with practical application.

### LEVEL 1 — Dart Foundations

**Difficulty:** Medium

Topics:
- Dart characteristics and static typing.
- Variables and type inference.
- `var`, `dynamic`, `final`, `const`, `late`.
- Basic data types.
- Null safety.
- `?`, `?.`, `??`, `!`.
- String interpolation and conversion.
- Lists, Sets and Maps.
- Collection methods: `where`, `map`, `any`, `every`.
- Spread operator.
- Arithmetic and logical operators.
- Functions and arrow functions.
- Named and optional parameters.
- Anonymous functions and callbacks.
- Conditions and loops.
- Exceptions and input/output.

Mini-games:

**1. Type Detective**

Show several Dart declarations and assignments. The player must identify the inferred type, whether the code compiles, and the reason.

**2. Null Safety Labyrinth**

Navigate through a series of null-safety expressions. Select the correct output or identify the runtime failure.

**3. Collection Architect**

Transform Lists, Sets and Maps to achieve a specified result. Use operations such as `add`, `removeAt`, `where`, `map` and `containsKey`.

**4. Output Prediction Arena**

Predict the exact output of increasingly complex Dart snippets involving loops, callbacks, functions and collections.

**5. Function Repair Shop**

Repair broken functions, complete missing parameters, and fix incorrect return types.

**Boss:** Dart Survival Challenge.

A mixed challenge with 10 questions and 2 coding tasks. Include type inference, null safety, collections and functions.

### LEVEL 2 — Test Driven Development

**Difficulty:** Medium–Hard

Topics:
- Test Driven Development.
- Red, Green, Refactor.
- Test package setup.
- Test file naming (`_test.dart`).
- `group()`, `test()`, `expect()`.
- Matchers.
- Testing edge cases.
- False confidence and satisfying tests instead of requirements.
- Project structure: `bin`, `lib`, `test`.
- Clean code and naming principles.
- DRY, KISS and SOLID at the level introduced in the lecture.
- Logging with the Logger package.

Mini-games:

**6. Red-Green-Refactor**

Arrange TDD steps in the correct order. Given a failed test, choose the next implementation step.

**7. Test Architect**

Build a test suite by selecting appropriate test cases and matchers for a function.

**8. Bug Hunter: False Confidence**

Identify missing edge cases in an apparently correct test suite.

**Boss:** Test-First Mission.

Implement a function and design its tests. The student must satisfy supplied tests without overengineering the solution.

### LEVEL 3 — Object-Oriented Dart

**Difficulty:** Hard

Topics:
- Classes and objects.
- Fields and methods.
- Constructors.
- Named constructors.
- Const constructors.
- Named arguments.
- Private fields.
- Getters and setters.
- Static fields and methods.
- `toString()` and `@override`.
- Dot and cascade operators.
- Inheritance and `super`.
- Abstract classes.
- `extends` versus `implements`.
- Generics.
- Mixins.

Mini-games:

**9. Class Builder**

Construct classes by arranging fields, constructors and methods. Validate the result against requirements.

**10. Inheritance Battle**

Predict which method executes and identify compile-time errors based on declared and runtime types.

**11. Constructor Puzzle**

Choose the appropriate constructor, initializer list and named arguments to satisfy a class specification.

**12. Interface vs Inheritance**

Decide between `extends` and `implements`, then complete missing methods.

**13. Generic Type Arena**

Solve type compatibility problems involving `Box<T>` and other generic classes.

**Boss:** OOP Architecture Challenge.

Build a small class structure from requirements. Include inheritance, abstraction, constructors and encapsulation.

### LEVEL 4 — Design Patterns

**Difficulty:** Hard

Topics:
- Why design patterns exist.
- Abstraction.
- Factory pattern.
- Dart factory constructors.
- Singleton pattern.
- Repository pattern.
- Observer pattern.
- Publish-Subscribe pattern.
- Coupling and separation of concerns.
- Business logic versus data source.

Mini-games:

**14. Pattern Detective**

Given a real programming problem, identify the suitable design pattern and explain why.

**15. Singleton Trap**

Analyze object creation and predict whether two references point to the same instance.

**16. Repository Architect**

Separate business logic from the concrete data source. Build a repository abstraction and choose between dummy and backend implementations.

**17. Observer vs Publisher**

Simulate event delivery and distinguish direct observer notification from broker-based Publish-Subscribe.

**Boss:** Architecture Rescue.

Repair a badly structured application by applying Factory, Singleton and Repository concepts.

### LEVEL 5 — Flutter Foundations

**Difficulty:** Medium–Hard

Topics:
- What Flutter is.
- Flutter advantages and cross-platform development.
- Flutter project creation and structure.
- `main()` and `runApp()`.
- `MaterialApp` and `CupertinoApp`.
- Widget trees.
- `Scaffold`, `AppBar` and basic widgets.
- `Text`, `Container`, `Card`, `ListTile`.
- `Row`, `Column`, `Center`.
- `SizedBox`, `Spacer`, `Expanded`.
- `Stack` and `Positioned`.
- Images and assets.
- `ListView`.
- TextField and controllers.
- ElevatedButton.
- Hot reload.
- `pubspec.yaml` and packages.

Mini-games:

**18. Widget Tree Architect**

Reconstruct a widget tree from a screenshot or a description of the interface.

**19. Layout Master**

Choose and arrange widgets to satisfy layout requirements.

**20. Flutter UI Detective**

Identify which widget or property should be used for a given visual requirement.

**21. Project Structure Challenge**

Place files, assets and dependencies in their correct locations.

**Boss:** Build the Screen.

Reconstruct a small interface from a visual reference using the correct widget hierarchy.

### LEVEL 6 — Stateful Widgets and Interactivity

**Difficulty:** Hard

Topics:
- StatelessWidget versus StatefulWidget.
- State class.
- `initState()`.
- `build()`.
- `setState()`.
- Widget properties versus State variables.
- Updating UI after data changes.
- Event callbacks.
- Lists and dynamic UI.
- Game logic.
- Tic-Tac-Toe.
- To-do applications.
- Water Sort puzzle logic.
- Widget lifecycle fundamentals.

Mini-games:

**22. State Mutation**

Predict what happens when a variable changes with or without `setState()`.

**23. Tic-Tac-Toe Logic Lab**

Complete the game logic, validate moves, switch turns and detect a winner.

**24. To-Do State Manager**

Implement task addition, deletion and completion while maintaining consistent UI state.

**25. Water Sort Logic Puzzle**

Move elements between containers while respecting the game's rules.

**26. Rebuild or Not?**

Identify which interactions cause rebuilding and which changes do not automatically update the UI.

**Boss:** Stateful Application Challenge.

Build a functional interactive application with multiple state variables and user interactions.

### LEVEL 7 — Navigation, Forms and Data Persistence

**Difficulty:** Hard

Topics:
- Navigation stack.
- `Navigator.push()`.
- `Navigator.pop()`.
- `pushNamed()`.
- `pushReplacement()`.
- `pushAndRemoveUntil()`.
- Named routes.
- `onGenerateRoute`.
- `MaterialPageRoute`.
- Passing data between screens.
- Constructor-based navigation.
- `ModalRoute` arguments.
- SharedPreferences.
- Assets versus runtime files.
- Local versus backend storage.
- `Form` and `GlobalKey<FormState>`.
- `TextFormField`.
- Validators and `validate()`.
- `TextEditingController`.
- Frontend and business logic validation.

Mini-games:

**27. Navigation Maze**

Navigate through a stack of screens. Choose the correct operation for each scenario.

**28. Argument Delivery**

Pass values between screens and identify how they are accessed in StatelessWidget and StatefulWidget implementations.

**29. Storage Strategist**

Choose where different types of data belong: assets, SharedPreferences, filesystem, database or backend.

**30. Form Validation Hospital**

Repair a form with incorrect validators, missing keys and invalid submission logic.

**Boss:** Complete Login Flow.

Create a login flow with input validation, error messages, navigation and data passing.

### LEVEL 8 — Asynchronous Programming and Data Loading

**Difficulty:** Very Hard

Topics:
- Synchronous versus asynchronous execution.
- Event loop fundamentals as presented in the lecture.
- `async` and `await`.
- Future objects.
- `Future<T>` and `Future<void>`.
- Awaiting Futures.
- Execution-order prediction.
- `FutureBuilder`.
- `AsyncSnapshot`.
- `hasData`, loading and error states.
- Future initialization.
- Avoiding repeated requests during rebuilds.
- HTTP requests.
- JSON decoding.
- API repositories.
- RefreshIndicator.
- Timer.periodic.
- Cancelling timers in `dispose()`.
- Updating the UI when asynchronous data arrives.

Mini-games:

**31. Event Loop Simulator**

Place asynchronous and synchronous operations in execution order. Visualize the sequence on a timeline.

**32. Future Detective**

Predict the output of Dart code involving Future, delayed operations, async and await.

**33. FutureBuilder Repair**

Fix incorrect FutureBuilder implementations, including repeated requests and incorrect state updates.

**34. API Rescue Mission**

Build the loading, success and error states for an API request.

**35. Async Bug Hunt**

Find lifecycle problems, missing awaits, incorrect return types and timers that are not cancelled.

**Boss:** Async Data Crisis.

A combined challenge requiring the student to understand a repository, load data asynchronously, handle errors and update the interface correctly.

---

# PART C — MINI-GAME SYSTEM

## 5. General mini-game requirements

Every mini-game must be a real interactive experience, not simply a quiz with a different title.

Every game must include:

1. Game title.
2. Short instructions.
3. Concept being tested.
4. Difficulty indicator.
5. Interactive gameplay.
6. Score and progress.
7. Win condition.
8. Failure condition.
9. Explanation of mistakes.
10. Retry functionality.

Game types should include:

- Drag and drop.
- Code ordering.
- Code completion.
- Output prediction.
- Bug detection.
- Interactive simulations.
- Visual widget-tree construction.
- Timed coding.
- Pattern matching.
- Architecture puzzles.
- Multiple-choice battles.
- Small programming tasks.

Do not use one generic component for all games. Each game type should have its own gameplay mechanics.

## 6. Adaptive difficulty

Within each level:

- Start with medium questions.
- Increase difficulty after successful answers.
- Introduce combined concepts.
- Use edge cases and misleading alternatives.
- Include questions with multiple reasoning steps.

Difficulty should come from reasoning and implementation, not obscure trivia.

Incorrect answers should generate a short explanation of the underlying misunderstanding.

---

# PART D — QUIZ ENGINE

## 7. Question bank

Build a large local question bank.

Initial target:
- At least 30 questions per level.
- At least 240 questions overall.
- At least 60 coding challenges across the entire platform.
- Additional randomized variants where appropriate.

Question sources:

**A. Original questions**

Extract and adapt the questions from `mobile.pdf`.

Preserve the original question meaning, code, correct answer and explanation.

**B. Generated questions**

Generate new questions based on the lecture and the professor's style.

The generated questions must not simply change variable names. They should test the same concepts through different situations.

## 8. Supported question formats

Each question should support:

- Single-answer MCQ.
- True/False.
- Predict the output.
- Does this compile?
- Find the incorrect line.
- Explain the runtime behavior.
- Complete missing code.
- Write a function.
- Debug a code snippet.
- Widget-tree construction.
- Short coding problem.

## 9. Quiz quality rules

Every question must have:

- Unique ID.
- Level and topic.
- Difficulty.
- Question text.
- Optional Dart code.
- Answer choices when applicable.
- Correct answer.
- Detailed explanation.
- Explanation of why common wrong answers are wrong.
- Source classification: `original_quiz`, `lecture_based` or `generated`.
- Source page reference when available.
- Estimated solving time.

Never generate an answer key without validating it.

Avoid ambiguous questions. Do not silently correct the professor's lecture material. If a source contains an inconsistency, flag it for review rather than teaching a potentially incorrect interpretation.

---

# PART E — CODING ENGINE

## 10. Coding practice environment

Use Monaco Editor for the coding interface.

The student should be able to:
- Write Dart code.
- Edit provided starter code.
- Run code.
- View output.
- See compilation errors.
- Submit solutions.
- See test results.
- Retry failed challenges.

Support three coding modes:

**Mode 1: Predict**

The student reads code and writes the expected output.

**Mode 2: Complete**

The student fills in missing code.

**Mode 3: Implement**

The student writes a complete function or small program.

## 11. Dart execution architecture

Do not pretend that a React frontend can execute Dart directly.

Recommended architecture:

- React frontend with Monaco Editor.
- Node.js backend for code execution.
- Dart SDK installed in the execution environment.
- Execute code in an isolated Docker container.
- No network access from the execution container.
- CPU, memory and execution-time limits.
- Temporary files cleaned after each run.
- Test cases executed against the submitted code.

For a local personal revision website, execution can be restricted to the local machine.

If Docker or the Dart SDK is unavailable, provide a clear setup message rather than displaying fake execution results.

---

# PART F — FINAL EXAM SIMULATOR

## 12. Exam simulation

Create a separate section called **The Final Trial**.

The simulation must reproduce the real exam conditions.

**Duration: 90 minutes.**

Suggested configuration:

| Section | Time | Weight |
|---|---:|---:|
| Quiz | 40 minutes | 45% |
| Coding | 50 minutes | 55% |
| Total | 90 minutes | 100% |

Allow these weights to be configured later.

### Quiz section

Include:
- MCQs.
- True/False.
- Output prediction.
- Compilation analysis.
- Conceptual traps.
- Flutter widget questions.
- Async execution questions.

### Coding section

Include:
- Function implementation.
- Debugging.
- Code completion.
- OOP implementation.
- Flutter UI/state problems.
- Async implementation.
- Test-driven development tasks.

### Exam rules

- No lessons.
- No hints.
- No answer explanations during the exam.
- No cheat sheet.
- No external AI integration.
- No automatic code generation.
- Timer must continue while navigating between questions.
- Warn before submitting.
- Auto-submit when time expires.
- Preserve answers if the page refreshes.
- Show results only after submission.

### Results page

Show:
- Overall score.
- Quiz score.
- Coding score.
- Time used.
- Correct and incorrect answers.
- Failed test cases.
- Weak topics.
- Recommended levels to revisit.

The exam should generate a different combination of questions each attempt.

---

# PART G — UI/UX DESIGN

## 13. Design direction

The website should feel like an interactive programming game, not a university LMS.

Visual direction:
- Modern dark interface.
- Deep navy/charcoal background.
- Electric blue and violet accents.
- Clear contrast.
- Subtle gradients.
- Smooth animations.
- Code-inspired visual details.
- Distinct visual identity for each level.

Avoid excessive neon, childish cartoon styling and distracting animations.

Use a consistent design system.

## 14. Main screens

### A. Landing / Dashboard

Display:
- Welcome message.
- Overall progress.
- XP and level.
- Continue learning button.
- Level map.
- Daily challenge.
- Weakest topics.
- Recent activity.

### B. Level Map

Display all 8 levels as a visual progression path.

Each level should have:
- Title.
- Difficulty.
- Topics.
- Completion status.
- Mini-game count.
- Lock indicator.

### C. Learning Screen

Display:
- Concept title.
- Short lesson.
- Interactive code example.
- Output preview.
- Common mistakes.
- Quick understanding check.
- Next concept button.

### D. Mini-game Screen

Display:
- Game interface.
- Instructions.
- Timer where applicable.
- Score.
- Progress indicator.
- Immediate interaction feedback.

### E. Coding Arena

Display:
- Problem description.
- Monaco editor.
- Run button.
- Submit button.
- Console output.
- Test results.
- Timer.

### F. Final Trial

Display:
- Exam rules.
- 90-minute timer.
- Quiz and coding sections.
- Question navigation.
- Submission confirmation.

### G. Statistics

Display:
- Average accuracy.
- Time per question.
- Performance by topic.
- Coding success rate.
- Level completion.
- Weak areas.

---

# PART H — TECHNICAL ARCHITECTURE

## 15. Technology stack

| Component | Technology |
|---|---|
| Frontend | React |
| Language | TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Components | shadcn/ui or equivalent |
| Routing | React Router |
| State management | Zustand |
| Animations | Framer Motion |
| Code editor | Monaco Editor |
| Charts | Recharts |
| Icons | Lucide React |
| Persistence | LocalStorage / IndexedDB |
| Backend | Node.js + Express |
| Code execution | Dart SDK + isolated Docker |
| Unit testing | Vitest |
| UI testing | React Testing Library |
| End-to-end testing | Playwright |

No LLM API, AI chatbot or external AI service is required.

## 16. Suggested project structure

```text
mobile-dev-quest/
│
├── public/
│   ├── assets/
│   └── sounds/
│
├── docs/
│   ├── Dart_Essentials_merged.pdf
│   ├── mobile.pdf
│   └── curriculum-map.md
│
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── router.tsx
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   ├── code/
│   │   └── game/
│   │
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── LevelMap.tsx
│   │   ├── Lesson.tsx
│   │   ├── Quiz.tsx
│   │   ├── CodingArena.tsx
│   │   ├── Exam.tsx
│   │   └── Statistics.tsx
│   │
│   ├── features/
│   │   ├── progression/
│   │   ├── lessons/
│   │   ├── quizzes/
│   │   ├── minigames/
│   │   ├── coding/
│   │   └── exam/
│   │
│   ├── data/
│   │   ├── levels/
│   │   ├── questions/
│   │   ├── lessons/
│   │   └── games/
│   │
│   ├── store/
│   │   ├── progressStore.ts
│   │   ├── gameStore.ts
│   │   └── examStore.ts
│   │
│   ├── types/
│   ├── hooks/
│   ├── utils/
│   └── styles/
│
├── server/
│   ├── routes/
│   ├── execution/
│   └── middleware/
│
├── tests/
│
├── package.json
└── README.md
```

## 17. Data models

Use structured JSON/TypeScript data instead of hardcoding questions into UI components.

### Level

```ts
interface Level {
  id: string;
  title: string;
  description: string;
  difficulty: "medium" | "hard" | "very-hard";
  topics: string[];
  lessonIds: string[];
  quizIds: string[];
  gameIds: string[];
  bossGameId: string;
  passingScore: number;
}
```

### Question

```ts
interface Question {
  id: string;
  levelId: string;
  topic: string;
  type:
    | "mcq"
    | "true-false"
    | "output"
    | "compile"
    | "debug"
    | "code-completion"
    | "coding";
  difficulty: number;
  prompt: string;
  code?: string;
  options?: string[];
  correctAnswer: unknown;
  explanation: string;
  source: "original-quiz" | "lecture-based" | "generated";
  sourcePage?: number;
  estimatedSeconds: number;
}
```

### Progress

```ts
interface UserProgress {
  xp: number;
  currentLevelId: string;
  completedLevelIds: string[];
  unlockedLevelIds: string[];
  completedGameIds: string[];
  bestScores: Record<string, number>;
  topicAccuracy: Record<string, number>;
  streak: number;
}
```

### Mini-game

```ts
interface MiniGame {
  id: string;
  levelId: string;
  title: string;
  gameType: string;
  difficulty: number;
  instructions: string;
  winCondition: {
    type: "score" | "completion" | "tests";
    target: number;
  };
  questionIds?: string[];
}
```

---

# PART I — QUALITY AND ACCEPTANCE CRITERIA

## 18. Functional requirements

The project is not complete unless:

1. All 8 levels are implemented.
2. At least 20 distinct mini-games work.
3. Every level teaches its concepts before assessment.
4. Every level contains quizzes.
5. Each level has a mandatory boss game.
6. Progression is enforced.
7. Progress persists after refresh.
8. Quiz answers are evaluated correctly.
9. Coding exercises have real validation.
10. The final exam lasts 90 minutes.
11. Exam results are calculated correctly.
12. All pages are responsive.
13. There are no dead buttons or placeholder interactions.
14. No LLM integration exists.
15. The application runs locally using documented commands.

## 19. Educational quality requirements

- Follow the uploaded lecture's terminology.
- Use the professor's quiz style as the question-writing reference.
- Include original quiz questions where they can be reliably extracted.
- Create additional questions based on the actual lecture concepts.
- Validate every correct answer.
- Do not introduce advanced Flutter topics absent from the supplied material as mandatory exam content.
- Label optional enrichment clearly.
- Keep code examples consistent with the Dart version selected for the project.
- Distinguish compile-time errors, runtime errors and logical errors.
- Avoid questions with multiple defensible answers.

## 20. Performance and reliability

- Fast initial loading.
- No unnecessary page reloads.
- Persist progress reliably.
- Recover unfinished exam sessions.
- Avoid losing code when navigating.
- Handle execution timeouts.
- Keep code execution isolated.
- Include empty, loading and error states.

## 21. Development priorities

**Phase 1 — Foundation**
- React setup.
- Routing.
- Design system.
- Dashboard.
- Level map.
- Progression logic.
- Local persistence.

**Phase 2 — Learning**
- Lesson engine.
- Dart syntax highlighting.
- Interactive examples.
- Question engine.
- Feedback system.

**Phase 3 — Games**
- Implement reusable game infrastructure.
- Implement at least 24 distinct mini-games.
- Implement boss challenges.
- Add level unlocking.

**Phase 4 — Coding**
- Monaco Editor.
- Dart execution backend.
- Automated test cases.
- Coding challenges.

**Phase 5 — Exam**
- 90-minute simulator.
- Quiz section.
- Coding section.
- Results and weak-topic analysis.

**Phase 6 — Polish**
- Animations.
- Responsive layouts.
- Progress dashboard.
- Bug fixing.
- Automated testing.

---

# PART J — IMPORTANT PRODUCT DECISIONS

1. No accounts or authentication are required for the initial version. It is a personal revision website.
2. Save progress locally.
3. No LLM or chatbot.
4. No internet dependency for lessons, quizzes or games.
5. Code execution can use a local backend.
6. Questions must be stored independently from UI components.
7. Original questions and generated questions must be distinguishable.
8. Do not use generic quiz templates as substitutes for actual mini-games.
9. The website must be fully usable, not just a beautiful prototype.
10. Prioritize educational correctness over decorative effects.
