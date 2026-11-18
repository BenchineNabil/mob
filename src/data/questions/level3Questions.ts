import { Question } from '../../types';

export const LEVEL_3_QUESTIONS: Question[] = [
  // --- AUTHENTIC PROFESSOR EXAM QUESTIONS ---
  {
    id: 'Q-16',
    levelId: 3,
    topic: 'Polymorphism & Static Types',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.16',
    type: 'compile-or-fail',
    difficulty: 'trap',
    prompt: 'Consider the following Dart code:\n\nclass Animal {\n  void makeSound() => print("Animal sound");\n}\n\nclass Dog extends Animal {\n  void fetch() => print("Fetching ball");\n}\n\nvoid main() {\n  Animal pet = Dog();\n  pet.fetch();\n}\n\nWhat is the result of attempting to compile and run this code?',
    options: [
      'It compiles and prints "Fetching ball".',
      'It produces a compilation error because the static type of pet is Animal, which does not declare the method fetch().',
      'It compiles cleanly but throws an AbstractMethodError at runtime.',
      'It prints "Animal sound".'
    ],
    correctAnswer: 1,
    explanation: 'In Dart, static type checking verifies method availability based on the declared static compile-time type of the variable (Animal), not the runtime object (Dog). Animal has no fetch() method, so compilation fails.',
    trapWarning: 'To call fetch(), you must cast: (pet as Dog).fetch() or check: if (pet is Dog) pet.fetch().'
  },
  {
    id: 'Q-17',
    levelId: 3,
    topic: 'implements & Implicit Interface',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.17',
    type: 'mcq',
    difficulty: 'trap',
    prompt: 'In Dart, every class implicitly defines an interface. What is required when "class B implements A"?',
    options: [
      'B only needs to implement abstract methods defined in A.',
      'B inherits all concrete method implementations from A automatically.',
      'B must provide implementations for ALL methods, getters, and setters declared in A, including those that had concrete implementations in A.',
      'B cannot declare any constructors.'
    ],
    correctAnswer: 2,
    explanation: 'When using "implements", class A is treated strictly as an implicit interface contract. The implementing class B inherits ZERO code bodies from A and must provide implementations for every method, getter, and setter in A.',
    trapWarning: 'implements inherits NO code; extends inherits code. If you implement A, you must re-implement everything.'
  },
  {
    id: 'Q-18',
    levelId: 3,
    topic: 'Generics Covariance',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.18',
    type: 'runtime-error-analysis',
    difficulty: 'trap',
    prompt: 'In Dart, generic types are covariant. What does this mean for the assignment:\n\nList<Object> items = <int>[1, 2, 3];',
    options: [
      'The code fails to compile because List<int> is invariant with List<Object>.',
      'The assignment compiles successfully because int is a subtype of Object, making List<int> a subtype of List<Object>. However, attempting to call items.add("text") will throw a runtime TypeError.',
      'The code compiles and allows any object to be added without runtime errors.',
      'Generics only work with primitive types in Dart.'
    ],
    correctAnswer: 1,
    explanation: 'Dart\'s type system treats generic types as covariant by default. Because int <: Object, List<int> <: List<Object>. The compiler allows the assignment, but the underlying heap object is still a List<int>. Calling items.add("text") attempts to insert a String into a List<int>, crashing at runtime with a TypeError.',
    trapWarning: 'Covariant generics can cause runtime unsoundness when modifying collections.'
  },
  {
    id: 'Q-19',
    levelId: 3,
    topic: 'Static Members & Instance Access',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.19',
    type: 'compile-or-fail',
    difficulty: 'trap',
    prompt: 'Given the following class:\n\nclass Student {\n  static int count = 0;\n  String name;\n  Student(this.name) {\n    count++;\n  }\n}\n\nvoid main() {\n  Student sara = Student("Sara");\n  print(sara.count);\n}\n\nWhat is the output when running this program?',
    options: [
      'It prints 1.',
      'It prints 0.',
      'It fails to compile with an error: The getter \'count\' isn\'t defined for the type \'Student\'.',
      'It throws a NoSuchMethodError at runtime.'
    ],
    correctAnswer: 2,
    explanation: 'Unlike Java, C++, or C#, Dart strictly disallows accessing static members through an instance identifier. Static members belong exclusively to the class and must be accessed via Student.count.',
    trapWarning: 'One of Prof. Bouchrika\'s favorite exam traps. sara.count is a COMPILE ERROR in Dart.'
  },

  // --- LAB & LECTURE DERIVED QUESTIONS ---
  {
    id: 'L3-LAB-01',
    levelId: 3,
    topic: 'class Phrase & Encapsulation',
    source: 'original-lab',
    sourceRef: 'mobile.pdf p.30 (LAB-03)',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'In LAB-03 (class Phrase), how is library-private encapsulation achieved for the text field?',
    options: [
      'By declaring it as: private String text;',
      'By prefixing the field with an underscore: String _text;',
      'By using the protected keyword: protected String text;',
      'By annotating it with @private'
    ],
    correctAnswer: 1,
    explanation: 'In Dart, privacy is at the library level and is declared by prefixing an identifier with an underscore (_). Dart has no "private" or "protected" keywords.',
    trapWarning: 'Dart uses underscore (_) for privacy, not Java-style "private" keywords.'
  },
  {
    id: 'L3-LEC-01',
    levelId: 3,
    topic: 'const Constructors & identical()',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L3 Slide 75',
    type: 'output-prediction',
    difficulty: 'hard',
    prompt: 'Given:\nclass Point {\n  final int x, y;\n  const Point(this.x, this.y);\n}\n\nvoid main() {\n  var p1 = const Point(1, 2);\n  var p2 = const Point(1, 2);\n  var p3 = Point(1, 2);\n  print("${identical(p1, p2)} ${identical(p1, p3)}");\n}',
    options: [
      'true true',
      'true false',
      'false false',
      'Compilation error'
    ],
    correctAnswer: 1,
    explanation: 'Dart canonicalizes const instances: p1 and p2 point to the exact same memory allocation (identical is true). p3 is created with "new" (omitted), allocating a new distinct object in RAM, so identical(p1, p3) is false.',
    trapWarning: 'Only objects instantiated with "const" share the canonical memory instance.'
  },
  {
    id: 'L3-LEC-02',
    levelId: 3,
    topic: 'const Constructor Field Rule',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L3 Slide 74',
    type: 'compile-or-fail',
    difficulty: 'medium',
    prompt: 'What happens if a class defines a const constructor but contains a non-final instance variable?',
    options: [
      'It compiles cleanly, but mutating the variable throws an exception.',
      'Compilation error: Can\'t define a const constructor for a class with non-final fields.',
      'The compiler automatically makes the field final.',
      'It only produces a linter warning.'
    ],
    correctAnswer: 1,
    explanation: 'A const constructor guarantees compile-time immutability. Therefore, the Dart compiler enforces that every instance variable in the class must be final.',
    trapWarning: 'All instance fields in a const class must be final.'
  },
  {
    id: 'L3-LEC-03',
    levelId: 3,
    topic: 'Initializer Lists Execution Order',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L3 Slide 72',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'When does a constructor\'s initializer list execute relative to the superclass constructor and constructor body?',
    options: [
      'After the constructor body finishes.',
      'Initializer list -> Superclass constructor -> Current constructor body.',
      'Constructor body -> Superclass constructor -> Initializer list.',
      'At the exact same time using multithreading.'
    ],
    correctAnswer: 1,
    explanation: 'Dart initializes instance variables in this exact sequence: (1) Initializer list, (2) Superclass unnamed/named constructor, (3) Current class constructor body.',
    trapWarning: 'Initializer lists run BEFORE the super constructor and constructor body.'
  },
  {
    id: 'L3-LEC-04',
    levelId: 3,
    topic: 'Mixins with "on" Clause',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L3 Slide 104',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'What is the purpose of the "on" clause in a mixin declaration (e.g. mixin Swimmer on Animal)?',
    options: [
      'It allows the mixin to be used on any class without restriction.',
      'It restricts the mixin so it can only be applied to classes that extend or implement Animal, allowing the mixin to call methods defined in Animal.',
      'It specifies the event listener the mixin reacts to.',
      'It turns the mixin into a StatefulWidget.'
    ],
    correctAnswer: 1,
    explanation: 'The "on" clause enforces a superclass constraint. It guarantees that any class applying the mixin is a subtype of Animal, allowing the mixin to invoke super methods and access Animal fields.',
    trapWarning: '"on" restricts which classes can apply the mixin.'
  },

  // --- GENERATED PRACTICE QUESTIONS ---
  {
    id: 'L3-SYN-01',
    levelId: 3,
    topic: 'Named Constructors',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'easy',
    prompt: 'How do you invoke a named constructor origin() on class Point?',
    options: [
      'Point(origin: true)',
      'Point.origin()',
      'Point->origin()',
      'new Point::origin()'
    ],
    correctAnswer: 1,
    explanation: 'Dart uses ClassName.identifier() syntax for named constructors (e.g. Point.origin()).',
    trapWarning: 'Named constructors use dot notation: Point.origin().'
  },
  {
    id: 'L3-SYN-02',
    levelId: 3,
    topic: 'Redirecting Constructors',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'Which syntax correctly redirects a named constructor Point.alongX(double x) to the default Point(double x, double y) constructor?',
    options: [
      'Point.alongX(double x) { Point(x, 0); }',
      'Point.alongX(double x) : this(x, 0);',
      'Point.alongX(double x) => super(x, 0);',
      'Point.alongX(double x) : default(x, 0);'
    ],
    correctAnswer: 1,
    explanation: 'Redirecting constructors use the colon syntax followed by this(args) in the initializer list position.',
    trapWarning: 'Redirecting constructors have empty bodies and use : this(args).'
  },
  {
    id: 'L3-SYN-03',
    levelId: 3,
    topic: 'Custom Getters and Setters',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'How do you declare a custom getter for property "area" on class Rectangle with fields width and height?',
    options: [
      'double get area => width * height;',
      'double getArea() { return width * height; }',
      'getter area() => width * height;',
      'double property area => width * height;'
    ],
    correctAnswer: 0,
    explanation: 'In Dart, getters are declared using the "get" keyword: Type get name => expr;.',
    trapWarning: 'Getters do not take empty parentheses () in their declaration or invocation.'
  },
  {
    id: 'L3-SYN-04',
    levelId: 3,
    topic: 'Setter Validation',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'Which is the valid syntax for a setter that validates width is positive?',
    options: [
      'set width(double v) { if (v <= 0) throw ArgumentError(); _width = v; }',
      'setter width(double v) => _width = v;',
      'void setWidth(double v) = _width;',
      'set(double v) : width = v;'
    ],
    correctAnswer: 0,
    explanation: 'Setters use the "set" keyword followed by the property name and a single parameter: set name(Type val) { ... }.',
    trapWarning: 'Setters take exactly one parameter and have no return type annotation.'
  },
  {
    id: 'L3-SYN-05',
    levelId: 3,
    topic: 'Abstract Methods',
    source: 'generated',
    type: 'compile-or-fail',
    difficulty: 'easy',
    prompt: 'How do you declare an abstract method in a Dart abstract class?',
    options: [
      'abstract void draw();',
      'void draw(); // Semicolon without body in an abstract class',
      'virtual void draw() = 0;',
      'void draw() => abstract;'
    ],
    correctAnswer: 1,
    explanation: 'In Dart, any method ending with a semicolon (no curly braces) inside an abstract class is implicitly an abstract method. The "abstract" keyword is not used on methods.',
    trapWarning: 'Dart has no "abstract" keyword for methods; omitting the method body makes it abstract.'
  },
  {
    id: 'L3-SYN-06',
    levelId: 3,
    topic: 'Override Annotation',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'What is the purpose of the @override annotation in Dart?',
    options: [
      'It forces the parent class to delete its method.',
      'It instructs the analyzer to verify that the method actually overrides a member in a superclass or interface.',
      'It is mandatory for all Dart methods.',
      'It speeds up runtime execution by 50%.'
    ],
    correctAnswer: 1,
    explanation: '@override alerts the compiler to check that the method matches a signature in a supertype, catching typos in method names.',
    trapWarning: 'If the superclass lacks the method, @override causes a compiler warning.'
  },
  {
    id: 'L3-SYN-07',
    levelId: 3,
    topic: 'super Keyword',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'medium',
    prompt: 'How do you invoke the superclass implementation of describe() from a subclass override?',
    options: [
      'parent.describe()',
      'super.describe()',
      'base.describe()',
      'super::describe()'
    ],
    correctAnswer: 1,
    explanation: 'Dart uses "super.member" to invoke overridden superclass implementations.',
    trapWarning: 'super accesses superclass methods and constructors.'
  },
  {
    id: 'L3-SYN-08',
    levelId: 3,
    topic: 'Super Parameter Shorthand',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'What does the super parameter shorthand "Child(super.name);" achieve in Dart 3?',
    options: [
      'It forwards the parameter directly to the superclass constructor Parent(this.name).',
      'It creates a static variable name.',
      'It makes name a nullable variable.',
      'It causes a compilation error.'
    ],
    correctAnswer: 0,
    explanation: 'Dart 3 allows "super.param" in constructor parameter lists to forward arguments directly to superclass parameters without writing ": super(name)".',
    trapWarning: 'super.param eliminates boilerplate constructor forwarding.'
  },
  {
    id: 'L3-SYN-09',
    levelId: 3,
    topic: 'Generics with Bounds',
    source: 'generated',
    type: 'compile-or-fail',
    difficulty: 'hard',
    prompt: 'Given: class Calculator<T extends num> { T val; Calculator(this.val); }\n\nWhich initialization fails compilation?',
    options: [
      'Calculator<int>(10);',
      'Calculator<double>(3.14);',
      'Calculator<num>(5);',
      'Calculator<String>("10");'
    ],
    correctAnswer: 3,
    explanation: 'The type parameter bound <T extends num> restricts T to num or its subclasses (int, double). String does not extend num, causing a compilation error.',
    trapWarning: 'Type parameter bounds enforce type constraints at compile time.'
  },
  {
    id: 'L3-SYN-10',
    levelId: 3,
    topic: 'Generic Box Example',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'easy',
    prompt: 'What is printed by:\n\nclass Box<T> {\n  T value;\n  Box(this.value);\n}\n\nvoid main() {\n  var b = Box<String>("Dart");\n  print(b.value.length);\n}',
    options: [
      '4',
      'Dart',
      'Compilation error',
      'null'
    ],
    correctAnswer: 0,
    explanation: 'Because b is parameterized with String, b.value has compile-time static type String. "Dart".length evaluates to 4.',
    trapWarning: 'Generics preserve type information without requiring runtime casting.'
  },
  {
    id: 'L3-SYN-11',
    levelId: 3,
    topic: 'Mixins: Multiple Composition',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'Which syntax applies two mixins (Flyer and Swimmer) to a class Duck extending Animal?',
    options: [
      'class Duck extends Animal implements Flyer, Swimmer {}',
      'class Duck extends Animal with Flyer, Swimmer {}',
      'class Duck extends Animal mixins Flyer, Swimmer {}',
      'class Duck with Animal, Flyer, Swimmer {}'
    ],
    correctAnswer: 1,
    explanation: 'Mixins are composed using the "with" keyword after the optional "extends" clause: class Duck extends Animal with Flyer, Swimmer.',
    trapWarning: 'with is the mixin application keyword.'
  },
  {
    id: 'L3-SYN-12',
    levelId: 3,
    topic: 'Mixin Linearization',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'hard',
    prompt: 'If mixin A and mixin B both define action(), and class C with A, B is instantiated, which action() is invoked by c.action()?',
    options: [
      'A\'s action()',
      'B\'s action() (the last mixin in the with clause)',
      'Compilation error due to collision',
      'Both action() methods simultaneously'
    ],
    correctAnswer: 1,
    explanation: 'Dart applies mixins in linear order from left to right. Later mixins in the "with" list override methods from earlier mixins.',
    trapWarning: 'Last mixin in the list wins when methods collide.'
  },
  {
    id: 'L3-SYN-13',
    levelId: 3,
    topic: 'Factory Constructor Basics',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What distinguishes a factory constructor from a generative constructor in Dart?',
    options: [
      'A factory constructor does not necessarily create a new instance of its class; it can return an existing cached instance or an instance of a subtype.',
      'A factory constructor cannot accept parameters.',
      'A factory constructor is executed on a background isolate thread.',
      'A factory constructor is deprecated in modern Dart.'
    ],
    correctAnswer: 0,
    explanation: 'The factory keyword allows constructors to return cached objects (like Singletons) or return concrete subtype instances, which generative constructors cannot do.',
    trapWarning: 'Generative constructors always allocate a new object; factory constructors can return any instance.'
  },
  {
    id: 'L3-SYN-14',
    levelId: 3,
    topic: 'Object.hash',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'When overriding operator == on a Dart class, what other member MUST be overridden to maintain hash table contracts?',
    options: [
      'toString()',
      'hashCode',
      'compareTo()',
      'clone()'
    ],
    correctAnswer: 1,
    explanation: 'If two objects are equal according to operator ==, they MUST produce the identical hashCode. Overriding == without overriding hashCode corrupts Set and Map lookups.',
    trapWarning: 'Always override hashCode whenever overriding operator ==.'
  },
  {
    id: 'L3-SYN-15',
    levelId: 3,
    topic: 'Covariant Keyword on Parameters',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'What is the purpose of the "covariant" keyword on a method parameter in a subclass override?',
    options: [
      'It tells the compiler that the parameter type can be tightened to a narrower subtype in the subclass override.',
      'It turns off null safety for that parameter.',
      'It marks the parameter as asynchronous.',
      'It makes the parameter optional.'
    ],
    correctAnswer: 0,
    explanation: 'By default, method parameters are contravariant in overrides. The "covariant" keyword explicitly informs the compiler to permit tightening parameter types to a subclass.',
    trapWarning: 'covariant bypasses contravariant parameter checking in overrides.'
  },
  {
    id: 'L3-SYN-16',
    levelId: 3,
    topic: 'Class Modifiers (final class)',
    source: 'generated',
    type: 'compile-or-fail',
    difficulty: 'hard',
    prompt: 'In Dart 3, what restriction does the "final class" modifier impose outside the library where it is defined?',
    options: [
      'The class cannot be instantiated.',
      'The class cannot be extended, implemented, or used as a mixin outside its defining library.',
      'The class has no constructors.',
      'All methods in the class are private.'
    ],
    correctAnswer: 1,
    explanation: 'Dart 3 class modifiers: a "final class" closes the type hierarchy outside its library, preventing external code from extending or implementing it.',
    trapWarning: 'final class prevents outside extension or implementation.'
  },
  {
    id: 'L3-SYN-17',
    levelId: 3,
    topic: 'Sealed Classes',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'What is the chief advantage of declaring a "sealed class" in Dart 3 when used in switch statements?',
    options: [
      'It enables the compiler to enforce exhaustive type checking, warning if any direct subtype is missing from switch cases without needing a default case.',
      'It makes the class run in C++ speed.',
      'It automatically implements JSON deserialization.',
      'It allows multiple inheritance.'
    ],
    correctAnswer: 0,
    explanation: 'Sealed classes create known algebraic data types. The compiler guarantees that all direct subclasses are known, enabling exhaustive pattern matching in switch statements.',
    trapWarning: 'Sealed classes enforce exhaustive switch matching.'
  },
  {
    id: 'L3-SYN-18',
    levelId: 3,
    topic: 'Extension Methods',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'How do you define an extension method isBlank on String in Dart?',
    options: [
      'extension StringUtils on String { bool get isBlank => trim().isEmpty; }',
      'addMethod String.isBlank() { return trim().isEmpty; }',
      'prototype String.isBlank = function() {};',
      'augment class String { bool isBlank(); }'
    ],
    correctAnswer: 0,
    explanation: 'Extension methods are declared using "extension Name on TargetType { ... }".',
    trapWarning: 'extension on TargetType adds methods without subclassing.'
  },
  {
    id: 'L3-SYN-19',
    levelId: 3,
    topic: 'Extension Types in Dart 3',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'What is an "extension type" in Dart 3 (e.g. extension type Id(int value) {})?',
    options: [
      'A zero-cost compile-time wrapper around an existing representation type, without allocating any wrapper object in memory at runtime.',
      'A way to create multiple inheritance.',
      'A method to encrypt integers.',
      'A type of Flutter widget.'
    ],
    correctAnswer: 0,
    explanation: 'Extension types provide static type safety and custom APIs at compile time with zero runtime allocation overhead.',
    trapWarning: 'Extension types are erased at runtime to their representation type.'
  },
  {
    id: 'L3-SYN-20',
    levelId: 3,
    topic: 'Operator Overloading',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'How do you overload the addition operator (+) on class Vector2D?',
    options: [
      'Vector2D operator +(Vector2D other) => Vector2D(x + other.x, y + other.y);',
      'Vector2D add(Vector2D other) = operator+;',
      'void operator_add(Vector2D other);',
      'Vector2D plus(Vector2D other);'
    ],
    correctAnswer: 0,
    explanation: 'Dart allows operator overloading using the "operator" keyword: ReturnType operator <symbol>(Parameter).',
    trapWarning: 'Operator overloading uses "operator <symbol>".'
  },
  {
    id: 'L3-SYN-21',
    levelId: 3,
    topic: 'Enum with Members and Methods',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'Can enhanced enums in Dart declare constructors, fields, and instance methods?',
    options: [
      'Yes, enhanced enums can declare const constructors, final fields, and methods.',
      'No, enums can only contain integer values.',
      'Only if all methods are static.',
      'Enums cannot have constructors.'
    ],
    correctAnswer: 0,
    explanation: 'Dart enhanced enums support fields, const constructors, getters, methods, and interface implementation.',
    trapWarning: 'Enhanced enums can declare final fields and const constructors.'
  },
  {
    id: 'L3-SYN-22',
    levelId: 3,
    topic: 'Mixin Class Modifier',
    source: 'generated',
    type: 'compile-or-fail',
    difficulty: 'hard',
    prompt: 'In Dart 3, what is a "mixin class"?',
    options: [
      'A class that can be used both as a normal instantiable class and applied as a mixin via the "with" keyword.',
      'A class that cannot have constructors.',
      'A class that must be abstract.',
      'A deprecated feature.'
    ],
    correctAnswer: 0,
    explanation: 'Dart 3 requires classes intended for use both as normal classes and as mixins to be explicitly declared with the "mixin class" modifier.',
    trapWarning: 'mixin class can be both constructed and used in "with" clauses.'
  },
  {
    id: 'L3-SYN-23',
    levelId: 3,
    topic: 'Base Class Modifier',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'In Dart 3, what does the "base class" modifier enforce on external consumers outside the defining library?',
    options: [
      'External code can extend the class, but CANNOT implement it (preserving the class implementation hierarchy).',
      'External code cannot access the class.',
      'The class must be instantiated via new.',
      'It cannot have fields.'
    ],
    correctAnswer: 0,
    explanation: 'The "base" modifier guarantees that external libraries can only extend the class (inheriting its code), forbidding the use of "implements".',
    trapWarning: 'base class allows extends, but forbids implements.'
  },
  {
    id: 'L3-SYN-24',
    levelId: 3,
    topic: 'Interface Class Modifier',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'In Dart 3, what does the "interface class" modifier enforce on outside libraries?',
    options: [
      'Outside libraries can implement the class, but CANNOT extend it.',
      'The class must be abstract.',
      'The class has no methods.',
      'The class cannot be instantiated.'
    ],
    correctAnswer: 0,
    explanation: '"interface class" allows callers to implement the class contract, but prevents code reuse via inheritance ("extends" is forbidden outside the library).',
    trapWarning: 'interface class allows implements, but forbids extends.'
  },
  {
    id: 'L3-SYN-25',
    levelId: 3,
    topic: 'noSuchMethod Override',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'What is the purpose of overriding noSuchMethod(Invocation invocation) in a Dart class?',
    options: [
      'To intercept calls to undefined or unimplemented methods dynamically at runtime.',
      'To speed up compilation.',
      'To catch network errors.',
      'To prevent the garbage collector from running.'
    ],
    correctAnswer: 0,
    explanation: 'noSuchMethod handles invocations that are not explicitly defined, commonly used in dynamic proxies and mock libraries.',
    trapWarning: 'noSuchMethod intercepts dynamic invocations.'
  },
  {
    id: 'L3-SYN-26',
    levelId: 3,
    topic: 'Function Type Signatures',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'How do you type a parameter "callback" as a function that takes two integers and returns a boolean?',
    options: [
      'bool Function(int, int) callback',
      'Function<bool>(int, int) callback',
      'Callback<int, int, bool> callback',
      'boolean(int, int) callback'
    ],
    correctAnswer: 0,
    explanation: 'In Dart, function types are written as: ReturnType Function(ParamType1, ParamType2).',
    trapWarning: 'bool Function(int, int) is the canonical function type signature.'
  },
  {
    id: 'L3-SYN-27',
    levelId: 3,
    topic: 'Call Method Magic',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'medium',
    prompt: 'If a class defines "int call(int x) => x * 2;", how can an instance of that class be invoked?',
    options: [
      'Like a function: instance(5) evaluates to 10.',
      'Only via instance.call(5).',
      'It cannot be invoked.',
      'It causes a compilation error.'
    ],
    correctAnswer: 0,
    explanation: 'In Dart, defining a "call" method allows instances of the class to be invoked directly using function call syntax: instance(args).',
    trapWarning: 'The call() method makes class instances callable like functions.'
  }
];
