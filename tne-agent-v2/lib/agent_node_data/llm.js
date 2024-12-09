"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLlmAgent = exports.initLlmAgent = exports.llmAgentDefaultValue = void 0;
const types_1 = require("../types");
exports.llmAgentDefaultValue = {
  id: "",
  agent: "llmAgent",
  params: {
    tneModel: "",
    mapping: "",
    outputType: "overwrite",
    toolJson: "",
    toolCode: "",
    useUserQuery: false,
  },
  passThrough: {
    nodeType: types_1.NodeTypeLLM,
    nodeTitle: "New Model",
    nodeId: "",
  },
  isResult: true,
};
const initLlmAgent = (id) => {
  const init = { ...exports.llmAgentDefaultValue };
  if (init?.passThrough?.nodeId === "") {
    init.passThrough.nodeId = id;
  }
  return {
    ...init,
    id,
  };
};
exports.initLlmAgent = initLlmAgent;
const updateLlmAgent = (id, title, input, slashgptManifest, toolJson, toolCode, outputType, outputToCanvas, useUserQuery) => {
  return {
    id,
    agent: "llmAgent",
    params: {
      tneModel: slashgptManifest,
      mapping: input,
      outputType,
      toolJson,
      toolCode,
      useUserQuery,
    },
    passThrough: {
      nodeType: types_1.NodeTypeLLM,
      nodeId: id,
      nodeTitle: title,
    },
    isResult: outputToCanvas === false,
  };
};
exports.updateLlmAgent = updateLlmAgent;
