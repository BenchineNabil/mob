import { Question } from '../../types';

export const LEVEL_2_QUESTIONS: Question[] = [
  // --- AUTHENTIC PROFESSOR QUESTIONS & LAB CONTEXT ---
  {
    id: 'L2-LAB-01',
    levelId: 2,
    topic: 'package:test Structure',
    source: 'original-lab',
    sourceRef: 'mobile.pdf p.28 (LAB-01)',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'In LAB-01 (functions_test.dart), which test declaration correctly verifies that decimalTobinary(10) equals "1010"?',
    options: [
      'test("converts binary", () { assert(decimalTobinary(10) == "1010"); });',
      'test("converts binary", () { expect(decimalTobinary(10), equals("1010")); });',
      'verify("converts binary", () { should(decimalTobinary(10)).be("1010"); });',
      'unitTest("converts binary", (expect) => expect(decimalTobinary(10), "1010"));'
    ],
    correctAnswer: 1,
    explanation: 'Dart\'s official package:test uses expect(actual, matcher) assertions, such as expect(decimalTobinary(10), equals("1010")).',
    trapWarning: 'Dart testing uses expect(actual, matcher); assert() is for debugging and ignored in production.'
  },
  {
    id: 'L2-LEC-01',
    levelId: 2,
    topic: 'False Confidence Trap',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L2 Slide 55',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'What constitutes the "False Confidence" trap in Test-Driven Development according to Prof. Bouchrika?',
    options: [
      'Assuming tests will pass without running the dart test command.',
      'A passing test suite that only covers happy-path scenarios, leading developers to believe their implementation is robust despite handling zero edge cases.',
      'Writing tests in the same file as production code.',
      'Using mock objects instead of real SQLite databases.'
    ],
    correctAnswer: 1,
    explanation: 'False confidence occurs when 100% green tests deceive the team into believing the software is complete, even though the tests fail to assert empty inputs, boundary values, null cases, or malformed data.',
    trapWarning: 'Satisfying tests is NOT the same as satisfying requirements!'
  },
  {
    id: 'L2-LEC-02',
    levelId: 2,
    topic: 'Exam Anti-LLM Warning',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L2 Slide 48',
    type: 'true-false',
    difficulty: 'easy',
    prompt: 'According to Prof. Bouchrika\'s explicit examination policy on Slide 48: "No LLM, NO VS CODE, USE OF LLMS => -1 POINT FROM CC".',
    options: [
      'True',
      'False'
    ],
    correctAnswer: 0,
    explanation: 'Slide 48 explicitly states: "No LLM, NO VS CODE, USE OF LLMS => -1 POINT FROM CC". The exam tests unassisted mental execution of code without AI copilots.',
    trapWarning: 'The exam simulator enforces this penalty strictly.'
  },
  {
    id: 'L2-LEC-03',
    levelId: 2,
    topic: 'package:test Matchers',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L2 Slide 52',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'Which package:test matcher tests whether a function throws a FormatException?',
    options: [
      'expect(() => parse(), throwsException);',
      'expect(() => parse(), throwsA(isA<FormatException>()));',
      'expect(() => parse(), catches<FormatException>());',
      'expect(() => parse(), isFormatException);'
    ],
    correctAnswer: 1,
    explanation: 'To assert specific exception types in package:test, wrap the call in a closure () => ... and use throwsA(isA<TargetType>()).',
    trapWarning: 'The function invocation must be wrapped in a closure () => call(); otherwise, the exception throws before expect() can catch it!'
  },
  {
    id: 'L2-LEC-04',
    levelId: 2,
    topic: 'Clean Code: Reading Ratio',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L4 Slide 160',
    type: 'output-prediction',
    difficulty: 'easy',
    prompt: 'In software engineering clean code principles, what is the ratio of time spent reading code versus writing code?',
    options: [
      '1 minute reading = 1 minute writing',
      '1 minute writing = 9 minutes reading (1:9 ratio)',
      '10 minutes writing = 1 minute reading',
      'Reading and writing take identical time'
    ],
    correctAnswer: 1,
    explanation: 'Prof. Bouchrika stresses the classic 1:9 reading ratio: developers spend ~90% of their time reading existing code to understand context before writing 10% new code.',
    trapWarning: 'Always optimize for readability and clear naming, not typing speed.'
  },
  {
    id: 'L2-LEC-05',
    levelId: 2,
    topic: 'Leveled Logging vs print',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L4 Slide 172',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'Why is using package:logger preferred over raw print() in mobile Flutter development?',
    options: [
      'print() uses too much battery power on Android devices.',
      'package:logger provides granular severity levels (d, i, w, e, f) that can be stripped or filtered in release builds, avoiding polluting production logs with sensitive data.',
      'print() cannot output objects containing integers.',
      'package:logger is mandatory for the app to compile on iOS.'
    ],
    correctAnswer: 1,
    explanation: 'Leveled logging allows developers to categorize logs (debug, info, warning, error, fatal) and suppress debug statements in release builds, whereas raw print() dumps text into OS logcat.',
    trapWarning: 'Raw print() in student submissions is penalized as a code smell.'
  },

  // --- GENERATED PRACTICE QUESTIONS ---
  {
    id: 'L2-SYN-01',
    levelId: 2,
    topic: 'Red-Green-Refactor Lifecycle',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'What is the correct sequence of steps in the TDD cycle?',
    options: [
      'Write code -> Write test -> Test passes -> Deploy',
      'Write failing test (Red) -> Write minimal code to pass (Green) -> Refactor code for cleanliness (Refactor)',
      'Refactor -> Test -> Code -> Review',
      'Write all tests -> Write all code -> Debug errors'
    ],
    correctAnswer: 1,
    explanation: 'The fundamental TDD cycle is Red (failing test), Green (minimal passing code), and Refactor (clean and optimize without breaking tests).',
    trapWarning: 'Never write implementation code before writing the failing test in TDD.'
  },
  {
    id: 'L2-SYN-02',
    levelId: 2,
    topic: 'Floating Point Matcher',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'When testing floating-point computations (e.g. 0.1 + 0.2), which package:test matcher should be used to prevent precision mismatch failures?',
    options: [
      'equals(0.3)',
      'closeTo(0.3, 0.0001)',
      'isApprox(0.3)',
      'roundTo(0.3)'
    ],
    correctAnswer: 1,
    explanation: 'Due to IEEE 754 floating-point rounding (0.1 + 0.2 == 0.30000000000000004), direct equality assertions fail. closeTo(expected, delta) allows tolerance testing.',
    trapWarning: 'Never use equals() for floating point math; use closeTo().'
  },
  {
    id: 'L2-SYN-03',
    levelId: 2,
    topic: 'Test Naming Conventions',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'Where must unit tests be placed and how should test files be named in a standard Dart project?',
    options: [
      'In lib/tests/ ending with .test.dart',
      'In test/ ending with _test.dart (e.g. test/auth_test.dart)',
      'In bin/ ending with _unit.dart',
      'Anywhere in the project directory'
    ],
    correctAnswer: 1,
    explanation: 'Dart tooling convention mandates that test files reside in the root test/ directory and end with the _test.dart suffix so "dart test" can discover them.',
    trapWarning: 'Naming a test file my_test.dart in lib/ will not be auto-discovered by dart test.'
  },
  {
    id: 'L2-SYN-04',
    levelId: 2,
    topic: 'test group() Purpose',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'What is the purpose of the group() function in package:test?',
    options: [
      'To run tests in parallel across multiple CPU cores.',
      'To organize related test cases under a shared description and scope common setUp/tearDown hooks.',
      'To prevent tests from failing.',
      'To convert unit tests into integration tests.'
    ],
    correctAnswer: 1,
    explanation: 'group() provides hierarchical organization for test suites, clustering related test() cases together and allowing shared setUp() and tearDown() fixture lifecycle methods.',
    trapWarning: 'group() clusters tests logically and scopes fixtures.'
  },
  {
    id: 'L2-SYN-05',
    levelId: 2,
    topic: 'setUp and tearDown',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'When does the setUp() callback execute within a package:test group?',
    options: [
      'Once before all tests in the entire project start.',
      'Before every individual test() case in that group runs.',
      'Only if a test fails.',
      'After the group completes.'
    ],
    correctAnswer: 1,
    explanation: 'setUp() runs before each test() invocation to prepare fresh test fixtures. tearDown() runs after each test() invocation to clean up resources.',
    trapWarning: 'setUp runs before EACH test, not once per group (setUpAll runs once per group).'
  },
  {
    id: 'L2-SYN-06',
    levelId: 2,
    topic: 'Collection Matchers',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'Which matcher checks that a List has exactly 3 elements and contains the number 42?',
    options: [
      'expect(list, hasLength(3) && contains(42));',
      'expect(list, allOf([hasLength(3), contains(42)]));',
      'expect(list, matches(3, 42));',
      'expect(list, isList(length: 3, item: 42));'
    ],
    correctAnswer: 1,
    explanation: 'package:test provides allOf([...]) to combine multiple matchers that must all pass for the assertion to succeed.',
    trapWarning: 'allOf combines multiple matchers in a single assertion.'
  },
  {
    id: 'L2-SYN-07',
    levelId: 2,
    topic: 'Clean Code: File Size',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'What maximum file size guideline does Prof. Bouchrika recommend for clean Flutter code?',
    options: [
      'Files should be at least 1000 lines.',
      'Files should stay under ~200 lines and require zero horizontal scrolling.',
      'Exactly 50 lines per file.',
      'File size has no impact on clean code.'
    ],
    correctAnswer: 1,
    explanation: 'Files should ideally remain under ~200 lines, with small single-responsibility classes that fit comfortably on a screen without horizontal scrolling.',
    trapWarning: 'Large files indicate violation of the Single Responsibility Principle.'
  },
  {
    id: 'L2-SYN-08',
    levelId: 2,
    topic: 'Clean Code: Naming Rules',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'Which identifier violates standard Dart naming conventions for a boolean method?',
    options: [
      'bool isValidUsername()',
      'bool hasActiveSession()',
      'bool canNavigateForward()',
      'bool check_user_status()'
    ],
    correctAnswer: 3,
    explanation: 'Dart conventions dictate lowerCamelCase with a descriptive verb prefix for boolean methods (is, has, can). check_user_status() uses snake_case, which is reserved for file and directory names.',
    trapWarning: 'snake_case is only for files/packages; methods and variables must use lowerCamelCase.'
  },
  {
    id: 'L2-SYN-09',
    levelId: 2,
    topic: 'Clean Code: Folder Architecture',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What is the difference between feature-first (domain) and layer-first (technical) folder structure in Flutter projects?',
    options: [
      'Layer-first groups by entity type (models/, views/, controllers/), while feature-first groups all files relating to a business feature (auth/, cart/, profile/) together.',
      'Feature-first can only be used in commercial apps.',
      'Layer-first disables hot reload.',
      'There is no architectural difference.'
    ],
    correctAnswer: 0,
    explanation: 'Feature-first organizes files by domain functionality (e.g. features/cart contains cart_screen, cart_repo, cart_model), which scales better than giant global screens/ and models/ folders.',
    trapWarning: 'For large apps, feature-first simplifies navigation and refactoring.'
  },
  {
    id: 'L2-SYN-10',
    levelId: 2,
    topic: 'KISS Principle',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'What does the KISS engineering principle stand for?',
    options: [
      'Keep It Super Structured',
      'Keep It Simple, Stupid',
      'Kernel Instruction Set Standard',
      'Key Information System Service'
    ],
    correctAnswer: 1,
    explanation: 'KISS stands for "Keep It Simple, Stupid", advocating for simple solutions over unnecessary complexity and premature over-engineering.',
    trapWarning: 'Simplicity reduces defects and maintenance overhead.'
  },
  {
    id: 'L2-SYN-11',
    levelId: 2,
    topic: 'DRY Principle',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'What is the core directive of the DRY principle?',
    options: [
      'Don\'t Run Yields',
      'Don\'t Repeat Yourself — every piece of knowledge must have a single authoritative representation',
      'Debug Real Yields',
      'Database Relational Yield'
    ],
    correctAnswer: 1,
    explanation: 'DRY means "Don\'t Repeat Yourself", eliminating duplicate code and logic across the application to prevent copy-paste bugs.',
    trapWarning: 'Duplicating validation logic in 3 screens violates DRY.'
  },
  {
    id: 'L2-SYN-12',
    levelId: 2,
    topic: 'Satisfying Tests vs Requirements',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'hard',
    prompt: 'A student passes test("returns true for radar") by writing "bool isPalindrome(String s) => true;". What fundamental flaw does this illustrate?',
    options: [
      'The code is optimal because it passes the test with minimal code.',
      'Satisfying the test case by hardcoding a return value fails the underlying business requirement for all other inputs.',
      'The test runner failed to execute the function.',
      'package:test cannot test boolean functions.'
    ],
    correctAnswer: 1,
    explanation: 'In TDD, writing minimal code to pass Green is meant to be driven by incremental tests. Hardcoding true satisfies one test assertion, but completely fails the requirement unless challenged by contrasting Red tests (e.g. expect(isPalindrome("cat"), isFalse)).',
    trapWarning: 'Tests must challenge both truthy and falsy conditions.'
  },
  {
    id: 'L2-SYN-13',
    levelId: 2,
    topic: 'Null Matchers',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'Which matcher asserts that an expression evaluates to null?',
    options: [
      'expect(result, isNull);',
      'expect(result, equals("null"));',
      'expect(result, isZero);',
      'expect(result, isEmpty);'
    ],
    correctAnswer: 0,
    explanation: 'package:test provides isNull and isNotNull matchers for verifying nullability.',
    trapWarning: 'equals("null") tests for the 4-letter string "null", not the null value.'
  },
  {
    id: 'L2-SYN-14',
    levelId: 2,
    topic: 'Empty Collection Matcher',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'Which matcher asserts that a list has zero elements?',
    options: [
      'expect(list, isZero);',
      'expect(list, isEmpty);',
      'expect(list, isBlank);',
      'expect(list, isNull);'
    ],
    correctAnswer: 1,
    explanation: 'The isEmpty matcher verifies that an Iterable or Map has length 0.',
    trapWarning: 'isEmpty works on strings, lists, sets, and maps.'
  },
  {
    id: 'L2-SYN-15',
    levelId: 2,
    topic: 'String Matchers (startsWith, endsWith)',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'Which matcher checks that an error message starts with "Invalid format"?',
    options: [
      'expect(msg, startsWith("Invalid format"));',
      'expect(msg, begins("Invalid format"));',
      'expect(msg, hasPrefix("Invalid format"));',
      'expect(msg, isFirst("Invalid format"));'
    ],
    correctAnswer: 0,
    explanation: 'package:test provides startsWith(prefix), endsWith(suffix), and contains(sub) matchers for string assertions.',
    trapWarning: 'startsWith is the standard matcher.'
  },
  {
    id: 'L2-SYN-16',
    levelId: 2,
    topic: 'Inequality Matcher',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'Which matcher asserts that actual value is NOT equal to 10?',
    options: [
      'expect(val, isNot(10));',
      'expect(val, not(10));',
      'expect(val, different(10));',
      'expect(val, != 10);'
    ],
    correctAnswer: 0,
    explanation: 'isNot(matcher) inverts any matcher in package:test.',
    trapWarning: 'isNot can wrap equals() or any other matcher.'
  },
  {
    id: 'L2-SYN-17',
    levelId: 2,
    topic: 'Comparison Matchers',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'Which matcher checks that score is strictly greater than 50 and less than or equal to 100?',
    options: [
      'expect(score, allOf([greaterThan(50), lessThanOrEqualTo(100)]));',
      'expect(score, between(50, 100));',
      'expect(score, inRange(50, 100));',
      'expect(score, isWithin(50, 100));'
    ],
    correctAnswer: 0,
    explanation: 'greaterThan() and lessThanOrEqualTo() combined inside allOf([...]) provide bound checking.',
    trapWarning: 'Dart provides granular comparison matchers.'
  },
  {
    id: 'L2-SYN-18',
    levelId: 2,
    topic: 'Single Responsibility Principle',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'In SOLID principles, what does the "S" dictate?',
    options: [
      'Speed: code must run in under 16ms.',
      'Single Responsibility: a class or module should have one, and only one, reason to change.',
      'Security: all classes must encrypt their state.',
      'Singleton: all services must be singletons.'
    ],
    correctAnswer: 1,
    explanation: 'Single Responsibility Principle (SRP) states that each class should encapsulate a single functionality and have only one reason to change.',
    trapWarning: 'Mixing UI layout, network requests, and database queries in one widget violates SRP.'
  },
  {
    id: 'L2-SYN-19',
    levelId: 2,
    topic: 'Async Unit Tests',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'hard',
    prompt: 'How must an asynchronous test verifying a Future<String> be declared in package:test?',
    options: [
      'test("fetches data", () { final res = await fetchData(); expect(res, "OK"); });',
      'test("fetches data", () async { final res = await fetchData(); expect(res, equals("OK")); });',
      'asyncTest("fetches data", () { expect(fetchData(), equals("OK")); });',
      'test("fetches data", () => sync { expect(fetchData(), "OK"); });'
    ],
    correctAnswer: 1,
    explanation: 'The test body callback must be marked "async" to allow using the await keyword inside the test.',
    trapWarning: 'Omitting async causes a compilation error when using await inside the callback.'
  },
  {
    id: 'L2-SYN-20',
    levelId: 2,
    topic: 'completes Matcher',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'Which matcher asserts that a Future completes without throwing an exception?',
    options: [
      'expect(futureCall(), completes);',
      'expect(futureCall(), isSuccess);',
      'expect(futureCall(), doesNotThrow);',
      'expect(futureCall(), isDone);'
    ],
    correctAnswer: 0,
    explanation: 'package:test provides the completes matcher for asserting that an asynchronous Future resolves successfully.',
    trapWarning: 'completes validates that a Future fulfills.'
  },
  {
    id: 'L2-SYN-21',
    levelId: 2,
    topic: 'test skip & solo',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'In package:test, how can a developer temporarily skip a flaky test during development?',
    options: [
      'test("my test", () {}, skip: "WIP: fixing network dependency");',
      'comment out the test',
      'test("my test", () {}, enabled: false);',
      'test.ignore("my test", () {});'
    ],
    correctAnswer: 0,
    explanation: 'Passing skip: "Reason" to test() or group() skips test execution while reporting the skip reason in test output.',
    trapWarning: 'The skip parameter documents why a test is temporarily bypassed.'
  },
  {
    id: 'L2-SYN-22',
    levelId: 2,
    topic: 'tearDownAll vs tearDown',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'When does tearDownAll() execute in package:test?',
    options: [
      'After every individual test in the suite.',
      'Once after all tests in the enclosing group or file have finished executing.',
      'Whenever an exception occurs.',
      'Before each test group begins.'
    ],
    correctAnswer: 1,
    explanation: 'tearDownAll() executes a single time after all tests in the enclosing scope complete, ideal for closing databases or stopping mock servers.',
    trapWarning: 'tearDown is per test; tearDownAll is once per group/file.'
  },
  {
    id: 'L2-SYN-23',
    levelId: 2,
    topic: 'Test Coverage & False Confidence',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'Why does 100% line coverage NOT guarantee that an application is bug-free?',
    options: [
      'Coverage tools cannot measure Dart code.',
      'Line coverage measures which lines were executed, not whether all combinations of inputs, null states, and edge conditions were validated with assertions.',
      '100% line coverage always guarantees zero defects.',
      'Coverage only applies to web applications.'
    ],
    correctAnswer: 1,
    explanation: 'A test can execute every line of a function without asserting anything or only testing happy-path values. Line execution does not equal semantic correctness.',
    trapWarning: 'Line coverage is a necessary metric, but insufficient without rigorous assertions.'
  },
  {
    id: 'L2-SYN-24',
    levelId: 2,
    topic: 'package:logger Levels Order',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What is the correct ascending order of severity for package:logger levels?',
    options: [
      'trace -> debug -> info -> warning -> error -> fatal',
      'info -> debug -> trace -> warning -> fatal -> error',
      'error -> warning -> info -> debug -> trace',
      'debug -> trace -> error -> warning -> fatal'
    ],
    correctAnswer: 0,
    explanation: 'Severity increases from trace (most verbose) to debug, info, warning, error, and fatal (highest severity).',
    trapWarning: 'Filtering at Level.warning hides trace, debug, and info messages.'
  }
];
