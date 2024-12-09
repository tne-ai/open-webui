import { NodeTypeRAG } from "../types";
export type RagNodeData = {
  id: string;
  agent: "ragAgent";
  params: {
    ragDbName: string;
    outputType: string;
    showDebug: boolean;
  };
  passThrough: {
    nodeType: typeof NodeTypeRAG;
    nodeId: string;
    nodeTitle: string;
  };
  isResult: boolean;
};
export declare const ragAgentDefaultValue: RagNodeData;
export declare const initRagAgent: (id: string) => RagNodeData;
export declare const updateRagAgent: (
  id: string,
  title: string,
  ragDbName: string,
  outputType: string,
  outputToCanvas: boolean,
  showDebug: boolean
) => {
  id: string;
  agent: string;
  params: {
    ragDbName: string;
    outputType: string;
    showDebug: boolean;
  };
  passThrough: {
    nodeType: string;
    nodeId: string;
    nodeTitle: string;
  };
  isResult: boolean;
};
