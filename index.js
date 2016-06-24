type SourceLocation = {
  line: number,
  column: number
};

const LF = '\n';
const CR = '\r';

export default class LinesAndColumns {
  _string: string;
  _offsets: Array<number>;

  constructor(string: string) {
    this._string = string;

    let offsets = [0];

    for (let offset = 0; offset < string.length;) {
      switch (string[offset]) {
        case LF:
          offset += LF.length;
          offsets.push(offset);
          break;

        case CR:
          offset += CR.length;
          if (string[offset] === LF) {
            offset += LF.length;
          }
          offsets.push(offset);
          break;

        default:
          offset++;
          break;
      }
    }

    this._offsets = offsets;
  }

  locationForIndex(index: number): ?SourceLocation {
    if (index < 0 || index > this._string.length) {
      return null;
    }

    let line = 0;
    let offsets = this._offsets;

    while (offsets[line + 1] <= index) {
      line++;
    }

    let column = index - offsets[line];
    return ({ line, column }: SourceLocation);
  }

  indexForLocation(location: SourceLocation): ?number {
    let { line, column } = location;

    if (line < 0 || line >= this._offsets.length) {
      return null;
    }

    if (column < 0 || column >= this._lengthOfLine(line)) {
      return null;
    }

    return this._offsets[line] + column;
  }

  /**
   * @private
   */
  _lengthOfLine(line: number): number {
    let offset = this._offsets[line];
    let nextOffset = line === this._offsets.length - 1 ? this._string.length : this._offsets[line + 1];
    return nextOffset - offset;
  }
}
