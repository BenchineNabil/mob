import { Question } from '../../types';

export const LEVEL_4_QUESTIONS: Question[] = [
  // --- AUTHENTIC PROFESSOR EXAM QUESTIONS ---
  {
    id: 'Q-07',
    levelId: 4,
    topic: 'Repository Pattern Decoupling',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.7',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'In mobile software architecture, what is the primary advantage of employing the Repository Pattern (e.g. NewsRepository with NewsDummyRepository and NewsBackendRepository)?',
    options: [
      'It speeds up the CPU compilation time of Dart code.',
      'It decouples the UI layer from the concrete data source, allowing the backend or mock data source to be swapped without modifying the UI layer, and enables straightforward unit testing with mock implementations.',
      'It guarantees that all network requests bypass the device\'s internet connection.',
      'It eliminates the need for StatelessWidget and StatefulWidget.'
    ],
    correctAnswer: 1,
    explanation: 'The Repository Pattern introduces an abstract interface between the presentation layer and data access. The UI depends only on the contract, allowing developers to switch between mock, local cache, or remote API sources without altering UI presentation code.',
    trapWarning: 'Decoupling enables independent unit testing and clean separation of concerns.'
  },
  {
    id: 'Q-09',
    levelId: 4,
    topic: 'Singleton In-Memory State Guarantee',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.9',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'If a class CounterStore is properly implemented as a Singleton in Dart, what is guaranteed when CounterStore() is invoked from two separate screens in the app?',
    options: [
      'Two distinct objects are allocated with separate counters in RAM.',
      'Both screens receive a reference to the exact same cached instance in memory, sharing the identical counter state.',
      'The second screen call throws a DuplicateInstanceException.',
      'The first instance is deleted and garbage collected to make room for the second.'
    ],
    correctAnswer: 1,
    explanation: 'A Dart singleton employs a factory constructor returning a static cached instance. Invocations across any screen evaluate to the identical object reference in the Dart VM heap, guaranteeing synchronized shared state.',
    trapWarning: 'identical(CounterStore(), CounterStore()) evaluates to true.'
  },

  // --- AUTHENTIC LAB CONTEXT & LECTURE DERIVED ---
  {
    id: 'L4-LAB-01',
    levelId: 4,
    topic: 'Singleton Constructor Visibility',
    source: 'original-lab',
    sourceRef: 'mobile.pdf p.31 (LAB-04)',
    type: 'code-debugging',
    difficulty: 'hard',
    prompt: 'In LAB-04 (CounterStore Singleton), which implementation correctly ensures callers cannot bypass the singleton factory to create duplicate instances?',
    options: [
      'class CounterStore { CounterStore(); factory CounterStore() => _instance; }',
      'class CounterStore { static final _instance = CounterStore._internal(); CounterStore._internal(); factory CounterStore() => _instance; }',
      'class CounterStore { public CounterStore() { return _instance; } }',
      'class CounterStore { factory CounterStore() => CounterStore(); }'
    ],
    correctAnswer: 1,
    explanation: 'To enforce a Singleton in Dart, you must make the generative constructor private by prefixing its name with an underscore (CounterStore._internal()), preventing direct instantiation from outside the library, and supply a factory constructor returning the static cached instance.',
    trapWarning: 'Leaving an un-named public constructor permits direct instantiation, defeating the Singleton pattern.'
  },
  {
    id: 'L4-LEC-01',
    levelId: 4,
    topic: 'Why Patterns Exist: Spaghetti PHP',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L3 Slide 108',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'What architectural anti-pattern does Prof. Bouchrika highlight as the primary reason software design patterns were invented?',
    options: [
      'Over-engineered microservices.',
      'The "Messy PHP Spaghetti Code" nightmare: database queries hardcoded directly inside presentation templates, where changing one database column forces editing 40 separate files.',
      'Using Git branching instead of trunk-based development.',
      'Writing too many unit tests.'
    ],
    correctAnswer: 1,
    explanation: 'Slide 108 illustrates the historic anti-pattern of legacy web apps: presentation code tightly coupled to database queries, duplicated across dozens of files, leading to fragile systems where minor changes create ripple defects.',
    trapWarning: 'Design patterns exist to solve tight coupling and maintenance fragility.'
  },
  {
    id: 'L4-LEC-02',
    levelId: 4,
    topic: 'Factory Pattern: fromJson',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L3 Slide 116',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'In Dart, what is the standard idiomatic pattern for converting raw JSON Map data into typed model objects?',
    options: [
      'Using a factory constructor: factory User.fromJson(Map<String, dynamic> json) => ...',
      'Casting the JSON map directly: User user = json as User;',
      'Using Java reflection: User.class.newInstance(json);',
      'Calling json.toObject<User>()'
    ],
    correctAnswer: 0,
    explanation: 'Dart idioms employ factory constructors (e.g. factory User.fromJson) to deserialize dynamic JSON maps into strongly-typed immutable model instances.',
    trapWarning: 'Dart has no runtime reflection in Flutter; factory fromJson is the standard deserializer.'
  },
  {
    id: 'L4-LEC-03',
    levelId: 4,
    topic: 'Observer vs Publish-Subscribe',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L3 Slide 130',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'What is the critical architectural distinction between the Observer Pattern and the Publish-Subscribe Pattern?',
    options: [
      'They are identical patterns with two different names.',
      'In Observer, the Subject maintains a direct reference list of its Observers; in Publish-Subscribe, publishers and subscribers are completely decoupled via an intermediary Event Broker / Bus.',
      'Observer only works with databases, while Pub-Sub only works with websockets.',
      'Publish-Subscribe cannot be used on mobile devices.'
    ],
    correctAnswer: 1,
    explanation: 'Observer couples the Subject directly to its Observers (subject iterates over its internal observer collection). Pub-Sub decouples them temporally and spatially using an Event Broker; publishers do not know who the subscribers are.',
    trapWarning: 'A favorite exam distinction: Observer has direct subject-observer coupling; Pub-Sub introduces a central broker.'
  },

  // --- GENERATED PRACTICE QUESTIONS ---
  {
    id: 'L4-SYN-01',
    levelId: 4,
    topic: 'Abstract Class Factory Constructor',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'Can an abstract class define a factory constructor that returns concrete subclass instances?\n\nabstract class Shape {\n  factory Shape(String type) {\n    if (type == "circle") return Circle();\n    return Square();\n  }\n}',
    options: [
      'No, abstract classes cannot declare any constructors in Dart.',
      'Yes, factory constructors in abstract classes are valid and commonly used to return concrete subtype instances.',
      'Only if Circle and Square are marked private.',
      'No, Dart 3 deprecated abstract class factories.'
    ],
    correctAnswer: 1,
    explanation: 'Because factory constructors do not instantiate the declaring class directly with "new", abstract classes can define factory constructors that return concrete subclass implementations based on parameters.',
    trapWarning: 'Abstract classes CAN define factory constructors!'
  },
  {
    id: 'L4-SYN-02',
    levelId: 4,
    topic: 'Singleton vs Static Class',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'Why is a Singleton pattern generally preferred over a utility class containing only static methods when managing state?',
    options: [
      'Singletons execute 10 times faster than static methods.',
      'A Singleton is a normal object that can implement interfaces, be passed as a parameter, and be replaced by mock objects in unit tests, whereas static classes cannot.',
      'Static methods cannot access integer variables in Dart.',
      'Flutter disallows static methods in stateful widgets.'
    ],
    correctAnswer: 1,
    explanation: 'Static methods are hardcoded to their class name and cannot implement interfaces or be swapped for testing. Singletons are real instances that can implement contracts and be injected into repositories.',
    trapWarning: 'Static methods inhibit polymorphism and dependency injection.'
  },
  {
    id: 'L4-SYN-03',
    levelId: 4,
    topic: 'Dependency Inversion Principle',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'In SOLID principles, how does the Repository Pattern fulfill the Dependency Inversion Principle (DIP)?',
    options: [
      'High-level presentation modules depend on database drivers directly.',
      'Both high-level modules (UI) and low-level modules (Network/DB) depend on abstractions (the Repository Interface), not on each other directly.',
      'It inverts the order of widget tree rendering.',
      'It reverses HTTP request headers.'
    ],
    correctAnswer: 1,
    explanation: 'DIP dictates that high-level modules should not depend on low-level modules; both should depend on abstractions. The UI depends on AbstractRepository; ConcreteDbRepo implements AbstractRepository.',
    trapWarning: 'Depend on abstractions, not on concrete implementations.'
  },
  {
    id: 'L4-SYN-04',
    levelId: 4,
    topic: 'Mocking in Unit Testing',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'Why does the Repository Pattern make automated testing of UI or business logic significantly faster and more reliable?',
    options: [
      'It converts Dart code into native C++ binaries.',
      'It allows tests to inject an in-memory Mock repository, testing business logic instantly without making real HTTP requests or requiring a live database.',
      'It bypasses the need for unit tests entirely.',
      'It caches network packets.'
    ],
    correctAnswer: 1,
    explanation: 'By decoupling data access, tests can supply a MockNewsRepository returning canned data in microseconds without network latency or server dependencies.',
    trapWarning: 'Mock repositories eliminate network flakiness in automated tests.'
  },
  {
    id: 'L4-SYN-05',
    levelId: 4,
    topic: 'Singleton Thread Safety in Dart',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'Why does Dart not require synchronization locks or double-checked locking mechanisms when implementing Singletons?',
    options: [
      'Dart code runs on a single-threaded isolate event loop, eliminating multithreaded race conditions on variable initialization.',
      'The Dart compiler automatically adds mutex locks to all classes.',
      'Dart singletons run on GPU threads.',
      'Singletons are not thread safe in Dart.'
    ],
    correctAnswer: 0,
    explanation: 'Unlike Java or C# where multiple threads can enter a singleton constructor simultaneously, Dart executes on a single-threaded isolate. Race conditions during singleton initialization are physically impossible.',
    trapWarning: 'No double-checked locking is needed in Dart because isolates are single-threaded.'
  },
  {
    id: 'L4-SYN-06',
    levelId: 4,
    topic: 'SharedPreferences as a Singleton',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'medium',
    prompt: 'What pattern does SharedPreferences.getInstance() implement in Flutter?',
    options: [
      'Builder pattern',
      'Asynchronous Singleton pattern returning the shared persistent preferences instance',
      'Prototype pattern',
      'Decorator pattern'
    ],
    correctAnswer: 1,
    explanation: 'SharedPreferences.getInstance() initializes platform channels once and caches the in-memory preferences map, returning the same shared instance to all callers.',
    trapWarning: 'getInstance() is an asynchronous Singleton.'
  },
  {
    id: 'L4-SYN-07',
    levelId: 4,
    topic: 'Factory vs Builder',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'When is the Builder Pattern preferred over the Factory Pattern?',
    options: [
      'When constructing complex objects with many optional configuration steps and parameters.',
      'When you only have one parameter.',
      'When creating singletons.',
      'Builder is only used for building widgets.'
    ],
    correctAnswer: 0,
    explanation: 'Factory creates objects in a single call; Builder constructs complex representations step-by-step with fluent method chaining.',
    trapWarning: 'Builder is for step-by-step construction of complex objects.'
  },
  {
    id: 'L4-SYN-08',
    levelId: 4,
    topic: 'Service Locator Pattern',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What popular Flutter dependency injection package acts as a Service Locator for Singletons and Repositories?',
    options: [
      'get_it',
      'shared_preferences',
      'flutter_test',
      'path_provider'
    ],
    correctAnswer: 0,
    explanation: 'get_it is the dominant service locator in the Flutter ecosystem, registering and resolving singletons and factory dependencies across the app.',
    trapWarning: 'get_it provides global service registration and dependency injection.'
  },
  {
    id: 'L4-SYN-09',
    levelId: 4,
    topic: 'Data Transfer Object (DTO)',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What is the role of a Data Transfer Object (DTO) in repository architectures?',
    options: [
      'To directly render pixels on screen.',
      'To represent raw serialization payloads received from network APIs before being mapped into clean domain entities.',
      'To encrypt device hard drives.',
      'To replace Dart isolates.'
    ],
    correctAnswer: 1,
    explanation: 'DTOs reflect the exact JSON schema of external APIs. The repository maps DTOs into domain entity models used by the application.',
    trapWarning: 'DTOs isolate the app domain from external API schema changes.'
  },
  {
    id: 'L4-SYN-10',
    levelId: 4,
    topic: 'Strategy Pattern',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'How is the Strategy Pattern applied in mobile app payment processing?',
    options: [
      'By declaring an abstract PaymentStrategy (with CreditCardPayment and PayPalPayment implementations) passed to a CheckoutEngine.',
      'By writing a 1000-line if-else chain.',
      'By storing credit card details in SharedPreferences.',
      'By deleting failed transactions.'
    ],
    correctAnswer: 0,
    explanation: 'The Strategy Pattern defines a family of interchangeable algorithms (payment methods) behind a common interface, allowing them to be swapped at runtime.',
    trapWarning: 'Strategy pattern replaces giant if-else chains with polymorphic objects.'
  },
  {
    id: 'L4-SYN-11',
    levelId: 4,
    topic: 'State Pattern in Games',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'In game development (e.g. Rock-Paper-Scissors), how does the State Pattern structure game progression?',
    options: [
      'It creates a single global integer variable.',
      'It models game stages (NotStartedState, PlayingState, GameOverState) as polymorphic classes with context-specific action handlers.',
      'It restarts the mobile OS on game over.',
      'It disables user inputs.'
    ],
    correctAnswer: 1,
    explanation: 'The State Pattern encapsulates state-specific behaviors inside distinct state classes, avoiding brittle state flag conditionals.',
    trapWarning: 'State classes handle events according to current phase.'
  },
  {
    id: 'L4-SYN-12',
    levelId: 4,
    topic: 'Adapter Pattern',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What problem does the Adapter Pattern solve in a mobile app?',
    options: [
      'It allows incompatible interfaces to work together by wrapping an existing class with an adapter matching the target interface.',
      'It charges the phone battery.',
      'It converts 2D games to 3D.',
      'It translates Dart code to Python.'
    ],
    correctAnswer: 0,
    explanation: 'The Adapter Pattern acts as a bridge between two incompatible interfaces, translating calls from one contract to another.',
    trapWarning: 'Adapter bridges incompatible APIs.'
  },
  {
    id: 'L4-SYN-13',
    levelId: 4,
    topic: 'Clean Architecture Layers',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'In Clean Architecture for mobile apps, what are the three canonical layers from outermost to innermost?',
    options: [
      'Presentation (UI/Controllers) -> Domain (Entities/Use Cases) -> Data (Repositories/DataSources)',
      'Data -> Presentation -> Domain',
      'Database -> Network -> Screen',
      'All code in one file'
    ],
    correctAnswer: 0,
    explanation: 'Clean Architecture structures apps into Presentation (UI), Domain (pure business entities and use cases), and Data (concrete repository implementations).',
    trapWarning: 'Domain layer has zero dependencies on Flutter UI frameworks.'
  },
  {
    id: 'L4-SYN-14',
    levelId: 4,
    topic: 'Testing Repository with Fakes',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'In testing terminology, what is a "Fake" repository?',
    options: [
      'A broken class that throws errors.',
      'A working implementation with a shortcut (such as an in-memory list or map) that behaves like a real database without disk or network I/O.',
      'A class that generates random numbers.',
      'A deleted file.'
    ],
    correctAnswer: 1,
    explanation: 'A Fake is a lightweight working implementation (e.g. MemoryCounterRepository) that stores state in RAM, enabling realistic integration tests without network dependencies.',
    trapWarning: 'Fakes have working business logic, unlike simple Mocks that return pre-programmed responses.'
  },
  {
    id: 'L4-SYN-15',
    levelId: 4,
    topic: 'Open/Closed Principle',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'What does the Open/Closed Principle (the "O" in SOLID) mandate?',
    options: [
      'Software entities should be open for extension, but closed for modification.',
      'All source code must be open source.',
      'Files must be closed after reading.',
      'Classes cannot be extended.'
    ],
    correctAnswer: 0,
    explanation: 'Open/Closed Principle states that you should be able to add new functionality (via new subclasses or implementations) without modifying existing, tested code.',
    trapWarning: 'Adding new features by extending interfaces rather than editing existing classes.'
  },
  {
    id: 'L4-SYN-16',
    levelId: 4,
    topic: 'Liskov Substitution Principle',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'What does the Liskov Substitution Principle (LSP) require in object-oriented hierarchies?',
    options: [
      'Subtypes must be substitutable for their base types without altering the correctness of the program.',
      'All subclasses must have unique method names.',
      'Subclasses must override every method with empty implementations.',
      'Classes cannot have more than one subclass.'
    ],
    correctAnswer: 0,
    explanation: 'LSP requires that code expecting a base type (e.g. NewsRepository) must function correctly without crashes when passed any subclass (e.g. NewsBackendRepository).',
    trapWarning: 'Subclasses must honor the behavioral contracts of their parent classes.'
  },
  {
    id: 'L4-SYN-17',
    levelId: 4,
    topic: 'Interface Segregation Principle',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What does the Interface Segregation Principle (ISP) state?',
    options: [
      'Clients should not be forced to depend on interfaces they do not use (prefer small, role-specific interfaces over fat interfaces).',
      'Interfaces must contain at least 10 methods.',
      'Every interface must be placed in a separate package.',
      'Classes can only implement one interface.'
    ],
    correctAnswer: 0,
    explanation: 'ISP advocates for focused, client-specific interfaces rather than giant general-purpose interfaces that force classes to implement irrelevant methods.',
    trapWarning: 'Break fat interfaces into cohesive, small contracts.'
  },
  {
    id: 'L4-SYN-18',
    levelId: 4,
    topic: 'Lazy vs Eager Singleton Initialization',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'When does a top-level or static variable initialize in Dart?',
    options: [
      'At application boot time, before main() starts.',
      'Lazily upon its first access in the code.',
      'Never, unless initialized inside main().',
      'When the garbage collector runs.'
    ],
    correctAnswer: 1,
    explanation: 'In Dart, top-level and static variables are initialized lazily upon first read. This means a static final _instance = Class._internal(); is created only when first accessed, providing automatic lazy initialization.',
    trapWarning: 'Dart static variables are inherently lazy initialized.'
  },
  {
    id: 'L4-SYN-19',
    levelId: 4,
    topic: 'Inversion of Control (IoC)',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'How does Inversion of Control (IoC) apply to the Flutter widget lifecycle?',
    options: [
      'The Flutter framework calls your widget lifecycle methods (initState, build, dispose) instead of your code calling the framework directly (the "Hollywood Principle": Don\'t call us, we\'ll call you).',
      'You manually call build() in a while loop.',
      'Widgets invert screen orientation.',
      'IoC is not used in Flutter.'
    ],
    correctAnswer: 0,
    explanation: 'Frameworks embody IoC: the framework controls the main loop and lifecycle, invoking client code hooks when appropriate.',
    trapWarning: 'In Flutter, the framework controls execution flow, calling your build() method.'
  },
  {
    id: 'L4-SYN-20',
    levelId: 4,
    topic: 'Composite Pattern in Flutter',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'How does Flutter\'s Widget tree embody the Composite Design Pattern?',
    options: [
      'Both individual leaf components (Text, Icon) and composite containers (Row, Column, Stack) share the common Widget interface, allowing nested hierarchical trees to be treated uniformly.',
      'Widgets are composed of C++ shaders.',
      'All widgets must be stateful.',
      'It combines multiple isolates.'
    ],
    correctAnswer: 0,
    explanation: 'The Composite Pattern treats individual objects and compositions of objects uniformly. In Flutter, both single leaf widgets and layout containers are Widgets.',
    trapWarning: 'The widget tree is a classic Composite pattern structure.'
  },
  {
    id: 'L4-SYN-21',
    levelId: 4,
    topic: 'Facade Pattern in Mobile',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What is the role of a Facade Pattern in a Flutter application?',
    options: [
      'Providing a simplified, unified high-level interface to a complex subsystem (e.g. an AuthService facade simplifying Firebase, OAuth, and Token storage).',
      'Building 3D graphics.',
      'Creating multiple splash screens.',
      'Encrypting passwords.'
    ],
    correctAnswer: 0,
    explanation: 'A Facade wraps complex low-level subsystems behind a clean, simple high-level API for presentation consumers.',
    trapWarning: 'Facade simplifies access to complex underlying systems.'
  },
  {
    id: 'L4-SYN-22',
    levelId: 4,
    topic: 'Command Pattern in Flutter',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'How is the Command Pattern utilized in undo/redo functionality in mobile apps?',
    options: [
      'Each user action is encapsulated into an object implementing execute() and undo(), stored on a history stack.',
      'By taking continuous screenshots of the screen.',
      'By restarting the app.',
      'By deleting state.'
    ],
    correctAnswer: 0,
    explanation: 'The Command Pattern encapsulates requests as objects, allowing parameterization of actions, queuing, and undoable operations.',
    trapWarning: 'Command pattern enables undo/redo queues.'
  },
  {
    id: 'L4-SYN-23',
    levelId: 4,
    topic: 'Template Method Pattern',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'Where is the Template Method Pattern seen in the Flutter framework?',
    options: [
      'In State, where the framework defines the skeleton lifecycle algorithm, while subclasses override specific template steps like build() and initState().',
      'In pubspec.yaml templates.',
      'In Dart test groups.',
      'In string templates.'
    ],
    correctAnswer: 0,
    explanation: 'Template Method defines the program skeleton in an algorithm, deferring concrete steps (like widget build()) to subclasses.',
    trapWarning: 'State.build() is a classic template method implementation.'
  },
  {
    id: 'L4-SYN-24',
    levelId: 4,
    topic: 'Null Object Pattern',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What is the advantage of using a Null Object Pattern (e.g. EmptyUser instead of null)?',
    options: [
      'It provides a neutral default behavior that avoids defensive null-check conditionals throughout client code.',
      'It increases memory consumption.',
      'It stops garbage collection.',
      'It disables sound null safety.'
    ],
    correctAnswer: 0,
    explanation: 'Null Objects implement the expected interface with no-op behavior, eliminating null checks in caller code.',
    trapWarning: 'Null Object pattern provides safe default behavior without null checks.'
  },
  {
    id: 'L4-SYN-25',
    levelId: 4,
    topic: 'Mediator Pattern in State Management',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'How does a state manager (like Bloc or Riverpod) act as a Mediator in Flutter?',
    options: [
      'It encapsulates how a set of widgets interact, preventing widgets from referring to each other explicitly and enabling loose coupling.',
      'It connects to Bluetooth devices.',
      'It compiles shaders.',
      'It encrypts local storage.'
    ],
    correctAnswer: 0,
    explanation: 'The Mediator Pattern centralizes complex communications between disparate widgets, reducing direct widget-to-widget dependencies.',
    trapWarning: 'Mediators coordinate communication among multiple components.'
  }
];
