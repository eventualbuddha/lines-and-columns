const LinesAndColumns = require('./');
const deq = require('assert').deepEqual;
const eq = require('assert').strictEqual;

describe('LinesAndColumns', function() {
  it('maps index 0 to line 0, column 0', function() {
    const map = new LinesAndColumns('a');
    deq(map.locationForIndex(0), { line: 0, column: 0 });
  });

  it('maps indexes in a single-line string to line 0 and column at index', function() {
    const map = new LinesAndColumns('abcd');
    deq(map.locationForIndex(2), { line: 0, column: 2 });
  });

  it('maps indexes in a multi-line string to the appropriate line and column', function() {
    const map = new LinesAndColumns('ab\ncd');
    deq(map.locationForIndex(2), { line: 0, column: 2 });
    deq(map.locationForIndex(3), { line: 1, column: 0 });
  });

  it('maps indexes before the beginning to null', function() {
    const map = new LinesAndColumns('');
    eq(map.locationForIndex(-1), null);
  });

  it('maps indexes at the end', function() {
    const map = new LinesAndColumns('');
    deq(map.locationForIndex(0), { line: 0, column: 0 });
  });

  it('maps indexes after the end to null', function() {
    const map = new LinesAndColumns('');
    eq(map.locationForIndex(1), null);
  });

  it('maps line 0, column 0 to index 0', function() {
    const map = new LinesAndColumns('a');
    eq(map.indexForLocation({ line: 0, column: 0 }), 0);
  });

  it('maps line 0, column N to index N', function() {
    const map = new LinesAndColumns('abcd');
    eq(map.indexForLocation({ line: 0, column: 2 }), 2);
  });

  it('maps line/column to the appropriate index', function() {
    const map = new LinesAndColumns('ab\ncd');
    eq(map.indexForLocation({ line: 0, column: 2 }), 2);
    eq(map.indexForLocation({ line: 1, column: 0 }), 3);
    eq(map.indexForLocation({ line: 1, column: 2 }), 5);
  });

  it('maps non-existent line to null', function() {
    const map = new LinesAndColumns('a\nb');
    eq(map.indexForLocation({ line: -1, column: 0 }), null);
    eq(map.indexForLocation({ line: 2, column: 0 }), null);
  });

  it('maps non-existent columns to null', function() {
    const map = new LinesAndColumns('a\nb');
    eq(map.indexForLocation({ line: 0, column: 3 }), null);
    eq(map.indexForLocation({ line: 0, column: -1 }), null);
  });

  it('handles carriage returns as newline characters', function() {
    const map = new LinesAndColumns('a\rb');
    deq(map.locationForIndex(2), { line: 1, column: 0 });
    deq(map.indexForLocation({ line: 1, column: 0 }), 2);
  });

  it('handles joined carriage return line feeds as newlines', function() {
    const map = new LinesAndColumns('a\r\nb');
    deq(map.locationForIndex(0), { line: 0, column: 0 });
    deq(map.locationForIndex(1), { line: 0, column: 1 });
    deq(map.locationForIndex(2), { line: 0, column: 2 });
    deq(map.locationForIndex(3), { line: 1, column: 0 });
    deq(map.indexForLocation({ line: 0, column: 0 }), 0);
    deq(map.indexForLocation({ line: 0, column: 1 }), 1);
    deq(map.indexForLocation({ line: 0, column: 2 }), 2);
    deq(map.indexForLocation({ line: 1, column: 0 }), 3);
  });

  it('handles separate carriage returns and line feeds as independent newlines', function() {
    const map = new LinesAndColumns('a\rb\nc');
    deq(map.locationForIndex(0), { line: 0, column: 0 });
    deq(map.locationForIndex(1), { line: 0, column: 1 });
    deq(map.locationForIndex(2), { line: 1, column: 0 });
    deq(map.locationForIndex(3), { line: 1, column: 1 });
    deq(map.locationForIndex(4), { line: 2, column: 0 });
    deq(map.indexForLocation({ line: 0, column: 0 }), 0);
    deq(map.indexForLocation({ line: 0, column: 1 }), 1);
    deq(map.indexForLocation({ line: 1, column: 0 }), 2);
    deq(map.indexForLocation({ line: 1, column: 1 }), 3);
    deq(map.indexForLocation({ line: 2, column: 0 }), 4);
  });
});
