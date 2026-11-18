import { Question } from '../../types';

export const LEVEL_8_QUESTIONS: Question[] = [
  // --- AUTHENTIC PROFESSOR EXAM QUESTIONS ---
  {
    id: 'Q-05',
    levelId: 8,
    topic: 'FutureBuilder in build() Anti-Pattern',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.5',
    type: 'runtime-error-analysis',
    difficulty: 'trap',
    prompt: 'Consider the following Flutter widget code:\n\n@override\nWidget build(BuildContext context) {\n  return Scaffold(\n    body: FutureBuilder<List<News>>(\n      future: getNews(), // Note: getNews() returns a new Future<List<News>>\n      builder: (context, snapshot) {\n        if (snapshot.hasData) {\n          return ListView(...);\n        }\n        return CircularProgressIndicator();\n      },\n    ),\n  );\n}\n\nWhat critical architectural issue is present in this implementation?',
    options: [
      'FutureBuilder cannot accept generic type parameters like <List<News>>.',
      'Calling getNews() directly inside the build() method creates a new Future on every widget rebuild, causing repeated redundant network requests and an infinite refetch loop when the widget rebuilds.',
      'ListView cannot be returned inside a FutureBuilder builder.',
      'The code fails to compile because snapshot.data must be checked before snapshot.hasData.'
    ],
    correctAnswer: 1,
    explanation: 'The build() method executes frequently. Instantiating a new Future directly inside build() means that every time the Future completes, FutureBuilder calls setState(), which re-runs build(), instantiating yet another Future, triggering a fatal infinite network refetch loop! The Future MUST be initialized once in initState() and cached in a state field.',
    trapWarning: 'Prof. Bouchrika\'s number one exam trap. NEVER call future-returning functions directly inside the build() method!'
  },
  {
    id: 'Q-06',
    levelId: 8,
    topic: 'setState() Inside FutureBuilder Builder',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.6',
    type: 'runtime-error-analysis',
    difficulty: 'trap',
    prompt: 'What occurs if a developer calls "setState(() { ... })" synchronously inside the "builder" callback function of a FutureBuilder?',
    options: [
      'The widget re-renders smoothly with the newly updated state.',
      'Flutter ignores the setState call without warning.',
      'Flutter throws a runtime framework exception: setState() or markNeedsBuild() called during build.',
      'The application terminates immediately with an unhandled OutOfMemoryError.'
    ],
    correctAnswer: 2,
    explanation: 'When the builder callback runs, Flutter is actively executing the current build pass. Requesting a new rebuild by calling setState() during an active build pass violates framework invariants and throws "setState() or markNeedsBuild() called during build".',
    trapWarning: 'Never invoke setState() synchronously inside a widget\'s build() or builder callback.'
  },
  {
    id: 'Q-24',
    levelId: 8,
    topic: 'Timer.periodic Lifecycle Memory Leak',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.24',
    type: 'runtime-error-analysis',
    difficulty: 'trap',
    prompt: 'A developer initiates a Timer.periodic inside initState() of a StatefulWidget to poll a server every 5 seconds. What happens if they forget to cancel the timer in the dispose() method when the user navigates away from the screen?',
    options: [
      'Flutter automatically cancels all active timers when a screen is popped.',
      'The timer continues firing in the background Dart event loop, wasting CPU/network resources and triggering setState() on an unmounted widget, causing runtime exceptions and memory leaks.',
      'The app crashes immediately upon calling Navigator.pop().',
      'The timer pauses and resumes when the screen is revisited.'
    ],
    correctAnswer: 1,
    explanation: 'Dart Timers belong to the Dart runtime event loop, independent of the Flutter widget tree. Popping a screen destroys the widget Element, but does NOT stop event loop timers. If the timer invokes setState(), it throws "setState() called after dispose()". All timers MUST be canceled in dispose().',
    trapWarning: 'Always cancel timers in dispose() using _timer?.cancel().'
  },

  // --- LAB CONTEXT & LECTURE DERIVED ---
  {
    id: 'L8-LAB-01',
    levelId: 8,
    topic: 'Async Login State Management (LAB-13)',
    source: 'original-lab',
    sourceRef: 'mobile.pdf p.40 (LAB-13)',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'In LAB-13 (Async Login Flow without FutureBuilder), how is loading state managed manually?',
    options: [
      'By toggling a boolean "bool _isLoading = true;" inside setState() before awaiting the async network call, and setting it to false in a finally block after checking mounted.',
      'By freezing the main thread using sleep().',
      'By creating a new Isolate for every button click.',
      'By turning off the phone display.'
    ],
    correctAnswer: 0,
    explanation: 'Manual async state toggles a loading indicator boolean before the async operation and clears it upon completion, guarded by "if (mounted)" to avoid errors on popped widgets.',
    trapWarning: 'Always use try/finally with if (mounted) when managing async state manually.'
  },
  {
    id: 'L8-LAB-02',
    levelId: 8,
    topic: 'FutureBuilder API Integration (LAB-14)',
    source: 'original-lab',
    sourceRef: 'mobile.pdf p.41 (LAB-14)',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'In LAB-14, which snapshot check correctly distinguishes between a request in progress versus a completed request with null data?',
    options: [
      'snapshot.connectionState == ConnectionState.waiting vs snapshot.hasData',
      'snapshot.data == null for both',
      'snapshot.isDone',
      'snapshot.loading'
    ],
    correctAnswer: 0,
    explanation: 'Checking snapshot.connectionState == ConnectionState.waiting identifies that the network request is currently in-flight. snapshot.hasData checks if data arrived.',
    trapWarning: 'Do not rely solely on snapshot.data == null to check loading state; check ConnectionState.waiting.'
  },
  {
    id: 'L8-LEC-01',
    levelId: 8,
    topic: 'The Cafeteria Buzzer Metaphor',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L6 Slide 415',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'In Prof. Bouchrika\'s "Cafeteria Buzzer" metaphor for FutureBuilder, what does "The buzzer starts vibrating" represent?',
    options: [
      'The widget has been disposed.',
      'The Future has completed with data or an error in the background, notifying the framework that snapshot data is ready.',
      'A compilation error has occurred.',
      'The phone has run out of memory.'
    ],
    correctAnswer: 1,
    explanation: 'Slide 415: Ordering at cashier = instantiating Future; Waiting at table with buzzer = waiting state with spinner; Buzzer vibrating = Future completes; Picking up meal = rendering snapshot.data.',
    trapWarning: 'The Cafeteria Buzzer is Prof. Bouchrika\'s signature FutureBuilder mental model.'
  },
  {
    id: 'L8-LEC-02',
    levelId: 8,
    topic: 'Event Loop: Microtasks vs Event Queue',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L3 Slide 138',
    type: 'output-prediction',
    difficulty: 'hard',
    prompt: 'In what order are the following queues processed in the Dart Event Loop?\n\n1. Event Queue (I/O, timers, gestures)\n2. Synchronous code in main()\n3. Microtask Queue (scheduleMicrotask)',
    options: [
      '2 -> 3 -> 1 (Synchronous code executes first, then entire Microtask Queue empties, then Event Queue items are processed one by one)',
      '1 -> 2 -> 3',
      '3 -> 1 -> 2',
      'All 3 queues execute simultaneously on 3 threads'
    ],
    correctAnswer: 0,
    explanation: 'Dart is single-threaded. Synchronous code runs to completion first. Next, the microtask queue is drained completely. Only then does the event loop process the next event from the event queue.',
    trapWarning: 'Microtasks ALWAYS have strict priority over the Event Queue!'
  },
  {
    id: 'L8-LEC-03',
    levelId: 8,
    topic: 'Isolates vs async/await',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L3 Slide 150',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'When should Isolate.run() be used instead of standard async/await in Flutter?',
    options: [
      'For heavy CPU-bound computations (such as image filtering or parsing 10MB JSON) that would otherwise block the UI thread and drop animation frames.',
      'For simple HTTP get requests.',
      'To display a Text widget.',
      'Isolates are deprecated in Flutter.'
    ],
    correctAnswer: 0,
    explanation: 'async/await handles non-blocking I/O waiting on the single main thread. CPU-intensive loops or heavy JSON parsing on the main thread cause UI jank (frame drops). Isolates run on separate CPU threads with isolated memory.',
    trapWarning: 'Use async for I/O waiting; use Isolates for heavy CPU computations.'
  },

  // --- GENERATED PRACTICE QUESTIONS ---
  {
    id: 'L8-SYN-01',
    levelId: 8,
    topic: 'Event Loop Output Order',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'hard',
    prompt: 'What is the exact console output of this Dart program?\n\nvoid main() {\n  print("A");\n  Future(() => print("B"));\n  scheduleMicrotask(() => print("C"));\n  print("D");\n}',
    options: [
      'A, B, C, D',
      'A, D, C, B',
      'A, C, D, B',
      'C, A, D, B'
    ],
    correctAnswer: 1,
    explanation: '(1) Synchronous prints run first: "A", then "D". (2) Microtask runs before event queue: "C". (3) Event queue runs: "B". Output: A, D, C, B.',
    trapWarning: 'Synchronous first, Microtask second, Event queue last.'
  },
  {
    id: 'L8-SYN-02',
    levelId: 8,
    topic: 'Future.delayed Zero Duration',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'medium',
    prompt: 'What is printed by: \n\nprint("1");\nFuture.delayed(Duration.zero, () => print("2"));\nprint("3");',
    options: [
      '1, 2, 3',
      '1, 3, 2',
      '2, 1, 3',
      '1, 2'
    ],
    correctAnswer: 1,
    explanation: 'Even with Duration.zero, Future.delayed schedules its callback onto the Event Queue, executing only after the current synchronous frame finishes ("1", "3", then "2").',
    trapWarning: 'Duration.zero still defers to the Event Queue!'
  },
  {
    id: 'L8-SYN-03',
    levelId: 8,
    topic: 'RefreshIndicator onRefresh Contract',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'What must the onRefresh callback of a RefreshIndicator widget return?',
    options: [
      'void',
      'Future<void> that completes when data refresh finishes',
      'bool indicating refresh success',
      'int status code'
    ],
    correctAnswer: 1,
    explanation: 'The onRefresh callback must return a Future<void>. RefreshIndicator displays its pull-down spinner until that returned Future completes.',
    trapWarning: 'onRefresh must return a Future; returning void leaves the spinner hanging indefinitely.'
  },
  {
    id: 'L8-SYN-04',
    levelId: 8,
    topic: 'http.get Response Status Check',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'easy',
    prompt: 'In package:http, what property verifies a successful HTTP 200 OK response?',
    options: [
      'response.statusCode == 200',
      'response.isSuccess == true',
      'response.status == "OK"',
      'response.hasData'
    ],
    correctAnswer: 0,
    explanation: 'The Response object from package:http provides statusCode (e.g. 200 for OK, 404 for Not Found, 500 for Server Error).',
    trapWarning: 'response.statusCode == 200 checks HTTP status.'
  },
  {
    id: 'L8-SYN-05',
    levelId: 8,
    topic: 'Future.wait Parallel Requests',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'How do you execute three independent network requests (fetchUsers, fetchProducts, fetchOrders) in parallel and await all results?',
    options: [
      'await Future.wait([fetchUsers(), fetchProducts(), fetchOrders()]);',
      'await fetchUsers(); await fetchProducts(); await fetchOrders();',
      'Future.all(fetchUsers, fetchProducts);',
      'Parallel.run([fetchUsers, fetchProducts]);'
    ],
    correctAnswer: 0,
    explanation: 'Future.wait([...]) initiates all futures concurrently and returns a single Future that resolves when all supplied futures complete.',
    trapWarning: 'Awaiting sequentially is slow; Future.wait executes in parallel.'
  },
  {
    id: 'L8-SYN-06',
    levelId: 8,
    topic: 'StreamBuilder vs FutureBuilder',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What is the key difference between StreamBuilder and FutureBuilder in Flutter?',
    options: [
      'FutureBuilder handles a single asynchronous event that resolves once; StreamBuilder listens to multiple continuous events emitted over time (e.g. websockets, sensors).',
      'StreamBuilder can only display images.',
      'FutureBuilder is deprecated.',
      'StreamBuilder cannot handle errors.'
    ],
    correctAnswer: 0,
    explanation: 'A Future resolves once with a single value or error. A Stream emits multiple sequential data events over time, rebuilding StreamBuilder on each emission.',
    trapWarning: 'Future: single resolution; Stream: multiple events over time.'
  },
  {
    id: 'L8-SYN-07',
    levelId: 8,
    topic: 'unawaited Keyword / lint',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What is the purpose of the unawaited() function from dart:async?',
    options: [
      'It explicitly indicates that a Future is intentionally not awaited, silencing compiler/linter warnings about unawaited futures.',
      'It cancels a future.',
      'It pauses the isolate.',
      'It deletes a network request.'
    ],
    correctAnswer: 0,
    explanation: 'unawaited(future) explicitly signals that fire-and-forget execution is intended, suppressing the unawaited_futures linter rule.',
    trapWarning: 'unawaited explicitly signals intentional fire-and-forget futures.'
  },
  {
    id: 'L8-SYN-08',
    levelId: 8,
    topic: 'Future.value Optimization',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'easy',
    prompt: 'How do you return an immediate, already-resolved Future containing the integer 42 without waiting for the next event loop tick?',
    options: [
      'Future.value(42)',
      'Future.instant(42)',
      'Future.now(42)',
      '42 as Future<int>'
    ],
    correctAnswer: 0,
    explanation: 'Future.value(val) creates a completed future containing the supplied value.',
    trapWarning: 'Future.value returns an already resolved future.'
  },
  {
    id: 'L8-SYN-09',
    levelId: 8,
    topic: 'Future.error',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'How do you construct a Future that completes immediately with an error?',
    options: [
      'Future.error(Exception("Failed"))',
      'Future.throw(Exception("Failed"))',
      'Future.fail(Exception("Failed"))',
      'throw Future(Exception("Failed"))'
    ],
    correctAnswer: 0,
    explanation: 'Future.error(error) creates a future that completes with an error, triggering catchError() or snapshot.hasError in FutureBuilder.',
    trapWarning: 'Future.error creates an errored future.'
  },
  {
    id: 'L8-SYN-10',
    levelId: 8,
    topic: 'snapshot.hasError Handling',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'easy',
    prompt: 'In FutureBuilder builder callback, what should be rendered if snapshot.hasError is true?',
    options: [
      'An error visual state (e.g. Text("Error: \${snapshot.error}") with a retry button).',
      'CircularProgressIndicator()',
      'An empty Container and crash silently.',
      'Navigator.pop()'
    ],
    correctAnswer: 0,
    explanation: 'Proper defensive UI handles error states explicitly by checking snapshot.hasError and providing feedback or retry options.',
    trapWarning: 'Always check snapshot.hasError before rendering data.'
  },
  {
    id: 'L8-SYN-11',
    levelId: 8,
    topic: 'Timer.run()',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'medium',
    prompt: 'What does Timer.run(() => print("Hello")) do?',
    options: [
      'Runs the callback asynchronously on the Event Queue as soon as possible.',
      'Runs the callback on an infinite loop.',
      'Pauses the app for 10 seconds.',
      'Creates a new isolate.'
    ],
    correctAnswer: 0,
    explanation: 'Timer.run(callback) is equivalent to Timer(Duration.zero, callback), scheduling the closure onto the event queue.',
    trapWarning: 'Timer.run schedules onto the event queue.'
  },
  {
    id: 'L8-SYN-12',
    levelId: 8,
    topic: 'async* and yield',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'In Dart, what does a function marked "async*" return?',
    options: [
      'A Stream<T> that emits values using the "yield" keyword.',
      'A Future<T>.',
      'An Iterable<T>.',
      'void.'
    ],
    correctAnswer: 0,
    explanation: 'Functions marked "async*" are asynchronous generators that return a Stream<T> and emit successive values using "yield".',
    trapWarning: 'async returns Future; async* returns Stream using yield.'
  },
  {
    id: 'L8-SYN-13',
    levelId: 8,
    topic: 'sync* and yield',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'What does a function marked "sync*" return in Dart?',
    options: [
      'A synchronous lazy Iterable<T>.',
      'A Stream<T>.',
      'A Future<T>.',
      'A List<T>.'
    ],
    correctAnswer: 0,
    explanation: 'A "sync*" function is a synchronous generator returning a lazy Iterable<T>.',
    trapWarning: 'sync* returns lazy Iterable; async* returns Stream.'
  },
  {
    id: 'L8-SYN-14',
    levelId: 8,
    topic: 'Future timeout() Method',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'How do you guard a network call from hanging indefinitely if the server does not respond within 5 seconds?',
    options: [
      'http.get(url).timeout(Duration(seconds: 5))',
      'http.get(url, timeout: 5000)',
      'Timer.timeout(5, () => http.get(url))',
      'Isolate.timeout(5)'
    ],
    correctAnswer: 0,
    explanation: 'The timeout() method on Future throws a TimeoutException if the underlying future fails to resolve within the specified Duration.',
    trapWarning: 'future.timeout() prevents infinite network hangs.'
  },
  {
    id: 'L8-SYN-15',
    levelId: 8,
    topic: 'Isolate Message Passing',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'How do Dart Isolates communicate with each other?',
    options: [
      'By sending messages through SendPort and ReceivePort (pass-by-value message passing), having completely isolated memory heaps.',
      'Through shared memory pointers and mutex locks.',
      'Via SharedPreferences.',
      'Through local HTTP sockets.'
    ],
    correctAnswer: 0,
    explanation: 'Isolates do NOT share mutable memory. They communicate strictly via message passing over SendPort and ReceivePort.',
    trapWarning: 'Isolates have isolated memory heaps; communication is via message passing.'
  },
  {
    id: 'L8-SYN-16',
    levelId: 8,
    topic: 'Completer<T> in Dart',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'hard',
    prompt: 'When is a Completer<T> useful in Dart?',
    options: [
      'When you need to manually produce and resolve a Future from legacy event listeners or callback-based APIs.',
      'To speed up CPU clock speed.',
      'To compile Dart to WebAssembly.',
      'To delete a Future.'
    ],
    correctAnswer: 0,
    explanation: 'Completer<T> allows developers to create a Future and manually trigger its completion (completer.complete(val) or completer.completeError(e)).',
    trapWarning: 'Completer bridges callback-based APIs with Future-based async/await.'
  },
  {
    id: 'L8-SYN-17',
    levelId: 8,
    topic: 'FutureBuilder initialData',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'What does the "initialData" parameter do on FutureBuilder?',
    options: [
      'It provides placeholder data available in snapshot.data before the Future resolves, causing snapshot.hasData to be true from the first build.',
      'It cancels the network request.',
      'It replaces the Future.',
      'It sets the database password.'
    ],
    correctAnswer: 0,
    explanation: 'initialData populates snapshot.data with default data while the future is still in-flight.',
    trapWarning: 'initialData makes snapshot.hasData true even while waiting.'
  },
  {
    id: 'L8-SYN-18',
    levelId: 8,
    topic: 'StreamSubscription cancel() in dispose()',
    source: 'generated',
    type: 'runtime-error-analysis',
    difficulty: 'hard',
    prompt: 'What happens if a StreamSubscription created via stream.listen() is NOT canceled in dispose()?',
    options: [
      'The listener remains active in memory, processing incoming events and calling callbacks on disposed widgets, causing memory leaks.',
      'Flutter automatically cancels it when the widget unmounts.',
      'The phone disconnects from WiFi.',
      'Compilation error.'
    ],
    correctAnswer: 0,
    explanation: 'Stream subscriptions are independent of widget lifecycles. Failing to call subscription.cancel() in dispose() leaks memory and triggers zombie callbacks.',
    trapWarning: 'Always call _subscription?.cancel() inside dispose().'
  },
  {
    id: 'L8-SYN-19',
    levelId: 8,
    topic: 'Future.forEach Sequential Execution',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'hard',
    prompt: 'How does Future.forEach differ from Future.wait in Dart?',
    options: [
      'Future.forEach processes elements sequentially one-by-one, waiting for each future to complete before starting the next; Future.wait executes all in parallel.',
      'Future.forEach is faster.',
      'Future.wait only works with numbers.',
      'There is no difference.'
    ],
    correctAnswer: 0,
    explanation: 'Future.forEach iterates serially, executing each async action after the preceding action finishes. Future.wait executes all tasks concurrently.',
    trapWarning: 'Future.forEach is serial; Future.wait is parallel.'
  },
  {
    id: 'L8-SYN-20',
    levelId: 8,
    topic: 'StreamController broadcast',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'When must a StreamController.broadcast() be used instead of a default StreamController()?',
    options: [
      'When multiple listeners need to subscribe to the same stream simultaneously (default streams only allow a single listener).',
      'When streaming audio files.',
      'When running on TV screens.',
      'Broadcast is deprecated.'
    ],
    correctAnswer: 0,
    explanation: 'Default Dart streams are single-subscription (subscribing twice throws StateError: Stream has already been listened to). Broadcast streams allow multiple listeners.',
    trapWarning: 'Default streams only allow ONE listener; use .broadcast() for multiple listeners.'
  },
  {
    id: 'L8-SYN-21',
    levelId: 8,
    topic: 'await for in Dart',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'hard',
    prompt: 'How do you loop over events emitted by a Stream<int> sequentially inside an async function?',
    options: [
      'await for (var event in stream) { print(event); }',
      'for (var event in await stream) { print(event); }',
      'stream.forEachSync((e) => print(e));',
      'while (stream.hasNext()) { print(stream.next()); }'
    ],
    correctAnswer: 0,
    explanation: '"await for (var item in stream)" is Dart\'s asynchronous loop syntax that pauses execution until the stream emits the next event.',
    trapWarning: '"await for" consumes asynchronous streams.'
  },
  {
    id: 'L8-SYN-22',
    levelId: 8,
    topic: 'Isolate.spawn vs compute / Isolate.run',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'Why is modern Isolate.run(() => heavyCalc()) preferred over legacy Isolate.spawn() in Flutter?',
    options: [
      'Isolate.run abstracts away manual SendPort/ReceivePort setup, spawning an isolate, running the closure, returning the result, and terminating the isolate automatically.',
      'Isolate.spawn cannot use RAM.',
      'Isolate.run runs on GPU.',
      'Isolate.spawn is forbidden in Android.'
    ],
    correctAnswer: 0,
    explanation: 'Isolate.run() (introduced in Dart 2.19) provides simple, high-level single-shot isolate execution without port boilerplate.',
    trapWarning: 'Isolate.run() eliminates port boilerplate for CPU tasks.'
  },
  {
    id: 'L8-SYN-23',
    levelId: 8,
    topic: 'async void Trap',
    source: 'generated',
    type: 'runtime-error-analysis',
    difficulty: 'trap',
    prompt: 'Why does Prof. Bouchrika strongly warn against declaring functions as "void asyncMethod() async" instead of "Future<void> asyncMethod() async"?',
    options: [
      'Returning void prevents the caller from using "await" or catching exceptions thrown by the async method, leading to unhandled background exceptions.',
      'void functions cannot use print.',
      'It causes a compilation error in all Dart versions.',
      'void functions freeze the isolate.'
    ],
    correctAnswer: 0,
    explanation: 'A function marked "void" cannot be awaited by callers. Any exceptions thrown after an asynchronous suspension point become uncatchable uncaught exceptions.',
    trapWarning: 'Avoid "void async" (except top-level UI callbacks); always return Future<void>!'
  },
  {
    id: 'L8-SYN-24',
    levelId: 8,
    topic: 'Microtask vs Event Loop Starvation',
    source: 'generated',
    type: 'runtime-error-analysis',
    difficulty: 'hard',
    prompt: 'What occurs if a recursive function schedules microtasks continuously without stopping?\n\nvoid starve() { scheduleMicrotask(starve); }',
    options: [
      'The Event Queue is completely starved: UI rendering, gestures, and timers freeze indefinitely because Dart drains all microtasks before checking the Event Queue.',
      'The microtasks run on another thread and have no impact.',
      'Dart automatically kills the microtasks after 1 second.',
      'The phone reboots immediately.'
    ],
    correctAnswer: 0,
    explanation: 'Because the Dart Event Loop prioritizes the Microtask Queue until empty, an infinite chain of microtasks starves the Event Queue, freezing all UI repaints and user input.',
    trapWarning: 'Infinite microtasks starve the event queue and freeze the app.'
  },
  {
    id: 'L8-SYN-25',
    levelId: 8,
    topic: 'FutureBuilder with null Future',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What is the snapshot state of a FutureBuilder if its "future" parameter is passed as null?',
    options: [
      'snapshot.connectionState == ConnectionState.none and snapshot.data is null (or initialData)',
      'It throws a NullPointerException immediately.',
      'It stays in ConnectionState.waiting forever.',
      'It cancels the app.'
    ],
    correctAnswer: 0,
    explanation: 'If future is null, FutureBuilder enters ConnectionState.none, representing an inactive state where no asynchronous operation is pending.',
    trapWarning: 'ConnectionState.none indicates a null or uninitialized Future.'
  },
  {
    id: 'L8-SYN-26',
    levelId: 8,
    topic: 'Network Image Caching (cached_network_image)',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'Why is the cached_network_image package used in production Flutter apps instead of standard Image.network?',
    options: [
      'It caches images to the local device disk and memory, avoiding re-downloading the same image on every scroll or screen visit and providing placeholder/error widgets.',
      'Image.network is banned in the App Store.',
      'cached_network_image is only for GIFs.',
      'It makes images 3D.'
    ],
    correctAnswer: 0,
    explanation: 'Image.network re-fetches or relies on HTTP cache headers. cached_network_image provides robust disk caching and placeholder spinners.',
    trapWarning: 'cached_network_image provides offline disk caching and placeholders.'
  }
];
