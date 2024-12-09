import { NodeTypeOut } from "../types";
export type OutNodeData = {
  id: string;
  agent: "s3FileWriteAgent";
  params: {
    fileName: string;
    bucket?: string;
    region?: string;
  };
  passThrough: {
    nodeType: typeof NodeTypeOut;
    nodeId: string;
    nodeTitle: string;
  };
};
export declare const outAgentDefaultValue: OutNodeData;
export declare const initOutAgent: (id: string) => OutNodeData;
export declare const updateOutAgent: (id: string, title: string, outputName: string) => OutNodeData;
