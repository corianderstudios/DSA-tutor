import { describe, expect, it } from 'vitest';
import { runSnippet, runTests, extractFunction } from '../utils/codeRunner.js';

describe('runSnippet', () => {
  it('captures console.log output', () => {
    const { logs, error } = runSnippet('console.log("hello", 1, 2);');
    expect(error).toBeNull();
    expect(logs).toEqual(['hello 1 2']);
  });

  it('returns an error message for invalid code without throwing', () => {
    const { error } = runSnippet('this is not valid javascript(((');
    expect(error).toBeTruthy();
  });

  it('stringifies non-string values passed to console.log', () => {
    const { logs } = runSnippet('console.log([1, 2, 3]);');
    expect(logs).toEqual(['[1,2,3]']);
  });
});

describe('extractFunction', () => {
  it('extracts a named function declaration', () => {
    const fn = extractFunction('function add(a, b) { return a + b; }', 'add');
    expect(fn(2, 3)).toBe(5);
  });

  it('throws a helpful error when the function name is missing', () => {
    expect(() => extractFunction('const x = 5;', 'add')).toThrow(/Define a function named/);
  });
});

describe('runTests', () => {
  const passingCode = 'function double(n) { return n * 2; }';
  const tests = [
    { args: [2], expected: 4 },
    { args: [3], expected: 6 },
  ];

  it('reports all tests passing for a correct solution', () => {
    const result = runTests(passingCode, 'double', tests);
    expect(result.passCount).toBe(2);
    expect(result.total).toBe(2);
    expect(result.results.every((r) => r.pass)).toBe(true);
  });

  it('reports failures for an incorrect solution', () => {
    const brokenCode = 'function double(n) { return n; }';
    const result = runTests(brokenCode, 'double', tests);
    expect(result.passCount).toBe(0);
  });

  it('surfaces a compile error when the function is undefined', () => {
    const result = runTests('const notAFunction = 1;', 'double', tests);
    expect(result.compileError).toBeTruthy();
    expect(result.passCount).toBe(0);
  });

  it('supports unordered comparison for permutation-style answers', () => {
    const code = 'function pair() { return [2, 1]; }';
    const result = runTests(code, 'pair', [{ args: [], expected: [1, 2], unordered: true }]);
    expect(result.passCount).toBe(1);
  });

  it('supports setup() for tests needing fresh object graphs', () => {
    const code = 'function first(node) { return node.value; }';
    const result = runTests(code, 'first', [
      { setup: () => [{ value: 42 }], expected: 42 },
    ]);
    expect(result.passCount).toBe(1);
  });
});
