export interface TestCase {
  id: string;
  description: string;
  expectedOutput: any;
}

export interface CodingChallenge {
  id: string;
  title: string;
  category: 
    | 'flutter-widgets' 
    | 'flutter-stateful' 
    | 'flutter-async-nav' 
    | 'scratch' 
    | 'oop' 
    | 'foundations' 
    | 'patterns' 
    | 'sandbox';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Hard';
  description: string;
  instructions: string[];
  starterCode: string;
  zeroScratchCode: string;
  testCases: TestCase[];
}

// ============================================================================
// 1. CODING ARENA CHALLENGES (Practice Laboratory)
// Heavy focus on Flutter Widget creation across every core concept!
// ============================================================================

export const ALL_CODING_CHALLENGES: CodingChallenge[] = [
  // --- FLUTTER WIDGETS & LAYOUT ---
  {
    id: 'lab-fl-stateless-card',
    title: 'LAB-FL01: User Profile Card (StatelessWidget)',
    category: 'flutter-widgets',
    difficulty: 'Beginner',
    description: 'Build a reusable, production-ready ProfileCard widget utilizing StatelessWidget, Card, Row, Column, and styling.',
    instructions: [
      'Create class ProfileCard extends StatelessWidget.',
      'Declare immutable fields: final String username, final String role, final String? avatarUrl, and final VoidCallback? onMessageTap.',
      'Provide a const constructor with required parameters.',
      'In build(BuildContext context), return a Card with rounded corners and subtle elevation.',
      'Use a Row containing a CircleAvatar (leading), an Expanded Column with Text widgets (username bold, role muted), and an IconButton (trailing).',
    ],
    starterCode: `import 'package:flutter/material.dart';

class ProfileCard extends StatelessWidget {
  final String username;
  final String role;
  final String? avatarUrl;
  final VoidCallback? onMessageTap;

  const ProfileCard({
    super.key,
    required this.username,
    required this.role,
    this.avatarUrl,
    this.onMessageTap,
  });

  @override
  Widget build(BuildContext context) {
    // TODO: Build and return the Card widget tree
    // Card -> Padding -> Row -> [CircleAvatar, Expanded(Column([Text, Text])), IconButton]
    return const Placeholder();
  }
}

void main() {
  const card = ProfileCard(
    username: "Sara Bouchrika",
    role: "Mobile Architect",
  );
  print("ProfileCard created for: \${card.username}");
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Implement ProfileCard extends StatelessWidget completely from scratch
// Requirements: final username, role, avatarUrl, onMessageTap. Card with Row, CircleAvatar, Expanded, Column.

import 'package:flutter/material.dart';

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'ProfileCard extends StatelessWidget with const constructor', expectedOutput: true },
      { id: 't2', description: 'build() returns Card with Row and Expanded Column', expectedOutput: true },
      { id: 't3', description: 'Leading CircleAvatar and trailing IconButton integrated', expectedOutput: true },
    ],
  },

  {
    id: 'lab-fl-layout-cart',
    title: 'LAB-FL02: Responsive E-Commerce Cart Item (Row + Expanded)',
    category: 'flutter-widgets',
    difficulty: 'Intermediate',
    description: 'Construct a responsive shopping cart item tile that dynamically adapts to screen widths without RenderFlex overflow.',
    instructions: [
      'Create class CartItemTile extends StatelessWidget.',
      'Accept final String itemName, final double price, final int quantity, and final ValueChanged<int>? onQuantityChanged.',
      'Use a Row with crossAxisAlignment: CrossAxisAlignment.center.',
      'Place a fixed 64x64 Container image placeholder on the left.',
      'Wrap the middle details Column inside an Expanded widget to absorb variable width and prevent text overflow.',
      'Place a quantity stepper (increment/decrement IconButtons and quantity Text) on the trailing end.',
    ],
    starterCode: `import 'package:flutter/material.dart';

class CartItemTile extends StatelessWidget {
  final String itemName;
  final double price;
  final int quantity;
  final ValueChanged<int>? onQuantityChanged;

  const CartItemTile({
    super.key,
    required this.itemName,
    required this.price,
    required this.quantity,
    this.onQuantityChanged,
  });

  @override
  Widget build(BuildContext context) {
    // TODO: Implement Row with Expanded middle Column to prevent RenderFlex overflow
    return Container();
  }
}

void main() {
  const item = CartItemTile(itemName: "Flutter Book", price: 29.99, quantity: 2);
  print("Cart item: \${item.itemName} x \${item.quantity}");
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Write CartItemTile extends StatelessWidget from scratch
// Must wrap middle Column in Expanded to prevent RenderFlex overflow!

import 'package:flutter/material.dart';

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'CartItemTile wraps flexible text Column inside Expanded', expectedOutput: true },
      { id: 't2', description: 'Implements Row with CrossAxisAlignment.center', expectedOutput: true },
      { id: 't3', description: 'Includes quantity stepper controls with onQuantityChanged callback', expectedOutput: true },
    ],
  },

  // --- STATEFUL WIDGETS & INTERACTIVITY ---
  {
    id: 'lab-fl-counter-stateful',
    title: 'LAB-FL03: Bounded Step Counter (StatefulWidget & setState)',
    category: 'flutter-stateful',
    difficulty: 'Intermediate',
    description: 'Master Flutter State lifecycle, internal state mutation via setState(), and boundary condition guards.',
    instructions: [
      'Create class BoundedCounter extends StatefulWidget with final int min, final int max, final int initialValue.',
      'Create State class _BoundedCounterState extends State<BoundedCounter>.',
      'Initialize late int _currentValue in initState().',
      'Implement void _increment() and void _decrement() wrapping state changes inside setState().',
      'Disable increment when _currentValue >= widget.max, and disable decrement when _currentValue <= widget.min.',
      'In build(), display the count with dynamic color (green when positive, red when at max/min).',
    ],
    starterCode: `import 'package:flutter/material.dart';

class BoundedCounter extends StatefulWidget {
  final int min;
  final int max;
  final int initialValue;

  const BoundedCounter({
    super.key,
    this.min = 0,
    this.max = 10,
    this.initialValue = 0,
  });

  @override
  State<BoundedCounter> createState() => _BoundedCounterState();
}

class _BoundedCounterState extends State<BoundedCounter> {
  late int _currentValue;

  @override
  void initState() {
    super.initState();
    _currentValue = widget.initialValue;
  }

  void _increment() {
    // TODO: Wrap increment in setState, guard against widget.max
  }

  void _decrement() {
    // TODO: Wrap decrement in setState, guard against widget.min
  }

  @override
  Widget build(BuildContext context) {
    // TODO: Build Row with [-] IconButton, Text(_currentValue), [+] IconButton
    return Row(
      children: [
        IconButton(icon: const Icon(Icons.remove), onPressed: _decrement),
        Text("$_currentValue"),
        IconButton(icon: const Icon(Icons.add), onPressed: _increment),
      ],
    );
  }
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Build BoundedCounter extends StatefulWidget from scratch
// Requirements: createState, initState, setState in _increment and _decrement, min/max guard

import 'package:flutter/material.dart';

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'BoundedCounter creates _BoundedCounterState properly', expectedOutput: true },
      { id: 't2', description: 'initState initializes _currentValue from widget.initialValue', expectedOutput: true },
      { id: 't3', description: 'Mutations use setState() and enforce min/max bounds', expectedOutput: true },
    ],
  },

  {
    id: 'lab-fl-form-validation',
    title: 'LAB-FL04: Form Validation & Controllers (GlobalKey<FormState>)',
    category: 'flutter-stateful',
    difficulty: 'Hard',
    description: 'Implement a secure authentication form with GlobalKey<FormState>, TextEditingController, validators, and dispose cleanup.',
    instructions: [
      'Create class LoginForm extends StatefulWidget.',
      'In State, declare final _formKey = GlobalKey<FormState>().',
      'Declare late final TextEditingController _emailController and _passwordController.',
      'Dispose both controllers in dispose() using super.dispose().',
      'Validate email: must not be empty and must contain "@" and ".".',
      'Validate password: must not be empty and length >= 6.',
      'Implement _handleSubmit(): if (_formKey.currentState!.validate()) { ... }',
    ],
    starterCode: `import 'package:flutter/material.dart';

class LoginForm extends StatefulWidget {
  final void Function(String email, String password)? onLoginSuccess;
  const LoginForm({super.key, this.onLoginSuccess});

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _emailController;
  late final TextEditingController _passwordController;

  @override
  void initState() {
    super.initState();
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
  }

  @override
  void dispose() {
    // TODO: Dispose controllers to prevent memory leaks
    super.dispose();
  }

  void _handleSubmit() {
    // TODO: Validate form using _formKey.currentState!.validate()
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          // TODO: TextFormField for email with validator
          // TODO: TextFormField for password with validator & obscureText: true
          // TODO: ElevatedButton calling _handleSubmit
        ],
      ),
    );
  }
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Implement LoginForm with GlobalKey<FormState>, TextEditingControllers,
// validator rules (email @ and password >= 6), and dispose() cleanup.

import 'package:flutter/material.dart';

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'Form uses GlobalKey<FormState> for validation control', expectedOutput: true },
      { id: 't2', description: 'TextEditingControllers are instantiated and properly disposed in dispose()', expectedOutput: true },
      { id: 't3', description: 'Validators verify email format and minimum password length of 6', expectedOutput: true },
    ],
  },

  {
    id: 'lab-fl-dynamic-list',
    title: 'LAB-FL05: Dynamic Todo List (ListView.builder & Item State)',
    category: 'flutter-stateful',
    difficulty: 'Intermediate',
    description: 'Construct an efficient scrolling list using ListView.builder with dynamic item addition and completion toggling.',
    instructions: [
      'Define class TodoItem with final String id, final String title, bool isCompleted.',
      'Create class TodoListWidget extends StatefulWidget.',
      'In State, manage List<TodoItem> _todos.',
      'In build(), use ListView.builder with itemCount: _todos.length.',
      'Render each item using CheckboxListTile, calling setState() when onChanged fires to toggle isCompleted.',
    ],
    starterCode: `import 'package:flutter/material.dart';

class TodoItem {
  final String id;
  final String title;
  bool isCompleted;
  TodoItem({required this.id, required this.title, this.isCompleted = false});
}

class TodoListWidget extends StatefulWidget {
  const TodoListWidget({super.key});

  @override
  State<TodoListWidget> createState() => _TodoListWidgetState();
}

class _TodoListWidgetState extends State<TodoListWidget> {
  final List<TodoItem> _todos = [
    TodoItem(id: '1', title: 'Study Dart Records'),
    TodoItem(id: '2', title: 'Master FutureBuilder'),
  ];

  void _toggleTodo(int index, bool? value) {
    // TODO: Update item isCompleted inside setState()
  }

  @override
  Widget build(BuildContext context) {
    // TODO: Return ListView.builder rendering CheckboxListTile for each todo
    return ListView.builder(
      itemCount: _todos.length,
      itemBuilder: (context, index) {
        return const SizedBox();
      },
    );
  }
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Build TodoListWidget with dynamic ListView.builder and CheckboxListTile
// Manage List<TodoItem> and toggle completion with setState()

import 'package:flutter/material.dart';

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'Uses ListView.builder for efficient virtualized rendering', expectedOutput: true },
      { id: 't2', description: 'CheckboxListTile triggers setState to toggle isCompleted', expectedOutput: true },
    ],
  },

  // --- ASYNC & NAVIGATION ---
  {
    id: 'lab-fl-futurebuilder-feed',
    title: 'LAB-FL06: Async Feed with FutureBuilder & Caching in initState',
    category: 'flutter-async-nav',
    difficulty: 'Hard',
    description: 'Implement a resilient FutureBuilder screen that avoids Prof. Bouchrika\'s Trap #1 (re-executing Futures on build).',
    instructions: [
      'Create class PostFeedScreen extends StatefulWidget.',
      'Declare late Future<List<String>> _postsFuture in State.',
      'CRITICAL: Call fetchPosts() in initState() and assign to _postsFuture! NEVER instantiate the Future directly in build()!',
      'In build(), pass future: _postsFuture to FutureBuilder<List<String>>.',
      'Handle ConnectionState.waiting -> return Center(child: CircularProgressIndicator()).',
      'Handle snapshot.hasError -> return Center(child: Text("Error: \${snapshot.error}")).',
      'Handle snapshot.hasData -> return ListView.builder with ListTiles.',
    ],
    starterCode: `import 'package:flutter/material.dart';

Future<List<String>> fetchPosts() async {
  await Future.delayed(const Duration(milliseconds: 500));
  return ["Lecture 1: Dart", "Lecture 2: TDD", "Lecture 3: OOP"];
}

class PostFeedScreen extends StatefulWidget {
  const PostFeedScreen({super.key});

  @override
  State<PostFeedScreen> createState() => _PostFeedScreenState();
}

class _PostFeedScreenState extends State<PostFeedScreen> {
  // TODO: Declare late Future<List<String>> _postsFuture
  
  @override
  void initState() {
    super.initState();
    // TODO: Cache Future in initState to avoid infinite refetches!
  }

  @override
  Widget build(BuildContext context) {
    // TODO: Implement FutureBuilder handling waiting, error, and data states
    return const Scaffold();
  }
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Implement PostFeedScreen with FutureBuilder
// MUST cache future in initState to avoid re-triggering network on rebuilds!

import 'package:flutter/material.dart';

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'Future is cached in initState to prevent refetch on rebuild (Trap #1)', expectedOutput: true },
      { id: 't2', description: 'FutureBuilder handles ConnectionState.waiting with CircularProgressIndicator', expectedOutput: true },
      { id: 't3', description: 'FutureBuilder handles hasError and displays data with ListView.builder', expectedOutput: true },
    ],
  },

  {
    id: 'lab-fl-nav-stack',
    title: 'LAB-FL07: Two-Screen Navigation with Result Passing (Navigator)',
    category: 'flutter-async-nav',
    difficulty: 'Intermediate',
    description: 'Traverse the Flutter navigation stack with typed result retrieval via Navigator.push and Navigator.pop.',
    instructions: [
      'Create class SelectionScreen extends StatelessWidget with a list of color choices.',
      'When user taps a color, call Navigator.pop(context, selectedColor) to return the selection.',
      'In HomeScreen, implement Future<void> _pickColor(BuildContext context) async.',
      'Await Navigator.push(context, MaterialPageRoute(builder: (_) => const SelectionScreen())).',
      'Store and display the returned result in HomeScreen state via setState().',
    ],
    starterCode: `import 'package:flutter/material.dart';

class SelectionScreen extends StatelessWidget {
  const SelectionScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Select a Color")),
      body: ListView(
        children: [
          ListTile(
            title: const Text("Electric Blue"),
            onTap: () {
              // TODO: Return "Electric Blue" using Navigator.pop
            },
          ),
          ListTile(
            title: const Text("Neon Violet"),
            onTap: () {
              // TODO: Return "Neon Violet" using Navigator.pop
            },
          ),
        ],
      ),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String _selectedColor = "None";

  Future<void> _navigateAndSelectColor(BuildContext context) async {
    // TODO: await Navigator.push with MaterialPageRoute, update _selectedColor in setState
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(child: Text("Color: $_selectedColor")),
    );
  }
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Implement SelectionScreen and HomeScreen navigation with Navigator.push / pop

import 'package:flutter/material.dart';

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'SelectionScreen passes result back via Navigator.pop(context, result)', expectedOutput: true },
      { id: 't2', description: 'HomeScreen pushes MaterialPageRoute and awaits returned value', expectedOutput: true },
    ],
  },

  {
    id: 'lab-fl-streambuilder-chat',
    title: 'LAB-FL08: Real-Time StreamBuilder Live Message Feed',
    category: 'flutter-async-nav',
    difficulty: 'Hard',
    description: 'Build a reactive streaming UI using StreamBuilder that updates instantly as new data events arrive.',
    instructions: [
      'Define class ChatMessage with final String sender, final String text.',
      'Create class LiveChatFeed extends StatelessWidget with final Stream<List<ChatMessage>> messageStream.',
      'Use StreamBuilder<List<ChatMessage>>(stream: messageStream, builder: ...).',
      'Handle ConnectionState.waiting -> return Center(child: CircularProgressIndicator()).',
      'Handle snapshot.hasError -> return Center(child: Text("Stream error")).',
      'Render incoming messages using ListView.builder.',
    ],
    starterCode: `import 'package:flutter/material.dart';

class ChatMessage {
  final String sender;
  final String text;
  ChatMessage(this.sender, this.text);
}

class LiveChatFeed extends StatelessWidget {
  final Stream<List<ChatMessage>> messageStream;
  const LiveChatFeed({super.key, required this.messageStream});

  @override
  Widget build(BuildContext context) {
    // TODO: Return StreamBuilder<List<ChatMessage>> handling states & rendering ListView
    return const SizedBox();
  }
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Build LiveChatFeed with StreamBuilder<List<ChatMessage>> from scratch

import 'package:flutter/material.dart';

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'StreamBuilder listens to messageStream and handles waiting state', expectedOutput: true },
      { id: 't2', description: 'Renders dynamic incoming message stream using ListView.builder', expectedOutput: true },
    ],
  },

  // --- CODE FROM ZERO WIDGET CHALLENGES ---
  {
    id: 'lab-fl-scratch-rating',
    title: '[FROM ZERO] Star Rating Bar Widget (StatefulWidget)',
    category: 'scratch',
    difficulty: 'Hard',
    description: 'Construct a reusable 5-star rating widget completely from zero lines of starter code.',
    instructions: [
      'Write class StarRatingBar extends StatefulWidget with final int maxRating, final int initialRating, final ValueChanged<int>? onRatingChanged.',
      'Create State class _StarRatingBarState.',
      'In build(), return a Row containing 5 IconButtons (or GestureDetector + Icon).',
      'Icons before or equal to current rating display Icons.star; icons after display Icons.star_border.',
      'Tapping any star updates state via setState() and invokes onRatingChanged(newRating).',
    ],
    starterCode: `import 'package:flutter/material.dart';

class StarRatingBar extends StatefulWidget {
  final int maxRating;
  final int initialRating;
  final ValueChanged<int>? onRatingChanged;

  const StarRatingBar({
    super.key,
    this.maxRating = 5,
    this.initialRating = 0,
    this.onRatingChanged,
  });

  @override
  State<StarRatingBar> createState() => _StarRatingBarState();
}

class _StarRatingBarState extends State<StarRatingBar> {
  late int _rating;

  @override
  void initState() {
    super.initState();
    _rating = widget.initialRating;
  }

  @override
  Widget build(BuildContext context) {
    // Write your interactive Star Rating Row here:
    return const SizedBox();
  }
}
`,
    zeroScratchCode: `// WRITE COMPLETELY FROM ZERO:
// class StarRatingBar extends StatefulWidget
// Row of stars with tap handler, state mutation, and callback

import 'package:flutter/material.dart';

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'StarRatingBar is a StatefulWidget with maxRating and initialRating', expectedOutput: true },
      { id: 't2', description: 'Renders interactive Row of Star icons toggling filled/unfilled state', expectedOutput: true },
      { id: 't3', description: 'Tapping a star triggers setState and onRatingChanged callback', expectedOutput: true },
    ],
  },

  // --- CORE DART & OOP REVISION CHALLENGES ---
  {
    id: 'chal-algo-1',
    title: 'LAB-01: Palindrome & Binary Converter (Core Dart)',
    category: 'foundations',
    difficulty: 'Beginner',
    description: 'Implement core string inspection and numeral system conversion in pure Dart.',
    instructions: [
      'Implement bool isPalindrome(String input) - return true if input reads the same forward and backwards (case-insensitive).',
      'Implement String decimalTobinary(int input) - convert any non-negative integer into its binary string representation.',
    ],
    starterCode: `bool isPalindrome(String input) {
  // TODO: Implement case-insensitive palindrome checker
  return false;
}

String decimalTobinary(int input) {
  // TODO: Convert decimal integer into binary string
  return "";
}

void main() {
  print("radar is palindrome: \${isPalindrome('radar')}");
  print("10 in binary: \${decimalTobinary(10)}");
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Implement isPalindrome and decimalTobinary from scratch

void main() {
  
}
`,
    testCases: [
      { id: 't1', description: 'isPalindrome("radar") returns true', expectedOutput: true },
      { id: 't2', description: 'isPalindrome("hello") returns false', expectedOutput: false },
      { id: 't3', description: 'decimalTobinary(10) returns "1010"', expectedOutput: '1010' },
      { id: 't4', description: 'decimalTobinary(0) returns "0"', expectedOutput: '0' },
    ],
  },

  {
    id: 'chal-pat-1',
    title: 'LAB-04: CounterStore Singleton Pattern',
    category: 'patterns',
    difficulty: 'Intermediate',
    description: 'Implement a thread-safe Singleton store in Dart with factory constructor and state synchronization.',
    instructions: [
      'Declare private constructor CounterStore._internal().',
      'Declare static final CounterStore _instance = CounterStore._internal().',
      'Declare factory constructor CounterStore() => _instance.',
      'Manage integer count with increment(), decrement(), and reset().',
    ],
    starterCode: `class CounterStore {
  // TODO: Declare private constructor CounterStore._internal()
  // TODO: Declare static final _instance
  // TODO: Declare factory constructor CounterStore()

  int _count = 0;
  int get count => _count;

  void increment() => _count++;
  void decrement() => _count--;
  void reset() => _count = 0;
}

void main() {
  var s1 = CounterStore();
  var s2 = CounterStore();
  s1.increment();
  print("Identical: \${identical(s1, s2)}, count: \${s2.count}");
}
`,
    zeroScratchCode: `// CODE FROM ZERO: Implement the CounterStore Singleton from scratch

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'CounterStore() returns identical instance', expectedOutput: true },
      { id: 't2', description: 'State increment is synchronized across references', expectedOutput: 1 },
    ],
  },

  {
    id: 'chal-sandbox',
    title: 'Freeform Pure Dart & Flutter Sandbox',
    category: 'sandbox',
    difficulty: 'Beginner',
    description: 'Freeform scratchpad to write and test arbitrary Dart 3 and Flutter widget structures.',
    instructions: [
      'Write any valid Dart 3 or Flutter code.',
      'Use the Run button to execute and inspect the console output.',
    ],
    starterCode: `import 'dart:async';

void main() async {
  print("🚀 Welcome to the ENSIA Flutter & Dart Coding Sandbox!");
  
  // Test Event Loop queue priority:
  scheduleMicrotask(() => print("1. Microtask executed"));
  Future(() => print("2. Event queue Future executed"));
  print("3. Synchronous main completed");
}
`,
    zeroScratchCode: `void main() {
  
}
`,
    testCases: [],
  },
];


// ============================================================================
// 2. EXAM CODING CHALLENGES (Dedicated Final Exam Practical Tasks)
// COMPLETELY DIFFERENT FROM CODING ARENA LABS!
// Rigorous examination tasks evaluating end-to-end Flutter widget construction.
// ============================================================================

export const EXAM_CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: 'exam-fl-1',
    title: 'Exam Task 1: Responsive Product Card with Stack & Badge (StatelessWidget)',
    category: 'flutter-widgets',
    difficulty: 'Intermediate',
    description: 'Construct a complete ProductCardWidget utilizing Stack, Positioned discount badge, Card, Column, and price formatting.',
    instructions: [
      'Create class ProductCardWidget extends StatelessWidget.',
      'Fields: final String title, final double price, final double? discountPercent, final String imageUrl, final VoidCallback onAddToCart.',
      'Use a Card with rounded corners (BorderRadius.circular(16)).',
      'Use a Stack to display a top image container and a Positioned top-right discount badge (if discountPercent != null).',
      'Below image, render title with maxLines: 2 and TextOverflow.ellipsis.',
      'Display price formatted as "\\$29.99" and an ElevatedButton labeled "Add to Cart".',
    ],
    starterCode: `import 'package:flutter/material.dart';

class ProductCardWidget extends StatelessWidget {
  final String title;
  final double price;
  final double? discountPercent;
  final String imageUrl;
  final VoidCallback onAddToCart;

  const ProductCardWidget({
    super.key,
    required this.title,
    required this.price,
    this.discountPercent,
    required this.imageUrl,
    required this.onAddToCart,
  });

  @override
  Widget build(BuildContext context) {
    // TODO: Build ProductCard with Stack, Positioned badge, Text, and ElevatedButton
    return const Card();
  }
}

void main() {
  final product = ProductCardWidget(
    title: "Flutter in Action",
    price: 39.99,
    discountPercent: 15.0,
    imageUrl: "https://example.com/flutter.png",
    onAddToCart: () => print("Added!"),
  );
  print("Exam Task 1: ProductCard created for \${product.title}");
}
`,
    zeroScratchCode: `// EXAM FROM ZERO: Write ProductCardWidget extends StatelessWidget from scratch
// Must use Stack, Positioned discount badge, Card, Column, formatted price, and ElevatedButton.

import 'package:flutter/material.dart';

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'ProductCardWidget uses Stack and Positioned for discount badge layout', expectedOutput: true },
      { id: 't2', description: 'Uses Card with rounded border and Text with TextOverflow.ellipsis', expectedOutput: true },
      { id: 't3', description: 'Integrates ElevatedButton triggering onAddToCart callback', expectedOutput: true },
    ],
  },

  {
    id: 'exam-fl-2',
    title: 'Exam Task 2: Robust User Registration Form (StatefulWidget & FormState)',
    category: 'flutter-stateful',
    difficulty: 'Hard',
    description: 'Implement a production-grade registration screen with GlobalKey<FormState>, password match validation, and controller disposal.',
    instructions: [
      'Create class RegistrationForm extends StatefulWidget.',
      'Declare final _formKey = GlobalKey<FormState>().',
      'Declare TextEditingController for email, password, and confirmPassword.',
      'Dispose all three controllers in dispose() to prevent memory leaks.',
      'Validator for email: must contain "@" and ".".',
      'Validator for password: length >= 8 and at least one digit.',
      'Validator for confirmPassword: must match passwordController.text.',
      'Submit button triggers _formKey.currentState!.validate().',
    ],
    starterCode: `import 'package:flutter/material.dart';

class RegistrationForm extends StatefulWidget {
  final void Function(String email, String password)? onRegister;
  const RegistrationForm({super.key, this.onRegister});

  @override
  State<RegistrationForm> createState() => _RegistrationFormState();
}

class _RegistrationFormState extends State<RegistrationForm> {
  final _formKey = GlobalKey<FormState>();
  late final TextEditingController _emailController;
  late final TextEditingController _passwordController;
  late final TextEditingController _confirmPasswordController;

  @override
  void initState() {
    super.initState();
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
    _confirmPasswordController = TextEditingController();
  }

  @override
  void dispose() {
    // TODO: Dispose all controllers properly
    super.dispose();
  }

  void _submit() {
    // TODO: Validate with _formKey and call onRegister
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          // TODO: Email TextFormField
          // TODO: Password TextFormField (obscureText)
          // TODO: Confirm Password TextFormField (must match password)
          // TODO: ElevatedButton
        ],
      ),
    );
  }
}
`,
    zeroScratchCode: `// EXAM FROM ZERO: Implement complete RegistrationForm with FormState, 3 controllers,
// password match validation, and dispose() cleanup.

import 'package:flutter/material.dart';

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'RegistrationForm uses GlobalKey<FormState> for validation', expectedOutput: true },
      { id: 't2', description: 'Controllers for email, password, and confirmPassword disposed in dispose()', expectedOutput: true },
      { id: 't3', description: 'Confirm password validator validates equality with primary password', expectedOutput: true },
    ],
  },

  {
    id: 'exam-fl-3',
    title: 'Exam Task 3: Weather Dashboard with Safe FutureBuilder (Caching in initState)',
    category: 'flutter-async-nav',
    difficulty: 'Hard',
    description: 'Implement an asynchronous weather dashboard screen that avoids refetching data on widget rebuilds (Bouchrika Trap #1).',
    instructions: [
      'Create class WeatherDashboard extends StatefulWidget with final String city.',
      'Define model class WeatherData with final String city, final double temperature, final String condition.',
      'In State, declare late Future<WeatherData> _weatherFuture.',
      'Initialize _weatherFuture in initState() calling fetchWeather(widget.city). NEVER in build()!',
      'In build(), render FutureBuilder<WeatherData>.',
      'When ConnectionState.waiting, display CircularProgressIndicator.',
      'When hasError, display an Error icon with retry button resetting _weatherFuture in setState().',
      'When hasData, display the weather card with temperature and condition.',
    ],
    starterCode: `import 'package:flutter/material.dart';

class WeatherData {
  final String city;
  final double temperature;
  final String condition;
  WeatherData({required this.city, required this.temperature, required this.condition});
}

Future<WeatherData> fetchWeather(String city) async {
  await Future.delayed(const Duration(milliseconds: 300));
  return WeatherData(city: city, temperature: 24.5, condition: "Sunny");
}

class WeatherDashboard extends StatefulWidget {
  final String city;
  const WeatherDashboard({super.key, required this.city});

  @override
  State<WeatherDashboard> createState() => _WeatherDashboardState();
}

class _WeatherDashboardState extends State<WeatherDashboard> {
  // TODO: Declare late Future<WeatherData> _weatherFuture

  @override
  void initState() {
    super.initState();
    // TODO: Cache Future in initState! (Trap #1 prevention)
  }

  @override
  Widget build(BuildContext context) {
    // TODO: Implement FutureBuilder handling waiting, error, and data states
    return const Scaffold();
  }
}
`,
    zeroScratchCode: `// EXAM FROM ZERO: Implement WeatherDashboard with FutureBuilder
// MUST cache future in initState to avoid infinite network loops on rebuild!

import 'package:flutter/material.dart';

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'Future is cached in initState to prevent rebuild refetching (Trap #1)', expectedOutput: true },
      { id: 't2', description: 'FutureBuilder handles waiting state with CircularProgressIndicator', expectedOutput: true },
      { id: 't3', description: 'FutureBuilder renders WeatherData on success and error UI on failure', expectedOutput: true },
    ],
  },

  {
    id: 'exam-fl-4',
    title: 'Exam Task 4: Interactive Shopping Cart State Manager (StatefulWidget & Subtotal)',
    category: 'flutter-stateful',
    difficulty: 'Hard',
    description: 'Implement a comprehensive shopping cart state manager that recalculates subtotals, manages item quantities, and removes items at zero.',
    instructions: [
      'Create class ShoppingCartManager extends StatefulWidget.',
      'Manage List<CartLineItem> _items with final String id, final String name, final double price, int quantity.',
      'Implement double get subtotal => _items.fold(0.0, (sum, item) => sum + (item.price * item.quantity)).',
      'Implement void _incrementItem(String id) and void _decrementItem(String id) inside setState().',
      'When quantity drops to 0, automatically remove item from _items.',
      'Render items using ListView.builder and display sticky bottom summary bar with formatted subtotal.',
    ],
    starterCode: `import 'package:flutter/material.dart';

class CartLineItem {
  final String id;
  final String name;
  final double price;
  int quantity;
  CartLineItem({required this.id, required this.name, required this.price, this.quantity = 1});
}

class ShoppingCartManager extends StatefulWidget {
  const ShoppingCartManager({super.key});

  @override
  State<ShoppingCartManager> createState() => _ShoppingCartManagerState();
}

class _ShoppingCartManagerState extends State<ShoppingCartManager> {
  final List<CartLineItem> _items = [
    CartLineItem(id: '1', name: 'Flutter Hoodie', price: 49.99, quantity: 1),
    CartLineItem(id: '2', name: 'Dart Mug', price: 14.99, quantity: 2),
  ];

  double get subtotal => _items.fold(0.0, (sum, item) => sum + (item.price * item.quantity));

  void _increment(String id) {
    // TODO: Increment item quantity inside setState()
  }

  void _decrement(String id) {
    // TODO: Decrement item quantity inside setState(), remove if quantity <= 0
  }

  @override
  Widget build(BuildContext context) {
    // TODO: Build Scaffold with ListView of cart items and bottom subtotal bar
    return const Scaffold();
  }
}
`,
    zeroScratchCode: `// EXAM FROM ZERO: Implement ShoppingCartManager StatefulWidget completely from scratch
// Must calculate subtotal, increment/decrement quantities, and auto-remove at zero.

import 'package:flutter/material.dart';

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'ShoppingCartManager dynamically computes subtotal using fold()', expectedOutput: true },
      { id: 't2', description: 'Increment and decrement updates quantities inside setState()', expectedOutput: true },
      { id: 't3', description: 'Removes line items when quantity reaches 0', expectedOutput: true },
    ],
  },

  {
    id: 'exam-fl-5',
    title: 'Exam Task 5: Master-Detail Catalog Navigation with Result Passing (Navigator)',
    category: 'flutter-async-nav',
    difficulty: 'Intermediate',
    description: 'Construct a two-screen product catalog flow utilizing Navigator.push, typed Route arguments, and returning modified state.',
    instructions: [
      'Create class ProductDetailScreen extends StatelessWidget with final String productId, final bool isFavorite.',
      'Include a Favorite toggle button calling Navigator.pop(context, !isFavorite) to return updated favorite status.',
      'In ProductCatalogScreen, tapping any catalog item calls await Navigator.push(context, MaterialPageRoute(...)).',
      'Upon receiving the returned boolean result, update the catalog item favorite state in setState().',
    ],
    starterCode: `import 'package:flutter/material.dart';

class ProductDetailScreen extends StatelessWidget {
  final String productId;
  final bool isFavorite;

  const ProductDetailScreen({
    super.key,
    required this.productId,
    required this.isFavorite,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Product $productId")),
      body: Center(
        child: ElevatedButton.icon(
          icon: Icon(isFavorite ? Icons.favorite : Icons.favorite_border),
          label: Text(isFavorite ? "Remove Favorite" : "Add to Favorites"),
          onPressed: () {
            // TODO: Return updated favorite boolean (!isFavorite) via Navigator.pop
          },
        ),
      ),
    );
  }
}

class ProductCatalogScreen extends StatefulWidget {
  const ProductCatalogScreen({super.key});

  @override
  State<ProductCatalogScreen> createState() => _ProductCatalogScreenState();
}

class _ProductCatalogScreenState extends State<ProductCatalogScreen> {
  bool _isFavorite = false;

  Future<void> _openDetail(BuildContext context) async {
    // TODO: Push ProductDetailScreen with MaterialPageRoute and await result
    // Update _isFavorite in setState if returned result is not null
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ListTile(
          title: const Text("Flutter Dev Guide"),
          trailing: Icon(_isFavorite ? Icons.favorite : Icons.favorite_border),
          onTap: () => _openDetail(context),
        ),
      ),
    );
  }
}
`,
    zeroScratchCode: `// EXAM FROM ZERO: Implement ProductDetailScreen and ProductCatalogScreen navigation
// Must return updated favorite boolean via Navigator.pop and await in parent.

import 'package:flutter/material.dart';

void main() {

}
`,
    testCases: [
      { id: 't1', description: 'ProductDetailScreen returns updated favorite boolean via Navigator.pop', expectedOutput: true },
      { id: 't2', description: 'ProductCatalogScreen awaits push result and updates state with setState', expectedOutput: true },
    ],
  },
];
