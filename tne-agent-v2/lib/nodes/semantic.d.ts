import { NodeTypeSemantic } from "../types";
export type SemanticNodeData = {
    id: string;
    agent: string;
    params: {
        ragDbName: string;
        maxEmbeddings: number;
        similarityThreshold: number;
        outputType: string;
        showDebug: boolean;
    };
    passThrough: {
        nodeType: typeof NodeTypeSemantic;
        nodeId: string;
        nodeTitle: string;
    };
    isResult: boolean;
};
export declare const semanticAgentDefaultValue: SemanticNodeData;
export declare const initSemanticAgent: (id: string) => SemanticNodeData;
export declare const updateSemanticAgent: (id: string, title: string, ragDbName: string, outputType: string, outputToCanvas: boolean, showDebug: boolean, maxEmbeddings: number, similarityThreshold: number) => SemanticNodeData;
