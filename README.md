# lines-and-columns [![Build Status](https://travis-ci.org/eventualbuddha/lines-and-columns.svg?branch=master)](https://travis-ci.org/eventualbuddha/lines-and-columns)

[![Greenkeeper badge](https://badges.greenkeeper.io/eventualbuddha/lines-and-columns.svg)](https://greenkeeper.io/)

Maps lines and columns to character offsets and back. This is useful for parsers
and other text processors that deal in character ranges but process text with
meaningful lines and columns.

## Install

```
$ npm install [--save] lines-and-columns
```

## Usage

```js
import LinesAndColumns from 'lines-and-columns';

const lines = new LinesAndColumns(
`table {
  border: 0
}`);

lines.locationForIndex(9);                       // { line: 1, column: 1 }
lines.indexForLocation({ line: 1, column: 2 });  // 10
```

## License

MIT
