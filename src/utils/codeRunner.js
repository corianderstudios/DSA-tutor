/**
 * Runs a free-form snippet (as shown in the Playground) and captures
 * anything it passes to console.log, returning that output as an array
 * of strings plus any error message. This code runs in the learner's own
 * browser tab, on code they wrote or code we shipped — there is no
 * server-side execution or persistence involved.
 */
export function runSnippet(code) {
  const logs = [];
  const fakeConsole = {
    log: (...args) => logs.push(args.map(formatValue).join(' ')),
    error: (...args) => logs.push(`Error: ${args.map(formatValue).join(' ')}`),
    warn: (...args) => logs.push(`Warning: ${args.map(formatValue).join(' ')}`),
  };

  try {
    // eslint-disable-next-line no-new-func
    const runner = new Function('console', code);
    runner(fakeConsole);
    return { logs, error: null };
  } catch (err) {
    return { logs, error: err.message };
  }
}

/**
 * Extracts a callable function named `functionName` out of arbitrary user
 * source code (a function declaration, or a `const name = (...) => ...`
 * expression) so it can be invoked directly with test arguments.
 */
export function extractFunction(code, functionName) {
  // eslint-disable-next-line no-new-func
  const factory = new Function(
    `${code}\nif (typeof ${functionName} !== 'function') { throw new Error('Define a function named "${functionName}".'); }\nreturn ${functionName};`
  );
  return factory();
}

function formatValue(value) {
  if (typeof value === 'string') return value;
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, i) => deepEqual(item, b[i]));
  }
  if (a && b && typeof a === 'object') {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((key) => deepEqual(a[key], b[key]));
  }
  return false;
}

/**
 * Serializes a value for order-independent comparison of a top-level list
 * (e.g. "all permutations", where each permutation's own element order
 * matters, but the order the permutations appear in does not). Each item
 * is stringified as-is — preserving its internal order — and only the
 * resulting list of strings is sorted.
 */
function sortedStringify(value) {
  if (Array.isArray(value)) {
    return JSON.stringify(value.map((item) => JSON.stringify(item)).sort());
  }
  return JSON.stringify(value);
}

/**
 * Runs each test case in `tests` against the learner's implementation of
 * `functionName` inside `code`, returning a pass/fail breakdown.
 *
 * A test case is either:
 *  - { args, expected }               call fn(...args), compare to expected
 *  - { setup, expected }              setup() returns the args array
 *                                      (used when args need fresh object
 *                                      identities, e.g. linked list nodes)
 *  - add `unordered: true` when order doesn't matter (e.g. permutations)
 */
export function runTests(code, functionName, tests) {
  let fn;
  try {
    fn = extractFunction(code, functionName);
  } catch (err) {
    return {
      compileError: err.message,
      results: [],
      passCount: 0,
      total: tests.length,
    };
  }

  const results = tests.map((test, index) => {
    try {
      const args = test.setup ? test.setup() : test.args;
      const actual = fn(...args);
      const pass = test.unordered
        ? sortedStringify(actual) === sortedStringify(test.expected)
        : deepEqual(actual, test.expected);

      return {
        index,
        pass,
        actual,
        expected: test.expected,
        args: test.args,
        error: null,
      };
    } catch (err) {
      return {
        index,
        pass: false,
        actual: undefined,
        expected: test.expected,
        args: test.args,
        error: err.message,
      };
    }
  });

  return {
    compileError: null,
    results,
    passCount: results.filter((r) => r.pass).length,
    total: tests.length,
  };
}
