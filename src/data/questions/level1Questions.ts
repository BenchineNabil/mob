import { Question } from '../../types';

export const LEVEL_1_QUESTIONS: Question[] = [
  // --- AUTHENTIC PROFESSOR QUESTIONS ---
  {
    id: 'Q-20',
    levelId: 1,
    topic: 'Operators',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.20',
    type: 'mcq',
    difficulty: 'trap',
    prompt: 'What is the result and type of evaluating "7 / 2" versus "7 ~/ 2" in Dart?',
    options: [
      'Both evaluate to integer 3.',
      '7 / 2 evaluates to 3.5 (double), while 7 ~/ 2 evaluates to 3 (int).',
      '7 / 2 causes a compilation error because division must use ~/.',
      '7 ~/ 2 rounds to the nearest even number (4).'
    ],
    correctAnswer: 1,
    explanation: 'In Dart, the standard division operator (/) always performs floating-point division and returns a double (3.5). The ~/ operator performs truncating integer division, discarding fractional parts and returning an int (3).',
    trapWarning: 'Unlike C, C++, and Java where integer division 7 / 2 produces 3, Dart division always produces a double.'
  },
  {
    id: 'Q-21',
    levelId: 1,
    topic: 'final vs const',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.21',
    type: 'mcq',
    difficulty: 'trap',
    prompt: 'Consider the following two code snippets executed independently:\n\n// Case 1\nfinal List<int> list1 = [1, 2];\nlist1.add(3);\n\n// Case 2\nconst List<int> list2 = [1, 2];\nlist2.add(3);\n\nWhat occurs in each case?',
    options: [
      'Both cases succeed and append 3.',
      'Case 1 succeeds; Case 2 compiles cleanly but throws an Unsupported operation exception at runtime.',
      'Both cases produce compilation errors because final and const variables cannot be modified.',
      'Case 1 fails to compile; Case 2 succeeds.'
    ],
    correctAnswer: 1,
    explanation: 'final only prevents reassigning the variable reference (list1 = [5] fails), but the in-memory list remains mutable. In contrast, const creates an deeply unmodifiable compile-time constant object; calling mutating methods compiles (since List defines add), but the runtime object rejects the mutation.',
    trapWarning: 'Students assume const checks mutation at compile time. Because add() is on the List interface, the compiler permits it, but it crashes at runtime!'
  },
  {
    id: 'Q-22',
    levelId: 1,
    topic: 'late Keyword',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.22',
    type: 'mcq',
    difficulty: 'trap',
    prompt: 'What happens when the following Dart code executes?\n\nlate String title;\nprint(title);',
    options: [
      'It prints null.',
      'It prints an empty string "".',
      'It produces a compilation error: Variable title must be initialized.',
      'It compiles without errors, but throws LateInitializationError at runtime when title is accessed.'
    ],
    correctAnswer: 3,
    explanation: 'The late keyword promises the compiler that title will be initialized before its first read. If read before assignment, the Dart runtime catches the contract violation and throws LateInitializationError.',
    trapWarning: 'Do not confuse non-nullable late variables with nullable types (String?). It does NOT default to null!'
  },
  {
    id: 'Q-26',
    levelId: 1,
    topic: 'Cascade Operator',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.27',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What does the cascade operator (..) return when chained to an object expression?',
    options: [
      'It returns the value returned by the last method called in the chain.',
      'It returns void.',
      'It returns the original receiver object itself, allowing successive operations on the same instance.',
      'It returns a boolean indicating whether all chained operations succeeded.'
    ],
    correctAnswer: 2,
    explanation: 'The cascade notation (..) allows you to perform a sequence of operations on the same object. The expression evaluates to the receiver object itself, not the result of the method call.',
    trapWarning: 'In standard method chaining (builder pattern), each method must return "this". Dart cascade operator works on ANY object regardless of method return type.'
  },

  // --- LECTURE-DERIVED QUESTIONS ---
  {
    id: 'L1-LEC-01',
    levelId: 1,
    topic: 'Collections (List.filled)',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L2 Slide 25',
    type: 'output-prediction',
    difficulty: 'medium',
    prompt: 'What happens when executing:\n\nvar list = List<int>.filled(3, 0);\nlist.add(5);',
    options: [
      'The list becomes [0, 0, 0, 5].',
      'It throws an Unsupported operation: Cannot add to a fixed-length list at runtime.',
      'It compiles with a warning and replaces the last element: [0, 0, 5].',
      'It fails compilation because List.filled requires growable: true to exist.'
    ],
    correctAnswer: 1,
    explanation: 'By default, List.filled(length, fill) creates a fixed-length list (growable defaults to false). Attempting to add elements changes its length and throws an Unsupported operation exception at runtime.',
    trapWarning: 'To make it growable, you must explicitly pass "growable: true".'
  },
  {
    id: 'L1-LEC-02',
    levelId: 1,
    topic: 'Collections (Set Uniqueness)',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L2 Slide 28',
    type: 'output-prediction',
    difficulty: 'easy',
    prompt: 'What is the length of the following set?\n\nfinal colors = <String>{\'red\', \'green\', \'blue\', \'red\', \'green\'};',
    options: [
      '5',
      '3',
      '2',
      'Compilation error due to duplicate set literals.'
    ],
    correctAnswer: 1,
    explanation: 'Sets in Dart model mathematical sets where every element must be unique. Duplicate literal entries are discarded, resulting in 3 unique elements (The "Spilt Paint" metaphor).',
    trapWarning: 'Duplicate set elements do not produce a compiler error; duplicates are simply discarded.'
  },
  {
    id: 'L1-LEC-03',
    levelId: 1,
    topic: 'Parsing (tryParse)',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L2 Slide 18',
    type: 'compile-or-fail',
    difficulty: 'medium',
    prompt: 'What is the result of running:\n\nint? val = int.tryParse("abc");\nprint(val);',
    options: [
      'Prints 0',
      'Throws FormatException',
      'Prints null',
      'Compilation error: int.tryParse requires a radix parameter'
    ],
    correctAnswer: 2,
    explanation: 'int.tryParse() safely attempts to parse a string into an integer. If parsing fails, it returns null instead of throwing a FormatException (which int.parse() would do).',
    trapWarning: 'int.parse("abc") throws FormatException; int.tryParse("abc") safely returns null.'
  },
  {
    id: 'L1-LEC-04',
    levelId: 1,
    topic: 'Spread Operator',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L2 Slide 32',
    type: 'output-prediction',
    difficulty: 'medium',
    prompt: 'What is printed by the following code?\n\nList<int>? extras;\nvar numbers = [1, 2, ...?extras, 3];\nprint(numbers);',
    options: [
      '[1, 2, null, 3]',
      '[1, 2, 3]',
      'Throws NullThrownError at runtime',
      'Compilation error: extras cannot be null'
    ],
    correctAnswer: 1,
    explanation: 'The null-aware spread operator (...?) safely handles null collections by spreading nothing if the target collection is null. Thus, only [1, 2, 3] is created.',
    trapWarning: 'Using standard spread (...) on a null list throws an exception; null-aware spread (...?) avoids this.'
  },
  {
    id: 'L1-LEC-05',
    levelId: 1,
    topic: 'Iterable Methods (where & map)',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L2 Slide 34',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'Which method call returns an Iterable containing only odd numbers multiplied by 2?',
    options: [
      'nums.map((n) => n * 2).where((n) => n % 2 != 0)',
      'nums.where((n) => n % 2 != 0).map((n) => n * 2)',
      'nums.filter((n) => n % 2 != 0).transform((n) => n * 2)',
      'nums.select((n) => n % 2 != 0).map((n) => n * 2)'
    ],
    correctAnswer: 1,
    explanation: 'Filtering odd numbers first with where((n) => n % 2 != 0) and then transforming each with map((n) => n * 2) produces the required sequence. Option 0 is wrong because multiplying by 2 first makes all numbers even!',
    trapWarning: 'Notice that map before where in Option 0 produces an empty iterable because all numbers become even after multiplying by 2!'
  },

  // --- PRACTICE EXTENSIONS (SYNTHETIC) ---
  {
    id: 'L1-SYN-01',
    levelId: 1,
    topic: 'Variables & Types',
    source: 'generated',
    type: 'compile-or-fail',
    difficulty: 'easy',
    prompt: 'Will this code compile in Dart?\n\nvar score = 100;\nscore = "Passed";',
    options: [
      'Yes, var variables are dynamically typed and can hold any type.',
      'No, compilation error: A value of type "String" cannot be assigned to a variable of type "int".',
      'Yes, but it logs a runtime type warning.',
      'Yes, if sound null safety is disabled.'
    ],
    correctAnswer: 1,
    explanation: 'In Dart, var infers the static type from the initial assigned value. Because 100 is an int, score is statically typed as int and cannot be reassigned to a String.',
    trapWarning: 'Do not confuse var (type inference) with dynamic (opt-out of static type checking).'
  },
  {
    id: 'L1-SYN-02',
    levelId: 1,
    topic: 'dynamic vs Object?',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What is the key difference between declaring a variable as dynamic versus Object??',
    options: [
      'dynamic allows calling any method without compile-time checks, whereas Object? only allows methods declared on Object unless cast.',
      'dynamic cannot store null, while Object? can.',
      'Object? disables all runtime type checks.',
      'There is no difference in Dart 3.'
    ],
    correctAnswer: 0,
    explanation: 'dynamic turns off static type checking, allowing you to invoke any method or property (which might fail at runtime). Object? requires you to check and cast before calling subtype methods.',
    trapWarning: 'dynamic bypasses the compiler, creating runtime crash risks.'
  },
  {
    id: 'L1-SYN-03',
    levelId: 1,
    topic: 'Operators (is!)',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'easy',
    prompt: 'What is the output of:\n\nObject value = "ENSIA";\nif (value is! int) {\n  print("Not int");\n}',
    options: [
      'Not int',
      'int',
      'Compilation error',
      'Nothing printed'
    ],
    correctAnswer: 0,
    explanation: 'The is! operator tests whether an object is NOT of the specified type. Since "ENSIA" is a String, value is! int evaluates to true.',
    trapWarning: 'Dart uses is! rather than !(value is type) for cleaner negation.'
  },
  {
    id: 'L1-SYN-04',
    levelId: 1,
    topic: 'Functions & Default Parameters',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'medium',
    prompt: 'What does this function print when called as greet("Ali")?\n\nvoid greet(String name, [String greeting = "Hello"]) {\n  print("$greeting, $name!");\n}',
    options: [
      'null, Ali!',
      'Hello, Ali!',
      'Compilation error: optional parameters cannot have default values',
      'Ali, Hello!'
    ],
    correctAnswer: 1,
    explanation: 'Square brackets [] declare optional positional parameters. If omitted, greeting takes its default value "Hello", printing "Hello, Ali!".',
    trapWarning: 'Square brackets are for optional positional parameters; curly braces {} are for named parameters.'
  },
  {
    id: 'L1-SYN-05',
    levelId: 1,
    topic: 'Named Parameters',
    source: 'generated',
    type: 'compile-or-fail',
    difficulty: 'medium',
    prompt: 'Given: void createUser({required String username, int role = 1}) {}\n\nWhich call produces a compilation error?',
    options: [
      'createUser(username: "ali");',
      'createUser(username: "ali", role: 2);',
      'createUser("ali");',
      'createUser(role: 3, username: "sara");'
    ],
    correctAnswer: 2,
    explanation: 'Named parameters MUST be invoked using their parameter names (e.g. username: "ali"). Passing a raw positional argument "ali" causes a compilation error.',
    trapWarning: 'Named parameters cannot be passed positionally.'
  },
  {
    id: 'L1-SYN-06',
    levelId: 1,
    topic: 'Map Keys & Values',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'medium',
    prompt: 'What happens when accessing a non-existent key in a Dart Map?\n\nvar map = {\'a\': 1, \'b\': 2};\nprint(map[\'c\']);',
    options: [
      'Throws NoSuchKeyException',
      'Prints null',
      'Prints 0',
      'Throws RangeError'
    ],
    correctAnswer: 1,
    explanation: 'In Dart, looking up a missing key with map[key] returns null without throwing an exception.',
    trapWarning: 'Use containsKey(\'c\') to distinguish between a key that does not exist versus a key whose value is explicitly null.'
  },
  {
    id: 'L1-SYN-07',
    levelId: 1,
    topic: 'String Interpolation',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'easy',
    prompt: 'What does this snippet print?\n\nvar list = [10, 20];\nprint("Length is $list.length");',
    options: [
      'Length is 2',
      'Length is [10, 20].length',
      'Compilation error',
      'Length is 20'
    ],
    correctAnswer: 1,
    explanation: 'In Dart string interpolation, $identifier evaluates only the identifier itself. Accessing properties requires curly braces: "\${list.length}". Therefore, "$list.length" evaluates list to "[10, 20]" followed by the literal text ".length".',
    trapWarning: 'Remember the curly braces: \${expr} for expressions and properties!'
  },
  {
    id: 'L1-SYN-08',
    levelId: 1,
    topic: 'Exception Handling (on vs catch)',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'In Dart try/catch blocks, what is the role of the "on" clause?\n\ntry { ... } on FormatException catch (e, s) { ... }',
    options: [
      'It executes code only when the program terminates.',
      'It specifies the exact exception type to intercept.',
      'It turns off stack trace generation.',
      'It re-throws the exception automatically.'
    ],
    correctAnswer: 1,
    explanation: 'The "on" clause specifies the type of exception to intercept, allowing different catch blocks for different exception classes.',
    trapWarning: '"on ExceptionType" intercepts specific types; "catch (e, s)" binds the exception object and stack trace.'
  },
  {
    id: 'L1-SYN-09',
    levelId: 1,
    topic: 'Multiline Strings',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'easy',
    prompt: 'How do you create a multiline string preserving line breaks in Dart?',
    options: [
      'Using double slash // ... //',
      'Using triple quotes \'\'\'...\'\'\' or """..."""',
      'Using the multiline keyword',
      'Strings cannot span multiple lines in Dart'
    ],
    correctAnswer: 1,
    explanation: 'Triple single quotes (\'\'\'...\'\'\') or triple double quotes ("""...""") denote multiline strings that preserve whitespace and newline characters.',
    trapWarning: 'Triple quotes preserve exact newline characters.'
  },
  {
    id: 'L1-SYN-10',
    levelId: 1,
    topic: 'Arrow Functions',
    source: 'generated',
    type: 'compile-or-fail',
    difficulty: 'medium',
    prompt: 'Which arrow function declaration is syntactically INVALID in Dart?',
    options: [
      'int doubleVal(int x) => x * 2;',
      'void logMsg(String m) => print(m);',
      'int compute(int x) => { return x * 2; };',
      'bool isEven(int n) => n % 2 == 0;'
    ],
    correctAnswer: 2,
    explanation: 'In Dart, the arrow syntax (=> expr) only accepts a single expression. Block statements enclosed in curly braces with return statements are illegal after =>.',
    trapWarning: 'Never write "=> { return expr; };" in Dart! The arrow itself implies returning the following expression.'
  },
  {
    id: 'L1-SYN-11',
    levelId: 1,
    topic: 'Anonymous Functions',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'medium',
    prompt: 'What does this print?\n\nvar ops = [(int x) => x + 1, (int x) => x * 2];\nprint(ops[1](5));',
    options: [
      '6',
      '10',
      '12',
      'Compilation error: Lists cannot hold functions'
    ],
    correctAnswer: 1,
    explanation: 'Dart treats functions as first-class citizens. ops[1] is (int x) => x * 2. Invoking it with argument 5 yields 10.',
    trapWarning: 'Functions are first-class objects and can be stored in lists, maps, or passed as arguments.'
  },
  {
    id: 'L1-SYN-12',
    levelId: 1,
    topic: 'num vs int & double',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'What is the relationship between num, int, and double in Dart?',
    options: [
      'int and double are completely unrelated types.',
      'num is the superclass of both int and double.',
      'double extends int.',
      'int extends double.'
    ],
    correctAnswer: 1,
    explanation: 'num is an abstract superclass inherited by both int and double. A variable of type num can hold either integer or floating-point values.',
    trapWarning: 'num accepts both 5 and 5.5.'
  },
  {
    id: 'L1-SYN-13',
    levelId: 1,
    topic: 'Raw Strings',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'easy',
    prompt: 'What is printed by: print(r\'Hello \n World\');?',
    options: [
      'Hello followed by a newline and World',
      'Hello \\n World',
      'Compilation error',
      'Hello World'
    ],
    correctAnswer: 1,
    explanation: 'Prefixing a string with \'r\' creates a raw string where escape characters like \\n are treated as literal characters.',
    trapWarning: 'Prefix r prevents escape sequence evaluation.'
  },
  {
    id: 'L1-SYN-14',
    levelId: 1,
    topic: 'Switch Expressions',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'medium',
    prompt: 'What does this switch evaluate to when grade is "A"?\n\nvar result = switch (grade) {\n  "A" => "Excellent",\n  "B" => "Good",\n  _ => "Pass",\n};',
    options: [
      'Excellent',
      'Good',
      'Pass',
      'Compilation error: switch cannot be used as an expression'
    ],
    correctAnswer: 0,
    explanation: 'Dart 3 introduces switch expressions that produce values directly. Matching "A" yields "Excellent".',
    trapWarning: 'The wildcard pattern _ acts as the default fallback case.'
  },
  {
    id: 'L1-SYN-15',
    levelId: 1,
    topic: 'Iterable any & every',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'medium',
    prompt: 'What is the value of result?\n\nvar list = [2, 4, 6, 8];\nvar result = list.every((n) => n % 2 == 0) && list.any((n) => n > 5);',
    options: [
      'true',
      'false',
      'Throws TypeError',
      'null'
    ],
    correctAnswer: 0,
    explanation: 'every() returns true because all elements are even; any() returns true because 6 and 8 are > 5. true && true evaluates to true.',
    trapWarning: 'every requires all elements to match; any requires at least one.'
  },
  {
    id: 'L1-SYN-16',
    levelId: 1,
    topic: 'late final Variable',
    source: 'generated',
    type: 'compile-or-fail',
    difficulty: 'hard',
    prompt: 'What happens when executing:\n\nlate final int x;\nx = 10;\nx = 20;',
    options: [
      'x becomes 20.',
      'Throws LateInitializationError: Field \'x\' has already been initialized at runtime.',
      'Compilation error: final variable cannot be assigned twice.',
      'x remains 10 and the second assignment is silently ignored.'
    ],
    correctAnswer: 1,
    explanation: 'A late final variable can be initialized once at runtime. If a second assignment is attempted, Dart throws a LateInitializationError at runtime.',
    trapWarning: 'Because late defers assignment checks to runtime, the compiler cannot catch the double assignment; it throws at runtime.'
  },
  {
    id: 'L1-SYN-17',
    levelId: 1,
    topic: 'Bitwise Operators',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'medium',
    prompt: 'What does (5 & 3) evaluate to in Dart?',
    options: [
      '1',
      '7',
      '8',
      'Compilation error: & is only a logical operator'
    ],
    correctAnswer: 0,
    explanation: '5 in binary is 0101; 3 in binary is 0011. Bitwise AND (0101 & 0011) produces 0001 (decimal 1).',
    trapWarning: '& is bitwise AND; && is logical short-circuit AND.'
  },
  {
    id: 'L1-SYN-18',
    levelId: 1,
    topic: 'List.unmodifiable',
    source: 'generated',
    type: 'runtime-error-analysis',
    difficulty: 'medium',
    prompt: 'What happens when executing:\n\nvar list = List.unmodifiable([1, 2, 3]);\nlist[0] = 99;',
    options: [
      'The first item becomes 99.',
      'Throws Unsupported operation: Cannot modify an unmodifiable list.',
      'Compilation error',
      'list creates a mutable copy'
    ],
    correctAnswer: 1,
    explanation: 'List.unmodifiable creates an immutable wrapper view. Any index assignment or modification throws an Unsupported operation exception at runtime.',
    trapWarning: 'Unmodifiable lists reject both additions and index assignments.'
  },
  {
    id: 'L1-SYN-19',
    levelId: 1,
    topic: 'String runes & characters',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'hard',
    prompt: 'What does "ENSIA".runes.length evaluate to?',
    options: [
      '5',
      '10',
      '1',
      'Compilation error: String has no runes getter'
    ],
    correctAnswer: 0,
    explanation: 'runes returns an Iterable of Unicode code points (UTF-32) for the characters in the string. For "ENSIA", there are 5 code points.',
    trapWarning: 'runes provides access to 32-bit Unicode code points.'
  },
  {
    id: 'L1-SYN-20',
    levelId: 1,
    topic: 'Dart Sound Null Safety',
    source: 'generated',
    type: 'compile-or-fail',
    difficulty: 'easy',
    prompt: 'What happens when compiling this code in Dart 3?\n\nString name = null;',
    options: [
      'It compiles cleanly and name holds null.',
      'Compilation error: A value of type "Null" cannot be assigned to a variable of type "String".',
      'It compiles with a runtime warning.',
      'It assigns an empty string "" automatically.'
    ],
    correctAnswer: 1,
    explanation: 'Dart 3 enforces 100% sound null safety. Types are non-nullable by default. To allow null, the type must be marked nullable: String? name = null;.',
    trapWarning: 'Non-nullable types reject null at compile time.'
  },
  {
    id: 'L1-SYN-21',
    levelId: 1,
    topic: 'Null Assertion Operator (!)',
    source: 'generated',
    type: 'runtime-error-analysis',
    difficulty: 'medium',
    prompt: 'What occurs when this code runs?\n\nString? input;\nprint(input!.length);',
    options: [
      'Prints 0',
      'Prints null',
      'Throws NullThrownError / TypeError at runtime',
      'Compilation error'
    ],
    correctAnswer: 2,
    explanation: 'The null assertion operator (!) casts a nullable type to non-nullable, asserting that the value is not null. If it is null, the runtime throws an exception.',
    trapWarning: 'Using ! on a null value crashes at runtime.'
  },
  {
    id: 'L1-SYN-22',
    levelId: 1,
    topic: 'Null-Coalescing Operator (??)',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'easy',
    prompt: 'What is printed?\n\nString? title;\nString display = title ?? "Default Title";\nprint(display);',
    options: [
      'null',
      'Default Title',
      'Throws exception',
      'Compilation error'
    ],
    correctAnswer: 1,
    explanation: 'The ?? operator returns the left-hand operand if not null; otherwise, it evaluates and returns the right-hand operand ("Default Title").',
    trapWarning: '?? is the null-coalescing fallback operator.'
  },
  {
    id: 'L1-SYN-23',
    levelId: 1,
    topic: 'Null-Coalescing Assignment (??=)',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'easy',
    prompt: 'What is the value of x after: int? x; x ??= 5; x ??= 10;?',
    options: [
      '10',
      '5',
      'null',
      '15'
    ],
    correctAnswer: 1,
    explanation: 'The ??= assignment operator assigns a value to a variable ONLY if that variable is currently null. Since x was null, it receives 5. The second ??= 10 is skipped because x is no longer null.',
    trapWarning: '??= only assigns if the target variable is currently null.'
  },
  {
    id: 'L1-SYN-24',
    levelId: 1,
    topic: 'Type Casting with "as"',
    source: 'generated',
    type: 'runtime-error-analysis',
    difficulty: 'medium',
    prompt: 'What happens when running: Object val = "123"; int num = val as int;?',
    options: [
      'num becomes 123.',
      'Throws a TypeError at runtime: type "String" is not a subtype of type "int" in type cast.',
      'num becomes 0.',
      'Compilation error.'
    ],
    correctAnswer: 1,
    explanation: 'The "as" operator performs a type cast, not a type conversion. Casting a String to an int crashes at runtime with a TypeError. Parsing requires int.parse().',
    trapWarning: 'The "as" operator is for casting type hierarchies, not for string-to-number parsing!'
  },
  {
    id: 'L1-SYN-25',
    levelId: 1,
    topic: 'Conditional Member Access (?.)',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'easy',
    prompt: 'What does this print?\n\nString? name;\nprint(name?.toUpperCase());',
    options: [
      'null',
      '""',
      'Throws NullPointerException',
      'Compilation error'
    ],
    correctAnswer: 0,
    explanation: 'The conditional member access operator (?.) returns null if the target object is null, rather than throwing an exception.',
    trapWarning: '?. short-circuits to null if the receiver is null.'
  },
  {
    id: 'L1-SYN-26',
    levelId: 1,
    topic: 'For-in Loop with Iterable',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'easy',
    prompt: 'What is printed?\n\nint sum = 0;\nfor (var n in [1, 2, 3]) {\n  sum += n;\n}\nprint(sum);',
    options: [
      '6',
      '0',
      '123',
      'Compilation error'
    ],
    correctAnswer: 0,
    explanation: 'The for-in loop iterates over any Iterable collection. Summing 1 + 2 + 3 yields 6.',
    trapWarning: 'for-in works on all Dart Iterable collections.'
  },
  {
    id: 'L1-SYN-27',
    levelId: 1,
    topic: 'Records in Dart 3',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'medium',
    prompt: 'What is printed by: var record = (\'Ali\', age: 21); print("${record.$1} ${record.age}");?',
    options: [
      'Ali 21',
      'record.$1 21',
      'Compilation error: Records are not supported in Dart',
      'null 21'
    ],
    correctAnswer: 0,
    explanation: 'Dart 3 records allow grouping multiple values. Positional fields are accessed via record.$1, $2, etc., and named fields are accessed via record.fieldName.',
    trapWarning: 'Dart 3 records use $1 for the first positional field.'
  }
];
