import { ReactFlowNodeSemantic } from "../../../types";
export declare const reactFlowNode2GraphSemanticNode: (node: ReactFlowNodeSemantic) => {
  agent: string;
  params: {
    semanticDbName: string;
    maxEmbeddings: number;
    similarityThreshold: number;
  };
  passThrough: {
    nodeType: string;
    nodeId: string;
  };
  isResult: boolean;
};
