import { describe, it, expect, beforeEach } from 'vitest';
import { useExamStore } from '../store/examStore';

describe('Exam Scoring & Simulator Engine', () => {
  beforeEach(() => {
    useExamStore.getState().resetExam();
  });

  it('initializes exam with 90-minute countdown (5400s)', () => {
    const store = useExamStore.getState();
    store.startExam(['q1', 'q2'], ['c1']);

    const active = useExamStore.getState();
    expect(active.isActive).toBe(true);
    expect(active.isCompleted).toBe(false);
    expect(active.timeRemainingSeconds).toBe(5400);
    expect(active.selectedQuestionIds).toEqual(['q1', 'q2']);
  });

  it('ticks the timer down by 1 second on each tick', () => {
    const store = useExamStore.getState();
    store.startExam(['q1'], ['c1'], 100);

    store.tickTimer();
    expect(useExamStore.getState().timeRemainingSeconds).toBe(99);
  });

  it('auto-submits when timer reaches 0', () => {
    const store = useExamStore.getState();
    store.startExam(['q1'], ['c1'], 1);

    store.tickTimer(); // time hits zero -> auto submits
    const state = useExamStore.getState();
    expect(state.isCompleted).toBe(true);
    expect(state.isActive).toBe(false);
    expect(state.currentExamResult).not.toBeNull();
  });

  it('correctly calculates weighted score: 45% quiz, 55% coding', () => {
    const store = useExamStore.getState();
    store.startExam(['q1', 'q2'], ['c1', 'c2']);

    // Answer 2 quiz questions: 1 correct, 1 incorrect => 50%
    store.recordAnswer('q1', 1, 30);
    useExamStore.setState((prev) => ({
      quizAnswers: {
        ...prev.quizAnswers,
        q1: { ...prev.quizAnswers.q1, isCorrect: true },
        q2: { questionId: 'q2', userAnswer: 0, isCorrect: false, timeSpentSeconds: 40 },
      },
    }));

    // Coding submission: 4/5 tests passed on c1, 4/5 on c2 => 8/10 = 80%
    store.recordCodingSubmission('c1', 'code1', 4, 5);
    store.recordCodingSubmission('c2', 'code2', 4, 5);

    const result = store.submitExam();

    expect(result.quizScorePercent).toBe(50);
    expect(result.codingScorePercent).toBe(80);

    // Weighted: (50 * 0.45) + (80 * 0.55) = 22.5 + 44 = 66.5 => Math.round(66.5) = 67%
    expect(result.finalScorePercent).toBe(67);
    expect(result.passed).toBe(false); // < 70% threshold
  });

  it('passes exam when weighted score is >= 70%', () => {
    const store = useExamStore.getState();
    store.startExam(['q1'], ['c1']);

    // 100% quiz
    useExamStore.setState((prev) => ({
      quizAnswers: {
        q1: { questionId: 'q1', userAnswer: 1, isCorrect: true, timeSpentSeconds: 20 },
      },
    }));

    // 100% coding
    store.recordCodingSubmission('c1', 'code1', 5, 5);

    const result = store.submitExam();
    expect(result.finalScorePercent).toBe(100);
    expect(result.passed).toBe(true);
  });
});
