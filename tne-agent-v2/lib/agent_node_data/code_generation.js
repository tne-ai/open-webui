"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCodeGenerationAgent = exports.initCodeGenerationAgent = exports.codeGenerationDefaultValue = void 0;
const types_1 = require("../types");
exports.codeGenerationDefaultValue = {
  id: "",
  agent: "codeGenerationAgent",
  params: {
    prompt: "",
    tneModel: "",
    outputType: "overwrite",
    useUserQuery: false,
  },
  passThrough: {
    nodeType: types_1.NodeTypeCodeGeneration,
    nodeId: "",
    nodeTitle: "Generate Code",
  },
  isResult: true,
};
const initCodeGenerationAgent = (id) => {
  const init = { ...exports.codeGenerationDefaultValue };
  if (init?.passThrough?.nodeId === "") {
    init.passThrough.nodeId = id;
  }
  return {
    ...init,
    id,
  };
};
exports.initCodeGenerationAgent = initCodeGenerationAgent;
const updateCodeGenerationAgent = (id, title, slashgptManifest, prompt, outputType, outputToCanvas, useUserQuery, agent) => {
  return {
    id,
    agent: "codeGenerationAgent",
    params: {
      prompt,
      tneModel: slashgptManifest,
      agent,
      outputType,
      useUserQuery,
    },
    passThrough: {
      nodeType: types_1.NodeTypeCodeGeneration,
      nodeId: id,
      nodeTitle: title,
    },
    isResult: outputToCanvas === false,
  };
};
exports.updateCodeGenerationAgent = updateCodeGenerationAgent;
