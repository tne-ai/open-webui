"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactFlowNode2GraphLlmOpenAINode = void 0;
const utils_1 = require("../../utils");
// https://platform.openai.com/docs/models
const getMaxToknen = (model_name, max_tokens) => {
  if (max_tokens) {
    return max_tokens;
  }
  if (["dall-e-2", "dall-e-3"].includes(model_name)) {
    return null;
  }
  if (["gpt-3.5-turbo", "gpt-3.5-turbo-0125", "gpt-3.5-turbo-1106"].includes(model_name)) {
    return 4096;
  }
  if (["gpt-4o-2024-05-13", "gpt-4o"].includes(model_name)) {
    return 4096;
  }
  if (["gpt-4-turbo"].includes(model_name)) {
    return 4096;
  }
  if (["gpt-4"].includes(model_name)) {
    return 8192;
  }
  if (["gpt-4o-2024-08-06", "chatgpt-4o-latest"].includes(model_name)) {
    return 16384;
  }
  if (["gpt-4o-mini", "gpt-4o-mini-2024-07-18"].includes(model_name)) {
    return 16384;
  }
  return 4096;
};
const reactFlowNode2GraphLlmOpenAINode = (node, modelReactFlowModel) => {
  const { model, temperature, max_tokens, stream, prompt } = modelReactFlowModel;
  // const { model_name, api_key } = model;
  const { model_name } = model;
  const isImageAgent = ["dall-e-2", "dall-e-3"].includes(model_name);
  return {
    agent: isImageAgent ? "openAIImageAgent" : "openAIAgent",
    params: (0, utils_1.cleanObject)({
      model: model_name,
      // apiKey: api_key,
      max_tokens: getMaxToknen(model_name, max_tokens),
      temperature,
      mergeableSystem: prompt,
      stream,
    }),
    passThrough: {
      nodeType: isImageAgent ? "openAIImage" : "openAI",
      nodeId: node.id,
      nodeTitle: node.data.title ?? "",
    },
    isResult: (0, utils_1.getIsResult)(node),
  };
};
exports.reactFlowNode2GraphLlmOpenAINode = reactFlowNode2GraphLlmOpenAINode;
