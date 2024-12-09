"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactFlowNode2GraphCodeGenerationNode = void 0;
const llms_1 = require("../llms");
const python_code_1 = require("./python_code");
const utils_1 = require("../../utils");
const reactFlowNode2GraphCodeGenerationNode = (node) => {
  const { prompt, engineName, modelName } = node.data;
  // TODO: Use nested GraphData and retry if python code error.
  const llmAgent = (0, llms_1.reactFlowNode2GraphLlmNode)(
    {
      id: node.id + "_llm",
      type: "llm",
      data: {
        id: node.id + "_llm",
        slashgptManifest: "dummy",
        title: node.data.title ? node.data.title + " llm" : "",
      },
    },
    {
      model: {
        engine_name: engineName,
        model_name: modelName,
      },
    }
  );
  const pythonAgent = (0, python_code_1.reactFlowNode2GraphPythonCodeNode)({
    id: node.id + "_python",
    type: "python_code",
    data: {
      id: node.id,
      title: node.data.title ? node.data.title + " python code" : "",
    },
  });
  /*
   * file
   */
  return [
    {
      agent: "nestedAgent",
      graph: {
        version: 0.5,
        nodes: {
          [node.id + "_codeGeneration"]: {
            agent: "codeGenerationTemplateAgent",
            params: {
              prompt,
            },
            passThrough: {
              nodeType: "codeGenerationTemplate",
              nodeId: node.id + "_codeGeneration",
              nodeTitle: node.data.title ?? "",
            },
            inputs: {
              file: ":file",
              inputs: ":inputs",
              userPrompt: ":userPrompt",
            },
          },
          [node.id + "_llm"]: {
            ...llmAgent,
            inputs: {
              prompt: ":" + node.id + "_codeGeneration.prompt",
              model: ":" + node.id + "_codeGeneration.model",
              system: ":" + node.id + "_codeGeneration.system",
              temperature: ":" + node.id + "_codeGeneration.temperature",
              max_tokens: ":" + node.id + "_codeGeneration.max_tokens",
            },
            passThrough: {
              nodeType: "codeGenerationLlm",
              nodeId: node.id + "_llm",
              nodeTitle: node.data.title ?? "",
            },
            isResult: true,
          },
          [node.id + "_python"]: {
            ...pythonAgent,
            inputs: {
              code: ":" + node.id + "_llm.choices.$0.message.content",
            },
            isResult: true,
          },
        },
      },
      passThrough: {
        nodeType: "codeGeneration",
        nodeId: node.id,
        nodeTitle: node.data.title ?? "",
      },
      isResult: (0, utils_1.getIsResult)(node),
    },
  ];
};
exports.reactFlowNode2GraphCodeGenerationNode = reactFlowNode2GraphCodeGenerationNode;
