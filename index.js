type SourceLocation = {
  line: number,
  column: number
};

export default class LinesAndColumns {
  constructor(string: string) {
    this.string = string;

    const offsets = [];
    let offset = 0;
    while (true) {
      offsets.push(offset);
      let next = string.indexOf('\n', offset);
      if (next < 0) {
        break;
      } else {
        next += '\n'.length;
      }
      offset = next;
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
