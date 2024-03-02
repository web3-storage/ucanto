import * as API from '../../src/policy/api.js'

export default /** @type {{at: API.Selector, data:API.Data, out: API.SelectionResult & {error?: RegExp}, tag?:string}[]} */ ([
  {
    at: /** @type {any} */ ('x'),
    data: { x: 1 },
    out: { error: /ParseError.*must start with.*\./ },
  },
  {
    at: '..',
    data: {},
    out: { error: /ParseError.*recursive descent.*\.\./ },
  },
  {
    at: '.',
    data: { x: 1 },
    out: { one: { x: 1 } },
  },
  // property access
  {
    at: '.x',
    data: { x: 1 },
    out: { one: 1 },
  },
  {
    at: '.x',
    data: { y: 1 },
    out: { error: /ResolutionError/ },
  },
  {
    at: '.q.0',
    data: { q: { 0: true } },
    out: { error: /ParseError/ },
  },
  {
    at: '.q.foo',
    data: { q: null },
    out: { one: null },
  },
  {
    at: '.q.foo',
    data: { q: null },
    out: { error: /ResolutionError/ },
  },
  {
    at: '.q.foo?',
    data: { q: null },
    out: { one: null },
  },
  {
    at: '.q.toString',
    data: { q: true },
    out: { error: /Can not access field "toString" on boolean/ },
  },
  {
    at: '.q.toString?',
    data: { q: true },
    out: { one: null },
  },
  {
    at: '.q.toString',
    data: { q: 0 },
    out: { error: /Can not access field "toString" on number/ },
  },
  {
    at: '.q.toString?',
    data: { q: 0 },
    out: { one: null },
  },
  {
    at: '.q.slice',
    data: { q: 'hello' },
    out: { error: /Can not access field "slice" on string/ },
  },
  {
    at: '.q.slice?',
    data: { q: 'hello' },
    out: { one: null },
  },
  {
    at: '.q.slice',
    data: { q: [] },
    out: { error: /Can not access field "slice" on array/ },
  },
  {
    at: '.q.slice?',
    data: { q: [] },
    out: { one: null },
  },
  {
    at: '.q.slice',
    data: { q: new Uint8Array([]) },
    out: { error: /Can not access field "slice" on bytes/ },
  },
  {
    at: '.q.slice?',
    data: { q: new Uint8Array([]) },
    out: { one: null },
  },
  {
    at: '.q.bar',
    data: { q: { bar: 3 } },
    out: { one: 3 },
  },
  {
    at: '.q.baz',
    data: { q: { bar: 3 } },
    out: { error: /ResolutionError/ },
  },
  {
    at: '.q.baz?',
    data: { q: { bar: 3 } },
    out: { one: null },
  },
  {
    at: '.q.baz.bar',
    data: { q: { bar: 3 } },
    out: { error: /ResolutionError/ },
  },
  {
    at: '.q.baz?.bar',
    data: { q: { bar: 3 } },
    out: { error: /ResolutionError/ },
  },
  {
    at: '.q.baz?.bar?',
    data: { q: { bar: 3 } },
    out: { one: null },
  },
  {
    at: '.q["bar"]',
    data: { q: { bar: 3 } },
    out: { one: 3 },
  },
  {
    at: '.q["bar.baz"]',
    data: { q: { 'bar.baz': true } },
    out: { one: true },
  },
  {
    at: '.q["bar\\"baz"]',
    data: { q: { 'bar"baz': true } },
    out: { one: true },
  },
  {
    at: '.q["bar"   ]',
    data: { q: { bar: true } },
    out: { one: true },
  },
  {
    at: '.q[  "bar"   ]',
    data: { q: { bar: true } },
    out: { one: true },
  },
  {
    at: '.q[ \t "bar" \n  ]',
    data: { q: { bar: true } },
    out: { one: true },
  },
  {
    at: '.q["bar\\"]',
    data: { q: { bar: true } },
    out: { error: /ParseError.*unterminated string literal/i },
  },
  {
    at: '.q[bar]',
    data: { q: { bar: true } },
    out: { error: /ParseError/ },
  },

  // iterator
  {
    at: '.[]',
    data: { x: 1, y: 2, z: 3 },
    out: { many: [1, 2, 3] },
  },
  {
    at: '.[]',
    data: { b: 2, a: 1 },
    out: { many: [1, 2] },
    message: 'keys are sorted',
  },
  {
    at: '.[]',
    data: [1, 2, 3],
    out: { many: [1, 2, 3] },
  },
  // nested iterator
  {
    at: '.[].x',
    data: [{ x: 1 }, { x: 2 }, { y: 3 }, { x: 4 }],
    out: { error: /ResolutionError/ },
  },
  {
    at: '.[].x?',
    data: [{ x: 1 }, { x: 2 }, { y: 3 }, { x: 4 }],
    out: { many: [1, 2, null, 4] },
  },
  {
    at: '.[].x[]',
    data: [{ x: 1 }, { x: 2 }, { y: 3 }, { x: 4 }],
    out: { error: /ResolutionError: Can not iterate over number/ },
  },
  {
    at: '.[].xs[]',
    data: [{ xs: [1, 2] }, { xs: [3, 4] }],
    out: { many: [1, 2, 3, 4] },
  },
  {
    at: '.xs.length',
    data: { xs: [1, 2, 3] },
    out: { error: /Can not access field "length" on array/ },
  },
  {
    at: '.[].[]',
    data: [{ x: 1 }, { x: 2 }, { x: 3 }, 0],
    out: { error: /Can not iterate over number/ },
  },
  {
    at: '.[].[]?',
    data: [{ x: 1 }, { x: 2 }, { x: 3 }],
    out: { many: [1, 2, 3] },
  },
  // slices
  {
    at: '.xs[0:]',
    data: { xs: [1, 2, 3, 4, 5] },
    out: { one: [1, 2, 3, 4, 5] },
  },
  {
    at: '.xs[-2:]',
    data: { xs: [1, 2, 3, 4, 5] },
    out: { one: [4, 5] },
  },
  {
    at: '.xs[:-2]',
    data: { xs: [1, 2, 3, 4, 5] },
    out: { one: [1, 2, 3] },
  },
  {
    at: '.xs[-1:-2]',
    data: { xs: [1, 2, 3, 4, 5] },
    out: { one: [] },
  },
  {
    at: '.xs[0:--2]',
    data: { xs: [1, 2, 3, 4, 5] },
    out: { error: /ParseError.*invalid segment.*\n.*--2/g },
  },
  {
    at: '.xs[0:+2]',
    data: { xs: [1, 2, 3, 4, 5] },
    out: { error: /ParseError.*invalid segment.*\n.*\+2/g },
  },
  {
    at: '.xs[:]',
    data: { xs: [1, 2, 3, 4, 5] },
    out: { error: /ParseError.*invalid segment/ },
  },
  {
    at: '.xs[5:1]',
    data: { xs: [1, 2, 3, 4, 5] },
    out: { one: [] },
  },
  {
    at: '.xs[0:0]',
    data: { xs: [1, 2, 3, 4, 5] },
    out: { one: [] },
  },
  {
    at: '.xs[0:1]',
    data: { xs: [1, 2, 3, 4, 5] },
    out: { one: [1] },
  },
  {
    at: '.xs[0:1][]',
    data: { xs: [1, 2, 3, 4, 5] },
    out: { many: [1] },
  },
  {
    at: '.xs[0:1]',
    data: { xs: { [0]: 1, [1]: 2, [2]: 3 } },
    out: { error: /Can not slice from object/ },
  },
  {
    at: '.xs[0:1]?',
    data: { xs: { [0]: 1, [1]: 2, [2]: 3 } },
    // TODO: Should this be [] instead ?
    out: { one: null },
  },
  // index access
  {
    at: '.xs[0]',
    data: { xs: [1, 2, 3, 4, 5] },
    out: { one: 1 },
  },
  {
    at: '.xs[0]',
    data: { xs: [] },
    out: { error: /out of bounds/ },
  },
  {
    at: '.xs[0]?',
    data: { xs: [] },
    out: { one: null },
  },
  {
    at: '.b[0:1]',
    data: { b: new Uint8Array([1, 2, 3, 4, 5]) },
    out: { one: new Uint8Array([1]) },
  },
  {
    at: '.b[2]',
    data: { b: new Uint8Array([1, 2, 3, 4, 5]) },
    out: { one: 3 },
  },

  {
    at: '.b[0:-1][]',
    data: { b: new Uint8Array([1, 2, 3, 4, 5]) },
    out: { many: [1, 2, 3, 4] },
  },

  {
    at: '.b[0]',
    data: { b: new Uint8Array([]) },
    out: { error: /out of bounds/ },
  },
  {
    at: '.b[0]?',
    data: { b: new Uint8Array([]) },
    out: { one: null },
  },
  {
    at: '.b.length',
    data: { b: new Uint8Array([1, 2, 3]) },
    out: { error: /Can not access field "length" on bytes/ },
  },
  {
    at: '.t.length',
    data: { t: 'hello' },
    out: { error: /Can not access field "length" on string/ },
  },
  {
    at: '.t[0:2]',
    data: { t: 'hello' },
    out: { one: 'he' },
  },
  {
    at: '.t[-2:]',
    data: { t: 'hello' },
    out: { one: 'lo' },
  },
  {
    at: '.t[]',
    data: { t: 'hello' },
    out: { error: /Can not iterate over string/ },
  },
  {
    at: '.t[0]',
    data: { t: 'hello' },
    // This is different from jq, which errors instead.
    out: { one: 'h' },
  },
  {
    at: '.t[-2]',
    data: { t: 'hello' },
    // This is different from jq, which errors instead.
    out: { one: 'l' },
  },
  {
    at: '.t[10]',
    data: { t: 'hello' },
    // This is different from jq, which errors instead.
    out: { error: /out of bounds/ },
  },

  {
    at: '.o[0]',
    data: { o: { [0]: true } },
    out: { error: /Can not index object with number 0/ },
  },
  {
    at: '.o[0]?',
    data: { o: { [0]: true } },
    out: { one: null },
  },

  {
    at: '.q[0]',
    data: { q: 5 },
    out: { error: /Can not index number with number 0/ },
  },

  {
    at: '.q[0]?',
    data: { q: 5 },
    out: { one: null },
  },
  {
    at: '.q[0]',
    data: { q: null },
    // jq return null instead 🤷‍♂️
    out: { error: /Can not index null with number 0/ },
  },
  {
    at: '.q[0]?',
    data: { q: null },
    // jq return null instead 🤷‍♂️
    out: { one: null },
  },
  {
    at: '.q[0]',
    data: { q: true },
    out: { error: /Can not index boolean with number 0/ },
  },
  {
    at: '.q[0]?',
    data: { q: true },
    out: { one: null },
  },
  {
    at: '.q[0]',
    data: { q: false },
    out: { error: /Can not index boolean with number 0/ },
  },
  {
    at: '.q[0]?',
    data: { q: false },
    out: { one: null },
  },
])
