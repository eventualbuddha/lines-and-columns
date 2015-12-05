type SourceLocation = {
  line: number,
  column: number
};

const LF = '\n';
const CR = '\r';

export default class LinesAndColumns {
  constructor(string: string) {
    this.string = string;

    const offsets = [0];

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

    this.offsets = offsets;
  }

  locationForIndex(index: number): ?SourceLocation {
    if (index < 0 || index >= this.string.length) {
      return null;
    }

    let line = 0;
    const offsets = this.offsets;

    while (offsets[line + 1] <= index) {
      line++;
    }

    const column = index - offsets[line];
    return ({ line, column }: SourceLocation);
  }

  indexForLocation(location: SourceLocation): ?number {
    let { line, column } = location;

    if (line < 0 || line >= this.offsets.length) {
      return null;
    }

    if (column < 0 || column >= this._lengthOfLine(line)) {
      return null;
    }

    return this.offsets[line] + column;
  }

  /**
   * @private
   */
  _lengthOfLine(line: number): number {
    const offset = this.offsets[line];
    const nextOffset = line === this.offsets.length - 1 ? this.string.length : this.offsets[line + 1];
    return nextOffset - offset;
  }
}
