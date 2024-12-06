import { NodeTypeDebug } from "../types";
export type DebugNodeData = {
    id: string;
    agent: "debugAgent";
    params: {
        outputName: string;
    };
    passThrough: {
        nodeType: typeof NodeTypeDebug;
        nodeId: string;
        nodeTitle: string;
    };
};
export declare const debugAgentDefaultValue: DebugNodeData;
export declare const initDebugAgent: (id: string) => DebugNodeData;
export declare const updateDebugAgent: (id: string, title: string, outputName: string) => DebugNodeData;
