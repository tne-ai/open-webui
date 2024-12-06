import { ComputedNodeData } from "graphai";
import { LLMReactFlowNode } from "../../types";

export const llmAgent = (node: LLMReactFlowNode, llmAgentBase: ComputedNodeData): ComputedNodeData => {
  const { isResult, params, passThrough } = node.data;
  const id = passThrough.nodeId ?? "";
  const { agent, params: baseParams, passThrough: llmPassThrough } = llmAgentBase;

  const { useUserQuery } = params;

  return {
    agent,
    params: {
      ...baseParams,
      useUserQuery,
    },
    passThrough: {
      ...passThrough,
      nodeId: id,
      llmType: llmPassThrough?.nodeType,
    },
    isResult,
  };
};
