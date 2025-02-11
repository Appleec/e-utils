import { describe, expect, it } from 'vitest';

/**
 * A no-operation function that does nothing.
 * This can be used as a placeholder or default function.
 *
 * @example
 * noop(); // Does nothing
 *
 * @returns {void} This function does not return anything.
 */
export function noop(): void {}

describe('noop', () => {
  it('should be a function', () => {
    expect(typeof noop).toBe('function');
  });

  it('should return undefined', () => {
    expect(noop()).toBeUndefined();
  });
});
