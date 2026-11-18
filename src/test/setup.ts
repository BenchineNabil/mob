import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';

// Reset localStorage before each test
beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});
