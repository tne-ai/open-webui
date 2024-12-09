"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactFlowNode2GraphNodeV2 = void 0;
const llmAgent_1 = require("./V2/llmAgent");
const codeGeneration_1 = require("./V2/codeGeneration");
const pythonCode_1 = require("./V2/pythonCode");
const reactFlowNode2GraphNodeV2 = (node, models, modules) => {
  if (node.type === "llm") {
    const modelName = node.data.params.tneModel;
    const model = models[modelName];
    return [(0, llmAgent_1.llmAgent)(node, model ?? {})];
  }
  if (node.type === "code_generation") {
    const modelName = node.data.params.tneModel;
    const model = models[modelName];
    return [(0, codeGeneration_1.codeGenerationAgent)(node, model ?? {})];
  }
  if (node.type === "python_code") {
    const code = node.data?.params?.module ? modules[node.data?.params?.module] : undefined;
    return [(0, pythonCode_1.pythonCodeAgent)(node, code)];
  }
  if (node.type === "proc") {
  }
  /*
      proc
    */
  /*
      pyhon
     */
  return [node.data];
};
exports.reactFlowNode2GraphNodeV2 = reactFlowNode2GraphNodeV2;
