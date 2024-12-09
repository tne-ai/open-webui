"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactFlowNode2GraphRagNode = void 0;
const utils_1 = require("../../utils");
const reactFlowNode2GraphRagNode = (node) => {
  const { ragDbName } = node.data;
  return {
    agent: "ragAgent",
    params: {
      ragDbName,
    },
    passThrough: {
      nodeType: "rag",
      nodeId: node.id,
    },
    isResult: (0, utils_1.getIsResult)(node),
  };
};
exports.reactFlowNode2GraphRagNode = reactFlowNode2GraphRagNode;
