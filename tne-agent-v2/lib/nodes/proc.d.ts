import { StateFlowState, NodeTypeNested } from "../types";
export type ProcNodeData = {
    id: string;
    agent: "nestedAgent";
    params: {
        graphDataFile: string;
        outputType: string;
        useUserQuery: boolean;
        flowState?: StateFlowState;
    };
    passThrough: {
        nodeType: typeof NodeTypeNested;
        nodeId: string;
        nodeTitle: string;
    };
    isResult: boolean;
};
export declare const procAgentDefaultValue: ProcNodeData;
export declare const initProcAgent: (id: string) => ProcNodeData;
export declare const updateProcAgent: (id: string, title: string, proc: string, outputType: string, outputToCanvas: boolean, flowState?: StateFlowState) => ProcNodeData;
