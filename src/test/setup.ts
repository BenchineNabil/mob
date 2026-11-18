import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';

const createStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = String(value);
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (index: number) => Object.keys(store)[index] ?? null,
  };
};

const mockStorage = createStorageMock();

Object.defineProperty(globalThis, 'localStorage', {
  value: mockStorage,
  writable: true,
  configurable: true,
});

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    value: mockStorage,
    writable: true,
    configurable: true,
  });
}

// Reset localStorage before each test
beforeEach(() => {
  mockStorage.clear();
  vi.clearAllMocks();
});
