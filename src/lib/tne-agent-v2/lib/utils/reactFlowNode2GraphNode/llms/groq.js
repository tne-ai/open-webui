"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactFlowNode2GraphLlmGroqNode = void 0;
const utils_1 = require("../../utils");
const reactFlowNode2GraphLlmGroqNode = (node, modelReactFlowModel) => {
  const { model, temperature, max_tokens, stream, prompt } = modelReactFlowModel;
  const { model_name } = model;
  return {
    agent: "groqAgent",
    params: (0, utils_1.cleanObject)({
      model: model_name,
      max_tokens,
      temperature,
      mergeableSystem: prompt,
      stream,
    }),
    passThrough: {
      nodeType: "groq",
      nodeId: node.id,
      nodeTitle: node.data.title ?? "",
    },
    isResult: (0, utils_1.getIsResult)(node),
  };
};
exports.reactFlowNode2GraphLlmGroqNode = reactFlowNode2GraphLlmGroqNode;
