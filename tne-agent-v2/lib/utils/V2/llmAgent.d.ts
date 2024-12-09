import { LLMReactFlowNode } from "../../agent_node_data";
export declare const llmAgent: (
  node: LLMReactFlowNode,
  modelReactFlowModel: any
) =>
  | import("../../agent_node_data").LLMNodeData
  | {
      agent: any;
      params: any;
      passThrough: any;
      isResult: boolean;
    };
