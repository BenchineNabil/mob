import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ExamAttempt, ExamQuestionAnswer, ExamCodingSubmission } from '../types';

interface ExamState {
  isActive: boolean;
  isCompleted: boolean;
  timeRemainingSeconds: number;
  totalDurationSeconds: number;
  startTime: number | null;
  selectedQuestionIds: string[];
  selectedCodingChallengeIds: string[];
  quizAnswers: Record<string, ExamQuestionAnswer>;
  codingSubmissions: Record<string, ExamCodingSubmission>;
  currentExamResult: ExamAttempt | null;
  examHistory: ExamAttempt[];

  // Actions
  startExam: (questionIds: string[], challengeIds: string[], durationSeconds?: number) => void;
  tickTimer: () => void;
  recordAnswer: (questionId: string, answer: any, isCorrectOrTime?: boolean | number, timeSpentSeconds?: number) => void;
  recordCodingSubmission: (challengeId: string, code: string, passed: number, total: number) => void;
  submitExam: () => ExamAttempt;
  resetExam: () => void;
}

export const useExamStore = create<ExamState>()(
  persist(
    (set, get) => ({
      isActive: false,
      isCompleted: false,
      timeRemainingSeconds: 90 * 60, // 90 minutes
      totalDurationSeconds: 90 * 60,
      startTime: null,
      selectedQuestionIds: [],
      selectedCodingChallengeIds: [],
      quizAnswers: {},
      codingSubmissions: {},
      currentExamResult: null,
      examHistory: [],

      startExam: (questionIds: string[], challengeIds: string[], durationSeconds = 90 * 60) => {
        set({
          isActive: true,
          isCompleted: false,
          timeRemainingSeconds: durationSeconds,
          totalDurationSeconds: durationSeconds,
          startTime: Date.now(),
          selectedQuestionIds: questionIds,
          selectedCodingChallengeIds: challengeIds,
          quizAnswers: {},
          codingSubmissions: {},
          currentExamResult: null,
        });
      },

      tickTimer: () => {
        const state = get();
        if (!state.isActive || state.isCompleted) return;

        if (state.timeRemainingSeconds <= 1) {
          // Time expired: auto-submit
          get().submitExam();
        } else {
          set({ timeRemainingSeconds: state.timeRemainingSeconds - 1 });
        }
      },

      recordAnswer: (questionId: string, answer: any, isCorrectOrTime?: boolean | number, timeSpentSeconds = 0) => {
        const isCorrect = typeof isCorrectOrTime === 'boolean' ? isCorrectOrTime : undefined;
        const time = typeof isCorrectOrTime === 'number' ? isCorrectOrTime : timeSpentSeconds;

        set((state) => ({
          quizAnswers: {
            ...state.quizAnswers,
            [questionId]: {
              questionId,
              userAnswer: answer,
              ...(isCorrect !== undefined ? { isCorrect } : {}),
              timeSpentSeconds: time,
            },
          },
        }));
      },

      recordCodingSubmission: (challengeId: string, code: string, passed: number, total: number) => {
        set((state) => ({
          codingSubmissions: {
            ...state.codingSubmissions,
            [challengeId]: {
              challengeId,
              userCode: code,
              testsPassed: passed,
              totalTests: total,
              isCompleted: passed === total && total > 0,
            },
          },
        }));
      },

      submitExam: () => {
        const state = get();
        const durationTaken = state.totalDurationSeconds - state.timeRemainingSeconds;

        // Calculate quiz score
        let quizScorePercent = 0;
        let totalQuizQuestions = state.selectedQuestionIds.length;
        if (totalQuizQuestions > 0) {
          let correctCount = 0;
          Object.values(state.quizAnswers).forEach((ans) => {
            if (ans.isCorrect) correctCount++;
          });
          quizScorePercent = Math.round((correctCount / totalQuizQuestions) * 100);
        }

        // Calculate coding score
        let codingScorePercent = 0;
        let totalChallenges = state.selectedCodingChallengeIds.length;
        if (totalChallenges > 0) {
          let totalPassedTests = 0;
          let totalPossibleTests = 0;
          Object.values(state.codingSubmissions).forEach((sub) => {
            totalPassedTests += sub.testsPassed;
            totalPossibleTests += sub.totalTests;
          });
          if (totalPossibleTests > 0) {
            codingScorePercent = Math.round((totalPassedTests / totalPossibleTests) * 100);
          }
        }

        // Weighted final score: 45% Quiz, 55% Coding
        const finalScorePercent = Math.round(quizScorePercent * 0.45 + codingScorePercent * 0.55);
        const passed = finalScorePercent >= 70;

        const attempt: ExamAttempt = {
          id: `exam-${Date.now()}`,
          timestamp: new Date().toISOString(),
          durationSeconds: durationTaken,
          timeRemainingSeconds: state.timeRemainingSeconds,
          quizScorePercent,
          codingScorePercent,
          finalScorePercent,
          passed,
          answers: state.quizAnswers,
          codingSubmissions: state.codingSubmissions,
          weakTopics: [],
        };

        set({
          isActive: false,
          isCompleted: true,
          currentExamResult: attempt,
          examHistory: [attempt, ...state.examHistory],
        });

        return attempt;
      },

      resetExam: () => {
        set({
          isActive: false,
          isCompleted: false,
          timeRemainingSeconds: 90 * 60,
          selectedQuestionIds: [],
          selectedCodingChallengeIds: [],
          quizAnswers: {},
          codingSubmissions: {},
          currentExamResult: null,
        });
      },
    }),
    {
      name: 'mobile-dev-quest-exam',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
