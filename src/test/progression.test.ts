import { describe, it, expect, beforeEach } from 'vitest';
import { useProgressionStore } from '../store/progressionStore';

describe('Progression Engine', () => {
  beforeEach(() => {
    useProgressionStore.getState().resetProgress();
  });

  it('initializes with Level 1 unlocked and all other levels locked', () => {
    const store = useProgressionStore.getState();
    expect(store.isLevelUnlocked(1)).toBe(true);
    expect(store.isLevelUnlocked(2)).toBe(false);
    expect(store.isLevelUnlocked(8)).toBe(false);
  });

  it('enforces that lessons must be completed before quiz unlocks', () => {
    const store = useProgressionStore.getState();
    // Initially, level 1 lessons are incomplete
    expect(store.canTakeQuiz(1)).toBe(false);

    // Complete lesson
    store.completeLesson(1);
    const updatedStore = useProgressionStore.getState();
    expect(updatedStore.levels[1].isLessonsCompleted).toBe(true);
    expect(updatedStore.canTakeQuiz(1)).toBe(true);
    expect(updatedStore.stats.totalXp).toBe(50);
  });

  it('requires passing quiz score (>= threshold) before boss can be challenged', () => {
    const store = useProgressionStore.getState();
    store.completeLesson(1);

    // Take quiz with failing score (60% < 70%)
    const failed = store.recordQuizScore(1, 60, 70);
    expect(failed).toBe(false);
    expect(useProgressionStore.getState().canFightBoss(1)).toBe(false);

    // Retake quiz with passing score (85% >= 70%)
    const passed = store.recordQuizScore(1, 85, 70);
    expect(passed).toBe(true);
    expect(useProgressionStore.getState().levels[1].isQuizPassed).toBe(true);
    expect(useProgressionStore.getState().canFightBoss(1)).toBe(true);
  });

  it('strictly unlocks Level 2 ONLY after defeating Level 1 Boss', () => {
    const store = useProgressionStore.getState();
    store.completeLesson(1);
    store.recordQuizScore(1, 80, 70);

    // Level 2 must still be locked
    expect(useProgressionStore.getState().isLevelUnlocked(2)).toBe(false);

    // Defeat Level 1 Boss
    store.defeatBoss(1, 300);

    const afterBoss = useProgressionStore.getState();
    expect(afterBoss.levels[1].isBossDefeated).toBe(true);
    expect(afterBoss.isLevelUnlocked(2)).toBe(true);
    expect(afterBoss.isLevelUnlocked(3)).toBe(false);
    expect(afterBoss.stats.completedLevelIds).toContain(1);
    expect(afterBoss.stats.codeChallengesPassed).toBe(1);
  });

  it('tracks accuracy per topic and overall statistics', () => {
    const store = useProgressionStore.getState();
    store.recordQuestionResult('Operators', true);
    store.recordQuestionResult('Operators', true);
    store.recordQuestionResult('Operators', false);

    const stats = useProgressionStore.getState().stats;
    expect(stats.totalQuestionsAnswered).toBe(3);
    expect(stats.correctAnswersCount).toBe(2);
    expect(stats.topicAccuracies['Operators']).toEqual({ total: 3, correct: 2 });
  });

  it('handles heart deductions and refills properly', () => {
    const store = useProgressionStore.getState();
    expect(store.stats.hearts).toBe(5);

    store.deductHeart();
    expect(useProgressionStore.getState().stats.hearts).toBe(4);

    store.refillHearts();
    expect(useProgressionStore.getState().stats.hearts).toBe(5);
  });

  it('resets progress cleanly back to Level 1', () => {
    const store = useProgressionStore.getState();
    store.completeLesson(1);
    store.recordQuizScore(1, 100, 70);
    store.defeatBoss(1, 300);

    expect(useProgressionStore.getState().isLevelUnlocked(2)).toBe(true);

    store.resetProgress();
    const resetStore = useProgressionStore.getState();
    expect(resetStore.currentLevelId).toBe(1);
    expect(resetStore.isLevelUnlocked(2)).toBe(false);
    expect(resetStore.stats.totalXp).toBe(0);
  });
});
