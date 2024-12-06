"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactFlowNode2GraphS3WriteNode = void 0;
const reactFlowNode2GraphS3WriteNode = (node) => {
  const { outputName } = node.data;
  return {
    agent: "s3FileWriteAgent",
    params: {
      outputName,
    },
    passThrough: {
      nodeType: "out",
      nodeId: node.id,
    },
  };
};
exports.reactFlowNode2GraphS3WriteNode = reactFlowNode2GraphS3WriteNode;
