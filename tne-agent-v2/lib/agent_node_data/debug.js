"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDebugAgent = exports.initDebugAgent = exports.debugAgentDefaultValue = void 0;
const types_1 = require("../types");
exports.debugAgentDefaultValue = {
  id: "",
  agent: "debugAgent",
  params: {
    outputName: "",
  },
  passThrough: {
    nodeType: types_1.NodeTypeDebug,
    nodeId: "",
    nodeTitle: "Prompt Debugger",
  },
};
const initDebugAgent = (id) => {
  const init = { ...exports.debugAgentDefaultValue };
  if (init?.passThrough?.nodeId === "") {
    init.passThrough.nodeId = id;
  }
  return {
    ...init,
    id,
  };
};
exports.initDebugAgent = initDebugAgent;
const updateDebugAgent = (id, title, outputName) => {
  return {
    id,
    agent: "debugAgent",
    params: {
      outputName,
    },
    passThrough: {
      nodeType: types_1.NodeTypeDebug,
      nodeId: id,
      nodeTitle: title,
    },
  };
};
exports.updateDebugAgent = updateDebugAgent;
