/**
 * Each topic drives three parts of the UI:
 *  - explanation: prose paragraphs (plain JS strings) describing the concept
 *  - example: a runnable JS snippet shown in the Playground
 *  - question: a small coding exercise with test cases the learner's
 *    solution is checked against
 *
 * Keeping this as data (rather than JSX) makes it trivial to add topics
 * without touching any component code.
 */

export const topics = [
  {
    id: 'arrays-strings',
    category: 'Foundations',
    title: 'Arrays & Strings',
    summary: 'Contiguous, index-addressable memory — the workhorse of coding interviews.',
    explanation: [
      'An array stores elements in contiguous memory, so any element can be read or written in O(1) time given its index. In JavaScript, both arrays and strings support this constant-time indexed access.',
      'The trade-off is that inserting or removing an element in the middle requires shifting every element after it, which costs O(n) time. Appending to (or removing from) the end is typically O(1), which is why patterns like the "two pointer" and "sliding window" techniques are so common: they let you scan an array once, O(n), instead of nesting loops, O(n²).',
      'Strings behave like arrays of characters. Because JavaScript strings are immutable, building a new string by repeated concatenation inside a loop can quietly become O(n²); prefer an array of pieces joined once at the end for long-running builds.',
    ],
    complexity: {
      time: 'Access O(1), search O(n), insert/delete at end O(1), insert/delete in middle O(n)',
      space: 'O(n) for n elements',
    },
    example: {
      description: 'Two pointers moving toward each other to check if a string is a palindrome.',
      code: `function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left += 1;
    right -= 1;
  }

  return true;
}

console.log(isPalindrome('racecar'));
console.log(isPalindrome('hello'));
`,
    },
    question: {
      prompt:
        'Write a function `maxSubArraySum(nums, k)` that returns the maximum sum of any contiguous subarray of exactly length `k`. Use the sliding window technique so your solution runs in O(n) time rather than recomputing each window sum from scratch.',
      functionName: 'maxSubArraySum',
      starterCode: `function maxSubArraySum(nums, k) {
  // Your code here.
  // Hint: compute the sum of the first window, then slide it
  // forward one element at a time, adjusting the sum in O(1).
}`,
      tests: [
        { args: [[2, 1, 5, 1, 3, 2], 3], expected: 9 },
        { args: [[2, 3, 4, 1, 5], 2], expected: 7 },
        { args: [[1, 1, 1, 1, 1], 1], expected: 1 },
        { args: [[5, -1, 3, 8, -2, 9], 3], expected: 15 },
      ],
    },
  },

  {
    id: 'hash-tables',
    category: 'Foundations',
    title: 'Hash Tables',
    summary: 'Trade memory for near-constant-time lookups by hashing keys to buckets.',
    explanation: [
      'A hash table maps keys to values by running each key through a hash function that determines which "bucket" it belongs to. When there are few collisions, lookup, insert, and delete are all O(1) on average.',
      'JavaScript\'s `Map` and plain objects both act as hash tables. `Map` is usually the better choice for interview code: it preserves insertion order, allows any value as a key, and has a reliable `.size` property, whereas objects can have surprising behavior with inherited properties and coerce keys to strings.',
      'The single most common interview pattern built on hash tables is trading time for space: instead of comparing every pair of elements (O(n²)), you store what you have seen so far in a hash table and check membership in O(1), bringing the whole algorithm down to O(n).',
    ],
    complexity: {
      time: 'Average O(1) for get/set/delete; worst case O(n) with many collisions',
      space: 'O(n) for n entries',
    },
    example: {
      description: 'Classic "Two Sum": find two numbers that add up to a target using one pass and a Map.',
      code: `function twoSum(nums, target) {
  const seen = new Map(); // value -> index

  for (let i = 0; i < nums.length; i += 1) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }

  return [];
}

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([3, 2, 4], 6));
`,
    },
    question: {
      prompt:
        'Write a function `firstNonRepeatingChar(str)` that returns the first character in `str` that appears exactly once, scanning left to right. If every character repeats, return `null`. Aim for O(n) time using a hash table (a `Map` or object) to count occurrences.',
      functionName: 'firstNonRepeatingChar',
      starterCode: `function firstNonRepeatingChar(str) {
  // Your code here.
  // Hint: build a character -> count map in one pass,
  // then scan the string again to find the first count of 1.
}`,
      tests: [
        { args: ['swiss'], expected: 'w' },
        { args: ['aabbcc'], expected: null },
        { args: ['teeter'], expected: 'r' },
        { args: ['x'], expected: 'x' },
      ],
    },
  },

  {
    id: 'linked-lists',
    category: 'Foundations',
    title: 'Linked Lists',
    summary: 'Nodes linked by pointers — cheap to splice, expensive to index.',
    explanation: [
      'A singly linked list is a chain of nodes, each holding a value and a pointer to the next node. Unlike an array, there is no contiguous memory and no free indexing: reaching the k-th node means walking k pointers, so access is O(n).',
      'What linked lists buy you is O(1) insertion and deletion once you already hold a reference to the relevant node, since splicing a node in or out only means rewiring a couple of pointers — no shifting of the rest of the collection.',
      'Two techniques come up constantly: the "fast and slow pointer" (or "tortoise and hare") for finding cycles or the middle of a list in one pass, and the "dummy head" node, which removes special-casing when the head itself might change.',
    ],
    complexity: {
      time: 'Access/search O(n), insert/delete at known node O(1)',
      space: 'O(n) for n nodes, plus O(1) extra for most pointer manipulations',
    },
    example: {
      description: 'Reverse a singly linked list in place, one pointer rewire at a time.',
      code: `function ListNode(value, next = null) {
  return { value, next };
}

function reverseList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }

  return prev; // new head
}

function toArray(head) {
  const out = [];
  let node = head;
  while (node) {
    out.push(node.value);
    node = node.next;
  }
  return out;
}

const list = ListNode(1, ListNode(2, ListNode(3, ListNode(4))));
console.log(toArray(list));
console.log(toArray(reverseList(list)));
`,
    },
    question: {
      prompt:
        'Given the head of a singly linked list (nodes shaped like `{ value, next }`), write `hasCycle(head)` that returns `true` if the list loops back on itself and `false` otherwise. Use Floyd\'s fast/slow pointer technique so you use O(1) extra space rather than a Set of visited nodes.',
      functionName: 'hasCycle',
      starterCode: `function hasCycle(head) {
  // Your code here.
  // Hint: advance one pointer by 1 node and another by 2 nodes.
  // If they ever meet, there's a cycle. If the fast pointer
  // reaches the end, there isn't.
}`,
      tests: [
        {
          setup: () => {
            const a = { value: 1 };
            const b = { value: 2 };
            const c = { value: 3 };
            a.next = b;
            b.next = c;
            c.next = a; // cycle back to a
            return [a];
          },
          expected: true,
        },
        {
          setup: () => {
            const a = { value: 1 };
            const b = { value: 2 };
            const c = { value: 3 };
            a.next = b;
            b.next = c;
            c.next = null;
            return [a];
          },
          expected: false,
        },
        { args: [null], expected: false },
      ],
    },
  },

  {
    id: 'stacks-queues',
    category: 'Foundations',
    title: 'Stacks & Queues',
    summary: 'LIFO and FIFO discipline for tracking order-sensitive state.',
    explanation: [
      'A stack is Last-In-First-Out: you only ever push or pop from the same end. It is the natural fit for anything nested — matching brackets, undo history, or the call stack of recursive functions. In JavaScript, a plain array\'s `push`/`pop` gives you a stack for free, both O(1).',
      'A queue is First-In-First-Out: items leave in the order they arrived. Queues model waiting lines and are essential for breadth-first traversal. Using `push`/`shift` on an array works but `shift` is O(n) because every remaining element must move down one slot; for large queues, prefer a structure with O(1) removal from the front, such as a linked list or a two-stack queue.',
      'Interviewers often use stacks and queues to test whether you recognize the *shape* of a problem: "process the most recent thing first" screams stack; "process things in arrival order, layer by layer" screams queue.',
    ],
    complexity: {
      time: 'Push/pop (stack) O(1); enqueue O(1) and dequeue O(1) with a proper queue (O(n) with array.shift)',
      space: 'O(n) for n elements',
    },
    example: {
      description: 'Use a stack to check whether brackets in an expression are balanced.',
      code: `function isBalanced(expression) {
  const pairs = { ')': '(', ']': '[', '}': '{' };
  const stack = [];

  for (const char of expression) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else if (char in pairs) {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

console.log(isBalanced('{[()]}'));
console.log(isBalanced('{[(])}'));
`,
    },
    question: {
      prompt:
        'Write `evalRPN(tokens)` that evaluates an expression written in Reverse Polish Notation (postfix). `tokens` is an array of strings, each either an integer or one of `+ - * /`. Use integer division that truncates toward zero. Example: `["2","1","+","3","*"]` evaluates `(2 + 1) * 3` and should return `9`.',
      functionName: 'evalRPN',
      starterCode: `function evalRPN(tokens) {
  // Your code here.
  // Hint: push numbers onto a stack. When you see an operator,
  // pop the two most recent numbers, apply the operator, and
  // push the result back.
}`,
      tests: [
        { args: [['2', '1', '+', '3', '*']], expected: 9 },
        { args: [['4', '13', '5', '/', '+']], expected: 6 },
        { args: [['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']], expected: 22 },
      ],
    },
  },

  {
    id: 'trees-bst',
    category: 'Trees & Graphs',
    title: 'Binary Trees & BSTs',
    summary: 'Hierarchical structure where each node has at most two children.',
    explanation: [
      'A binary tree is a set of nodes connected in a hierarchy, where each node has up to two children, conventionally called left and right. A binary search tree (BST) adds an ordering invariant: every value in a node\'s left subtree is smaller, and every value in its right subtree is larger.',
      'That invariant is what makes search, insert, and delete O(log n) on a balanced BST — each comparison eliminates half the remaining nodes, the same idea as binary search on a sorted array. If the tree becomes unbalanced (e.g., values inserted in sorted order), it degenerates into a linked list and operations become O(n).',
      'Traversal order matters: in-order (left, node, right) visits a BST\'s values in sorted order; pre-order (node, left, right) is useful for copying a tree; post-order (left, right, node) is useful for deleting one, since children are cleaned up before their parent.',
    ],
    complexity: {
      time: 'Search/insert/delete O(log n) balanced, O(n) worst case (unbalanced); traversal O(n)',
      space: 'O(n) for n nodes; O(h) call stack for recursive traversal, where h is tree height',
    },
    example: {
      description: 'Insert into a BST, then read values back in sorted order with an in-order traversal.',
      code: `function insert(node, value) {
  if (node === null) {
    return { value, left: null, right: null };
  }
  if (value < node.value) {
    node.left = insert(node.left, value);
  } else {
    node.right = insert(node.right, value);
  }
  return node;
}

function inOrder(node, out = []) {
  if (node === null) return out;
  inOrder(node.left, out);
  out.push(node.value);
  inOrder(node.right, out);
  return out;
}

let root = null;
for (const value of [8, 3, 10, 1, 6, 14]) {
  root = insert(root, value);
}

console.log(inOrder(root));
`,
    },
    question: {
      prompt:
        'Write `isValidBST(root)` that returns `true` if a binary tree (nodes shaped like `{ value, left, right }`, or `null` for an empty tree) satisfies the binary search tree property, and `false` otherwise. Do not assume every node\'s immediate children are enough to check — the property must hold against *all* ancestors, not just the direct parent.',
      functionName: 'isValidBST',
      starterCode: `function isValidBST(root) {
  // Your code here.
  // Hint: recurse with an allowed (min, max) range for each node,
  // narrowing the range as you descend left or right.
}`,
      tests: [
        {
          setup: () => [{ value: 5, left: { value: 3, left: null, right: null }, right: { value: 8, left: null, right: null } }],
          expected: true,
        },
        {
          setup: () => [{
            value: 5,
            left: { value: 3, left: null, right: null },
            right: { value: 4, left: null, right: null },
          }],
          expected: false,
        },
        {
          setup: () => [{
            // Each node looks fine next to its immediate parent, but the
            // right subtree contains a 3, which must be greater than the
            // root's 5 — checking only direct parents would miss this.
            value: 5,
            left: { value: 1, left: null, right: null },
            right: { value: 4, left: { value: 3, left: null, right: null }, right: { value: 6, left: null, right: null } },
          }],
          expected: false,
        },
        { args: [null], expected: true },
      ],
    },
  },

  {
    id: 'graphs-bfs-dfs',
    category: 'Trees & Graphs',
    title: 'Graphs: BFS & DFS',
    summary: 'Nodes and edges — the most general structure for modeling relationships.',
    explanation: [
      'A graph generalizes trees: nodes (vertices) connect via edges, with no restriction on how many connections a node has or whether cycles exist. Graphs are commonly represented as an adjacency list — a map from each node to the list of nodes it connects to — which is compact for sparse graphs.',
      'Breadth-first search (BFS) explores level by level using a queue, visiting all neighbors of a node before moving further out. It is the standard way to find the shortest path in an unweighted graph, because the first time you reach a node is guaranteed to be via the fewest edges.',
      'Depth-first search (DFS) explores as far as possible along one branch before backtracking, typically using recursion (or an explicit stack). DFS is natural for problems like detecting cycles, topological sorting, or exploring all paths. Both algorithms are O(V + E): every vertex and every edge is visited once, and a "visited" set prevents revisiting nodes in graphs with cycles.',
    ],
    complexity: {
      time: 'O(V + E) for both BFS and DFS, where V = vertices, E = edges',
      space: 'O(V) for the visited set and the queue/stack/recursion depth',
    },
    example: {
      description: 'BFS over an adjacency list to find the shortest hop-count path length between two nodes.',
      code: `function shortestPathLength(graph, start, target) {
  if (start === target) return 0;

  const visited = new Set([start]);
  const queue = [[start, 0]];

  while (queue.length > 0) {
    const [node, distance] = queue.shift();

    for (const neighbor of graph[node] || []) {
      if (neighbor === target) return distance + 1;
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, distance + 1]);
      }
    }
  }

  return -1; // unreachable
}

const graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A', 'D'],
  D: ['B', 'C', 'E'],
  E: ['D'],
};

console.log(shortestPathLength(graph, 'A', 'E'));
console.log(shortestPathLength(graph, 'A', 'A'));
`,
    },
    question: {
      prompt:
        'Given a graph as an adjacency list object (e.g. `{ A: ["B", "C"], B: ["A"] }`) and a `start` node, write `countReachable(graph, start)` that returns how many distinct nodes (including `start`) can be reached from `start`, using either BFS or DFS.',
      functionName: 'countReachable',
      starterCode: `function countReachable(graph, start) {
  // Your code here.
  // Hint: traverse with a visited Set so you never
  // count (or revisit) the same node twice.
}`,
      tests: [
        {
          args: [{ A: ['B', 'C'], B: ['A', 'D'], C: ['A'], D: ['B'], E: ['F'], F: ['E'] }, 'A'],
          expected: 4,
        },
        { args: [{ A: [] }, 'A'], expected: 1 },
        {
          args: [{ A: ['B'], B: ['C'], C: ['A'] }, 'B'],
          expected: 3,
        },
      ],
    },
  },

  {
    id: 'sorting-merge',
    category: 'Algorithms',
    title: 'Sorting: Merge Sort',
    summary: 'Divide and conquer to guarantee O(n log n) sorting, even worst case.',
    explanation: [
      'Merge sort splits an array in half, recursively sorts each half, and then merges the two sorted halves into one sorted array. Splitting takes O(log n) levels of recursion, and merging every level costs O(n) total, giving O(n log n) overall — and unlike quicksort, that bound holds in the worst case, not just on average.',
      'The merge step is the heart of the algorithm: with two already-sorted arrays, you can produce a combined sorted array in a single O(n) pass by repeatedly comparing the front of each and taking the smaller.',
      'Merge sort is also stable (equal elements keep their relative order), which matters when sorting objects by one field while wanting ties broken by original order. The main cost is O(n) auxiliary space for the merge buffers, versus in-place algorithms like quicksort or heapsort.',
    ],
    complexity: {
      time: 'O(n log n) best, average, and worst case',
      space: 'O(n) auxiliary space for merging',
    },
    example: {
      description: 'Classic recursive merge sort: split, recursively sort, then merge.',
      code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i += 1;
    } else {
      result.push(right[j]);
      j += 1;
    }
  }

  return result.concat(left.slice(i), right.slice(j));
}

console.log(mergeSort([5, 2, 9, 1, 5, 6]));
`,
    },
    question: {
      prompt:
        'Write `merge(left, right)` that takes two already-sorted arrays of numbers and returns one merged, sorted array in O(n + m) time, where n and m are the input lengths. Do not sort the inputs from scratch — assume they are already sorted and just interleave them.',
      functionName: 'merge',
      starterCode: `function merge(left, right) {
  // Your code here.
  // Hint: walk both arrays with two pointers, always taking
  // the smaller front element, then append whatever is left over.
}`,
      tests: [
        { args: [[1, 3, 5], [2, 4, 6]], expected: [1, 2, 3, 4, 5, 6] },
        { args: [[], [1, 2, 3]], expected: [1, 2, 3] },
        { args: [[1, 1, 2], [1, 3]], expected: [1, 1, 1, 2, 3] },
        { args: [[7], []], expected: [7] },
      ],
    },
  },

  {
    id: 'binary-search',
    category: 'Algorithms',
    title: 'Binary Search',
    summary: 'Halve the search space every step by exploiting sorted order.',
    explanation: [
      'Binary search finds a target in a sorted array by repeatedly checking the middle element and discarding the half of the array that cannot contain the target. Each comparison halves the remaining search space, giving O(log n) time — dramatically faster than a linear scan for large inputs.',
      'The classic bug is an off-by-one error in the loop bounds or an integer overflow when computing the midpoint (not usually an issue in JavaScript, but `Math.floor((low + high) / 2)` is the idiomatic form to know). Always be explicit about whether `high` is inclusive or exclusive, and keep that convention consistent throughout the loop.',
      'Binary search generalizes beyond plain arrays to any problem with a monotonic "yes/no" property across a sorted range — for example, finding the smallest value for which a condition first becomes true. This is sometimes called "binary search on the answer" and is a common advanced interview pattern.',
    ],
    complexity: {
      time: 'O(log n)',
      space: 'O(1) iterative, O(log n) if implemented recursively (call stack)',
    },
    example: {
      description: 'Iterative binary search returning the index of a target, or -1 if absent.',
      code: `function binarySearch(sortedArr, target) {
  let low = 0;
  let high = sortedArr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (sortedArr[mid] === target) {
      return mid;
    } else if (sortedArr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}

console.log(binarySearch([1, 3, 5, 7, 9, 11], 7));
console.log(binarySearch([1, 3, 5, 7, 9, 11], 4));
`,
    },
    question: {
      prompt:
        'Write `firstBadVersionBefore(n, isBad)` where versions `1..n` are checked with the provided `isBad(version)` function, which returns `true` once a version is bad and stays `true` for every later version (monotonic). Return the first (smallest) bad version using binary search, in O(log n) calls to `isBad`.',
      functionName: 'firstBadVersionBefore',
      starterCode: `function firstBadVersionBefore(n, isBad) {
  // Your code here.
  // Hint: binary search on the *answer*. If isBad(mid) is true,
  // the first bad version is mid or earlier; otherwise it's later.
}`,
      tests: [
        { args: [10, (v) => v >= 4], expected: 4 },
        { args: [5, (v) => v >= 5], expected: 5 },
        { args: [1, () => true], expected: 1 },
        { args: [20, (v) => v >= 13], expected: 13 },
      ],
    },
  },

  {
    id: 'recursion-backtracking',
    category: 'Algorithms',
    title: 'Recursion & Backtracking',
    summary: 'Solve a problem by solving smaller versions of itself, undoing choices that fail.',
    explanation: [
      'A recursive function calls itself on a smaller subproblem until it reaches a base case simple enough to answer directly. Every recursive call needs (1) a base case that stops the recursion and (2) a recursive case that makes real progress toward that base case — without both, you get infinite recursion and a stack overflow.',
      'Backtracking is recursion with an explicit "undo": you make a choice, recurse to explore its consequences, and if that path does not lead to a solution, you undo the choice (backtrack) and try the next option. This is how you enumerate all subsets, permutations, or valid board configurations without generating impossible ones ahead of time.',
      'The template is consistent: choose an option, recurse, then un-choose it before trying the next option in the loop. Pruning — checking a partial solution is still valid before recursing further — is what keeps backtracking practical instead of degenerating into brute force.',
    ],
    complexity: {
      time: 'Problem-dependent; often exponential (e.g. O(2^n) for subsets), reduced by pruning',
      space: 'O(n) recursion depth for the call stack, plus space for tracking the current path',
    },
    example: {
      description: 'Generate all subsets of an array using backtracking (include/exclude each element).',
      code: `function subsets(nums) {
  const result = [];
  const current = [];

  function backtrack(start) {
    result.push([...current]); // record a copy of the current subset

    for (let i = start; i < nums.length; i += 1) {
      current.push(nums[i]);   // choose
      backtrack(i + 1);        // explore
      current.pop();           // un-choose (backtrack)
    }
  }

  backtrack(0);
  return result;
}

console.log(subsets([1, 2, 3]));
`,
    },
    question: {
      prompt:
        'Write `permute(nums)` that returns all permutations of a distinct-integer array `nums`, as an array of arrays. The order of permutations in the result does not matter, but each permutation\'s elements must be in one of the n! valid orderings. Use backtracking: build a permutation one element at a time, tracking which numbers are already used.',
      functionName: 'permute',
      starterCode: `function permute(nums) {
  // Your code here.
  // Hint: track a "used" set (or splice/restore from a remaining
  // list) as you build up each candidate permutation, and push a
  // copy once it's the same length as nums.
}`,
      tests: [
        {
          args: [[1, 2, 3]],
          expected: [
            [1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1],
          ],
          unordered: true,
        },
        { args: [[7]], expected: [[7]], unordered: true },
        {
          args: [[1, 2]],
          expected: [[1, 2], [2, 1]],
          unordered: true,
        },
      ],
    },
  },

  {
    id: 'dynamic-programming',
    category: 'Algorithms',
    title: 'Dynamic Programming',
    summary: 'Cache the answers to overlapping subproblems instead of recomputing them.',
    explanation: [
      'Dynamic programming (DP) applies when a problem has overlapping subproblems (the same smaller inputs recur many times) and optimal substructure (an optimal solution can be built from optimal solutions to subproblems). Plain recursion recomputes shared subproblems repeatedly; DP remembers them instead.',
      '"Memoization" is the top-down approach: write the natural recursive solution, then cache each result (often in a Map keyed by the input) so repeat calls return instantly. "Tabulation" is the bottom-up approach: build an array/table iteratively from the smallest subproblems up to the final answer, avoiding recursion overhead entirely.',
      'A useful diagnostic: if the brute-force recursive solution\'s call tree draws the same argument values over and over (visualize Fibonacci\'s recursion tree), that repetition is your signal to add a cache. Many DP problems can also be solved with O(1) extra space once you notice you only ever need the last one or two computed values, not the whole table.',
    ],
    complexity: {
      time: 'Typically O(n) or O(n·m) once memoized, versus exponential for naive recursion',
      space: 'O(n) for a memo table/array, sometimes reducible to O(1) with rolling variables',
    },
    example: {
      description: 'Fibonacci with memoization: turns exponential recursion into linear time.',
      code: `function fib(n, memo = new Map()) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);

  const result = fib(n - 1, memo) + fib(n - 2, memo);
  memo.set(n, result);
  return result;
}

console.log(fib(10));
console.log(fib(30)); // fast even though naive recursion here would be very slow
`,
    },
    question: {
      prompt:
        'Write `coinChange(coins, amount)` that returns the fewest number of coins (from the given denominations, unlimited supply of each) needed to make exactly `amount`. If it is impossible, return `-1`. Use bottom-up dynamic programming: build a table where `dp[i]` is the fewest coins needed for amount `i`.',
      functionName: 'coinChange',
      starterCode: `function coinChange(coins, amount) {
  // Your code here.
  // Hint: dp[0] = 0. For each amount from 1..amount, try every
  // coin and take 1 + dp[amount - coin] when that subproblem is
  // reachable, keeping the minimum. dp[amount] stays "impossible"
  // (e.g. Infinity) if no coin combination works.
}`,
      tests: [
        { args: [[1, 2, 5], 11], expected: 3 },
        { args: [[2], 3], expected: -1 },
        { args: [[1], 0], expected: 0 },
        { args: [[1, 3, 4], 6], expected: 2 },
      ],
    },
  },
];

export const categories = [...new Set(topics.map((t) => t.category))];
