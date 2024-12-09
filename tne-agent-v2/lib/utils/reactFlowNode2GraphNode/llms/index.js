"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactFlowNode2GraphLlmNode = void 0;
const openaiagent_1 = require("./openaiagent");
const replicate_1 = require("./replicate");
const groq_1 = require("./groq");
const anthropic_1 = require("./anthropic");
const reactFlowNode2GraphLlmNode = (node, modelReactFlowModel) => {
  // const { title, model, temperature, max_tokens, stream, prompt } = node;
  // const { engine_name, model_name, api_key } = model;
  const { model } = modelReactFlowModel;
  const { engine_name } = model;
  if (engine_name === "openai-gpt") {
    return (0, openaiagent_1.reactFlowNode2GraphLlmOpenAINode)(node, modelReactFlowModel);
  }
  if (engine_name === "replicate") {
    return (0, replicate_1.reactFlowNode2GraphLlmReplicateNode)(node, modelReactFlowModel);
  }
  if (engine_name === "groq") {
    return (0, groq_1.reactFlowNode2GraphLlmGroqNode)(node, modelReactFlowModel);
  }
  if (engine_name === "anthropic_engine") {
    return (0, anthropic_1.reactFlowNode2GraphLlmAnthropicNode)(node, modelReactFlowModel);
  }
  return { value: "" };
};
exports.reactFlowNode2GraphLlmNode = reactFlowNode2GraphLlmNode;
