import { AgentFunction } from "graphai";
export type dummyResponses = {
    nodeId: string;
    response: string;
};
export declare const streamMockGenerator: (dummies: dummyResponses[]) => AgentFunction;
