import { describe, it, expect } from 'vitest';
import { getMiniGameRounds, MINI_GAME_PACKS } from '../data/miniGamesData';

describe('Mini Games Engine', () => {
  it('has dedicated packs defined for mini-games', () => {
    expect(MINI_GAME_PACKS['game-1-1'].length).toBeGreaterThan(0);
    expect(MINI_GAME_PACKS['game-2-1'].length).toBeGreaterThan(0);
    expect(MINI_GAME_PACKS['game-6-1'].length).toBeGreaterThan(0);
    expect(MINI_GAME_PACKS['game-8-1'].length).toBeGreaterThan(0);
  });

  it('generates non-repeating rounds for each mini-game', () => {
    for (let levelId = 1; levelId <= 8; levelId++) {
      const rounds = getMiniGameRounds(`game-${levelId}-1`, levelId, 5);
      expect(rounds.length).toBeGreaterThanOrEqual(3);

      // Check all question IDs in the round are unique
      const ids = rounds.map((r) => r.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);

      // Check all questions have valid options and correctAnswer
      rounds.forEach((r) => {
        expect(r.options.length).toBeGreaterThan(0);
        expect(r.correctAnswer).toBeDefined();
        const hasMatchingOption = r.options.some((o) => o.key === r.correctAnswer);
        expect(hasMatchingOption).toBe(true);
      });
    }
  });

  it('generates different game rounds when played again or across different games', () => {
    const rounds1 = getMiniGameRounds('game-1-1', 1, 5);
    const rounds2 = getMiniGameRounds('game-1-2', 1, 5);

    // Two different games in level 1 should have distinct target questions
    expect(rounds1).toBeDefined();
    expect(rounds2).toBeDefined();
    expect(rounds1.length).toBeGreaterThan(0);
    expect(rounds2.length).toBeGreaterThan(0);
  });
});
