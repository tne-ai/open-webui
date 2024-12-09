import { ReactFlowNode, ReactFlowModel } from "../../../types";
export declare const reactFlowNode2GraphLlmAnthropicNode: (
  node: ReactFlowNode,
  modelReactFlowModel: ReactFlowModel
) => {
  agent: string;
  params: Record<string, unknown>;
  passThrough: {
    nodeType: string;
    nodeId: string;
    nodeTitle: string;
  };
  isResult: boolean;
};
