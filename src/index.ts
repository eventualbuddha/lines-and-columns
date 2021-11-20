export type SourceLocation = {
  line: number,
  column: number
};

const LF = '\n';
const CR = '\r';

class LinesAndColumns {
  private string: string;
  private offsets: Array<number>;

  constructor(string: string) {
    this.string = string;

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

    this.offsets = offsets;
  }

  locationForIndex(index: number): SourceLocation | null {
    if (index < 0 || index > this.string.length) {
      return null;
    }

    let line = 0;
    let offsets = this.offsets;

    while (offsets[line + 1] <= index) {
      line++;
    }

    let column = index - offsets[line];
    return { line, column };
  }

  indexForLocation(location: SourceLocation): number | null {
    let { line, column } = location;

    if (line < 0 || line >= this.offsets.length) {
      return null;
    }

    if (column < 0 || column > this.lengthOfLine(line)) {
      return null;
    }

    return this.offsets[line] + column;
  }

  private lengthOfLine(line: number): number {
    let offset = this.offsets[line];
    let nextOffset = line === this.offsets.length - 1 ? this.string.length : this.offsets[line + 1];
    return nextOffset - offset;
  }
}

export { LinesAndColumns };
export default LinesAndColumns;
