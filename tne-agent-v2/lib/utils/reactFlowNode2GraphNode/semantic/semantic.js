"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactFlowNode2GraphSemanticNode = void 0;
const utils_1 = require("../../utils");
const reactFlowNode2GraphSemanticNode = (node) => {
  const { ragDbName, maxEmbeddings, similarityThreshold } = node.data;
  return {
    agent: "semanticAgent",
    params: {
      semanticDbName: ragDbName,
      maxEmbeddings,
      similarityThreshold,
    },
    passThrough: {
      nodeType: "semantic",
      nodeId: node.id,
    },
    isResult: (0, utils_1.getIsResult)(node),
  };
};
exports.reactFlowNode2GraphSemanticNode = reactFlowNode2GraphSemanticNode;
