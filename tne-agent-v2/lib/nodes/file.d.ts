import { NodeTypeFile, StateFlowState } from "../types";
export type FileNodeData = {
    id: string;
    agent: "s3FileAgent";
    params: {
        fileName: string;
        flowState?: StateFlowState;
    };
    passThrough: {
        nodeType: typeof NodeTypeFile;
        nodeId: string;
        nodeTitle: string;
    };
};
export declare const fileAgentDefaultValue: FileNodeData;
export declare const initFileAgent: (id: string) => FileNodeData;
export declare const updateFileAgent: (id: string, title: string, fileName: string, flowState?: StateFlowState) => FileNodeData;
