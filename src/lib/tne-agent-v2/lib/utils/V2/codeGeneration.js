"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeGenerationAgent = void 0;
const llmAgent_1 = require("./llmAgent");
const llm_1 = require("../../agent_node_data/llm");
const pythonCode_1 = require("./pythonCode");
const python_code_1 = require("../../agent_node_data/python_code");
const codeGenerationAgent = (node, modelReactFlowModel) => {
  const { id, params, passThrough, isResult } = node.data;
  const { prompt } = params || {};
  const title = passThrough?.nodeTitle ?? "";
  const llmId = id + "_llm";
  const llm = (0, llmAgent_1.llmAgent)({ id: llmId, type: "llm", data: (0, llm_1.initLlmAgent)(llmId) }, modelReactFlowModel);
  const pythonId = id + "_python";
  const python = (0, pythonCode_1.pythonCodeAgent)({ id: pythonId, type: "python_code", data: (0, python_code_1.initPythonCodeAgent)(pythonId) });
  return {
    agent: "nestedAgent",
    graph: {
      version: 0.5,
      nodes: {
        [id + "_codeGeneration"]: {
          agent: "codeGenerationTemplateAgent",
          params: {
            prompt,
          },
          passThrough: {
            nodeType: "codeGenerationTemplate",
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
exports.codeGenerationAgent = codeGenerationAgent;
