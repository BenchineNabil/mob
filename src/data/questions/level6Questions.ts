import { Question } from '../../types';

export const LEVEL_6_QUESTIONS: Question[] = [
  // --- AUTHENTIC PROFESSOR EXAM QUESTIONS ---
  {
    id: 'Q-11',
    levelId: 6,
    topic: 'State Initialization Inside build()',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.11',
    type: 'runtime-error-analysis',
    difficulty: 'trap',
    prompt: 'In a two-player game widget, the developer writes:\n\nclass _GameState extends State<GameScreen> {\n  @override\n  Widget build(BuildContext context) {\n    int activePlayer = Random().nextInt(2); // 0 or 1\n    return Scaffold(\n      body: Center(child: Text("Player $activePlayer turn")),\n    );\n  }\n}\n\nWhat bug does this produce?',
    options: [
      'The game works properly because activePlayer is randomly chosen.',
      'Every time the widget rebuilds (e.g. on orientation change, keyboard open, or any setState call), activePlayer is re-randomized, causing the current turn to randomly flip unpredictably.',
      'Random() cannot be called inside a Flutter class.',
      'Text widget cannot interpolate integer variables.'
    ],
    correctAnswer: 1,
    explanation: 'The build() method must be a pure, idempotent function. Flutter calls build() frequently. Initializing state or calling random generators inside build() causes state to reset on every rebuild. One-time initializations MUST be placed in initState().',
    trapWarning: 'Never place state initialization or random generators inside build()!'
  },
  {
    id: 'Q-12',
    levelId: 6,
    topic: 'Hardcoded Switch Property Trap',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.12',
    type: 'runtime-error-analysis',
    difficulty: 'trap',
    prompt: 'Consider the following snippet:\n\nbool isNotificationsEnabled = false;\n\nSwitch(\n  value: false,\n  onChanged: (bool newValue) {\n    setState(() {\n      isNotificationsEnabled = newValue;\n    });\n  },\n)\n\nWhat behavior will the user observe when tapping this Switch widget?',
    options: [
      'The switch toggles smoothly between ON and OFF states.',
      'The switch animates momentarily but immediately snaps back to OFF, never visually changing state.',
      'The app crashes with an invalid property error.',
      'The switch permanently disables itself after one tap.'
    ],
    correctAnswer: 1,
    explanation: 'The Switch widget is declarative and controlled. Its visual position strictly mirrors the "value" property passed into it. Because "value: false" is hardcoded rather than bound to "value: isNotificationsEnabled", when setState() rebuilds the widget, Flutter re-renders it with value: false, immediately snapping it back to OFF!',
    trapWarning: 'Controlled widgets must bind their display property directly to the mutable state variable.'
  },
  {
    id: 'Q-13',
    levelId: 6,
    topic: 'Omission of setState() During Mutation',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.13',
    type: 'runtime-error-analysis',
    difficulty: 'trap',
    prompt: 'A developer has an integer variable "int counter = 0;" in a State class. In a button callback, they write:\n\nonPressed: () {\n  counter++;\n}\n\nWhat happens to the application when the button is clicked?',
    options: [
      'The text displaying counter on screen increments immediately.',
      'counter is incremented in RAM, but Flutter does not schedule a build pass, so the screen continues displaying the old value until some other event triggers a rebuild.',
      'The Dart VM throws a StateMutationException.',
      'The button automatically disables itself.'
    ],
    correctAnswer: 1,
    explanation: 'In Flutter, mutating an in-memory variable does NOT notify the framework. Wrapping the mutation in setState(() { counter++; }) is required to mark the widget\'s Element as dirty and schedule a frame rebuild pass.',
    trapWarning: 'Variables in Flutter are not automatically reactive. You MUST call setState() to repaint the screen.'
  },

  // --- LAB CONTEXT & LECTURE DERIVED ---
  {
    id: 'L6-LAB-01',
    levelId: 6,
    topic: 'TextEditingController & dispose()',
    source: 'original-lab',
    sourceRef: 'mobile.pdf p.36 (LAB-09)',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'In LAB-09 (Interactive Palindrome App), why is it mandatory to override the dispose() method when using a TextEditingController?',
    options: [
      'To delete the user\'s typed text from device storage.',
      'Controllers subscribe to platform input channels; failing to call controller.dispose() causes memory leaks and unhandled listener warnings when the widget unmounts.',
      'dispose() sends the text to Google Analytics.',
      'It is not mandatory; Flutter garbage collects controllers automatically.'
    ],
    correctAnswer: 1,
    explanation: 'TextEditingController creates internal listeners. Failing to call _controller.dispose() in the State\'s dispose() method keeps listeners alive, creating memory leaks.',
    trapWarning: 'Always dispose TextEditingControllers, AnimationControllers, and FocusNodes in dispose().'
  },
  {
    id: 'L6-LAB-02',
    levelId: 6,
    topic: 'Snake Game Grid State Modeling',
    source: 'original-lab',
    sourceRef: 'mobile.pdf p.38 (LAB-11)',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'In LAB-11 (Snake Game in Flutter), how is the snake\'s body state and movement across a 20x20 cell grid modeled in State?',
    options: [
      'Using a List<int> of grid cell indices, where each tick adds a new head index and removes the tail index (unless food was eaten).',
      'By taking screenshots of the phone screen.',
      'Using 400 separate Boolean variables.',
      'Using a SharedPreferences file rewritten every 200ms.'
    ],
    correctAnswer: 0,
    explanation: 'A 20x20 grid can be modeled using 400 cell indices (0 to 399). The snake is a List<int> where the last element is the head. On each timer tick, the new head is prepended/appended and the tail index is dropped.',
    trapWarning: 'Clean state modeling separates coordinates from visual rendering.'
  },
  {
    id: 'L6-LEC-01',
    levelId: 6,
    topic: 'Move Colored Square: 2D Matrix State',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L5 Slide 295',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'In the "Move Colored Square" game from Lecture 5, how do directional button handlers maintain boundary safety on a 5x5 grid?',
    options: [
      'By allowing coordinates to exceed grid dimensions.',
      'By guarding mutations with boundary checks: "if (col < 4) setState(() => col++);" for moving right.',
      'By throwing an unhandled exception when hitting an edge.',
      'By wrapping coordinates with modulo operations.'
    ],
    correctAnswer: 1,
    explanation: 'Boundary checks ensure coordinates stay within [0, 4] for both row and col, preventing array index overflow errors when rendering the 5x5 matrix.',
    trapWarning: 'Always validate bounds before updating matrix coordinates in game state.'
  },
  {
    id: 'L6-LEC-02',
    levelId: 6,
    topic: 'Water Sort Puzzle: Tube State',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L5 Slide 310',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'In the Water Sort Puzzle from Lecture 5, how is each vessel\'s liquid content represented in Flutter state?',
    options: [
      'As a List<List<Color>>, where each inner list represents the colors stacked vertically in that tube.',
      'As a single float indicating water percentage.',
      'As an image file.',
      'Using an SQLite database.'
    ],
    correctAnswer: 0,
    explanation: 'Each tube is modeled as a List<Color> representing the stacked liquid layers. Validating a pour checks if the destination tube is not full and if its top color matches the source tube\'s top color.',
    trapWarning: 'Top color comparison: tubeA.last == tubeB.last.'
  },
  {
    id: 'L6-LEC-03',
    levelId: 6,
    topic: 'widget.property in State',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L5 Slide 265',
    type: 'code-debugging',
    difficulty: 'easy',
    prompt: 'In a State<MyWidget> class, how do you access a configuration property "title" declared on the parent StatefulWidget MyWidget?',
    options: [
      'this.title',
      'widget.title',
      'parent.title',
      'super.title'
    ],
    correctAnswer: 1,
    explanation: 'The State class provides a "widget" getter that references the currently associated StatefulWidget configuration instance (widget.title).',
    trapWarning: 'Use widget.propertyName to read configuration from the StatefulWidget.'
  },

  // --- GENERATED PRACTICE QUESTIONS ---
  {
    id: 'L6-SYN-01',
    levelId: 6,
    topic: 'createState() Method',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'What is the sole mandatory method that must be overridden in a class extending StatefulWidget?',
    options: [
      'build()',
      'createState()',
      'initState()',
      'setState()'
    ],
    correctAnswer: 1,
    explanation: 'A StatefulWidget only needs to override createState() to instantiate its associated State<T> object. The build() method belongs to the State class.',
    trapWarning: 'build() is on State<T>, not on StatefulWidget.'
  },
  {
    id: 'L6-SYN-02',
    levelId: 6,
    topic: 'initState() Context Constraint',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'Why does calling Theme.of(context) or ModalRoute.of(context) inside initState() produce an error in Flutter?',
    options: [
      'The context is not yet fully configured with inherited widgets when initState() runs.',
      'Theme is deprecated.',
      'initState cannot contain Dart code.',
      'Only StatelessWidgets have context.'
    ],
    correctAnswer: 0,
    explanation: 'During initState(), the element is not yet fully wired into the InheritedWidget tree. Inherited widget dependencies must be accessed in didChangeDependencies() or build().',
    trapWarning: 'Accessing inherited widgets in initState() throws an assertion error; use didChangeDependencies().'
  },
  {
    id: 'L6-SYN-03',
    levelId: 6,
    topic: 'mounted Property Guard',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'Why should asynchronous callbacks guard setState calls with "if (mounted)"?\n\nawait Future.delayed(Duration(seconds: 2));\nif (mounted) setState(() { ... });',
    options: [
      'To check whether the phone is mounted on a car dashboard.',
      'To ensure the widget is still attached to the widget tree; calling setState after the widget has been popped/disposed throws a runtime exception.',
      'mounted increases download speed.',
      'To check if the screen is horizontal.'
    ],
    correctAnswer: 1,
    explanation: 'If a user navigates away before an asynchronous operation finishes, the State object is disposed. Calling setState() on a disposed State throws "setState() called after dispose()". The mounted boolean flag guards against this.',
    trapWarning: 'Always guard async setState calls with "if (mounted)".'
  },
  {
    id: 'L6-SYN-04',
    levelId: 6,
    topic: 'didUpdateWidget Lifecycle',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'When is the didUpdateWidget(covariant T oldWidget) lifecycle method called?',
    options: [
      'Whenever the parent widget rebuilds and passes a new widget configuration with the same runtimeType and key to this State object.',
      'When the phone rotates.',
      'Only once on app startup.',
      'When the widget is disposed.'
    ],
    correctAnswer: 0,
    explanation: 'didUpdateWidget() is called when the parent rebuilds and sends updated parameters. It allows the State object to compare oldWidget properties with the new widget properties and update internal subscriptions.',
    trapWarning: 'Use didUpdateWidget to react to parent parameter changes.'
  },
  {
    id: 'L6-SYN-05',
    levelId: 6,
    topic: 'setState Async Anti-Pattern',
    source: 'generated',
    type: 'compile-or-fail',
    difficulty: 'medium',
    prompt: 'What happens if you pass an asynchronous function to setState()?\n\nsetState(() async {\n  await Future.delayed(Duration(seconds: 1));\n  counter++;\n});',
    options: [
      'It works smoothly and pauses the screen.',
      'It produces a framework assertion error or warning because setState callbacks must be synchronous and return void.',
      'The phone reboots.',
      'Compilation error: async is not a valid keyword.'
    ],
    correctAnswer: 1,
    explanation: 'setState takes a synchronous void Function() callback. Slow asynchronous tasks must run outside setState, with setState called synchronously once the result is ready.',
    trapWarning: 'Never make the callback passed to setState() async!'
  },
  {
    id: 'L6-SYN-06',
    levelId: 6,
    topic: 'Checkbox Controlled State',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'How do you bind a Checkbox to a boolean isChecked in State?',
    options: [
      'Checkbox(value: isChecked, onChanged: (val) => setState(() => isChecked = val ?? false))',
      'Checkbox(checked: true)',
      'Checkbox(onTap: () => isChecked = !isChecked)',
      'Checkbox(initialValue: isChecked)'
    ],
    correctAnswer: 0,
    explanation: 'Checkbox requires binding value: isChecked and updating isChecked inside setState in the onChanged callback.',
    trapWarning: 'Checkbox is a controlled widget; omitting onChanged disables it.'
  },
  {
    id: 'L6-SYN-07',
    levelId: 6,
    topic: 'Tic-Tac-Toe Win Algorithm',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'On a 3x3 Tic-Tac-Toe board modeled as List<String> of 9 elements (indices 0 to 8), which index triplets represent the two diagonals?',
    options: [
      '[0, 4, 8] and [2, 4, 6]',
      '[0, 1, 2] and [6, 7, 8]',
      '[0, 3, 6] and [2, 5, 8]',
      '[1, 4, 7] and [3, 4, 5]'
    ],
    correctAnswer: 0,
    explanation: 'The top-left to bottom-right diagonal spans indices [0, 4, 8]. The top-right to bottom-left diagonal spans [2, 4, 6].',
    trapWarning: '[0, 4, 8] and [2, 4, 6] are the 3x3 diagonal indices.'
  },
  {
    id: 'L6-SYN-08',
    levelId: 6,
    topic: 'Radio Widget Grouping',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'How are multiple Radio widgets grouped together so that selecting one deselects the others?',
    options: [
      'By placing them in a RadioGroup widget.',
      'By sharing the identical "groupValue" binding and having distinct "value" properties.',
      'By setting their color to the same shade.',
      'By giving them the same key.'
    ],
    correctAnswer: 1,
    explanation: 'Radio buttons belong to the same group when they bind to the same groupValue state variable while each has its own distinct value property.',
    trapWarning: 'groupValue binds radio buttons together in Flutter.'
  },
  {
    id: 'L6-SYN-09',
    levelId: 6,
    topic: 'Dynamic Add Item List (CHAL-02)',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'In CHAL-02 (Dynamic Collection Screen), how should input text be validated before adding to the list?',
    options: [
      'Allow empty strings.',
      'Check "if (text.trim().isNotEmpty)" to prevent adding blank or whitespace-only items.',
      'Require text to be at least 100 characters.',
      'Add items directly without checking.'
    ],
    correctAnswer: 1,
    explanation: 'Validating text.trim().isNotEmpty rejects empty inputs and strings consisting solely of spaces, tabs, or newlines.',
    trapWarning: 'trim().isNotEmpty rejects whitespace-only inputs.'
  },
  {
    id: 'L6-SYN-10',
    levelId: 6,
    topic: 'DropdownButton in Flutter',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'What happens if the "value" passed to a DropdownButton does not match any value in its "items" list?',
    options: [
      'It selects the first item automatically.',
      'It throws a runtime assertion error: There should be exactly one item with [DropdownButton]\'s value.',
      'It displays an empty box without errors.',
      'The app closes.'
    ],
    correctAnswer: 1,
    explanation: 'DropdownButton asserts that the current value must match exactly one of the DropdownMenuItem values in its list. If no item matches, Flutter throws an assertion failure.',
    trapWarning: 'Dropdown value must exist in the items list.'
  },
  {
    id: 'L6-SYN-11',
    levelId: 6,
    topic: 'GestureDetector vs InkWell',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'What is the visual difference between GestureDetector and InkWell when tapped?',
    options: [
      'GestureDetector has no visual feedback, while InkWell displays Material ink ripple splash animations (when placed inside a Material ancestor).',
      'GestureDetector is 10x faster.',
      'InkWell only works on iOS.',
      'GestureDetector cannot detect double taps.'
    ],
    correctAnswer: 0,
    explanation: 'InkWell adds Material splash ripple feedback on touch; GestureDetector provides gesture callbacks without any default visual styling.',
    trapWarning: 'InkWell requires a Material ancestor to draw ripples.'
  },
  {
    id: 'L6-SYN-12',
    levelId: 6,
    topic: 'Dismissible Widget in Lists',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'What is mandatory when using a Dismissible widget inside a dynamic ListView?',
    options: [
      'Each Dismissible MUST have a unique Key (e.g. ValueKey(item.id)).',
      'The item must be an image.',
      'The list must be fixed at 10 items.',
      'A database must be connected.'
    ],
    correctAnswer: 0,
    explanation: 'Dismissible requires a unique Key to track which element was swiped and removed from the tree. Failing to provide a unique Key triggers a runtime error.',
    trapWarning: 'Dismissible requires a unique Key for tree reconciliation.'
  },
  {
    id: 'L6-SYN-13',
    levelId: 6,
    topic: 'State Lifting Pattern',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What is "lifting state up" in Flutter?',
    options: [
      'Moving state to the lowest leaf widget.',
      'Moving mutable state to the lowest common ancestor of the widgets that need to read and modify it, passing callbacks down.',
      'Uploading state to an AWS S3 bucket.',
      'Deleting State objects.'
    ],
    correctAnswer: 1,
    explanation: 'When two sibling widgets need to share state, the state is lifted up to their common parent, which passes state down as properties and accepts callbacks.',
    trapWarning: 'Lift state to the lowest common ancestor.'
  },
  {
    id: 'L6-SYN-14',
    levelId: 6,
    topic: 'Rock-Paper-Scissors Win Evaluation (CHAL-01)',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'In CHAL-01 (Rock Paper Scissors), under what condition does the user win a round?',
    options: [
      '(User: Rock & CPU: Scissors) || (User: Paper & CPU: Rock) || (User: Scissors & CPU: Paper)',
      'When user choices match CPU choices.',
      'When CPU chooses Rock.',
      'Always random.'
    ],
    correctAnswer: 0,
    explanation: 'Rock beats Scissors, Paper beats Rock, Scissors beats Paper. All other non-matching combinations result in a CPU win.',
    trapWarning: 'Rock beats Scissors, Paper beats Rock, Scissors beats Paper.'
  },
  {
    id: 'L6-SYN-15',
    levelId: 6,
    topic: 'AnimatedContainer vs Container',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'How does AnimatedContainer differ from a standard Container when its color or size changes in setState?',
    options: [
      'AnimatedContainer automatically interpolates and smoothly animates between old and new property values over the specified "duration".',
      'AnimatedContainer requires an AnimationController.',
      'It runs on a separate GPU thread.',
      'It cannot change color.'
    ],
    correctAnswer: 0,
    explanation: 'AnimatedContainer is an implicit animation widget. Whenever properties change, it automatically animates the transition over the given duration and curve.',
    trapWarning: 'Implicit animation widgets handle tweens automatically.'
  },
  {
    id: 'L6-SYN-16',
    levelId: 6,
    topic: 'GlobalKey vs UniqueKey',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'When should a GlobalKey be used instead of a local Key (ValueKey, UniqueKey)?',
    options: [
      'When you need to access a widget\'s State from an external widget or preserve state across tree movements.',
      'For every widget in the application.',
      'Only for Text widgets.',
      'Never, GlobalKeys are deprecated.'
    ],
    correctAnswer: 0,
    explanation: 'GlobalKeys allow code to obtain a reference to a State object across tree boundaries (e.g. _formKey.currentState) and preserve state across subtree reparenting.',
    trapWarning: 'GlobalKeys are expensive; use them only when external state access or reparenting is required.'
  },
  {
    id: 'L6-SYN-17',
    levelId: 6,
    topic: 'Draggable and DragTarget',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'In interactive games (like card sorting or puzzle games), which pair of Flutter widgets facilitates drag-and-drop interactions?',
    options: [
      'Draggable<T> and DragTarget<T>',
      'TouchMove and TouchDrop',
      'MouseFollower and CatchTarget',
      'Swipeable and Dock'
    ],
    correctAnswer: 0,
    explanation: 'Draggable<T> creates an element that can be dragged across the screen carrying data of type T, and DragTarget<T> receives the payload on drop.',
    trapWarning: 'Draggable and DragTarget provide type-safe drag-and-drop.'
  },
  {
    id: 'L6-SYN-18',
    levelId: 6,
    topic: 'AutomaticKeepAliveClientMixin',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'What problem does applying AutomaticKeepAliveClientMixin with "wantKeepAlive => true" solve in TabBar / PageView screens?',
    options: [
      'It prevents tab views from having their State destroyed and rebuilt when the user swipes between tabs.',
      'It stops the screen from turning off.',
      'It keeps internet connection active.',
      'It downloads updates in the background.'
    ],
    correctAnswer: 0,
    explanation: 'In PageView or TabBarView, off-screen tabs are disposed by default to save memory. AutomaticKeepAliveClientMixin instructs the parent to retain the State alive.',
    trapWarning: 'wantKeepAlive prevents tab state destruction.'
  },
  {
    id: 'L6-SYN-19',
    levelId: 6,
    topic: 'ValueNotifier and ValueListenableBuilder',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'Why use ValueNotifier<int> and ValueListenableBuilder instead of calling setState() on the whole screen?',
    options: [
      'It scopes rebuilds strictly to the specific subtree listening to the notifier, avoiding rebuilding expensive parent or sibling widgets.',
      'ValueNotifier can only be used with numbers.',
      'It requires an internet connection.',
      'It deletes old widgets permanently.'
    ],
    correctAnswer: 0,
    explanation: 'ValueListenableBuilder provides targeted reactivity, repainting only the widgets inside its builder callback whenever the notifier value changes.',
    trapWarning: 'ValueListenableBuilder localizes rebuilds, optimizing performance.'
  },
  {
    id: 'L6-SYN-20',
    levelId: 6,
    topic: 'Slider Widget State',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'easy',
    prompt: 'How is a Slider widget properly wired to double variable _volume in State?',
    options: [
      'Slider(value: _volume, min: 0, max: 100, onChanged: (v) => setState(() => _volume = v))',
      'Slider(initialValue: _volume)',
      'Slider(volume: 50)',
      'Slider(drag: (v) => _volume = v)'
    ],
    correctAnswer: 0,
    explanation: 'Slider is a controlled widget requiring "value" bound to the state field and "onChanged" updating the field inside setState.',
    trapWarning: 'Slider requires both value and onChanged.'
  },
  {
    id: 'L6-SYN-21',
    levelId: 6,
    topic: 'AnimationController vs TickerProviderStateMixin',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'hard',
    prompt: 'What mixin is required on a State class to provide the "vsync: this" ticker parameter for an AnimationController?',
    options: [
      'SingleTickerProviderStateMixin (or TickerProviderStateMixin)',
      'AnimationMixin',
      'TickerMixin',
      'FrameProviderMixin'
    ],
    correctAnswer: 0,
    explanation: 'SingleTickerProviderStateMixin binds the animation ticker to Flutter\'s frame scheduler, pausing animations when the widget is not visible to save battery.',
    trapWarning: 'vsync requires SingleTickerProviderStateMixin.'
  },
  {
    id: 'L6-SYN-22',
    levelId: 6,
    topic: 'Ticker dispose() Requirement',
    source: 'generated',
    type: 'runtime-error-analysis',
    difficulty: 'hard',
    prompt: 'What occurs if an AnimationController is not disposed in dispose() when a screen pops?',
    options: [
      'Flutter throws an exception on exit: AnimationController.dispose() was not called; tickers must be canceled to prevent memory leaks.',
      'The animation runs in the background forever without warnings.',
      'The phone battery overheats immediately.',
      'Hot reload disables itself.'
    ],
    correctAnswer: 0,
    explanation: 'AnimationControllers hold active tickers. If un-disposed, Flutter\'s framework assertion catches the leak on unmount and reports a debug assertion failure.',
    trapWarning: 'Always call _controller.dispose() in dispose().'
  },
  {
    id: 'L6-SYN-23',
    levelId: 6,
    topic: 'Key Reconciliation in List of StatefulWidgets',
    source: 'generated',
    type: 'runtime-error-analysis',
    difficulty: 'hard',
    prompt: 'When reordering or deleting items in a list of StatefulWidgets, what bug occurs if you omit unique Keys on each item?',
    options: [
      'State elements get mismatched with the wrong widgets (e.g. deleting item A causes item B to display item A\'s state) because Flutter matches elements by runtimeType and position.',
      'The app crashes at compile time.',
      'The list reverses itself.',
      'Items cannot be clicked.'
    ],
    correctAnswer: 0,
    explanation: 'Without Keys, Flutter reconciles elements by runtimeType and index. When an item is removed, the state object at that index survives and binds to the newly shifted widget, showing stale state!',
    trapWarning: 'Stateful items in dynamic lists MUST have unique Keys (e.g. ValueKey(item.id)).'
  },
  {
    id: 'L6-SYN-24',
    levelId: 6,
    topic: 'Interactive To-Do List State Logic',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'In a To-Do app modeling items as List<Map<String, dynamic>>, how do you toggle the "isCompleted" boolean of item at index i inside setState?',
    options: [
      'setState(() { todos[i][\'isCompleted\'] = !todos[i][\'isCompleted\']; });',
      'todos[i][\'isCompleted\'] = true;',
      'todos.toggle(i);',
      'setState(() { todos.removeAt(i); });'
    ],
    correctAnswer: 0,
    explanation: 'Toggling the boolean property inside setState schedules a rebuild pass so the Checkbox and strikethrough styling update visually.',
    trapWarning: 'Wrap property mutation in setState to trigger re-rendering.'
  },
  {
    id: 'L6-SYN-25',
    levelId: 6,
    topic: 'PointerEvents and IgnorePointer',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What is the purpose of wrapping a button or form in IgnorePointer(ignoring: true)?',
    options: [
      'It completely prevents the child and all its descendants from receiving any touch, click, or hover pointer events.',
      'It makes the widget invisible.',
      'It changes the mouse cursor to a pointer.',
      'It speeds up gesture recognition.'
    ],
    correctAnswer: 0,
    explanation: 'IgnorePointer absorbs hit-test pointer events entirely, preventing user interaction while keeping the child visually rendered.',
    trapWarning: 'IgnorePointer disables touches on child widgets.'
  },
  {
    id: 'L6-SYN-26',
    levelId: 6,
    topic: 'ModalBottomSheet State',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'hard',
    prompt: 'Why does calling setState() from the parent screen NOT update stateful content inside showModalBottomSheet()?',
    options: [
      'The modal bottom sheet is pushed as a separate route in a different subtree. To update state inside the bottom sheet, wrap its content in a StatefulBuilder.',
      'Bottom sheets cannot display state.',
      'showModalBottomSheet only runs on iOS.',
      'setState is disabled in dialogs.'
    ],
    correctAnswer: 0,
    explanation: 'showModalBottomSheet creates a distinct route element tree. StatefulBuilder provides a local setModalState callback that repaints only the bottom sheet.',
    trapWarning: 'Use StatefulBuilder to manage interactive state inside bottom sheets and dialogs.'
  }
];
