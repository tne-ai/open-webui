"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactFlowNode2GraphPythonCodeNode = void 0;
const utils_1 = require("../../utils");
const reactFlowNode2GraphPythonCodeNode = (node, code) => {
  return {
    agent: "pythonCodeAgent",
    params: (0, utils_1.cleanObject)({ code }),
    passThrough: {
      nodeType: "pythonCode",
      nodeId: node.id,
      nodeTitle: node.data.title ?? "",
    },
    isResult: (0, utils_1.getIsResult)(node),
  };
};
exports.reactFlowNode2GraphPythonCodeNode = reactFlowNode2GraphPythonCodeNode;
