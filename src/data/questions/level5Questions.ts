import { Question } from '../../types';

export const LEVEL_5_QUESTIONS: Question[] = [
  // --- AUTHENTIC PROFESSOR EXAM QUESTIONS ---
  {
    id: 'Q-01',
    levelId: 5,
    topic: 'Asset vs Runtime File Storage',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.1',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What is the primary difference between a file stored as an asset in Flutter and a file stored in the device\'s file system?',
    options: [
      'Assets can be modified by the app at runtime, whereas file system files are read-only.',
      'Assets are bundled with the app at build time and are read-only at runtime, whereas file system files can be created, updated, and deleted by the app at runtime.',
      'Assets can only store text files, while the file system can only store images and binary files.',
      'Assets are automatically synchronized with a remote cloud database, while file system files remain local.'
    ],
    correctAnswer: 1,
    explanation: 'Assets declared in pubspec.yaml are compiled directly into the application binary package (APK/IPA). The operating system signs and seals this bundle, making assets strictly immutable and read-only at runtime. Data that must be created or mutated at runtime must be written to the device filesystem or local databases.',
    trapWarning: 'Assets cannot be modified or written to at runtime!'
  },
  {
    id: 'Q-25',
    levelId: 5,
    topic: 'pubspec.yaml Indentation Trap',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.26',
    type: 'compile-or-fail',
    difficulty: 'trap',
    prompt: 'A student adds an image to their project and updates pubspec.yaml as follows:\n\nflutter:\n  uses-material-design: true\nassets:\n  - assets/images/logo.png\n\nWhy does the app fail at runtime with "Unable to load asset: assets/images/logo.png"?',
    options: [
      'Images must have a .jpg extension only.',
      'assets: is improperly indented as a root key instead of being nested under the flutter: configuration section (indented by 2 spaces).',
      'Assets cannot be placed in subdirectories.',
      'The image filename must be capitalized.'
    ],
    correctAnswer: 1,
    explanation: 'YAML syntax is strictly indentation-sensitive. Flutter\'s build tools only parse asset declarations when they are properly nested under the "flutter:" configuration block (indented with 2 spaces). Indenting assets at the root level causes the build system to ignore them.',
    trapWarning: 'In pubspec.yaml, "assets:" must be indented under "flutter:".'
  },

  // --- AUTHENTIC LAB CONTEXT & LECTURE DERIVED ---
  {
    id: 'L5-LAB-01',
    levelId: 5,
    topic: 'Stateless Widget Immutability',
    source: 'original-lab',
    sourceRef: 'mobile.pdf p.34 (LAB-07)',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'In LAB-07 (Stateless Tic-Tac-Toe Board), why must all fields declared inside a StatelessWidget be marked final?',
    options: [
      'StatelessWidget instances are immutable configuration blueprints; declaring non-final fields triggers compiler warnings because the widget cannot re-render itself on field mutation.',
      'final variables execute 50% faster on the GPU.',
      'Non-final fields are deleted by the garbage collector immediately after build().',
      'Flutter only allows final variables in mobile apps.'
    ],
    correctAnswer: 0,
    explanation: 'A StatelessWidget has no mutable state lifecycle. The framework expects widget configurations to be completely immutable. All fields must be final; when configuration changes, the parent instantiates a new widget instance.',
    trapWarning: 'StatelessWidgets are immutable; all member variables must be final.'
  },
  {
    id: 'L5-LEC-01',
    levelId: 5,
    topic: 'Android 5-Layer OS Architecture',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L4 Slide 180',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'What are the 5 layers of the Android OS architecture taught in Lecture 4, from lowest to highest?',
    options: [
      'Linux Kernel -> Hardware Abstraction Layer (HAL) -> Native C/C++ Libraries & Android Runtime (ART) -> Java API Framework -> System & User Apps',
      'Hardware -> Flutter Engine -> Dart VM -> Widgets -> Material UI',
      'Linux -> iOS Embedder -> ART -> SDK -> Apps',
      'Kernel -> Drivers -> UI -> Database -> Network'
    ],
    correctAnswer: 0,
    explanation: 'Android\'s foundational stack consists of: (1) Linux Kernel, (2) Hardware Abstraction Layer (HAL), (3) Native C/C++ Libraries + Android Runtime (ART), (4) Java API Framework, and (5) Applications layer.',
    trapWarning: 'Flutter bypasses the Java API Framework for rendering, speaking directly to the C/C++ native engine (Skia/Impeller).'
  },
  {
    id: 'L5-LEC-02',
    levelId: 5,
    topic: 'Container Color vs Decoration Conflict',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L4 Slide 224',
    type: 'runtime-error-analysis',
    difficulty: 'trap',
    prompt: 'What happens when executing:\n\nContainer(\n  color: Colors.blue,\n  decoration: BoxDecoration(borderRadius: BorderRadius.circular(8)),\n  child: Text("Hello"),\n)',
    options: [
      'It renders a blue container with rounded corners smoothly.',
      'It throws a runtime assertion error: Cannot provide both a color and a decoration.',
      'The decoration overrides the color and makes it transparent.',
      'It produces a compilation error.'
    ],
    correctAnswer: 1,
    explanation: 'In Flutter, Container has an explicit assertion that forbids supplying both a top-level color and a decoration. When using BoxDecoration, the background color MUST be placed inside the decoration: BoxDecoration(color: Colors.blue, borderRadius: ...).',
    trapWarning: 'Never supply both color and decoration to Container! Color must go inside BoxDecoration.'
  },
  {
    id: 'L5-LEC-03',
    levelId: 5,
    topic: 'Unbounded Height ListView Trap',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L4 Slide 245',
    type: 'runtime-error-analysis',
    difficulty: 'trap',
    prompt: 'What happens if you place a ListView.builder directly as a child of a Column without setting shrinkWrap or wrapping it in Expanded?',
    options: [
      'It renders normally with automatic scrollbars.',
      'It crashes at runtime with: Vertical viewport was given unbounded height.',
      'The column expands to fit all items up to 10,000 items.',
      'Compilation error.'
    ],
    correctAnswer: 1,
    explanation: 'A Column provides infinite vertical constraint to its children, while a ListView attempts to expand infinitely along its scroll axis. This creates an unbounded height conflict, triggering Flutter\'s famous red error screen.',
    trapWarning: 'Always wrap scrollable views in Expanded or SizedBox when placed inside Column or Row.'
  },
  {
    id: 'L5-LEC-04',
    levelId: 5,
    topic: 'Expanded vs Spacer vs SizedBox',
    source: 'lecture-based',
    sourceRef: 'Dart_Essentials_merged.pdf, L4 Slide 232',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'In a Row widget, how does Spacer() differ from SizedBox(width: 20)?',
    options: [
      'Spacer takes a fixed number of pixels, while SizedBox takes remaining space.',
      'Spacer is an Expanded widget with an empty SizedBox child that dynamically absorbs remaining flexible space, while SizedBox(width: 20) occupies exactly 20 fixed pixels.',
      'Spacer can only be used in Column, not Row.',
      'They are identical widgets.'
    ],
    correctAnswer: 1,
    explanation: 'Spacer() is syntactic sugar for Expanded(child: SizedBox.shrink()). It dynamically pushes neighboring widgets apart by consuming remaining space according to its flex factor.',
    trapWarning: 'Spacer expands flexibly; SizedBox with fixed dimensions is rigid.'
  },

  // --- GENERATED PRACTICE QUESTIONS ---
  {
    id: 'L5-SYN-01',
    levelId: 5,
    topic: 'main() & runApp()',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'easy',
    prompt: 'What is the role of runApp() in a Flutter application entrypoint?',
    options: [
      'It compiles Dart code to C++.',
      'It inflates the given root widget, attaches it to the screen, and initializes the Flutter framework rendering binding.',
      'It downloads assets from the internet.',
      'It checks device battery level.'
    ],
    correctAnswer: 1,
    explanation: 'runApp() takes the root widget (usually MaterialApp), binds it to the device window, and starts the render pipeline.',
    trapWarning: 'runApp() is the bridge from Dart main() to the Flutter rendering pipeline.'
  },
  {
    id: 'L5-SYN-02',
    levelId: 5,
    topic: 'MaterialApp vs CupertinoApp',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'What is the difference between MaterialApp and CupertinoApp?',
    options: [
      'MaterialApp implements Google Material Design guidelines, while CupertinoApp implements Apple iOS design styling.',
      'MaterialApp only runs on Android phones.',
      'CupertinoApp requires a macOS developer license.',
      'MaterialApp cannot display text.'
    ],
    correctAnswer: 0,
    explanation: 'MaterialApp provides Material Design styling, themes, and navigation; CupertinoApp provides iOS-styled navigation bars, switches, and typography.',
    trapWarning: 'Both can run on any platform (Android, iOS, Web, Desktop).'
  },
  {
    id: 'L5-SYN-03',
    levelId: 5,
    topic: 'Scaffold Anatomy',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'Which widget provides the standard visual layout structure for a Material screen (appBar, body, floatingActionButton, drawer)?',
    options: [
      'Container',
      'Scaffold',
      'Center',
      'Card'
    ],
    correctAnswer: 1,
    explanation: 'Scaffold implements the basic Material visual layout structure with designated slots for app bars, drawers, snackbars, and floating buttons.',
    trapWarning: 'Scaffold is the root visual framework for individual screens.'
  },
  {
    id: 'L5-SYN-04',
    levelId: 5,
    topic: 'Row & Column Axes',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'In a Column widget, which axis represents the crossAxisAlignment?',
    options: [
      'Vertical axis (up and down)',
      'Horizontal axis (left to right)',
      'Z-axis (depth)',
      'Diagonal axis'
    ],
    correctAnswer: 1,
    explanation: 'For Column, the main axis is vertical and the cross axis is horizontal. For Row, the main axis is horizontal and the cross axis is vertical.',
    trapWarning: 'Main axis is parallel to layout direction; cross axis is perpendicular.'
  },
  {
    id: 'L5-SYN-05',
    levelId: 5,
    topic: 'Stack and Positioned',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'Where must a Positioned widget be placed in the Flutter widget tree?',
    options: [
      'Anywhere in the application.',
      'Directly as an immediate child of a Stack widget.',
      'Inside an Expanded widget.',
      'Inside a Scaffold appBar.'
    ],
    correctAnswer: 1,
    explanation: 'Positioned widgets only work as direct descendants of a Stack. Placing Positioned outside of a Stack throws a framework assertion error.',
    trapWarning: 'Positioned is strictly for Stack layouts (top, bottom, left, right).'
  },
  {
    id: 'L5-SYN-06',
    levelId: 5,
    topic: 'ListView vs ListView.builder',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'Why is ListView.builder preferred over standard ListView(children: [...]) when rendering a list of 1,000 items?',
    options: [
      'ListView.builder renders items on-demand (virtualization) only when they scroll into the viewport, conserving memory and CPU.',
      'Standard ListView cannot hold more than 50 items.',
      'ListView.builder automatically sorts items alphabetically.',
      'Standard ListView requires internet access.'
    ],
    correctAnswer: 0,
    explanation: 'ListView.builder lazily instantiates widgets as they enter the screen, whereas ListView(children: [...]) builds all 1,000 widgets simultaneously in memory.',
    trapWarning: 'Use ListView.builder for large or dynamic lists to prevent memory bloat.'
  },
  {
    id: 'L5-SYN-07',
    levelId: 5,
    topic: 'Image.asset vs Image.network',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'When should Image.asset be used instead of Image.network?',
    options: [
      'When displaying static bundled local graphics (like app logos and icons) that must display offline without network latency.',
      'When fetching user profile pictures uploaded to an S3 bucket.',
      'Image.asset is deprecated.',
      'Only for SVG vector files.'
    ],
    correctAnswer: 0,
    explanation: 'Image.asset loads images compiled into the app package, guaranteeing instant offline display. Image.network loads images over HTTP.',
    trapWarning: 'Local bundled assets use Image.asset; remote URLs use Image.network.'
  },
  {
    id: 'L5-SYN-08',
    levelId: 5,
    topic: 'Card Widget Elevation',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'easy',
    prompt: 'Which property controls the drop shadow depth under a Material Card widget?',
    options: [
      'shadowDepth',
      'elevation',
      'zLevel',
      'blurRadius'
    ],
    correctAnswer: 1,
    explanation: 'Card uses the "elevation" property (a double) to control physical drop shadow depth in Material space.',
    trapWarning: 'elevation controls shadow height in Material widgets.'
  },
  {
    id: 'L5-SYN-09',
    levelId: 5,
    topic: 'Hot Reload vs Hot Restart',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What happens to the current application state (e.g. Counter number) during Hot Reload (pressing "r" in terminal)?',
    options: [
      'State is preserved; Flutter injects updated source code into the running Dart VM and rebuilds the widget tree without resetting state.',
      'State is completely reset to initial values.',
      'The entire app reboots and runs main() again.',
      'All local SharedPreferences files are deleted.'
    ],
    correctAnswer: 0,
    explanation: 'Hot Reload updates UI code while preserving application state. Hot Restart resets state and re-executes main() from the beginning.',
    trapWarning: 'Hot Reload preserves state; Hot Restart resets state.'
  },
  {
    id: 'L5-SYN-10',
    levelId: 5,
    topic: 'Padding vs EdgeInsects.all',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'easy',
    prompt: 'Which syntax applies 16 pixels of padding to the top and bottom only?',
    options: [
      'EdgeInsets.all(16)',
      'EdgeInsets.symmetric(vertical: 16)',
      'EdgeInsets.symmetric(horizontal: 16)',
      'EdgeInsets.only(left: 16, right: 16)'
    ],
    correctAnswer: 1,
    explanation: 'EdgeInsets.symmetric(vertical: 16) applies padding equally to top and bottom. horizontal applies to left and right.',
    trapWarning: 'vertical is top/bottom; horizontal is left/right.'
  },
  {
    id: 'L5-SYN-11',
    levelId: 5,
    topic: 'Center Widget Constraints',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'medium',
    prompt: 'How does the Center widget size itself inside an unconstrained parent?',
    options: [
      'It shrinks to fit its child exactly.',
      'It takes up as much space as possible and places its child in the middle.',
      'It always has dimensions 100x100.',
      'It causes a layout overflow error.'
    ],
    correctAnswer: 1,
    explanation: 'The Center widget expands to fill all available space offered by its parent and positions its child in the center of that area.',
    trapWarning: 'Center tries to be as big as its parent permits.'
  },
  {
    id: 'L5-SYN-12',
    levelId: 5,
    topic: 'ListTile Widget Components',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'In a standard ListTile, where do the "leading" and "trailing" widgets appear?',
    options: [
      'leading appears at the start (left in LTR); trailing appears at the end (right in LTR).',
      'leading appears at the bottom; trailing appears at the top.',
      'leading is centered; trailing is hidden.',
      'leading is only for text; trailing is only for icons.'
    ],
    correctAnswer: 0,
    explanation: 'ListTile provides designated slots: leading (start), title/subtitle (center column), and trailing (end action or chevron).',
    trapWarning: 'leading is start; trailing is end.'
  },
  {
    id: 'L5-SYN-13',
    levelId: 5,
    topic: 'Divider Widget',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'easy',
    prompt: 'What does the Divider widget render?',
    options: [
      'A 1-pixel thick horizontal rule line across the available width.',
      'A vertical line.',
      'A pop-up modal dialog.',
      'An input separator.'
    ],
    correctAnswer: 0,
    explanation: 'Divider draws a horizontal line with optional height, thickness, indent, and color properties.',
    trapWarning: 'Divider is horizontal; VerticalDivider is vertical.'
  },
  {
    id: 'L5-SYN-14',
    levelId: 5,
    topic: 'SingleChildScrollView',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What is the purpose of wrapping a Column with SingleChildScrollView in forms?',
    options: [
      'To prevent bottom overflow yellow/black tape errors when the software keyboard opens.',
      'To speed up form validation.',
      'To make the form submit automatically.',
      'To convert the form into a PDF.'
    ],
    correctAnswer: 0,
    explanation: 'When the on-screen keyboard appears, it reduces viewport height. Wrapping scrollable content in SingleChildScrollView allows users to scroll up without bottom overflow errors.',
    trapWarning: 'Prevents keyboard yellow-striped overflow errors.'
  },
  {
    id: 'L5-SYN-15',
    levelId: 5,
    topic: 'Flex factor in Expanded',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'medium',
    prompt: 'In a Row with two Expanded widgets having flex: 1 and flex: 2, what proportion of remaining space does the second child receive?',
    options: [
      '50%',
      '66.6% (2/3 of remaining space)',
      '33.3%',
      '100%'
    ],
    correctAnswer: 1,
    explanation: 'Total flex = 1 + 2 = 3. The second child receives 2/3 (66.6%) of the available space, and the first receives 1/3 (33.3%).',
    trapWarning: 'Flex determines proportional space sharing.'
  },
  {
    id: 'L5-SYN-16',
    levelId: 5,
    topic: 'Wrap Widget vs Row',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'When should a Wrap widget be chosen over a Row?',
    options: [
      'When items should flow onto the next line when running out of horizontal room, rather than overflowing off-screen.',
      'When you need 3D animations.',
      'Wrap is faster than Row.',
      'When you only have one child.'
    ],
    correctAnswer: 0,
    explanation: 'A Row clips or overflows when children exceed screen width. A Wrap widget automatically breaks children onto new lines (like CSS flex-wrap).',
    trapWarning: 'Wrap prevents horizontal overflow by breaking onto multiple lines.'
  },
  {
    id: 'L5-SYN-17',
    levelId: 5,
    topic: 'InheritedWidget Concept',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'What role does InheritedWidget play in Flutter (e.g. Theme.of(context) and MediaQuery.of(context))?',
    options: [
      'It provides an efficient mechanism for passing data down the widget tree without manually threading parameters through every constructor.',
      'It stores data permanently on device storage.',
      'It deletes old widgets.',
      'It compiles shaders.'
    ],
    correctAnswer: 0,
    explanation: 'InheritedWidgets allow descendant widgets to access data anywhere in the subtree (e.g. Theme.of(context)) and subscribe to updates when the inherited data changes.',
    trapWarning: 'InheritedWidget enables ambient data propagation down the tree.'
  },
  {
    id: 'L5-SYN-18',
    levelId: 5,
    topic: 'Material 3 usesMaterial3 Flag',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'easy',
    prompt: 'Where is the useMaterial3: true flag configured in modern Flutter projects?',
    options: [
      'Inside ThemeData of MaterialApp (e.g. theme: ThemeData(useMaterial3: true))',
      'In pubspec.yaml',
      'In AndroidManifest.xml',
      'In index.html'
    ],
    correctAnswer: 0,
    explanation: 'Material 3 design system styling is activated inside the application\'s ThemeData configuration.',
    trapWarning: 'ThemeData configures Material 3 visual styling.'
  },
  {
    id: 'L5-SYN-19',
    levelId: 5,
    topic: 'SafeArea Widget',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'What problem does the SafeArea widget solve on modern smartphones?',
    options: [
      'It insets child widgets to avoid operating system intrusions like camera notches, status bars, and navigation gesture bars.',
      'It encrypts sensitive screen pixels.',
      'It prevents phone screen scratches.',
      'It disables internet access.'
    ],
    correctAnswer: 0,
    explanation: 'SafeArea inspects device MediaQuery insets and pads its child away from camera cutouts, notches, and home indicator bars.',
    trapWarning: 'SafeArea protects content from notches and status bars.'
  },
  {
    id: 'L5-SYN-20',
    levelId: 5,
    topic: 'Flexible vs Expanded',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What is the exact technical difference between Flexible and Expanded in Flutter flex layouts?',
    options: [
      'Expanded is a Flexible widget with fit: FlexFit.tight (forcing child to fill all allocated space), while Flexible defaults to FlexFit.loose (allowing child to be smaller).',
      'Flexible only works on iOS.',
      'Expanded can only be used once per Column.',
      'There is no difference.'
    ],
    correctAnswer: 0,
    explanation: 'Expanded enforces tight fit, requiring the child to expand to the full allocated space. Flexible with FlexFit.loose allows the child to shrink to its intrinsic size.',
    trapWarning: 'Expanded forces tight fit; Flexible allows loose sizing.'
  },
  {
    id: 'L5-SYN-21',
    levelId: 5,
    topic: 'MainAxisSize: min vs max',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'medium',
    prompt: 'By default, what is the mainAxisSize of a Column, and what does setting MainAxisSize.min do?',
    options: [
      'Default is MainAxisSize.max (expands to full screen height); setting min causes the Column to wrap tightly around the height of its children.',
      'Default is min; setting max shrinks the column.',
      'MainAxisSize only controls width.',
      'It has no visual effect.'
    ],
    correctAnswer: 0,
    explanation: 'Columns default to MainAxisSize.max, attempting to fill the entire vertical axis. MainAxisSize.min shrinks the Column to the total height of its children.',
    trapWarning: 'MainAxisSize.min is essential when centering modals or dialog contents.'
  },
  {
    id: 'L5-SYN-22',
    levelId: 5,
    topic: 'FittedBox and BoxFit',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'Which BoxFit property scales an image to fill the entire container dimensions while maintaining aspect ratio, clipping excess portions?',
    options: [
      'BoxFit.cover',
      'BoxFit.contain',
      'BoxFit.fill',
      'BoxFit.none'
    ],
    correctAnswer: 0,
    explanation: 'BoxFit.cover scales the image uniformly to cover the entire target box, cropping any excess that overflows the bounds.',
    trapWarning: 'BoxFit.cover fills without distortion by cropping; BoxFit.contain fits without cropping.'
  },
  {
    id: 'L5-SYN-23',
    levelId: 5,
    topic: 'Opacity Widget vs Visibility',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'How does Opacity(opacity: 0.0, child: Widget()) differ from Visibility(visible: false, child: Widget())?',
    options: [
      'Opacity(0.0) still occupies layout space and participates in hit testing unless ignored, while Visibility(false) removes the widget from layout space by default.',
      'Visibility is deprecated.',
      'Opacity requires a GPU shader license.',
      'They produce identical layouts.'
    ],
    correctAnswer: 0,
    explanation: 'Opacity keeps the child in the layout tree taking up space. Visibility(visible: false) replaces the child with SizedBox.shrink() unless maintainSize is set.',
    trapWarning: 'Opacity(0.0) preserves layout space; Visibility(false) collapses space.'
  },
  {
    id: 'L5-SYN-24',
    levelId: 5,
    topic: 'ClipRRect Widget',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'easy',
    prompt: 'How do you clip an Image.network with rounded corners of radius 16?',
    options: [
      'ClipRRect(borderRadius: BorderRadius.circular(16), child: Image.network(url))',
      'Image.network(url, radius: 16)',
      'RoundedImage(url, 16)',
      'BorderBox(16, Image.network(url))'
    ],
    correctAnswer: 0,
    explanation: 'ClipRRect (Clip Rounded Rectangle) clips any child widget using a rounded rectangle path specified by its borderRadius.',
    trapWarning: 'ClipRRect clips arbitrary child widgets with rounded corners.'
  },
  {
    id: 'L5-SYN-25',
    levelId: 5,
    topic: 'GridView.count vs GridView.builder',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'When should GridView.builder be used instead of GridView.count?',
    options: [
      'When displaying a large or dynamically fetched grid of items that should be lazily instantiated on demand.',
      'Only when the grid has 2 columns.',
      'GridView.builder can only render numbers.',
      'GridView.count is faster for 100,000 items.'
    ],
    correctAnswer: 0,
    explanation: 'GridView.builder virtualizes grid items, instantiating widgets only when scrolled into view, unlike GridView.count which builds all children up front.',
    trapWarning: 'GridView.builder virtualizes grid cells.'
  },
  {
    id: 'L5-SYN-26',
    levelId: 5,
    topic: 'AspectRatio Widget',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'easy',
    prompt: 'What does wrapping a video player in AspectRatio(aspectRatio: 16 / 9) ensure?',
    options: [
      'The width to height ratio of the child is strictly constrained to 16:9 regardless of parent layout dimensions.',
      'The video is 16 pixels wide and 9 pixels tall.',
      'The video plays at 16 frames per second.',
      'It throws a layout exception.'
    ],
    correctAnswer: 0,
    explanation: 'AspectRatio forces its child to adhere to a specific width-to-height ratio (e.g. 16/9, 4/3, 1/1).',
    trapWarning: 'AspectRatio enforces geometric proportions.'
  }
];
