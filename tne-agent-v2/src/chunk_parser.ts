export type ChunkData = {
  nodeId: string;
  agentId: string;
  token?: string;
  tokens?: Record<string, string>;
};

export class ChunkParser {
  private buffer: string = "";
  private mode: "init" | "data" | "final" = "init";
  private delimiter = ["{", "}"];
  private endDelimiter = "___END___";
  private endDelimiterLength = this.endDelimiter.length;

  constructor() {}
  // return { mode: string, data: unknown }
  public read(text: string) {
    this.buffer = this.buffer + text;

    const ret: ChunkData[] = [];
    let res: ChunkData | null = null;
    do {
      res = null;
      if (this.buffer.slice(0, 1) === "{") {
        res = this.parse();
        if (res) {
          ret.push(res);
        }
      }
      if (this.buffer.slice(0, this.endDelimiterLength) === this.endDelimiter) {
        // nothing
      }
    } while (res && this.buffer.length > 0);
    return ret;
  }

  private parse(): ChunkData | null {
    for (let currentPos = 0; currentPos < this.buffer.length; currentPos++) {
      if (this.buffer[currentPos] === "}") {
        const expectJson = this.buffer.slice(0, currentPos + 1);
        try {
          const ret: ChunkData = JSON.parse(expectJson);
          this.buffer = this.buffer.slice(currentPos + 1);
          return ret;
        } catch (__e) {
          // nothing record.
        }
      }
    }
    return null;
  }
  public result<T = unknown>(): Record<string, T> {
    if (this.buffer.slice(0, this.endDelimiterLength) === this.endDelimiter) {
      const text = this.buffer.slice(this.endDelimiterLength);
      try {
        return JSON.parse(text) as Record<string, T>;
      } catch (e) {
        console.log(e);
      }
    }
    return {};
  }
}
