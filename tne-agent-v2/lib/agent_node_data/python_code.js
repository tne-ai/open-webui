"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePythonCodeAgent = exports.initPythonCodeAgent = exports.pythonCodeAgentDefaultValue = void 0;
const types_1 = require("../types");
exports.pythonCodeAgentDefaultValue = {
  id: "",
  agent: "pythonCodeAgent",
  params: {
    module: "",
    outputType: "overwrite",
  },
  passThrough: {
    nodeType: types_1.NodeTypePythonCode,
    nodeId: "",
    nodeTitle: "New Code",
  },
  isResult: true,
};
const initPythonCodeAgent = (id, title) => {
  const init = { ...exports.pythonCodeAgentDefaultValue };
  if (init?.passThrough?.nodeId === "") {
    init.passThrough.nodeId = id;
  }
  if (title) {
    init.passThrough.nodeTitle = title;
  }
  return {
    ...init,
    id,
  };
};
exports.initPythonCodeAgent = initPythonCodeAgent;
const updatePythonCodeAgent = (id, title, module, outputType, outputToCanvas) => {
  return {
    id,
    agent: "pythonCodeAgent",
    params: {
      module,
      outputType,
    },
    passThrough: {
      nodeType: types_1.NodeTypePythonCode,
      nodeId: id,
      nodeTitle: title,
    },
    isResult: outputToCanvas === false,
  };
};
exports.updatePythonCodeAgent = updatePythonCodeAgent;
