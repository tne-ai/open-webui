import { ReactFlowData } from "../types";
export declare const loadReactFlowDataFromS3: (uid: string, fileName: string) => Promise<ReactFlowData>;
export declare const generateGraphFromS3: (expertData: ReactFlowData, uid: string, userPrompt?: string) => Promise<{
    version: number;
    nodes: Record<string, import("graphai").NodeData>;
}>;
export type GraphResult = {
    type: string;
    data: unknown;
    nodeTitle: string;
    nodeType: string;
    choices?: {
        message: {
            content: string;
        };
    }[];
    __timestamp: number;
};
export declare const formatData: (data: GraphResult) => string;
