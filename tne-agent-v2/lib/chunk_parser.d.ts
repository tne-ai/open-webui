export type ChunkData = {
    nodeId: string;
    agentId: string;
    token?: string;
    tokens?: Record<string, string>;
};
export declare class ChunkParser {
    private buffer;
    private mode;
    private delimiter;
    private endDelimiter;
    private endDelimiterLength;
    constructor();
    read(text: string): ChunkData[];
    private parse;
    result<T = unknown>(): Record<string, T>;
}
