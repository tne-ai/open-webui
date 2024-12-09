"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChunkParser = void 0;
class ChunkParser {
    constructor() {
        this.buffer = "";
        this.mode = "init";
        this.delimiter = ["{", "}"];
        this.endDelimiter = "___END___";
        this.endDelimiterLength = this.endDelimiter.length;
    }
    // return { mode: string, data: unknown }
    read(text) {
        this.buffer = this.buffer + text;
        const ret = [];
        let res = null;
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
    parse() {
        for (let currentPos = 0; currentPos < this.buffer.length; currentPos++) {
            if (this.buffer[currentPos] === "}") {
                const expectJson = this.buffer.slice(0, currentPos + 1);
                try {
                    const ret = JSON.parse(expectJson);
                    this.buffer = this.buffer.slice(currentPos + 1);
                    return ret;
                }
                catch (__e) {
                    // nothing record.
                }
            }
        }
        return null;
    }
    result() {
        if (this.buffer.slice(0, this.endDelimiterLength) === this.endDelimiter) {
            const text = this.buffer.slice(this.endDelimiterLength);
            try {
                return JSON.parse(text);
            }
            catch (e) {
                console.log(e);
            }
        }
        return {};
    }
}
exports.ChunkParser = ChunkParser;
