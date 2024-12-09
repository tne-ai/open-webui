import { ReactFlowNodeLLM, ReactFlowModel } from "../../../types";
export declare const reactFlowNode2GraphLlmOpenAINode: (
  node: ReactFlowNodeLLM,
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
