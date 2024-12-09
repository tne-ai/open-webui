"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactFlowNode2GraphNestedNodeWrap =
  exports.reactFlowNode2GraphNode =
  exports.node2procFileName =
  exports.node2moduleFileName =
  exports.node2modelFileName =
    void 0;
const types_1 = require("../types");
const llmAgent_1 = require("./agent2agent/llmAgent");
const codeGeneration_1 = require("./agent2agent/codeGeneration");
const pythonCode_1 = require("./agent2agent/pythonCode");
const node2modelFileName = (node) => {
  if (node.type === types_1.NodeTypeLLM) {
    return node.data.params.tneModel;
  }
  return null;
};
exports.node2modelFileName = node2modelFileName;
const node2moduleFileName = (node) => {
  if (node.type === types_1.NodeTypePythonCode) {
    return node.data.params.module;
  }
  return null;
};
exports.node2moduleFileName = node2moduleFileName;
const node2procFileName = (node) => {
  if (node.type === types_1.NodeTypeNested) {
    return node.data.params.graphDataFile;
  }
  return null;
};
exports.node2procFileName = node2procFileName;
const reactFlowNode2GraphNode = (node, models, modules) => {
  if (node.type === types_1.NodeTypeLLM) {
    const modelName = node.data.params.tneModel;
    const model = models[modelName];
    return (0, llmAgent_1.llmAgent)(node, model ?? {});
  }
  if (node.type === types_1.NodeTypeCodeGeneration) {
    const modelName = node.data.params.tneModel;
    const model = models[modelName];
    return (0, codeGeneration_1.codeGenerationAgent)(node, model ?? {});
  }
  if (node.type === types_1.NodeTypePythonCode) {
    const code = node.data?.params?.module ? modules[node.data?.params?.module] : undefined;
    return (0, pythonCode_1.pythonCodeAgent)(node, code);
  }
  if (node.type === types_1.NodeTypeNested) {
    console.log("TODO PROC");
  }
  return node.data;
};
exports.reactFlowNode2GraphNode = reactFlowNode2GraphNode;
const reactFlowNode2GraphNestedNodeWrap = async (node, procs, expertDataModel = null, parentSources = {}) => {
  const proc = node.data?.params.graphDataFile ? procs[node.data?.params.graphDataFile] : undefined;
  if (proc) {
    // return await reactFlowNode2GraphNestedNode(node, proc, expertDataModel, parentSources);
  }
  return null;
};
exports.reactFlowNode2GraphNestedNodeWrap = reactFlowNode2GraphNestedNodeWrap;
