import { Question } from '../../types';
import { LEVEL_1_QUESTIONS } from './level1Questions';
import { LEVEL_2_QUESTIONS } from './level2Questions';
import { LEVEL_3_QUESTIONS } from './level3Questions';
import { LEVEL_4_QUESTIONS } from './level4Questions';
import { LEVEL_5_QUESTIONS } from './level5Questions';
import { LEVEL_6_QUESTIONS } from './level6Questions';
import { LEVEL_7_QUESTIONS } from './level7Questions';
import { LEVEL_8_QUESTIONS } from './level8Questions';

export const ALL_QUESTIONS: Question[] = [
  ...LEVEL_1_QUESTIONS,
  ...LEVEL_2_QUESTIONS,
  ...LEVEL_3_QUESTIONS,
  ...LEVEL_4_QUESTIONS,
  ...LEVEL_5_QUESTIONS,
  ...LEVEL_6_QUESTIONS,
  ...LEVEL_7_QUESTIONS,
  ...LEVEL_8_QUESTIONS,
];

export const QUESTIONS_BY_LEVEL: Record<number, Question[]> = {
  1: LEVEL_1_QUESTIONS,
  2: LEVEL_2_QUESTIONS,
  3: LEVEL_3_QUESTIONS,
  4: LEVEL_4_QUESTIONS,
  5: LEVEL_5_QUESTIONS,
  6: LEVEL_6_QUESTIONS,
  7: LEVEL_7_QUESTIONS,
  8: LEVEL_8_QUESTIONS,
};

export function getQuestionsForLevel(levelId: number): Question[] {
  return QUESTIONS_BY_LEVEL[levelId] || [];
}

export function getAllQuestions(): Question[] {
  return ALL_QUESTIONS;
}

export function getOriginalQuestions(): Question[] {
  return ALL_QUESTIONS.filter((q) => q.source === 'original-quiz' || q.source === 'original-lab');
}

export function getRandomExamQuestions(count: number = 25): Question[] {
  // Always include a high proportion of authentic original questions (at least 10)
  const original = getOriginalQuestions();
  const others = ALL_QUESTIONS.filter((q) => q.source !== 'original-quiz' && q.source !== 'original-lab');

  const shuffledOriginal = [...original].sort(() => 0.5 - Math.random());
  const shuffledOthers = [...others].sort(() => 0.5 - Math.random());

  const numOriginal = Math.min(12, shuffledOriginal.length);
  const numOthers = count - numOriginal;

  const selected = [
    ...shuffledOriginal.slice(0, numOriginal),
    ...shuffledOthers.slice(0, numOthers),
  ];

  return selected.sort(() => 0.5 - Math.random());
}
