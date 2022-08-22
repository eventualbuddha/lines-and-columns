export interface SourceLocation {
  line: number
  column: number
}

const LF = '\n'
const CR = '\r'

export class LinesAndColumns {
  private readonly length: number
  private readonly offsets: ReadonlyArray<number>

  constructor(string: string) {
    this.length = string.length

    const byLineAndEOL = /(\r\n|\r|\n)/
    const lineAndEOLLengths = string
      .split(byLineAndEOL)
      .map((value) => value.length)
    // splits into: ['line0', '\r\n', 'line1', '\n', 'line2', ...]
    // and stores the lengths

    const offsets: number[] = [0]
    for (let i = 1; i < lineAndEOLLengths.length; i += 2) {
      // iterate just the EOLs
      const previousLinesTotal = offsets[offsets.length - 1] || 0
      const currentLineLength = lineAndEOLLengths[i - 1] || 0
      const currEOLLength = lineAndEOLLengths[i]
      offsets.push(previousLinesTotal + currentLineLength + currEOLLength)
    }

    this.offsets = offsets
  }

  locationForIndex(index: number): SourceLocation | null {
    if (index < 0 || index > this.length) {
      return null
    }

    let line = 0
    const offsets = this.offsets

    while (offsets[line + 1] <= index) {
      line++
    }

    const column = index - offsets[line]
    return { line, column }
  }

  indexForLocation(location: SourceLocation): number | null {
    const { line, column } = location

    if (line < 0 || line >= this.offsets.length) {
      return null
    }

    if (column < 0 || column > this.lengthOfLine(line)) {
      return null
    }

    return this.offsets[line] + column
  }

  private lengthOfLine(line: number): number {
    const offset = this.offsets[line]
    const nextOffset =
      line === this.offsets.length - 1
        ? this.length
        : this.offsets[line + 1]
    return nextOffset - offset
  }
}
