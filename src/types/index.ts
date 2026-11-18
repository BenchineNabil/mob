// ==========================================
// CORE TYPE DEFINITIONS: MOBILE DEV QUEST
// ==========================================

export type QuestionSource = 'original-quiz' | 'original-lab' | 'lecture-based' | 'generated';

export type QuestionDifficulty = 'easy' | 'medium' | 'hard' | 'trap';

export type QuestionType =
  | 'mcq'
  | 'true-false'
  | 'output-prediction'
  | 'compile-or-fail'
  | 'runtime-error-analysis'
  | 'code-debugging'
  | 'missing-code'
  | 'short-coding'
  | 'widget-tree';

export interface Question {
  id: string;
  levelId: number;
  topic: string;
  source: QuestionSource;
  sourceRef?: string; // e.g. "mobile.pdf p.5" or "L6 Slide 415"
  type: QuestionType;
  difficulty: QuestionDifficulty;
  prompt: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string | number | boolean | string[]; // depending on type
  explanation: string;
  trapWarning?: string; // Detailed breakdown of professor's specific trap
  hints?: string[];
}

export interface LessonSection {
  id: string;
  title: string;
  conceptProblem: string; // "What problem does this solve?"
  explanation: string;
  syntax?: string;
  codeExample?: string;
  outputPreview?: string;
  commonMistakes: string[];
  examTraps: string[];
  quickCheck: {
    question: string;
    codeSnippet?: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface Lesson {
  id: string;
  levelId: number;
  title: string;
  description: string;
  sections: LessonSection[];
}

export type GameMechanic =
  | 'type-detective'
  | 'collection-crusher'
  | 'operator-overdrive'
  | 'test-first-architect'
  | 'assertion-assailant'
  | 'clean-code-refactorer'
  | 'constructor-crafter'
  | 'interface-infiltrator'
  | 'mixin-matrix'
  | 'singleton-sentry'
  | 'factory-foundry'
  | 'decoupling-duel'
  | 'layout-labyrinth'
  | 'box-model-buster'
  | 'widget-tree-inspector'
  | 'state-matrix'
  | 'lifecycle-sentry'
  | 'tic-tac-toe-logic'
  | 'water-sort-puzzle'
  | 'snake-engine'
  | 'route-runner'
  | 'form-fortress'
  | 'serialization-sanctuary'
  | 'event-loop-enigma'
  | 'futurebuilder-fixer'
  | 'stream-patrol';

export interface MiniGame {
  id: string;
  levelId: number;
  title: string;
  subtitle: string;
  mechanic: GameMechanic;
  description: string;
  instructions: string[];
  estimatedMinutes: number;
  xpReward: number;
  config: Record<string, any>;
}

export interface BossChallenge {
  id: string;
  levelId: number;
  title: string;
  bossName: string;
  bossTitle: string;
  lore: string;
  description: string;
  requirements: string[];
  starterCode: string;
  solutionCode: string;
  timeLimitSeconds?: number;
  testCases: {
    id: string;
    description: string;
    input?: any;
    expectedOutput: any;
    isHidden?: boolean;
  }[];
}

export interface Level {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  lectureRef: string;
  description: string;
  iconName: string;
  topics: string[];
  passingScorePercent: number;
  bossChallenge: BossChallenge;
  miniGames: MiniGame[];
}

// User Progression State
export interface LevelStatus {
  isUnlocked: boolean;
  isLessonsCompleted: boolean;
  quizScorePercent?: number;
  isQuizPassed: boolean;
  isBossDefeated: boolean;
  completedGames: string[]; // game IDs
}

export interface UserStats {
  totalXp: number;
  hearts: number;
  maxHearts: number;
  streakDays: number;
  lastActiveDate: string;
  completedLevelIds: number[];
  quizzesTaken: number;
  totalQuestionsAnswered: number;
  correctAnswersCount: number;
  codeChallengesPassed: number;
  topicAccuracies: Record<string, { total: number; correct: number }>;
}

export interface ExamQuestionAnswer {
  questionId: string;
  userAnswer: any;
  isCorrect?: boolean;
  timeSpentSeconds: number;
}

export interface ExamCodingSubmission {
  challengeId: string;
  userCode: string;
  testsPassed: number;
  totalTests: number;
  isCompleted: boolean;
}

export interface ExamAttempt {
  id: string;
  timestamp: string;
  durationSeconds: number;
  timeRemainingSeconds: number;
  quizScorePercent: number;
  codingScorePercent: number;
  finalScorePercent: number;
  passed: boolean;
  answers: Record<string, ExamQuestionAnswer>;
  codingSubmissions: Record<string, ExamCodingSubmission>;
  weakTopics: string[];
}
