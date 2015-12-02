const LinesAndColumns = require('./dist/lines-and-columns.cjs');
const deq = require('assert').deepEqual;
const eq = require('assert').strictEqual;

describe('LinesAndColumns', () => {
  it('maps index 0 to line 0, column 0', () => {
    const map = new LinesAndColumns('a');
    deq(map.locationForIndex(0), { line: 0, column: 0 });
  });

  it('maps indexes in a single-line string to line 0 and column at index', () => {
    const map = new LinesAndColumns('abcd');
    deq(map.locationForIndex(2), { line: 0, column: 2 });
  });

  it('maps indexes in a multi-line string to the appropriate line and column', () => {
    const map = new LinesAndColumns('ab\ncd');
    deq(map.locationForIndex(2), { line: 0, column: 2 });
    deq(map.locationForIndex(3), { line: 1, column: 0 });
  });

  it('maps indexes before the beginning to null', () => {
    const map = new LinesAndColumns('');
    eq(map.locationForIndex(-1), null);
  });

  it('maps indexes after the end to null', () => {
    const map = new LinesAndColumns('');
    eq(map.locationForIndex(1), null);
  });

  it('maps line 0, column 0 to index 0', () => {
    const map = new LinesAndColumns('a');
    eq(map.indexForLocation({ line: 0, column: 0 }), 0);
  });

  it('maps line 0, column N to index N', () => {
    const map = new LinesAndColumns('abcd');
    eq(map.indexForLocation({ line: 0, column: 2 }), 2);
  });

  it('maps line/column to the appropriate index', () => {
    const map = new LinesAndColumns('ab\ncd');
    eq(map.indexForLocation({ line: 0, column: 2 }), 2);
    eq(map.indexForLocation({ line: 1, column: 0 }), 3);
  });

  it('maps non-existent line to null', () => {
    const map = new LinesAndColumns('a\nb');
    eq(map.indexForLocation({ line: -1, column: 0 }), null);
    eq(map.indexForLocation({ line: 2, column: 0 }), null);
  });

  it('maps non-existent columns to null', () => {
    const map = new LinesAndColumns('a\nb');
    eq(map.indexForLocation({ line: 0, column: 2 }), null);
    eq(map.indexForLocation({ line: 0, column: -1 }), null);
  });
});
