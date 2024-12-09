import { PythonCodeReactFlowNode } from "../../types";
export declare const pythonCodeAgent: (node: PythonCodeReactFlowNode, code?: string) => {
    agent: "pythonCodeAgent";
    params: {
        code: string | undefined;
        module: string;
        outputType: string;
        flowState?: import("../../types").StateFlowState;
    };
    passThrough: {
        nodeType: typeof import("../../types").NodeTypePythonCode;
        nodeId: string;
        nodeTitle: string;
    };
    isResult: boolean;
};
