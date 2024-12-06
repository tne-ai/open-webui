import { NodeTypeLLM, StateFlowState } from "../types";
export type LLMNodeData = {
    id: string;
    agent: string;
    params: {
        tneModel: string;
        mapping: string;
        outputType: string;
        toolJson: string;
        toolCode: string;
        useUserQuery: boolean;
        stream: boolean;
        flowState?: StateFlowState;
    };
    passThrough: {
        nodeType: typeof NodeTypeLLM;
        nodeId: string;
        nodeTitle: string;
    };
    isResult: boolean;
};
export declare const llmAgentDefaultValue: LLMNodeData;
export declare const initLlmAgent: (id: string) => LLMNodeData;
export declare const updateLlmAgent: (id: string, title: string, input: string, slashgptManifest: string, toolJson: string, toolCode: string, outputType: string, outputToCanvas: boolean, useUserQuery: boolean, flowState?: StateFlowState) => LLMNodeData;
