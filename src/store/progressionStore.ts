import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { LevelStatus, UserStats } from '../types';

interface ProgressionState {
  currentLevelId: number;
  levels: Record<number, LevelStatus>;
  stats: UserStats;
  
  // Actions
  completeLesson: (levelId: number) => void;
  recordQuizScore: (levelId: number, scorePercent: number, passingThreshold: number) => boolean;
  completeMiniGame: (levelId: number, gameId: string, xpEarned: number) => void;
  defeatBoss: (levelId: number, xpEarned: number) => void;
  recordQuestionResult: (topic: string, isCorrect: boolean) => void;
  deductHeart: () => void;
  refillHearts: () => void;
  addXp: (amount: number) => void;
  resetProgress: () => void;
  isLevelUnlocked: (levelId: number) => boolean;
  canTakeQuiz: (levelId: number) => boolean;
  canFightBoss: (levelId: number) => boolean;
}

const INITIAL_LEVELS_STATE: Record<number, LevelStatus> = {
  1: { isUnlocked: true, isLessonsCompleted: false, isQuizPassed: false, isBossDefeated: false, completedGames: [] },
  2: { isUnlocked: false, isLessonsCompleted: false, isQuizPassed: false, isBossDefeated: false, completedGames: [] },
  3: { isUnlocked: false, isLessonsCompleted: false, isQuizPassed: false, isBossDefeated: false, completedGames: [] },
  4: { isUnlocked: false, isLessonsCompleted: false, isQuizPassed: false, isBossDefeated: false, completedGames: [] },
  5: { isUnlocked: false, isLessonsCompleted: false, isQuizPassed: false, isBossDefeated: false, completedGames: [] },
  6: { isUnlocked: false, isLessonsCompleted: false, isQuizPassed: false, isBossDefeated: false, completedGames: [] },
  7: { isUnlocked: false, isLessonsCompleted: false, isQuizPassed: false, isBossDefeated: false, completedGames: [] },
  8: { isUnlocked: false, isLessonsCompleted: false, isQuizPassed: false, isBossDefeated: false, completedGames: [] },
};

const INITIAL_STATS_STATE: UserStats = {
  totalXp: 0,
  hearts: 5,
  maxHearts: 5,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLevelIds: [],
  quizzesTaken: 0,
  totalQuestionsAnswered: 0,
  correctAnswersCount: 0,
  codeChallengesPassed: 0,
  topicAccuracies: {},
};

export const useProgressionStore = create<ProgressionState>()(
  persist(
    (set, get) => ({
      currentLevelId: 1,
      levels: INITIAL_LEVELS_STATE,
      stats: INITIAL_STATS_STATE,

      isLevelUnlocked: (levelId: number) => {
        if (levelId === 1) return true;
        const current = get().levels[levelId];
        return current ? current.isUnlocked : false;
      },

      canTakeQuiz: (levelId: number) => {
        const status = get().levels[levelId];
        if (!status) return false;
        // Strict requirement: Lessons must be completed before quiz unlocks
        return status.isUnlocked && status.isLessonsCompleted;
      },

      canFightBoss: (levelId: number) => {
        const status = get().levels[levelId];
        if (!status) return false;
        // Boss unlocks only after quiz is passed
        return status.isUnlocked && status.isQuizPassed;
      },

      completeLesson: (levelId: number) => {
        set((state) => {
          const current = state.levels[levelId] || {
            isUnlocked: levelId === 1,
            isLessonsCompleted: false,
            isQuizPassed: false,
            isBossDefeated: false,
            completedGames: [],
          };
          return {
            levels: {
              ...state.levels,
              [levelId]: {
                ...current,
                isLessonsCompleted: true,
              },
            },
            stats: {
              ...state.stats,
              totalXp: state.stats.totalXp + 50,
            },
          };
        });
      },

      recordQuizScore: (levelId: number, scorePercent: number, passingThreshold: number) => {
        const isPassed = scorePercent >= passingThreshold;
        set((state) => {
          const current = state.levels[levelId];
          const newQuizzesTaken = state.stats.quizzesTaken + 1;
          const xpGained = isPassed ? 150 : 30;

          return {
            levels: {
              ...state.levels,
              [levelId]: {
                ...current,
                quizScorePercent: Math.max(current?.quizScorePercent || 0, scorePercent),
                isQuizPassed: current?.isQuizPassed || isPassed,
              },
            },
            stats: {
              ...state.stats,
              totalXp: state.stats.totalXp + xpGained,
              quizzesTaken: newQuizzesTaken,
            },
          };
        });
        return isPassed;
      },

      completeMiniGame: (levelId: number, gameId: string, xpEarned: number) => {
        set((state) => {
          const current = state.levels[levelId];
          const alreadyCompleted = current?.completedGames.includes(gameId);
          const updatedGames = alreadyCompleted
            ? current.completedGames
            : [...(current?.completedGames || []), gameId];

          return {
            levels: {
              ...state.levels,
              [levelId]: {
                ...current,
                completedGames: updatedGames,
              },
            },
            stats: {
              ...state.stats,
              totalXp: state.stats.totalXp + (alreadyCompleted ? Math.floor(xpEarned / 4) : xpEarned),
            },
          };
        });
      },

      defeatBoss: (levelId: number, xpEarned: number) => {
        set((state) => {
          const current = state.levels[levelId];
          const nextLevelId = levelId + 1;
          const nextLevel = state.levels[nextLevelId];
          const completedLevelIds = state.stats.completedLevelIds.includes(levelId)
            ? state.stats.completedLevelIds
            : [...state.stats.completedLevelIds, levelId];

          const updatedLevels: Record<number, LevelStatus> = {
            ...state.levels,
            [levelId]: {
              ...current,
              isBossDefeated: true,
            },
          };

          // Strict Progression rule: winning current level's boss unlocks next level
          if (nextLevelId <= 8 && nextLevel) {
            updatedLevels[nextLevelId] = {
              ...nextLevel,
              isUnlocked: true,
            };
          }

          return {
            levels: updatedLevels,
            currentLevelId: nextLevelId <= 8 ? nextLevelId : levelId,
            stats: {
              ...state.stats,
              totalXp: state.stats.totalXp + xpEarned,
              completedLevelIds,
              codeChallengesPassed: state.stats.codeChallengesPassed + 1,
            },
          };
        });
      },

      recordQuestionResult: (topic: string, isCorrect: boolean) => {
        set((state) => {
          const currentAcc = state.stats.topicAccuracies[topic] || { total: 0, correct: 0 };
          return {
            stats: {
              ...state.stats,
              totalQuestionsAnswered: state.stats.totalQuestionsAnswered + 1,
              correctAnswersCount: state.stats.correctAnswersCount + (isCorrect ? 1 : 0),
              topicAccuracies: {
                ...state.stats.topicAccuracies,
                [topic]: {
                  total: currentAcc.total + 1,
                  correct: currentAcc.correct + (isCorrect ? 1 : 0),
                },
              },
            },
          };
        });
      },

      deductHeart: () => {
        set((state) => ({
          stats: {
            ...state.stats,
            hearts: Math.max(0, state.stats.hearts - 1),
          },
        }));
      },

      refillHearts: () => {
        set((state) => ({
          stats: {
            ...state.stats,
            hearts: state.stats.maxHearts,
          },
        }));
      },

      addXp: (amount: number) => {
        set((state) => ({
          stats: {
            ...state.stats,
            totalXp: state.stats.totalXp + amount,
          },
        }));
      },

      resetProgress: () => {
        set({
          currentLevelId: 1,
          levels: INITIAL_LEVELS_STATE,
          stats: INITIAL_STATS_STATE,
        });
      },
    }),
    {
      name: 'mobile-dev-quest-progression',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
