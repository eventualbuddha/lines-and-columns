import { LinesAndColumns } from '../src'

test('maps index 0 to line 0, column 0', function () {
  const map = new LinesAndColumns('a')
  expect(map.locationForIndex(0)).toEqual({ line: 0, column: 0 })
})

test('maps indexes in a single-line string to line 0 and column at index', function () {
  const map = new LinesAndColumns('abcd')
  expect(map.locationForIndex(2)).toEqual({ line: 0, column: 2 })
})

test('maps indexes in a multi-line string to the appropriate line and column', function () {
  const map = new LinesAndColumns('ab\ncd')
  expect(map.locationForIndex(2)).toEqual({ line: 0, column: 2 })
  expect(map.locationForIndex(3)).toEqual({ line: 1, column: 0 })
})

test('maps indexes before the beginning to null', function () {
  const map = new LinesAndColumns('')
  expect(map.locationForIndex(-1)).toEqual(null)
})

test('maps indexes at the end', function () {
  const map = new LinesAndColumns('')
  expect(map.locationForIndex(0)).toEqual({ line: 0, column: 0 })
})

test('maps indexes after the end to null', function () {
  const map = new LinesAndColumns('')
  expect(map.locationForIndex(1)).toEqual(null)
})

test('maps line 0, column 0 to index 0', function () {
  const map = new LinesAndColumns('a')
  expect(map.indexForLocation({ line: 0, column: 0 })).toEqual(0)
})

test('maps line 0, column N to index N', function () {
  const map = new LinesAndColumns('abcd')
  expect(map.indexForLocation({ line: 0, column: 2 })).toEqual(2)
})

test('maps line/column to the appropriate index', function () {
  const map = new LinesAndColumns('ab\ncd')
  expect(map.indexForLocation({ line: 0, column: 2 })).toEqual(2)
  expect(map.indexForLocation({ line: 1, column: 0 })).toEqual(3)
  expect(map.indexForLocation({ line: 1, column: 2 })).toEqual(5)
})

test('maps non-existent line to null', function () {
  const map = new LinesAndColumns('a\nb')
  expect(map.indexForLocation({ line: -1, column: 0 })).toEqual(null)
  expect(map.indexForLocation({ line: 2, column: 0 })).toEqual(null)
})

test('maps non-existent columns to null', function () {
  const map = new LinesAndColumns('a\nb')
  expect(map.indexForLocation({ line: 0, column: 3 })).toEqual(null)
  expect(map.indexForLocation({ line: 0, column: -1 })).toEqual(null)
})

test('handles carriage returns as newline characters', function () {
  const map = new LinesAndColumns('a\rb')
  expect(map.locationForIndex(2)).toEqual({ line: 1, column: 0 })
  expect(map.indexForLocation({ line: 1, column: 0 })).toEqual(2)
})

test('handles joined carriage return line feeds as newlines', function () {
  const map = new LinesAndColumns('a\r\nb')
  expect(map.locationForIndex(0)).toEqual({ line: 0, column: 0 })
  expect(map.locationForIndex(1)).toEqual({ line: 0, column: 1 })
  expect(map.locationForIndex(2)).toEqual({ line: 0, column: 2 })
  expect(map.locationForIndex(3)).toEqual({ line: 1, column: 0 })
  expect(map.indexForLocation({ line: 0, column: 0 })).toEqual(0)
  expect(map.indexForLocation({ line: 0, column: 1 })).toEqual(1)
  expect(map.indexForLocation({ line: 0, column: 2 })).toEqual(2)
  expect(map.indexForLocation({ line: 1, column: 0 })).toEqual(3)
})

test('handles separate carriage returns and line feeds as independent newlines', function () {
  const map = new LinesAndColumns('a\rb\nc')
  expect(map.locationForIndex(0)).toEqual({ line: 0, column: 0 })
  expect(map.locationForIndex(1)).toEqual({ line: 0, column: 1 })
  expect(map.locationForIndex(2)).toEqual({ line: 1, column: 0 })
  expect(map.locationForIndex(3)).toEqual({ line: 1, column: 1 })
  expect(map.locationForIndex(4)).toEqual({ line: 2, column: 0 })
  expect(map.indexForLocation({ line: 0, column: 0 })).toEqual(0)
  expect(map.indexForLocation({ line: 0, column: 1 })).toEqual(1)
  expect(map.indexForLocation({ line: 1, column: 0 })).toEqual(2)
  expect(map.indexForLocation({ line: 1, column: 1 })).toEqual(3)
  expect(map.indexForLocation({ line: 2, column: 0 })).toEqual(4)
})
