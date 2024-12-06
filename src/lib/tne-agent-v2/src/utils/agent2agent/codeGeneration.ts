import { ComputedNodeData } from "graphai";
import { llmAgent } from "./llmAgent";
import { pythonCodeAgent } from "./pythonCode";

import { initPythonCodeAgent, initLlmAgent } from "../../nodes";
import { CodeGenerationReactFlowNode, NodeTypePythonCode, NodeTypeCodeGenerationTemplate } from "../../types";

export const codeGenerationAgent = (node: CodeGenerationReactFlowNode, llmAgentBase: ComputedNodeData) => {
  const { params, passThrough, isResult } = node.data;
  const id = passThrough.nodeId ?? "";

  const { prompt } = params || {};

  const title = passThrough?.nodeTitle ?? "";

  const llmId = id + "_llm";

  const llm = llmAgent({ id: llmId, type: "llm", data: initLlmAgent(llmId) }, params.agent ?? llmAgentBase);
  if (llm?.params?.stream) {
    llm.params.stream = false;
  }

  const pythonId = id + "_python";
  const python = pythonCodeAgent({ id: pythonId, type: NodeTypePythonCode, data: initPythonCodeAgent(pythonId, passThrough?.nodeTitle) });

  return {
    agent: "nestedAgent",
    params: {
      useUserQuery: params.useUserQuery,
    },
    graph: {
      version: 0.5,
      nodes: {
        [id + "_codeGeneration"]: {
          agent: "codeGenerationTemplateAgent",
          params: {
            prompt,
          },
          passThrough: {
            nodeType: NodeTypeCodeGenerationTemplate,
            nodeId: id + "_codeGeneration",
            nodeTitle: title ?? "",
          },
          inputs: {
            file: ":file",
            inputs: ":inputs",
            userPrompt: ":userPrompt",
          },
        },
        [llmId]: {
          ...llm,
          inputs: {
            prompt: ":" + id + "_codeGeneration.prompt",
            model: ":" + id + "_codeGeneration.model",
            system: ":" + id + "_codeGeneration.system",
            temperature: ":" + id + "_codeGeneration.temperature",
            max_tokens: ":" + id + "_codeGeneration.max_tokens",
          },
        },
        [id + "_python"]: {
          ...python,
          params: {},
          inputs: {
            code: ":" + id + "_llm.choices.$0.message.content",
          },
        },
      },
    },
    passThrough,
    isResult,
  };
};
