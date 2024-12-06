import { ReactFlowNodeRag } from "../../../types";
export declare const reactFlowNode2GraphRagNode: (node: ReactFlowNodeRag) => {
  agent: string;
  params: {
    ragDbName: string;
  };
  passThrough: {
    nodeType: string;
    nodeId: string;
  };
  isResult: boolean;
};
