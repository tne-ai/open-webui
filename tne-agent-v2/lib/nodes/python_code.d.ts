import { NodeTypePythonCode, StateFlowState } from "../types";
export type PythonCodeNodeData = {
    id: string;
    agent: "pythonCodeAgent";
    params: {
        module: string;
        outputType: string;
        flowState?: StateFlowState;
    };
    passThrough: {
        nodeType: typeof NodeTypePythonCode;
        nodeId: string;
        nodeTitle: string;
    };
    isResult: boolean;
};
export declare const pythonCodeAgentDefaultValue: PythonCodeNodeData;
export declare const initPythonCodeAgent: (id: string, title?: string) => PythonCodeNodeData;
export declare const updatePythonCodeAgent: (id: string, title: string, module: string, outputType: string, outputToCanvas: boolean, flowState?: StateFlowState) => PythonCodeNodeData;
