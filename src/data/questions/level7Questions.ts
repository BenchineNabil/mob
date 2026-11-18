import { Question } from '../../types';

export const LEVEL_7_QUESTIONS: Question[] = [
  // --- AUTHENTIC PROFESSOR EXAM QUESTIONS ---
  {
    id: 'Q-02',
    levelId: 7,
    topic: 'SharedPreferences Scope',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.2',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What is the scope and availability of data saved using SharedPreferences in Flutter?',
    options: [
      'Data is available across all applications installed on the device and is globally readable.',
      'Data is automatically synced to the user\'s Google account and accessible on any device they log into.',
      'Data is persistent across app launches, but is private to the specific application install on the local device.',
      'Data only persists in memory while the current screen is mounted, and is lost on screen pop.'
    ],
    correctAnswer: 2,
    explanation: 'SharedPreferences persists primitive key-value data on the local device filesystem (using XML on Android and NSUserDefaults on iOS). It is strictly sandboxed to the local application install and is neither shared across apps nor synced to the cloud.',
    trapWarning: 'SharedPreferences does NOT sync across devices and is NOT readable by other apps.'
  },
  {
    id: 'Q-03',
    levelId: 7,
    topic: 'GlobalKey<FormState> Role',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.3',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'In Flutter form handling, why is a GlobalKey<FormState> typically declared and assigned to a Form widget?',
    options: [
      'To globally register the form with the backend REST API server.',
      'To provide external widgets (such as an ElevatedButton outside the form) access to trigger FormState methods like validate(), save(), and reset().',
      'To automatically encrypt all user inputs stored in the form fields.',
      'To prevent the keyboard from obscuring the input fields when focused.'
    ],
    correctAnswer: 1,
    explanation: 'Because widgets cannot directly reach into sibling or ancestor state trees, GlobalKey<FormState> gives external buttons (like a submit button in an AppBar or bottom bar) a handle to call _formKey.currentState!.validate().',
    trapWarning: 'GlobalKey provides the external handle to call FormState methods.'
  },
  {
    id: 'Q-04',
    levelId: 7,
    topic: 'FormState.validate() Mechanics',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.4',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What happens when "_formKey.currentState!.validate()" is executed?',
    options: [
      'It sends an HTTP POST request to the server to check for username uniqueness.',
      'It executes the validator callback of each descendant FormField in the widget tree, displays inline error text on fields that return an error string, and returns false if any validator fails (or true if all pass).',
      'It clears all form fields and resets their text controllers to empty strings.',
      'It locks all form inputs and makes them read-only until the app restarts.'
    ],
    correctAnswer: 1,
    explanation: 'Calling validate() walks the FormField subtree. Each field invokes its validator(value) closure. If any returns an error string, that field renders error text below its input and the aggregate call returns false.',
    trapWarning: 'validate() executes client validators, displays errors, and returns a boolean.'
  },
  {
    id: 'Q-08',
    levelId: 7,
    topic: 'SharedPreferences JSON Serialization Trap',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.8',
    type: 'runtime-error-analysis',
    difficulty: 'trap',
    prompt: 'A student attempts to persist a list of user maps to SharedPreferences using the following code:\n\nList<Map<String, dynamic>> userList = [{\'name\': \'Ali\', \'score\': 95}];\nprefs.setString(\'users\', userList.toString());\n\nWhat problem occurs when the student later attempts to read and decode this data using "json.decode(prefs.getString(\'users\')!)"?',
    options: [
      'The data saves and decodes successfully without issues.',
      'userList.toString() outputs Dart\'s human-readable string representation (using single quotes and unquoted keys), which is NOT valid JSON format, causing json.decode to throw a FormatException.',
      'prefs.setString automatically converts any object to JSON, so no issue occurs.',
      'SharedPreferences deletes the key immediately because lists cannot be converted to strings.'
    ],
    correctAnswer: 1,
    explanation: 'In Dart, calling .toString() on a Map produces {name: Ali, score: 95}. Standard JSON parsers strictly require keys and string values to be wrapped in double quotes ("name": "Ali"). json.decode() rejects Dart\'s internal representation by throwing a fatal FormatException! You MUST use json.encode(userList).',
    trapWarning: 'One of Prof. Bouchrika\'s favorite exam traps. Always use json.encode(), never .toString()!'
  },
  {
    id: 'Q-10',
    levelId: 7,
    topic: 'Separation of Concerns in UI',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.10',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'Why does Prof. Bouchrika strongly advise against writing raw HTTP requests, file I/O, and complex database transactions directly inside a button\'s onPressed callback?',
    options: [
      'Flutter\'s compiler refuses to compile anonymous functions containing more than 3 lines of code.',
      'Mixing business and storage logic directly inside presentation code violates Separation of Concerns, makes the logic untestable by unit tests, prevents code reuse across screens, and clutters the UI widget tree.',
      'The onPressed callback cannot be marked async.',
      'Running async code in onPressed automatically crashes the Flutter engine.'
    ],
    correctAnswer: 1,
    explanation: 'Embedding business and persistence logic inside UI event handlers creates spaghetti code. The logic cannot be tested in headless unit tests and cannot be reused across other screens.',
    trapWarning: 'UI should only trigger domain controllers or repositories, not execute raw I/O directly.'
  },
  {
    id: 'Q-14',
    levelId: 7,
    topic: 'Navigation Stack Clearing on Logout',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.14',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'When logging out a user, which Navigator method should be called to navigate to /login and prevent the user from pressing the device back button to return to protected screens?',
    options: [
      'Navigator.push(context, \'/login\')',
      'Navigator.pop(context)',
      'Navigator.pushAndRemoveUntil(context, MaterialPageRoute(builder: (c) => LoginScreen()), (Route<dynamic> route) => false)',
      'Navigator.replace(context, \'/login\')'
    ],
    correctAnswer: 2,
    explanation: 'pushAndRemoveUntil() takes a predicate function. Passing (route) => false instructs Flutter to pop and remove every single existing route from history until none remain, leaving only the newly pushed LoginScreen.',
    trapWarning: 'pushReplacement only replaces the top route; pushAndRemoveUntil with (route) => false clears all routes.'
  },
  {
    id: 'Q-15',
    levelId: 7,
    topic: 'Awaiting Navigator.push Return Values',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.15',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'In Screen A, a developer writes:\n\nfinal selectedOption = await Navigator.push(\n  context,\n  MaterialPageRoute(builder: (context) => SelectionScreen()),\n);\n\nHow can SelectionScreen send a value back to Screen A?',
    options: [
      'By saving the value in a global static variable.',
      'By calling Navigator.pop(context, \'chosen_value\');',
      'By invoking Navigator.returnData(context, \'chosen_value\');',
      'By calling Navigator.push(context, ScreenA(data: \'chosen_value\'));'
    ],
    correctAnswer: 1,
    explanation: 'Navigator.push() returns a Future<T?> that resolves when the pushed route is popped. The child screen delivers the result by passing it as the second argument to Navigator.pop(context, result).',
    trapWarning: 'Navigator.pop(context, data) delivers the return value to the awaiting push caller.'
  },
  {
    id: 'Q-23',
    levelId: 7,
    topic: 'TextField vs TextFormField',
    source: 'original-quiz',
    sourceRef: 'mobile.pdf p.23',
    type: 'code-debugging',
    difficulty: 'trap',
    prompt: 'A developer places a standard TextField inside a Form widget and supplies a validator: parameter. Why does form validation fail to work?',
    options: [
      'TextField does not have a validator property and does not interact with FormState. The developer must use TextFormField.',
      'Form only accepts ElevatedButton widgets.',
      'The TextField must have its obscureText property set to true.',
      'TextField requires a GlobalKey for each individual character typed.'
    ],
    correctAnswer: 0,
    explanation: 'TextField is a basic visual input widget. TextFormField is a specialized FormField wrapper that hooks into the parent FormState and responds to validate() calls.',
    trapWarning: 'Plain TextField does not support FormState validation; use TextFormField.'
  },

  // --- LAB CONTEXT & LECTURE DERIVED ---
  {
    id: 'L7-LAB-01',
    levelId: 7,
    topic: 'Role-Based Navigation & SnackBar (LAB-10)',
    source: 'original-lab',
    sourceRef: 'mobile.pdf p.37 (LAB-10)',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'In LAB-10 (Role-Based Routing), when authentication fails, how is an error message displayed to the user using modern Flutter standards?',
    options: [
      'ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text("Invalid credentials")));',
      'print("Invalid credentials");',
      'window.alert("Invalid credentials");',
      'Navigator.showError("Invalid credentials");'
    ],
    correctAnswer: 0,
    explanation: 'Modern Flutter uses ScaffoldMessenger.of(context).showSnackBar() to display floating or fixed feedback bars across screens.',
    trapWarning: 'Use ScaffoldMessenger.of(context).showSnackBar(); the old Scaffold.of(context).showSnackBar() is deprecated.'
  },
  {
    id: 'L7-LAB-02',
    levelId: 7,
    topic: 'Regex Validation for Usernames (LAB-12)',
    source: 'original-lab',
    sourceRef: 'mobile.pdf p.39 (LAB-12)',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'In LAB-12, which validator implementation enforces: (1) required, (2) minimum 4 characters, and (3) letters only?',
    options: [
      'if (val == null || val.length < 4 || !RegExp(r"^[a-zA-Z]+$").hasMatch(val)) return "Invalid username"; return null;',
      'if (val.contains(" ")) return "Invalid"; return null;',
      'if (val == "admin") return null; return "Invalid";',
      'return val.length.toString();'
    ],
    correctAnswer: 0,
    explanation: 'Validating null/empty, length < 4, and testing against RegExp(r"^[a-zA-Z]+$") strictly enforces the minimum length and alphabet-only requirement.',
    trapWarning: 'A validator must return null when input is valid, or an error string when invalid.'
  },

  // --- GENERATED PRACTICE QUESTIONS ---
  {
    id: 'L7-SYN-01',
    levelId: 7,
    topic: 'Named Routes in MaterialApp',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'How are named routes registered in a MaterialApp configuration?',
    options: [
      'MaterialApp(routes: {\'/\': (context) => HomeScreen(), \'/profile\': (context) => ProfileScreen()})',
      'MaterialApp(screens: [HomeScreen, ProfileScreen])',
      'MaterialApp(urlMap: {\'/\': HomeScreen})',
      'MaterialApp(navigator: [\'/\', \'/profile\'])'
    ],
    correctAnswer: 0,
    explanation: 'Named routes are mapped in MaterialApp\'s "routes" parameter as a Map<String, WidgetBuilder>.',
    trapWarning: 'The initial route is typically designated by "/" in the routes map.'
  },
  {
    id: 'L7-SYN-02',
    levelId: 7,
    topic: 'onGenerateRoute for Dynamic Arguments',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'When is "onGenerateRoute" preferred over the static "routes" map in MaterialApp?',
    options: [
      'When you need to parse dynamic path parameters, pass complex runtime arguments, or apply authentication route guards dynamically.',
      'When the app only has one screen.',
      'onGenerateRoute is deprecated.',
      'To speed up APK download time.'
    ],
    correctAnswer: 0,
    explanation: 'onGenerateRoute receives a RouteSettings parameter, allowing deep-link parsing, argument extraction, and dynamic redirection before pushing routes.',
    trapWarning: 'Use onGenerateRoute for dynamic arguments and authentication guards.'
  },
  {
    id: 'L7-SYN-03',
    levelId: 7,
    topic: 'ModalRoute.of(context) Arguments',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'How does a destination screen extract arguments passed via Navigator.pushNamed(context, \'/details\', arguments: myData)?',
    options: [
      'final data = ModalRoute.of(context)!.settings.arguments as MyData;',
      'final data = Navigator.getArgs(context);',
      'final data = context.arguments;',
      'final data = SharedPreferences.getArgs();'
    ],
    correctAnswer: 0,
    explanation: 'ModalRoute.of(context)!.settings.arguments retrieves the runtime object passed into Navigator.pushNamed().',
    trapWarning: 'ModalRoute.of(context)!.settings.arguments retrieves named route payloads.'
  },
  {
    id: 'L7-SYN-04',
    levelId: 7,
    topic: 'SharedPreferences Supported Types',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'Which of the following data types CANNOT be directly saved to SharedPreferences without serialization?',
    options: [
      'int',
      'String',
      'bool',
      'Map<String, dynamic>'
    ],
    correctAnswer: 3,
    explanation: 'SharedPreferences only supports primitives (int, double, bool, String, and List<String>). Maps and custom objects must be converted to JSON strings with json.encode().',
    trapWarning: 'Maps cannot be stored directly in SharedPreferences; serialize to JSON first.'
  },
  {
    id: 'L7-SYN-05',
    levelId: 7,
    topic: 'Form autovalidateMode',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What is the effect of setting autovalidateMode: AutovalidateMode.onUserInteraction on a TextFormField?',
    options: [
      'The field validates continuously in real-time as the user types, displaying errors immediately after their first interaction.',
      'The field never validates.',
      'The form submits automatically.',
      'It disables the virtual keyboard.'
    ],
    correctAnswer: 0,
    explanation: 'AutovalidateMode.onUserInteraction triggers validation automatically on each keystroke once the user has interacted with the field.',
    trapWarning: 'onUserInteraction gives immediate real-time validation feedback.'
  },
  {
    id: 'L7-SYN-06',
    levelId: 7,
    topic: 'obscureText in Password Fields',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'easy',
    prompt: 'Which property hides password characters with dots in a TextFormField?',
    options: [
      'isPassword: true',
      'obscureText: true',
      'hideCharacters: true',
      'secureInput: true'
    ],
    correctAnswer: 1,
    explanation: 'obscureText: true masks entered characters for secure credential entry.',
    trapWarning: 'obscureText masks password input characters.'
  },
  {
    id: 'L7-SYN-07',
    levelId: 7,
    topic: 'WillPopScope / PopScope',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'How do you intercept the Android physical back button to show an "Are you sure you want to exit?" confirmation dialog?',
    options: [
      'Wrap the screen in PopScope (or legacy WillPopScope) and handle the canPop / onPopInvoked callback.',
      'Disable Android back button in AndroidManifest.xml.',
      'Call Navigator.blockBack().',
      'Delete the route from history.'
    ],
    correctAnswer: 0,
    explanation: 'PopScope intercepts back-gesture and physical back-button events, allowing developers to show confirmation modals before allowing navigation.',
    trapWarning: 'PopScope controls whether the current route can be popped.'
  },
  {
    id: 'L7-SYN-08',
    levelId: 7,
    topic: 'FormState.save() and onSaved',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'When does the "onSaved: (val) => ... " callback of a TextFormField execute?',
    options: [
      'On every keystroke.',
      'When _formKey.currentState!.save() is called.',
      'When the field loses focus.',
      'When the user opens the keyboard.'
    ],
    correctAnswer: 1,
    explanation: 'Calling save() on the FormState triggers the onSaved callback for every descendant FormField, allowing bulk model population.',
    trapWarning: 'onSaved only runs when _formKey.currentState!.save() is called.'
  },
  {
    id: 'L7-SYN-09',
    levelId: 7,
    topic: 'SharedPreferences remove vs clear',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'What is the difference between prefs.remove(\'token\') and prefs.clear() in SharedPreferences?',
    options: [
      'remove(\'token\') deletes only the specified key, while clear() deletes every key-value entry stored by the app.',
      'clear() is deprecated.',
      'remove() encrypts the key.',
      'They perform identical operations.'
    ],
    correctAnswer: 0,
    explanation: 'prefs.remove(key) targets a single entry; prefs.clear() wipes all stored preferences for the application install.',
    trapWarning: 'clear() wipes all keys; remove(key) wipes one.'
  },
  {
    id: 'L7-SYN-10',
    levelId: 7,
    topic: 'TextEditingController Initial Value Conflict',
    source: 'generated',
    type: 'runtime-error-analysis',
    difficulty: 'trap',
    prompt: 'What occurs if you provide BOTH "initialValue: \'Hello\'" and a "controller" to the same TextFormField?',
    options: [
      'The initialValue overrides the controller text.',
      'It throws an immediate runtime assertion error: initialValue == null || controller == null.',
      'The text is concatenated: "HelloHello".',
      'It compiles cleanly without errors.'
    ],
    correctAnswer: 1,
    explanation: 'In Flutter, TextFormField asserts that you cannot supply both an initialValue and a controller. When using a controller, initialize the text via controller.text = \'Hello\' instead.',
    trapWarning: 'Never supply both initialValue and controller to TextFormField!'
  },
  {
    id: 'L7-SYN-11',
    levelId: 7,
    topic: 'FocusNode and FocusScope',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'How do you programmatically shift input focus from a username field to a password field after pressing "Next" on the soft keyboard?',
    options: [
      'FocusScope.of(context).requestFocus(_passwordFocusNode);',
      'Navigator.focus(_passwordField);',
      'Keyboard.next();',
      'TextField.focusNext();'
    ],
    correctAnswer: 0,
    explanation: 'FocusScope.of(context).requestFocus(focusNode) directs keyboard focus to the designated field\'s FocusNode.',
    trapWarning: 'FocusNodes manage programmatic keyboard focus shifts.'
  },
  {
    id: 'L7-SYN-12',
    levelId: 7,
    topic: 'Navigator 2.0 Router API',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'What is the primary motivation behind Flutter\'s declarative Navigator 2.0 (Router & RouteInformationParser) API?',
    options: [
      'To provide synchronized web browser URL handling, browser history sync, and declarative state-driven routing across web and mobile platforms.',
      'To replace all StatelessWidgets.',
      'To eliminate the need for build contexts.',
      'To reduce APK file size by 50%.'
    ],
    correctAnswer: 0,
    explanation: 'Navigator 2.0 provides declarative synchronization between application state and browser URL bars, essential for Flutter web.',
    trapWarning: 'Navigator 2.0 is declarative and synchronizes with browser URL history.'
  },
  {
    id: 'L7-SYN-13',
    levelId: 7,
    topic: 'json.decode Type Casting',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'What type does json.decode(jsonString) return when parsing a JSON object \'{"name":"Ali"}\'?',
    options: [
      'Map<String, dynamic>',
      'dynamic (which is actually a Map<String, dynamic> at runtime)',
      'JsonObject',
      'String'
    ],
    correctAnswer: 1,
    explanation: 'json.decode() returns dynamic. Developers typically cast it as Map<String, dynamic> to obtain strong typing.',
    trapWarning: 'json.decode returns dynamic; cast as Map<String, dynamic>.'
  },
  {
    id: 'L7-SYN-14',
    levelId: 7,
    topic: 'TextCapitalization in Inputs',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'easy',
    prompt: 'Which property automatically capitalizes the first letter of each typed word on the mobile keyboard?',
    options: [
      'textCapitalization: TextCapitalization.words',
      'uppercase: true',
      'autoCapitalize: true',
      'keyboardType: TextInputType.name'
    ],
    correctAnswer: 0,
    explanation: 'TextCapitalization.words instructs the mobile virtual keyboard to auto-capitalize the first character of every word.',
    trapWarning: 'TextCapitalization configures keyboard capitalization behavior.'
  },
  {
    id: 'L7-SYN-15',
    levelId: 7,
    topic: 'TextInputType Selection',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'easy',
    prompt: 'Which keyboardType presents a numeric keypad with a decimal point on mobile devices?',
    options: [
      'TextInputType.numberWithOptions(decimal: true)',
      'TextInputType.text',
      'TextInputType.emailAddress',
      'TextInputType.phone'
    ],
    correctAnswer: 0,
    explanation: 'TextInputType.numberWithOptions(decimal: true) requests the OS to show a numeric keypad with a decimal dot.',
    trapWarning: 'numberWithOptions(decimal: true) provides floating point keypads.'
  },
  {
    id: 'L7-SYN-16',
    levelId: 7,
    topic: 'Navigator.canPop',
    source: 'generated',
    type: 'output-prediction',
    difficulty: 'medium',
    prompt: 'What does Navigator.canPop(context) return if the current screen is the root initial screen of the app?',
    options: [
      'true',
      'false',
      'null',
      'Throws an exception'
    ],
    correctAnswer: 1,
    explanation: 'If the route is at the bottom of the navigation stack with no previous screens behind it, canPop(context) returns false.',
    trapWarning: 'canPop returns false when on the root route.'
  },
  {
    id: 'L7-SYN-17',
    levelId: 7,
    topic: 'SharedPreferences reload()',
    source: 'generated',
    type: 'mcq',
    difficulty: 'hard',
    prompt: 'When is prefs.reload() useful in SharedPreferences?',
    options: [
      'When external processes or background services modified the persistent storage on disk and the in-memory cache needs resynchronization.',
      'Every time a widget rebuilds.',
      'Only on app termination.',
      'It is never needed.'
    ],
    correctAnswer: 0,
    explanation: 'SharedPreferences maintains an in-memory cache. reload() reads the underlying storage file from disk again if modified externally.',
    trapWarning: 'reload() refreshes the in-memory cache from disk.'
  },
  {
    id: 'L7-SYN-18',
    levelId: 7,
    topic: 'Form reset() Mechanics',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'easy',
    prompt: 'What happens when _formKey.currentState!.reset() is invoked?',
    options: [
      'Every descendant FormField resets its value back to its initialValue and clears any displayed error messages.',
      'The form fields are deleted from the screen.',
      'The app navigates to the home screen.',
      'All local SharedPreferences files are deleted.'
    ],
    correctAnswer: 0,
    explanation: 'Calling reset() on FormState restores each FormField to its initialValue and resets validator error text.',
    trapWarning: 'reset() restores initial values and clears errors.'
  },
  {
    id: 'L7-SYN-19',
    levelId: 7,
    topic: 'Navigator.popUntil',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'medium',
    prompt: 'How do you pop routes until reaching a named route "/home"?',
    options: [
      'Navigator.popUntil(context, ModalRoute.withName("/home"))',
      'Navigator.pop(context, to: "/home")',
      'Navigator.jump("/home")',
      'Navigator.unwind("/home")'
    ],
    correctAnswer: 0,
    explanation: 'Navigator.popUntil(context, ModalRoute.withName("/home")) pops the navigation stack repeatedly until it encounters the route named "/home".',
    trapWarning: 'popUntil with ModalRoute.withName pops back to a specific route.'
  },
  {
    id: 'L7-SYN-20',
    levelId: 7,
    topic: 'Form State Key Scope',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'What happens if two Form widgets on the same screen share the same GlobalKey<FormState> instance?',
    options: [
      'Flutter throws a runtime assertion error: Duplicate GlobalKey detected in widget tree.',
      'Both forms are validated simultaneously without errors.',
      'The first form is deleted.',
      'The compiler renames the second key.'
    ],
    correctAnswer: 0,
    explanation: 'GlobalKeys MUST be globally unique across the entire element tree. Attempting to attach the same GlobalKey to two active widgets triggers a fatal duplicate key assertion.',
    trapWarning: 'GlobalKeys must be unique across the entire active widget tree.'
  },
  {
    id: 'L7-SYN-21',
    levelId: 7,
    topic: 'Navigator pushReplacementNamed',
    source: 'generated',
    type: 'mcq',
    difficulty: 'easy',
    prompt: 'When is Navigator.pushReplacementNamed(context, "/dashboard") preferred over pushNamed?',
    options: [
      'When completing a splash screen or login flow, replacing the current route so pressing the back button will not return to the splash/login screen.',
      'When you want to keep all previous screens accessible.',
      'Only on tablet devices.',
      'When the route takes no parameters.'
    ],
    correctAnswer: 0,
    explanation: 'pushReplacementNamed replaces the topmost route on the stack, preventing users from backing into transitional screens.',
    trapWarning: 'pushReplacement replaces the current top route.'
  },
  {
    id: 'L7-SYN-22',
    levelId: 7,
    topic: 'Encrypted Persistence',
    source: 'generated',
    type: 'mcq',
    difficulty: 'medium',
    prompt: 'Why should sensitive user data (like auth tokens or passwords) NOT be stored in plain SharedPreferences?',
    options: [
      'SharedPreferences files are stored in plaintext XML/plist on device storage and can be inspected on rooted/jailbroken devices; flutter_secure_storage (KeyStore/Keychain) should be used instead.',
      'SharedPreferences deletes data after 24 hours.',
      'SharedPreferences cannot store text strings.',
      'SharedPreferences is only stored in RAM.'
    ],
    correctAnswer: 0,
    explanation: 'SharedPreferences is unencrypted XML. Secrets must be stored using platform keychains (flutter_secure_storage / Android KeyStore / iOS Keychain).',
    trapWarning: 'SharedPreferences is unencrypted plaintext storage.'
  },
  {
    id: 'L7-SYN-23',
    levelId: 7,
    topic: 'json.encode Indentation (Pretty Print)',
    source: 'generated',
    type: 'code-debugging',
    difficulty: 'easy',
    prompt: 'How do you format a JSON string with 2-space indentation for readable logging?',
    options: [
      'JsonEncoder.withIndent("  ").convert(data)',
      'json.encode(data, indent: 2)',
      'json.pretty(data)',
      'data.toJsonString(2)'
    ],
    correctAnswer: 0,
    explanation: 'JsonEncoder.withIndent("  ").convert(data) formats JSON objects with formatted indentation.',
    trapWarning: 'JsonEncoder.withIndent provides pretty-printed JSON.'
  }
];
