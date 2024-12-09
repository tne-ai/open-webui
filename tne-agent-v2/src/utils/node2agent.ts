import { ComputedNodeData, NodeData } from "graphai";

import { ExpertDataModel } from "../expertDataModel";
import {
  AgentReactFlowNode,
  NodeTypeCodeGeneration,
  NodeTypeLLM,
  NodeTypePythonCode,
  NodeTypeNested,
  NodeTypeText,
  ReactFlowData,
  SourcesDict,
} from "../types";

import { llmAgent, codeGenerationAgent, pythonCodeAgent, nestedAgent } from "./agent2agent";

export const node2modelFileName = (node: AgentReactFlowNode) => {
  if (node.type === NodeTypeLLM) {
    return node.data.params.tneModel;
  }
  return null;
};

export const node2moduleFileName = (node: AgentReactFlowNode) => {
  if (node.type === NodeTypePythonCode) {
    return node.data.params.module;
  }
  return null;
};

export const node2procFileName = (node: AgentReactFlowNode) => {
  if (node.type === NodeTypeNested) {
    return node.data.params.graphDataFile;
  }
  return null;
};

export const reactFlowNode2GraphNode = async (
  node: AgentReactFlowNode,
  models: Record<string, ComputedNodeData>,
  modules: Record<string, string>,
  expertData: Record<string, ReactFlowData>,
  parentSources: SourcesDict,
  expertDataModel: ExpertDataModel | null = null
): Promise<NodeData> => {
  if (node.type === NodeTypeLLM) {
    const modelName = node.data.params.tneModel;
    const model = models[modelName];
    return llmAgent(node, model ?? {});
  }

  if (node.type === NodeTypeCodeGeneration) {
    const modelName = node.data.params.tneModel;
    const model = models[modelName];
    return codeGenerationAgent(node, model ?? {});
  }
  if (node.type === NodeTypePythonCode) {
    const code = node.data?.params?.module ? modules[node.data?.params?.module] : undefined;
    return pythonCodeAgent(node, code);
  }
  if (node.type === NodeTypeNested) {
    const proc = node.data?.params.graphDataFile ? expertData[node.data?.params.graphDataFile] : undefined;
    if (proc) {
      return await nestedAgent(node, proc, expertDataModel, parentSources);
    }
  }
  if (node.type === NodeTypeText) {
    // TODO update
    const { value } = node.data;
    return {
      value,
    };
  }

  const { agent, params, passThrough, isResult } = node.data;

  return {
    agent,
    params,
    passThrough,
    isResult,
  };
};
