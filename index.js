type SourceLocation = {
  line: number,
  column: number
};

export default class LinesAndColumns {
  constructor(string: string) {
    this.string = string;

    const lineLengths = [];
    let start = 0;
    while (true) {
      let end = string.indexOf('\n', start);
      if (end < 0) {
        end = string.length;
      } else {
        end += '\n'.length;
      }
      lineLengths.push(end - start);
      if (end === string.length) {
        break;
      }
      start = end;
    }

    this.lineLengths = lineLengths;
  }

  locationForIndex(index: number): ?SourceLocation {
    if (index < 0 || index >= this.string.length) {
      return null;
    }

    let line = 0;
    let column = index;
    const lineLengths = this.lineLengths;

    while (lineLengths[line] <= column && line + 1 < lineLengths.length) {
      column -= lineLengths[line];
      line++;
    }

    return ({ line, column }: SourceLocation);
  }

  indexForLocation(location: SourceLocation): ?number {
    let { line, column } = location;

    if (line < 0 || line >= this.lineLengths.length) {
      return null;
    }

    if (column < 0 || column >= this.lineLengths[line]) {
      return null;
    }

    let index = 0;
    for (let i = line - 1; i >= 0; i--) {
      index += this.lineLengths[i];
    }
    return index + column;
  }
}
